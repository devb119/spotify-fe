import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSongsByCategories } from "../api";
import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";

function CategorySongs() {
  const params = useParams();
  console.log(params.category);
  const [songs, setSongs] = React.useState();
  useEffect(() => {
    getSongsByCategories(params.category).then((data) => setSongs(data.data));
  }, [params.category]);

  console.log(typeof songs);
  return (
    <div>
      {songs ? (
        <div className="p-8 pt-0">
          <div className="mb-4">
            <h1 className="font-bold text-8xl mt-6 mb-20 text-white">
              {params.category}
            </h1>
          </div>

          <div className="flex flex-wrap gap-6">
            {songs.map((s) => (
              <MusicCard song={s}></MusicCard>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex  mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      )}
    </div>
  );
}

export default CategorySongs;
