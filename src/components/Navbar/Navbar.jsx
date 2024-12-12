import "./Navbar.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
   const [show, setShow] = useState(false);
   const { isAuthenticated } = useSelector((state) => state.user);
   return (
      <>
         <nav className={show ? "navbar show_navbar" : "navbar"}>
            <div className="logo">
               <h4 style={{ fontWeight: "800", fontSize: "30px" }}>
                  CAREER{" "}
                  <span
                     style={{
                        fontWeight: "800",
                        color: "lightblue",
                        fontSize: "30px",
                     }}
                  >
                     LINK
                  </span>
               </h4>
            </div>
            <div className="links">
               <ul>
                  <li>
                     <Link to={"/"} onClick={() => setShow(!show)}>
                        HOME
                     </Link>
                  </li>
                  <li>
                     <Link to={"/jobs"} onClick={() => setShow(!show)}>
                        JOBS
                     </Link>
                  </li>
                  {isAuthenticated ? (
                     <li>
                        <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                           DASHBOARD
                        </Link>
                     </li>
                  ) : (
                     <li>
                        <Link to={"/login"} onClick={() => setShow(!show)}>
                           LOGIN
                        </Link>
                     </li>
                  )}
               </ul>
            </div>
            <GiHamburgerMenu
               className="hamburger"
               onClick={() => setShow(!show)}
            />
         </nav>
      </>
   );
};

export default Navbar;
