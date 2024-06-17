import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Typography,
  Button,
  Grid,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ROOT_URL } from "../../common-utlis/helper";
import { ButtonsDiv } from "./styles";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [tripId, setTripId] = useState(localStorage.getItem("tripId"));
  // State to store user details and toggle states
  const [userDetails, setUserDetails] = useState({
    username: "",
    number: "",
    email: "",
    isTraveler: false,
    isTravelerCompanion: false,
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      const {
        name,
        phoneNumber,
        email,
        isTraveler,
        isTravelerCompanion,
        isAdmin,
      } = userInfo;

      setUserDetails({
        username: name || "",
        number: phoneNumber || "",
        email: email || "",
        isTraveler: isTraveler || false,
        isTravelerCompanion: isTravelerCompanion || false,
        isAdmin: isAdmin || false,
      });
    }
  }, []);

  // Function to handle toggling of traveler status
  const handleToggleTraveler = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        `${ROOT_URL}/user/update`,
        {
          userParams: {
            isTraveler: !userDetails.isTraveler,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        const updatedIsTraveler = !userDetails.isTraveler;
        setUserDetails({
          ...userDetails,
          isTraveler: updatedIsTraveler,
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            isTraveler: updatedIsTraveler,
          })
        );
      })
      .catch((err) => {
        console.error("Error updating traveler status:", err);
      });
  };

  // Function to handle toggling of traveler companion status
  const handleToggleTravelerCompanion = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${ROOT_URL}/user/update`,
        {
          userParams: {
            isTravelerCompanion: !userDetails.isTravelerCompanion,
          },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        const updatedIsTravelerCompanion = !userDetails.isTravelerCompanion;
        setUserDetails({
          ...userDetails,
          isTravelerCompanion: updatedIsTravelerCompanion,
        });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            ...userInfo,
            isTravelerCompanion: updatedIsTravelerCompanion,
          })
        );
      })
      .catch((err) => {
        console.error("Error updating traveler companion status:", err);
      });
  };

  const handleEndTrip = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `${ROOT_URL}/user/traveler/end-trip`,
        {
          tripId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        console.log("success!");
        setTripId("");
        localStorage.removeItem("tripId");
      })
      .catch((err) => {
        console.error("Error updating traveler companion status:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("tripId");
    localStorage.removeItem("startLocation");
    localStorage.removeItem("endLocation");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container
      component="main"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      maxWidth="s"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1">
            Username: {userDetails.username}
          </Typography>
          <Typography variant="body1">Number: {userDetails.number}</Typography>
          <Typography variant="body1">Email: {userDetails.email}</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body1">Traveler</Typography>
            </Grid>
            <Grid item xs={6}>
              <Switch
                checked={userDetails.isTraveler}
                onChange={handleToggleTraveler}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">Traveler Companion</Typography>
            </Grid>
            <Grid item xs={6}>
              <Switch
                checked={userDetails.isTravelerCompanion}
                onChange={handleToggleTravelerCompanion}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ButtonsDiv>
        {(tripId?.length || 0) === 0 && userDetails.isTraveler && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/create-trip")}
            sx={{ mt: 3 }}
          >
            Create Trip
          </Button>
        )}
        {(tripId?.length || 0) !== 0 && userDetails.isTraveler && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/view-trip")}
            sx={{ mt: 3 }}
          >
            View Trip
          </Button>
        )}
        {(tripId?.length || 0) !== 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/share-trip")}
            sx={{ mt: 3 }}
          >
            Share On Going Trip
          </Button>
        )}
        {(tripId?.length || 0) !== 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEndTrip()}
            sx={{ mt: 3 }}
          >
            End Trip
          </Button>
        )}
        {userDetails.isAdmin && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/overall-shared-rides")}
            sx={{ mt: 3 }}
          >
            Overall Shared Rides
          </Button>
        )}
        {userDetails.isAdmin && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/view-feedbacks")}
            sx={{ mt: 3 }}
          >
            View Feedbacks
          </Button>
        )}
        {(tripId?.length || 0) !== 0 && userDetails.isTravelerCompanion && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/submit-feedback")}
            sx={{ mt: 3 }}
          >
            Give Feedback
          </Button>
        )}
        {userDetails.isTraveler && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/view-shared-rides")}
            sx={{ mt: 3 }}
          >
            View Shared Rides
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogout()}
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </ButtonsDiv>
    </Container>
  );
};

export default ProfilePage;
