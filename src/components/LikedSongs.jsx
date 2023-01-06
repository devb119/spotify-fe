import PlaylistPage from "./PlaylistPage";
import React, { useEffect, useState } from "react";
import { getLikedSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import DotFlashing from "./DotFlashing";
function LikedSongs() {
  const [{ user, likedSongs }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = React.useState({
    imgURL: "",
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
          likedSongs: data.data.likedSongs,
        });
        setPlaylist({
          ...playlist,
          songs: data.data.likedSongs,
          imgURL: data.data.likedSongs[0].imageURL,
        });
        console.log(data.data.likedSongs);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user.token]);
  console.log(playlist);
  return (
    <div>
      {isLoading ? (
        <div className="flex  mt-64 justify-center h-screen">
          <DotFlashing></DotFlashing>
        </div>
      ) : (
        <PlaylistPage playlist={playlist} setPlaylist={setPlaylist} />
      )}
    </div>
  );
}

export default LikedSongs;
