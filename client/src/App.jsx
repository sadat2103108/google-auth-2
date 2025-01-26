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
        console.log("logged in");
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

  if (!user) {
    // Login Page
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="p-8 rounded-xl shadow-lg bg-gray-800 max-w-sm w-full text-center">
          <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
          <p className="mb-6 text-gray-400">Login to access your account</p>
          <a
            href={`${apiURL}/auth/google`}
            className="w-full block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition text-white font-medium text-center"
          >
            Login with Google
          </a>
        </div>
      </div>
    );
  }

  // Homepage after login
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyApp</h1>
        <a
          href={`${apiURL}/auth/logout`}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition text-white"
        >
          Logout
        </a>
      </header>
      <main className="p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Welcome, {user.displayName || user.name || "User"}!</h2>
          <p className="text-gray-400 mb-8">You are now logged in to your account. Explore and enjoy!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Feature 1</h3>
              <p className="text-gray-400">Description of feature 1.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Feature 2</h3>
              <p className="text-gray-400">Description of feature 2.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Feature 3</h3>
              <p className="text-gray-400">Description of feature 3.</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">Feature 4</h3>
              <p className="text-gray-400">Description of feature 4.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
