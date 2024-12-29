import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./styles.css";

const ActivityChart = ({
  data,
  visibleNum = 10,
  width = 1000,
  height = 500,
  margin = { top: 60, right: 30, bottom: 50, left: 150 },
}) => {
  const svgRef = useRef();

  useEffect(() => {
    const maxScore = data.reduce(
      (max, activity) => (activity.score > max ? activity.score : max),
      0
    );

    // Clear previous contents
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add title
    svg
      .append("text")
      .attr("x", width / 2) // Center horizontally
      .attr("y", margin.top / 2) // Position above the chart
      .attr("text-anchor", "middle") // Center-align the text
      .attr("font-size", "40px") // Set font size
      .attr("fill", "#EE9D42") // Optional: Set text color
      .text("Activity Chart"); // Set your desired title text

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Scale (for scores)
    const x = d3
      .scaleLinear()
      .domain([0, maxScore])
      .nice()
      .range([0, chartWidth]);

    // Y Scale (for labels)
    const y = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, chartHeight])
      .padding(0.1);

    // Color Decision Function
    const setColor = (score) => {
      if (score <= 10) return "#f44336";
      if (score <= 20) return "#ff9800";
      if (score <= 30) return "#ffc107";
      if (score <= 40) return "#8bc34a";
      return "#4caf50";
    };

    function animateBars(selection, finalWidth) {
      let currentWidth = 0; // Start width at 0

      function growBar() {
        if (currentWidth < finalWidth) {
          currentWidth += Math.min(12, finalWidth - currentWidth); // Increment width by 1 or remaining distance
          selection
            .transition()
            .duration(30) // Duration for each step
            .attr("width", currentWidth)
            .attr("fill", () => {
              if (currentWidth <= x(10)) return "#f44336";
              if (currentWidth <= x(20)) return "#ff9800";
              if (currentWidth <= x(30)) return "#ffc107";
              if (currentWidth <= x(40)) return "#8bc34a";
              return "#4caf50";
            })
            .on("end", () => {
              // After each transition step completes

              growBar(); // Recursive call for the next step
            });
        }
      }

      growBar(); // Start the animation
    }

    // Append bars
    chart
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", 0) // Start bars from the left
      .attr("y", (d) => y(d.label)) // Position by label
      .attr("height", y.bandwidth()) // Height is based on the bandwidth
      .attr("width", 0) // Start with a width of 0
      .attr("fill", "#ccc") // Default color before animation
      .each(function (d) {
        animateBars(d3.select(this), x(d.score)); // Animate bar growth
      })
      .on("mouseover", function () {
        d3.select(this)
          .attr("stroke", "#000000") // Add a stroke
          .attr("stroke-width", 6); // Increase stroke width
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("stroke", "none") // Remove the stroke
          .attr("stroke-width", 0); // Reset stroke width
      })
      .on("mousedown", function (event, d) {
        chart
          .selectAll(".bar")
          .attr("stroke", "none") // Remove stroke
          .attr("stroke-width", 0)
          .attr("opacity", 0.3); // Reset stroke width

        // Highlight the clicked bar
        d3.select(this)
          .attr("fill", setColor(d.score)) // Set color based on score
          .attr("stroke", "#000") // Add stroke
          .attr("stroke-width", 3)
          .attr("opacity", 1); // Increase stroke width
      })
      .on("mouseup", function (event, d) {
        chart
          .selectAll(".bar")
          .attr("fill", (d) => setColor(d.score))
          .attr("opacity", 1);
      });

    // Add X Axis
    chart
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .attr("font-size", "25px");

    // Add Y Axis
    chart
      .append("g")
      .call(d3.axisLeft(y))
      .selectAll("text") // Select all text elements in the Y-axis
      .style("font-size", "18px"); // Set the font size
  }, [data, width, height, margin]);

  return <svg ref={svgRef}></svg>;
};

export default ActivityChart;
