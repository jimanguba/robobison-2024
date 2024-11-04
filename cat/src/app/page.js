import Image from "next/image";
import catFace from  './images/DESIGN_catHead-removebg-preview.png';
//import catEars from  './images/DESIGN_catEar-removebg-preview.png'; 


export default function Home() {
  return (
    <div className="gradient-background">
      <h2 className="landing-page-message">Hello! Welcome to</h2>
      <Image className = "cat-image" src = {catFace} alt = "Cat face"></Image>
      <h1 className="landing-page-title">Cat app :p</h1>
    </div>

  );
}