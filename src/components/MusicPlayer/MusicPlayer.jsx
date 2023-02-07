import React, { useState, useEffect, useRef } from "react";
import { useStateValue } from "../../context/StateProvider";
import { RiPlayListFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { IoMusicalNote, IoArrowRedo } from "react-icons/io5";
import { getAllSongs } from "../../api";
import { PlaylistCard } from "./PlaylistCard";
function MusicPlayer() {
  // eslint-disable-next-line no-unused-vars
  const [{ currentSong, miniPlayer, currentPlaylist }, dispatch] =
    useStateValue();
  const [isPlaylist, setIsPlaylist] = useState(false);
  const player = useRef();
  const [allSongs, setAllSongs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch({ type: actionType.SET_PLAYER, player });
  }, [dispatch]);
  useEffect(() => {
    setLoading(true);
    getAllSongs()
      .then((allSongs) => setAllSongs(allSongs.data))
      .finally(() => setLoading(false));
  }, []);

  // TODO
  const nextTrack = () => {
    if (!currentPlaylist) {
      // get random song to play.
      if (!loading)
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentSong: allSongs[Math.floor(Math.random() * allSongs.length)],
        });
    }
    const index = currentPlaylist.findIndex(
      (song) => song.id === currentSong?._id
    );
    dispatch({
      type: actionType.SET_CURRENT_SONG,
      currentSong: currentPlaylist[(index + 1) % currentPlaylist.length],
    });
  };

  const previousTrack = () => {
    if (!currentPlaylist) {
      if (!loading)
        dispatch({
          type: actionType.SET_CURRENT_SONG,
          currentSong: allSongs[Math.floor(Math.random() * allSongs.length)],
        });
    }
    let index = currentPlaylist.findIndex(
      (song) => song.id === currentSong?._id
    );
    // Prev of first song is last
    if (index === 0) index = currentPlaylist.length;
    // If not found any song in current playlist => play first song in the list
    if (index === -1) index = 1;
    dispatch({
      type: actionType.SET_CURRENT_SONG,
      currentSong: currentPlaylist[index - 1],
    });
  };

  const togglePlaylist = () => setIsPlaylist(!isPlaylist);

  const togglePlayer = () =>
    dispatch({ type: actionType.SET_MINI_PLAYER, miniPlayer: !miniPlayer });
  console.log(currentPlaylist);
  return (
    <div className="w-full flex items-center gap-3">
      <div
        className={`w-full full items-center gap-3 p-4 ${
          miniPlayer ? "absolute top-40" : "flex relative"
        }`}
      >
        <img
          src={currentSong?.imageURL}
          alt=""
          className="w-16 h-16 object-cover rounded-sm"
        />
        <div className="flex items-start flex-col w-44">
          <p className="text-xs text-headingColor font-semibold">{`${
            currentSong?.name.length > 30
              ? currentSong?.name.slice(0, 30)
              : currentSong?.name
          }`}</p>
          <p className="text-textColor text-xs">
            {currentSong?.artist
              .map((item) => {
                //console.log(item.name)
                return item.name;
              })
              .join(", ")}
            <span className="text-xs text-textColor font-semibold">
              {currentSong.album
                ? currentSong.album?.name.length > 10
                  ? `(${currentSong.album?.name.slice(0, 10)}...)`
                  : `(${currentSong.album?.name})`
                : ""}
            </span>
          </p>
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlaylist}>
            <RiPlayListFill className="text-textColor hover:text-headingColor text-sm cursor-pointer" />
          </motion.i>
        </div>
        <div className="flex-1">
          <AudioPlayer
            src={currentSong?.songURL}
            onPlay={() => {
              dispatch({
                type: actionType.SET_IS_SONG_PAUSING,
                isSongPausing: false,
              });
              //  console.log(`${currentSong?.name} is playing`);
            }}
            onPause={() => {
              dispatch({
                type: actionType.SET_IS_SONG_PAUSING,
                isSongPausing: true,
              });
            }}
            autoPlay={true}
            showSkipControls={true}
            ref={player}
            // TODO
            onClickNext={nextTrack}
            onClickPrevious={previousTrack}
          />
        </div>

        <div className="h-full flex items-center justify-center flex-col gap-3">
          {/* <motion.i whileTap={{ scale: 0.8 }} onClick={closeMusicPlayer}>
            <IoMdClose className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i> */}
          <motion.i whileTap={{ scale: 0.8 }} onClick={togglePlayer}>
            <IoArrowRedo className="text-textColor hover:text-headingColor text-2xl cursor-pointer" />
          </motion.i>
        </div>
        {isPlaylist && <PlaylistCard />}
        {miniPlayer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed right-2 bottom-2 "
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center relative ">
              <div className="absolute inset-0 rounded-full bg-green-300 blur-xl animate-pulse"></div>
              <img
                onClick={togglePlayer}
                src={currentSong.imageURL}
                className="z-50 w-28 h-28 rounded-full object-cover cursor-pointer"
                alt=""
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MusicPlayer;
