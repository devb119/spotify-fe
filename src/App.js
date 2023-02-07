import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import { Home, Dashboard, HomeMusic, MusicPlayer } from "./components";

import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PlaylistPage from "./pages/PlaylistPage";
import SongPage from "./pages/SongPage";
import CreatePlaylist from "./pages/CreatePlaylist";
import SectionGenre from "./components/SectionGenre/SectionGenre";
import SongSection from "./pages/SongSection";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import InstallApp from "./pages/InstallApp";
const LazySearch = React.lazy(() => import("./pages/Search"));
// const LazyLibrary = React.lazy(() => import("./components/DashboardAlbums"));
// const LazyHome = React.lazy(() => import("./components/DashboardHome"));
const LazyCollectionPlaylist = React.lazy(() =>
  import("./pages/CollectionPlaylist")
);
const LazyLikedSongs = React.lazy(() => import("./pages/LikedSongs"));
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const fireBaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ isSongPlaying, miniPlayer }, dispatch] = useStateValue();

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
        dispatch({
          type: actionType.SET_USER,
          user: {
            data: {
              likedSongs: [],
              _id: "638054ceb53ecf81f8037ce9",
              name: "Đức Phạm Hồng",
              email: "ducphamhong2@gmail.com",
              imageURL:
                "https://lh3.googleusercontent.com/a/ALm5wu3bW4rSwLFgauxt5fSpfkZPk0ia0s1KEI2JPKkE=s96-c",
              userId: "fHx87a0F3nMnQlc8JaYwPn9NUzi1",
              emailVerified: true,
              role: "member",
              authTime: "1673085554",
              createdAt: "2022-11-25T05:38:22.353Z",
              updatedAt: "2023-01-07T05:44:08.525Z",
              __v: 0,
            },
            token:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoixJDhu6ljIEFuaCBOZ3V54buFbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UydlNaU2NONXg5aHE1WExoRGN2TE03S0YtSFg0TGlCaHBxYVgxRHJRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Nwb3RpZnktYXBwLWIzOGU0IiwiYXVkIjoic3BvdGlmeS1hcHAtYjM4ZTQiLCJhdXRoX3RpbWUiOjE2NzI5OTU2NTAsInVzZXJfaWQiOiJ5VU1vY0lYRXNqUkZwYWxwZmx6YUxwTmdIZDczIiwic3ViIjoieVVNb2NJWEVzalJGcGFscGZsemFMcE5nSGQ3MyIsImlhdCI6MTY3NTc4NTA2NCwiZXhwIjoxNjc1Nzg4NjY0LCJlbWFpbCI6ImR1Y2FuaDExMDkyMDAxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2NDUzNzM1Mjc5NTAxNzMwMjM1Il0sImVtYWlsIjpbImR1Y2FuaDExMDkyMDAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Bdv3zX69D2Hovgfnv4VRfbAKiH44G9_nIQXemJZgwa8-FolTsyE4sYA06CG6DXqcflBA6d7YyksnG8kCqjyY8m7op2v6Cw9f5zsvnVcgoOHru7WpfcBMv6lRBYb49AHyz05Rkc_2gYpbJHU-i717LVpH7JzkAFfjNS-F_1e0pOnsoWIrVwk816vdGHZKKRJ0VZ0T0FwahX-1XDNdiscMHGUum4TX2nDV96_4Cw_SolVeQ1RNw8QoAiGyPsce8eoS8Hmb_xa7f0GiLgwDPnM79ANpsKWSNX-3GcJDin0NzHCGeSw9Y99mjNZjhYRhRPCKFedjvVN542MdLzPSJ2GRNg",
          },
        });
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        // dispatch({ type: actionType.SET_USER, user: null });
        // navigate("/login");
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
