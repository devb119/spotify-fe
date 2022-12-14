import React from "react";
import { BsThreeDots } from "react-icons/bs";



function DropDown({isActive, setIsActive, options = [], type}) {

  // const [isActive, setIsActive] = useState(false);

  return <div>
    <div 
       onClick={setIsActive}
    > 
       <BsThreeDots className = {type === 1 ? " h-4 w-4 font-bold mt-2 text-white" : "h-54 mr-10 text-[32px] text-textColor hover:text-white hover:cursor-pointer"}/>
    </div>
    { isActive && (
    <div className="absolute z-1 top-0 left-0 mt-10 rounded-sm w-[160px] h-[88px] bg-[#282828] font-semibold">
            {options.map((option) => {
                  return <div className="dropdown-item">
                      {option}
                  </div>
              })}
           
            {/* <div className="dropdown-item">
              Remove photo
            </div> */}
     </div>
    )}
</div>;
}

export default DropDown;