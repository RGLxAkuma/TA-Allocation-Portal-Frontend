import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./LogIn.css";
import Bg from "./Components/Bg";

import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Utils/auth";
import secureLocalStorage from "react-secure-storage";

function Login(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  return (
    <div className="logIn">
      <Bg></Bg>
    </div>
  );
}

export default Login;
