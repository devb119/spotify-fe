import * as React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Home() {
  return (
    <div className="flex flex-horizontal h-full w-full flex-grow">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen ">
        <Header />
        <div>
          <Outlet></Outlet>
        </div>
        <Footer />
      </div>
    </div>
  );
}
