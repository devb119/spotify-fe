import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArtist } from "../api";
import { DotFlashing } from "../components";
import PopularAlbum from "../components/PopularSuggestion/PopularAlbum";
import PopularSongs from "../components/PopularSuggestion/PopularSongs";
function ArtistPage() {
  const id = useParams().id;

  const [artist, setArtist] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    getArtist(id)
      .then((data) => setArtist(data.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex  mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <div>
          <div
            className="text-white p-8 pt-28"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0)10%, rgba(0, 0, 0, 0)80%), url(${artist.imageURL})`,
            }}
          >
            <div>
              <div className="text-sm font-semibold">ARTIST</div>
              <div className="text-7xl font-bold mt-1">{artist.name}</div>
              {/* <div className=" font-semibold mt-10">
                677,949,049 monthly listeners
              </div> */}
            </div>
          </div>
          <div>
            <PopularSongs artist={artist}></PopularSongs>
            <PopularAlbum artist={artist}></PopularAlbum>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistPage;
