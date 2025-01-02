"use client";

import React, { useState } from "react";
import { Box, Button, TextField, Menu } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useRouter } from "next/navigation";
import { Drawing } from "./Drawing";
import DrawToolBar from "./DrawToolBar";
import Image from "next/image";

import catTail from "../../images/CatTail.png";
import catFace1 from "../../images/Cat-Mood1.png";
import catFace2 from "../../images/Cat-Mood2.png";
import catFace3 from "../../images/Cat-Mood3.png";
import catFace4 from "../../images/Cat-Mood4.png";
import catFace5 from "../../images/Cat-Mood5.png";

function Cat({ mood }) {
  let catFace;
  let catTailAnimation;

  switch (mood) {
    case 1:
      catFace = catFace1;
      catTailAnimation = "animate-shake5";
      break;
    case 2:
      catFace = catFace2;
      catTailAnimation = "animate-shake4";
      break;
    case 3: //or put this to default whatever (neutral)
      catFace = catFace3;
      catTailAnimation = "animate-shake3";
      break;
    case 4:
      catFace = catFace4;
      catTailAnimation = "animate-shake2";
      break;
    case 5:
      catFace = catFace5;
      catTailAnimation = "animate-shake1";
      break;
  }

  return (
    <div className="relative h-[90%] w-[90%]s">
      <Image
        className="animate-wiggle h-[50%] w-[50%] relative z-10"
        src={catFace}
        alt="Cat face"
      />

      <Image
        className={`absolute h-[50%] w-[50%] bottom-1 left-8 z-0 ${catTailAnimation}`}
        src={catTail}
        alt="Cat tail"
      />
    </div>
  );
}

// Mood Picker
function MoodPicker({ selectedMood, setSelectedMood }) {
  const catFaces = [catFace1, catFace2, catFace3, catFace4, catFace5];

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Horizontal Scrollable mood Container */}
      <div
        style={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping
          gap: "20px",
          padding: "10px",

          backgroundColor: "rgb(248, 217, 196)",
          borderRadius: "20px",

          justifyItems: "center",
        }}
      >
        {catFaces.map((mood, index) => (
          <Image
            key={index}
            src={mood}
            alt={`Mood ${index}`}
            style={{
              width: "100px",
              height: "100px",
              flexShrink: 0, // Prevent shrinking of images
              border: "1px solid rgb(247, 212, 189)",
              // opacity: selectedMood === mood ? 0.7 : 1,
              padding: "8px",
              borderRadius: "10px",
              transition: "opacity 0.3s ease",
            }}
            onClick={() => setSelectedMood(index + 1)} // Set selected mood on click
          />
        ))}
      </div>
    </div>
  );
}

export default function MoodCard() {
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [longAnswer, setLongAnswer] = useState("");
  const router = useRouter();

  // handle close for menu dropdown
  const handleMoodPickerClose = () => {
    setMoodPickerOpen(false);
    setAnchorEl(null);
  };

  // Text Input Change
  const handleChange = (event) => {
    setLongAnswer(event.target.value);
  };

  return (
    <div className="flex h-screen bg-[#F6E9E0] relative">
      {/* Input Section */}
      <div className="flex items-center justify-center w-[100%]">
        <div className="absolute bg-[#EEDFD5] w-full lg:w-3/4 h-[95%] p-5 rounded-xl shadow-2xl border border-[rgb(228,94,4)]">
          <div className="flex items-center justify-around w-[100%] mb-3">
            {/* Cat Display */}
            <div
              className="flex justify-around items-center w-[18%]"
              onClick={(event) => {
                setMoodPickerOpen(!moodPickerOpen);
                setAnchorEl(event.currentTarget);
              }}
            >
              <div className="w-[40%]"></div>
              <Cat mood={moodIntensity} />
              {/* MoodPicker */}
              <Menu
                anchorEl={anchorEl}
                open={moodPickerOpen}
                onClose={handleMoodPickerClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: "rgb(248, 217, 196)",
                    borderRadius: "20px",
                    marginTop: "10px",
                    marginLeft: "20px",
                  },
                }}
              >
                <Box>
                  <MoodPicker
                    selectedMood={moodIntensity}
                    setSelectedMood={setMoodIntensity}
                  />
                </Box>
              </Menu>
            </div>

            {/* Journal Section */}
            <h1 className="text-fontColMain font-readyforfall text-5xl">
              Journal
            </h1>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#6b4226",
                  "&:hover": { backgroundColor: "#854c30" },
                  fontFamily: "readyforfall",
                  padding: "10px 20px",
                  fontSize: "1.2rem",
                }}
                startIcon={<PetsIcon />}
                onClick={() => router.push("/")}
              >
                Add Journal
              </Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex justify-around items-center mb-2">
            <Drawing></Drawing>
          </div>

          <TextField
            label="Journal"
            placeholder="Write your thoughts..."
            multiline
            rows={19}
            variant="outlined"
            fullWidth
            value={longAnswer}
            onChange={handleChange}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                color: "#794F20",
                backgroundColor: "#F6E1D4",
              },
              "& .MuiInputLabel-root": {
                fontSize: "1.2rem",
                color: "#AC7855",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": { borderColor: "#E8A273" },
                "&:hover fieldset": { borderColor: "#AC7855" },
                "&.Mui-focused fieldset": {
                  borderColor: "#AC7855",
                  borderWidth: "2px",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
