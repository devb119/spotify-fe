import React, { useEffect } from "react";
import { useState } from "react";
import { getAlbum } from "../api";
import { DotFlashing } from "../components";
import { PlayListCover } from "../components/LikedSongList";
import { useParams } from "react-router-dom";
import { PlayPlaylist } from "./PlaylistPage";
import { HiOutlineClock } from "react-icons/hi";
import SongRow from "../components/SongRow/SongRow";
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
        <div>
          <PlayListCover album={album} type="ALBUM"></PlayListCover>
          <div className="p-8">
            <div className="flex mb-12 items-center">
              <PlayPlaylist playlist={album}></PlayPlaylist>
            </div>
            <div>
              <div className="border-b-1 border-gray-700">
                <div className="text-textColor font-medium text-sm grid grid-cols-12 gap-1 ">
                  <div className="text-center">#</div>
                  <div className="col-span-4 text-left">TITLE</div>
                  <div className="col-span-6 text-right "></div>
                  <div className="col-span-1 text-right grid justify-center ">
                    <HiOutlineClock className="text-xl "></HiOutlineClock>
                  </div>
                </div>
              </div>
              <hr className="border-t-1 border-neutral-700 my-2"></hr>
              <div>
                {album.songs?.map((s, index) => (
                  <SongRow type="3" song={s} id={index + 1} key={s._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumPage;
