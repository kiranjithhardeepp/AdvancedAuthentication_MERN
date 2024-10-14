import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import VerifyEmail from "./Pages/VerifyEmail";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Navbar from "./Component/Navbar";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verifyEmail" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
function App() {
  const { isAuthenticated, checkAuth, user } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("user: ", user);
  console.log("isAuthenticated: ", isAuthenticated);
  return (
    <div className="min-h-screen bg-gradient-to-br bg-slate-700">
      <Navbar />
      <div
        className=" p-5 mt-3
       flex items-center justify-center relative overflow-hidden"
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verifyEmail" element={<VerifyEmail />} />
          <Route
            path="/forgotPassword"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/resetPassword/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
