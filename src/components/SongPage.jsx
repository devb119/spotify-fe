import React from "react";
import { PlayListCover } from "./PlaylistPage";
import { Link, useParams } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { actionType } from "../context/reducer";

import { BsThreeDots } from "react-icons/bs";
import { useStateValue } from "../context/StateProvider";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { getSong } from "../api";
function SongPage() {
  const id = useParams().id;
  const [song, setSong] = React.useState(null);
  const liked = true;
  const [{ isSongPlaying, currentSong }, dispatch] = useStateValue();

  const playSong = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  React.useEffect(() => {
    getSong(id).then((song) => {
      console.log(song);
      setSong(song.data);
    });
  }, [id]);
  function toggleLikeSong() {
    setSong({ ...song, liked: !song.liked });
  }
  if (song) console.log(song.songURL);
  return (
    <div>
      {song && (
        <div>
          <PlayListCover type="SONG" song={song}></PlayListCover>
          <div className="px-8 py-6 flex items-center">
            <AiFillPlayCircle
              onClick={playSong}
              size={60}
              className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
            ></AiFillPlayCircle>
            {liked === true ? (
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
          <div className="px-8 text-neutral-400">
            <h2 className="text-white text-xl font-bold">Lyrics</h2>
            <p className="mt-6 text-sm font-semibold">
              {song.lyric.split("\n").map((e) => (
                <div>{e}</div>
              ))}
            </p>
            <div className=" hover:bg-neutral-700  my-4 rounded flex items-center">
              <img
                className="w-24 h-24 p-2 rounded-full"
                src={song.artist[0].imageURL}
                alt="artist"
              />
              <div className="flex flex-col m-2 text-white  ">
                <p className="font-semibold text-xs">ARTIST</p>
                <Link
                  to=""
                  className="font-bold text-base mt-2 hover:underline"
                >
                  {song.artist.map((e) => e.name).join(",")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SongPage;
