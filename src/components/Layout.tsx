"use client";

import ChatMessages from "./Chat";
import ChatInput from "./ChatInput";
import { useChat } from "../hooks/useChat";

export default function ChatLayout() {
  const { messages, input, setInput, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col gap-2">
      <ChatMessages messages={messages} />
      <ChatInput
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
}
