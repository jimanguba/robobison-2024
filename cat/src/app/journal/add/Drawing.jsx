"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, Circle } from "fabric";
import DrawToolBar from "./DrawToolBar";
import "./drawing.css";

export const Drawing = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [toolInUse, setToolInUse] = useState(2);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: 400,
        width: 1000,
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  // Add rectangle
  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "rgba(255, 115, 0, 0.25)",
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
        fill: "rgba(253, 114, 0, 0.25)",
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
      <div className="flex justify-around items-center mb-2 w-[100%]">
        <DrawToolBar toolInUse={toolInUse} setToolInUse={onToolChange} />
      </div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};
