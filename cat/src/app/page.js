import Image from "next/image";
import AddNotificationForm from "./components/AddNotificationForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F6E9E0]">
      Cat app :p
      <AddNotificationForm />
    </div>
  );
}
