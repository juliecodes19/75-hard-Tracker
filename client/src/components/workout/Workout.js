import React, { useState } from "react";

import { postWorkout } from "../../services/formService";
import { WorkoutSum } from "./WorkoutSummary";
import "./workout.css";

export const WorkoutForm = () => {
  // Initialize form data from local state or set to default values
  const initialState = {
    startTime: "",
    endTime: "",
    session: "",
    location: "",
    exerciseType: "",
    sets: "",
    reps: "",
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
      const response = await postWorkout(formData, token);
      console.log("Workout submitted successfully:", response);

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
      <div className="create-workout-box">
        <div className="form-title">WorkOut</div>
        <form onSubmit={handleSubmit}>
          <input
            name="startTime"
            type="text"
            value={formData.startTime}
            onChange={handleChange}
            placeholder="Start Time..."
          />
          <input
            name="endTime"
            type="text"
            value={formData.endTime}
            onChange={handleChange}
            placeholder="End Time..."
          />
          <input
            name="session"
            type="text"
            value={formData.session}
            onChange={handleChange}
            placeholder="Session..."
          />
          <input
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location..."
          />
          <input
            name="exerciseType"
            type="text"
            value={formData.exerciseType}
            onChange={handleChange}
            placeholder="Exercise Type..."
          />
          <input
            name="sets"
            type="text"
            value={formData.sets}
            onChange={handleChange}
            placeholder="Sets..."
          />
          <input
            name="reps"
            type="text"
            value={formData.reps}
            onChange={handleChange}
            placeholder="Reps..."
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
      {submittedData && <WorkoutSum workoutData={submittedData} />}
    </div>
  );
};
