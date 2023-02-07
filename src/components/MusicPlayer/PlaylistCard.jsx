import React from "react";
import { useStateValue } from "../../context/StateProvider";
import { motion } from "framer-motion";
import { actionType } from "../../context/reducer";
import { IoMusicalNote } from "react-icons/io5";
export const PlaylistCard = () => {
  const [{ currentSong, currentPlaylist, isSongPlaying }, dispatch] =
    useStateValue();

  const setCurrentSong = (song) => {
    if (!isSongPlaying) {
      dispatch({ type: actionType.SET_IS_SONG_PLAYING, isSongPlaying: true });
    }

    if (currentSong._id !== song.id) {
      dispatch({ type: actionType.SET_CURRENT_SONG, currentSong: song });
    }
  };
  return (
    <div
      className="absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-420 max-h-[510px]
  flex flex-col overflow-y-scroll scrollbar-thin rounded-md shadow-md bg-primary text-sm"
    >
      {currentPlaylist?.length > 0 ? (
        currentPlaylist.map((song, i) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="group w-full p-2 hover:bg-card flex gap-3 items-center cursor-pointer bg-transparent"
            onClick={() => setCurrentSong(song)}
            key={song._id}
          >
            <IoMusicalNote className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />
            <div className="flex items-start flex-col">
              <p className="text-xs text-headingColor font-semibold">
                {song.name.length > 30
                  ? `${song.name.slice(0, 30)}...`
                  : song.name}{" "}
                {/* <span className="text-base">{song.album}</span> */}
              </p>
              <p className="text-textColor text-xs">
                {song.artist
                  .map((item) => {
                    //console.log(item.name)
                    return item.name;
                  })
                  .join(", ")}
                <span className="text-sm text-textColor font-semibold">
                  {song.album ? `(${song.album.name})` : ""}
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="text-sm text-textColor font-semibold p-2 flex justify-center items-center">
          No playlist is playing
        </div>
      )}
    </div>
  );
};
