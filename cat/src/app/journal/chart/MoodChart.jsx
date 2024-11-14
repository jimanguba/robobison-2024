import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles.css";
const MoodChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 1000;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 50, left: 80 };
    const visibleNum = 8;
    const data = [
      { label: "1", score: 3 },
      { label: "2", score: 4 },
      { label: "3", score: 2 },
      { label: "4", score: 5 },
      { label: "5", score: 1 },
      { label: "6", score: 3 },
      { label: "7", score: 4 },
      { label: "8", score: 2 },
      { label: "9", score: 5 },
      { label: "10", score: 1 },
      { label: "11", score: 3 },
      { label: "12", score: 4 },
      { label: "13", score: 2 },
      { label: "14", score: 5 },
      { label: "15", score: 1 },
      { label: "16", score: 3 },
      { label: "17", score: 4 },
      { label: "18", score: 2 },
      { label: "19", score: 5 },
      { label: "20", score: 1 },
      { label: "21", score: 3 },
      { label: "22", score: 4 },
      { label: "23", score: 2 },
      { label: "24", score: 5 },
      { label: "25", score: 1 },
      { label: "26", score: 3 },
      { label: "27", score: 4 },
      { label: "28", score: 2 },
      { label: "29", score: 5 },
      { label: "30", score: 1 },
    ];

    const customTickLabels = [
      "Very bad",
      "Bad",
      "Neutral",
      "Good",
      "Very good",
    ];

    // Clear previous contents
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    let translateLeft = margin.left;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${translateLeft},${margin.top})`);

    // X Scale (for labels)
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, (chartWidth * 30) / visibleNum])
      .padding(0.1);

    // Y Scale
    const y = d3.scaleLinear().domain([0, 5]).nice().range([chartHeight, 0]);

    function animateBars(selection, finalHeight) {
      let step = 0; // Start from 0

      function growBar() {
        if (step <= finalHeight) {
          selection
            .transition()
            .duration(30) // Duration for each step
            .attr("y", y(step)) // Set y based on step
            .attr("height", chartHeight - y(step)) // Set height based on step
            .attr("fill", () => {
              // Color based on the step/final height
              if (step <= 1) return "#f44336";
              if (step <= 2) return "#ff9800";
              if (step <= 3) return "#ffc107";
              if (step <= 4) return "#8bc34a";
              if (step <= 5) return "#4caf50";
            })
            .on("end", () => {
              // After each transition step completes
              step += 0.1; // Move to the next step
              growBar(); // Recursive call for the next step
            });
        }
      }

      growBar(); // Start the recursive transition
    }

    function animateLabels(selection, finalHeight) {
      let step = 0; // Start from 0

      function growBar() {
        if (step <= finalHeight) {
          selection
            .transition()
            .duration(30) // Duration for each step
            .attr("y", y(step + 0.2)) // Set y based on step
            .attr("height", chartHeight - y(step))
            .text(Math.round(step))
            .on("end", () => {
              // After each transition step completes
              step += 0.1; // Move to the next step
              growBar(); // Recursive call for the next step
            });
        }
      }
      growBar();
    }

    // Append bars with labels
    chart
      .selectAll(".bar-group")
      .data(data)
      .join("g")
      .attr("class", "bar-group") // Group each bar and label together
      .each(function (d) {
        // Append the bar
        d3.select(this)
          .append("rect")
          .attr("x", () => x(d.label))
          .attr("y", chartHeight) // Start bars from the bottom
          .attr("width", x.bandwidth())
          .attr("height", 0) // Start with height 0
          .attr("rx", 8) // Rounded corners for x-axis
          .attr("ry", 8) // Rounded corners for y-axis
          .each(function () {
            animateBars(d3.select(this), d.score); // Call animateBars for each bar
          });

        // Append the label
        d3.select(this)
          .append("image")
          .attr(
            "xlink:href",
            "data:image/jpeg;base64,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"
          ) // Set the image source
          .attr("x", () => x(d.label) + x.bandwidth() / 2 - 10) // Center the image horizontally
          .attr("y", chartHeight) // Position the image above the bar
          .attr("width", 20) // Set image width
          .attr("height", 20) // Set image height
          .each(function () {
            animateLabels(d3.select(this), d.score); // Call animateBars for each bar
          });
      });

    // X Axis
    chart
      .append("g")
      .attr("class", "x-axis") // Add a class
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x));

    // Dragging behavior
    // Set up drag behavior for horizontal panning
    const drag = d3
      .drag()
      .on("start", () => {})
      .on("drag", (event) => {
        const dragDistance = event.dx; // Horizontal drag distance
        if (
          translateLeft + dragDistance <= margin.left &&
          translateLeft + dragDistance >= -(chartWidth * (30 / visibleNum - 1))
        )
          translateLeft += dragDistance;

        chart.attr("transform", `translate(${translateLeft},${margin.top})`);
      })
      .on("end", () => {});

    svg.call(drag);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default MoodChart;
