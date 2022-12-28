import React from "react";

function PopularTrack({ trackList, artist, type = 1 }) {
  return (
    <div className="text-white p-8 ">
      {type === 1 && (
        <div>
          <div className="text-neutral-400 text-sm font-medium">
            Popular track by
          </div>
          <div className="text-xl font-bold"> {artist[0].name}</div>
        </div>
      )}
    </div>
  );
}

export default PopularTrack;
