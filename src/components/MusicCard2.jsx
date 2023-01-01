import React, { useState } from "react";
import { GrPlayFill } from "react-icons/gr";

function MusicCard2({ song = null, album = null }) {
    
    const [showPlay, setShowPlay] = useState(false);
   
  
    const showIcon = () => setShowPlay(true);
    const hideIcon = () => setShowPlay(false);
   
  

    return (
      <div
        className="relative w-[395px] h-auto rounded-[4px] shadow-md bg-[#2a2a2a] hover:bg-cardBgLight transition-all duration-200 cursor-pointer flex "
        onMouseEnter={showIcon}
        onMouseLeave={hideIcon}
      >
        <div className="rounded-[4px] w-[80px] h-[80px] ">
            <img
            src= {song.img}
            alt="song cover"
            className="rounded-[4px] w-[80px] h-[80px]"
            />
        </div>

        <div className=" pl-4 text-md text-white font-semibold mb-2 flex items-center">
            {song.title}
        </div>

        <div
          className={`h-12 w-12 bg-green-500 flex z-2 justify-center z-50 items-center rounded-full absolute right-4 top-1/2 ${
            showPlay ? "opacity-100 -translate-y-5" : "opacity-0"
          } transition-all duration-200`}
        >
          <GrPlayFill className="text-xl"  />
        </div>
      </div>
    );
  }
  
  export default MusicCard2;
  