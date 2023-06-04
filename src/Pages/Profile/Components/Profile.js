import React from "react";
import styles from "../Profile.module.css";
import { Typography, Card, CardMedia, CardContent } from "@mui/material";
import { motion } from "framer-motion";

function Profile(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Card className={styles.profileCard}>
        <CardMedia
          component= "img"
          image={props.photo}
          alt="Profile Photo"
          className={styles.profileImage}
          
        />
        <CardContent className={styles.profileContent}>
          <Typography variant="h3" gutterBottom>
            {props.name}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{padding:0,margin:0}}>
            Email: {props.email}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{padding:0,margin:0}}>
            Department: {props.department}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{padding:0,margin:0}}>
            Total Courses: {props.totalCourses}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Profile;
