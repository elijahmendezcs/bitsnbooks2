import React from "react";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <Particles
      options={{
        background: {
          color: { value: "#1a1a1a" },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            resize: true,
          },
        },
        particles: {
          color: { value: "#f39c12" },
          links: {
            color: "#f39c12",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            speed: 1,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 50,
          },
          opacity: { value: 0.5 },
          shape: { type: "circle" },
          size: { random: true, value: 5 },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;
