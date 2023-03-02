import React, { useState } from "react";
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

function NavBar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const redirectPath = location.state?.path || "/";

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
      alert("Something went wrong");
    }
  };

  const logoutHandler = () => {
    googleLogout();
    auth.logout();
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
              type="icon"
            />
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
