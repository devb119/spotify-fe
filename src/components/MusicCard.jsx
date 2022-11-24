import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";

function MusicCard({ name, imageURL, artists }) {
  const [showPlay, setShowPlay] = useState(false);

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  const addToContext = () => {};
  return (
    <div
      className="p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-200 cursor-pointer relative"
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
      onClick={addToContext}
    >
      <img src={imageURL} alt="song cover" className="rounded-lg w-full mb-3" />
      <div
        className={`h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 top-1/2 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" />
      </div>
      <p className="text-md text-white font-semibold mb-2">
        {name.length > 17 ? `${name.slice(0, 17)}...` : name}
      </p>
      <p className="text-sm text-textColor font-semibold">{artists}</p>
    </div>
  );
}

export default MusicCard;
