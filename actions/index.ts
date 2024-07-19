"use server";
import { Message } from "@/components/chatbot";
import OpenAI from "openai";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Chat Completion
 * @param chatMessages 
 * @returns new message
 */
export async function chatCompletion(chatMessages: Message[]) {
  // create chat with prompt
  const chat = [
    { role: "system", content: "You're a helpful assistance" },
    ...chatMessages,
  ];

  // API Request
  const completion = await openAI.chat.completions.create({
    messages: chat,
    model: "gpt-3.5-turbo",
  });

  // completion result (new message)
  console.log(completion.choices[0]);
  return completion; // or return jys the result?
}
