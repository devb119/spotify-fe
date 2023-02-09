import React from "react";
import { getArtist } from "../../api";
import DotFlashing from "../DotFlashing";
import PopularAlbum from "./PopularAlbum";
import PopularSongs from "./PopularSongs";
function PopularSuggestion({ artist }) {
  const [artistFromAPI, setArtistFromAPI] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    getArtist(artist[0]._id)
      .then((data) => {
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
