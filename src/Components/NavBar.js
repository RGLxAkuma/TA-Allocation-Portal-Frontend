import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/auth";
import "./NavBar.css";
import { googleLogout } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { LogOut } from "react-feather";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";

function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const redirectPath = location.state?.path || "/";

  useEffect(() => {
    /* global google */
    // const client = google.accounts.oauth2.initTokenClient({
    //   client_id:
    //     "437720385016-4b6pgdkgbn55m8ifo7gif60lndkkehu2.apps.googleusercontent.com",
    //   scope: "https://www.googleapis.com/auth/calendar.readonly",
    //   callback: testHandler,
    // });
    // client.requestAccessToken();
    // google.accounts.id.initialize({
    //   client_id:
    //     "437720385016-4b6pgdkgbn55m8ifo7gif60lndkkehu2.apps.googleusercontent.com",
    // });
  }, []);

  const logInHandler = async (credentialResponse) => {
    setOpen(true);
    await auth.login(credentialResponse.credential);
    if (secureLocalStorage.getItem("isLoggedin")) {
      setOpen(false);
      navigate(redirectPath, {
        state: { user: `${auth.user}` },
        replace: true,
      });
    } else {
      setOpen(false);
    }
  };

  const logoutHandler = async () => {
    const token = secureLocalStorage.getItem("token");
    // console.log(token);
    google.accounts.oauth2.revoke(`${token}`, (done) => {
      console.log(done);
    });
    googleLogout();
    auth.logout();
    toast.success("Log out Succesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };
  return (
    <nav>
      <ul className="navbar">
        {secureLocalStorage.getItem("isLoggedin") ? (
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
        ) : (
          <></>
        )}
        {secureLocalStorage.getItem("isLoggedin") ? (
          <li>
            <Link className="link" to="/addTA">
              Allocate TA
            </Link>
          </li>
        ) : (
          <></>
        )}

        {secureLocalStorage.getItem("isLoggedin") &&
        secureLocalStorage.getItem("role") === "admin" ? (
          <li>
            <Link className="link" to="/student">
              Add Student
            </Link>
          </li>
        ) : (
          <></>
        )}

        {secureLocalStorage.getItem("isLoggedin") &&
        secureLocalStorage.getItem("role") === "admin" ? (
          <li>
            <Link className="link" to="/faculty">
              Add Faculty
            </Link>
          </li>
        ) : (
          <></>
        )}

        {!auth.user && (
          <li>
            <GoogleLogin
              onSuccess={logInHandler}
              onError={() => {
                console.log("Login Failed");
              }}
              type="standard"
            />
            {/* <div id="signInDiv"></div> */}
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </li>
        )}
        {auth.user && (
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={logoutHandler}
          >
            <LogOut />
          </Button>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
