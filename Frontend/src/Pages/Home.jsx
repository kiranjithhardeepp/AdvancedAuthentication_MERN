import React, { useEffect } from "react";
import { useAuthStore } from "../Store/authStore";
import { toast } from "react-hot-toast";

const Home = () => {
  const { user } = useAuthStore();

  // Format the joined date (e.g., "2024-10-12T04:54:53.020Z") to show year and time
  const joinedDate = new Date(user.createdAt);
  const formattedDate = joinedDate.toLocaleDateString(undefined, { year: 'numeric' });
  const formattedTime = joinedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Trigger login success toast when the component mounts
  useEffect(() => {
    toast.success(`Welcome ${user.name}, login successful!`);
  }, [user.name]);

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <div className="text-3xl font-bold text-white mb-4">
        {`Welcome Home, ${user.name}!`}
      </div>
      <div className="text-lg text-gray-300">
        <p>{`Joined on: ${formattedDate} at ${formattedTime}`}</p>
      </div>
    </div>
  );
};

export default Home;
