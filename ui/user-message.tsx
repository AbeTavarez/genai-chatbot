import { CiUser } from "react-icons/ci";
export default function UserMessage() {
  return (
    <div id="user" className="flex min-w-96 my-2">
      <div className="flex justify-center p-1 w-8 h-8 border rounded-full bg-slate-600">
        <CiUser size={18} />
      </div>
      <div className="ml-2">
        <div>You</div>
        <p>I need help with my order</p>
      </div>
    </div>
  );
}
