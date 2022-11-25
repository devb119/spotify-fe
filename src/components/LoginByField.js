import React from "react";
import { Link } from "react-router-dom";
function LoginByField() {
  return (
    <div>
      <form className=" px-8 pt-6 mt-8 mb-4 ">
        <div className="mb-4">
          <label
            className="text-white text-xs block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border border-gray-500  rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <p className="text-white text-xs block text-gray-700 text-sm font-bold mb-2">
            Password
          </p>
          <input
            className="shadow appearance-none border border-gray-500 rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <Link
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          to="#"
        >
          Forgot Password?
        </Link>
        <div className="flex items-center justify-between">
          <input type="checkbox"></input>

          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 text-black rounded-full focus:outline-none focus:shadow-outline"
            type="button"
          >
            SIGN IN
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginByField;
