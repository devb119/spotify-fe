import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

function Login({ setAuth }) {
  // Get app information to authen
  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    await signInWithPopup(fireBaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        // Add an observer for sign in state
        fireBaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => console.log(token));
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            navigate("/login");
          }
        });
      }
      // const credential = GoogleAuthProvider.credentialFromResult(result);
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md 
        flex flex-col items-center justify-center"
        >
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay 
          cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
