export const postWorkout = async (formData, token) => {
  try {
    const response = await fetch("http://localhost:3000/workout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // accessToken should be the actual token value
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in postWorkout:", error);
    return { error: "Failed to submit workout" };
  }
};

export const postDiet = async (formData, token) => {
  try {
    const response = await fetch("http://localhost:3000/diet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // accessToken should be the actual token value
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in postDiet:", error);
    return { error: "Failed to submit diet" };
  }
};

export const postReading = async (formData, token) => {
  try {
    const response = await fetch("http://localhost:3000/reading", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // accessToken should be the actual token value
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in postReading:", error);
    return { error: "Failed to submit reading" };
  }
};

export const postWater = async (formData, token) => {
  try {
    const response = await fetch("http://localhost:3000/water", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // accessToken should be the actual token value
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in postWater:", error);
    return { error: "Failed to submit water" };
  }
};
