"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, Circle } from "fabric";
import DrawToolBar from "./DrawToolBar";
import "./drawing.css";
import Settings from "./Settings";

export const Drawing = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Keep the state of which tool we are choosing
  const [toolInUse, setToolInUse] = useState(2);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: canvasHeight || 500,
        width: canvasWidth || 500,
        backgroundColor: null,
      });

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
        fill: "#FF0000",
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
        fill: "#FF0000",
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
    <div className="flex-col items-center h-screen w-[100%]">
      {/* Display the toolbar */}
      <div className="flex mb-2">
        <div className="w-[20%]"></div>
        <DrawToolBar toolInUse={toolInUse} onToolChange={onToolChange} />
        <div className="w-[20%]"></div>
      </div>
      <canvas id="canvas" ref={canvasRef} />

      <Settings canvas={canvas} />
    </div>
  );
};
