const BASE_URL = "http://localhost:3000";

const apiServiceJWT = {};

apiServiceJWT.register = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(async (res) => {
      const body = await res.json(); // Attempt to parse the response body regardless of the response status
      if (!res.ok) {
        // If the server responded with an error status, we throw an error with the parsed body
        throw new Error(
          `Error: ${res.status} - ${body.message || "Unknown error"}`
        );
      }
      return body; // If response is OK, return the parsed body
    })
    .catch((err) => {
      // Log or handle errors more appropriately here
      console.error("Registration error:", err);
      throw err; // We rethrow the error so we can handle it in the component
    });
};

apiServiceJWT.login = (user) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.profile = (accessToken) => {
  // REMOVE-START
  return fetch(`${BASE_URL}/me`, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  // REMOVE-END
};

apiServiceJWT.logout = (tokenName) => {
  // REMOVE-START
  // delete token from local storage here
  localStorage.removeItem(tokenName);
  // the following request should invalidate the token
  // return fetch(`${BASE_URL}/logout`, {
  //   method: 'POST',
  //   credentials: 'include',
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${tokenName}`,
  //   },
  // })
  //   .then((res) => res.json())
  //   .catch((err) => console.log(err));
  // REMOVE-END
};

export default apiServiceJWT;
