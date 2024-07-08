"use client";
import { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { RiRobot3Line } from "react-icons/ri";

export default function Chatbot() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TbMessageChatbot
        size={64}
        onClick={() => setShowModal(!showModal)}
        className="fixed right-24 bottom-[calc(1rem)]"
      />

      {!showModal && (
        <div className="fixed right-24 bottom-[calc(4rem+1.5rem)] hover:cursor-pointer border p-5 shadow-md shadow-white h-[474px]">
          <div className="flex flex-col">
            <div id="header">
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
              <p>Powered by OpenAI</p>
            </div>

            <div
              id="chat-container"
              className="flex flex-col items-center justify-center p-2 mt-5"
            >
              <div id="bot" className="flex min-w-96 my-2">
                <div className="flex justify-center p-1 w-8 h-8 border rounded-full">
                  <RiRobot3Line size={18} />
                </div>
                <div className="ml-2">
                  <div>Bot</div>
                  <p>Hello, how can i help you today?</p>
                </div>
              </div>

              <div id="user" className="flex min-w-96 my-2">
                <div className="flex justify-center p-1 w-8 h-8 border rounded-full">
                  <CiUser size={18} />
                </div>
                <div className="ml-2">
                  <div>You</div>
                  <p>I need help with my order</p>
                </div>
              </div>
            </div>

            <div className="justify-self-end">
              {/* INPUT FORM  */}
              <div className="flex space-x-2 items-center  bg-slate-600 mt-auto">
                <form className="flex items-center justify-center w-full space-x-2">
                  <input
                    type="text"
                    placeholder=" Type your message"
                    className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                  />

                  <button className="p-2  bg-white text-black inline-flex items-center justify-center rounded-md text-sm font-medium  disabled:pointer-events-none disabled:opacity-50  hover:bg-[#111827E6] h-10 px-4 py-2">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <div className="flex justify-end min-w-96">
                <div className="flex flex-col mr-2">
                  <div className="self-end">You</div>
                  <p>I need help with my order</p>
                </div>
                <div className="flex justify-center p-1 w-8 h-8 border rounded-full">
                <CiUser size={18} />
                </div>
              </div> */
}
