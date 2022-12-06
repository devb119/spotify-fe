import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Icon from "../assets/img/Icon.jsx";
function SongRow({ song, id, toggleLikeSong }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [{ isSongPlaying, currentSong }, dispatch] = useStateValue();

  const play = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  const pause = () => {};
  return (
    <div
      className="py-2 hover:bg-neutral-800 text-textColor font-medium grid grid-cols-12 text-xs gap-1 items-center rounded"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div>
        <div className="text-center items-center grid justify-center">
          {currentSong?._id !== song._id ? (
            <div>
              {isHovered ? (
                <BsFillPlayFill
                  className="text-xl "
                  onClick={play}
                ></BsFillPlayFill>
              ) : (
                <p>{id}</p>
              )}
            </div>
          ) : (
            <div>
              {isHovered ? (
                <BiPause className="text-2xl " onClick={pause}></BiPause>
              ) : (
                <img src={Icon.equalizer} alt="icon" />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-4 text-left ">
        <div className="flex items-center">
          <img className="w-10 h-10" src={song.imageURL} alt="song cover" />
          <div className="ml-4 flex flex-col">
            <Link
              to="#"
              className={
                currentSong?._id === song._id
                  ? "text-sm text-green-500 hover:underline pb-2 hover:cursor-pointer"
                  : "text-sm text-white hover:underline pb-2 hover:cursor-pointer"
              }
            >
              {song.name}
            </Link>
            <Link
              to="#"
              className="hover:underline hover:text-white hover:cursor-pointer"
            >
              {song.artist.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3 text-left">{song.album}</div>
      <div className="col-span-2 text-left">{song.dateAdded}</div>
      <div className="col-span-1 text-center"> </div>
      <div className="col-span-1 text-center flex items-center">
        {song.liked === true ? (
          <RiHeartFill
            className="fill-green-700 text-base m-2 mr-4 hover:cursor-pointer"
            onClick={() => {
              toggleLikeSong(song.id);
            }}
          ></RiHeartFill>
        ) : (
          <RiHeartLine
            className="text-base m-2 hover:cursor-pointer mr-4"
            onClick={() => {
              toggleLikeSong(song.id);
            }}
          ></RiHeartLine>
        )}
        {song.time}
      </div>
    </div>
  );
}

export default SongRow;
