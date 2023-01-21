import React from "react";

import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";
function PlayButton({ showPlay, song = null, playlist = null }) {
  const [
    { isSongPlaying, isSongPausing, player, currentSong, user },
    dispatch,
  ] = useStateValue();
  const addToContext = () => {
    if (song !== null) {
      if (!isSongPlaying) {
        dispatch({
          type: actionType.SET_IS_SONG_PLAYING,
          isSongPlaying: true,
        });
      }
      //song already playing
      else {
        player.current.audio.current.play();
      }
      dispatch({
        type: actionType.SET_IS_SONG_PAUSING,
        isSongPausing: false,
      });
      if (currentSong?._id !== song._id) {
        dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
      }
    }
  };
  const pause = () => {
    if (song !== null) {
      player.current.audio.current.pause();
      dispatch({
        type: actionType.SET_IS_SONG_PAUSING,
        isSongPausing: true,
      });

      if (currentSong?._id !== song._id) {
        dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
      }
    }
  };

  return (
    <div
      className={`h-12 w-12 bg-green-500 flex z-2 justify-center z-40 items-center rounded-full absolute right-7 top-1/2 ${
        showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
      } transition-all duration-200`}
    >
      {!isSongPausing && currentSong?._id === song._id ? (
        <GrPauseFill className="text-xl" onClick={pause} />
      ) : (
        <GrPlayFill className="text-xl" onClick={addToContext} />
      )}
    </div>
  );
}

export default PlayButton;
