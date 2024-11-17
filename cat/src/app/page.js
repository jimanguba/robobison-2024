"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import bgPinkLow from "./images/bg-pinkLow.webp";
import bgPinkMid from "./images/bg-pinkMid.webp";
import bgPinkHigh from "./images/bg-pinkHigh.webp";
import bgPurpleLow from "./images/bg-purpleLow.webp";
import bgPurpleMid from "./images/bg-purpleMid.webp";
import bgPurpleHigh from "./images/bg-purpleHigh.webp";

import catTail from "./images/CatTail.png";
import catFace1 from "./images/Cat-Mood1.png";
import catFace2 from "./images/Cat-Mood2.png";
import catFace3 from "./images/Cat-Mood3.png";
import catFace4 from "./images/Cat-Mood4.png";
import catFace5 from "./images/Cat-Mood5.png";

export function Cat({ mood }) {
  let catFace;
  let catTailAnimation;

  switch (mood) {
    case 1:
      catFace = catFace1;
      catTailAnimation = "animate-shake1";
      break;
    case 2:
      catFace = catFace2;
      catTailAnimation = "animate-shake2";
      break;
    case 3: //or put this to default whatever (neutral)
      catFace = catFace3;
      catTailAnimation = "animate-shake3";
      break;
    case 4:
      catFace = catFace4;
      catTailAnimation = "animate-shake4";
      break;
    case 5:
      catFace = catFace5;
      catTailAnimation = "animate-shake5";
      break;
  }

  return (
    <div className="relative w-auto h-auto">
      <Image
        className="animate-wiggle h-80 w-auto max-w-full relative z-10"
        src={catFace}
        alt="Cat face"
      />

      <Image
        className={`absolute w-96 h-auto bottom-0 left-20 z-0 ${catTailAnimation}`}
        src={catTail}
        alt="Cat tail"
      />
    </div>
  );
}

export function Background() {
  return (
    <div className="bg-baseBackground bg-cover min-h-screen absolute inset-0 z-0">
      <Image
        className="absolute bottom-0 left-0 w-[80%] h-[80%]"
        src={bgPinkLow}
        alt="BG Pink Low"
      />
      <Image
        className="absolute bottom-0 left-0 w-[80%] h-[80%]"
        src={bgPinkMid}
        alt="BG Pink Mid"
      />
      <Image
        className="absolute bottom-0 left-0 w-[80%] h-[80%]"
        src={bgPinkHigh}
        alt="BG Pink High"
      />

      <Image
        className="absolute top-0 right-0 w-[80%] h-[80%]"
        src={bgPurpleLow}
        alt="BG Purple Low"
      />
      <Image
        className="absolute top-0 right-0 w-[80%] h-[80%]"
        src={bgPurpleMid}
        alt="BG Purple Mid"
      />
      <Image
        className="absolute top-0 right-0 w-[80%] h-[80%]"
        src={bgPurpleHigh}
        alt="BG Purple High"
      />
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative z-10">
      <Background />
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen">
        <div className="relative">
          <h2 className="font-readyforfall absolute text-fontColMain opacity-60 z-20 -top-0 -left-0 rotate-[-25deg] text-center">
            meow
          </h2>
          <h2 className="font-readyforfall absolute text-fontColMain opacity-60 z-20 -bottom-0 -right-20 rotate-[25deg] text-center">
            meow
          </h2>
          <button
            className="transition-transform duration-500 transform hover:scale-105"
            onClick={() => router.push("/authentication/sign-up")}
          >
            <Cat mood={3} />
          </button>
        </div>
        <h1
          className="font-readyforfall text-7xl text-center text-fontColMain"
          style={{ textShadow: "2px 2px 4px rgba(121, 79, 44, 0.25)" }}
        >
          Sign Up
        </h1>
      </div>
    </div>
  );
}

//TODO fix the meow! to the side. Fix the font. Do something with the background and make it prettier. Decor: make some 'meow's appear on the screen at some places floating on screen (lower opacity)

//COMMENTS HERE ARE BY ASHLEY BCS SHE WAS LEARNING REACT ETC.

/**
 * [export default] Defines a React component : export (makes it importable to other files), default (makes this function the primary one. To other files, importing doesn't need to have the same name or using curly braces because this function is automatically what the code will look for)
 * [<button ...></button>] is actually a JSX element. In plain JS, you can't create <button> just like that because it doesn't contain the HTML syntax. Here, its possible even tho the ext name is .js and not .jsx because of the compiler (ex : Babel) BECAUSE of react
 * [z-] for layering
 */
