import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ROOT_URL } from "../../common-utlis/helper";

const defaultTheme = createTheme();

const CreateTrip = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverName: "",
    vehicleNumber: "",
    driverPhoneNumber: "",
    startLat: "",
    startLon: "",
    endLat: "",
    endLon: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      const token = localStorage.getItem("token"); // Retrieve the authorization token from localStorage
      if (!token) {
        console.error("No authorization token found.");
        return;
      }

      axios
        .post(
          `${ROOT_URL}/user/traveler/create-trip`,
          {
            tripParams: {
              ...formData,
              startLat: parseFloat(formData.startLat),
              startLon: parseFloat(formData.startLon),
              endLat: parseFloat(formData.endLat),
              endLon: parseFloat(formData.endLon),
            },
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("Trip created successfully:", response.data);
          // Save tripId and destination location in localStorage
          localStorage.setItem("tripId", response.data.tripId);
          localStorage.setItem("endLat", formData.endLat);
          localStorage.setItem("endLon", formData.endLon);
          // Redirect to another page after successful trip creation
          navigate("/dashboard");
        })
        .catch((error) => {
          console.error("Error creating trip:", error);
        });
    } else {
      console.error("Form validation failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.driverName.trim()) {
      errors.driverName = "Driver name is required";
    }
    if (!data.vehicleNumber.trim()) {
      errors.vehicleNumber = "Vehicle number is required";
    }
    if (!data.driverPhoneNumber.trim()) {
      errors.driverPhoneNumber = "Driver phone number is required";
    }
    if (!data.startLat.trim()) {
      errors.startLat = "Start latitude is required";
    } else if (isNaN(data.startLat)) {
      errors.startLat = "Start latitude must be a number";
    }
    if (!data.startLon.trim()) {
      errors.startLon = "Start longitude is required";
    } else if (isNaN(data.startLon)) {
      errors.startLon = "Start longitude must be a number";
    }
    if (!data.endLat.trim()) {
      errors.endLat = "End latitude is required";
    } else if (isNaN(data.endLat)) {
      errors.endLat = "End latitude must be a number";
    }
    if (!data.endLon.trim()) {
      errors.endLon = "End longitude is required";
    } else if (isNaN(data.endLon)) {
      errors.endLon = "End longitude must be a number";
    }
    return errors;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Trip
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="driverName"
              label="Driver Name"
              name="driverName"
              autoComplete="driverName"
              autoFocus
              value={formData.driverName}
              onChange={handleChange}
              error={!!formErrors.driverName}
              helperText={formErrors.driverName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="vehicleNumber"
              label="Vehicle Number"
              name="vehicleNumber"
              autoComplete="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              error={!!formErrors.vehicleNumber}
              helperText={formErrors.vehicleNumber}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="driverPhoneNumber"
              label="Driver Phone Number"
              name="driverPhoneNumber"
              autoComplete="driverPhoneNumber"
              value={formData.driverPhoneNumber}
              onChange={handleChange}
              error={!!formErrors.driverPhoneNumber}
              helperText={formErrors.driverPhoneNumber}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="startLat"
              label="Start Latitude"
              name="startLat"
              autoComplete="startLat"
              value={formData.startLat}
              onChange={handleChange}
              error={!!formErrors.startLat}
              helperText={formErrors.startLat}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="startLon"
              label="Start Longitude"
              name="startLon"
              autoComplete="startLon"
              value={formData.startLon}
              onChange={handleChange}
              error={!!formErrors.startLon}
              helperText={formErrors.startLon}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="endLat"
              label="End Latitude"
              name="endLat"
              autoComplete="endLat"
              value={formData.endLat}
              onChange={handleChange}
              error={!!formErrors.endLat}
              helperText={formErrors.endLat}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="endLon"
              label="End Longitude"
              name="endLon"
              autoComplete="endLon"
              value={formData.endLon}
              onChange={handleChange}
              error={!!formErrors.endLon}
              helperText={formErrors.endLon}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Trip
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Need help?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateTrip;
