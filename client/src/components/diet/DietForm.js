import React, { useState } from "react";
import { postDiet } from "../../services/formService";
import { DietSum } from "./DietSummay";
import "./diet.css";

export const DietForm = () => {
  // Initialize form data from local state or set to default values
  const initialState = {
    mealType: "",
    carbs: "",
    proteins: "",
    fat: "",
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
      const response = await postDiet(formData, token);
      console.log("Diet submitted successfully:", response);

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
      <div className="create-diet-box">
        <div className="form-title">Diet</div>
        <form onSubmit={handleSubmit}>
          <input
            name="mealType"
            type="text"
            value={formData.mealType}
            onChange={handleChange}
            placeholder="Meal Type..."
          />
          <input
            name="carbs"
            type="text"
            value={formData.carbs}
            onChange={handleChange}
            placeholder="Carbs..."
          />
          <input
            name="proteins"
            type="text"
            value={formData.proteins}
            onChange={handleChange}
            placeholder="Proteins..."
          />
          <input
            name="fat"
            type="text"
            value={formData.fat}
            onChange={handleChange}
            placeholder="Fat..."
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
      {submittedData && <DietSum dietData={submittedData} />}
    </div>
  );
};
