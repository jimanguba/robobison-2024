"use client";

import React, { useEffect, useState } from "react";
import JournalCard from "../JournalCard";
import { Box, Typography, Button, Modal } from "@mui/material";
import MoodChart from "../chart/MoodChart";
import "./calendar.css";
import dayjs from "dayjs";
import { getEmotion } from "../data";

const JournalOverview = () => {
  const [viewType, setViewType] = useState("grid");
  const [date, setDate] = useState(new Date());
  const [test, setTest] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState([]);
  const [chartModalOpen, setChartModalOpen] = useState(false);

  // day of week
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Update month
  function updateDate(date, months) {
    date.setMonth(date.getMonth() + months);
    setDate(date); // Update new date
    setCalendarMonth(
      generateCalendarOfMonth(date.getMonth() + 1, date.getFullYear())
    ); // update new calendar
  }

  // Function to generate calendar for a month
  const generateCalendarOfMonth = (month, year) => {
    // Get the day of the week of the first day of the month
    const firstDay = dayjs(`${year}-${month}-1`);
    const numDaysInMonth = firstDay.daysInMonth(); // Number of days in the month
    const firstDayOfWeek = firstDay.day(); // Get the day of the first day of the month

    console.log(firstDayOfWeek);

    // Calendar that we will return
    let calendar = [];

    // Filling the trailing days
    for (let i = 0; i < firstDayOfWeek; ++i) calendar.push(null);

    // Fill the week of the month
    for (let i = 1; i <= numDaysInMonth; ++i)
      calendar.push(dayjs(`${year}-${month}-${i}`));

    // Filling the rest of month view
    let lastDay = dayjs(`${year}-${month}-${numDaysInMonth}`);

    for (let i = lastDay.day() + 1; i <= 6; ++i) calendar.push(null);

    return calendar;
  };

  // UseEffect only called once to get initial state of the calendar
  useEffect(() => {
    setCalendarMonth(
      generateCalendarOfMonth(date.getMonth(), date.getFullYear())
    );
  }, []);

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
    { label: "31", score: 3 },
  ];

  const getMonthYear = (date) => {
    let monthYear =
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(date) +
      ", " +
      date.getUTCFullYear();
    return monthYear;
  };

  return (
    <Box sx={{ padding: 3 }}>
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
            updateDate(date, -1);
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
          <Typography variant="h4"> {getMonthYear(date)}</Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={() => {
            updateDate(date, 1);
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

        {/* Button to let user see the chart */}
        <Button
          variant="outlined"
          onClick={() => {
            setChartModalOpen(true);
          }}
          sx={{
            fontSize: "1rem", // Custom font size
            height: "20px",
          }}
        >
          See the Statistics
        </Button>
      </Box>

      {/* Chart */}
      <Modal open={chartModalOpen} onClose={() => setChartModalOpen(false)}>
        <Box
          sx={{ justifyContent: "center", m: 4 }}
          className="flex items-center"
        >
          <MoodChart data={data} width={1300} height={400}></MoodChart>
        </Box>
      </Modal>
      <div className="calendar">
        {/* Day of week on the header */}
        {dayOfWeek.map((day) => (
          <div
            className="text-center text-slate-400 text-2xl pb-3 mt-5"
            key={day}
          >
            {day}
          </div>
        ))}

        {calendarMonth.map((day, index) => (
          <div
            className="flex-col text-center border rounded-sm w-auto h-32 pt-3"
            key={index}
          >
            {day ? day.date() : ""}
            {/* Print the emoji emotion */}
            {day ? (
              <div className="text-2xl">
                {getEmotion(data[day.date() - 1].score)}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default JournalOverview;
