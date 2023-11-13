import React, { useState } from "react";
import { postReading } from "../../services/formService";
import { ReadingSum } from "./ReadingSummary";
import "./reading.css";

export const ReadingForm = () => {
  // Initialize form data from local state or set to default values
  const initialState = {
    bookTitle: "",
    startPage: "",
    endPage: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("No access token available. User might not be logged in.");
      return;
    }

    try {
      const response = await postReading(formData, token);
      console.log("reading submitted successfully:", response);

      if (response.error) {
        console.error("Error submitting workout:", response.error);
      } else {
        // Directly use the response data to update the submittedData state
        setSubmittedData(response.res.data);
        setFormData(initialState); // Reset the form data after successful submission
      }
    } catch (error) {
      console.error("Error submitting workout:", error);
    }
  };

  return (
    <div>
      <div className="create-reading-box">
        <div className="form-title">Reading</div>
        <form onSubmit={handleSubmit}>
          <input
            name="bookTitle"
            type="text"
            value={formData.bookTitle}
            onChange={handleChange}
            placeholder="Book Title..."
          />
          <input
            name="startPage"
            type="text"
            value={formData.startPage}
            onChange={handleChange}
            placeholder="Start Page..."
          />
          <input
            name="endPage"
            type="text"
            value={formData.endPage}
            onChange={handleChange}
            placeholder="End Page..."
          />
          <textarea
            name="notes"
            type="text"
            cols="40"
            rows="7"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes..."
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {submittedData && <ReadingSum readingData={submittedData} />}
    </div>
  );
};
