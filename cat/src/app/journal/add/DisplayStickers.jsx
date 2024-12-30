"client";

import { useState, useRef } from "react";
import { stickers } from "../data";

export default function StickerPicker() {
  // State to hold the selected sticker
  const [selectedSticker, setSelectedSticker] = useState(null);
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
      <h1>Sticker Picker</h1>

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
            }}
            onClick={() => setSelectedSticker(sticker)} // Set selected sticker on click
            onMouseDown={(e) => e.preventDefault()}
          />
        ))}
      </div>

      {/* Selected Sticker Display */}
      {selectedSticker && (
        <div style={{ marginTop: "20px" }}>
          <h2>Selected Sticker</h2>
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
