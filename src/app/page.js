
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" text-white flex flex-col justify-center items-center h-screen px-8 md:px-12 bg-[#10151f]">
        <h1 className="text-4xl text-center md:text-5xl font-extrabold text-white mb-6">
          Welcome to <span className="text-indigo-500">ChatME</span>
        </h1>
        <p className="text-lg text-gray-500 text-center mb-8 max-w-md">
          A smart AI chatbot built with Next.js and Gemini. <br /> Click below to begin chatting.
        </p>
        
        <Link href="/chat" className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] " />
          <span className="px-5 inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Start Chat
          </span>
        </Link>

      </div>
    </>
  );
}
