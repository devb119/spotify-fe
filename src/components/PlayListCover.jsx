import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { FastAverageColor } from "fast-average-color";
import Icon from "../assets/img/Icon";
import { BsDot } from "react-icons/bs";
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
  }, [song?.imageURL, album?.imageURL, playlist?.imageURL, song?.imageURL]);
  console.log(album);
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
        </div>
      )}
    </div>
  );
}
