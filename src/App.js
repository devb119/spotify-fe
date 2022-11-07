import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const fireBaseAuth = getAuth(app);
  const navigate = useNavigate();

  useEffect(() => {
    // Observe log in state
    fireBaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
        });
        // If the token is expired, immediately redirect to login page
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, [navigate, fireBaseAuth]);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="h-auto min-w-{680px} bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default App;
