import React from "react";

import "./diet.css";

export const DietSum = ({ dietData, clearData }) => {
  if (!dietData) {
    return <div>No diet data to display.</div>;
  }

  return (
    <div className="diet-summary">
      <h2>Diet Summary</h2>
      <button onClick={clearData}>Clear Data</button>
      <ul>
        <li>Meal Type: {dietData.mealType}</li>
        <li>Carbs: {dietData.carbs}</li>
        <li>Proteins: {dietData.proteins}</li>
        <li>Fat: {dietData.fat}</li>
        <li>Notes: {dietData.notes}</li>
      </ul>
    </div>
  );
};
