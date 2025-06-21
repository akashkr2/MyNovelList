import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser , FaLock } from "react-icons/fa";
import axios from "../config/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  //   useEffect(() => {
  //     if (location.state?.fromProfile) {
  //       const id = location.state?.toastId;
  //       toast.dismiss(id);
  //     }
  //   }, [location]);
  useEffect(() => {
    if (location.state?.toastId) {
      setTimeout(() => {
        toast.dismiss(location.state.toastId);
      }, 500);
      sessionStorage.removeItem("redirected");
    }
  }, [location]);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: login logic here
    try {
      const loginPromise = login(form);
      toast.promise(loginPromise, {
        loading: setTimeout(() => {
          "Logging in...";
        }, 1000),
        success: (message) => message || "Login Successfully",
        error: (err) => err.response?.data?.message || "Error",
      });
      const message = await loginPromise;
      const id = toast.loading("Redirecting to profile section...");
      navigate("/profile", {
        state: { fromLogin: true, toastId: id },
      });
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
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <div className="relative">
              <FaUser  className="absolute top-2.5 left-3 text-muted-foreground" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
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
