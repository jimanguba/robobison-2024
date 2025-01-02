import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles.css";

const MoodChart = ({
  data,
  visibleNum = 15,
  width = 1000,
  height = 500,
  margin = { top: 90, right: 30, bottom: 50, left: 80 },
  title = "Monthly Mood Chart",
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const emotion = ["", "😞", "😥", "😐", "😊", "😃"];

    // Clear previous contents
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    let translateLeft = margin.left - 30; // Translate to the left as user drag

    const yAxisGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left - 30},${margin.top})`);

    const chartGroup = svg
      .append("g")
      .attr("class", "chart-group")
      .attr("transform", `translate(${translateLeft - 10},${margin.top})`);

    // X Scale (for labels)
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, (chartWidth * data.length) / visibleNum])
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
              if (step <= 1) return "rgb(246, 124, 87)";
              if (step <= 2) return "#ff9800";
              if (step <= 3) return "#ffc107";
              if (step <= 4) return "#8bc34a";
              if (step <= 5) return "rgb(90, 176, 103)";
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

    // Animate each labels changes
    function animateLabels(selection, finalHeight) {
      let step = 0; // Start from 0

      function growBar() {
        if (step <= finalHeight) {
          selection
            .transition()
            .duration(30) // Duration for each step
            .attr("y", y(step + 0.2)) // Set y based on step
            .attr("height", chartHeight - y(step))
            .text(emotion[Math.round(step)])
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
    chartGroup
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
          .append("text")
          .attr("x", () => x(d.label) + x.bandwidth() / 2) // Center label horizontally
          .attr("y", chartHeight - 5) // Start label from bottom initially
          .attr("text-anchor", "middle") // Center-align the label
          .attr("font-size", "35px")
          .attr("fill", "red")
          .text(d.score) // Set the text to the bar's value
          .each(function () {
            animateLabels(d3.select(this), d.score); // Call animateBars for each bar
          });
      });

    // X Axis
    chartGroup
      .append("g")
      .attr("class", "x-axis") // Add a class
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text") // Select all text elements
      .style("font-size", "24px") // Set font size
      .style("font-family", "Mocha")
      .style("fill", "rgb(255, 155, 88)"); // Set text color

    // Dragging behavior
    // Set up drag behavior for horizontal panning
    const drag = d3
      .drag()
      .on("start", () => {})
      .on("drag", (event) => {
        const dragDistance = event.dx; // Horizontal drag distance
        if (
          translateLeft + dragDistance <= margin.left - 40 &&
          translateLeft + dragDistance >=
            -(chartWidth * (data.length / visibleNum - 1))
        )
          translateLeft += dragDistance;

        chartGroup.attr(
          "transform",
          `translate(${translateLeft},${margin.top})`
        );
      })
      .on("end", () => {});

    svg.call(drag);

    // Add a chart title
    svg
      .append("text")
      .attr("class", "chart-title") // Add a class for styling
      .attr("x", width / 2) // Center the title horizontally
      .attr("y", margin.top / 3) // Position above the chart
      .attr("text-anchor", "middle") // Center-align the text
      .style("font-size", "34px") // Set font size
      .style("font-weight", "bold") // Make the text bold
      .style("font-family", "Mocha")
      .style("fill", "rgb(255, 155, 88)") // Set text color
      .text(title); // Set the title text

    // Add a rectangle as the background to the yAxisGroup
    yAxisGroup
      .append("rect")
      .attr("x", 30 - margin.left) // Start rectangle to the left of the y-axis
      .attr("y", -margin.top) // Align with the top of the group
      .attr("width", margin.left / 2 + 10) // Match the y-axis width
      .attr("height", height) // Match the y-axis height
      .attr("fill", "rgb(255, 244, 218)");

    // Append Y Axis
    yAxisGroup
      .append("g")
      .call(
        d3
          .axisLeft(y)
          .ticks(5) // Ensure the ticks align with your scale
          .tickSize(-width)
          .tickFormat((d) => emotion[d]) // Map numbers to emojis
      )
      .selectAll("text") // Select all tick labels
      .style("font-size", "33px")
      .style("font-family", "Mocha");

    // Style the axis line
    yAxisGroup.selectAll(".domain"); // Select the axis line

    // Style the tick lines
    yAxisGroup
      .selectAll(".tick line") // Select tick lines
      .style("stroke", "rgb(254, 213, 116)"); // Set the tick color

    svg.append(() => yAxisGroup.node());
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default MoodChart;
