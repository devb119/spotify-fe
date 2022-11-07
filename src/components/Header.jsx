import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets/img";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

function Header() {
  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      <NavLink to="/">
        <img src={Logo} alt="Logo" className="w-40" />
      </NavLink>
      <ul className="flex items-center justify-center ml-7">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/music"
          >
            Music
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/premium"
          >
            Premium
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to="/contact"
          >
            Contact Us
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
