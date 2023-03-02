import React, { useState } from "react";
import "./StudentInfo.css";
import { Upload } from "react-feather";
import axios from "axios";
import { Button } from "@mui/material";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";

function StudentInfo() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const saveFileHandler = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    const headers = {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    };
    try {
      setOpen(true);
      const res = await axios.post("http://localhost:4000/student", formData, {
        headers: headers,
      });
      // console.log(res);
    } catch (e) {
      console.log(e);
    }
    setOpen(false);
  };
  return (
    <div className="student__container">
      <h2>Student</h2>
      <p className="student__instruction">
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

      <label className="student__file">
        <Upload />
        Select File
        <input type="file" onChange={saveFileHandler}></input>
        {fileName && <p>| {fileName}</p>}
      </label>
      <Button
        variant="contained"
        onClick={handleFileChange}
        sx={{ marginTop: 2, backgroundColor: "#3F51B5" }}
      >
        Upload
      </Button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default StudentInfo;
