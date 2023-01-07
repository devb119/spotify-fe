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
              _id: "6367da53f36d4f01dd4aefb2",
              name: "Đức Anh Nguyễn",
              email: "ducanh11092001@gmail.com",
              imageURL:
                "https://lh3.googleusercontent.com/a/ALm5wu2vSZScN5x9hq5XLhDcvLM7KF-HX4LiBhpqaX1DrQ=s96-c",
              userId: "yUMocIXEsjRFpalpflzaLpNgHd73",
              emailVerified: true,
              role: "admin",
              authTime: "1672840090",
              createdAt: "2022-11-06T16:01:23.938Z",
              updatedAt: "2023-01-04T15:51:03.826Z",
              __v: 0,
              likedSongs: ["636f4e6523edd55d9eb1d3b0"],
            },
            token:
              "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlOWI4ODBmODE4MmRkYTU1N2Y3YzcwZTIwZTRlMzcwZTNkMTI3NDciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoixJDhu6ljIEFuaCBOZ3V54buFbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UydlNaU2NONXg5aHE1WExoRGN2TE03S0YtSFg0TGlCaHBxYVgxRHJRPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Nwb3RpZnktYXBwLWIzOGU0IiwiYXVkIjoic3BvdGlmeS1hcHAtYjM4ZTQiLCJhdXRoX3RpbWUiOjE2NzI5OTU2NTAsInVzZXJfaWQiOiJ5VU1vY0lYRXNqUkZwYWxwZmx6YUxwTmdIZDczIiwic3ViIjoieVVNb2NJWEVzalJGcGFscGZsemFMcE5nSGQ3MyIsImlhdCI6MTY3MzA3ODc5MiwiZXhwIjoxNjczMDgyMzkyLCJlbWFpbCI6ImR1Y2FuaDExMDkyMDAxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA2NDUzNzM1Mjc5NTAxNzMwMjM1Il0sImVtYWlsIjpbImR1Y2FuaDExMDkyMDAxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.Vpic3QY-TUuDHIgPqst4mQ_TCPfQ8Ak_OjlR6zUWXAXfflgex-ysTKY_HoIYQRpQZ702ibPwX79K4Cei5jAnLkkaKppdzXNseTUAFGZcQVaI-c9RW7tometv8q8HIWVdwq9KjuwwSJv48pfaIMiy4eLVRLFNLQ_oyGbcTVeNGGxOq804za5-PQ6V_VgJES1Os97JtDoGnV-C1Xv6KyzABFaLo0AtIFdVJFn23tRH8nEU4IcDHTxEJu4IatutysuxSz6B1Lv9Q1qtiy7fXY4le9xTGDQVZf8sHEAIWLiJnRK2ikBLmmU4r7qUPiTdoJ1zNelIxbd1AnKeBzyCulMQSg",
          },
        });
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        // dispatch({ type: actionType.SET_USER, user: null });
        //  navigate("/login");
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
