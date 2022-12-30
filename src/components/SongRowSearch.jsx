import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Equalizer from "./Equalizer";

function SongRowSearch({ song }) {
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
              {isHovered && (
                <BsFillPlayFill
                  className="text-2xl "
                  onClick={play}
                ></BsFillPlayFill>
              )}
            </div>
          ) : (
            <div>
              {isHovered ? (
                <BiPause className="text-3xl " onClick={pause}></BiPause>
              ) : (
                <Equalizer></Equalizer>
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
              {song.artist.map((item) => {
              //console.log(item.name)
              return item.name;
            }).join(", ")}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3 text-left">{song.album}</div>
      <div className="col-span-2 text-left"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center flex items-center">
          <button className="bg-transparent text-white border-[#e4e1e1] border-[0.5px] hover:border-2 font-bold py-2 px-4 rounded-full">
            Add
          </button>
      </div>
    </div>
  );
}

export default SongRowSearch;
