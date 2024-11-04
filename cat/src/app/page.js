import Image from "next/image";
import catEars from  './images/DESIGN_catHead-removebg-preview.png';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Cat app :p
      <Image src = {catEars} alt = "Cat ears"></Image>
    </div> 
  );
}
