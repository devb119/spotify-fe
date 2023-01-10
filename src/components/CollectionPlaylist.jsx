import React from "react";
import { useState, useEffect } from "react";
import { GrPlayFill } from "react-icons/gr";
import { getMyPlaylists } from "../api";
import { useMemo } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import DotFlashing from "./DotFlashing";
import { useNavigate } from "react-router-dom";
import MusicCard from "./MusicCard";
import { getLikedSongs } from "../api";

function CollectionPlaylist() {
  const [showPlay, setShowPlay] = useState(false);

  const [{ user, playlists, likedSongs }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  const token = useMemo(() => {
    if (user) return user.token;
    else return null;
  }, [user]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      Promise.all([getMyPlaylists(token), getLikedSongs(token)])
        .then((data) => {
          dispatch({ type: actionType.SET_PLAYLISTS, playlists: data[0].data });
          dispatch({
            type: actionType.SET_LIKED_SONGS,
            likedSongs: data[1].data.likedSongs,
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, token, likedSongs?.length]);
  console.log(playlists);
  console.log(likedSongs);
  // console.log(user);
  // console.log(user.data.name)

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  const navigate = useNavigate();
  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <DotFlashing />
        </div>
      ) : (
        <div className="p-8 pt-28 mb-56 ">
          <div className="text-white text-xl font-bold mb-5">Playlists</div>
          <div className="grid grid-cols-4 gap-6 mt-4 lg:grid-cols-4 2xl:grid-cols-6">
            <div
              className="col-span-2 bg-gradient-to-t from-[#8e8ee5] to-[#450af5] transition-all duration-200 cursor-pointer relative rounded-lg flex justify-center"
              onMouseEnter={showIcon}
              onMouseLeave={hideIcon}
            >
              <div
                className="w-[90%] h-auto flex flex-col  justify-end "
                onClick={() => {
                  navigate("/collection/tracks");
                }}
              >
                <div className=" w-full text-[#d4d1d1] truncate">
                  {likedSongs.map((item) => {
                    return (
                      <span key={item.id}>
                        <span className="text-white font-semibold text-sm">
                          {`${item.name} `}
                        </span>
                        <span className="text-[#d4d1d1] font-semibold text-sm">
                          {item.artist
                            .map((item) => {
                              //console.log(item.name)
                              return item.name;
                            })
                            .join(", ")}
                          ・
                        </span>
                      </span>
                    );
                  })}
                </div>
                <div className="text-white text-3xl font-bold pt-6 pb-2">
                  Liked Songs
                </div>
                <div className="pb-6 text-white font-medium">
                  {`${likedSongs.length} liked songs`}
                </div>
              </div>

              <div
                className={`h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 bottom-4 ${
                  showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
                } transition-all duration-200`}
              >
                <GrPlayFill className="text-xl" />
              </div>
            </div>
            {playlists.map((item) => {
              return <MusicCard song={item} type="playlists"></MusicCard>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionPlaylist;
