
import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" text-white flex flex-col justify-center items-center h-screen px-8 md:px-12 bg-[#10151f]">
        <h1 className="text-4xl text-center md:text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-indigo-500">ChatME Ai</span>
        </h1>
        <p className="text-lg text-gray-500 text-center mb-8 max-w-md">
          A smart AI chatbot built with Next.js and Gemini. <br /> Click below to begin chatting.
        </p>
        <div className="flex flex-row gap-5">
          <Link href="/chat" className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
            <Button text="Start Chat" />
          </Link>
          <Link href="/resume-reviewer" className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
            <Button text="Review Resume" />
          </Link>
        </div>

      </div>
    </>
  );
}
