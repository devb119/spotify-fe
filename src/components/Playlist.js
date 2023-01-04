import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import { getAllSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import SongRow from "./SongRow";
import { FiSearch } from "react-icons/fi";

import { PlayListCover } from "./PlaylistPage";
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
function Playlist() {
  // const params = useParams();
  const [songs, setSongs] = React.useState([]);
  const [{ allSongs, user, query }, dispatch] = useStateValue();
  useEffect(() => {
    getAllSongs().then((songData) => {
      dispatch({ type: actionType.SET_ALL_SONGS, allSongs: songData.data });
    });
  }, [dispatch]);
  const [playlist, setPlaylist] = React.useState({
    img: "https://cdn.123job.vn/123job/uploads/2021/08/28/2021_08_28______428064e6cc43653e50c675ee334a1c60.jpg",
    title: "Morning Playlist",
    creator: user.data.name,
    songs: allSongs,
  });
  useEffect(() => {
    if (query) {
      getAllSongs(query).then((data) => setSongs(data.data));
    }
  }, [query]);
  //todo
  //playlist=fetchPlaylist(id)
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
      <PlayListCover playlist={playlist} type="PLAYLIST"></PlayListCover>
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
              className="h-54  text-gray-400 hover:text-white hover:cursor-pointer"
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
      <Search
        handleInputOnchange={handleInputOnchange}
        query={query}
        songs={songs}
      ></Search>
    </div>
  );
}
export default Playlist;
