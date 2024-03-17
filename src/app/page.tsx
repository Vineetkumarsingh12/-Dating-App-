"use client";
import AppLayout from "@/components/AppLayout";
 function Home() {
  return (
<div className=" h-[calc(100vh-4rem)] bg-green-400 flex justify-center items-center  text-black">
Select a friend to chat with
</div>
  );
}
export default AppLayout()(Home);
