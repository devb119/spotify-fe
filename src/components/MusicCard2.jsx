import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";
import Icon from "../assets/img/Icon";
function MusicCard2({ song = null }) {
  const [showPlay, setShowPlay] = useState(false);

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);

  return (
    <div
      className="relative w-80 h-auto rounded lg:w-72 shadow-md bg-[#2a2a2a] hover:bg-cardBgLight transition-all duration-200 cursor-pointer flex "
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
    >
      <div className="rounded-[4px] w-20 h-20">
        <img
          src={song.imageURL ? song.imageURL : Icon.plain}
          alt="song cover"
          className="rounded-[4px] w-20 h-20"
        />
      </div>

      <div className=" pl-4 text-md text-white font-semibold mb-2 flex items-center">
        {song.name.length > 14 ? `${song.name.slice(0, 14)}...` : song.name}
      </div>

      <div
        className={`h-12 w-12 bg-green-500 flex z-2 justify-center z-40 items-center rounded-full absolute right-4 top-1/2 ${
          showPlay ? "opacity-100 -translate-y-5" : "opacity-0"
        } transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" />
      </div>
    </div>
  );
}

export default MusicCard2;
