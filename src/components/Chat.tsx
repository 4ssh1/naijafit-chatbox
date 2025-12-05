"use client";
import { ChatMessage } from "../types/chat";

interface Props {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-1">
      {messages.map((m) => (
        <div
          key={m.id}
          className={
            m.role === "user"
              ? "self-end max-w-[80%] rounded-lg bg-emerald-600 px-3 py-2 text-sm"
              : "self-start max-w-[80%] rounded-lg bg-slate-800 px-3 py-2 text-sm"
          }
        >
          {m.content}
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-xs text-slate-400">
          Example: “I'm a female beginner, I want to lose belly fat with home workouts and Nigerian meals.”
        </p>
      )}
    </div>
  );
}
