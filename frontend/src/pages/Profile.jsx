import React, { useEffect } from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Example: Show toast only if user came from login
  useEffect(() => {
    if (location.state?.fromLogin) {
      const id = location.state?.toastId;
      toast.dismiss(id);
    }
  }, [location]);
  const { user } = useAuth();
  // console.log(user);
  // console.log(Object.entries(user || {}));

  // useEffect(() => {
  //   if (!user) {
  //     const alreadyRedirected = sessionStorage.getItem("redirected");
  //     if (!alreadyRedirected) {
  //       const id = toast.loading("User not found, redirecting to login...");
  //       navigate("/login", {
  //         state: {
  //           fromProfile: true,
  //           toastId: id,
  //         },
  //       });
  //     }
  //   } else {
  //     sessionStorage.removeItem("redirected");
  //   }
  // }, [user, navigate]);
  return (
    <motion.div
      className="max-w-3xl min-w-sm mx-auto mt-10 p-6 bg-card text-card-foreground rounded-xl shadow-lg border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 bg-base-200 rounded-full">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full border"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center rounded-full text-muted-foreground text-4xl">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold">{user?.name || "Your Name"}</h1>
          <p className="text-sm text-muted-foreground">
            {user?.email || "your@email.com"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {["name", "username", "email"].map((key, index) => {
            const value = String(user[key]);
            return (
              <div
                key={index}
                className="flex justify-center gap-3 items-center px-4 py-2 rounded"
              >
                <span className="text-sm capitalize">{key}:</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            );
          })}
        </div>

        <button
          className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2"
          onClick={() => navigate("/updateProfile")}
        >
          <FaUserEdit />
          Edit Profile
        </button>
      </div>
    </motion.div>
  );
};

export default Profile;
