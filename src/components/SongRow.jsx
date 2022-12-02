import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
function SongRow({ song, id }) {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <tr
      className="py-2 hover:bg-gray-700 text-textColor font-medium grid grid-cols-12 text-xs gap-1 items-center rounded"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <td className="text-center items-center grid justify-center">
        {isHovered ? (
          <BsFillPlayFill className="text-xl "></BsFillPlayFill>
        ) : (
          <p>{id}</p>
        )}
      </td>
      <td className="col-span-4 text-left ">
        <div className="flex items-center">
          <img className="w-10 h-10" src={song.img}></img>
          <div className="ml-4 flex flex-col">
            <Link
              to="#"
              className="text-sm text-white hover:underline pb-2 hover:cursor-pointer"
            >
              {song.title}
            </Link>
            <Link
              to="#"
              className="hover:underline hover:text-white hover:cursor-pointer"
            >
              {song.artist}
            </Link>
          </div>
        </div>
      </td>
      <td className="col-span-3 text-left">{song.album}</td>
      <td className="col-span-2 text-left">{song.dateAdded}</td>
      <td className="col-span-1 text-center"> </td>
      <td className="col-span-1 text-center flex items-center">
        {song.liked === "true" ? (
          <RiHeartFill className="fill-green-700 text-base m-2"></RiHeartFill>
        ) : (
          <RiHeartLine className="text-base m-2"></RiHeartLine>
        )}
        {song.time}
      </td>
    </tr>
  );
}

export default SongRow;
