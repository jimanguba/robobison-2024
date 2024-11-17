"use client";
import React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import localFont from "next/font/local";
import { Background } from "@/app/page";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const CatsPage = () => {
  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      {/* Foreground Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: 5,
        }}
        className={geistSans.variable}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#794F2C",
              fontFamily: "readyforfall",
            }}
          >
            Welcome to the CATJ App!
          </Typography>
          <Typography variant="h6" sx={{ color: "#8b6f47", mt: 1 }}>
            Catch your cat's feelings, manage their well-being, and add new
            feline friends!
          </Typography>
        </Box>

        {/* Action Buttons Section */}
        <Grid container spacing={4} justifyContent="center">
          <Grid item>
            <Link href="/cats/list" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#8b6f47",
                  "&:hover": { backgroundColor: "#a07855" },
                  fontFamily: "readyforfall",
                  padding: "10px 20px",
                }}
                startIcon={<PetsIcon />}
              >
                View List of Cats
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/cats/add" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6b4226",
                  "&:hover": { backgroundColor: "#854c30" },
                  fontFamily: "readyforfall",
                  padding: "10px 20px",
                }}
                startIcon={<NoteAddIcon />}
              >
                Add a New Cat
              </Button>
            </Link>
          </Grid>
        </Grid>

        {/* Featured Cats Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              color: "#6b4226",
              fontFamily: "readyforfall",
            }}
          >
            Featured Cats
          </Typography>
          <Grid container spacing={4}>
            {/* Example of a featured cat card */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/images/cat1.jpg" // Replace with your image path
                  alt="Cat Name"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "inherit", color: "#6b4226" }}
                  >
                    Cat Name
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontFamily: "inherit" }}
                  >
                    Brief description about the cat. This section can include
                    details like breed, age, and personality traits.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Repeat the above Grid item for more featured cats */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default CatsPage;
