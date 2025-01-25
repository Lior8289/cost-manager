import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

const AddCost = ({ onAddCost }) => {
  const [formData, setFormData] = useState({
    sum: "",
    category: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCost({ ...formData, date: new Date() });
    setFormData({ sum: "", category: "", description: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Add Cost
      </Typography>
      <Stack spacing={2}>
        <TextField
          type="number"
          label="Sum"
          name="sum"
          value={formData.sum}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
        />
        <Button variant="contained" type="submit" fullWidth>
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCost;
