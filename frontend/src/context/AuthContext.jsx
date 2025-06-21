import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../config/api";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  //   const [user, setUser] = useState(null); // { fullName, email, avatar }
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem("user");
      // Guard against both null and the string "undefined"
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch (e) {
      console.error("Invalid session user data", e);
      sessionStorage.removeItem("user"); // Clean up bad data
      return null;
    }
  });
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  const login = async (formData) => {
    const loginData = {
      password: formData.password,
    };
    if (formData.email) loginData.email = formData.email;
    if (formData.username) loginData.username = formData.username;
    try {
      const res = await axios.post("/api/auth/login", loginData);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setIsLogin(true);
      return res.data.message;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const logoutPromise = axios.post("api/auth/logout");
      toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: "Logout Successful",
        error: (err) => err.response?.data?.message || "Error",
      });
      await logoutPromise;
      sessionStorage.removeItem("user");
      setUser(null);
      setIsLogin(false);
      return true; // Indicate logout success
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
