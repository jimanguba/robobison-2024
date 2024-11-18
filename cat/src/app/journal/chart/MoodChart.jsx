import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles.css";

const MoodChart = ({
  data,
  visibleNum = 10,
  width = 1000,
  height = 500,
  margin = { top: 60, right: 30, bottom: 50, left: 80 },
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
    let translateLeft = margin.left; // Translate to the left as user drag

    const chart = svg
      .append("g")
      .attr("transform", `translate(${translateLeft},${margin.top})`);

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
          .append("text")
          .attr("x", () => x(d.label) + x.bandwidth() / 2) // Center label horizontally
          .attr("y", chartHeight - 5) // Start label from bottom initially
          .attr("text-anchor", "middle") // Center-align the label
          .attr("font-size", "25px")
          .attr("fill", "white")
          .text(d.score) // Set the text to the bar's value
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
          translateLeft + dragDistance >=
            -(chartWidth * (data.length / visibleNum - 1))
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
