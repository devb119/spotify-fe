import React from "react";

function InstallApp() {
  return (
    <div className="text-white">
      <div className="flex justify-center pt-8">
        <img
          class="w-[40rem] h-[25rem]"
          alt="Spotify Desktop App"
          src="https://open.spotifycdn.com/cdn/images/devices/mac.3fbeb8c6.png"
        ></img>
      </div>
      <div>
        <div className="flex justify-center">
          <p className="w-[42rem] text-center font-bold text-[1.75rem]">
            Seamlessly listen to music you love. Download the Spotify app for
            your computer.
          </p>
        </div>
        <div className="flex justify-center pt-9 pb-20">
          <button
            className="bg-[#1ed760] text-black hover:bg-[#1fdf64] font-semibold hover:font-bold mr-4 py-3 px-7 rounded-full"
            type="button"
          >
            <a
              href="https://www.spotify.com/vn-vi/download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get our free app
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallApp;
