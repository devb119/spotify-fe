import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";
import Icon from "../assets/img/Icon";
import { useNavigate } from "react-router-dom";
import PlayButton from "./PlayButton";

function MusicCard2({ arg = null, type = "playlists" }) {
  const [showPlay, setShowPlay] = useState(false);
  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  const navigate = useNavigate();
  console.log(arg);
  return (
    <div
      className="relative w-80 h-auto rounded lg:w-72 shadow-md bg-[#2a2a2a] hover:bg-cardBgLight transition-all duration-200 cursor-pointer "
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
    >
      <div
        className="flex flex-row"
        onClick={() => {
          navigate(`/${type}/${arg._id}`);
        }}
      >
        <div className="rounded-[4px] w-20 h-20">
          <img
            src={arg.imageURL ? arg.imageURL : Icon.plain}
            alt="song cover"
            className="rounded-[4px] w-20 h-20"
          />
        </div>
        <div className="pl-4 text-md text-white font-semibold mb-2 flex items-center">
          {arg.name.length > 14 ? `${arg.name.slice(0, 14)}...` : arg.name}
        </div>
      </div>
      <div
        className={`flex absolute drop-shadow-xl shadow-black right-0 top-6 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        {type === "playlists" ? (
          arg.songs?.length > 0 ? (
            <PlayButton showPlay={showPlay} playlist={arg}></PlayButton>
          ) : (
            ""
          )
        ) : (
          <PlayButton showPlay={showPlay} song={arg}></PlayButton>
        )}
      </div>
    </div>
  );
}

export default MusicCard2;
