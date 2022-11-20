import React from "react";
import MusicCard from "./MusicCard";

const songs = [
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artists: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artists: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artists: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artists: "Zayn, Taylor Swift",
  },
  {
    name: "I don't wanna live forever",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/en/8/82/Zayn_%26_Taylor_Swift_-_I_Don%27t_Wanna_Live_Forever_%28Official_Single_Cover%29.png",
    artists: "Zayn, Taylor Swift",
  },
];

export const SongContainer = ({ title, songs }) => (
  <>
    <p className="mb-4 font-bold text-white text-xl">{title}</p>
    <div className="flex items-center gap-6 flex-wrap">
      {songs.map((song) => (
        <MusicCard
          name={song.name}
          imageURL={song.imageURL}
          artists={song.artists}
        />
      ))}
    </div>
  </>
);

function HomeMusic() {
  return (
    <div className="p-8 pt-0">
      <SongContainer title="Populer" songs={songs} />
    </div>
  );
}

export default HomeMusic;
