import { useState } from "react";

import { IconButton } from "@mui/material";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxEraser } from "react-icons/rx";
import { TfiHandDrag } from "react-icons/tfi";
import { LuMousePointer } from "react-icons/lu";

const DrawToolBar = ({ toolInUse, setToolInUse }) => {
  // Keep the state of which tool we are choosing
  //   const [toolInUse, setToolInUse] = useState(2);

  return (
    <div className="flex bg-[#D4BEAF] border-[#F6B489] p-2 justify-around rounded-sm">
      <IconButton
        sx={
          toolInUse == 1
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(1)}
      >
        <TfiHandDrag size={40} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 2
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(2)}
      >
        <LuMousePointer size={40} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 3
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(3)}
      >
        <LuRectangleHorizontal size={50} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 4
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(4)}
      >
        <FaRegCircle size={40} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 5
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(5)}
      >
        <GoPencil size={35} />
      </IconButton>

      <IconButton
        sx={
          toolInUse == 6
            ? {
                backgroundColor: "#C08F6F",
                "&:hover": {
                  backgroundColor: "#C08F6F",
                },
              }
            : {}
        }
        onClick={() => setToolInUse(6)}
      >
        <RxEraser size={40} />
      </IconButton>
    </div>
  );
};

export default DrawToolBar;
