"use client";

import React, { useState } from "react";
import { Slider, Button, TextField } from "@mui/material";
import { Background, Cat } from "@/app/page";
import PetsIcon from "@mui/icons-material/Pets";
import { useRouter } from "next/navigation";
import { Drawing } from "./Drawing";
import DrawToolBar from "./DrawToolBar";
import DisplayStickers from "./DisplayStickers";

export default function MoodCard() {
  const [moodIntensity, setMoodIntensity] = useState(3);
  const [longAnswer, setLongAnswer] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setLongAnswer(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setMoodIntensity(newValue);
  };

  return (
    <div className="flex h-screen bg-[#F6E9E0] relative">
      <div className="flex bg-red-100 justify-contennt-center w-[1000px] h-[1000px]">
        <Drawing />
      </div>
    </div>
  );
}
