import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { FaCrown } from "react-icons/fa";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const logOut = () => {
    const fireBaseAuth = getAuth(app);
    fireBaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login", { replace: true });
  };
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to="/">
        <img src={Logo} alt="Logo" className="w-40" />
      </NavLink>

      <ul className="flex items-center justify-center ml-7">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/music"
          >
            Music
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/premium"
          >
            Premium
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/contact"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <img
          src={user?.user.imageURL}
          referrerPolicy="no-referrer"
          className="w-12 min-w-{44px} object-cover rounded-full shadow-lg"
          alt="user avatar"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor">
            {user?.user.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium member.{" "}
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div
              className="absolute z-10 top-11 right-0 w-275 gap-1 bg-card 
        shadow-lg rounded-lg backdrop-blur-sm flex flex-col p-1"
            >
              <NavLink to="/userProfile">
                <p className="text-base text-textColor hover:bg-slate-600 p-2 hover:text-headingColor rounded-lg duration-150 transition-all ease-in-out">
                  Profile
                </p>
              </NavLink>
              <NavLink to="/userProfile">
                <p className="text-base text-textColor hover:bg-slate-600 p-2 hover:text-headingColor rounded-lg duration-150 transition-all ease-in-out">
                  My Favourites
                </p>
              </NavLink>
              {user?.user.role === "admin" && (
                <>
                  <hr />
                  <NavLink to="/dashboard/home">
                    <p className="text-base text-textColor hover:bg-slate-600 p-2 hover:text-headingColor rounded-lg duration-150 transition-all ease-in-out">
                      Dashboard
                    </p>
                  </NavLink>
                </>
              )}

              <hr />
              <NavLink to="/userProfile">
                <p
                  className="text-base text-textColor hover:bg-slate-600 p-2 hover:text-headingColor rounded-lg duration-150 transition-all ease-in-out"
                  onClick={logOut}
                >
                  Sign Out
                </p>
              </NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default Header;
