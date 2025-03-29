import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const statsData = [
  { number: "10,000+", label: "Books Available" },
  { number: "5,000+", label: "Happy Readers" },
  { number: "2,000", label: "Daily Searches" },
];

const StatsSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: "#2c2c2c", color: "#fff" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontFamily: "Roboto Mono, monospace", mb: 4 }}
      >
        By the Numbers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {stat.number}
              </Typography>
              <Typography variant="h6">{stat.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StatsSection;
