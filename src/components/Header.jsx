import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useStateValue } from "../context/StateProvider";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
import SideBarLibrary from "./SideBarLibrary";
import { getLikedSongs } from "../api";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
function Menu() {
  const [{ user }, dispatch] = useStateValue();
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
    dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: false });
    dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: null });
    navigate("/login", { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, zIndex: 10 }}
      animate={{ opacity: 1, y: -20, zIndex: 10 }}
      exit={{ opacity: 0, y: 50, zIndex: 10 }}
    >
      <div className="absolute top-9 text-xs font-semibold right-0 w-44 gap-1 bg-card shadow-lg rounded-sm backdrop-blur-sm flex flex-col p-1">
        <NavLink to="/userProfile">
          <p className=" text-textColor hover:bg-neutral-700 p-2 hover:text-headingColor rounded-sm duration-150 transition-all ease-in-out">
            Profile
          </p>
        </NavLink>
        <NavLink to="/userProfile">
          <p className=" text-textColor hover:bg-neutral-700 p-2 hover:text-headingColor rounded-sm duration-150 transition-all ease-in-out">
            My Favourites
          </p>
        </NavLink>
        {user?.data.role === "admin" && (
          <>
            <hr />
            <NavLink to="/dashboard/home">
              <p className=" text-textColor hover:bg-neutral-700 p-2 hover:text-headingColor rounded-sm duration-150 transition-all ease-in-out">
                Dashboard
              </p>
            </NavLink>
          </>
        )}
        <hr className="border-t-1 border-neutral-700 "></hr>
        <p
          className=" text-textColor hover:bg-neutral-700 p-2 hover:text-headingColor rounded-sm duration-150 transition-all ease-in-out"
          onClick={logOut}
        >
          Sign Out
        </p>
      </div>
    </motion.div>
  );
}
function Header() {
  // eslint-disable-next-line no-unused-vars
  const [{ user, query, searchType, currentColor }, dispatch] = useStateValue();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(user);

  const { pathname } = useLocation();

  function handleInputOnchange(e) {
    const { value } = e.target;
    dispatch({ type: actionType.SET_QUERY, query: value });
  }

  useEffect(() => {
    if (user?.token) {
      getLikedSongs(user.token).then((data) =>
        dispatch({
          type: actionType.SET_LIKED_SONGS,
          likedSongs: data.data.likedSongs,
        })
      );
    }
  }, [dispatch, user?.token]);

  // function handleOptionOnchange(e) {
  //   const { value } = e.target;
  //   dispatch({ type: actionType.SET_SEARCH_TYPE, searchType: value });
  // }
  const style = `flex items-center justify-between h-16 bg-[${currentColor.hex}] z-50 w-full p-4 md:py-2 md:px-6 fixed`;

  return (
    <header className={style}>
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
              "h-10 max-w-full w-[23rem] py-1.5 px-12 mr-6 bg-white rounded-full text-ellipsis placeholder-black/50 text-black text-sm font-semibold outline-none"
            }
            value={query}
            placeholder={"What do you want to listen to ?"}
            onChange={handleInputOnchange}
          />
        </div>
      ) : (
        ""
      )}
      {!pathname.includes("/collection/tracks") &&
      pathname.includes("/collection/") ? (
        <SideBarLibrary />
      ) : (
        ""
      )}
      {(!pathname.includes("/collection") && pathname !== "/search") ||
      pathname === "/collection/tracks" ? (
        <div></div>
      ) : null}
      <div
        className="flex items-center mr-72 cursor-pointer bg-black rounded-full p-[2px] gap-2 relative"
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <img
          src={user?.data.imageURL}
          referrerPolicy="no-referrer"
          className="w-7 min-w-{44px} object-cover rounded-full shadow-lg"
          alt="user avatar"
        />
        <div className="flex ">
          <div className="text-white flex flex-row text-xs font-semibold hover:text-headingColor">
            <p className="text-end mt-1">{user?.data.name}</p>
            {!isMenuOpen ? (
              <MdArrowDropDown className="text-2xl"></MdArrowDropDown>
            ) : (
              <MdArrowDropUp className="text-2xl"></MdArrowDropUp>
            )}
          </div>
          {/* <p className="flex items-center gap-2 text-xs text-gray-200 font-normal">
            Premium member
            <FaCrown className="text-sm -ml-1 text-yellow-500" />
          </p> */}
        </div>
        <div>{isMenuOpen && <Menu></Menu>}</div>
      </div>
    </header>
  );
}

export default Header;
