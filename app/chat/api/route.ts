export const dynamic = "force-dynamic"; // defaults to auto

import { Message } from "@/components/chatbot";
import OpenAI from "openai";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request, response: Response) {
  console.log(request.body);
  const { chatMessages } = request.body;

  if (!chatMessages) return response.json({ msg: "chat messages required" });

  const chat = [
    { role: "system", content: "You're a helpful assistance" },
    ...chatMessages,
  ];

  const completion = await openAI.chat.completions.create({
    messages: chat,
    model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0]);
  return completion; // or return jys the result?
}
