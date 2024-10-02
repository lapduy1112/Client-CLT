"use client";
import React, { useState } from "react";
import { Box, Typography, Button, MobileStepper, Paper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const steps = [
  {
    backgroundImage: "/images/carousel1.jpg",
  },
  {
    backgroundImage: "/images/carousel2.jpg",
  },
];

const HomeCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1,
    );
  };

  return (
    <Box sx={{ position: "relative", height: "500px" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          backgroundImage: `url(${steps[activeStep].backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <Box sx={{ maxWidth: "600px" }}></Box>
      </Box>

      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          justifyContent: "center",
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            sx={{ color: "white", marginLeft: "auto" }}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} sx={{ color: "white" }}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default HomeCarousel;
