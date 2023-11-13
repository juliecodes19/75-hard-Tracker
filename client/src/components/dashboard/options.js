import React, { useState } from "react";
import { WorkoutForm } from "../workout/Workout";
import { DietForm } from "../diet/DietForm";
import { ReadingForm } from "../reading/ReadingForm";
import { WaterForm } from "../water/WaterForm";

export const FormOptions = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  const renderForm = (title) => {
    switch (title) {
      case "Workouts":
        return <WorkoutForm />;
      case "Diet":
        return <DietForm />;
      // Add more cases for each form title as needed
      case "Reading":
        return <ReadingForm />;
      case "Water Intake":
        return <WaterForm />;
      default:
        return null; // Or some default content if there's no matching form
    }
  };
  return (
    <div className="dashboard-item">
      <div className="dashboard-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="dashboard-content">{renderForm(title)}</div>}
    </div>
  );
};
