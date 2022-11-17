import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink, useNavigate } from "react-router-dom";
import { Logo } from "../assets/img";
import { MdFeaturedPlayList } from "react-icons/md";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { CiSquarePlus } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Header from "./Header";
import DashboardHome from "./DashboardHome";

const drawerWidth = 245;
const listItems = [
  {
    title: "Home",
    icon: <GrHomeRounded className="text-xl fill-white" />,
    route: "",
  },
  {
    title: "Search",
    icon: <FiSearch className="text-xl" />,
    route: "search",
  },
  {
    title: "Library",
    icon: <MdFeaturedPlayList className="text-xl" />,
    route: "collection/playlists",
  },
  {},

  {
    title: "Create playlist",
    icon: <CiSquarePlus className="text-xl" />,
  },
  {
    title: "Liked Songs",
    icon: <FaHeart className="text-xl" />,
  },
];
const playlists = [
  {
    title: "Danh sach phat cua toi",
    route: "",
  },
];

export default function Home() {
  return (
    <div className="flex flex-horizontal h-full w-full ">
      <div className="font-bold text-xs bg-black h-full">
        <div className="bg-black h-20">
          <NavLink to="/" className="bg-black h-20 w-full">
            <img src={Logo} alt="Logo" className="w-32 p-30 mt-6 ml-6" />
          </NavLink>
        </div>
        <div className="bg-black ">
          {listItems.map((item, index) => {
            if (index === 0)
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
                  {item.icon}
                  <p className="ml-4 font-extrabold text-xs">{item.title}</p>
                </NavLink>
              );
            else if (index === 3) return <div className=" mt-4 " />;
            else
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
                  {item.icon}
                  <p className="ml-4 font-extrabold text-xs">{item.title}</p>
                </NavLink>
              );
          })}
        </div>
        <div className="">
          <hr className="border-t-1 border-gray-700 w-48 ml-6"></hr>
        </div>
        <div className="bg-black">
          {playlists.map((item, index) => {
            if (index === 3) return <div className=" mt-4 " />;
            else
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
                  {item.icon}
                  <p className="ml-4 font-extrabold text-xs">{item.title}</p>
                </NavLink>
              );
          })}
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
