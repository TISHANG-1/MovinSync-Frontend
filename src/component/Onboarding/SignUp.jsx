import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { ROOT_URL } from "../../common-utlis/helper";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const defaultTheme = createTheme();

  // State variables for form fields and validation
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Client-side validation
    const errors = validateForm(formData);
    setFormErrors(errors);
    console.log(formData);
    if (Object.keys(errors).length === 0) {
      axios
        .post(`${ROOT_URL}/user/register`, {
          userParams: {
            ...formData,
          },
        })
        .then(({ data }) => {
          const {
            token,
            name,
            phoneNumber,
            email,
            isTraveler,
            isTravelerCompanion,
          } = data;
          localStorage.setItem("token", token);
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              name,
              phoneNumber,
              email,
              isTraveler,
              isTravelerCompanion,
            })
          );

          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
      // Here you can add logic to send data to your backend or perform further actions
      setSubmitting(true); // Simulate submitting state
      setTimeout(() => {
        setSubmitting(false); // Reset submitting state after some time (simulating server response)
      }, 2000);
    } else {
      // Form data is not valid, do not submit
      console.error("Form validation failed");
    }
  };

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  // Function to validate form inputs
  const validateForm = (data) => {
    let errors = {};
    if (!data.name.trim()) {
      errors.name = "Full Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email address is invalid";
    }
    if (!data.password.trim()) {
      errors.password = "Password is required";
    } else if (data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(data.phoneNumber)) {
      errors.phoneNumber = "Phone number is invalid";
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Full Name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mt: 2 }}
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              sx={{ mt: 2 }}
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              sx={{ mt: 2 }}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
            />
            <TextField
              required
              fullWidth
              name="phoneNumber"
              label="Phone Number"
              type="text"
              id="phoneNumber"
              autoComplete="tel"
              sx={{ mt: 2 }}
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;
