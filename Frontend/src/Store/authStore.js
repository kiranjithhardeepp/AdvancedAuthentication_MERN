import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/Auth";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  Signup: async (email, password, userName) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/Signup`, {
        email,
        password,
        userName,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error Signing Up",
        isLoading: false,
      });
      throw error;
    }
  },
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signIn`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error SignIn",
        isLoading: false,
      });
      throw error;
    }
  },
  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verifyEmail`, {
        verificationCode,
      });
      console.log("response:Data ", response.data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Incorrect Verification Code",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/verifyAuth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  logOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logOut`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response.data.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/resetPassword/${token}`, {
        newPassword,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
