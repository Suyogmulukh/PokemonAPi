import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      const userData = { username: formData.username, email: formData.email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setFormData({ username: "", email: "", password: "" });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      const userData = { username: formData.username, email: formData.email };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setFormData({ username: "", email: "", password: "" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center px-3 sm:px-4 py-6">
      <div className="w-full  max-w-xs  sm:max-w-sm  md:max-w-md  bg-gray-800  rounded-xl  shadow-lg  p-4  sm:p-6">
        {user ? (
          <>
            {/* Header */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center text-yellow-400">
              User Profile
            </h2>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 text-center">
              <p className="text-sm sm:text-base">
                <span className="text-gray-400">Username:</span>{" "}
                <span className="font-medium">{user.username}</span>
              </p>

              <p>
                <span className="text-gray-400">Email:</span>{" "}
                <span className="font-medium">{user.email}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-red-500 hover:bg-red-600 transition font-semibold"
              >
                Logout
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition font-semibold"
              >
                Back to Home
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Login/Signup Header */}
            <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
              {isLoginMode ? "Login" : "Sign Up"}
            </h2>

            {/* Form */}
            <form
              onSubmit={isLoginMode ? handleLogin : handleSignup}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className=" w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition font-semibold"
              >
                {isLoginMode ? "Login" : "Sign Up"}
              </button>
            </form>

            {/* Toggle Mode */}
            <p className="text-center mt-4 text-sm sm:text-base text-gray-400">
              {isLoginMode
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => {
                  setIsLoginMode(!isLoginMode);
                  setFormData({ username: "", email: "", password: "" });
                }}
                className="text-yellow-400 font-semibold hover:underline"
              >
                {isLoginMode ? "Sign Up" : "Login"}
              </button>
            </p>

            {/* Back to Home */}
            <button
              onClick={() => navigate("/")}
              className="w-full mt-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg bg-gray-700 hover:bg-gray-600 transition font-semibold"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
