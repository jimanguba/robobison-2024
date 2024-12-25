"use client";

import React, { useState, useRef } from "react";
import { Slider, Button, TextField } from "@mui/material";
import { Background, Cat } from "@/app/page";
import PetsIcon from "@mui/icons-material/Pets";
import { useRouter } from "next/navigation";
import { Drawing } from "./Drawing";
import DrawToolBar from "./DrawToolBar";

export default function MoodCard() {
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [longAnswer, setLongAnswer] = useState("");
  const router = useRouter();
  const [isDrawing, setIsDrawing] = useState(false);
  const parentDrawingRef = useRef(null); // Ref to the parent of the drawing

  const handleChange = (event) => {
    setLongAnswer(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setMoodIntensity(newValue);
  };

  // Switching to drawing mode
  const handleDrawingClick = () => {
    setIsDrawing(true);
  };

  const handleDrawingClose = () => {
    setIsDrawing(false);
  };

  // The Submit Button UI
  const SubmitButton = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#6b4226",
          "&:hover": { backgroundColor: "#854c30" },
          fontFamily: "readyforfall",
          padding: "10px 20px",
        }}
        startIcon={<PetsIcon />}
      >
        Add Cat
      </Button>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F6E9E0] relative">
      {/* <div className="absolute inset-0 z-1">
        <div>
          <Background />
        </div>
        <div className="flex items-center justify-center w-[5%] h-[5%]">
          <Cat mood={moodIntensity}></Cat>
        </div>
      </div> */}
      {/* Input thing */}
      <div className="flex items-center justify-center items-center  w-[100%] h-[100%]">
        <div className="absolute bg-[#EEDFD5] w-[90%] h-[100%] p-8 rounded-xl shadow-lg">
          {/* <h1
            className="text-fontColMain font-readyforfall text-5xl text-center mb-14"
            style={{ textShadow: "2px 2px 4px rgba(121, 79, 44, 0.25)" }}
          >
            How is your meow~~ doing?
          </h1>
          <div>
            <Slider
              value={moodIntensity}
              onChange={handleSliderChange}
              step={1}
              marks
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
                width: "100%",
                mb: "14px",

                "& .MuiSlider-valueLabel": {
                  fontFamily: "readyforfall",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  color: "#EE9F6B",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  padding: 0,
                },

                "& .MuiSlider-rail": {
                  backgroundColor: "#CEAC3D",
                },
                "& .MuiSlider-track": {
                  backgroundColor: "#CEAC3D",
                },
                "& .MuiSlider-thumb": {
                  backgroundColor: "#EEBC9C",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                },
                "& .MuiSlider-markLabel": {
                  top: 30,
                },
              }}
            />
          </div> */}

          <div className="mb-14">
            <h1
              className="text-fontColMain font-readyforfall text-5xl text-center "
              style={{ textShadow: "2px 2px 4px rgba(121, 79, 44, 0.25)" }}
            >
              Journal
            </h1>
            <div className="flex-row">
              <SubmitButton />

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6b4226",
                  "&:hover": { backgroundColor: "#854c30" },
                  fontFamily: "readyforfall",
                  padding: "10px 20px",
                }}
                startIcon={<PetsIcon />}
                onClick={handleDrawingClick}
              >
                Drawing
              </Button>
            </div>
          </div>
          {/* Input */}
          <div style={{ position: "relative" }}>
            {/* Drawing Component */}
            <div
              style={{
                position: "absolute",
                top: -70,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 10, // Higher z-index to overlay on the TextField
              }}
            >
              {isDrawing ? (
                <Drawing
                  canvasHeight={
                    parentDrawingRef.current.getBoundingClientRect().height
                  }
                  canvasWidth={
                    parentDrawingRef.current.getBoundingClientRect().width
                  }
                />
              ) : (
                <></>
              )}
            </div>

            <TextField
              ref={parentDrawingRef}
              label="Journal"
              placeholder="Write your thought"
              multiline
              rows={16}
              variant="outlined"
              fullWidth
              value={longAnswer}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-root": {
                  fontSize: "1.2rem",
                  color: "#794F20",
                  backgroundColor: "#E5D0C3",
                  "&::-webkit-scrollbar": {},
                  height: "500px",
                  width: "100%",
                },

                "& .MuiInputLabel-root": {
                  fontSize: "1.3rem",
                  color: "rgba(100, 100, 100, 0.7)",
                  fontFamily: "Arial, sans-serif",
                },

                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#E8A273",
                  },
                  "&:hover fieldset": {
                    borderColor: "#AC7855",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#AC7855",
                    borderWidth: "2px",
                  },
                },

                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(100, 100, 100, 0.7)",
                  fontStyle: "italic",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
