import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import axios from "../config/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     setAvatarPreview(reader.result);
      //   };
      //   reader.readAsDataURL(file);
      const avatarURL = URL.createObjectURL(file);
      setAvatarPreview(avatarURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (avatar) formData.append("avatar", avatar);

    //   console.log(form);
    //   console.log(formData);

      const res = await axios.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res.data.message);
      navigate("/login");
    } catch (error) {
      console.log(
        error?.response?.data?.message || error.response || error.message
      );
    }
  };

  return (
    <div className="min-h-screen overflow-y-hidden bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-primary">
          Create an Account
        </h1>

        {/* Avatar Upload */}
        <div className="flex justify-center relative">
          <div className="relative w-32 h-32">
            <img
              src={avatarPreview || `https://placehold.co/600x400?text=Avatar`}
              alt="avatar"
              className="w-full h-full object-cover border-2 border-primary shadow rounded-full overflow-hidden"
            />
            <label className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90">
              <FaCamera size={14} />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <div className="relative">
              <FaUser className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <div className="relative">
              <FaUser className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Unique username"
                className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-10 w-full px-3 py-2 border border-border rounded-md bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:bg-primary/90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
