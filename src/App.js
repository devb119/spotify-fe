import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import { Home, Login, Dashboard, HomeMusic, MusicPlayer } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import NotFound from "./components/NotFound";
import PlaylistPage from "./components/PlaylistPage";
import SongPage from "./components/SongPage";
import CreatePlaylist from "./components/CreatePlaylist";
import SectionGenre from "./components/SectionGenre";
import SongSection from "./components/SongSection";
import ArtistPage from "./components/ArtistPage";
import AlbumPage from "./components/AlbumPage";
import InstallApp from "./components/InstallApp";
const LazySearch = React.lazy(() => import("./components/Search"));
// const LazyLibrary = React.lazy(() => import("./components/DashboardAlbums"));
// const LazyHome = React.lazy(() => import("./components/DashboardHome"));
const LazyCollectionPlaylist = React.lazy(() =>
  import("./components/CollectionPlaylist")
);
const LazyLikedSongs = React.lazy(() => import("./components/LikedSongs"));
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const fireBaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ isSongPlaying, miniPlayer, isSongPausing }, dispatch] =
    useStateValue();

  useEffect(() => {
    // Observe log in state
    fireBaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          validateUser(token).then((data) => {
            dispatch({ type: actionType.SET_USER, user: { ...data, token } });
          });
        });
        // If the token is expired, immediately redirect to login page
      } else {
        // dispatch({
        //   type: actionType.SET_USER,
        //   user: {
        //     data: {
        //       likedSongs: [],
        //       _id: "638054ceb53ecf81f8037ce9",
        //       name: "Đức Phạm Hồng",
        //       email: "ducphamhong2@gmail.com",
        //       imageURL:
        //         "https://lh3.googleusercontent.com/a/ALm5wu3bW4rSwLFgauxt5fSpfkZPk0ia0s1KEI2JPKkE=s96-c",
        //       userId: "fHx87a0F3nMnQlc8JaYwPn9NUzi1",
        //       emailVerified: true,
        //       role: "member",
        //       authTime: "1673085554",
        //       createdAt: "2022-11-25T05:38:22.353Z",
        //       updatedAt: "2023-01-07T05:44:08.525Z",
        //       __v: 0,
        //     },
        //     token:
        //       "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNTU5YzU5MDgzZDc3YWI2NDUxOThiNTIxZmM4ZmVmZmVlZmJkNjIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoixJDhu6ljIFBo4bqhbSBI4buTbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUVkRlRwNWZTM3hOM0lyQkNScWxJem1vYUNZWkU4YVVwYzlHUUtvaFM5cW09czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BvdGlmeS1hcHAtYjM4ZTQiLCJhdWQiOiJzcG90aWZ5LWFwcC1iMzhlNCIsImF1dGhfdGltZSI6MTY3NDQ3MTIxOCwidXNlcl9pZCI6IjRHSG85WGpIR1NTREQwQmR3OFFxQlhvTjduSzIiLCJzdWIiOiI0R0hvOVhqSEdTU0REMEJkdzhRcUJYb043bksyIiwiaWF0IjoxNjc0NjUyNDQ5LCJleHAiOjE2NzQ2NTYwNDksImVtYWlsIjoiZHVjcGhhbWhvbmcwNUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExMzYwOTQxNjg5MjU5MzQ2MTkzMSJdLCJlbWFpbCI6WyJkdWNwaGFtaG9uZzA1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Ii-ordrLsuY-Me3Gv4KXC1Zq-YMUO6kdvcU7YXH0YC7PTzz1rN6gOCEgZJmQ_gVGWLiCl3n-qqFhmHJdq_VhjGWWGDR2haXrbKf-cI6wEJmKLnTxs1RJHQXqiaOxErTZvES5EoxhpnNnp_8_OCyqarcaDEHrHB4IwzXhJbbCN6Kys0OMc8tT_Uddq2EnaiyToYmrcy1h8QGUymDLpRhcgH8o_Qk94XfnqqOyC5jbWcWD1ijl_pk6Ey_kXQvhnxG1dTsRp-Xuk4WSz4_nC1j_tmAJmObqbyUVTqA4WQuWE0dbstg5TgAvUh6pTisuT92qw_TzjznNOoZnZma-kdwtsw",
        //   },
        // });
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        dispatch({ type: actionType.SET_USER, user: null });
        navigate("/login");
      }
    });
  }, [navigate, fireBaseAuth, dispatch]);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-{680px} bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="*" element={<NotFound />}></Route>

          <Route path="/" element={<Home />}>
            <Route path="/download" element={<InstallApp></InstallApp>}></Route>
            <Route path="/" element={<HomeMusic />} />
            <Route path="/songs/:id" element={<SongPage></SongPage>}></Route>
            <Route
              path="createPlaylist"
              element={<CreatePlaylist></CreatePlaylist>}
            />
            <Route
              path="search"
              element={
                <React.Suspense
                  fallback={
                    <div className="items-center m-auto">Loading...</div>
                  }
                >
                  <LazySearch></LazySearch>
                </React.Suspense>
              }
            />
            <Route
              path="genres/:id"
              element={<SectionGenre></SectionGenre>}
            ></Route>
            <Route
              path=""
              element={
                <React.Suspense
                  fallback={
                    <div className="items-center m-auto">Loading...</div>
                  }
                >
                  {/* <LazyHome></LazyHome> */}
                </React.Suspense>
              }
            />
            <Route
              path="artists/:id"
              element={<ArtistPage></ArtistPage>}
            ></Route>
            <Route
              path="songs/sections/:id"
              element={<SongSection></SongSection>}
            ></Route>
            <Route
              path="/collection"
              element={
                <div>
                  <Outlet />
                </div>
              }
            >
              <Route
                path="/collection/playlists"
                element={
                  <React.Suspense
                    fallback={
                      <div className="items-center m-auto">Loading...</div>
                    }
                  >
                    <LazyCollectionPlaylist></LazyCollectionPlaylist>
                  </React.Suspense>
                }
              />
              <Route
                path="/collection/tracks"
                element={
                  <React.Suspense
                    fallback={
                      <div className="items-center m-auto">Loading...</div>
                    }
                  >
                    <LazyLikedSongs></LazyLikedSongs>
                  </React.Suspense>
                }
              />
            </Route>
            <Route path="/playlists">
              <Route
                path="/playlists/:id"
                element={<PlaylistPage></PlaylistPage>}
              ></Route>
            </Route>
            <Route path="/albums/:id" element={<AlbumPage></AlbumPage>}></Route>
          </Route>

          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
        {isSongPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-20 inset-x-0 bottom-0 ${
              miniPlayer ? "bg-transparent" : "bg-cardOverlay backdrop-blur-md"
            } drop-shadow-2xl flex items-center justify-center`}
          >
            <MusicPlayer className="z-50" />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;
