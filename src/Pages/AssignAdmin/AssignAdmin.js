import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { Typography, Button, Backdrop } from "@mui/material";
import { ColorRing } from "react-loader-spinner";
import "./AssignAdmin.css";

const AssignAdmin = () => {
  const [facultiesList, setFacultiesList] = useState();
  const [adminvalue, setAdminValue] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleCourseData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/faculties");

        // console.log(res.data.data);
        const data = [];
        for (let i of res.data.data) {
          let temp = {
            value: `${i.name}` + `(${i.email})`,
            label: `${i.name}` + `(${i.email})`,
          };
          if (!i.isAdmin) {
            data.push(temp);
          }
        }

        setFacultiesList(data);
      } catch (e) {
        console.log(e);
      }
    };
    handleCourseData();
  }, []);

  const assignAdminHandler = (selectedOption) => {
    // console.log("Students", selectedOption);
    setAdminValue(selectedOption);
    setSelectedAdmin(selectedOption);
  };

  const assignSelectedAdminHandler = async (e) => {
    e.preventDefault();

    const body = {
      faculty: selectedAdmin,
    };

    let token = secureLocalStorage.getItem("token");
    const headers = {
      authorization: `${token}`,
    };

    try {
      setOpen(true);
      const res = await axios.post("http://localhost:4000/assignAdmin", body, {
        headers: headers,
      });

      console.log(res);
      setAdminValue("");
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
  return (
    <div className="assignAdmin__container">
      <h2>Assign Admin</h2>
      <p className="assignAdmin__instruction">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce massa
        lectus, placerat at vehicula vel, tincidunt at sem. Proin euismod rutrum
        quam varius gravida. Donec sed porta lectus, nec elementum orci.
        Maecenas id euismod sapien. Cras tellus tellus, molestie sed ligula vel,
        elementum faucibus urna. Nullam vel molestie ipsum. Nunc auctor, nunc id
        lacinia bibendum, mi ligula varius nisl, vitae pharetra neque velit sed
        justo. Vestibulum sit amet nisl ante. Etiam non elit sed massa dictum
        tincidunt. Sed pharetra leo id rutrum ornare. Nulla dolor augue, auctor
        sed sapien et, vestibulum dapibus est. Etiam euismod mauris ac sem
        dapibus consequat.
      </p>
      <Select
        isMulti
        options={facultiesList}
        onChange={assignAdminHandler}
        value={adminvalue}
      ></Select>
      <Button
        variant="contained"
        onClick={assignSelectedAdminHandler}
        sx={{ marginTop: 1, backgroundColor: "#3F51B5", width: "87.6px" }}
        size="medium"
      >
        Submit
      </Button>
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

export default AssignAdmin;
