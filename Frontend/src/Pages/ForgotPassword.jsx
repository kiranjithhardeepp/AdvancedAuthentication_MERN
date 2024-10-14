import React, { useState } from "react";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import Input from "../Component/Input";
import { useAuthStore } from "../Store/authStore";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const { isLoading, forgotPassword } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="p-8  bg-gray-900 rounded-xl max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 flex justify-center p-1 text-transparent bg-clip-text">
        Forgot Password
      </h2>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <p className="text-gray-300 mb-6 text-center">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(letter) => setEmail(letter.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors"
          >
            {isLoading ? (
              <Loader className="size-6 animate-spin mx-auto" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <p className="text-gray-300 mb-6">
            If an account exists for <strong>{email}</strong>, you will receive
            a password reset link shortly.
          </p>
        </div>
      )}
      <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
        <Link
          to={"/login"}
          className="text-sm text-green-400 hover:underline flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
