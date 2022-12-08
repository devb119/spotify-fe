import React, { useEffect } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import MusicCard from "./MusicCard";

export const SongContainer = ({ title, songs }) => (
  <div className="mb-8">
    <p className="mb-4 font-bold text-white text-xl">{title}</p>
    <div className="flex items-center gap-6 flex-wrap">
      {songs.map((song) => (
        <MusicCard key={song._id} song={song} />
      ))}
    </div>
  </div>
);

function HomeMusic() {
  const [{ allSongs }, dispatch] = useStateValue();
  useEffect(() => {
    getAllSongs().then((songData) => {
      dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songData.data });
    });
  }, [dispatch]);
  return (
    <div className="p-8 pt-0">
      {allSongs && (
        <>
          <SongContainer title="Recommended" songs={allSongs} />
        </>
      )}
    </div>
  );
}

export default HomeMusic;
