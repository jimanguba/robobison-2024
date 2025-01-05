import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Settings = ({ canvas }) => {
  const [selectedObjects, setSelectedObjects] = useState([]); // Track multiple selected objects
  const [color, setColor] = useColor("hex", "#FF0000"); // Default color
  const [strokeSize, setStrokeSize] = useState(1); // Default stroke width
  const [strokeColor, setStrokeColor] = useColor("hex", "#FF0000");
  const [strokeLineDash, setStrokeLineDash] = useState(1);

  useEffect(() => {
    if (canvas) {
      // Enable multi-selection
      canvas.selection = true;

      // Handle selection of multiple objects
      canvas.on("selection:created", (event) => {
        setSelectedObjects(event.selected || []);
      });

      canvas.on("selection:updated", (event) => {
        setSelectedObjects(event.selected || []);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }
  }, [canvas]);

  // Apply color change to all selected objects
  const handleColorChange = (newColor) => {
    setColor(newColor);

    // Update the `fill` color for all selected objects
    selectedObjects.forEach((object) => {
      object.set(
        "fill",
        `rgb(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b})`
      );
    });

    canvas.renderAll(); // Re-render the canvas
  };

  // Apply stroke color change to all selected objects
  const handleStrokeColorChange = (newColor) => {
    setStrokeColor(newColor);

    // Update the `fill` color for all selected objects
    selectedObjects.forEach((object) => {
      object.set(
        "stroke",
        `rgb(${newColor.rgb.r}, ${newColor.rgb.g}, ${newColor.rgb.b})`
      );
    });

    canvas.renderAll(); // Re-render the canvas
  };

  // Apply stroke size change to all selected objects
  const handleStrokeSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setStrokeSize(newSize);
    selectedObjects.forEach((object) => {
      // Update stroke size
      if (object.type === "rect" || object.type === "circle")
        object.set("strokeWidth", newSize / 50);

      if (object.type === "path") object.set("strokeWidth", newSize / 1.5);
    });

    canvas.renderAll(); // Re-render the canvas
  };

  // Apply stroke line change to all selected objects
  const handleStrokeLineChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setStrokeLineDash(newSize);
    selectedObjects.forEach((object) => {
      // Update stroke size
      if (object.type === "rect" || object.type === "circle")
        object.set("strokeDashArray", [newSize / 25, 1]);

      if (object.type === "path")
        object.set("strokeDashArray", [newSize / 25, 1]);
    });

    canvas.renderAll(); // Re-render the canvas
  };

  // Check if the object type is image
  const isImage = () => {
    let isAllImage = true;

    selectedObjects.forEach((object) => {
      isAllImage = isAllImage && object.type === "image";
    });

    return isAllImage;
  };

  return (
    <div>
      {selectedObjects.length > 0 && !isImage() && (
        <div
          style={{
            backgroundColor: "rgb(245, 232, 219)", // Softer background color
            padding: "20px", // Add padding around the content
            borderRadius: "10px", // Rounded corners for a modern look
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "rgb(241, 142, 43)", // Neutral text color
            }}
          >
            Object Settings
          </h2>

          {/* Color Picker */}
          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="fillColor"
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgb(255, 178, 101)",
              }}
            >
              Fill Color
            </label>
            <ColorPicker
              id="fillColor"
              width={250}
              height={40}
              color={color}
              onChange={handleColorChange}
              hideAlpha
              hideInput={["rgb", "hsv", "hex"]}
            />
          </div>

          {/* Stroke Color Picker */}
          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="strokeColor"
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgb(255, 178, 101)",
              }}
            >
              Stroke Color
            </label>
            <ColorPicker
              id="strokeColor"
              width={250}
              height={40}
              color={strokeColor}
              onChange={handleStrokeColorChange}
              hideAlpha
              hideInput={["rgb", "hsv", "hex"]}
            />
          </div>

          {/* Stroke Size Slider */}
          <div style={{ marginBottom: "30px" }}>
            <label
              htmlFor="strokeSizeSlider"
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgb(255, 178, 101)",
              }}
            >
              Stroke Size: {strokeSize}
            </label>
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                background: rgb(255, 81, 0); /* Thumb color */
                border-radius: 50%;
                width: 18px;
                height: 18px;
              }
            `}</style>
            <input
              type="range"
              id="strokeSizeSlider"
              min="1"
              max="50"
              value={strokeSize}
              onChange={handleStrokeSizeChange}
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "5px",
                background: `linear-gradient(to right,rgb(252, 213, 166) 0%,rgb(249, 124, 0) ${
                  ((strokeSize - 1) / 49) * 100
                }%, #ccc ${((strokeSize - 1) / 49) * 100}%, #ccc 100%)`,
                outline: "none",
                appearance: "none",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Stroke Line Dash Slider */}
          <div>
            <label
              htmlFor="strokeLineDashSlider"
              style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgb(255, 178, 101)",
              }}
            >
              Stroke Line Dash: {strokeLineDash}
            </label>
            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                background: rgb(255, 81, 0); /* Thumb color */
                border-radius: 50%;
                width: 18px;
                height: 18px;
              }
            `}</style>
            <input
              type="range"
              id="strokeLineDashSlider"
              min="1"
              max="50"
              value={strokeLineDash}
              onChange={handleStrokeLineChange}
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "5px",
                background: `linear-gradient(to right,rgb(252, 213, 166) 0%,rgb(249, 124, 0) ${
                  ((strokeLineDash - 1) / 49) * 100
                }%, #ccc ${((strokeLineDash - 1) / 49) * 100}%, #ccc 100%)`,
                outline: "none",
                appearance: "none",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
