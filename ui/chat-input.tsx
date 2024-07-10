"use client";
import { ChangeEvent, FormEvent } from "react";

type ChatProps = {
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleSendMessage: () => void;
};

export default function ChatInput({ userMessage, setUserMessage, handleSendMessage }: ChatProps) {
  return (
    <div className=" bg-slate-950 p-3">
      <div className="flex space-x-2 items-center  bg-slate-600 mt-auto">
        <form onSubmit={handleSendMessage} className="flex items-center justify-center w-full space-x-2">
          <input
            value={userMessage}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserMessage(e.target.value)
            }
            type="text"
            placeholder="Type your message"
            className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
          />

          <button className="p-2  bg-white text-black inline-flex items-center justify-center rounded-md text-sm font-medium  disabled:pointer-events-none disabled:opacity-50  hover:bg-[#111827E6] h-10 px-4 py-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
