import React from "react";
import MusicCard from "../MusicCard/MusicCard";
function PopularAlbum({ artist }) {
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
      <div className="flex flex-row gap-6 p-8 pt-0">
        {artist.popularAlbums.slice(0, 4).map((e) => (
          <MusicCard key={e.MusicCard_id} song={e} type="albums"></MusicCard>
        ))}
      </div>
    </div>
  );
}

export default PopularAlbum;
