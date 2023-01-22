import React, { useEffect } from "react";
import { useState } from "react";
import { getAlbum } from "../api";
import DotFlashing from "./DotFlashing";
import { PlayListCover } from "./LikedSongList";
import { useParams } from "react-router-dom";
function AlbumPage() {
  const id = useParams().id;
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getAlbum(id)
      .then((data) => {
        setAlbum(data.data);
        console.log(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <div className="flex mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <>{/* <PlayListCover album={album} type="ALBUM"></PlayListCover> */}</>
      )}
    </div>
  );
}

export default AlbumPage;
