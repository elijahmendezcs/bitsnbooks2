import React from "react";
import Slider from "react-slick";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const books = [
  { title: "Deep Learning Essentials", image: "https://via.placeholder.com/200x300" },
  { title: "React & Beyond", image: "https://via.placeholder.com/200x300" },
  { title: "Cyberpunk Reads", image: "https://via.placeholder.com/200x300" },
];

const NewArrivalsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ my: 8 }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontFamily: "Roboto Mono, monospace", mb: 4 }}
      >
        New Arrivals
      </Typography>
      <Slider {...settings}>
        {books.map((book, index) => (
          <Box key={index} sx={{ px: 2 }}>
            <Card sx={{ backgroundColor: "#2c2c2c", color: "#fff" }}>
              <CardMedia
                component="img"
                image={book.image}
                alt={book.title}
                sx={{ height: 300, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default NewArrivalsCarousel;
