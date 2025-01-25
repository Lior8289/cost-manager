import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";

const MonthlyReport = ({ costs, onFetchCosts }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleFetch = () => {
    onFetchCosts(parseInt(month), parseInt(year));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Monthly Report
      </Typography>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          type="number"
          label="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <TextField
          type="number"
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <Button variant="contained" onClick={handleFetch}>
          Fetch
        </Button>
      </Stack>
      <List>
        {costs.map((cost) => (
          <ListItem key={cost.id}>
            <ListItemText
              primary={`${cost.date}: ${cost.category} - $${cost.sum}`}
              secondary={cost.description}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MonthlyReport;
