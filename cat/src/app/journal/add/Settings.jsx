import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Settings = ({ canvas }) => {
  const [selectedObjects, setSelectedObjects] = useState([]); // Track multiple selected objects
  const [color, setColor] = useColor("#FF0000"); // Default color

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

  return (
    <div>
      {selectedObjects.length > 0 && (
        <div>
          <p>Selected Objects: {selectedObjects.length}</p>
          <ColorPicker
            color={color} // Current color for ColorPicker
            onChange={handleColorChange} // Handle color changes
          />
        </div>
      )}
    </div>
  );
};

export default Settings;
