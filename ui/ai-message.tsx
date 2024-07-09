import { RiRobot3Line } from "react-icons/ri";

export default function AIMessage() {
  return (
    <div id="bot" className="flex min-w-96 my-2">
      <div className="flex justify-center p-1 w-8 h-8 border rounded-full bg-slate-600">
        <RiRobot3Line size={18} />
      </div>
      <div className="ml-2">
        <div>Bot</div>
        <p>Hello, how can i help you today?</p>
      </div>
    </div>
  );
}
