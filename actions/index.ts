'use server';
import OpenAI from "openai";

// === OPEN AI
const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export async function chatCompletion(messages) {
    const completion = await openAI.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo'
    })
    console.log(completion.choices[0]);
    
}