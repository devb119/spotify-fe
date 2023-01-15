import React from "react";

const ConfirmBox = ({ toggleModal, playlistName, handleDeletePlaylist }) => {
  return (
    <form className="modal">
      <div className="overlay" onClick={toggleModal}></div>
      <div className="modal-content bg-white w-[420px]">
        <div className="pb-6 px-4">
          <div className="text-black text-xl font-bold">
            Delete from Library?
          </div>
          <div className="text-black text-sm font-bold pt-5 pb-3">
            {`This will delete ${playlistName} from Your Library.`}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-white text-black hover:font-bold font-semibold py-3 px-7 mr-4 rounded-full"
            type="button"
            onClick={toggleModal}
          >
            Cancel
          </button>
          <button
            className="bg-[#1ed760] text-black hover:bg-[#1fdf64] font-semibold hover:font-bold mr-4 py-3 px-7 rounded-full"
            type="button"
            onClick={handleDeletePlaylist}
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  );
};

export default ConfirmBox;
