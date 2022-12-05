import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

function MusicCard({ song }) {
  const [showPlay, setShowPlay] = useState(false);
  const [{ isSongPlaying, currentSong }, dispatch] = useStateValue();

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  const addToContext = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  return (
    <div
      className="p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-200 cursor-pointer relative"
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
      onClick={addToContext}
    >
      <img
        src={song.imageURL}
        alt="song cover"
        className="rounded-lg w-40 h-40 mb-3"
      />
      <div
        className={`h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 top-1/2 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" />
      </div>
      <p className="text-md text-white font-semibold mb-2">
        {song.name.length > 14 ? `${song.name.slice(0, 14)}...` : song.name}
      </p>
      <p className="text-sm text-textColor font-semibold">{song.artist}</p>
    </div>
  );
}

export default MusicCard;
