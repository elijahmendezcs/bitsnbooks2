import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import ComputerIcon from "@mui/icons-material/Computer";
import MemoryIcon from "@mui/icons-material/Memory";

const categories = [
  { name: "Tech", icon: <ComputerIcon sx={{ fontSize: 40 }} /> },
  { name: "Programming", icon: <MemoryIcon sx={{ fontSize: 40 }} /> },
  { name: "Fiction", icon: <BookIcon sx={{ fontSize: 40 }} /> },
];

const CategorySection = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontFamily: "Roboto Mono, monospace",
          mb: 4,
        }}
      >
        Explore by Category
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                backgroundColor: "#2c2c2c",
                color: "#fff",
                p: 2,
              }}
            >
              <CardContent>
                {category.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySection;
