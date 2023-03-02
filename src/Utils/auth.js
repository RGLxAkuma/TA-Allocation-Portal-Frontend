import { useState, useEffect, createContext, useContext } from "react";
import jwt_decode from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const ur = secureLocalStorage.getItem("user");
    const rl = secureLocalStorage.getItem("role");
    const lg = secureLocalStorage.getItem("isLoggedin");
    setUser(ur);
    setRole(rl);
    setIsLogin(lg);
  }, []);

  const login = async (creds) => {
    // const user = jwt_decode(creds);

    try {
      const body = {
        userDetails: creds,
      };

      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      const res = await axios.post("http://localhost:4000/user_check", body, {
        headers: headers,
      });
      console.log(res);
      if (res.data.statusCode === 200 && res.data.result.registered === true) {
        secureLocalStorage.setItem(
          "user",
          JSON.stringify(res.data.result.user_details)
        );
        secureLocalStorage.setItem("token", res.data.result.token);
        secureLocalStorage.setItem("isLoggedin", true);
        secureLocalStorage.setItem("role", res.data.result.position);
        localStorage.setItem("role", res.data.result.position);
        // console.log(creds);
        setUser(res.data.result.user_details);
        setToken(res.data.result.token);
      } else {
        secureLocalStorage.setItem("isLoggedin", false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    secureLocalStorage.clear();
    secureLocalStorage.setItem("isLoggedin", false);
    secureLocalStorage.setItem("role", null);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, role, islogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
