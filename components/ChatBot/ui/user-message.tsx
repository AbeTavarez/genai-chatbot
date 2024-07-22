import { CiUser } from "react-icons/ci";
import { Message } from "@/components/ChatBot/chatbot";

export default function UserMessage({ role, content }: Message) {
  return (
    <div className="flex w-full my-2">
      <div className="flex justify-center p-1 w-8 h-8 border rounded-full bg-slate-600">
        <CiUser size={18} />
      </div>
      <div className="ml-2">
        <div>{role}</div>
        <p>{content}</p>
      </div>
    </div>
  );
}
