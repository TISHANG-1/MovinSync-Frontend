import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Rating,
  Container,
} from "@mui/material";
import axios from "axios";
import { ROOT_URL } from "../../common-utlis/helper";
import { useNavigate } from "react-router-dom";
const FeedbackForm = () => {
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const tripId = localStorage.getItem("tripId");
    const token = localStorage.getItem("token");
    axios
      .post(
        `${ROOT_URL}/user/traveler-companion/submit-feedback`,
        {
          feedbackParams: { description, rating, tripId },
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(() => {
        console.log("success!");
        navigate("/my-profile");
      });
    setDescription("");
    setRating(0);
  };

  return (
    <Container
      maxWidth="s"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "10px",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Feedback Form
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        width={700}
        sx={{ "& .MuiTextField-root": { mb: 4 } }}
      >
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
        />
        <Box mb={2}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              handleRatingChange(newValue);
            }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
