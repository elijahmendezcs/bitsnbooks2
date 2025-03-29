import React from "react";
import { motion } from "framer-motion";
import { Container, Typography, Box, TextField, Button } from "@mui/material";

const HeroAnimation = () => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      sx={{
        background: "linear-gradient(135deg, #1a1a1a, #333)",
        color: "#fff",
        py: 8,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontFamily: "Roboto Mono, monospace", fontWeight: 700 }}
        >
          Welcome to Bits & Books
        </Typography>
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ fontFamily: "Roboto Mono, monospace", mb: 4 }}
        >
          Where technology meets literature.
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 6 }}
        >
          <TextField
            variant="outlined"
            placeholder="Search for books..."
            sx={{ backgroundColor: "#fff", borderRadius: 1, width: "70%" }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#f39c12",
              color: "#fff",
              fontFamily: "Roboto Mono, monospace",
            }}
          >
            Search
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroAnimation;
