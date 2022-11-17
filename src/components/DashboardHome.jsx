import React, { useEffect, useState } from "react";
import { getAllAlbums, getAllArtists, getAllSongs, getAllUsers } from "../api";
import { FaUsers } from "react-icons/fa";
import { RiUserStarFill, RiAlbumFill } from "react-icons/ri";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { bgColors } from "../utils/styles";

function DashboardCard({ icon, name, count, bgColor }) {
  return (
    <div
      className="p-4 w-40 gap-3 h-auto rounded-lg shadow-md bg-blue-400 flex flex-col items-center"
      style={{ backgroundColor: bgColor }}
    >
      {icon}
      <p className="text-xl text-black font-semibold">{name}</p>
      <p className="text-xl text-black">{count}</p>
    </div>
  );
}

function DashboardHome() {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    Promise.all([
      getAllUsers(),
      getAllArtists(),
      getAllAlbums(),
      getAllSongs(),
    ]).then((data) => {
      setUsers(data[0].data);
      setArtists(data[1].data);
      setAlbums(data[2].data);
      setSongs(data[3].data);
    });
  }, []);

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap">
      <DashboardCard
        icon={<FaUsers className="text-3xl text-black" />}
        name="Users"
        count={users?.length > 0 ? users.length : ""}
        bgColor={bgColors[0]}
      />
      <DashboardCard
        icon={<BsMusicNoteBeamed className="text-3xl text-black" />}
        name="Songs"
        count={songs?.length > 0 ? songs.length : ""}
        bgColor={bgColors[1]}
      />
      <DashboardCard
        icon={<RiUserStarFill className="text-3xl text-black" />}
        name="Artists"
        count={artists?.length > 0 ? artists.length : ""}
        bgColor={bgColors[2]}
      />
      <DashboardCard
        icon={<RiAlbumFill className="text-3xl text-black" />}
        name="Albums"
        count={albums?.length > 0 ? albums.length : ""}
        bgColor={bgColors[3]}
      />
    </div>
  );
}

export default DashboardHome;
