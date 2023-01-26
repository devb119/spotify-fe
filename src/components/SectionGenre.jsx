import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSectionsByCategories, getSongsBySections } from "../api";
import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";

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

function SectionGenre() {
  const params = useParams();
  console.log(params.id);
  const [sections, setSections] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true);
    getSectionsByCategories(params.id)
      .then((data) => {
        console.log(data);
        setSections(data.data);
      })
      .finally(() => setLoading(false));
  }, [params.id]);
  return (
    <div>
      {!loading ? (
        <div className="p-8 pt-0">
          <div className="mb-4">
            <h1 className="font-bold text-8xl mt-6 mb-20 text-white">
              {sections[0].genre.name}
            </h1>
          </div>

          <div className="">
            {sections.map((s) => (
              <Section section={s}></Section>
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

export default SectionGenre;
