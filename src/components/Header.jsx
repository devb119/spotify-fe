import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
    dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: false });
    dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: null });
    navigate("/login", { replace: true });
  };
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      {pathname === "/search" ? (
        <div className="mr-auto ml-4 relative">
          <label
            htmlFor="search-input"
            className="w-10 h-10 flex items-center justify-center absolute top-0 left-1 right-3 text-[#121212]"
          >
            <FiSearch className="text-2xl text-black cursor-text" />
          </label>
          <input
            type={"text"}
            id="search-input"
            autoFocus={true}
            className={
              "h-10 max-w-full w-[22.75rem] py-1.5 px-12 mr-6 bg-white rounded-full text-ellipsis placeholder-black/50 text-black text-sm font-semibold outline-none"
            }
            placeholder={"What do you want to listen to ?"}
          />

          <select
            name="Choose"
            className="absolute top-0 left-50 right-0 w-25 h-10 rounded-r-full text-ellipsis text-[#635e5e] text-sm font-semibold outline-none  border-l-2 border-black-900"
          >
            <option
              value="song"
              className="text-ellipsis text-[#635e5e] text-sm font-semibold "
            >
              Song
            </option>
            <option
              value="artist"
              className="text-ellipsis text-[#635e5e] text-sm font-semibold "
            >
              Artist
            </option>
            <option
              value="album"
              className="text-ellipsis text-[#635e5e] text-sm font-semibold "
            >
              Album
            </option>
          </select>
        </div>
      ) : (
        ""
      )}
      {!pathname.includes("/collection/tracks") &&
      pathname.includes("/collection/") ? (
        <div className="text-white"> nav bar</div>
      ) : (
        ""
      )}

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <img
          src={user?.data.imageURL}
          referrerPolicy="no-referrer"
          className="w-12 min-w-{44px} object-cover rounded-full shadow-lg"
          alt="user avatar"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor">
            {user?.data.name}
          </p>
          <p className="flex items-center gap-2 text-xs text-gray-500 font-normal">
            Premium member.{" "}
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, zIndex: 10 }}
            animate={{ opacity: 1, y: -20, zIndex: 10 }}
            exit={{ opacity: 0, y: 50, zIndex: 10 }}
          >
            <div
              className="absolute top-11 right-0 w-275 gap-1 bg-card 
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
              {user?.data.role === "admin" && (
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
