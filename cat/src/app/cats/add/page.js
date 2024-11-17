"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import localFont from "next/font/local";
import { auth } from "@/lib/firebaseClient";

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const AddCat = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Please enter a name for your cat.");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user is signed in");
        return;
      }
      const ownerUid = user.uid;
      // Send POST request to add a new cat
      const response = await fetch("/api/cats/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          breed,
          birthday: birthday ? new Date(birthday) : null,
          ownerUid
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add cat");
      }

      // Redirect to cats list after successful addition
      router.push("/cats/list");
    } catch (error) {
      console.error("Error adding cat:", error);
      setError("There was an issue adding your cat. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 4 }} className={geistSans.variable}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#6b4226" }}>
          Add a New Cat
        </Typography>
        <Typography variant="h6" sx={{ color: "#8b6f47", mt: 1 }}>
          Fill in the details below to add your new feline friend.
        </Typography>
      </Box>

      {/* Form Section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ maxWidth: 600, margin: "0 auto" }}
      >
        <TextField
          fullWidth
          label="Cat Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 3, fontFamily: "inherit" }}
        />
        <TextField
          fullWidth
          label="Breed (Optional)"
          variant="outlined"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          sx={{ mb: 3, fontFamily: "inherit" }}
        />
        <TextField
          fullWidth
          label="Birthday (Optional)"
          variant="outlined"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3, fontFamily: "inherit" }}
        />
        {error && (
          <Typography variant="body2" sx={{ color: "red", mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#6b4226",
            "&:hover": { backgroundColor: "#854c30" },
            fontFamily: "inherit",
            padding: "10px 20px",
          }}
          startIcon={<PetsIcon />}
        >
          Add Cat
        </Button>
      </Box>
    </Box>
  );
};

export default AddCat;