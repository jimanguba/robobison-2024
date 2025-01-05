"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, Rect, Circle, PencilBrush, FabricImage } from "fabric";
import DrawToolBar from "./DrawToolBar";
import { BsFillEraserFill } from "react-icons/bs";
import ReactDOMServer from "react-dom/server";
import "./drawing.css";
import DisplayStickers from "./DisplayStickers";
import { Box, Menu, Modal } from "@mui/material";
import * as fabric from "fabric";
import Settings from "./Settings";

export const Drawing = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const brush = new PencilBrush(canvas);
  const [isErasing, setIsErasing] = useState(false);
  const [stickerPicker, setStickerPicker] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // Keep the state of which tool we are choosing
  const [toolInUse, setToolInUse] = useState(2);

  useEffect(() => {
    if (canvasRef.current) {
      const initCanvas = new Canvas(canvasRef.current, {
        height: canvasHeight || 400,
        width: canvasWidth - 50 || 1000,
        backgroundColor: "transparent",
      });

      initCanvas.renderAll();
      setCanvas(initCanvas);

      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  // Activate the brushing mode
  const enablePenTool = () => {
    if (canvas) {
      canvas.isDrawingMode = true; // Enable freehand drawing mode
      brush.color = "rgba(255, 153, 0, 0.25)";
      brush.width = 4;
      canvas.freeDrawingBrush = brush;
    }
  };

  const disablePenTool = () => {
    if (canvas) {
      canvas.isDrawingMode = false; // Disable freehand drawing mode
    }
  };

  // Activate the Erasing mode
  const enableEraser = () => {
    if (canvas) {
      setIsErasing(true);

      // Convert the React Icon to an HTML string
      const iconHTML = ReactDOMServer.renderToStaticMarkup(
        <BsFillEraserFill size={20} color="black" />
      );

      // Convert the HTML string to a data URL for a cursor
      const svgBlob = new Blob([iconHTML], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);

      canvas.defaultCursor = `url(${svgUrl}) 16 16, auto`; // Set the cursor with an offset

      // Disable objects selection
      canvas.getObjects().forEach((obj) => {
        obj.selectable = false; // Disable selection for each object
        obj.lockMovementX = true;
        obj.lockMovementY = true;
        obj.hoverCursor = `url(${svgUrl}) 16 16, auto`; // Set hover cursor to move
      });
      canvas.renderAll(); // Refresh canvas to reflect changes

      canvas.on("mouse:over", (event) => {
        if (isErasing && event.e.altKey && event.target) {
          canvas.remove(event.target); // Remove the object on hover
          canvas.renderAll(); // Re-render the canvas
        }
      });
    }
  };

  const disableEraser = () => {
    setIsErasing(false);
    if (canvas) {
      canvas.off("mouse:over"); // Disable eraser functionality
      canvas.defaultCursor = "default";

      // Enable objects selection
      canvas.getObjects().forEach((obj) => {
        obj.selectable = true; // Disable selection for each object
        obj.lockMovementX = false;
        obj.lockMovementY = false;
        obj.hoverCursor = "default"; // Set hover cursor to move
      });
      canvas.renderAll(); // Refresh canvas to reflect changes
    }
  };

  // Add rectangle
  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "rgba(255, 115, 0, 0.25)",
        width: 50,
        height: 50,
        stroke: "black",
        strokeWidth: 1 / 25,
        strokeDashArray: [1, 1],
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
        radius: 40,
        stroke: "black",
        strokeWidth: 1 / 25,
      });

      canvas.add(circle);
    }
  };

  // Add image
  const addImage = (imageUrl) => {
    console.log(imageUrl);

    if (canvas) {
      fabric.FabricImage.fromURL(imageUrl).then((image) => {
        if (!image) {
          console.error("Image loading failed.");
          return;
        }

        image.scaleToWidth(100);
        image.scaleToHeight(100);

        image.set({
          left: 200,
          top: 200,
        });

        canvas.add(image);
      });
    }
  };

  // Coordinate the drawing tool
  const onToolChange = (tool) => {
    if (tool !== 5) {
      disablePenTool();
    }

    if (tool !== 6) {
      disableEraser();
    }

    if (tool !== 7) {
      setStickerPicker(false);
    }

    setToolInUse(tool);

    // Trigger relevant canvas action based on the tool
    switch (tool) {
      case 3:
        addRectangle();
        break;
      case 4:
        addCircle();
        break;
      case 5:
        enablePenTool();
        break;
      case 6:
        setIsErasing(true);
        enableEraser();
        break;
      case 7:
        setStickerPicker(true);

        break;
      default:
        break;
    }
  };

  return (
    <div className="flex relative h-[100%] w-full">
      {/* Settings (absolute) */}
      <div
        style={{
          position: "absolute",
          right: "-400px",
          top: "-100px",
          padding: "16px",
          margin: "16px",
          width: "30%",
        }}
      >
        <Settings canvas={canvas} />
      </div>

      {/* Drawing space (takes full width, Settings overlays it) */}
      <div className="flex flex-col items-center h-full w-full">
        {/* Toolbar */}
        <div
          className="flex justify-around items-center mb-2 w-full"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <DrawToolBar toolInUse={toolInUse} setToolInUse={onToolChange} />
        </div>

        {/* Canvas */}
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{
            border: "none", // No visible border
          }}
        />

        {/* Modal for sticker picker */}
        <Menu
          anchorEl={anchorEl}
          open={stickerPicker}
          onClose={() => {
            addImage(selectedSticker);
            setStickerPicker(false);
          }}
          PaperProps={{
            sx: {
              backgroundColor: "transparent", // Fully transparent background
              boxShadow: "none", // Remove shadow
              padding: 0, // Optional: Remove padding
            },
          }}
        >
          <DisplayStickers
            selectedSticker={selectedSticker}
            setSelectedSticker={setSelectedSticker}
          />
        </Menu>
      </div>
    </div>
  );
};
