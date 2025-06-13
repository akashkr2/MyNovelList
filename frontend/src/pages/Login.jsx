import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "../config/api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: login logic here
    try {
      const res = await axios.post("/api/auth/login", {
        email: form.email,
        password: form.password,
      });
      console.log(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(
        error?.response?.data?.message || error.response || error.message
      );
      //   console.log(error);
    }
    // console.log("Logging in with:", form);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-primary">
          Welcome Back
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:bg-primary/90 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
