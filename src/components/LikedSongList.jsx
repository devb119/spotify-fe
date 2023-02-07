import React from "react";
import { HiOutlineClock } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import SongRow from "./SongRow/SongRow";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { FastAverageColor } from "fast-average-color";
import Icon from "../assets/img/Icon";
import { PlayPlaylist } from "../pages/PlaylistPage";
import { PlayListCover } from "./PlayListCover";
function LikedSongList({ playlist, setPlaylist }) {
  const toggleLikeSong = (id) => {
    setPlaylist({
      ...playlist,
      songs: playlist.songs.map((song) =>
        song.id === id ? { ...song, liked: !song.liked } : song
      ),
    });
  };
  return (
    <div>
      <PlayListCover
        type="PLAYLIST"
        playlist={playlist}
        imageType="likedSongs"
      ></PlayListCover>
      <div className="p-8">
        <div>
          <span className="flex mb-12 items-center">
            <PlayPlaylist playlist={playlist}></PlayPlaylist>
          </span>

          {playlist.songs?.length === 0 ? (
            <hr className="border-t-1 border-gray-600"></hr>
          ) : (
            <div>
              <div className="border-b-1 border-gray-700">
                <div className="text-textColor font-medium text-sm grid grid-cols-12 gap-1 ">
                  <div className="text-center">#</div>
                  <div className="col-span-4 text-left">TITLE</div>
                  <div className="col-span-3 text-left">ALBUM</div>
                  <div className="col-span-2 text-left">DATE ADDED</div>
                  <div className="col-span-1 text-right "></div>
                  <div className="col-span-1 text-right grid justify-center ">
                    <HiOutlineClock className="text-xl "></HiOutlineClock>
                  </div>
                </div>
              </div>
              <hr className="border-t-1 border-neutral-700 my-2"></hr>
              <div>
                {playlist.songs?.map((s, index) => (
                  <SongRow
                    song={s}
                    id={index + 1}
                    toggleLikeSong={toggleLikeSong}
                    key={s._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedSongList;
