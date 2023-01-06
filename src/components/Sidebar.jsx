import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets/img";
import { VscLibrary } from "react-icons/vsc";
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { BsPlusSquareFill, BsArrowDownCircle } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { useEffect, useState } from "react";
import { getMyPlaylists } from "../api";
import { useMemo } from "react";
import { actionType } from "../context/reducer";
import DotFlashing from "./DotFlashing";

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

function Sidebar() {
  const [{ user, playlists }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  const token = useMemo(() => {
    if (user) return user.token;
    else return null;
  }, [user]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getMyPlaylists(token)
        .then((data) =>
          dispatch({ type: actionType.SET_PLAYLISTS, playlists: data.data })
        )
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, token]);
  console.log(playlists)
  //console.log(user.data.name)


  return (
    <div className="font-bold text-xs bg-black w-64 fixed h-full">
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
      <hr className="border-t-1 border-neutral-700 mx-7 my-2"></hr>
      <div className="bg-black">
        {isLoading ? (
          <div className="flex justify-center items-center mt-3">
            <DotFlashing />
          </div>
        ) : (
          playlists.map((item) => {
            return (
              <NavLink
                to={`playlists/${item._id}`}
                key={item._id}
                className={({ isActive }) =>
                  isActive
                    ? `ml-2 p-2 flex flex-horizontal ${isActiveStyles}`
                    : `ml-2 p-2 flex flex-horizontal ${isNotActiveStyles}`
                }
              >
                <p className="ml-4 text-xs">{item.name}</p>
              </NavLink>
            );
          })
        )}
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
