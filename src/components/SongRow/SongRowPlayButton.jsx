import React from "react";
import Equalizer from "../Equalizer";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
function SongRowPlayButton({ song, isHovered, id }) {
  const [{ isSongPlaying, currentSong, isSongPausing, player }, dispatch] =
    useStateValue();
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
  return (
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
  );
}

export default SongRowPlayButton;
