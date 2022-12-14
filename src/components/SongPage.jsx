import React from "react";
import { PlayListCover } from "./PlaylistPage";
import { useParams } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
function SongPage() {
  const id = useParams().id;
  const [song, setSong] = React.useState({
    title: "Ice cream",
    artist: "Black Pink",
    img: "https://upload.wikimedia.org/wikipedia/vi/7/75/Ice_Cream_-_Selena_Gomez_x_Blackpink.png",
    liked: false,
  });
  function toggleLikeSong() {
    setSong({ ...song, liked: !song.liked });
  }
  return (
    <div>
      <PlayListCover type="SONG" song={song}></PlayListCover>
      <div className="p-8 flex items-center">
        <AiFillPlayCircle
          size={60}
          className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
        ></AiFillPlayCircle>
        {song.liked === true ? (
          <RiHeartFill
            className="fill-green-500 text-4xl m-2 mr-4 hover:cursor-pointer"
            onClick={() => {
              toggleLikeSong();
            }}
          ></RiHeartFill>
        ) : (
          <RiHeartLine
            className="text-4xl text-neutral-400 m-2 hover:cursor-pointer mr-4"
            onClick={() => {
              toggleLikeSong();
            }}
          ></RiHeartLine>
        )}
        <BsThreeDots
          size={32}
          className="h-54  text-neutral-400 hover:text-white hover:cursor-pointer"
        ></BsThreeDots>
      </div>
    </div>
  );
}

export default SongPage;
