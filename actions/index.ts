"use server";
import { Message } from "@/components/ChatBot/chatbot";
import OpenAI from "openai";
//TODO  --> 1. import modules
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//TODO --> 2.5 type
type FAQ = {
  question: string;
  answer: string;
};

//TODO --> 2. Load json file
console.log('LOCATION:::', fileURLToPath(import.meta.url));

const rootDir = process.env.NODE_ENV === 'production' ? process.env.PWD : process.cwd();
console.log('ROOT_DIR_NAME', rootDir);

const filePath = path.resolve(rootDir!, "data", "faqs.json");
console.log('FILE_PATH', filePath);

const faqs: FAQ[] = JSON.parse(fs.readFileSync(filePath, "utf-8")).faqs;
// console.log(faqs);

/**
 * Chat Completion
 * @param chatMessages
 * @param newMessage
 * @returns new message from assistant
 */
export async function chatCompletion(chatMessages: Message[]) {
  try {
    // TODO --> 3. check faqs for answer
    const faqAnswer = faqs.find((faq) =>
      chatMessages.at(-1)?.content.toLowerCase().includes(faq.question.toLowerCase()),
    );

    //TODO ---> 4.
    if (faqAnswer) {
      console.log(faqAnswer);
      return { role: "assistant", content: faqAnswer.answer } as Message;
    }

    console.log(`Reaching out to OpenAI....`);
    

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
      messages: chat as OpenAI.ChatCompletionMessageParam[],
      model: "gpt-4o-mini",
      // stream: true
    });

    //TODO ---> 5 add check and wrap in try catch
    if (!completion) {
      throw new Error("Invalid response from OpenAI API");
    }

    //TODO ---> 6. Update return data
    const assistantMessage = completion.choices[0].message?.content;
    if (!assistantMessage) {
      throw new Error("No message content from OpenAI");
    }

    return { role: "assistant", content: assistantMessage } as Message;

  } catch (error) {
    console.log(error);
    //TODO --> 7.
    return {
      role: "assistant",
      content: "I'm sorry, something went wrong. Please try again later.",
    } as Message;
  }
}
