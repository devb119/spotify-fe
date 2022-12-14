import React from "react";
import DropDown from "./DropDown";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { createPlaylist, getMyPlaylists } from "../api";
import { valueDropDown1, valueDropDown2 } from "../utils/styles";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

function CreatePlaylist() {
  const [isHover, setIsHover] = useState(false);
  const [modal, setModal] = useState(false);
  const [hoverIconModal, setHoverIconModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const toggleHover = () => {
    setIsHover(!isHover);
  };

  const toggleDropDown = () => {
    setIsActive(!isActive);
  };

  const toggleDropDown2 = () => {
    setIsActive2(!isActive2);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleIconModal = () => {
    setHoverIconModal(!hoverIconModal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSavePlaylist = async (e) => {
    e.preventDefault();
    const name = e.target.form[0].value;
    const description = e.target.form[1].value;
    const newPlaylist = await createPlaylist(name, description, [], user.token);
    getMyPlaylists(user.token)
      .then((data) => {
        dispatch({ type: actionType.SET_PLAYLISTS, playlists: data.data });
      })
      .finally(() =>
        navigate(`/playlists/${newPlaylist.data._id}`, { replace: true })
      );
  };

  return (
    <div>
      {/* Làm phần header */}
      <div className="p-8 pt-12 bg-gradient-to-b from-[#4d4c4c] to-[#1d1c1c]">
        <div className="flex items-center pt-9 text-white ">
          <div
            className="w-60 h-60 shadow-large shardow-black bg-[#333333] rounded-sm flex justify-center cursor-pointer"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHover}
            onClick={toggleModal}
          >
            <div className="flex items-center">
              {!isHover ? (
                <BsMusicNoteBeamed className="h-[76px] w-[102px] text-[#787676]" />
              ) : (
                <div className="h-[76px] w-[150px] flex-col justify-center">
                  <div className="flex justify-center">
                    <BiPencil className="h-[50px] w-[50px] text-white" />
                  </div>

                  <div className="justify-center flex font-semibold">
                    Choose photo
                  </div>
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

      {/* Làm phần search */}
      <div className="p-8">
        <div className="flex relative">
          {/* <BsThreeDots
            size={32}
            className="h-54 mr-10 text-textColor hover:text-white hover:cursor-pointer"
          ></BsThreeDots> */}
          <DropDown
            setIsActive={toggleDropDown2}
            isActive={isActive2}
            options={valueDropDown2}
          />
        </div>
      </div>

      {/* Tạo modal để chỉnh sửa thông tin playlist */}
      {modal && (
        <form className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="flex pb-5">
              <div className="text-white text-xl font-bold">Edit details</div>
              <div
                className="h-[32px] w-[32px] flex justify-center rounded-full ml-[342px] hover:bg-[#3d3d3d] cursor-pointer"
                onClick={toggleModal}
              >
                <AiOutlineClose className="text-[#a7a7a7] font-semibold h-5 w-5 mt-1" />
              </div>
            </div>

            <div className="flex justify-between">
              <div
                className="relative w-[180px] h-[180px] shadow-large shardow-black bg-[#333333] rounded-sm flex justify-center cursor-pointer"
                onMouseEnter={toggleIconModal}
                onMouseLeave={toggleIconModal}
              >
                {hoverIconModal && (
                  <div className="absolute right-[5%] top-[4%]">
                    <div className="h-8 w-8 bg-[#212121] rounded-full flex justify-center relative cursor-pointer">
                      <DropDown
                        setIsActive={toggleDropDown}
                        isActive={isActive}
                        options={valueDropDown1}
                        type={1}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  {!hoverIconModal ? (
                    <BsMusicNoteBeamed className="h-[76px] w-[102px] text-[#787676]" />
                  ) : (
                    <div className="h-[76px] w-[150px] flex-col justify-center">
                      <div className="flex justify-center">
                        <BiPencil className="h-[50px] w-[50px] text-white" />
                      </div>

                      <div className="justify-center flex font-semibold text-white">
                        Choose photo
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  id="name"
                  name="playlist"
                  className="block w-[280px] p-[8px] pl-4 text-sm text-[#c1bcbc] font-semibold border-none rounded-sm border-1 bg-[#3e3d3d]"
                  placeholder="My Playlist #1"
                  required
                />
                <div className="mb-3 w-[280px] pt-2">
                  <textarea
                    className="
                              form-control
                              block
                              w-full
                              p-[8px]
                              pl-4
                              font-medium
                              text-[#c1bcbc]
                              bg-[#3e3d3d]
                              rounded
                              transition
                              ease-in-out
                              m-0
                              text-sm
                            "
                    id="input"
                    name="description"
                    rows="6"
                    placeholder="Add an optional description"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-white text-black hover:bg-[#cbcaca] font-bold py-[10px] px-7 rounded-full"
                type="button"
                onClick={handleSavePlaylist}
              >
                Save
              </button>
            </div>

            <div className="text-white text-[10px] font-bold pt-2">
              By proceeding, you agree to give Spotify access to the image you
              choose to upload. Please make sure you have the right to upload
              the image.
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreatePlaylist;
