import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCost from "./components/addcost";
import MonthlyReport from "./components/monhtlyreport";
import PieChart from "./components/piecharts";
import { addCost, getMonthlyCosts, getCostsByCategory } from "./utils/idb";

const App = () => {
  const [costs, setCosts] = useState([]);
  const [chartData, setChartData] = useState({});
  const DB_NAME = "CostManagerDB";
  const STORE_NAME = "Costs";

  const handleAddCost = async (costItem) => {
    await addCost(DB_NAME, STORE_NAME, costItem);
    alert("Cost added successfully!");
  };

  const handleFetchCosts = async (month, year) => {
    const data = await getMonthlyCosts(DB_NAME, STORE_NAME, month, year);
    setCosts(data);
    const chartData = await getCostsByCategory(
      DB_NAME,
      STORE_NAME,
      month,
      year
    );
    console.log(chartData);
    setChartData(chartData);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Cost Manager
      </Typography>

      <Grid container spacing={3}>
        {/* Center column for AddCost form */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <AddCost onAddCost={handleAddCost} />
        </Grid>

        {/* Left column for Monthly Report */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <MonthlyReport costs={costs} onFetchCosts={handleFetchCosts} />
        </Grid>

        {/* Right column for PieChart */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <PieChart chartData={chartData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
