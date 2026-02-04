import React from "react";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen text-white bg-gray-950 overflow-x-hidden w-full">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <ToastContainer/>
    </div>
  );
};

export default App;
