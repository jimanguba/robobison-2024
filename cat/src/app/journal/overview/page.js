"use client";

import React, { useEffect, useState, useRouter } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import MoodChart from "../chart/MoodChart";
import "./calendar.css";
import dayjs from "dayjs";
import { getEmotion } from "../data";
import { chartData } from "../data";
import { color, rgb } from "d3";

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

const JournalOverview = () => {
  const [viewType, setViewType] = useState("grid");
  const [date, setDate] = useState(new Date());
  const [test, setTest] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState([]);
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [dayModalOpen, setDayModalOpen] = useState(false);

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

  const getMonthYear = (date) => {
    let monthYear =
      new Intl.DateTimeFormat("en-US", { month: "long" }).format(date) +
      ", " +
      date.getUTCFullYear();
    return monthYear;
  };

  const chartHandleOpen = () => {
    setChartModalOpen(true);
  };
  const chartHandleClose = () => {
    setChartModalOpen(false);
  };

  const dayHandleOpen = (day) => {
    if (day != null) {
      setDayModalOpen(true);
    } else {
      setDayModalOpen(false);
    }
  };
  const dayHandleClose = () => {
    setDayModalOpen(false);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    height: 200,
    bgcolor: "background.paper",
    border: "10px transparent",
    pt: 3,
    px: 4,
    pb: 3,
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 4, backgroundColor: "#fcf6f2", minHeight: "100vh" }}>
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
            <Typography variant="h4" sx={{ color: "#5e3b1e" }}>
              {getMonthYear(date)}
            </Typography>
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
            onClick={chartHandleOpen}
            sx={{
              fontSize: "1rem", // Custom font size
              height: "20px",
            }}
          >
            Monthly Mood Overview
          </Button>
        </Box>

        {/* Chart */}
        <Modal
          open={chartModalOpen}
          onClose={chartHandleClose}
          sx={{ backdropFilter: "blur(15px)" }}
        >
          <Box
            sx={{ justifyContent: "center", m: 4 }}
            className="flex items-center"
          >
            <MoodChart data={chartData} width={1300} height={400}></MoodChart>
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
            <div key={index}>
              <Button
                className="flex-col text-center border rounded-sm w-auto h-32 pt-3"
                onClick={() => dayHandleOpen(day)}
              >
                {day ? day.date() : ""}
                {/* Print the emoji emotion */}
                {day ? (
                  <div className="text-3xl">
                    {getEmotion(chartData[day.date() - 1].score)}
                  </div>
                ) : (
                  ""
                )}
              </Button>

              <Modal
                open={dayModalOpen}
                onClose={dayHandleClose}
                sx={modalStyle}
              >
                {/* UI for the button summary */}
                {/* i want to somehow make this a single component for the sake of neat-ness. but idk how.. maybe jsx -ashley */}
                <Box>
                  <Typography id="modal-title" variant="h5">
                    Cat 1
                    {/* This should be replaced with however many cats's names user have*/}
                  </Typography>
                  <Typography id="modal-description" sx={{ mt: 2 }}>
                    Mood : {/*Somehow use database to put the value here */}
                  </Typography>

                  <Button
                    onClick={() => useRouter().push("/authentication/sign-up")}
                  >
                    Details
                  </Button>
                  {/*Direct using useRoute*/}
                </Box>
                {/*if user hasn't add any journal of any cat, have a button to add journal
                 Only increase this if there are existing cats*/}
              </Modal>
            </div>
          ))}
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default JournalOverview;
