import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const alreadyRedirected = sessionStorage.getItem("redirected");
      if (!alreadyRedirected) {
        const id = toast.loading("User not found, redirecting to login...");
        sessionStorage.setItem("redirected", "true"); // prevent duplicate
        setTimeout(() => {
          navigate("/login", {
            state: {
              from: location.pathname,
              toastId: id,
            },
          });
        }, 1500);
      }
    } else {
      sessionStorage.removeItem("redirected");
    }
  }, [user, navigate, location]);

  if (!user) return null; // Don't render anything while redirecting

  return <Outlet />; // Renders the nested route component
};

export default ProtectedRoute;
