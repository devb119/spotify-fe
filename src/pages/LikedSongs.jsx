import LikedSongList from "../components/LikedSongList";
import React, { useEffect, useState } from "react";
import { getLikedSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import DotFlashing from "../components/DotFlashing";
import Icon from "../assets/img/Icon";
function LikedSongs() {
  const [{ user, likedSongs }, dispatch] = useStateValue();
  console.log(user);
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = React.useState({
    imageURL: Icon.like,
    name: "Liked Songs",
    creator: { name: user.data.name },
    songs: [],
  });
  useEffect(() => {
    if (!user.token) return;
    if (likedSongs) {
      setPlaylist({ ...playlist, songs: likedSongs });
      setIsLoading(false);
    } else {
      setIsLoading(true);
      getLikedSongs(user.token)
        .then((data) => {
          dispatch({
            type: actionType.SET_LIKED_SONGS,
            likedSongs: data.data.likedSongs,
          });
          setPlaylist({
            ...playlist,
            songs: data.data.likedSongs,
          });
          console.log(data.data.likedSongs);
        })
        .finally(() => setIsLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.token, likedSongs?.length]);
  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <DotFlashing />
        </div>
      ) : (
        <LikedSongList playlist={playlist} setPlaylist={setPlaylist} />
      )}
    </div>
  );
}

export default LikedSongs;
