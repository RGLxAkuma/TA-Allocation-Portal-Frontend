import React, { useEffect, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useAuth } from "../../Utils/auth";
import { Typography } from "@mui/material";
import CustomTable from "../../Components/CustomTable";
import "./Home.css";

const Home = () => {
  const [facultyData, setFacultyData] = useState("");

  useEffect(() => {
    const handleCourseData = async () => {
      const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;

      try {
        const res = await axios.get("http://localhost:4000/faculties");

        // console.log(res.data.data);

        setFacultyData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    };

    handleCourseData();
  }, []);
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home__container">
      <Typography variant="h4" gutterBottom>
        Allocation List
      </Typography>
      <CustomTable facultyData={facultyData}></CustomTable>
      <Typography variant="h4" gutterBottom>
        Unassigned Student List
      </Typography>
    </div>
  );
};

export default Home;
