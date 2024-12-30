"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Modal, Fade } from "@mui/material";
import MoodChart from "../chart/MoodChart";
import "./calendar.css";
import dayjs from "dayjs";
import { getEmotion } from "../data";
import { chartData } from "../data";
import Image from "next/image";
import sillyCat from "../../images/skibidi cat.png";

const JournalOverview = () => {
  const [date, setDate] = useState(new Date());
  const [test, setTest] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState([]);
  const [chartModalOpen, setChartModalOpen] = useState(false);
  const [dayModalOpen, setDayModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayjs(new Date()));
  const router = useRouter();

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

  // Handle Chart Modal View
  const chartHandleOpen = () => {
    setChartModalOpen(true);
  };
  const chartHandleClose = () => {
    setChartModalOpen(false);
  };

  // Handle journal entries Modal
  const dayHandleOpen = (day) => {
    if (day !== null) setDayModalOpen(true);
  };
  const dayHandleClose = () => {
    setDayModalOpen(false);
  };

  const JournalModal = ({ day, text }) => {
    const modalStyle = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "75%",
      bgcolor: "rgba(255, 196, 147, 0.5)",
      border: "2px solid #000",
      boxShadow: 24,
      p: "3px",
      backdropFilter: "blur(15px)",
      borderRadius: "15px",
    };

    return (
      <Modal
        open={dayModalOpen}
        onClose={dayHandleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 1000, // Backdrop fade timing
        }}
      >
        {day ? (
          <Fade in={dayModalOpen}>
            <Box sx={modalStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between", // Space between elements
                  alignItems: "center", // Align items vertically
                }}
              >
                <span
                  style={{
                    fontSize: "4rem",
                  }}
                >
                  {getEmotion(chartData[day.date() - 1].score)}
                </span>
                <h1
                  style={{
                    fontSize: "1.75rem",
                    textAlign: "center",
                    color: "rgba(255, 192, 45, 0.5)",
                    border: "2px solid rgba(248, 228, 181, 0.5)",
                    padding: "5px",
                    borderRadius: "15px",
                    boxShadow: "0px 6px 2px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(193, 170, 170, 0.2)",
                  }}
                >
                  {dayjs(day).format("MMMM D, YYYY")}
                </h1>
                <div style={{ width: "10%" }}></div>
              </div>

              <div
                style={{
                  height: "100%",
                }}
              >
                {text ? (
                  <div>{text}</div>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      placeItems: "center",
                      height: "60%",
                    }}
                  >
                    <Button onClick={() => router.push("/journal/add")}>
                      <Image
                        src={sillyCat}
                        alt="Skibidi Cat"
                        width={300}
                        height={300}
                      />
                    </Button>
                    <Button
                      style={{
                        fontSize: "1.5rem",
                        textAlign: "center",
                        color: "rgba(255, 192, 45, 0.5)",
                        padding: "5px",
                        whiteSpace: "pre-line",
                      }}
                      disableRipple // Disables the ripple effect
                      disableElevation // Removes the shadow effect when clicked
                      sx={{
                        "&:hover": {
                          backgroundColor: "transparent", // Removes hover background
                        },
                      }}
                      onClick={() => router.push("/journal/add")}
                    >
                      {
                        "Seems like you didn't add your journal today...\n Baka, add some"
                      }
                    </Button>
                  </div>
                )}
              </div>
            </Box>
          </Fade>
        ) : (
          <div></div>
        )}

        {/*if user hasn't add any journal of any cat, have a button to add journal
                 Only increase this if there are existing cats*/}
      </Modal>
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
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

        {/* Modal for journal summary */}
        <JournalModal day={selectedDay} />

        {/* Calendar view */}
        {calendarMonth.map((day, index) => (
          <Button
            className="flex-col text-center border rounded-sm w-auto h-32 pt-3"
            onClick={() => {
              dayHandleOpen(day);
              setSelectedDay(day);
            }}
            key={index}
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
        ))}
      </div>
    </Box>
  );
};

export default JournalOverview;
