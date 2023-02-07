import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSongsBySections } from "../../api";
import MusicCard from "../MusicCard/MusicCard";
import DotFlashing from "../DotFlashing";
function Section({ section }) {
  console.log(section);
  const [songs, setSongs] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    console.log(section._id);
    getSongsBySections(section._id)
      .then((data) => {
        console.log(data);
        setSongs(data.data);
      })
      .finally(() => setIsLoading(false));
  }, [section._id]);
  return (
    <div className="text-white">
      {isLoading ? (
        <DotFlashing />
      ) : (
        <>
          <div className="flex justify-between">
            <h2
              onClick={() => navigate(`/songs/sections/${section._id}`)}
              className="font-bold text-2xl hover:underline hover:cursor-pointer"
            >
              {section.name}
            </h2>
            {songs.length > 4 && (
              <p
                onClick={() => navigate(`/songs/sections/${section._id}`)}
                className="font-semibold text-xs hover:underline tracking-widest text-textColor hover:text-white"
              >
                SHOW ALL
              </p>
            )}
          </div>
          <div className="my-4 flex flex-row gap-6">
            {songs.slice(0, 4).map((e) => (
              <MusicCard song={e}></MusicCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Section;
