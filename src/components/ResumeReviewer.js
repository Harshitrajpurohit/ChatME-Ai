"use client"
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FiCopy } from "react-icons/fi";
import Link from "next/link"
import { useRef, useEffect } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { IoCloudUploadOutline } from "react-icons/io5";

export default function ChatMessage() {
  const messagesEndRef = useRef(null);

  const [userMessage, setUserMessage] = useState("");
  const [pdf, setPdf] = useState("");
  const [parseData, setParseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [showCopy, setShowCopy] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);



  async function handleSubmit(e) {
    e.preventDefault();
    if (userMessage.trim() == "") return;

    const newUserMessage = {
      name: "you",
      message: userMessage.trim(),
      time: new Date().toLocaleTimeString(),
    };
    setChats((prevCharts) => [...prevCharts, newUserMessage]);
    setUserMessage("");

    setLoading(true);

    const apiResponse = await getResponse()

    const newBotMessage = {
      name: "bot",
      message: apiResponse,
      time: new Date().toLocaleTimeString(),
    };
    setChats((prevChats) => [...prevChats, newBotMessage]);
    setLoading(false);
    
  }

async function parsePDFData(pdfFile) {
  // Validate input
  if (!(pdfFile instanceof File)) {
    console.error("No valid PDF file provided");
    return { error: "Please provide a valid PDF file" };
  }

  try {
    const formData = new FormData();
    formData.append("file", pdfFile);

    const res = await fetch("/api/parsepdf", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    setParseData(data.text);

  } catch (error) {
    console.error("Error parsing PDF:", error.message);
    return { error: "Failed to parse PDF" };
  }
}

  async function getResponse() {
    const res = await fetch("/api/resumeResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: userMessage, parseData:parseData }),
    })
    const apiResponse = await res.json();
    return apiResponse.reply;
  }


  function handleCopy(chatCopy) {
    if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(chatCopy)
        .then(() => {
          console.log("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    } else {
      console.warn("Clipboard API is not supported in this environment.");
    }
  }

  const toast = useRef(null);

  const onUpload = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  return (
    <>
      <section className='bg-gray-500/10 w-full h-[calc(100vh-30px)] rounded-xl p-2'>
        <div className='h-full rounded-lg flex flex-col '>
          <div className="absolute ml-1 z-50 border border-gray-700 p-2 text-xl rounded bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-all duration-200" >
            <Link href="/" ><FaHome /></Link>
          </div>
          <div className='min-h-[calc(100vh-100px)] p-5 overflow-y-scroll custom-scrollbar'>
            {chats.length === 0 && (
              <div className="text-center text-gray-400 mt-8 text-lg">
                <h2 className="font-semibold">Start a new chat to begin the conversation</h2>
                <p className="text-sm mt-2">Type your message below.</p>
              </div>
            )}
            <ul>
              {chats.map((chat, index) => (
                <li key={index} className={`flex flex-col  ${chat.name === 'bot' ? 'items-start' : 'items-end'}`}>
                  <div className={`  bg-gray-800 rounded-xl px-2 py-1 my-2 w-fit max-w-[90%] md:max-w-[80%]
                `}>
                    <div className="relative group w-full md:text-lg text-white py-1 overflow-x-auto break-words"
                      onMouseEnter={() => setShowCopy(true)}
                      onMouseLeave={() => setShowCopy(false)}
                    >
                      {showCopy && <button
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white p-1 rounded hover:bg-gray-700 transition-opacity duration-200"
                        onClick={handleCopy(chat.message)}
                      >
                        <FiCopy className="w-5 h-5" />
                      </button>
                      }
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {chat.message}
                      </ReactMarkdown>
                    </div>

                    <p className="text-xs md:text-sm text-gray-500">{chat.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div ref={messagesEndRef} />
          </div>
          {/* search bar */}
          <div className="w-full px-2 md:px-5 min-w-[200px]">
            <div className="relative flex items-center justify-center mx-auto h-[50px]">
              
             { !parseData ?
              <div className={`bg-slate-800 rounded-xl `}>
                <label htmlFor="uploadFile1"
                  className="text-xl md:text-2xl flex bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 outline-none rounded-s-xl w-max cursor-pointer mx-auto">
                    <IoCloudUploadOutline />
                  <input type="file" id='uploadFile1' className="hidden" accept="application/pdf" onChange={(e)=> parsePDFData(e.target.files[0])} />
                </label>
              </div> :
              <div className={`bg-slate-800 rounded-xl `}>
                {/* <label htmlFor="uploadFile1"
                  className="text-sm md:text-md flex bg-gray-800 hover:bg-gray-700 text-white font-medium px-2 py-2.5 outline-none rounded-s-xl w-max cursor-pointer mx-auto">
                    Uploaded
                  </label> */}
              </div>
              }
              <input
                value={userMessage}
                className=" w-full md:w-2/3 bg-transparent placeholder:text-slate-500 text-white text-sm border-gray-600 pl-2 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-gray-400 border-2 hover:border-gray-400 shadow-sm focus:shadow"
                placeholder="UI Kits, Dashboards..."
                onChange={(e) => setUserMessage(e.target.value)}
                disabled={loading}
              />

              <button
                className="text-3xl text-white  rounded-e-xl bg-slate-800 py-1 px-4 border-2 border-transparent text-centertransition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={handleSubmit}
              >
                <IoMdSearch />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
