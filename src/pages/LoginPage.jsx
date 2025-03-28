import React, { useState } from "react";
import "./Loginpage.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Typography, Alert, Box } from "@mui/material";

// Validation Schema using Yup
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export const LoginPage = ({ onLogin }) => {
  const [apiError, setApiError] = useState("");

  // Using react-hook-form for form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Form submission handler
  const onSubmit = async (data) => {
    setApiError("");
    try {
      const response = await axios.post("https://reqres.in/api/login", data);
      onLogin(response.data.token);
    } catch (err) {
      setApiError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="main-div">
      <div className="background-container border">
        <div className="login-form-container">
          <Typography variant="h4" className="user-heading">
            User Login
          </Typography>

          {apiError && <Alert severity="error">{apiError}</Alert>}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
            <TextField
              label="Email Address"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box className="d-grid gap-2">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                <b>Submit</b>
              </Button>
            </Box>
          </form>
        </div>
      </div>
    </div>
  );
};
