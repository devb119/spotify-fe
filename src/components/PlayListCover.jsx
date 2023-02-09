import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { FastAverageColor } from "fast-average-color";
import Icon from "../assets/img/Icon";
import { actionType } from "../context/reducer";
import { BsDot } from "react-icons/bs";
import { PlaylistModal } from "../pages/CreatePlaylistPage/PlaylistModal";
import { HoverEditButton } from "../pages/CreatePlaylistPage/CreatePlaylist";
const fac = new FastAverageColor();

export function useAverageColor(dom) {
  React.useEffect(() => {
    fac
      .getColorAsync(dom)
      .then((color) => {
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
  const [isHover, setIsHover] = useState(false);
  const [playlistImg, setPlaylistImg] = useState(playlist.imageURL);
  const [loading, setLoading] = React.useState(true);
  const [gradient, setGradient] = React.useState();
  const [modal, setModal] = useState(false);
  const [{ user, currentColor }, dispatch] = useStateValue();
  const [hoverIconModal, setHoverIconModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);

  const toggleDropDown = () => {
    setIsActive(!isActive);
  };
  const toggleModal = () => {
    setModal(!modal);
  };
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
        dispatch({ type: actionType.SET_CURRENT_COLOR, currentColor: color });
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
  }, [song?.imageURL, album?.imageURL, playlist?.imageURL, song?.imageURL]);

  return (
    <div style={{ minHeight: "344px" }}>
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
          <div className="flex items-center text-white">
            {imageType === "playlist" && (
              <div
                className={
                  isHover
                    ? "w-60 h-60 drop-shadow-large shadow-black bg-transparent flex justify-center items-center "
                    : "w-60 h-60 drop-shadow-large shadow-black flex justify-center items-center "
                }
                onMouseEnter={() => {
                  if (playlist) setIsHover(true);
                }}
                onMouseLeave={() => {
                  if (playlist) setIsHover(false);
                }}
                onClick={() => {
                  setModal(true);
                }}
              >
                <img
                  className="w-60 h-60 relative"
                  src={
                    playlist
                      ? playlistImg
                      : song
                      ? song.imageURL
                      : album.imageURL
                  }
                  alt="cover"
                />
                {isHover && (
                  <div className="absolute">
                    <HoverEditButton></HoverEditButton>
                  </div>
                )}
              </div>
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
                {playlist ? playlistName : song ? song.name : album.name}
              </div>
              <div className="text-xs font-bold">
                {playlist ? (
                  <div className="flex flex-row  gap-1 items-center">
                    <img
                      className="w-6 h-6 mr-1 rounded-full"
                      src={user.data.imageURL}
                      alt="creator"
                      referrerPolicy="no-referrer"
                    />
                    <Link className="hover:underline">
                      {playlist.creator.name}
                    </Link>
                    {playlist.songs.length > 0 && (
                      <>
                        <BsDot className="text-xl"></BsDot>
                        <p className="font-semibold text-xs">
                          {playlist.songs.length > 1
                            ? playlist.songs.length + " songs"
                            : playlist.songs.length + " song"}
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
                          ? e.name + ",  "
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
                    {album.artist.map((e, index) => (
                      <Link
                        className="hover:underline"
                        to={`/artists/${e._id}`}
                      >
                        {index < album.artist.length - 1
                          ? e.name + ", "
                          : e.name}
                      </Link>
                    ))}
                    {album.songs.length > 0 && (
                      <>
                        <BsDot className="text-xl"></BsDot>
                        <p className="font-semibold text-xs">
                          {album.songs.length > 1
                            ? album.songs.length + " songs"
                            : album.songs.length + " song"}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {modal && (
            <PlaylistModal
              title={playlistName}
              description={playlist.description}
              isActive={isActive}
              playlistImg={playlistImg}
              setPlaylistImg={setPlaylistImg}
              toggleModal={toggleModal}
              hoverIconModal={hoverIconModal}
              toggleDropDown={toggleDropDown}
              setPlaylistName={setPlaylistName}
              closeModal={() => setModal(false)}
            ></PlaylistModal>
          )}
        </div>
      )}
    </div>
  );
}
