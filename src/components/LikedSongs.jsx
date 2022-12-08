import PlaylistPage from "./PlaylistPage";
import React, { useEffect } from "react";
import { getLikedSongs } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
function LikedSongs() {
  const [{ allSongs }, dispatch] = useStateValue();
  useEffect(() => {
    getLikedSongs().then((songData) => {
      dispatch({ type: actionType.SET_LIKED_SONGS, likedSongs: songData.data });
    });
  }, [dispatch]);
  console.log(allSongs);
  const [playlist, setPlaylist] = React.useState({
    img: "https://cdn.123job.vn/123job/uploads/2021/08/28/2021_08_28______428064e6cc43653e50c675ee334a1c60.jpg",
    title: "Morning Playlist",
    creator: "Nguyen Hao",
    songs: allSongs,
  });
  return (
    <div>
      <PlaylistPage
        playlist={playlist}
        setPlaylist={setPlaylist}
      ></PlaylistPage>
    </div>
  );
}

export default LikedSongs;
