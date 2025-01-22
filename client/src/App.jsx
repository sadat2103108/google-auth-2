import React, { useEffect, useState } from 'react';


const App = () => {
  const [user, setUser] = useState(null); // To store the user info
  const apiURL = "http://localhost:8080/api";

  useEffect(() => {
    // Fetch user data
    fetch(`${apiURL}/auth/login/success`, {
      method: "GET",
      credentials: "include", // Required to include cookies with the request
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user");
        }
      })
      .then((data) => {
        setUser(data.user); // Set the user data
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          You are logged in, Welcome {user.displayName || user.name || "User"}
          <br/>
          <a href= {`${apiURL}/auth/logout`}>Logout</a>
        </div>
      ) : (
        <div>
          <a href= {`${apiURL}/auth/google`}>login with google</a>
        </div>
      )}
    </div>
  );
};

export default App;
