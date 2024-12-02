"use client";

import React, { useState } from "react";
import JournalCard from "../JournalCard";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import MoodChart from "../chart/MoodChart";

const JournalOverview = () => {
  const [viewType, setViewType] = useState("grid");
  const [month, setMonth] = useState(new Date());
  const [test, setTest] = useState(1);
  // Update month
  function updateDate(date, months) {
    date.setMonth(date.getMonth() + months);
    return date; // Updated date object
  }
  const data = [
    { label: "1", score: 1 },
    { label: "2", score: 3 },
    { label: "3", score: 1 },
    { label: "4", score: 5 },
    { label: "5", score: 4 },
    { label: "6", score: 1 },
    { label: "7", score: 4 },
    { label: "8", score: 5 },
    { label: "9", score: 3 },
    { label: "10", score: 4 },
    { label: "11", score: 3 },
    { label: "12", score: 1 },
    { label: "13", score: 1 },
    { label: "14", score: 5 },
    { label: "15", score: 4 },
    { label: "16", score: 3 },
    { label: "17", score: 1 },
    { label: "18", score: 1 },
    { label: "19", score: 2 },
    { label: "20", score: 4 },
    { label: "21", score: 5 },
    { label: "22", score: 5 },
    { label: "23", score: 4 },
    { label: "24", score: 3 },
    { label: "25", score: 5 },
    { label: "26", score: 3 },
    { label: "27", score: 5 },
    { label: "28", score: 2 },
    { label: "29", score: 2 },
    { label: "30", score: 3 },
  ];

  const journals = [
    {
      id: 1,
      title: "Journal 1",
      content: "Content for journal 1",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 2,
      title: "Journal 2",
      content: "Content for journal 2",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 3,
      title: "Journal 3",
      content: "Content for journal 3",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 4,
      title: "Journal 4",
      content: "Content for journal 4",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 5,
      title: "Journal 5",
      content: "Content for journal 5",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 6,
      title: "Journal 6",
      content: "Content for journal 6",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 7,
      title: "Journal 7",
      content: "Content for journal 7",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 8,
      title: "Journal 8",
      content: "Content for journal 8",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 9,
      title: "Journal 9",
      content: "Content for journal 9",
      image: "/static/images/cards/paella.jpg",
    },
    {
      id: 10,
      title: "Journal 10",
      content: "Content for journal 10",
      image: "/static/images/cards/paella.jpg",
    },
  ];

  const getMonthYear = (date) => {
    let monthYear =
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(date) +
      ", " +
      date.getUTCFullYear();
    return monthYear;
  };

  const handleCardClick = (journal) => {
    setSelectedJournal(journal);
    setOpen(true);
  };

  const handleViewChange = (e) => {
    setViewType(e);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            updateDate(month, -1);
            setTest(() => test - 1);
          }}
          sx={{
            fontSize: "1.7rem", // Custom font size
            border: "none",
            height: "20px",
          }}
        >
          &lt;
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Typography variant="h4"> {getMonthYear(month)}</Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => {
            updateDate(month, 1);
            setTest(() => test + 1);
          }}
          sx={{
            fontSize: "1.7rem", // Custom font size
            border: "none",
            height: "20px",
          }}
        >
          &gt;
        </Button>
      </Box>

      {/* Chart */}
      <Box
        sx={{ justifyContent: "center", m: 4 }}
        className="flex items-center"
      >
        <MoodChart data={data} width={1300} height={400}></MoodChart>
      </Box>

      {/* Journal */}
      <Grid2
        container
        spacing={3} // Space between cards
        className="flex items-center"
      >
        {journals.map((journal) => (
          <Grid2
            xs={12} // Full width on extra-small screens
            sm={6} // 2 items per row on small screens
            md={3} // 4 items per row on medium screens and larger
            sx={{
              padding: 1, // Add some padding to create a consistent gap
            }}
            key={journal.id}
          >
            <JournalCard
              title={journal.title}
              content={journal.content}
              image={journal.image}
              onClick={() => handleCardClick(journal)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default JournalOverview;
