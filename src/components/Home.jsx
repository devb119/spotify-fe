import * as React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

var location;

export default function Home() {
  location = useLocation();
  console.log(location.pathname);
  return (
    <div className="flex flex-horizontal h-full w-full flex-grow">
      <Sidebar />
      <div className="w-full">
        <div className="h-20">
          <Header />
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
}
