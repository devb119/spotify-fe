import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";

import { BsDot } from "react-icons/bs";
import SongRow from "./SongRow";
import { Link } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { FastAverageColor } from "fast-average-color";
const fac = new FastAverageColor();
export function useAverageColor(dom) {
  React.useEffect(() => {
    fac
      .getColorAsync(dom)
      .then((color) => {
        console.log(color);
        return color;
      })
      .catch((error) => console.log(error));
  });
}
export function PlayListCover({ type, playlist = null, song = null }) {
  const [loading, setLoading] = React.useState(true);
  const [gradient, setGradient] = React.useState();

  React.useEffect(() => {
    setLoading(true);
    fac
      .getColorAsync(playlist ? playlist.imageURL : song.imageURL, {
        algorithm: "sqrt",
      })
      .then((color) => {
        console.log(color);
        setGradient(
          `p-6 px-8 pt-20 bg-gradient-to-b from-[${color.hex}] to-[#43434318]`
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div
          className={
            gradient
              ? gradient
              : "p-6 px-8 pt-20 bg-gradient-to-b from-neutral-600 to-neutral-900"
          }
        >
          <div className="flex items-center text-white  ">
            <img
              src={playlist ? playlist.imageURL : song.imageURL}
              className="w-60 h-60 drop-shadow-large shardow-black"
              alt="cover image"
            />
            <div className="self-end ml-5">
              <div className="text-xs font-bold">{type}</div>

              <div
                className={
                  (playlist && playlist.name.length < 12) ||
                  (song && song.name.length < 12)
                    ? "text-7xl font-bold mb-5 mt-2"
                    : "text-4xl font-bold mb-5 mt-2"
                }
              >
                {playlist ? playlist.name : song.name}
              </div>
              <div className="text-xs font-bold">
                {playlist ? (
                  <div className="flex flex-row  gap-1 items-center">
                    <Link className="hover:underline">
                      {playlist.creator.name}
                    </Link>
                    {playlist.songs.length > 0 && (
                      <>
                        <BsDot className="text-xl"></BsDot>
                        <p className="font-bold text-xs">
                          {playlist.songs.length} songs
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-row items-center">
                    <img
                      className="w-6 h-6 mr-1 rounded-full"
                      src={song.artist[0].imageURL}
                      alt="artist"
                    />
                    <Link className="hover:underline">
                      {song.artist.map((e) => e.name).join(", ")}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function PlaylistPage({ playlist, setPlaylist }) {
  const [{ user, query }, dispatch] = useStateValue();

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
      <PlayListCover type="Playlist" playlist={playlist}></PlayListCover>
      <div className="p-8">
        <div>
          <span className="flex mb-12 items-center">
            {playlist.songs?.length === 0 ? (
              ""
            ) : (
              <AiFillPlayCircle
                size={60}
                className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
              ></AiFillPlayCircle>
            )}

            <BsThreeDots
              size={32}
              className="h-54  text-textColor hover:text-white hover:cursor-pointer"
            ></BsThreeDots>
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

export default PlaylistPage;
