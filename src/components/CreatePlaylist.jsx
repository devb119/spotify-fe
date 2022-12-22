import React from "react";
import { useState } from "react";
import DropDown from "./DropDown";
import { BsMusicNoteBeamed } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { BiPencil } from "react-icons/bi"
import { AiOutlineClose } from "react-icons/ai"

function CreatePlaylist() {
  const[isHover, setIsHover] = useState(false);
  const [modal, setModal] = useState(false);
  
  const toggleHover = () => {
    setIsHover(!isHover)
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
     <div>

      {/* Làm phần header */}
       <div className="p-8 pt-0 bg-gradient-to-b from-[#4d4c4c] to-[#1d1c1c]">
          <div className="flex items-center pt-9 text-white ">
              <div 
                 className="w-60 h-60 shadow-large shardow-black bg-[#333333] rounded-sm flex justify-center cursor-pointer"
                 onMouseEnter={ toggleHover }
                 onMouseLeave={ toggleHover }
                 onClick = { toggleModal }
              >
                <div className="flex items-center">
                  {!isHover ? (
                     <BsMusicNoteBeamed className="h-[76px] w-[102px] text-[#787676]"/>
                   ) : (
                  <div className="h-[76px] w-[150px] flex-col justify-center">
                      <div className="flex justify-center">
                         <BiPencil className="h-[50px] w-[50px] text-white"/>
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
                      onClick={ toggleModal }
                  >
                      My Playlist #1
                  </div>
                  <div className="text-xs font-bold cursor-pointer hover:underline">By Duc Pham</div>
              </div>
          </div>
       </div>

      {/* Làm phần search */}
       <div className="p-8">
         <div className="flex">
            <BsThreeDots
              size={32}
              className="h-54 mr-10 text-gray-400 hover:text-white hover:cursor-pointer"
            ></BsThreeDots>
            <button class="bg-white text-black hover:bg-[#cbcaca] font-bold py-3 px-6 rounded-full">
              Save
            </button>
         </div>
         <hr className=" mt-10 mb-7 border-t-1 border-gray-600"></hr>
         <div>
            <form>   
                <label for="default-search" class="text-white text-xl font-bold">Let's find something for your playlist</label>
                <div class="relative mt-5 w-[370px]">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FiSearch className="w-5 h-5 text-[#c1bcbc]"/>
                    </div>
                    <input 
                       autoFocus={true}
                       type="search" 
                       id="default-search" 
                       class="block w-[370px] p-[8px] pl-10 text-sm text-[#c1bcbc] font-semibold outline-none border-none rounded-sm bg-[#2e2c2c]"
                       placeholder="Searchs for songs or episodes" 
                       required
                    />
                </div>
            </form>
         </div>
       </div>

      {/* Tạo modal để chỉnh sửa thông tin playlist */}
       {modal && (<div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
             <div className="flex">
               <div className="text-white text-xl font-bold">Edit details</div>
               <div 
                   className="h-[32px] w-[32px] flex justify-center rounded-full ml-[342px] hover:bg-[#3d3d3d] cursor-pointer"
                   onClick={ toggleModal }
                >
                  <AiOutlineClose className="text-[#a7a7a7] font-semibold h-5 w-5 mt-1"/>
               </div>
             </div>
          </div>
       </div>
       )}
     </div>
  );
}

export default CreatePlaylist;
