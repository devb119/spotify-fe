import React from "react";
import { MusicCard } from "./index";

function DashboardHome() {
  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <MusicCard />
      <MusicCard />
      <MusicCard />
      <MusicCard />
      <MusicCard />
    </div>
  );
}

export default DashboardHome;
