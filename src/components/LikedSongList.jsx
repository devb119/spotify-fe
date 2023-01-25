import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import SongRow from "./SongRow";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { FastAverageColor } from "fast-average-color";
import Icon from "../assets/img/Icon";
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
export function PlayListCover({
  type,
  playlist = null,
  song = null,
  album = null,
  imageType = "playlist",
}) {
  const [loading, setLoading] = React.useState(true);
  const [gradient, setGradient] = React.useState();
  const [{ user }] = useStateValue();
  React.useEffect(() => {
    setLoading(true);
    fac
      .getColorAsync(
        playlist ? playlist.imageURL : song ? song.imageURL : album.imageURL,
        {
          algorithm: "sqrt",
        }
      )
      .then((color) => {
        console.log(color);
        setGradient(
          `${color.hex}` +
            "," +
            `rgba(${color.value[0] - 80},${color.value[1] - 80},${
              color.value[2] - 80
            },${color.value[3] - 80})`
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [song?.imageURL]);
  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div
          style={
            gradient
              ? {
                  background: `linear-gradient(to bottom, ${gradient} )`,
                }
              : imageType === "likedSongs"
              ? {
                  background: `linear-gradient(to bottom, #5a4ba1, #261a49)`,
                }
              : {
                  background: `linear-gradient(to bottom, #3a3a3a, #0f0f0f)`,
                }
          }
          className={"p-6 px-8 pt-20"}
        >
          <div className="flex items-center text-white  ">
            {imageType === "playlist" && (
              <img
                src={
                  playlist
                    ? playlist.imageURL
                    : song
                    ? song.imageURL
                    : album.imageURL
                }
                className="w-60 h-60 drop-shadow-large shadow-black "
                alt="cover"
              />
            )}
            {imageType === "likedSongs" && (
              <img
                src={Icon.like}
                className="w-60 h-60 drop-shadow-large shadow-black "
                alt="cover"
              />
            )}
            <div className="self-end ml-5">
              <div className="text-xs font-bold">{type}</div>

              <div
                className={
                  (playlist && playlist.name.length < 12) ||
                  (song && song.name.length < 12) ||
                  (album && album.name.length < 12)
                    ? "text-7xl font-bold mb-5 mt-2"
                    : "text-4xl font-bold mb-5 mt-2"
                }
              >
                {playlist ? playlist.name : song ? song.name : album.name}
              </div>
              <div className="text-xs font-bold">
                {playlist ? (
                  <div className="flex flex-row  gap-1 items-center">
                    <img
                      className="w-6 h-6 mr-1 rounded-full"
                      src={user.data.imageURL}
                      alt="creator"
                    />
                    <Link className="hover:underline">
                      {playlist.creator.name}
                    </Link>
                    {playlist.songs.length > 0 && (
                      <>
                        <BsDot className="text-xl"></BsDot>
                        <p className="font-semibold text-xs">
                          {playlist.songs.length} songs
                        </p>
                      </>
                    )}
                  </div>
                ) : song ? (
                  <div className="flex flex-row items-center">
                    <img
                      className="w-6 h-6 mr-1 rounded-full"
                      src={song.artist[0].imageURL}
                      alt="artist"
                    />
                    {song.artist.map((e, index) => (
                      <Link
                        className="hover:underline"
                        to={`/artists/${e._id}`}
                      >
                        {index < song.artist.length - 1
                          ? e.name + ", "
                          : e.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-row  gap-1 items-center">
                    <img
                      className="w-6 h-6 mr-1 rounded-full"
                      src={album.artist[0].imageURL}
                      alt="artist"
                    />
                    {/* {album.artist.map((e, index) => (
                      <Link
                        className="hover:underline"
                        to={`/artists/${e._id}`}
                      >
                        {index < song.artist.length - 1
                          ? e.name + ", "
                          : e.name}
                      </Link>
                    ))} */}
                    {album.songs.length > 0 && (
                      <>
                        <BsDot className="text-xl"></BsDot>
                        <p className="font-semibold text-xs">
                          {album.songs.length} songs
                        </p>
                      </>
                    )}
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
            {playlist.songs?.length === 0 ? (
              ""
            ) : (
              <AiFillPlayCircle
                size={60}
                className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
              ></AiFillPlayCircle>
            )}
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
