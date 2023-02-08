import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { PlaylistModal } from "./PlaylistModal";
export function HoverEditButton() {
  return (
    <div className="h-60 w-60 flex justify-center items-center bg-[#0000006f] ">
      <div className="flex-col  ">
        <div className="flex justify-center items-center">
          <BiPencil className="h-[50px] w-[50px] text-white" />
        </div>
        <div className="justify-center flex font-semibold">Choose photo</div>
      </div>
    </div>
  );
}

function CreatePlaylist() {
  const [isHover, setIsHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [playlistImg, setPlaylistImg] = useState("");
  const [{ user }] = useStateValue();

  const toggleDropDown = () => {
    setIsActive(!isActive);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="pb-52 h-screen">
      {/* Làm phần header */}
      <div className="p-8 pt-12 bg-gradient-to-b from-[#4d4c4c] to-[#1d1c1c]">
        <div className="flex items-center pt-9 text-white ">
          <div
            className="w-60 h-60 shadow-large shardow-black bg-[#333333] rounded-sm flex justify-center cursor-pointer"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
            onClick={toggleModal}
          >
            <div className="flex items-center">
              {playlistImg === "" ? (
                !isHover ? (
                  <BsMusicNoteBeamed className="h-[76px] w-[102px] text-[#787676]" />
                ) : (
                  <HoverEditButton></HoverEditButton>
                )
              ) : (
                <div className="h-[76px] w-[150px] flex-col justify-center">
                  <img src={playlistImg} alt="playlist cover" />
                </div>
              )}
            </div>
          </div>
          <div className="self-end ml-5">
            <div className="text-xs font-bold">PLAYLIST</div>
            <div
              className="text-7xl font-bold mb-5 mt-2 cursor-pointer"
              onClick={toggleModal}
            >
              My Playlist #1
            </div>
            <div className="text-xs font-bold cursor-pointer hover:underline">
              By {user.data.name}
            </div>
          </div>
        </div>
      </div>
      {/* Tạo modal để chỉnh sửa thông tin playlist */}
      {modal && (
        <PlaylistModal
          isActive={isActive}
          playlistImg={playlistImg}
          setPlaylistImg={setPlaylistImg}
          toggleModal={toggleModal}
          toggleDropDown={toggleDropDown}
        ></PlaylistModal>
      )}
    </div>
  );
}

export default CreatePlaylist;
