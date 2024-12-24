import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

const Settings = ({ canvas }) => {
  const [selectedObject, setSelectObject] = useState(null); // Choose object to set the settings
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [diameter, setDiameter] = useState("");
  // const [color, setColor] = useState("");
  const [color, setColor] = useColor("rgb", { r: 86, g: 30, b: 203 });

  // COonvert Fill to rgb
  const hexToColorObject = (hex) => {
    // Helper function to convert hex to RGB
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return { r, g, b };
    };

    // Helper function to convert RGB to HSV
    const rgbToHsv = ({ r, g, b }) => {
      const rNorm = r / 255;
      const gNorm = g / 255;
      const bNorm = b / 255;

      const max = Math.max(rNorm, gNorm, bNorm);
      const min = Math.min(rNorm, gNorm, bNorm);
      const delta = max - min;

      let h = 0;
      if (delta !== 0) {
        if (max === rNorm) h = ((gNorm - bNorm) / delta) % 6;
        else if (max === gNorm) h = (bNorm - rNorm) / delta + 2;
        else h = (rNorm - gNorm) / delta + 4;
      }
      h = Math.round(h * 60);
      if (h < 0) h += 360;

      const s = max === 0 ? 0 : (delta / max) * 100;
      const v = max * 100;

      return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
    };

    const rgb = hexToRgb(hex);
    const hsv = rgbToHsv(rgb);

    return { hex, rgb, hsv };
  };

  useEffect(() => {
    if (canvas) {
      // Choose the object that just got created
      canvas.on("selection:created", (event) => {
        handleObjectSelection(event.selected[0]);
      });

      // Handle the changes we apply to the object
      canvas.on("selection:updated", (event) => {
        handleObjectSelection(event.selected[0]);
      });

      // Clear the selected object
      canvas.on("selection:cleared", () => {
        setSelectObject(null); // Stop selecting the object
        clearSettings(); // close the setting
      });

      // Handle the object modified
      canvas.on("object:modified", (event) => {
        handleObjectSelection(event.target);
      });

      // object scaling
      canvas.on("object:scaling", (event) => {
        handleObjectSelection(event.target);
      });
    }
  }, [canvas]);

  // Handle object selection
  const handleObjectSelection = (object) => {
    if (!object) return;

    // Choose the object
    setSelectObject(object);

    // Handle each type of object
    if (object.type === "rect") {
      setWidth(object.width * object.scaleX);
      setHeight(object.height * object.scaleY);
      console.log(hexToColorObject(object.fill || "#000000"));
      setColor(hexToColorObject(object.fill || "#000000"));
      setDiameter("");
    }

    if (object.type === "circle") {
      setDiameter(object.radius * object.scaleX * 2);
      setColor(hexToColorObject(object.fill || "#000000"));
      setHeight("");
      setWidth("");
    }

    if (object.type === "line") {
      setColor(hexToColorObject(object.stroke));
    }
  };

  // Clear the settings
  const clearSettings = () => {
    setWidth("");
    setHeight("");
    setDiameter("");
    setColor("");
  };

  //   Handle the change of width
  const handleColorChange = (event) => {
    setColor(event.target.value);

    selectedObject.set({ fill: event.target.value });
    canvas.renderAll();
  };

  return (
    <div className="bg-red-100">
      {selectedObject && selectedObject.type == "rect" && (
        <div>
          <ColorPicker color={color} onChange={setColor} />
        </div>
      )}
    </div>
  );
};

export default Settings;
