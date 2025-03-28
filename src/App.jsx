import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import { UsersList } from "./pages/UsersList";
import { LoginPage } from "./pages/LoginPage";
import { EditUser } from "./pages/EditUser";
import Swal from "sweetalert2";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    Swal.fire({
      title: "Login Successful!",

      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.setItem("token");
      setToken(token);
    });
    setToken(token);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Successful!",
      text: " Redirecting to your Login Page...",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.removeItem("token");
      setToken(null);
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/users" />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/users"
          element={
            token ? <UsersList onLogout={handleLogout} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/edit/:id"
          element={token ? <EditUser /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
