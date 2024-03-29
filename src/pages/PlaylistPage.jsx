import React, { useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import {
  addSongToPlaylist,
  deletePlaylistSong,
  getAllSongs,
  getMyPlaylists,
  getPlaylist,
  deletePlaylist,
} from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import SongRow from "../components/SongRow/SongRow";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { PlayListCover } from "../components/PlayListCover";
import SongRowSearch from "../components/SongRow/SongRowSearch";
import { DotFlashing } from "../components";
import Icon from "../assets/img/Icon";
import { valueDropDown2 } from "../utils/styles";
import DropDown from "../components/DropDown";
import ConfirmBox from "../components/ConfirmBox";
export function PlayPlaylist({ playlist }) {
  const [{ isSongPlaying, player, isSongPausing, currentSong }, dispatch] =
    useStateValue();
  const play = (playlist) => {
    dispatch({
      type: actionType.SET_CURRENT_PLAYLIST,
      currentPlaylist: playlist.songs,
    });
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_IS_SONG_PLAYING,
        isSongPlaying: true,
      });
    } else {
      player.current.audio.current.play();
    }
    if (
      playlist.songs.filter((song) => song._id === currentSong?._id).length ===
      0
    ) {
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentSong: playlist.songs[0],
      });
    }
  };
  const pause = () => {
    player.current.audio.current.pause();
    dispatch({ type: actionType.SET_IS_SONG_PAUSING, isSongPausing: true });
  };
  return (
    <div>
      {playlist.songs?.length === 0 ? (
        ""
      ) : !isSongPausing &&
        playlist.songs.filter((song) => song._id === currentSong?._id)
          .length !== 0 ? (
        <AiFillPauseCircle
          onClick={() => pause()}
          size={60}
          className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
        ></AiFillPauseCircle>
      ) : (
        <AiFillPlayCircle
          onClick={() => play(playlist)}
          size={60}
          className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
        ></AiFillPlayCircle>
      )}
    </div>
  );
}
function Search({ query, handleInputOnchange, songs, addToPlaylist }) {
  return (
    <>
      <div className="p-8">
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

      <div className="p-8 pt-0 mb-12 ">
        {query === "" ? (
          <></>
        ) : (
          <div>
            {songs.map((s, index) => (
              <SongRowSearch
                id={index}
                song={s}
                key={index}
                addClicked={() => addToPlaylist(s)}
              ></SongRowSearch>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
function PlaylistPage() {
  const id = useParams().id;
  const [songs, setSongs] = React.useState([]);
  const [playlist, setPlaylist] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [{ user, query, currentColor }, dispatch] = useStateValue();
  const [isActive, setIsActive] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(false);
  const navigate = useNavigate();
  const toggleDropDown4 = () => {
    setIsActive(!isActive);
  };

  const [modal, setModal] = React.useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const addToPlaylist = (song) => {
    // console.log("add");
    if (playlist.songs.filter((s) => s._id === song._id).length !== 0) return;
    else {
      addSongToPlaylist(id, song._id, user.token)
        .then((data) => {
          setPlaylist({ ...data.data });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    }
  };
  useEffect(() => {
    setLoading(true);
    getPlaylist(user.token, id)
      .then((res) => {
        setPlaylist({
          ...res.data,
          imageURL: res.data.imageURL ? res.data.imageURL : Icon.plain,
        });
      })
      .finally(() => setLoading(false));
  }, [id, playlist.length, user.token]);
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
  const deleteSongFromPlaylist = (songId) => {
    alert("deleteSongFromPlaylist");
    deletePlaylistSong(id, songId, user.token).then((data) =>
      setPlaylist(data.data)
    );
  };

  const handleDeletePlaylist = async () => {
    await deletePlaylist(id, user.token);
    getMyPlaylists(user.token)
      .then((data) =>
        dispatch({ type: actionType.SET_PLAYLISTS, playlists: data.data })
      )
      .finally(() => navigate("/collection/playlists"));
  };
  return (
    <div>
      {loading ? (
        <div className="flex  mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <>
          <PlayListCover playlist={playlist} type="PLAYLIST"></PlayListCover>
          <div
            className="p-8"
            style={{
              background:
                `linear-gradient(to bottom, ` +
                `rgba(${currentColor.value[0] - 10},${
                  currentColor.value[1] - 80
                },${currentColor.value[2] - 10},${
                  currentColor.value[3] - 10
                }))` +
                "," +
                `rgba(${currentColor.value[0] - 30},${
                  currentColor.value[1] - 80
                },${currentColor.value[2] - 30},${
                  currentColor.value[3] - 30
                }))`,
            }}
          >
            <div>
              <div className="flex mb-12 items-center">
                <PlayPlaylist playlist={playlist}></PlayPlaylist>
                <div className="flex relative">
                  <DropDown
                    setIsActive={toggleDropDown4}
                    isActive={isActive}
                    options={valueDropDown2}
                    onClick={[null, toggleModal]}
                  />
                </div>
              </div>

              {playlist.songs?.length === 0 ? (
                <hr className="border-t-1 border-gray-600"></hr>
              ) : (
                <div>
                  <div className="border-b-1 border-gray-700">
                    <div className="text-textColor font-medium text-sm grid grid-cols-12 gap-1 ">
                      <div className="text-center">#</div>
                      <div className="col-span-4 text-left">TITLE</div>
                      <div className="col-span-3 text-left">ALBUM</div>
                      <div className="col-span-2 text-left"></div>
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
                        key={s._id}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        deleteSongFromPlaylist={deleteSongFromPlaylist}
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
            addToPlaylist={addToPlaylist}
          ></Search>
        </>
      )}
      {modal && (
        <ConfirmBox
          playlistName={playlist.name}
          handleDeletePlaylist={handleDeletePlaylist}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
}
export default PlaylistPage;
