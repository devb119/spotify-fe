import React from "react";
import { isActiveStyles2, isNotActiveStyles2 } from "../utils/styles";
import { NavLink } from "react-router-dom";

const listItems = [
  {
    title: "PlayList",
    route: "collection/playlists",
  },
  {
    title: "Podcasts",
    route: "collection/playlists/podcasts",
  },
  {
    title: "Artists",
    route: "collection/artists",
  },
  {
    title: "Albums",
    route: "collection/albums",
  },
];

function SideBarLibrary() {
  return (
    <div className="font-bold text-sm">
      <div className=" flex ">
        {listItems.map((item, index) => {
          return (
            <NavLink
              to={item.route}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? `px-5 py-4 rounded-md flex flex-horizontal items-center${isActiveStyles2}`
                  : `px-5 py-4 rounded-md flex flex-horizontal items-center ${isNotActiveStyles2}`
              }
            >
              <p className="text-sm scale-105">{item.title}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default SideBarLibrary;
