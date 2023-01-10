import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";
import Icon from "../assets/img/Icon";
function ArtistsCard({ artist }) {
  
  const [showPlay, setShowPlay] = useState(false);
  

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  
  return (
    <div
      className="relative p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg lg:w-52 hover:bg-neutral-800 transition-all duration-200 cursor-pointer "
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
    >
      <div>
        <img
          src={artist.imageURL ? artist.imageURL : Icon.plain}
          alt="song cover"
          className="rounded-full w-38 h-38 lg:h-44 lg:w-44 mb-3 drop-shadow-xl shadow-black"
        />
        <p className="text-md text-white font-semibold mb-2">
          {artist.name.length > 14 ? `${artist.name.slice(0, 14)}...` : artist.name}
        </p>
        <p className="text-sm text-textColor font-semibold">
           Artist
        </p>
      </div>
      <div
        className={`h-12 w-12 bg-green-500 flex z-2 justify-center z-40 items-center rounded-full absolute right-7 top-1/2 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        <GrPlayFill className="text-xl"/>
      </div>
    </div>
  );
}

export default ArtistsCard;