"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import localFont from "next/font/local";
import PetsIcon from "@mui/icons-material/Pets";
import MoodIcon from "@mui/icons-material/Mood";
import { auth } from "@/lib/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import dayjs from "dayjs";
import { defaultCatProfilePic } from "../data";
import Notification from "@/app/components/Notification";

const theme = createTheme({
  palette: {
    primary: {
      main: "#794f2c",
      light: "#d6b89f",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "GoMocha",
    fontSize: 18,
  },
});

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const CatsList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  // Calculate the age of the cat
  const calculateAge = (birthday) => {
    const today = dayjs();
    const birthDate = dayjs(birthday);

    let age = today.year() - birthDate.year();
    const monthDiff = today.month() - birthDate.month();
    const dayDiff = today.date() - birthDate.date();
    let message = "";

    // Adjust age if the birthday hasn't occurred this year yet
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    // If age is 0, calculate months
    if (age === 0) {
      const months = today.diff(birthDate, "month");
      if (months > 0) {
        message = `${months} months old`;
      } else {
        // If both age and months are 0, calculate days
        const days = today.diff(birthDate, "day");
        message = `${days} days old`;
      }
    } else {
      message = `${age} years old`;
    }

    return message;
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        if (!user) {
          console.error("No user is signed in");
          setLoading(false);
          return;
        }

        console.log("user:", user);

        // Fetch cats with user.uid
        const response = await fetch(`/api/cats?ownerId=${user.uid}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCats(data);
      } catch (error) {
        console.error("Error fetching cats:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of the result
      }
    };

    // Fetch cats only if user is authenticated
    if (user) {
      fetchCats();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: "#fcf6f2",
          display: "flex", // Optional: For flex-based layout
          flexDirection: "column", // Optional: For flex-based layout
        }}
        className={geistSans.variable}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "#6b4226" }}
          >
            Your Cats
          </Typography>
          <Typography variant="h6" sx={{ color: "#8b6f47", mt: 1 }}>
            Track your cats' moods, activities, and health notes.
          </Typography>
        </Box>

        {/* List of Cats Section */}
        <Grid container spacing={4}>
          {cats.length === 0 ? (
            <Typography variant="h6" sx={{ color: "#8b6f47" }}>
              No cats found. Click the button below to add your first cat.
            </Typography>
          ) : (
            cats.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat.id}>
                <Card
                  sx={{
                    maxWidth: 600, // Adjust width for layout
                    backgroundColor: "#f9f5f0",
                    borderRadius: "15px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    border: "1px solid #d6b89f",
                  }}
                >
                  <CardContent>
                    {/* Parent Flexbox Container */}
                    <Box
                      sx={{
                        display: "flex", // Flexbox for layout
                        alignItems: "flex-start", // Align content at the top
                        gap: 4, // Space between columns
                      }}
                    >
                      {/* Left Column: Image */}
                      <Box
                        sx={{
                          flex: "0 0 auto", // Fixed size for the image container
                          width: "30%", // Adjust width as needed
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={cat.catAva || defaultCatProfilePic} // Fallback to default image if `cat.catAva` is not available
                          alt={cat.name || "Default Cat Avatar"} // Fallback alt text
                          width={200} // Provide a width
                          height={200} // Provide a height
                          style={{
                            width: "100%", // Ensure the image fits within the container
                            height: "auto", // Maintain aspect ratio
                            borderRadius: "50%", // Optional: Add rounded corners
                            objectFit: "cover", // Ensures the image covers the given width/height
                            border: "2px solid #6b4226",
                          }}
                        />
                      </Box>

                      {/* Right Column: Content */}
                      <Box sx={{ flex: "1 1 auto" }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ fontFamily: "inherit", color: "#6b4226" }}
                        >
                          {cat.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2, // Adds spacing between items
                          }}
                        >
                          <Box>
                            <Box
                              component="span"
                              sx={{
                                display: "inline-block",
                                padding: "4px 8px",
                                marginRight: "8px",
                                borderRadius: "8px",
                                backgroundColor: "#6b4226",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                color: "#fff",
                                width: "20%",
                                textAlign: "center",
                              }}
                            >
                              Breed:
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontFamily: "inherit",
                                display: "inline",
                                fontSize: "1.2rem",
                              }}
                            >
                              {cat.breed || "Unknown"}
                            </Typography>
                          </Box>
                          <Box>
                            <Box
                              component="span"
                              sx={{
                                display: "inline-block",
                                padding: "4px 8px",
                                marginRight: "8px",
                                borderRadius: "8px",
                                backgroundColor: "#6b4226",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                color: "#fff",
                                width: "20%",
                                textAlign: "center",
                              }}
                            >
                              Age:
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                fontFamily: "inherit",
                                display: "inline",
                                fontSize: "1.2rem",
                              }}
                            >
                              {cat.birthday
                                ? `${calculateAge(cat.birthday)}`
                                : "That's a secret"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      padding: 2, // Add spacing around the actions
                      justifyContent: "center", // Center the content horizontally
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex", // Use flexbox for alignment
                        justifyContent: "space-between", // Space out the buttons
                        alignItems: "center", // Vertically center the buttons
                        gap: 2, // Adds space between buttons
                        width: "100%", // Ensure the buttons span the full card width
                      }}
                    >
                      <Link
                        href={`/cats/view?id=${cat.id}`}
                        passHref
                        legacyBehavior
                      >
                        <Button size="small" sx={{ color: "#6b4226" }}>
                          View Details
                        </Button>
                      </Link>
                      <Link
                        href={`/journal/add?catId=${cat.id}`}
                        passHref
                        legacyBehavior
                      >
                        <Button
                          size="small"
                          startIcon={<MoodIcon />}
                          sx={{ color: "#8b6f47" }}
                        >
                          Add Mood Entry
                        </Button>
                      </Link>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* Button to Add New Cat */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Link href="/cats/add" passHref legacyBehavior>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6b4226",
                "&:hover": { backgroundColor: "#854c30" },
                fontFamily: "inherit",
                padding: "10px 20px",
              }}
              startIcon={<PetsIcon />}
            >
              Add a New Cat
            </Button>
          </Link>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CatsList;
