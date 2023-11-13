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

export const getRecap = async (type, startDate, endDate) => {
  // Retrieve the token from local storage or state management
  const token = localStorage.getItem("accessToken");

  // Ensure you have a token before making the request
  if (!token) {
    console.error("No access token available. User might not be logged in.");
    // Handle the lack of a token, e.g., redirect to login
    return;
  }

  // Set up the query parameters
  const queryParams = new URLSearchParams();
  // if (type) {
  //   queryParams.append('type', type);
  // }
  if (startDate) {
    queryParams.append("startDate", startDate);
  }
  if (endDate) {
    queryParams.append("endDate", endDate);
  }

  try {
    // Make the GET request to the server
    const response = await fetch(
      `http://localhost:3000/recap?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const recapData = await response.json();
    return recapData; // This contains the recap information
  } catch (error) {
    console.error("Error fetching recap data:", error);
    // Handle errors, e.g., show an error message to the user
  }
};
