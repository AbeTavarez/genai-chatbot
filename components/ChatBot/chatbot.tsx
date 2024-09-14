"use client";
import { clsx } from "clsx";
import AIMessage from "@/components/ChatBot/ui/ai-message";
import UserMessage from "@/components/ChatBot/ui/user-message";
import ChatInput from "@/components/ChatBot/ui/chat-input";
import { TbMessageChatbot } from "react-icons/tb";
//============
import { FormEvent, useState, useRef, useEffect } from "react";
import { chatCompletion } from "@/actions";

// Message Type
export type Message = {
  content: string;
  role: "user" | "assistant" | "system";
  name?: string;
};

export default function Chatbot() {
  const chatContainerRef = useRef<HTMLDivElement | null>(null); // 1.
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello, how can i help you today?" },
  ]);

  // Scroll to the bottom when messages changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  /**
   * Send User messages
   * @param e
   * @returns
   */
  const handleSendMessage = async (e: FormEvent) => {
    try {
      e.preventDefault();

      // Log the user message
      console.log("User Message:", userMessage);

      if (!userMessage) return;

      // Create the new message object
      const newMessage: Message = { content: userMessage, role: "user" };
      console.log("New Message:", newMessage);

      // Update the messages state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Clear input and set loading
      setUserMessage("");
      setLoading(true);

      // create messages copy without the first message
      const chatMessages = messages.slice(1);
      console.log("CHAT Messages::: ", chatMessages);

      // Call the API function with the updated messages
      const res: Message = await chatCompletion([...chatMessages, newMessage]);
      console.log("API Response:", res);

      // TODO --> 8.
      // Handle the API response (example assuming the response structure)
      setMessages((prevMessages) => [...prevMessages, res]);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CHAT ICONS  */}
      <TbMessageChatbot
        size={64}
        onClick={() => setShowChat(!showChat)}
        className={clsx(
          "fixed right-12 bottom-[calc(1rem)] hover:cursor-pointer hover:text-blue-400",
          {
            'animate-bounce': !showChat
          },
        )}
      />

      {/* CHAT  */}
      {showChat && (
        <div className="fixed right-24 bottom-[calc(4rem+1.5rem)] hover:cursor-pointer border p-5 shadow-md shadow-white h-[474px] w-[500px] bg-[#1e1e1e] rounded-md">
          <div className="flex flex-col h-full">
            {/* CHAT HEADER */}
            <div>
              <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
              <p>Powered by OpenAI</p>
            </div>

            {/* CHAT CONTAINER  */}
            <div
              className="flex flex-col flex-1 items-center p-2 mt-5 overflow-y-auto"
              ref={chatContainerRef}
            >
              {messages &&
                messages.map((m, i) => {
                  return m.role === "assistant" ? (
                    <AIMessage {...m} key={i} />
                  ) : (
                    <UserMessage {...m} key={i} />
                  );
                })}

              {loading && (
                <div className="text-center text-gray-500 mt-2">
                  Waiting for a response...
                </div>
              )}
            </div>

            {/* INPUT FORM  */}
            <ChatInput
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </>
  );
}
