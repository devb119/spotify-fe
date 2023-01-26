import React, { useEffect } from "react";
import { getAllSongs, getHomeSections, getMyPlaylists } from "../api";
// import { actionType } from "../context/reducer";
// import { useStateValue } from "../context/StateProvider";
import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";
import MusicCard2 from "./MusicCard2";
import ArtistsCard from "./ArtistsCard";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export const SongContainer = ({ title, songs }) => (
  <div className="mb-8">
    <p className="mb-4 font-bold text-white text-xl">{title}</p>
    {title === "Songs" && (
      <div className="flex items-center gap-8 flex-wrap">
        {songs.map((song) => (
          <MusicCard key={song._id} song={song} />
        ))}
      </div>
    )}
    {title === "Artists" && (
      <div className="flex items-center gap-8 flex-wrap">
        {songs.map((song) => (
          <ArtistsCard key={song._id} artist={song} />
        ))}
      </div>
    )}
    {title === "Albums" && (
      <div className="flex items-center gap-8 flex-wrap">
        {songs.map((song) => (
          <MusicCard key={song._id} song={song} type="albums" />
        ))}
      </div>
    )}
  </div>
);

export const SongContainer2 = ({ title, songs = [] }) => (
  <div className="mb-16">
    <p className="mb-4 font-bold text-white text-3xl">{title}</p>
    <div className="flex items-center gap-4 flex-wrap">
      {songs.map((song) => (
        <MusicCard2 key={song._id} arg={song} type="playlists" />
        // console.log(song)
      ))}
    </div>
  </div>
);

function HomeMusic() {
  const [sections, setSections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  const [{ user, playlists }, dispatch] = useStateValue();

  const token = useMemo(() => {
    if (user) return user.token;
    else return null;
  }, [user]);

  useEffect(() => {
    setIsLoading(true);
    getHomeSections().then((res) => {
      console.log(res.data);
      setSections(res.data);
    });
  }, []);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getMyPlaylists(token)
        .then((data) =>
          dispatch({ type: actionType.SET_PLAYLISTS, playlists: data.data })
        )
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, token]);

  const getSongContainerTitle = () => {
    const d = new Date();
    let hour = d.getHours();
    if (hour < 12) return "Good morning";
    else if (hour > 12 && hour < 17) return "Good afternoon";
    else if (hour < 22) return "Good evening";
    else return "Good night";
  };
  //console.log(playlists);

  return (
    <div className="p-8 pt-28">
      {isLoading ? (
        <div className="flex h-screen justify-around">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <>
          <SongContainer2 title={getSongContainerTitle()} songs={playlists} />
          {sections.map((s) => (
            <div key={s._id}>
              <div className="flex justify-between text-white">
                <h2 className="font-bold text-2xl hover:underline">
                  {s.section.name}
                </h2>
                {s.songs.length > 4 && (
                  <p
                    onClick={() => navigate(`/songs/sections/${s._id}`)}
                    className="font-semibold text-xs hover:underline tracking-widest text-textColor hover:text-white"
                  >
                    SHOW ALL
                  </p>
                )}
              </div>
              <div className="my-4 mb-12 flex flex-row gap-6">
                {s.songs.slice(0, 4).map((e, index) => (
                  <MusicCard song={e} key={index}></MusicCard>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default HomeMusic;
