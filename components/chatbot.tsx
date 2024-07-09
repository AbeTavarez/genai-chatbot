"use client";
import AIMessage from "@/ui/ai-message";
import ChatInput from "@/ui/chat-input";
import UserMessage from "@/ui/user-message";
import { useState } from "react";
import { TbMessageChatbot } from "react-icons/tb";

export default function Chatbot() {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* CHAT ICONS  */}
      <TbMessageChatbot
        size={64}
        onClick={() => setShowChat(!showChat)}
        className="fixed right-24 bottom-[calc(1rem)]"
      />

      {/* CHAT  */}
      {!showChat && (
        <div className="fixed right-24 bottom-[calc(4rem+1.5rem)] hover:cursor-pointer border p-5 shadow-md shadow-white h-[474px]">
          <div className="flex flex-col h-full">
            {/* CHAT HEADER */}
            <div>
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
              <p>Powered by OpenAI</p>
            </div>

            {/* CHAT CONTAINER  */}
            <div className="flex flex-col flex-1 items-center justify-center p-2 mt-5  overflow-y-auto">
              <AIMessage />
              <UserMessage />
            </div>

            {/* INPUT FORM  */}
            <ChatInput />
          </div>
        </div>
      )}
    </>
  );
}
