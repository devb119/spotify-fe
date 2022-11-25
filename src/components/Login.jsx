import React, { useEffect } from "react";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { validateUser } from "../api";
import { LoginBg } from "../assets/video";
import { Logo } from "../assets/img";
import LoginByField from "../components/LoginByField";
function Login({ setAuth }) {
  // Get app information to authen
  const fireBaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useStateValue();

  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    await signInWithPopup(fireBaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        // Add an observer for sign in state
        fireBaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred
              .getIdToken()
              .then((token) =>
                validateUser(token).then((data) =>
                  dispatch({ type: actionType.SET_USER, user: data })
                )
              );
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({ type: actionType.SET_USER, user: null });
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
      <video
        src={LoginBg}
        type="video/mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md 
        flex flex-col items-center justify-center"
        >
          <div className="text-center mb-10">
            <img className=" w-40" src={Logo} alt=""></img>
            <hr className="divide-white my-5 w-full"></hr>
          </div>
          <div>
            <p className="text-white mb-5 text-xs font-bold">
              Sign in to continue
            </p>
          </div>
          <div
            className="flex items-center justify-center gap-2 mb-2 px-4 py-2 rounded-md bg-cardOverlay 
          cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="" />
            <p className="text-white text-xs">Sign in with Google </p>
          </div>
          <div>
            <hr className="divide-white "></hr>
            <LoginByField></LoginByField>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
