import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongsByCategories } from "../api";
import MusicCard from "./MusicCard";

function CategorySongs() {
  const params = useParams();
  console.log(params.category);
  const [songs, setSongs] = React.useState();
  useEffect(() => {
    getSongsByCategories(params.category).then((data) => setSongs(data.data));
  }, []);
  return (
    <div className="p-8 pt-0">
      <div className="mb-4">
        <h1 className="font-bold text-xl text-white">{params.category}</h1>
      </div>
      {songs && (
        <div className="flex flex-wrap">
          {songs.map((s) => (
            <MusicCard song={s}></MusicCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategorySongs;
