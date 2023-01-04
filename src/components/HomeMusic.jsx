import React, { useEffect } from "react";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import MusicCard from "./MusicCard";
import MusicCard2 from "./MusicCard2";

const myPlaylist = [
  {
    id: 1,
    title: "My Playlist #1",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 2,
    title: "My Playlist #2",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 3,
    title: "My Playlist #3",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 4,
    title: "My Playlist #4",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 5,
    title: "My Playlist #5 dddddddddddddd",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
];

export const SongContainer = ({ title, songs }) => (
  <div className="mb-8">
    <p className="mb-4 font-bold text-white text-xl">{title}</p>
    <div className="flex items-center gap-8 flex-wrap">
      {songs.map((song) => (
        <MusicCard key={song._id} song={song} />
      ))}
    </div>
  </div>
);

export const SongContainer2 = ({ title, songs }) => (
  <div className="mb-16">
    <p className="mb-4 font-bold text-white text-2xl">{title}</p>
    <div className="flex items-center gap-4 flex-wrap">
      {songs.map((song) => (
        <MusicCard2 key={song.id} song={song} />
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
      <SongContainer2 title="Good morning" songs={myPlaylist}/>

      {allSongs && (
        <>
          <SongContainer title="Recommended" songs={allSongs} />
        </>
      )}
    </div>
  );
}

export default HomeMusic;
