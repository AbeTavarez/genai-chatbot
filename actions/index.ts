"use server";
import { Message } from "@/components/chatbot";
import OpenAI from "openai";
//  --> 1. import modules
import fs from "fs";
import path from "path";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// --> 2.5 type
type FAQ = {
  question: string;
  answer: string;
};

// --> 2. Load json file
const filePath = path.resolve(process.cwd(), "data", "faqs.json");
const faqs: FAQ[] = JSON.parse(fs.readFileSync(filePath, "utf-8")).faqs;
// console.log(faqs);

/**
 * Chat Completion
 * @param chatMessages
 * @param newMessage
 * @returns new message from assistant
 */
export async function chatCompletion(
  chatMessages: Message[],
  newMessage: Message,
) {
  // --> 3. check faqs for answer
  const faqAnswer = faqs.find((faq) =>
    newMessage.content.toLowerCase().includes(faq.question.toLowerCase()),
  );

  // -- 4.
  if (faqAnswer) {
    console.log(faqAnswer);

    return { role: "assistant", content: faqAnswer.answer };
  }

  // create chat with prompt
  const chat = [
    { role: "system", content: "You're a helpful assistance" },
    ...faqs.map((faq) => ({
      role: "system",
      content: `Q: ${faq.question}\nA: ${faq.answer}`,
    })),
    ...chatMessages,
  ];

  // API Request
  const completion = await openAI.chat.completions.create({
    messages: chat,
    model: "gpt-4o-mini",
    // stream: true
  });

  // completion result (new message)
  console.log(completion.choices[0]);
  return completion; // or return jys the result?
}
