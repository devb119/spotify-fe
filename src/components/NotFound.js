import React from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/img/Icon.jsx";
function NotFound() {
  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center">
      <img className="w-16 h-16" src={Icon.favicon} alt=""></img>
      <h1 className="mt-10 text-4xl text-center font-bold content-center">
        Page not found
      </h1>
      <p className="text-sm m-5 text-center font-bold">
        We can't seem to find the page you are looking for.
      </p>
      <Link to="/">
        <button className=" mt-5 text-center  bg-white text-black p-8  hover:bg-gray-200 text-sm font-bold py-2 px-4 rounded-full">
          Home
        </button>
      </Link>

      <div className="text-center mt-5">
        <Link to="#" className="text-sm font-bold text-white">
          Help
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
