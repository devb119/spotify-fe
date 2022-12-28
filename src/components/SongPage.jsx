import React from "react";
import { PlayListCover } from "./PlaylistPage";
import { useParams } from "react-router-dom";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
function SongPage() {
  const id = useParams().id;
  const [song, setSong] = React.useState({
    title: "Ice cream",
    artist: "Black Pink",
    img: "https://upload.wikimedia.org/wikipedia/vi/7/75/Ice_Cream_-_Selena_Gomez_x_Blackpink.png",
    liked: false,
  });
  function toggleLikeSong() {
    setSong({ ...song, liked: !song.liked });
  }
  return (
    <div>
      <PlayListCover type="SONG" song={song}></PlayListCover>
      <div className="px-8 py-6 flex items-center">
        <AiFillPlayCircle
          size={60}
          className="fill-green-500 mr-5 hover:fill-green-400 hover:scale-105 hover:cursor-pointer"
        ></AiFillPlayCircle>
        {song.liked === true ? (
          <RiHeartFill
            className="fill-green-500 text-4xl m-2 mr-4 hover:cursor-pointer"
            onClick={() => {
              toggleLikeSong();
            }}
          ></RiHeartFill>
        ) : (
          <RiHeartLine
            className="text-4xl text-neutral-400 m-2 hover:cursor-pointer mr-4"
            onClick={() => {
              toggleLikeSong();
            }}
          ></RiHeartLine>
        )}
        <BsThreeDots
          size={32}
          className="h-54  text-neutral-400 hover:text-white hover:cursor-pointer"
        ></BsThreeDots>
      </div>
      <div className="px-8 text-neutral-400">
        <h2 className="text-white text-xl font-bold">Lyrics</h2>
        <p className="mt-6 text-sm font-semibold">
          Come a little closer 'cause you looking thirsty
          <br />
          I'ma make it better, sip it like a Slurpee
          <br />
          Snow cone chilly <br />
          Get it free like Willy <br />
          In the jeans like Billie <br />
          You be poppin' like a wheelie <br />
          Even in the sun, you know I keep it icy <br />
          You could take a lick but it's too cold to bite me <br />
          Brr, brr, frozen
          <br />
          You're the one been chosen
          <br />
          Play the part like Moses
          <br />
          Keep it fresh like roses (oh)
          <br />
          Look so good yeah, look so sweet (hey)
          <br />
          Lookin' good enough to eat
          <br />
          Coldest with the kiss, so he call me ice cream
          <br />
          Catch me in the fridge, right where the ice be
          <br />
          Look so good yeah, look so sweet (hey)
          <br />
          Baby, you deserve a treat
          <br />
          Diamonds on my wrist, so he call me ice cream
          <br />
          You could double dip 'cause I know you like me
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream, chillin'
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream, chillin'
          <br />
          I know that my heart can be so cold
          <br />
          But I'm sweet for you, come put me in a cone
          <br />
          You're the only touch, yeah, that get me meltin'
          <br />
          He's my favorite flavor, always gonna pick him
          <br />
          You're the cherry piece, just stay on top of me, so
          <br />
          I can't see nobody else for me, no
          <br />
          Get it, flip it, scoop it
          <br />
          Do it like that, ah yeah, ah yeah
          <br />
          Like it, love it, lick it
          <br />
          Do it like la la la, oh yeah
          <br />
          Look so good, yeah, look so sweet (hey)
          <br />
          Lookin' good enough to eat
          <br />
          Coldest with the kiss, so he call me ice cream
          <br />
          Catch me in the fridge, right where the ice be
          <br />
          Look so good, yeah, look so sweet (hey)
          <br />
          Baby, you deserve a treat
          <br />
          Diamonds on my wrist, so he call me ice cream
          <br />
          You could double dip 'cause I know you like me
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream, chillin'
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream, chillin'
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream, chillin'
          <br />
          Ice cream, chillin', chillin'
          <br />
          Ice cream
          <br />
          Chillin' like a villain, yeah, ra ra ra
          <br />
          미친 미친듯한 속도 in my La Ferra'
          <br />
          너무 빨러 너는 삐끗
          <br />
          원한다면 그냥 지름
          <br />
          Millis, billis 매일 벌음
          <br />
          한여름 손목에 얼음
          <br />
          Keep it movin' like my lease up
          <br />
          Think you fly, boy, where your visa?
          <br />
          Mona Lisa kinda Lisa
          <br />
          Needs an ice cream man that treats her
          <br />
          Keep it movin' like my lease up
          <br />
          Think you fly, boy, where your visa?
          <br />
          Mona Lisa kinda Lisa
          <br />
          Needs an ice cream man that treats her (hey)
          <br />
          Na na na na na
          <br />
          Na na na na na (hey)
          <br />
          Ice on my wrist, yeah, I like it like this
          <br />
          Get the bag with the cream
          <br />
          If you know what I mean
          <br />
          Ice cream, ice cream
          <br />
          Ice cream, chillin'
          <br />
          Na na na na na
          <br />
          Na na na na na (hey)
          <br />
          Ice on my wrist, yeah, I like it like this
          <br />
          And I'm nice with the cream
          <br />
          If you know what I mean
          <br />
          Ice cream, ice cream
          <br />
          Ice cream
          <br />
        </p>
      </div>
    </div>
  );
}

export default SongPage;
