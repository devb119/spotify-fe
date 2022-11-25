import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../assets/img/icon";
function NotFound() {
  return (
    <div className="text-white w-full h-full items-center content-center">
      <div className="mt-20 text-center">
        <img className="w-12 h-12 m-auto" src={Icon} alt=""></img>
      </div>
      <h1 className=" mt-10 text-3xl text-center  font-bold content-center  m-auto">
        Page not found
      </h1>
      <p className="text-xs m-5 text-center font-bold">
        We can't seem to find the page you are looking for.
      </p>
      <div className="text-center ">
        <button className=" mt-5 text-center  bg-white text-black p-8  hover:bg-gray-200 text-xs  font-bold text-white py-2 px-4 rounded-full">
          Home
        </button>
      </div>

      <div className="text-center  mt-5">
        <Link to="#" className="text-xs font-bold text-white">
          Help
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
