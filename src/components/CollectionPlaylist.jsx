import React from "react";
import { useState } from "react";
import { GrPlayFill } from "react-icons/gr";


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
  }
]


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
    id: 3,
    single: "Hồ Ngọc Hà",
    artist: "Cô đơn trên sofa - Hồ Ngọc Hà",
  },
  { 
    id: 3,
    single: "Hồ Ngọc Hà",
    artist: "Cô đơn trên sofa - Hồ Ngọc Hà",
  },
]

function CollectionPlaylist( ) {
  const [showPlay, setShowPlay] = useState(false);

  const showIcon = () => setShowPlay(true);
  const hideIcon = () => setShowPlay(false);
  return (
    <div className="mx-4 mb-12 ">
      <div className="text-white text-xl font-bold mb-5">
        Playlists
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4 lg:grid-cols-6 md:grid-cols-4">
        <div className="col-span-2 bg-gradient-to-t from-[#8e8ee5] to-[#450af5] transition-all duration-200 cursor-pointer relative rounded-lg flex justify-center"
         onMouseEnter={showIcon}
         onMouseLeave={hideIcon}
         >  
            <div className="w-[90%] h-auto ">
              <div className="pt-[50px] w-[100%] h-[150px] text-ellipsis overflow-hidden">
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
                  className={`h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 top-[200px] ${
                    showPlay ? "opacity-100 -translate-y-3" : "opacity-0"
                  } transition-all duration-200`}
                >
                  <GrPlayFill className="text-xl" />
            </div>
        </div>
        {myPlaylist.map((item) => {
              return (
                <div
                key={item.id}
                className="playlist-item p-4 w-48 h-auto rounded-lg shadow-md bg-cardBg hover:bg-cardBgLight transition-all duration-200 cursor-pointer relative"
              >
                <img
                  src={item.img}
                  alt="song cover"
                  className="rounded-lg w-full mb-3"
                />
                <div
                      className={`playlist-icon h-12 w-12 bg-green-500 flex justify-center items-center rounded-full absolute right-7 top-[120px]
                       transition-all duration-200`}
                    >
                      <GrPlayFill className="text-xl" />
                </div>
                <p className="text-md text-white font-semibold mb-2">
                   {item.title.length > 17 ? `${item.title.slice(0, 17)}...` : item.title}
                </p>
                <p className="text-sm text-textColor font-semibold"> by {item.owner}</p>
              </div>
              );
            })}
       
      </div>
    </div>
  );
}

export default CollectionPlaylist;
