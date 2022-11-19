import React from "react";

function MusicCard({ name, imageURL, artists }) {
  return (
    <div className="p-4 w-52 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-300 cursor-pointer">
      <img src={imageURL} alt="song cover" className="rounded-lg w-full mb-4" />
      <p className="text-md text-white font-semibold mb-4">
        {name.length > 20 ? `${name.slice(0, 20)}...` : name}
      </p>
      <p className="text-sm text-textColor font-semibold">{artists}</p>
    </div>
  );
}

export default MusicCard;
