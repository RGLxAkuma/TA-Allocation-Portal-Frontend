import React, { Fragment } from "react";
import { motion } from "framer-motion";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Table,
  Card,
  Typography,
  Stack,
  Toolbar,
  Button,
  Tooltip,
  Grid,
} from "@mui/material";
import "../../../Components/CustomTable.css";

const ProfileTable = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Paper sx={{ width: "100%", overflow: "hidden",boxShadow:0, marginTop:5 }}>
        <TableContainer component={Paper} sx={{ maxHeight: 400, display: 'flex', justifyContent: 'center',boxShadow:0 }}>
          <Table aria-label="customized table" sx={{ width: '55vw', overflowX: 'auto'}}>
            <TableHead className="table__head">
              <TableRow>
                <TableCell className="table__cell">Ta Name</TableCell>
                <TableCell className="table__cell">Roll</TableCell>
                <TableCell className="table__cell">Email</TableCell>
                <TableCell className="table__cell">DEPARTMENT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            
              {props.studentData.length ? props.studentData.map((student) => {
               return (
                  <Fragment key={student._id}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.roll}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" gutterBottom>
                          {student.department}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );}
              ):(
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body1" gutterBottom>
                      No student data available.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </motion.div>
  );
};

export default ProfileTable;
