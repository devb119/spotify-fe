import React, { useState } from "react";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import PlayButton from "./PlayButton";
import Icon from "../assets/img/Icon";
function MusicCard({ song, type = "songs" }) {
  const navigate = useNavigate();
  const [showPlay, setShowPlay] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);

  //console.log(song)
  return (
    <div
      className="relative p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg lg:w-52 hover:bg-neutral-800 transition-all duration-200 cursor-pointer "
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
    >
      <div
        onClick={() => {
          navigate(`/${type}/${song._id}`);
        }}
      >
        <img
          src={song.imageURL ? song.imageURL : Icon.plain}
          alt="song cover"
          className="rounded-md w-38 h-38 lg:h-44 lg:w-44 mb-3 drop-shadow-xl shadow-black"
        />
        <p className="text-md text-white font-semibold mb-2">
          {song.name.length > 14 ? `${song.name.slice(0, 14)}...` : song.name}
        </p>
        <p className="text-sm text-textColor font-semibold">
          {type === "songs" &&
            song.artist
              .map((item) => {
                //console.log(item.name)
                return item.name;
              })
              .join(", ")}
          {type === "playlists" && `by ${user.data.name}`}
          {type === "albums" && song.section.name}
        </p>
      </div>
      <div
        className={`flex absolute drop-shadow-xl shadow-black right-1 top-36 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        <PlayButton song={song}></PlayButton>
      </div>
    </div>
  );
}

export default MusicCard;
