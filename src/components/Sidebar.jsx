import React from "react";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets/img";
import { VscLibrary } from "react-icons/vsc";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquareFill, BsArrowDownCircle } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const listItems = [
  {
    title: "Home",
    icon: <MdHomeFilled className="text-2xl scale-125 " />,
    route: "",
  },
  {
    title: "Search",
    icon: <FiSearch className="text-2xl" />,
    route: "search",
  },
  {
    title: "Your Library",
    icon: <VscLibrary className="text-2xl" />,
    route: "collection/playlists",
  },
  {},

  {
    title: "Create playlist",
    icon: <BsPlusSquareFill className="text-2xl" />,
    route: "createPlaylist",
  },
  {
    title: "Liked Songs",
    icon: <FaHeart className="text-2xl" />,
    route: "collection/tracks",
  },
];
const playlists = [
  {
    title: "My Playlist #1",
    route: "playlists/1",
  },
  {
    title: "My Playlist #2",
    route: "playlists/2",
  },
];

function Sidebar() {
  return (
    <div className="font-bold text-xs bg-black w-72">
      <div className="bg-black h-16">
        <NavLink to="/" className="bg-black  w-full">
          <img src={Logo} alt="Logo" className="w-32 p-30 mt-6 ml-7" />
        </NavLink>
      </div>
      <div className="bg-black ">
        {listItems.map((item, index) => {
          return (
            <NavLink
              to={item.route}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `p-2 flex flex-horizontal items-center${isActiveStyles}`
                  : `p-2 flex flex-horizontal items-center ${isNotActiveStyles}`
              }
            >
              {item.icon}
              <p className="ml-4 mt-1 font-extrabold text-xs scale-105">
                {item.title}
              </p>
            </NavLink>
          );
        })}
      </div>
      <hr className="border-t-1 border-gray-700 m-2"></hr>
      <div className="bg-black">
        {playlists.map((item, index) => {
          return (
            <NavLink
              to={item.route}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `ml-2 p-2 flex flex-horizontal ${isActiveStyles}`
                  : `ml-2 p-2 flex flex-horizontal ${isNotActiveStyles}`
              }
            >
              <p className="ml-4 text-xs">{item.title}</p>
            </NavLink>
          );
        })}
        <Link
          to="#"
          className="text-textColor hover:text-white flex items-center gap-2 
              duration-100 transition-all ease-in-out p-2 mx-5"
        >
          <BsArrowDownCircle className="text-xl" />
          <p>Install App</p>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
