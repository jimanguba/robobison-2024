import { IconButton } from "@mui/material";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxEraser } from "react-icons/rx";
import { TfiHandDrag } from "react-icons/tfi";
import { LuMousePointer } from "react-icons/lu";

const DrawToolBar = ({ toolInUse, setToolInUse }) => {
  const toolSize = 35;
  const hightlightColor = "rgb(211, 185, 163)";
  const toolColor = "rgb(194, 133, 92)";

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(214, 141, 82, 0.25)", // Soft background for better readability
        border: "2px solidrgb(254, 204, 170)", // Keeps the border prominent
        justifyContent: "space-around", // Ensures even spacing
        alignItems: "center", // Aligns items vertically
        borderRadius: "12px", // Slightly more rounded corners for a modern look
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        margin: "12px", // Adds some space around the toolbar
        width: "70%",
      }}
    >
      <IconButton
        sx={
          toolInUse == 1
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(1)}
      >
        <TfiHandDrag size={toolSize} color={toolColor} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 2
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(2)}
      >
        <LuMousePointer size={toolSize} color={toolColor} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 3
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(3)}
      >
        <LuRectangleHorizontal size={toolSize + 10} color={toolColor} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 4
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(4)}
      >
        <FaRegCircle size={toolSize} color={toolColor} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 5
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(5)}
      >
        <GoPencil size={toolSize} color={toolColor} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 6
            ? {
                backgroundColor: hightlightColor,
                "&:hover": {
                  backgroundColor: hightlightColor,
                },
              }
            : {}
        }
        onClick={() => setToolInUse(6)}
      >
        <RxEraser size={toolSize} color={toolColor} />
      </IconButton>
    </div>
  );
};

export default DrawToolBar;
