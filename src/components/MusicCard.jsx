import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
function MusicCard({ song = null, album = null }) {
  const navigate = useNavigate();
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

  //console.log(song)
  return (
    <div
      className="relative p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg lg:w-56 hover:bg-cardBgLight transition-all duration-200 cursor-pointer "
      onMouseEnter={showIcon}
      onMouseLeave={hideIcon}
    >
      <div
        onClick={() => {
          song
            ? navigate(`/songs/${song._id}`)
            : navigate(`/albums/${album._id}`);
        }}
      >
        <img
          src={song ? song.imageURL : album.imageURL}
          alt="song cover"
          className="rounded-lg w-40 h-40 lg:h-48 lg:w-48 mb-3"
        />
        {song ? (
          <p className="text-md text-white font-semibold mb-2">
            {song.name.length > 14 ? `${song.name.slice(0, 14)}...` : song.name}
          </p>
        ) : (
          <p className="text-md text-white font-semibold mb-2">
            {album.name.length > 14
              ? `${album.name.slice(0, 14)}...`
              : song.name}
          </p>
        )}
        <p className="text-sm text-textColor font-semibold">
          {song &&
            song.artist
              .map((item) => {
                //console.log(item.name)
                return item.name;
              })
              .join(", ")}
        </p>
      </div>
      <div
        className={`h-12 w-12 bg-green-500 flex z-2 justify-center z-40 items-center rounded-full absolute right-7 top-1/2 ${
          showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
        } transition-all duration-200`}
      >
        <GrPlayFill className="text-xl" onClick={addToContext} />
      </div>
    </div>
  );
}

export default MusicCard;
