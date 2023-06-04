import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/ProfilePage"
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./Utils/auth";
import { RequireAuth } from "./Utils/RequireAuth";
import NavBar from "./Components/NavBar";
import FacultyInfo from "./Pages/addFaculty/FacultyInfo";
import { useAuth } from "./Utils/auth";
import secureLocalStorage from "react-secure-storage";
import StudentInfo from "./Pages/addStudent/StudentInfo";
import { Box, Container } from "@mui/system";
import AllocateTA from "./Pages/AllocateTA/AllocateTA";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignAdmin from "./Pages/AssignAdmin/AssignAdmin";
import { Error } from "./Components/Error";
import DepartmentInfo from "./Pages/addDepartment/DepartmentInfo";
import { AnimatePresence } from "framer-motion";
function App() {
  const auth = useAuth();
  const location = useLocation();
  return (
    <AuthProvider>
      <ToastContainer></ToastContainer>
      <NavBar></NavBar>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route
            element={
              <RequireAuth role="admin,super_admin,faculty,readOnly">
                <Home></Home>
              </RequireAuth>
            }
            path="/"
          />
          <Route
            element={
              <RequireAuth role="admin,faculty,readOnly">
                <Profile></Profile>
              </RequireAuth>
            }
            path="/profile"
          />
          <Route
            element={
              <RequireAuth role="admin,super_admin">
                <StudentInfo></StudentInfo>
              </RequireAuth>
            }
            path="/student"
          />
          <Route
            element={
              <RequireAuth role="super_admin">
                <AssignAdmin></AssignAdmin>
              </RequireAuth>
            }
            path="/assignAdmin"
          />
          <Route
            element={
              <RequireAuth role="admin,super_admin">
                <FacultyInfo></FacultyInfo>
              </RequireAuth>
            }
            path="/faculty"
          />
          <Route
            element={
              <RequireAuth role="super_admin">
                <DepartmentInfo></DepartmentInfo>
              </RequireAuth>
            }
            path="/department"
          />
          <Route
            element={
              <RequireAuth role="admin,faculty">
                <AllocateTA></AllocateTA>
              </RequireAuth>
            }
            path="/addTA"
          />
          <Route element={<Error></Error>} path="/error" />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
