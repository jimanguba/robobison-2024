import { IconButton } from "@mui/material";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { RxEraser } from "react-icons/rx";
import { TfiHandDrag } from "react-icons/tfi";
import { LuMousePointer } from "react-icons/lu";

const DrawToolBar = ({ toolInUse, onToolChange }) => {
  return (
    <div className="flex bg-[#D4BEAF] border-[#F6B489] p-1 w-[60%] justify-around rounded-sm">
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
        onClick={() => onToolChange(1)}
      >
        <TfiHandDrag size={30} />
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
        onClick={() => onToolChange(2)}
      >
        <LuMousePointer size={30} />
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
        onClick={() => onToolChange(3)}
      >
        <LuRectangleHorizontal size={40} />
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
        onClick={() => onToolChange(4)}
      >
        <FaRegCircle size={30} />
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
        onClick={() => onToolChange(5)}
      >
        <GoPencil size={25} />
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
        onClick={() => onToolChange(6)}
      >
        <RxEraser size={30} />
      </IconButton>
    </div>
  );
};

export default DrawToolBar;
