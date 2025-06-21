import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import toast from "react-hot-toast";

const UserMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Detect if it's a touch device
  //   const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Behavior: hover on desktop, click on mobile
  const handleMouseEnter = () => {
    // if (!isTouch) setIsOpen(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // if (!isTouch) setIsOpen(false);
    setIsOpen(false);
  };

  const handleClick = () => {
    // if (isTouch) setIsOpen((prev) => !prev);
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
  const success = await logout();
  if (success) {
    const id = toast.loading("Redirecting to Home...");
    navigate("/", { state: { fromLogout: true, toastId: id } });
  }
};

  return (
    <div
      className="relative py-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1 text-sm hover:bg-muted rounded"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="user-menu"
      >
        <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full" />
        <FaCaretDown className="text-xs text-muted-foreground" />
      </button>

      {isOpen && (
        <div
          id="user-menu"
          role="menu"
          className="absolute right-0 mt-2 border rounded shadow w-40 z-50 bg-base-100"
        >
          <div className="flex flex-col items-start p-2 space-y-1 text-sm [&>*]:rounded [&>*]:cursor-pointer [&>*]:w-full [&>*]:text-start [&>*]:px-2 [&>*]:py-1 [&>*]:hover:bg-base-200">
            <button
              role="menuitem"
              tabIndex={0}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button role="menuitem" tabIndex={0} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
