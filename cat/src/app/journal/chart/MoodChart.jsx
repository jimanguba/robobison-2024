import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const MoodChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const labels = ["Very Bad", "Bad", "Neutral", "Good", "Very Good"];

    const data = [
      { date: new Date(2023, 0, 1), value: 3 },
      { date: new Date(2023, 1, 1), value: 5 },
      { date: new Date(2023, 2, 1), value: 2 },
      { date: new Date(2023, 3, 1), value: 2 },
      { date: new Date(2023, 4, 1), value: 2 },
    ];

    // The svg size
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 80 };

    // Bin the data.
    const bins = d3
      .bin()
      .thresholds(40)
      .value((d) => d.rate);

    // Svg container
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3.scaleLinear().domain([1, 31]).range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([1, 5])
      .range([height - margin.top - margin.bottom, 0]);

    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5) // Show ticks from 1 to 5
      .tickFormat((d, i) => labels[i]); // Format as integers

    // Add a rect for each bin.
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll()
      .data(bins)
      .join("rect")
      .attr("x", (d) => x(d.x0) + 1)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("y", (d) => y(d.length))
      .attr("height", (d) => y(0) - y(d.length));

    // Append the line to the SVG
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // Add x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5));

    // Add y-axis
    svg.append("g").call(yAxis);
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default MoodChart;
