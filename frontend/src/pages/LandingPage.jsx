import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
          color: "#fff",
          py: 8,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "Roboto Mono, monospace",
              fontWeight: 700,
            }}
          >
            Welcome to Bits & Books
          </Typography>
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{
              fontFamily: "Roboto Mono, monospace",
              mb: 4,
            }}
          >
            Where technology meets literature.
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 6,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for books..."
              sx={{
                backgroundColor: "#fff",
                borderRadius: 1,
                width: "70%",
              }}
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

      {/* Featured Books Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "Roboto Mono, monospace",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Featured Books
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          Discover our curated selection of tech and literature favorites.
        </Typography>
        {/* Placeholder: Replace this box with a grid or card layout later */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="textSecondary">
            (Featured books will be displayed here)
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
    </div>
  );
}

export default LandingPage;
