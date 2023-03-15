import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./Utils/auth";
import { RequireAuth } from "./Utils/RequireAuth";
import NavBar from "./Components/NavBar";
import FacultyInfo from "./Pages/HomePage/FacultyInfo";
import { useAuth } from "./Utils/auth";
// import "bootstrap/dist/css/bootstrap.min.css";
import secureLocalStorage from "react-secure-storage";
import StudentInfo from "./Pages/addStudent/StudentInfo";
import { Box, Container } from "@mui/system";
import AllocateTA from "./Pages/AllocateTA/AllocateTA";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          element={
            <RequireAuth>
              <Home></Home>
            </RequireAuth>
          }
          path="/"
        />
        <Route
          element={
            <RequireAuth>
              <StudentInfo></StudentInfo>
            </RequireAuth>
          }
          path="/student"
        />
        <Route
          element={
            <RequireAuth>
              <FacultyInfo></FacultyInfo>
            </RequireAuth>
          }
          path="/faculty"
        />
        <Route
          element={
            <RequireAuth>
              <AllocateTA></AllocateTA>
            </RequireAuth>
          }
          path="/addTA"
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
