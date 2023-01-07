import PlaylistPage from "./PlaylistPage";
import React, { useEffect, useState } from "react";
import { getLikedSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import DotFlashing from "./DotFlashing";
import Icon from "../assets/img/Icon";
function LikedSongs() {
  const [{ user, likedSongs }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = React.useState({
    imageURL: Icon.like,
    name: "Liked Songs",
    creator: { name: user.data.name },
    songs: [],
  });
  useEffect(() => {
    setIsLoading(true);
    if (!user.token) return;
    getLikedSongs(user.token)
      .then((data) => {
        dispatch({
          type: actionType.SET_LIKED_SONGS,
          likedSongs: data.data.likedSongs.map((el) => el._id),
        });
        setPlaylist({
          ...playlist,
          songs: data.data.likedSongs,
        });
        console.log(data.data.likedSongs);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.token, likedSongs?.length]);
  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <DotFlashing />
        </div>
      ) : (
        <PlaylistPage playlist={playlist} setPlaylist={setPlaylist} />
      )}
    </div>
  );
}

export default LikedSongs;
