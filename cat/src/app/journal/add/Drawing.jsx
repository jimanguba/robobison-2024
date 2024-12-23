"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, Circle } from "fabric";
import DrawToolBar from "./DrawToolBar";
import "./drawing.css";

export const Drawing = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Keep the state of which tool we are choosing
  const [toolInUse, setToolInUse] = useState(2);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: 500,
        widtbh: 500,
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);
    }
  }, []);

  // Add rectangle
  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 20,
        height: 20,
      });

      canvas.add(rect);
    }
  };

  // Add circle
  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        left: 100,
        top: 100,
        fill: "red",
        radius: 20,
      });

      canvas.add(circle);
    }
  };

  // Coordinate the drawing tool
  const onToolChange = (tool) => {
    setToolInUse(tool);

    // Trigger relevant canvas action based on the tool
    switch (tool) {
      case 3:
        addRectangle();
        break;
      case 4:
        addCircle();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Display the toolbar */}
      <DrawToolBar toolInUse={toolInUse} onToolChange={onToolChange} />
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};
