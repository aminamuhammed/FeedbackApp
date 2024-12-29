import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button, Paper, Snackbar, Alert } from "@mui/material";


const Home = () => {
  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
      <TableRow>
              <TableCell  style={{ fontWeight: 'bold', fontSize: '18px' }}>Course ID</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Course Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Course Duration</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Overall Feedback</TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    // onClick={() => handleUpdate(employee)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    // onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
      </TableHead>
      
    </Table>
  </TableContainer>
  )
}

export default Home
