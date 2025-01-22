import React, { useEffect, useState } from "react";

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

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Full screen height
    width: "100vw", // Full screen width
    margin: "0", // Remove any default margins
    background: "linear-gradient(to bottom, #0F2027, #203A43, #2C5364)", // Dark gradient
    fontFamily: "'Roboto', sans-serif",
    color: "#EAEAEA",
    textAlign: "center",
    boxSizing: "border-box",
  };

  const headerStyle = {
    fontSize: "2.8rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#FFA726", // Orange accent color
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow
  };

  const buttonStyle = {
    backgroundColor: "#546E7A", // Muted dark teal
    color: "#EAEAEA",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "25px",
    fontSize: "1.1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    marginTop: "1rem",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    transform: "scale(1.1)",
    backgroundColor: "#37474F", // Darker shade on hover
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.5)",
  };

  const userInfoStyle = {
    marginBottom: "2rem",
    fontSize: "1.2rem",
    color: "#B0BEC5", // Softer gray for user info
  };

  const handleLogout = () => {
    window.location.href = `${apiURL}/auth/logout`;
  };

  const handleLogin = () => {
    window.location.href = `${apiURL}/auth/google`;
  };

  return (
    <div style={containerStyle}>
      {user ? (
        <>
          <h1 style={headerStyle}>The Dashboard</h1>
          <p style={userInfoStyle}>
            Hello, <strong>{user.displayName || user.name || "User"}</strong>
          </p>
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              Object.assign(e.target.style, buttonHoverStyle)
            }
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 style={headerStyle}>STUDIFY</h1>
          <p style={userInfoStyle}>
            Please log in to access your dashboard.
          </p>
          <button
            style={buttonStyle}
            onMouseOver={(e) =>
              Object.assign(e.target.style, buttonHoverStyle)
            }
            onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
            onClick={handleLogin}
          >
            Login with Google
          </button>
        </>
      )}
    </div>
  );
};

export default App;
