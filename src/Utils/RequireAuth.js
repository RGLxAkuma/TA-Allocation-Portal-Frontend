import React from "react";
import { useAuth } from "./auth";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!secureLocalStorage.getItem("isLoggedin") && !auth.user) {
    return (
      <Navigate to="/login" state={{ path: location.pathname }}></Navigate>
    );
  }
  return children;
};
