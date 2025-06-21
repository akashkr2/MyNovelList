import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBook, FaUserCircle, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { isLogin, user, logout } = useContext(AuthContext);
  const [themeOpen, setThemeOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleThemeDropdown = () => setThemeOpen((prev) => !prev);
  const toggleUserDropdown = () => setUserMenuOpen((prev) => !prev);

  const creativeMiddle = (
    <motion.div
      className="hidden md:flex gap-4 text-sm tracking-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className="hover:underline cursor-pointer">Reading Goals</span>
      <span className="hover:underline cursor-pointer">Quotes</span>
      <span className="hover:underline cursor-pointer">Favorites</span>
    </motion.div>
  );

  return (
    <nav className="min-w-sm w-full shadow-sm sticky top-0 z-50 bg-base-200 h-[10vh] mb-1 flex">
      <div className="max-w-7xl w-full mx-auto px-4 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <FaBook className="text-primary" /> MyNovelList
        </Link>

        {/* Creative Middle */}
        {creativeMiddle}

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          {/* Theme Switcher */}
          <div className="relative group">
            <button
              //   onClick={toggleThemeDropdown}
              className="border rounded px-3 py-1 text-sm hover:bg-muted flex items-center gap-3"
            >
              Theme <FaChevronDown />
            </button>
            {
              // themeOpen &&
              <div className="absolute right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 bg-primary text-popover-foreground rounded shadow w-40 z-50">
                <ul className="p-2 space-y-1 text-sm">
                  {["System", "Dark", "Light"].map((theme, index) => (
                    <li
                      key={index}
                      className="hover:bg-base-100 rounded px-2 py-1 cursor-pointer"
                    >
                      {theme}
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>

          {/* Auth Logic */}
          {isLogin ? (
            // <div className="relative group">
            //   <button className="flex flex-col items-center gap-2 px-3 py-1 text-sm hover:bg-muted rounded">
            //     <img
            //       src={user.avatar}
            //       alt="avatar"
            //       className="h-8 w-8 rounded-full"
            //     />
            //   </button>

            //   <div className="absolute right-0 mt-2 border rounded shadow w-40 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-200 bg-base-100">
            //     <ul className="p-2 space-y-1 text-sm [&>*]:rounded [&>*]:cursor-pointer [&>*]:px-2 [&>*]:py-1 [&>*]:hover:bg-base-200">
            //       <li>
            //         <Link to="/profile">Profile</Link>
            //       </li>
            //       <li onClick={logout}>Logout</li>
            //     </ul>
            //   </div>
            // </div>
            <UserMenu user={user} logout={logout} />
          ) : (
            <>
              <Link to="/login">
                <button className="border rounded px-3 py-1 text-sm">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                {/* <button className="bg-primary text-base-100 hover:bg-base-100 hover:text-primary transition-all px-3 py-1 text-sm rounded"> */}
                <div className="relative group overflow-hidden w-[6vw] h-[4.9vh] bg-primary rounded hover:rounded-none transition-all hover:border-base-100">
                  <div className="absolute top-0 left-full w-full h-full bg-base-200 transition-all duration-300  group-hover:left-0 z-0"></div>
                  <button className="absolute inset-0 z-10 flex items-center justify-center text-sm text-base-100 group-hover:text-primary transition-colors duration-300">
                    Sign Up
                  </button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
