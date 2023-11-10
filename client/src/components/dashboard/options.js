import React, { useState } from "react";

export const FormOptions = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="dashboard-item">
      <div className="dashboard-title" onClick={() => setIsActive(!isActive)}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      {isActive && <div className="dashboard-content">{content}</div>}
    </div>
  );
};
