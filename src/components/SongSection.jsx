import React from "react";
import { Link, useParams } from "react-router-dom";

import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";
import { getSongsBySections } from "../api";
function SongSection() {
  const id = useParams().id;
  const [songs, setSongs] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    console.log(id);
    getSongsBySections(id)
      .then((data) => {
        console.log(data);
        setSongs(data.data);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="text-white p-8 pt-20">
      {isLoading ? (
        <DotFlashing />
      ) : (
        <div>
          <h2 className="font-bold text-2xl hover:underline">
            {songs[0].section.name}
          </h2>

          <div className="my-4 flex gap-6 flex-wrap">
            {songs.map((e) => (
              <MusicCard song={e}></MusicCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SongSection;
