import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import axios from "axios";
import { ROOT_URL } from "../../../common-utlis/helper";
import { useNavigate } from "react-router-dom";
const ShareTrip = () => {
  const [entries, setEntries] = useState([{ id: 1, value: "", type: "email" }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEntries = [...entries];
    updatedEntries[index][name] = value;
    setEntries(updatedEntries);
  };

  const handleAddEntry = () => {
    const newId = entries.length + 1;
    setEntries([...entries, { id: newId, value: "", type: "email" }]);
  };

  const navigate = useNavigate();
  const handleRemoveEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataToSend = entries.map((entry) => ({
      [entry.type]: entry.value,
    }));
    const tripId = localStorage.getItem("tripId");
    const token = localStorage.getItem("token");
    axios
      .post(
        `${ROOT_URL}/user/traveler/share-trip`,
        {
          travelerCompanions: dataToSend,
          tripId: tripId,
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

    // You can send the data using axios or fetch to your backend here
  };

  return (
    <div>
      <h2>Share Trip</h2>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <Grid
            container
            alignItems={"center"}
            spacing={2}
            marginBottom={2}
            key={entry.id}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="text"
                label="Email or Phone Number"
                variant="outlined"
                value={entry.value}
                name="value"
                onChange={(event) => handleInputChange(index, event)}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  value={entry.type}
                  name="type"
                  onChange={(event) => handleInputChange(index, event)}
                  label="Type"
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="phoneNumber">Phone Number</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemoveEntry(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={handleAddEntry}
        >
          Add More
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Share Trip
        </Button>
      </form>
    </div>
  );
};

export default ShareTrip;
