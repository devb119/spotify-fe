import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { BsDot } from "react-icons/bs";
import SongRow from "./SongRow";
import { Link } from "react-router-dom";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import SongRowSearch from "./SongRowSearch";
function Search({ query, handleInputOnchange, songs }) {
  return (
    <>
      {/* Làm phần search */}
      <div className="p-8">
        <div className="flex">
          <BsThreeDots
            size={32}
            className="h-54 mr-10 text-textColor hover:text-white hover:cursor-pointer"
          ></BsThreeDots>
          <button className="bg-white text-black hover:bg-[#cbcaca] font-bold py-3 px-6 rounded-full">
            Save
          </button>
        </div>
        <hr className=" mt-10 mb-7 border-t-1 border-neutral-600"></hr>
        <div>
          <form>
            <label
              htmlFor="default-search"
              className="text-white text-xl font-bold"
            >
              Let's find something for your playlist
            </label>
            <div className="relative mt-5 w-[370px]">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FiSearch className="w-5 h-5 text-[#c1bcbc]" />
              </div>
              <input
                autoFocus={true}
                type="search"
                id="default-search"
                className="block w-[370px] p-[8px] pl-10 text-sm text-textColor placeholder-neutral-500 font-semibold outline-none border-none rounded-sm bg-[#2e2c2c]"
                placeholder="Searchs for songs or episodes"
                required
                value={query}
                onChange={handleInputOnchange}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="p-8 pt-0 mb-12 ">
        {query === "" ? (
          <></>
        ) : (
          <div>
            {songs.map((s, index) => (
              <SongRowSearch song={s} key={index}></SongRowSearch>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export function PlayListCover({ type, playlist = null, song = null }) {
  return (
    <div className="p-6 px-8 bg-neutral-800">
      <div className="flex items-center text-white  ">
        <img
          src={playlist ? playlist.imageURL : song.imageURL}
          className="w-60 h-60 shadow-large shardow-black"
          alt=""
        />
        <div className="self-end ml-5">
          <div className="text-xs font-bold">{type}</div>

          <div
            className={
              (playlist && playlist.title.length < 12) ||
              (song && song.name.length < 12)
                ? "text-7xl font-bold mb-5 mt-2"
                : "text-4xl font-bold mb-5 mt-2"
            }
          >
            {playlist ? playlist.title : song.name}
          </div>
          <div className="text-xs font-bold">
            {playlist ? (
              <div className="flex flex-row  gap-1 items-center">
                <Link className="hover:underline"> {playlist.creator}</Link>
                <BsDot className="text-xl"></BsDot>
                <p className="font-bold text-xs">
                  {playlist.songs.length} songs
                </p>
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
  );
}
function PlaylistPage({ playlist, setPlaylist }) {
  const [{ user, query }, dispatch] = useStateValue();
  function handleInputOnchange(e) {
    const { value } = e.target;
    dispatch({ type: actionType.SET_QUERY, query: value });
    //setQuery(value)
  }
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
