"use server";
import { Message } from "@/components/ChatBot/chatbot";
import OpenAI from "openai";
//TODO  --> 1. import modules
import { fetchFAQS } from "./mongodb-actions";
import { ObjectId } from "mongodb";

// === OPEN AI
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//TODO --> 2.5 type
interface FAQ {
  question: string;
  answer: string;
};

interface FAQDocument extends FAQ  {
  _id: ObjectId,
  faqs: [FAQ],
}

/**
 * Chat Completion
 * @param chatMessages
 * @param newMessage
 * @returns new message from assistant
 */
export async function chatCompletion(chatMessages: Message[]) {
  try {
    let doc: FAQDocument | null = await fetchFAQS();
    console.log(doc);

    if (!doc) {
      throw new Error("");
    }

    // TODO --> 3. check faqs for answer
    const faqAnswer = doc.faqs?.find((faq) =>
      chatMessages
        .at(-1)
        ?.content.toLowerCase()
        .includes(faq.question.toLowerCase()),
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
      ...doc.faqs.map((faq) => ({
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
