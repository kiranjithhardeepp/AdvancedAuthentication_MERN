import React from "react";
import Input from "../Component/Input";
import { Lock, Mail, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  console.log("email: ", email);
  const [password, setPassword] = React.useState("");
  console.log("password: ", password);
  const { signIn, isLoading, error } = useAuthStore();
  const handleSignup = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };
  return (
    <div className="p-8 bg-gray-900 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Welcome Back
      </h2>
      <form onSubmit={handleSignup} autoComplete="off">
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Id"
          value={email}
          onChange={(letter) => setEmail(letter.target.value)}
        />
        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(letter) => setPassword(letter.target.value)}
        />
        <div className="flex items-center mb-6">
          <Link
            to="/forgotPassword"
            className="text-sm text-green-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
        <button className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200">
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "LogIn"
          )}
        </button>
      </form>
      <div className="text-className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'">
        <p className="text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-gray-200 hover:underline">
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
