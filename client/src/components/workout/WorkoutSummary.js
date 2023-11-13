import React from "react";

import "./workout.css";

export const WorkoutSum = ({ workoutData, clearData }) => {
  if (!workoutData) {
    return <div>No workout data to display.</div>;
  }

  // Function to format data for display, e.g., if data is not provided, show 'N/A'
  const formatData = (data) => (data ? data : "N/A");

  return (
    <div className="workout-summary">
      <h2>Workout Summary</h2>
      <button onClick={clearData}>Clear Data</button>
      <ul>
        <li>Start Time: {workoutData.startTime}</li>
        <li>End Time: {workoutData.endTime}</li>
        <li>Session: {workoutData.session}</li>
        <li>Location: {workoutData.location}</li>
        <li>Exercise Type: {workoutData.exerciseType}</li>
        <li>Sets: {workoutData.sets}</li>
        <li>Reps: {workoutData.reps}</li>
        <li>Notes: {workoutData.notes}</li>
      </ul>
    </div>
  );
};
