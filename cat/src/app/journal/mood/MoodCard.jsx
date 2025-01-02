"use client";

import React, { useState } from "react";
import { Slider, Box, TextField } from "@mui/material";

export default function MoodCard() {
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [longAnswer, setLongAnswer] = useState("");

  const handleChange = (event) => {
    setLongAnswer(event.target.value);
  };
  const marks = [
    { value: 1, label: "😭" },
    { value: 2, label: "😔" },
    { value: 3, label: "😐" },
    { value: 4, label: "😊" },
    { value: 5, label: "🤩" },
  ];

  const handleSliderChange = (event, newValue) => {
    setMoodIntensity(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        gap: "70px",
        borderRadius: "15px",
      }}
    >
      <h1 className="text-4xl font-bold text-blue-500 mt-6">
        How's your Cat today?
      </h1>

      <Slider
        value={moodIntensity}
        onChange={handleSliderChange}
        step={1}
        marks={marks.map((mark) => ({
          ...mark,
          label: (
            <span
              style={{
                fontSize: "4rem",
                color: moodIntensity === mark.value ? "blue" : "lightgray",
                fontWeight: moodIntensity === mark.value ? "bold" : "normal",
                opacity: moodIntensity === mark.value ? 1 : 0.5,
              }}
            >
              {mark.label}
            </span>
          ),
        }))}
        min={1}
        max={5}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => {
          switch (value) {
            case 1:
              return "Very Bad";
            case 2:
              return "Bad";
            case 3:
              return "Neutral";
            case 4:
              return "Good";
            case 5:
              return "Very Good";
            default:
              return value; // Fallback to the numeric value if no match
          }
        }}
        sx={{
          width: "50%",
          "& .MuiSlider-valueLabel": {
            backgroundColor: "transparent", // Transparent value label background
            boxShadow: "none", // Remove any shadow
            color: "orange", // Text color for the value label
            fontSize: "2rem", // Adjust font size for readability
            fontWeight: "bold", // Make the text bold
            padding: 0, // Remove padding for cleaner look
          },

          "& .MuiSlider-rail": {
            backgroundColor: "#CEAC3D", // Keep the track line light
          },
          "& .MuiSlider-track": {
            backgroundColor: "#CEAC3D", // Make the moving part of the track invisible
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#F6F9A3", // Marker color
            width: "30px", // Adjust the width of the dot
            height: "30px", // Adjust the height of the dot
            borderRadius: "50%", // Ensure the dot is circular
          },
          "& .MuiSlider-markLabel": {
            top: 30, // Position labels slightly below the track
          },

          "& .MuiSlider-mark": {
            width: "12px", // Adjust the width of the dot
            height: "12px", // Adjust the height of the dot
            borderRadius: "50%", // Ensure the dot is circular
            backgroundColor: "yellow", // Color of the dots
            transform: "translateX(-50%) translateY(-50%)", // Center the dots
          },
        }}
      />

      <h1 className="text-4xl font-bold text-blue-500 mt-6">
        What's wrong bro?
      </h1>
      <TextField
        label="Tell me your shit"
        placeholder="Tell me..."
        multiline
        rows={8} // Number of visible rows
        variant="outlined" // Style: outlined, filled, or standard
        fullWidth // Makes the input span full width
        value={longAnswer}
        onChange={handleChange}
        sx={{
          "& .MuiInputBase-root": {
            fontSize: "1.2rem", // Adjust font size for better readability
          },
          "& .MuiInputLabel-root": {
            fontSize: "1.2rem", // Adjust label font size
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Customize border radius
          },
        }}
      />
    </Box>
  );
}
