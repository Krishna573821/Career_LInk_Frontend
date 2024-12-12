import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Login from "./pages/RegisterLogin/Login";
import NotFound from "./pages/NotFound/NotFound.jsx";
import PostApplication from "./pages/Applications/PostApplication.jsx";
import Register from "./pages/RegisterLogin/Register.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      if (document.cookie.includes("token")) {
        dispatch(getUser());
      }
    }, [dispatch]);

   return (
      <>
         <Router>
            <Navbar />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/jobs" element={<Jobs />} />
               <Route path="/dashboard" element={<Dashboard />} />
               <Route
                  path="/post/application/:jobId"
                  element={<PostApplication />}
               />
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
               <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" theme="dark" />
         </Router>
      </>
   );
};

export default App;
