import React from "react";
import style from "./Profile.module.css";
import { Bold, Upload } from "react-feather";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import CheckModal from "../../Components/CheckModal";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Profile from "./Components/Profile";
import ProfileTable from "./Components/ProfileTable";
import MailForm from "./Components/MailForm";

function ProfilePage() {
  const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
  const facDepartment = secureLocalStorage.getItem("department");
  const facName = JSON.parse(secureLocalStorage.getItem("user")).name;
  const facPic = JSON.parse(secureLocalStorage.getItem("user")).picture;

  console.log(JSON.parse(secureLocalStorage.getItem("user")));

  const [courses, setCourses] = useState([]);
  const [CoursestudentData, setCourseStudentData] = useState([]);
  const [allocStudentData, setAllocStudentData] = useState();
  const [coursevalue, setCourseValue] = useState("");
  const [selectedCourse, setSelectedCourse] = useState();

  useEffect(() => {
    const handleCourseData = async () => {
      let courseData = [];
      const body = {
        email: facEmail,
      };
      let token = secureLocalStorage.getItem("token");
      const headers = {
        authorization: `${token}`,
      };
      try {
        const response = await axios.post(
          "http://localhost:4000/faculty/courses",
          body,
          {
            headers: headers,
          }
        );

        //console.log(response.data.data);

        for (let i of response.data.data.courses) {
          let temp = {
            value: i.name,
            label: i.name,
            course_id: i._id,
            fac_id: response.data.data._id,
          };
          courseData.push(temp);
        }

        setCourses(courseData);
      } catch (e) {
        console.log(e.message);
      }

      try {
        const response = await axios.get("http://localhost:4000/students", {
          headers: headers,
        });

        //console.log(response.data.data);

        let stdData1 = [];
        for (let i of response.data.data) {
          let temp = {
            name: i.name,
            roll: i.rollNumber,
            student_id: i._id,
            department: i.department,
            email: i.email,
          };

          if (i.isAssgined) {
            if (i.assignedFaculty._id === courseData[0].fac_id) {
              temp.assignedCourse = i.assignedCourse;
              temp.value= `${i.name}` + `(${i.rollNumber})`;
              temp.label= `${i.name}` + `(${i.rollNumber})`;
              stdData1.push(temp);
            }
          }
        }
        setAllocStudentData(stdData1);
        //console.log(stdData1);
        //console.log(CoursestudentData);
      } catch (e) {
        console.log(e);
      }
    };
    handleCourseData();
  }, []);

  const assignCourseHandler = (selectedOption) => {
    setCourseValue(selectedOption);
    setSelectedCourse(selectedOption);
    let data = allocStudentData;
    let data1;
    data1 = data.filter(
      (item) => item.assignedCourse === selectedOption.course_id
    );
    // console.log(data);
    setCourseStudentData(data1);
  };

  return (
    <motion.div
      className="assignAdmin__container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Profile
        photo={facPic}
        name={facName}
        email={facEmail}
        department={facDepartment}
        totalCourses={courses.length}
      />

      <Typography
        variant="body1"
        gutterBottom
        sx={{ width: "50vw", margin: "auto", marginTop: 5, marginBottom: 2 }}
      >
        Choose Course:
      </Typography>
      {courses.length ? (
        <Select
          options={courses}
          onChange={assignCourseHandler}
          value={coursevalue}
          className={style.component}
        />
      ) : (
        <Select
          options={[
            { value: "No Course Available", label: "No Course Available" },
          ]}
          isDisabled
        />
      )}

      <ProfileTable studentData={CoursestudentData} />

      <MailForm ta ={allocStudentData}></MailForm>
    </motion.div>
  );
}

export default ProfilePage;
