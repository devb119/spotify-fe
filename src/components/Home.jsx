import * as React from "react";
import { Outlet } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { VscLibrary } from "react-icons/vsc";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquareFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Header from "./Header";
var location;
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

export default function Home() {
  location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex flex-horizontal h-full w-full ">
      <div className="font-bold text-xs bg-black h-full">
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
        <div className="">
          <hr className="border-t-1 border-gray-700 w-48 ml-8 my-2"></hr>
        </div>
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
        </div>
        <div className="bg-black">
          <div>
            <NavLink>
              <p>Install App</p>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="h-20">
          <Header />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
