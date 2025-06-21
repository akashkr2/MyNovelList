import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddNovel from "./pages/AddNovel";
import AddNovelCard from "./pages/AddNovelCard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdateProfile from "./pages/UpdateProfile";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/addNovel" element={<AddNovelCard />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/updateProfile" element={<UpdateProfile />}></Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
