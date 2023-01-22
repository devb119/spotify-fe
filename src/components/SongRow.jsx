import React from "react";
import { Link } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import Equalizer from "./Equalizer";
import { addLikedSongs, deleteLikedSongs } from "../api";

export function DropDown({ options }) {
  return (
    <div>
      <div className="absolute top-10 right-72 z-30 rounded-sm w-44 p-1 bg-neutral-800 text-white font-semibold">
        {options.map((option) => {
          return (
            <div
              className="hover:bg-neutral-700 p-2 text-left hover:cursor-pointer"
              onClick={option.action}
            >
              {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
//type = 1 : has album name and added date ( used on playlist)
// type =2 : has count listen ( used on popular sugestions)
// type =3 : 3 cols blank (used on album page)
function SongRow({
  song,
  id,
  type = 1,
  selectedRow,
  setSelectedRow,
  deleteSongFromPlaylist,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [
    { isSongPlaying, currentSong, isSongPausing, likedSongs, user, player },
    dispatch,
  ] = useStateValue();

  const play = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    } else {
      player.current.audio.current.play();
    }
    dispatch({
      type: actionType.SET_IS_SONG_PAUSING,
      isSongPausing: false,
    });
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  const pause = () => {
    player.current.audio.current.pause();
    dispatch({ type: actionType.SET_IS_SONG_PAUSING, isSongPausing: true });
  };

  const options = [
    {
      text: "Remove from playlist",
      action: () => deleteSongFromPlaylist(song._id),
    },
    { text: "Go to artist", action: () => {} },
  ];

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
  function handleClick(e) {
    if (e.type === "contextmenu") {
      e.preventDefault();
      // alert("right click");
      if (selectedRow !== id) setSelectedRow(id);
      else setSelectedRow(0);
    }
  }
  return (
    <div
      className={
        selectedRow === id
          ? "py-2 bg-neutral-600 text-textColor relative font-medium grid grid-cols-12 text-xs gap-1 items-center rounded hover:text-white"
          : "py-2 hover:bg-neutral-800 text-textColor relative font-medium grid  grid-cols-12 text-xs gap-1 items-center rounded hover:text-white"
      }
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onContextMenu={handleClick}
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
              {!isSongPausing ? (
                isHovered ? (
                  <BiPause className="text-3xl " onClick={pause}></BiPause>
                ) : (
                  <Equalizer></Equalizer>
                )
              ) : !isHovered ? (
                <p className="text-base text-green-600" onClick={play}>
                  {id}
                </p>
              ) : (
                <BsFillPlayFill
                  className="text-2xl "
                  onClick={play}
                ></BsFillPlayFill>
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
      {type == 3 && <div className="col-span-3 text-left"></div>}

      <div className="col-span-1 text-center">
        {selectedRow === id && <DropDown options={options}></DropDown>}
      </div>
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
