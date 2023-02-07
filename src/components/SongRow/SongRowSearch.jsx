import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import SongRowPlayButton from "./SongRowPlayButton";
function SongRowSearch({ id, song, addClicked }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [{ isSongPlaying, currentSong }, dispatch] = useStateValue();
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
        <SongRowPlayButton
          id={id}
          song={song}
          isHovered={isHovered}
        ></SongRowPlayButton>
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
              {song.artist
                .map((item) => {
                  //console.log(item.name)
                  return item.name;
                })
                .join(", ")}
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-3 text-left">{song.album?.name}</div>
      <div className="col-span-2 text-left"></div>
      <div className="col-span-1 text-center"></div>
      <div className="col-span-1 text-center flex items-center">
        <button
          onClick={addClicked}
          className="bg-transparent text-white border-[#e4e1e1] border-[0.5px] hover:border-2 font-bold py-2 px-4 rounded-full"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default SongRowSearch;
