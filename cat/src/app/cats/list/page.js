'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, CircularProgress } from "@mui/material";
import localFont from "next/font/local";
import PetsIcon from '@mui/icons-material/Pets';
import MoodIcon from '@mui/icons-material/Mood';

const geistSans = localFont({
  src: "../../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const CatsList = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        // Assuming we are fetching from an API route to get cats for the authenticated user
        const response = await fetch("/api/cats");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cats:", error);
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }} className={geistSans.variable}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: "#6b4226" }}>
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
              <Card sx={{ maxWidth: 345, backgroundColor: "#f9f5f0" }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: 'inherit', color: '#6b4226' }}
                  >
                    {cat.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                    Breed: {cat.breed || "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                    Age: {cat.age ? `${cat.age} years old` : "Unknown"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/cats/view?id=${cat.id}`} passHref legacyBehavior>
                    <Button size="small" sx={{ color: '#6b4226' }}>
                      View Details
                    </Button>
                  </Link>
                  <Link href={`/journal/add?catId=${cat.id}`} passHref legacyBehavior>
                    <Button size="small" startIcon={<MoodIcon />} sx={{ color: '#8b6f47' }}>
                      Add Mood Entry
                    </Button>
                  </Link>
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
              '&:hover': { backgroundColor: "#854c30" },
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
  );
};

export default CatsList;

