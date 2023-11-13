import React, { useState } from "react";
import { postWater } from "../../services/formService";
import { WaterSum } from "./WaterSummary";
import "./water.css";

export const WaterForm = () => {
  // Initialize form data from local state or set to default values
  const initialState = {
    quantity: "",
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
      const response = await postWater(formData, token);
      console.log("Water submitted successfully:", response);

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
      <div className="create-water-box">
        <div className="form-title">Water Intake</div>
        <form onSubmit={handleSubmit}>
          <input
            name="quantity"
            type="text"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="How much water did you have today..."
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
      {submittedData && <WaterSum waterData={submittedData} />}
    </div>
  );
};
