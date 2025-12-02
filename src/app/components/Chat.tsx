"use client";

import { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { Message, Gender } from "../lib/types";
import { getContextualResponse } from "../lib/response";
import { Gender, Message } from "../lib/types";
import MessageInput from "./MessageInput";
import { defaultResponses, quickPrompts, welcomeMessage } from "../lib/consts";
import { WorkOut, Food } from "../lib/types";
import workouts from "../data/workout.json";
import foods from "../data/foods.json";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [gender, setGender] = useState<Gender | undefined>(undefined);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
  useEffect(() => {
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const result = getContextualResponse(
      input,
      gender,
      (workouts as { workouts: WorkOut[] }).workouts,
      (foods as { foods: Food[] }).foods,
      
    );

    if (result.gender) {
      setGender(result.gender);
    }

    const botMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: result.text,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 600);

    setInput("");
  };

  return (
    <div className="flex flex-col min-h-[87vh]">

     <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gray-50">

        {messages.length === 1 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInput(prompt)}
                className="px-4 py-2 bg-white border rounded-full text-slate-400 shadow-sm text-sm hover:bg-gray-100 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm ${
              msg.role === "user"
                ? "ml-auto bg-green-600 text-white"
                : "mr-auto bg-white text-gray-900 border"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {isLoading && (
          <div className="mr-auto bg-white border p-3 rounded-xl text-sm shadow-sm">
            <span className="animate-pulse">Typing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="border-t bg-white p-4">
        <MessageInput
          input={input}
          handleChange={handleChange}
          handleSend={handleSend}
          isLoading={isLoading}
          handleKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default Chat;
export default Chat;
