import React from "react";
import Input from "../Component/Input";
import { User, Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../Component/PasswordStrengthMeter";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/authStore";

const SignUpPage = () => {
  const [userName, setName] = React.useState("");
  console.log("name: ", userName);
  const [email, setEmail] = React.useState("");
  console.log("email: ", email);
  const [password, setPassword] = React.useState("");
  console.log("password: ", password);

  const { Signup, error, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await Signup(email, password, userName);
      navigate("/verifyEmail");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
        Create Account
      </h2>
      <form onSubmit={handleSignup} autoComplete="off">
        <Input
          icon={User}
          type="text"
          placeholder="Full Name"
          value={userName}
          onChange={(letter) => setName(letter.target.value)}
        />
        <Input
          icon={Mail}
          type="email"
          placeholder="Email Address"
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
        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
        <PasswordStrengthMeter password={password} />

        <button
          className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200"
        >
          {isLoading ? (
            <Loader className="animate-spin mx-auto" size={24} />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <div className="text-className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'">
        <p className="text-sm text-gray-400">
          Already Have an Account?{" "}
          <Link to={"/login"} className="text-gray-200 hover:underline">
            {" "}
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
