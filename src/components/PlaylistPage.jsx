import { BsThreeDots } from "react-icons/bs";
import { AiFillPlayCircle } from "react-icons/ai";
import { HiOutlineClock } from "react-icons/hi";
import SongRow from "./SongRow";
import { Link } from "react-router-dom";
export function PlayListCover({ type, playlist = null, song = null }) {
  return (
    <div className="p-6 px-8 bg-neutral-800">
      <div className="flex items-center text-white  ">
        <img
          src={playlist ? playlist.imageURL : song.imageURL}
          className="w-60 h-60 shadow-large shardow-black"
        ></img>
        <div className="self-end ml-5">
          <div className="text-xs font-bold">{type}</div>
          <div className="text-7xl font-bold mb-5 mt-2">
            {playlist ? playlist.title : song.name}
          </div>
          <div className="text-xs font-bold">
            {playlist ? (
              <div className="flex flex-row items-center">
                <Link className="hover:underline"> playlist.creator</Link>
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
                    key={index}
                  ></SongRow>
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
