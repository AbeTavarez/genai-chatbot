import { CiUser } from "react-icons/ci";
import { Message } from "@/components/chatbot";

export default function UserMessage({ role, content }: Message) {
  return (
    <div id="user" className="flex min-w-96 my-2">
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
