import React from "react";

function DropDown({ options }) {
  return (
    <div className="">
      <div className="rounded-sm w-44 p-1 z-50 mt-3 drop-shadow-sm shadow-black absolute bg-neutral-800 text-white font-semibold">
        {options.map((option) => {
          return (
            <div
              className="hover:bg-neutral-700 p-2 text-left hover:cursor-pointer"
              onClick={option.action}
            >
              {option.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DropDown;
