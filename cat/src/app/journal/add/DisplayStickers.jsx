"client";

import { useState, useRef } from "react";
import { stickers } from "../data";

export default function StickerPicker({ selectedSticker, setSelectedSticker }) {
  // State to hold the selected sticker
  const containerRef = useRef(null); // Ref for the scrollable container

  // Mouse event handlers for grab-and-scroll
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    container.isDragging = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeftStart = container.scrollLeft;
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container.isDragging) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - container.startX; // Distance moved
    container.scrollLeft = container.scrollLeftStart - walk;
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    container.isDragging = false;
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Horizontal Scrollable Sticker Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto", // Enable horizontal scrolling
          whiteSpace: "nowrap", // Prevent wrapping
          gap: "20px",
          padding: "10px",
          border: "1px solid #ddd", // Optional styling
          width: "80%", // Adjust to control container width
          cursor: "grab", // Add grab cursor
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          msOverflowStyle: "none", // Hide scrollbar for IE
          backgroundColor: "#FFDDA9",
          borderRadius: "20px",
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Ensure drag stops if mouse leaves container
      >
        {stickers.map((sticker, index) => (
          <img
            key={index}
            src={sticker}
            alt={`Sticker ${index}`}
            style={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              flexShrink: 0, // Prevent shrinking of images
              border: "2px solid rgb(249, 204, 175)",
              opacity: selectedSticker === sticker ? 0.7 : 1,
              padding: "8px",
              borderRadius: "10px",
              transition: "opacity 0.3s ease",
            }}
            onClick={() => setSelectedSticker(sticker)} // Set selected sticker on click
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
      </div>

      {selectedSticker && (
        <div>
          <img
            src={selectedSticker}
            alt="Selected Sticker"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
