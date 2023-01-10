import React, { useEffect } from "react";
import { getAllSongs, getHomeSections } from "../api";
// import { actionType } from "../context/reducer";
// import { useStateValue } from "../context/StateProvider";
import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";
import MusicCard2 from "./MusicCard2";
import ArtistsCard from "./ArtistsCard";
import { useNavigate, useParams } from "react-router-dom";

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
    {title === "Songs" && <div className="flex items-center gap-8 flex-wrap">
      {songs.map((song) => (
        <MusicCard key={song._id} song={song} />
      ))}
    </div>}
    {title === "Artists" &&  <div className="flex items-center gap-8 flex-wrap">
      {songs.map((song) => (
        <ArtistsCard key={song._id} artist={song} />
      ))}
    </div> }
    {title === "Albums" && <div className="flex items-center gap-8 flex-wrap">
      {songs.map((song) => (
        <MusicCard key={song._id} song={song} type = "albums" />
      ))}
    </div>}
  
    
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
  const [sections, setSections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getHomeSections()
      .then((res) => {
        console.log(res.data);
        setSections(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div className="p-8 pt-28">
      <SongContainer2 title="Good morning" songs={myPlaylist} />

      {isLoading ? (
        <div className="flex justify-around">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <>
          {sections.map((s) => (
            <>
              <div className="flex justify-between text-white">
                <h2 className="font-bold text-2xl hover:underline">
                  {s.section.name}
                </h2>
                {s.songs.length > 4 && (
                  <p
                    onClick={() => navigate(`/songs/sections/${s.section._id}`)}
                    className="font-semibold text-xs hover:underline tracking-widest text-textColor hover:text-white"
                  >
                    SHOW ALL
                  </p>
                )}
              </div>
              <div className="my-4 flex flex-row gap-6">
                {s.songs.slice(0, 4).map((e, index) => (
                  <MusicCard song={e} key={index}></MusicCard>
                ))}
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default HomeMusic;
