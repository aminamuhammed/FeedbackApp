import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFeedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", comments: "", rating: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { name, comments, rating } = formData;

    // Validate required fields
    if ([name, comments, rating].some((field) => !field)) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/course/addfeedback", formData);
      setSuccess("Feedback added successfully!");
      setTimeout(() => navigate("/"), 2000); // Navigate back after success message
    } catch (err) {
      setError("Failed to submit feedback.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Add Feedback</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Course Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Comments</label>
          <input
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default AddFeedback;
