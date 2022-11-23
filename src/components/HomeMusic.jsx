import React, { useEffect, useState } from "react";
import { getAllSongs } from "../api";
import MusicCard from "./MusicCard";

const songs = [
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artist: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artist: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artist: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artist: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artist: "Zayn, Taylor Swift",
  },
];

export const SongContainer = ({ title, songs }) => (
  <div className="mb-8">
    <p className="mb-4 font-bold text-white text-xl">{title}</p>
    <div className="flex items-center gap-6 flex-wrap">
      {songs.map((song) => (
        <MusicCard
          name={song.name}
          imageURL={song.imageURL}
          artists={song.artist}
        />
      ))}
    </div>
  </div>
);

function HomeMusic() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllSongs().then((songData) => {
      setData(songData.data);
    });
  });
  return (
    <div className="p-8 pt-0">
      <SongContainer title="Popular" songs={songs} />
      <SongContainer title="Recommended" songs={data} />
    </div>
  );
}

export default HomeMusic;
