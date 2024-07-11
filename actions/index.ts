"use server";
import { Message } from "@/components/chatbot";
import OpenAI from "openai";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chatCompletion(messages: Message[]) {
    console.log(messages);
    
    const newMessages = messages.slice(1);
    console.log(newMessages);
  const chat = [
    { role: "system", content: "You're a helpful assistance" },
    ...newMessages,
  ];

  console.log(chat);

//   const completion = await openAI.chat.completions.create({
//     messages: chat,
//     model: "gpt-3.5-turbo",
//   });
//   console.log(completion.choices[0]);
//   return completion; // or return jys the result?
}
