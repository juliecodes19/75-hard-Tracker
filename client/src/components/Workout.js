import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { postWorkout } from "../services/formService";

export const WorkoutForm = () => {
  const user = useUser();
  console.log(user);

  // const history = useHistory();
  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    session: "",
    location: "",
    exerciseType: "",
    sets: "",
    reps: "",
    notes: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!user) {
    // User is not authenticated, redirect to login
    //   history.push("/login");
    //   return;
    // }
    try {
      const {
        startTime,
        endTime,
        session,
        location,
        exerciseType,
        sets,
        reps,
        notes,
      } = formData;
      const response = await postWorkout(formData, user.id);
      console.log("Response from API:", response);
      setSubmittedData(response.data);
      setFormData({
        startTime: "",
        endTime: "",
        session: "",
        location: "",
        exerciseType: "",
        sets: "",
        reps: "",
        notes: "",
      });
    } catch (error) {
      console.log("Error submitting workout:", error);
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
      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
