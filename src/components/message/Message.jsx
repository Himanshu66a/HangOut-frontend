import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}