import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets/img";
import { VscLibrary } from "react-icons/vsc";
import { GrHomeRounded } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquareFill, BsArrowDownCircle } from "react-icons/bs";
import { BiHeartSquare } from "react-icons/bi";
import Header from "./Header";
import MusicCard from "./MusicCard";

const listItems = [
  {
    title: "Home",
    icon: <GrHomeRounded className="text-2xl fill-white" />,
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
    icon: <BiHeartSquare className="text-2xl" />,
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

const song = {
  name: "I don't wanna live forever",
  imageURL:
    "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
  artists: "Zayn, Taylor Swift",
};

export default function Home() {
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
                    ? `p-2 flex flex-horizontal items-center ${isActiveStyles}`
                    : `p-2 flex flex-horizontal items-center ${isNotActiveStyles}`
                }
              >
                {item.icon}
                <p className="ml-4 mt-1 font-extrabold text-xs">{item.title}</p>
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
      <div className="w-full">
        <div className="h-20">
          <Header />
        </div>
        <div>
          <MusicCard
            name={song.name}
            imageURL={song.imageURL}
            artists={song.artists}
          />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
