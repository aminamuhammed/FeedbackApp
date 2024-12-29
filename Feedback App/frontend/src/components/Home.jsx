import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:3000/course/feedback");
      setFeedback(response.data);
    } catch (err) {
      setError("Failed to fetch feedback.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Generate Course ID
  const generateCourseID = (index) => {
    const courseNumber = (index + 1).toString().padStart(3, '0'); // Pad with leading zeros (e.g., c001, c002, etc.)
    return `C${courseNumber}`;
  };


  const handleUpdate = (feedbackItem) => {
    navigate("/edit-feedback", { state: { feedback: feedbackItem } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/course/deletefeedback/${id}`);
      setFeedback(feedback.filter((item) => item._id !== id));
      alert("Feedback deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete feedback.");
    }
  };

  if (isLoading) {
    return <CircularProgress style={{ margin: "auto", display: "block" }} />;
  }

  return (
    <div>
      {error && <Alert severity="error" style={{ marginBottom: "16px" }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Course ID</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Course Name</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Comments</TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "18px" }}>Rating</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold", fontSize: "18px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>{generateCourseID(index)}</TableCell> {/* Display generated Course ID */}
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.comments}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate(item)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;


