import React from "react";
import { Link } from "react-router-dom";
function LoginByField() {
  return (
    <div>
      <form className=" mt-8 mb-4 ">
        <div className="mb-4">
          <p className="text-white text-xs block text-sm font-bold mb-2">
            Email address or username
          </p>
          <input
            className="shadow text-s appearance-none border border-gray-500  rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email address or username"
          />
        </div>
        <div className="mb-6">
          <p className="text-white text-xs block text-sm font-bold mb-2">
            Password
          </p>
          <input
            className="shadow text-s appearance-none border border-gray-500 rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <Link
          className="inline-block align-baseline font-semibold text-sm text-white hover:text-blue-800"
          to="#"
        >
          Forgot Password?
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex">
            <input type="checkbox"></input>
            <p className="text-white text-xs font-semibold ml-2">Remember me</p>
          </div>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-8 text-black rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginByField;
