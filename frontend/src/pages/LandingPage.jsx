import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom Components
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import HeroAnimation from "../components/HeroAnimation";
import CategorySection from "../components/CategorySection";
import NewArrivalsCarousel from "../components/NewArrivalsCarousel";
import StatsSection from "../components/StatsSection";

function LandingPage() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <ParticleBackground />
      </Box>

      <HeroAnimation />

      <CategorySection />

      <NewArrivalsCarousel />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontFamily: "Roboto Mono, monospace",
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.secondary">
            (Featured books will be displayed here)
          </Typography>
        </Box>
      </Container>

      <StatsSection />

      <Box sx={{ backgroundColor: "#1a1a1a", color: "#fff", py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Bits & Books. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </div>
  );
}

export default LandingPage;
