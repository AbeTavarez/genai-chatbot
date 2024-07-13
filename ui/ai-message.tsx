import { RiRobot3Line } from "react-icons/ri";
import { Message } from "@/components/chatbot";

export default function AIMessage({ role, content }: Message) {
  return (
    <div id="bot" className="flex w-full my-2">
      <div className="flex justify-center p-1 w-8 h-8 border bg-slate-600 rounded-full">
        <RiRobot3Line size={18} />
      </div>
      <div className="ml-2">
        <div>{role}</div>
        <p>{content}</p>
      </div>
    </div>
  );
}
