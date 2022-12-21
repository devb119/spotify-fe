import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";


function DropDown() {

  const [isActive, setIsActive] = useState(false);

  return <div className="h-8 w-8 bg-[#212121] rounded-full flex justify-center relative cursor-pointer">
    <div 
       onClick={(e) => 
       setIsActive(!isActive)
    }>
       <BsThreeDots className="h-4 w-4 font-bold mt-2 text-white"/>
    </div>
    { isActive && (
    <div className="absolute z-1 top-0 left-0 mt-10 rounded-sm w-[160px] h-[88px] bg-[#282828] font-semibold">
            <div className="dropdown-item">
              Change photo
            </div>
            <div className="dropdown-item">
              Remove photo
            </div>
     </div>
    )}
</div>;
}

export default DropDown;