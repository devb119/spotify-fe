import React from "react";
import SongRow from "../SongRow/SongRow";
function PopularSongs({ artist, type = 1 }) {
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

export default PopularSongs;
