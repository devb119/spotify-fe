import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Equalizer from "./Equalizer";
import { addLikedSongs, deleteLikedSongs } from "../api";

function SongRow({ song, id, type = 1 }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [{ isSongPlaying, currentSong, likedSongs, user }, dispatch] =
    useStateValue();

  const play = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  const pause = () => {
    dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: false });
  };

  async function handleLikeSong() {
    if (likedSongs.find((el) => el._id === song._id)) {
      const newLikedSongs = await deleteLikedSongs(song._id, user.token);
      dispatch({
        type: actionType.SET_LIKED_SONGS,
        likedSongs: newLikedSongs.data,
      });
    } else {
      const newLikedSongs = await addLikedSongs(song._id, user.token);
      dispatch({
        type: actionType.SET_LIKED_SONGS,
        likedSongs: newLikedSongs.data,
      });
    }
  }
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
                  className="text-2xl "
                  onClick={play}
                ></BsFillPlayFill>
              ) : (
                <p className="text-base">{id}</p>
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
      <div
        className={
          type == 1 ? "col-span-4 text-left " : "col-span-6 text-left "
        }
      >
        <div className="flex items-center">
          <img className="w-10 h-10" src={song.imageURL} alt="song cover" />
          <div className="ml-4 flex flex-col">
            <Link
              to={`/songs/${song._id}`}
              className={
                currentSong?._id === song._id
                  ? "text-sm text-green-500 hover:underline pb-2 hover:cursor-pointer"
                  : "text-sm text-white hover:underline pb-2 hover:cursor-pointer"
              }
            >
              {song.name}
            </Link>
            {type == 1 && (
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
            )}
          </div>
        </div>
      </div>
      {type == 1 && (
        <>
          <div className="col-span-3 text-left">{song.album?.name}</div>
          <div className="col-span-2 text-left">{song.updatedAt}</div>{" "}
        </>
      )}
      {type == 2 && (
        <>
          <div className="col-span-3 text-left">
            {song.countListen.toLocaleString()}
          </div>
        </>
      )}

      <div className="col-span-1 text-center"> </div>
      <div className="col-span-1 text-center flex items-center">
        {likedSongs.find((el) => el._id === song._id) ? (
          <RiHeartFill
            className="fill-green-700 text-base m-2 mr-4 hover:cursor-pointer"
            onClick={handleLikeSong}
          ></RiHeartFill>
        ) : (
          <RiHeartLine
            className="text-base m-2 hover:cursor-pointer mr-4"
            onClick={handleLikeSong}
          ></RiHeartLine>
        )}
        <div>
          <span>{Math.floor(song.duration / 60)}</span>:
          <span>
            {song.duration - Math.floor(song.duration / 60) * 60 < 10
              ? "0" + song.duration - Math.floor(song.duration / 60) * 60
              : song.duration - Math.floor(song.duration / 60) * 60}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SongRow;
