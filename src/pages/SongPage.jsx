import { PlayListCover } from "../components/LikedSongList";
import { Link, useParams } from "react-router-dom";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { actionType } from "../context/reducer";
import { BsThreeDots } from "react-icons/bs";
import { useStateValue } from "../context/StateProvider";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import {
  addLikedSongs,
  deleteLikedSongs,
  getLikedSongs,
  getSong,
} from "../api";
import PopularSuggestion from "../components/PopularSuggestion/PopularSuggestion";
import { useEffect, useState } from "react";
import { DotFlashing } from "../components";

function SongPage() {
  const id = useParams().id;
  const [song, setSong] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [
    { isSongPlaying, currentSong, player, isSongPausing, user, likedSongs },
    dispatch,
  ] = useStateValue();

  const play = () => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    } else {
      player.current.audio.current.play();
    }
    if (currentSong?._id !== song._id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  const pause = () => {
    player.current.audio.current.pause();
    dispatch({ type: actionType.SET_IS_SONG_PAUSING, isSongPausing: true });
  };

  useEffect(() => {
    if (!likedSongs)
      getLikedSongs(user.token).then((data) =>
        dispatch({
          type: actionType.SET_LIKED_SONGS,
          likedSongs: data.data.likedSongs,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedSongs?.length]);

  useEffect(() => {
    setIsLoading(true);
    getSong(id)
      .then((song) => setSong(song.data))
      .finally(() => setIsLoading(false));
  }, [id]);

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
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <DotFlashing />
    </div>
  ) : (
    <>
      <PlayListCover type="SONG" song={song} />
      <div className="px-8 py-6 flex items-center">
        {isSongPausing ? (
          <AiFillPlayCircle
            onClick={() => play()}
            size={60}
            className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
          ></AiFillPlayCircle>
        ) : (
          <AiFillPauseCircle
            onClick={() => pause()}
            size={60}
            className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
          ></AiFillPauseCircle>
        )}
        {likedSongs.find((el) => el._id === song._id) ? (
          <RiHeartFill
            className="fill-green-500 text-4xl m-2 mr-4 hover:cursor-pointer"
            onClick={() => {
              handleLikeSong();
            }}
          ></RiHeartFill>
        ) : (
          <RiHeartLine
            className="text-4xl text-textColor m-2 hover:cursor-pointer mr-4"
            onClick={() => {
              handleLikeSong();
            }}
          ></RiHeartLine>
        )}
        <BsThreeDots
          size={32}
          className="h-54  text-textColor hover:text-white hover:cursor-pointer"
        ></BsThreeDots>
      </div>
      <div className="px-8 text-textColor">
        <h2 className="text-white text-xl font-bold">Lyrics</h2>
        <div className="mt-6 text-sm font-semibold">
          {song.lyric.split("\n").map((e) => (
            <div>{e}</div>
          ))}
        </div>
        <div className=" hover:bg-neutral-700  my-4 rounded flex items-center">
          <img
            className="w-24 h-24 p-2 rounded-full"
            src={song.artist[0].imageURL}
            alt="artist"
          />
          <div className="flex flex-col m-2 text-white  ">
            <p className="font-semibold text-xs tracking-widest">ARTIST</p>
            <p to="" className="font-bold text-base mt-2">
              {song.artist.map((e, index) => (
                <Link className="hover:underline" to={`/artists/${e._id}`}>
                  {index < song.artist.length - 1 ? e.name + ",  " : e.name}
                </Link>
              ))}
            </p>
          </div>
        </div>
      </div>
      <PopularSuggestion artist={song.artist}></PopularSuggestion>
    </>
  );
}

export default SongPage;
