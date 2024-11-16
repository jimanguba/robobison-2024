"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";

import catFace from "./images/Cat.png";

import bgPinkLow from "./images/bg-pinkLow.webp";
import bgPinkMid from "./images/bg-pinkMid.webp";
import bgPinkHigh from "./images/bg-pinkHigh.webp";
import bgPurpleLow from "./images/bg-purpleLow.webp";
import bgPurpleMid from "./images/bg-purpleMid.webp";
import bgPurpleHigh from "./images/bg-purpleHigh.webp";

function Cat() {
  return (
    <div>
      <Image
        className="animate-wiggle w-96 h-auto max-w-full"
        src={catFace}
        alt="Cat face"
      />
    </div>
  );
}

function Background() {
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
    <div className="relative z-1">
      <Background />
      <div className="relative z-2 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-center">meow!</h2>
        <button
          className="transition-transform duration-500 transform hover:scale-105"
          onClick={() => router.push("/sign-up")}
        >
          <Cat />
        </button>
        <h1 className="landing-page-title">CAT JOURNAL</h1>
      </div>
    </div>
  );
}

//COMMENTS HERE ARE BY ASHLEY BCS SHE WAS LEARNING REACT ETC.

/**
 * [export default] Defines a React component : export (makes it importable to other files), default (makes this function the primary one. To other files, importing doesn't need to have the same name or using curly braces because this function is automatically what the code will look for)
 * [<button ...></button>] is actually a JSX element. In plain JS, you can't create <button> just like that because it doesn't contain the HTML syntax. Here, its possible even tho the ext name is .js and not .jsx because of the compiler (ex : Babel) BECAUSE of react
 * [z-] for layering
 */
