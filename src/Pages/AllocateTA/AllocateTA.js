import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import "./AllocateTA.css";
import { Typography, Button } from "@mui/material";

const AllocateTA = () => {
  const [corses, setCourses] = useState();
  const [studentData, setStudentData] = useState();
  const [facultyData, setFacultyData] = useState("");
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedStudents, setSelectedStudents] = useState();
  const [stValue, setStValue] = useState("");
  const [crValue, setCrValue] = useState("");
  const [rollNumber, setRollNumber] = useState();

  const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;

  useEffect(() => {
    const handleCourseData = async () => {
      const body = {
        email: facEmail,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/faculty/courses",
          body
        );

        // console.log(response.data.data);
        let courseData = [];
        for (let i of response.data.data.courses) {
          let temp = {
            value: i.name,
            label: i.name,
          };
          courseData.push(temp);
        }
        setCourses(courseData);
      } catch (e) {
        console.log(e.message);
      }

      try {
        const response = await axios.get("http://localhost:4000/students");

        // console.log(response.data.data);
        let stdData = [];
        for (let i of response.data.data) {
          if (!i.isAssgined) {
            let temp = {
              value: `${i.name}` + `(${i.rollNumber})`,
              label: `${i.name}` + `(${i.rollNumber})`,
            };
            stdData.push(temp);
          }
        }

        setStudentData(stdData);
      } catch (e) {
        console.log(e);
      }

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

  const courseHandler = (selectedOption) => {
    // console.log("courses", selectedOption);
    setCrValue(selectedOption);
    setSelectedCourse(selectedOption);
  };

  const studentHandler = (selectedOption) => {
    // console.log("Students", selectedOption);
    setStValue(selectedOption);
    setSelectedStudents(selectedOption);
  };

  const addTAhandler = async (e) => {
    e.preventDefault();

    const body = {
      students: selectedStudents,
      faculty: {
        email: facEmail,
      },
      courses: selectedCourse,
    };

    try {
      const res = await axios.post("http://localhost:4000/addta", body);

      // console.log(res);
      setCrValue("");
      setStValue("");
    } catch (e) {
      console.log(e);
    }

    window.location.reload();
  };

  const rollNumberHandler = (e) => {
    setRollNumber(e.target.value);
  };

  const deleteTAHandler = async (e) => {
    e.preventDefault();

    const body = {
      roll: rollNumber,
    };

    try {
      const res = await axios.post("http://localhost:4000/removeTA", body);
      // console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ta__container">
      <CustomTable facultyData={facultyData}></CustomTable>
      <div className="ta__form">
        <Typography variant="subtitle1" gutterBottom>
          Choose a Course:
        </Typography>
        <Select
          options={corses}
          onChange={courseHandler}
          value={crValue}
        ></Select>
        <Typography variant="subtitle1" gutterBottom>
          Choose a Course:
        </Typography>
        <Select
          isMulti
          options={studentData}
          onChange={studentHandler}
          value={stValue}
        ></Select>
        <Button
          variant="contained"
          onClick={addTAhandler}
          sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
        >
          Submit
        </Button>
        <div className="ta__delete_container">
          <Typography variant="subtitle1" gutterBottom>
            Enter the Roll Number:
          </Typography>
          <input type={"number"} onChange={rollNumberHandler}></input>
          <Button variant="contained" color="error" onClick={deleteTAHandler}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllocateTA;
