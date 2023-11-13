import React from "react";

import "./water.css";

export const WaterSum = ({ waterData, clearData }) => {
  if (!waterData) {
    return <div>No diet data to display.</div>;
  }

  return (
    <div className="diet-summary">
      <h2>Water Intake Summary</h2>
      <button onClick={clearData}>Clear Data</button>
      <ul>
        <li>Quantity: {waterData.quantity}</li>
        <li>Notes: {waterData.notes}</li>
      </ul>
    </div>
  );
};
