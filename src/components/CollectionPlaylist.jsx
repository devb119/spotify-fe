import React from "react";
import { useState, useEffect } from "react";
import { GrPlayFill } from "react-icons/gr";
import PlaylistSquareCard from "./PlaylistSquareCard";
import { getMyPlaylists } from "../api";
import { useMemo } from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import DotFlashing from "./DotFlashing";
import { NavLink } from "react-router-dom";

const myPlaylist = [
  {
    id: 1,
    title: "My Playlist #1",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 2,
    title: "My Playlist #2",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 3,
    title: "My Playlist #3",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 4,
    title: "My Playlist #4",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
  {
    id: 5,
    title: "My Playlist #5",
    owner: "Name owner 1",
    img: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
  },
];

const likeSong = [
  {
    id: 1,
    single: "Hà Anh Tuấn",
    artist: "Tháng tư là lời nói dối của em - Hà anh Tuấn",
  },
  {
    id: 2,
    single: "Hoàng Thuỳ Linh",
    artist: "See tình - Cucak remix",
  },
  {
    id: 3,
    single: "Hồ Ngọc Hà",
    artist: "Cô đơn trên sofa - Hồ Ngọc Hà",
  },
  {
    id: 4,
    single: "Hồ Ngọc Hà",
    artist: "Cô đơn trên sofa - Hồ Ngọc Hà",
  },
  {
    id: 5,
    single: "Hồ Ngọc Hà",
    artist: "Cô đơn trên sofa - Hồ Ngọc Hà",
  },
];

function CollectionPlaylist() {
  const [showPlay, setShowPlay] = useState(false);

  const [{ user, playlists }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);

  const token = useMemo(() => {
    if (user) return user.token;
    else return null;
  }, [user]);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getMyPlaylists(token)
        .then((data) =>
          dispatch({ type: actionType.SET_PLAYLISTS, playlists: data.data })
        )
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, token]);
  console.log(playlists);
  // console.log(user.data.name)

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  return (
    <div className="p-8 pt-28 ">
      <div className="text-white text-xl font-bold mb-5">Playlists</div>
      <div className="grid grid-cols-4 gap-6 mt-4 lg:grid-cols-4 2xl:grid-cols-6">
        <div
          className="col-span-2 bg-gradient-to-t from-[#8e8ee5] to-[#450af5] transition-all duration-200 cursor-pointer relative rounded-lg flex justify-center"
          onMouseEnter={showIcon}
          onMouseLeave={hideIcon}
        >
          <div className="w-[90%] h-auto flex flex-col  justify-end ">
            <div className=" w-full text-[#d4d1d1] truncate">
              {likeSong.map((item) => {
                return (
                  <span key={item.id}>
                    <span className="text-white font-semibold text-sm">
                      {`${item.single} `}
                    </span>
                    <span className="text-[#d4d1d1] font-semibold text-sm">
                      {item.artist}・
                    </span>
                  </span>
                );
              })}
            </div>
            <div className="text-white text-3xl font-bold pt-6 pb-2">
              Liked Songs
            </div>
            <div className="pb-6 text-white font-medium">
              {`${likeSong.length} liked songs`}
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
        {isLoading ? (
          <div className="flex justify-center items-center mt-3">
            <DotFlashing />
          </div>
        ) : (
          playlists.map((item) => {
            return (
              <NavLink to={`playlists/${item._id}`} key={item._id}>
                <PlaylistSquareCard
                  item={item}
                  userName={user.data.name}
                ></PlaylistSquareCard>
              </NavLink>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CollectionPlaylist;
