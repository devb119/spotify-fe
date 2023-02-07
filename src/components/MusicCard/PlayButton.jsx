import React from "react";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

export function PlayButton({ song = null, playlist = null }) {
  console.log(playlist);
  const [{ isSongPlaying, isSongPausing, player, currentSong }, dispatch] =
    useStateValue();
  const addToContext = () => {
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
    if (song !== null) {
      dispatch({
        type: actionType.SET_IS_SONG_PAUSING,
        isSongPausing: false,
      });
      if (currentSong?._id !== song._id) {
        dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
      }
    } else if (playlist !== null) {
      dispatch({
        type: actionType.SET_CURRENT_PLAYLIST,
        currentPlaylist: playlist.songs,
      });
      if (
        playlist.songs.filter((song) => song._id === currentSong?._id)
          .length === 0
      ) {
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentSong: playlist.songs[0],
        });
      }
    }
  };
  const pause = () => {
    player.current.audio.current.pause();
    dispatch({
      type: actionType.SET_IS_SONG_PAUSING,
      isSongPausing: true,
    });
  };

  return (
    <div>
      {!isSongPausing &&
      (currentSong?._id === song?._id ||
        playlist?.songs.filter((s) => s._id === currentSong?._id).length >
          0) ? (
        <AiFillPauseCircle
          size={56}
          className="fill-green-500 mr-5 rounded-full hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
          onClick={pause}
        />
      ) : (
        <AiFillPlayCircle
          size={56}
          className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
          onClick={addToContext}
        />
      )}
    </div>
  );
}

export default PlayButton;
