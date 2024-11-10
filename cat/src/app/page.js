"use client";

import Image from "next/image";
import catFace from "./images/DESIGN_catHead-removebg-preview.png";

export default function Home() {
  return (
    <div className="gradient-background">
      <h2 className="landing-page-message">Welcome to</h2>

      {/* Cat image button */}
      <button
        className="cat-button"
        onClick={() => alert("Cat button clicked!")} //change the allert to going to the next page (log-in page)
      >
        <Image className="cat-image" src={catFace} alt="Cat face" />
      </button>

      <h1 className="landing-page-title">Pet Care App</h1>
    </div>
  );
}
