import React from "react";
import { FormOptions } from "./options";
import "./dashboard.css";
import { dashboardData } from "./data.js";

const Dashboard = () => {
  return (
    <div>
      <h2>Tasks</h2>
      <div className="dashboard">
        {dashboardData.map(({ title, content }) => (
          <FormOptions title={title} content={content} />
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
