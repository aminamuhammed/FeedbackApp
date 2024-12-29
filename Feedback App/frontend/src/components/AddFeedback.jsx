import React, { useState, useEffect } from "react";
import axios from "axios";

const AddFeedback = ({ isUpdate = false, feedbackId }) => {
  const [formData, setFormData] = useState({ name: "", comments: "", rating: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch feedback data if in update mode
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/course/feedback`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to fetch feedback data.");
        console.error(err);
      }
    };

    if (isUpdate && feedbackId) fetchFeedback();
  }, [isUpdate, feedbackId]);

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

    try {
      if (isUpdate) {
        await axios.put(`http://localhost:3000/updatefeedback/${feedbackId}`, formData);
        setSuccess("Feedback updated successfully!");
      } else {
        await axios.post("http://localhost:3000/addfeedback", formData);
        setSuccess("Feedback added successfully!");
      }
    } catch (err) {
      setError("Failed to submit feedback.");
      console.error(err);
    }
  };

  // Handle delete feedback
  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:3000/deletefeedback/${feedbackId}`);
        setSuccess("Feedback deleted successfully!");
      } catch (err) {
        setError("Failed to delete feedback.");
        console.error(err);
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>{isUpdate ? "Update Feedback" : "Add Feedback"}</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
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
          {isUpdate ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>
      {isUpdate && (
        <button
          onClick={handleDelete}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Delete Feedback
        </button>
      )}
    </div>
  );
};

export default AddFeedback;
