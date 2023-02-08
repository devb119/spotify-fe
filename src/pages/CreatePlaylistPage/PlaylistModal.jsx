import React from "react";
import DropDown from "../../components/DropDown";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { BiPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase.config";
import { createPlaylist, getMyPlaylists, updatePlaylist } from "../../api";
import { valueDropDown1 } from "../../utils/styles";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { useLocation, useNavigate } from "react-router-dom";

export function PlaylistModal({
  title,
  description,
  isActive,
  playlistImg,
  setPlaylistImg,
  toggleModal,
  toggleDropDown,
  setPlaylistName,
  closeModal,
}) {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [hoverIconModal, setHoverIconModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { pathname } = useLocation();

  const handleUploadFile = (e) => {
    const uploadedImage = e.target.files[0];
    setIsUploading(true);
    const storageRef = ref(
      storage,
      `images/${Date.now()}-${uploadedImage.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, uploadedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(async (downloadURL) => {
            setPlaylistImg(downloadURL);
          })
          .finally(() => setIsUploading(false));
      }
    );
  };

  const handleSavePlaylist = async (e) => {
    e.preventDefault();
    const name = e.target.form[0].value;
    const description = e.target.form[1].value;
    let newPlaylist;
    if (title) {
      const playlistId = pathname.split("/")[2];
      newPlaylist = await updatePlaylist(
        playlistId,
        { name, description, playlistImg },
        user.token
      );
      closeModal();
      setPlaylistName(name);
    } else {
      newPlaylist = await createPlaylist(
        name,
        description,
        [],
        playlistImg,
        user.token
      );
    }
    getMyPlaylists(user.token)
      .then((data) => {
        dispatch({
          type: actionType.SET_PLAYLISTS,
          playlists: data.data,
        });
      })
      .finally(() =>
        navigate(`/playlists/${newPlaylist.data._id}`, { replace: true })
      );
  };
  return (
    <form className="modal z-30">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content bg-[#282828] w-[524px]">
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
            className="relative w-44 h-44 shadow-large shardow-black bg-[#333333] rounded-sm flex justify-center cursor-pointer"
            onMouseEnter={() => {
              setHoverIconModal(true);
            }}
            onMouseLeave={() => {
              setHoverIconModal(false);
            }}
          >
            {hoverIconModal && (
              <div className=" z-50 absolute right-[5%] top-[4%]">
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
              {playlistImg !== "" ? (
                <img
                  src={playlistImg}
                  className="w-44 h-44"
                  alt="user's playlist"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center">
                  <BsMusicNoteBeamed className="h-[76px] w-[102px] text-[#787676]" />
                </div>
              )}
              {hoverIconModal && (
                <label className="justify-center z-50 absolute flex items-center w-44 h-44 font-semibold text-white cursor-pointer  bg-[#0000006f] ">
                  <div className="flex-col">
                    <div className="flex justify-center items-center">
                      <BiPencil className="h-[40px] w-[40px] text-white" />
                    </div>
                    <input
                      type="file"
                      name="upload-file"
                      accept="image/*"
                      className="w-0 h-0"
                      onChange={handleUploadFile}
                    />
                    <p className="flex items-center justify-center">
                      Choose an image
                    </p>
                  </div>
                </label>
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
              defaultValue={title}
            />
            <div className="mb-3 w-[280px] pt-2">
              <textarea
                className="form-control block w-full p-[8px] pl-4 font-medium bg-[#3e3d3d] rounded transition ease-in-out m-0 text-sm "
                id="input"
                name="description"
                rows="6"
                placeholder="Add an optional description"
                defaultValue={description}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-white text-black hover:bg-[#cbcaca] font-bold py-[10px] px-7 rounded-full"
            type="button"
            onClick={handleSavePlaylist}
            disabled={isUploading}
          >
            {isUploading ? `Uploading image: ${progress.toFixed(2)}%` : "Save"}
          </button>
        </div>

        <div className="text-white text-[10px] font-bold pt-2">
          By proceeding, you agree to give Spotify access to the image you
          choose to upload. Please make sure you have the right to upload the
          image.
        </div>
      </div>
    </form>
  );
}
