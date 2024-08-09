import Chatbot from "@/components/ChatBot/chatbot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 h-[2000px]">
      <h1>Chatbot App</h1>

      <Chatbot />
    </main>
  );
}
