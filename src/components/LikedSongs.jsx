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
    img: "https://cdn.123job.vn/123job/uploads/2021/08/28/2021_08_28______428064e6cc43653e50c675ee334a1c60.jpg",
    title: "Liked Songs",
    creator: user.data.name,
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
        setPlaylist({ ...playlist, songs: data.data.likedSongs });
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
