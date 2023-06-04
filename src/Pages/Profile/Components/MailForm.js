import React, { useState } from "react";
import styles from "../Profile.module.css";
import Select from "react-select";
import { Typography,Backdrop } from "@mui/material";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";

const MailForm = (props) => {
  const [selectedTA, setSelectedTA] = useState([]);
  const [subject, setSubject] = useState("");
  const [signature, setSignature] = useState("");
  const [greeting, setGreeting] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);

  const handleTAChange = (selectedOption) => {
    setSelectedTA(selectedOption);
  };
  const handleSignatureChange = (event) => {
    setSignature(event.target.value);
  };
  const handleGreetingChange = (event) => {
    setGreeting(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const facEmail = JSON.parse(secureLocalStorage.getItem("user")).email;
    const emailData = {
      body: body,
      greeting: greeting,
      receiver: selectedTA,
      sender: facEmail,
      signature: signature,
      subject: subject,
    };
    console.log(emailData);

    try {
      setOpen(true);
      const response = await axios.post("http://localhost:4000/sendEmail",emailData);
      console.log(response);

      toast.success(`${response.data.message}`, {
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

    setSelectedTA("");
    setGreeting("");
    setSignature("");
    setSubject("");
    setBody("");    
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} >
      <div className={styles.formGroup}>
        <label htmlFor="ta" className={styles.label}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              width: "50vw",
              margin: "auto",
            }}
          >
            Select TA:
          </Typography>
        </label>
        <Select
          required
          options={props.ta}
          isMulti
          onChange={handleTAChange}
          value={selectedTA}
          className={styles.select}
          
        />
      </div>
      <div className={styles.formGroup} style={{ position: 'relative', display: 'inline-block' }}>
        <label htmlFor="subject" className={styles.label}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              width: "50vw",
              margin: "auto",
            }}
          >
            Subject:
          </Typography>
        </label>        
        
        <input
          type="text"
          placeholder="Enter mail subject"
          id="subject"
          value={subject}
          required
          onChange={handleSubjectChange}
          className={styles.input}/>
        
       
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="greeting" className={styles.label}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              width: "50vw",
              margin: "auto",
            }}
          >
            Greeting:
          </Typography>
        </label>
        <input
          type="text"
          placeholder="Enter one line greeting"
          id="greeting"
          required
          value={greeting}
          onChange={handleGreetingChange}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="body" className={styles.label}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              width: "50vw",
              margin: "auto",
            }}
          >
            Body:
          </Typography>
        </label>
        <textarea
          id="body"
          placeholder="Enter single paragraph body"
          required
          value={body}
          onChange={handleBodyChange}
          className={styles.textarea}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="signature" className={styles.label}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              width: "50vw",
              margin: "auto",
            }}
          >
            Signature:
          </Typography>
        </label>
        <input
          type="text"
          placeholder="Enter single lne signature"
          id="signature"
          required
          value={signature}
          onChange={handleSignatureChange}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
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
    </form>
  );
};

export default MailForm;
