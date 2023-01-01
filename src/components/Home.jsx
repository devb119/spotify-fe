import * as React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <div className="flex flex-horizontal h-full w-full flex-grow">
      <Sidebar />
      <div className="ml-64 w-full ">
        <Header />

        <div className="mt-28">
          <Outlet></Outlet>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
}
