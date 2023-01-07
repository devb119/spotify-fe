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
import Playlist from "./components/Playlist";
import SongPage from "./components/SongPage";
import CreatePlaylist from "./components/CreatePlaylist";
import SectionGenre from "./components/SectionGenre";
import SongSection from "./components/SongSection";
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
              authTime: "1673009240",
              createdAt: "2022-11-25T05:38:22.353Z",
              updatedAt: "2023-01-07T02:53:34.184Z",
              __v: 0,
            },
            token:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoixJDhu6ljIFBo4bqhbSBI4buTbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1M2JXNHJTd0xGZ2F1eHQ1ZlNwZmtaUGswaWEwczFLRUkySlBLa0U9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BvdGlmeS1hcHAtYjM4ZTQiLCJhdWQiOiJzcG90aWZ5LWFwcC1iMzhlNCIsImF1dGhfdGltZSI6MTY3MzAwOTI0MCwidXNlcl9pZCI6ImZIeDg3YTBGM25NblFsYzhKYVl3UG45TlV6aTEiLCJzdWIiOiJmSHg4N2EwRjNuTW5RbGM4SmFZd1BuOU5VemkxIiwiaWF0IjoxNjczMDg1MDI5LCJleHAiOjE2NzMwODg2MjksImVtYWlsIjoiZHVjcGhhbWhvbmcyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE2ODU2MzE1NzMxNDM3NDE0ODE1Il0sImVtYWlsIjpbImR1Y3BoYW1ob25nMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.XMMg0QztqhsA-BzL3TcL4rToLMhhTaFEBy3A52YVHtOPP4dmpA8vlcoJYlTmtQAvKHFJ34x6kJyObk3ogKhMoocLp--LS4Fc0V8kW4mkffeFNg-6a3jEjU4G-v1jIuHiRyNkVxdw6Ydk4U9mMv6QbWHQ4jR6BzlOr-YNVGquPDtP9pH_sSoK1Sy3I23LIWh1Ezj_T65iPSn3Z8uVRQX4AS_ty8T8yvDHjQnBnPGD8kksBIXXQZfrkIegxCWQMnVa1C-7IZsrOw_AghIbFWN0H6yAYErhpO8bl7kBHY8szfH-74bC7kTEFp_P6wRXtO7mYv6Tyixch74kTOreFMXFww",
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
                element={<Playlist></Playlist>}
              ></Route>
            </Route>
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
