import React from "react";
import { Link } from "react-router-dom";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import DropDown from "./DropDown";
import { useNavigate } from "react-router-dom";
import SongRowPlayButton from "./SongRowPlayButton";
import { addLikedSongs, deleteLikedSongs } from "../../api";
import ReactCursorPosition from "react-cursor-position";
//type = 1 : has album name and added date ( used on playlist)
// type = 2 : has count listen ( used on popular sugestions)
// type = 3 : a div 3-col-span is blank (used on album page)
function SongRow({
  song,
  id,
  type = 1,
  selectedRow,
  setSelectedRow,
  deleteSongFromPlaylist,
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [{ currentSong, likedSongs, user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const options = [
    {
      text: "Remove from playlist",
      action: () => deleteSongFromPlaylist(song._id),
    },
    {
      text: "Go to artist",
      action: () => {
        navigate(`/artists/${song.artist[0]._id}`);
      },
    },
  ];

  async function handleLikeSong() {
    if (likedSongs.find((el) => el._id === song._id)) {
      const newLikedSongs = await deleteLikedSongs(song._id, user.token);
      dispatch({
        type: actionType.SET_LIKED_SONGS,
        likedSongs: newLikedSongs.data,
      });
    } else {
      const newLikedSongs = await addLikedSongs(song._id, user.token);
      dispatch({
        type: actionType.SET_LIKED_SONGS,
        likedSongs: newLikedSongs.data,
      });
    }
  }
  function handleClick(e) {
    e.preventDefault();
    // alert("right click");
    if (selectedRow !== id) setSelectedRow(id);
    else setSelectedRow(0);
  }
  return (
    <>
      <ReactCursorPosition>
        <div className="text-xs ml-72">
          {selectedRow === id && <DropDown options={options}></DropDown>}
        </div>
      </ReactCursorPosition>
      <div
        className={
          selectedRow === id
            ? "py-2 bg-neutral-600 text-textColor relative font-medium grid grid-cols-12 text-xs gap-1 items-center rounded hover:text-white"
            : "py-2 hover:bg-neutral-800 text-textColor relative font-medium grid  grid-cols-12 text-xs gap-1 items-center rounded hover:text-white"
        }
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onContextMenu={handleClick}
      >
        <div>
          <SongRowPlayButton
            isHovered={isHovered}
            song={song}
            id={id}
          ></SongRowPlayButton>
        </div>
        <div
          className={
            type == 1 ? "col-span-4 text-left " : "col-span-6 text-left "
          }
        >
          <div className="flex items-center">
            <img className="w-10 h-10" src={song.imageURL} alt="song cover" />
            <div className="ml-4 flex flex-col">
              <Link
                to={`/songs/${song._id}`}
                className={
                  currentSong?._id === song._id
                    ? "text-sm text-green-500 hover:underline pb-2 hover:cursor-pointer"
                    : "text-sm text-white hover:underline pb-2 hover:cursor-pointer"
                }
              >
                {song.name}
              </Link>
              {(type == 1 || type == 3) && (
                <div>
                  {song.artist.map((e, index) => (
                    <Link className="hover:underline" to={`/artists/${e._id}`}>
                      {index < song.artist.length - 1 ? e.name + ", " : e.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {type == 1 && (
          <>
            <div className="col-span-3 text-left">{song.album?.name}</div>
            <div className="col-span-2 text-left">{song.updatedAt}</div>{" "}
          </>
        )}
        {type == 2 && (
          <>
            <div className="col-span-3 text-left">
              {song.countListen.toLocaleString()}
            </div>
          </>
        )}
        {type == 3 && <div className="col-span-3 text-left"></div>}

        <div></div>
        <div className="col-span-1 text-center flex items-center">
          {likedSongs.find((el) => el._id === song._id) ? (
            <RiHeartFill
              className="fill-green-700 text-base m-2 mr-4 hover:cursor-pointer"
              onClick={handleLikeSong}
            ></RiHeartFill>
          ) : (
            <RiHeartLine
              className="text-base m-2 hover:cursor-pointer mr-4"
              onClick={handleLikeSong}
            ></RiHeartLine>
          )}
          <div>
            <span>{Math.floor(song.duration / 60)}</span>:
            <span>
              {song.duration - Math.floor(song.duration / 60) * 60 < 10
                ? "0" + song.duration - Math.floor(song.duration / 60) * 60
                : song.duration - Math.floor(song.duration / 60) * 60}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongRow;
