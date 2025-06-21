import React, { useEffect, useState } from "react";
import { FaSave, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../config/api";
import loader from "../assets/gear-spinner.svg"

const UpdateProfile = () => {
  // const navigate = useNavigate();

  const { user, setUser } = useAuth();
  // console.log(user);
  // console.log(Object.entries(user || {}));

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const avatarURL = URL.createObjectURL(file);
      setAvatarPreview(avatarURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      if (avatar) formData.append("avatar", avatar);

      // console.log(form);
      // console.log(formData);

      setLoading(true);

      const res = await axios.put("/api/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data.message);
      toast.success(res.data.message);
      setLoading(false);

      sessionStorage.setItem("user", res.data.updatedUser);
      setUser(res.data.updatedUser);
      navigate("/profile");
    } catch (error) {
      console.log(
        error?.response?.data?.message || error.response || error.message
      );
    }
  };

  return (
    <motion.div
      className="max-w-3xl min-w-sm mx-auto mt-10 p-6 bg-card text-card-foreground rounded-xl shadow-lg border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit}
      >
        <div className="relative w-32 h-32 bg-base-200 rounded-full">
          <img
            src={avatarPreview || user.avatar}
            alt="User Avatar"
            className="w-full h-full object-cover rounded-full border"
          />
          <label className="absolute bottom-1 right-1 bg-primary text-white hover:bg-base-100 hover:text-primary p-1 rounded-full shadow-md">
            <FaCamera className="text-sm" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-bold">{user?.name || "Your Name"}</h1>
          <p className="text-sm text-muted-foreground">
            {user?.email || "your@email.com"}
          </p>
        </div>

        <div className="flex flex-col gap-2 w-3/4">
          {["name", "email"].map((key, index) => {
            const value = form[key];
            return (
              <div
                key={index}
                className="flex justify-center gap-3 items-center px-4 py-2 rounded"
              >
                <label className="text-sm text-muted-foreground capitalize">
                  {key}:
                </label>
                <input
                  name={key}
                  className="text-sm font-medium p-1 border rounded w-full"
                  value={value}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        </div>

        <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2">
          {loading ? (
            <>
              <img src={loader} alt="loader" className="h-8 w-8"/>
              Saving...
            </>
          ) : (
            <>
              <FaSave />
              Save Changes
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default UpdateProfile;
