import React from "react";
import { GrPlayFill } from "react-icons/gr";
function PlaylistSquareCard({ item, userName }) {
  return (
    <div className="playlist-item p-4 w-58 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-200 cursor-pointer relative">
      <img src="https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5" alt="song cover" className="rounded-lg w-full mb-3" /> 
      <div
        className={`playlist-icon h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 bottom-5
                       transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" />
      </div>
      <p className="text-md text-white font-semibold mb-2">
        {item.name.length > 17 ? `${item.name.slice(0, 17)}...` : item.name}
      </p>
      <p className="text-sm text-textColor font-semibold"> by {userName}</p>
    </div>
  );
}

export default PlaylistSquareCard;
