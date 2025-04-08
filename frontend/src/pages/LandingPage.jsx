import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

// Custom Components
import Navbar from "../components/Navbar";
import ParticleBackground from "../components/ParticleBackground";
import HeroAnimation from "../components/HeroAnimation";
import CategorySection from "../components/CategorySection";
import NewArrivalsCarousel from "../components/NewArrivalsCarousel";
import StatsSection from "../components/StatsSection";

function LandingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`http://localhost:3001/api/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", color: "#fff" }}>
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
        <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
          Discover our curated selection of tech and literature favorites.
        </Typography>

        {/* Search Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ width: 400, backgroundColor: "#fff", borderRadius: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ ml: 2, backgroundColor: "#f57c00", color: "#fff" }}
          >
            Search
          </Button>
        </Box>

        {/* Search Results */}
        {results.length > 0 && (
          <Paper elevation={3} sx={{ backgroundColor: "#2c2c2c", color: "#fff" }}>
            <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
              Search Results:
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Title</TableCell>
                  <TableCell sx={{ color: "#fff" }}>ISBN</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Author</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((book, index) => (
                  <TableRow key={`${book.book_id}-${index}`}>
                    <TableCell sx={{ color: "#fff" }}>{book.book_title}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{book.isbn}</TableCell>
                    <TableCell sx={{ color: "#fff" }}>{book.author_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {results.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="body2" color="text.secondary">
              (Featured books will be displayed here)
            </Typography>
          </Box>
        )}
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
