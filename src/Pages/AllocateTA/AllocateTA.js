import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Components/CustomTable";
import "./AllocateTA.css";
import { Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import { Backdrop } from "@mui/material";

const AllocateTA = () => {
  const [corses, setCourses] = useState();
  const [studentData, setStudentData] = useState();
  const [allocStudentData, setAllocStudentData] = useState();
  const [facultyData, setFacultyData] = useState("");
  const [selectedCourse, setSelectedCourse] = useState();
  const [selectedStudents, setSelectedStudents] = useState();
  const [stValue, setStValue] = useState("");
  const [crValue, setCrValue] = useState("");
  const [allocStValue, setAllocStValue] = useState("");
  const [selectedAllocStudents, setSelectedAllocStudents] = useState();
  const [rollNumber, setRollNumber] = useState();
  const [open, setOpen] = useState(false);

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
        let stdData1 = [];
        for (let i of response.data.data) {
          let temp = {
            value: `${i.name}` + `(${i.rollNumber})`,
            label: `${i.name}` + `(${i.rollNumber})`,
          };
          if (i.isAssgined) {
            stdData1.push(temp);
          } else {
            stdData.push(temp);
          }
        }

        setStudentData(stdData);
        setAllocStudentData(stdData1);
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

  const rollNumberHandler = (selectedOption) => {
    setAllocStValue(selectedOption);
    setSelectedAllocStudents(selectedOption);
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

    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    let res;
    setOpen(true);
    try {
      res = await axios.post("http://localhost:4000/addta", body, {
        headers: headers,
      });

      // console.log(res);

      let stdData = [];
      let stdData1 = [];
      for (let i of res.data.result.data2) {
        let temp = {
          value: `${i.name}` + `(${i.rollNumber})`,
          label: `${i.name}` + `(${i.rollNumber})`,
        };
        if (i.isAssgined) {
          stdData1.push(temp);
        } else {
          stdData.push(temp);
        }
      }

      setStudentData(stdData);
      setAllocStudentData(stdData1);
      setCrValue("");
      setStValue("");
      setFacultyData(res.data.result.data1);
      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // console.log(res.data.result.data);
      // window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(`${e.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpen(false);
  };

  const deleteTAHandler = async (e) => {
    e.preventDefault();

    const body = {
      students: selectedAllocStudents,
    };
    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };
    setOpen(true);
    try {
      const res = await axios.post("http://localhost:4000/removeTA", body, {
        headers: headers,
      });
      // console.log(res);

      let stdData = [];
      let stdData1 = [];
      for (let i of res.data.result.data2) {
        let temp = {
          value: `${i.name}` + `(${i.rollNumber})`,
          label: `${i.name}` + `(${i.rollNumber})`,
        };
        if (i.isAssgined) {
          stdData1.push(temp);
        } else {
          stdData.push(temp);
        }
      }

      setStudentData(stdData);
      setAllocStudentData(stdData1);
      setAllocStValue("");
      setFacultyData(res.data.result.data1);

      toast.success(`${res.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setOpen(false);
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
          Select Students to Assign as TA:
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
        {secureLocalStorage.getItem("role") == "admin" && (
          <div className="ta__delete_container">
            <Typography variant="subtitle1" gutterBottom>
              Select Students to Remove as TA:
            </Typography>
            <Select
              isMulti
              options={allocStudentData}
              onChange={rollNumberHandler}
              value={allocStValue}
            ></Select>
            {/* <input type={"number"} onChange={rollNumberHandler}></input> */}
            <Button
              variant="contained"
              color="error"
              onClick={deleteTAHandler}
              sx={{ marginTop: 2 }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <CircularProgress color="inherit" /> */}
        <div className="modal__plane">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5", "#3F51B5"]}
          />
          <Typography variant="h4" sx={{ color: "#BFBFBF" }}>
            Waiting for Response...
          </Typography>
        </div>
      </Backdrop>
    </div>
  );
};

export default AllocateTA;
