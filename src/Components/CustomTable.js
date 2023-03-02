import React from "react";
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
} from "@mui/material";
import "./CustomTable.css";
import { hover } from "@testing-library/user-event/dist/hover";
import { Download } from "react-feather";

const CustomTable = (props) => {
  if (props.facultyData.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Nothing has been allocated yet!
      </Typography>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="customized table">
          <TableHead className="table__head">
            <TableRow>
              <TableCell className="table__cell">FACULTY</TableCell>
              <TableCell className="table__cell">COURSE</TableCell>
              <TableCell className="table__cell">STUDENTS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.facultyData.map((faculty) => {
              if (faculty.courses.length !== 0) {
                return (
                  <TableRow
                    key={faculty._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    hover
                  >
                    <TableCell>
                      <Typography variant="body1" gutterBottom>
                        {faculty.name}
                      </Typography>
                    </TableCell>
                    {faculty.courses.map((course) => (
                      <>
                        <TableCell>
                          <Typography variant="body1" gutterBottom>
                            {course.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            {course.allocatedTA.length !== 0 &&
                              course.allocatedTA.map((ta) => (
                                <Typography
                                  variant="body1"
                                  gutterBottom
                                  key={ta._id}
                                >
                                  {ta.name}
                                  {`(${ta.rollNumber})`}
                                </Typography>
                              ))}
                            {course.allocatedTA.length === 0 && (
                              <Typography variant="body1" gutterBottom>
                                No TA Selected
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>
                      </>
                    ))}
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomTable;
