"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "fabric";

import "./drawing.css";

export const Drawing = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: 500,
        width: 500,
      });

      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();

      setCanvas(initCanvas);
    }
  }, []);

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} />
    </div>
  );
};
