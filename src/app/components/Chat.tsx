"use client";
import { useState, useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
import { Message, Gender } from "../lib/types";
import { getContextualResponse } from "../lib/response";
import { quickPrompts, welcomeMessage } from "../lib/consts";

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
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const currentInput = input;
    setInput("");

    try {
      const response = await fetch("/api/route", {
        method: "POST",
        body: JSON.stringify({
          prompt: currentInput,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      let fullText = "";

      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
        fullText += decoder.decode(value);
      }

      const result = getContextualResponse(fullText, gender);

      if (result.gender && result.gender !== gender) {
        setGender(result.gender); 
      }

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.text,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, something went wrong.",
          timestamp: Date.now(),
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
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
