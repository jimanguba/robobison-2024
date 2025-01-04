"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import localFont from "next/font/local";
import { auth } from "@/lib/firebaseClient";
import { Background } from "@/app/page";
import { GoPlus } from "react-icons/go";
import { defaultCatProfilePic } from "../data";

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
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultCatProfilePic);
  const [uniqueDate, setUniqueDate] = useState("");

  const user = auth.currentUser;

  // Hash current timestamp to make it the ava folder
  const hashDate = async (dateString) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(dateString);
    const hash = await crypto.subtle.digest("SHA-256", data);

    // Convert hash to a hexadecimal string
    return Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  };

  useEffect(() => {
    const hash = async () => {
      let uniqueDate = await hashDate(new Date().toISOString());
      setUniqueDate(uniqueDate);
      return uniqueDate;
    };

    hash();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name) {
      setError("Please enter a name for your cat.");
      return;
    }

    try {
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
          ownerUid,
          catAva: imageUrl,
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

  const uploadCatImage = async (file) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    try {
      // Step 1: Get pre-signed URL
      const response = await fetch("/api/uploadImages/pre-sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: `CatAva-${uniqueDate}`,
          fileType: file.type,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get pre-signed URL");
      }

      const { url } = await response.json();

      // Step 2: Upload the file directly to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadResponse.ok) {
        const imageUrl1 = `${url.split("?")[0]}?timestamp=${Date.now()}`; // Extract the public S3 URL
        setImageUrl(imageUrl1);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex", // Flexbox for centering
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: 4,
          margin: "auto",
          maxWidth: 800,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent white
          borderRadius: 10, // Rounded corners
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Optional shadow
          backdropFilter: "blur(10px)", // Glassmorphism effect
        }}
        className={geistSans.variable}
      >
        {/* Form */}
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: -30, // Adjust top positioning if needed
            left: 0,
            right: 0,
            textAlign: "center",
            height: "100px", // Set height for the header area
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#794F2C",
              fontFamily: "readyforfall",
            }}
            flex={2}
          >
            Add a New Cat
          </Typography>
        </Box>

        {/* Cat Ava */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Ensures the content inside is centered
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Ensures the content inside is centered
              width: "20%", // Fixed width
              height: "20%", // Fixed height
              borderRadius: "50%", // Makes it a circle
              mb: 3, // Adds some space below the circle
            }}
          >
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(event) => {
                setFile(event.target.files[0]);
                uploadCatImage(event.target.files[0]);
              }}
            />
            <label htmlFor="file-input">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "rgb(255, 255, 255)",
                  borderRadius: "50%",
                  padding: "0",
                  overflow: "hidden",
                  width: "100%", // Matches the parent circle size
                  height: "100%", // Matches the parent circle size
                  "&:hover": { opacity: "0.6" },
                }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    style={{
                      width: "100%", // Ensures the image fits inside the circle
                      height: "100%",
                      objectFit: "cover", // Keeps the image aspect ratio while covering the circle
                      borderRadius: "50%", // Ensures the image fits within the circle
                    }}
                  />
                ) : (
                  <GoPlus color="rgb(233, 201, 176)" size="100%" />
                )}
              </Button>
            </label>
          </Box>
        </Box>
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
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
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
                fontSize: "1.2rem",
              }}
              startIcon={<PetsIcon />}
            >
              Add Cat
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddCat;
