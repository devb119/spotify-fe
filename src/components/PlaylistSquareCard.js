import React from "react";
import { GrPlayFill } from "react-icons/gr";
function PlaylistSquareCard({ item }) {
  return (
    <div className="playlist-item p-4 w-58 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-200 cursor-pointer relative">
      <img src={item.img} alt="song cover" className="rounded-lg w-full mb-3" />
      <div
        className={`playlist-icon h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 top-40
                       transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" />
      </div>
      <p className="text-md text-white font-semibold mb-2">
        {item.title.length > 17 ? `${item.title.slice(0, 17)}...` : item.title}
      </p>
      <p className="text-sm text-textColor font-semibold"> by {item.owner}</p>
    </div>
  );
}

export default PlaylistSquareCard;
