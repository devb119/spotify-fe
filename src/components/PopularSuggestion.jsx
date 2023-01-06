import React from "react";
import { getArtist } from "../api";
import DotFlashing from "./DotFlashing";
import MusicCard from "./MusicCard";
import SongRow from "./SongRow";

export function PopularSongs({ artist, type = 1 }) {
  const [canShowMore, setCanShowMore] = React.useState(true);
  return (
    <div className="text-white p-8 ">
      {type === 1 && (
        <div>
          <div className="text-neutral-400 text-sm font-semibold">
            Popular Tracks by
          </div>
          <div className="text-xl font-bold"> {artist.name}</div>
        </div>
      )}
      <div className="mt-8">
        {canShowMore
          ? artist.popularTracks
              .slice(0, 5)
              .map((s, index) => (
                <SongRow type="2" song={s} id={index + 1} key={index}></SongRow>
              ))
          : artist.popularTracks.map((s, index) => (
              <SongRow type="2" song={s} id={index + 1} key={index}></SongRow>
            ))}
      </div>
      {artist.popularTracks.length > 5 && (
        <p
          className="mt-6 text-xs font-extrabold transition-all  tracking-widest text-textColor hover:text-white"
          onClick={() => {
            setCanShowMore(!canShowMore);
          }}
        >
          {canShowMore ? "SEE MORE" : "SHOW LESS"}
        </p>
      )}
    </div>
  );
}
export function PopularAlbum({ artist }) {
  console.log(artist.popularAlbums);
  return (
    <div>
      <div className="p-8 flex justify-between text-textColor">
        <div className="text-xl font-bold text-white">
          Popular Albums by {artist.name}
        </div>
        <div className="font-semibold text-xs tracking-widest hover:text-white transition-all hover:underline">
          SEE DISCOGRAPHY
        </div>
      </div>
      <div>
        {artist.popularAlbums.map((e) => (
          <>
            <div>{e.name}</div>
            <MusicCard
              key={e.MusicCard_id}
              album={e}
              song={artist.popularTracks[0]}
            ></MusicCard>
          </>
        ))}
      </div>
    </div>
  );
}

function PopularSuggestion({ artist }) {
  const [artistFromAPI, setArtistFromAPI] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    getArtist(artist[0]._id)
      .then((data) => {
        console.log(data);
        setArtistFromAPI(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <DotFlashing></DotFlashing>
      ) : (
        <>
          <PopularSongs artist={artistFromAPI}></PopularSongs>
          <PopularAlbum artist={artistFromAPI}></PopularAlbum>
        </>
      )}
    </div>
  );
}

export default PopularSuggestion;
