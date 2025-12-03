"use client";

import { useState, useCallback } from "react";
import { ChatMessage } from "../types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (gender?: string) => {
      const trimmed = input.trim();
      if (!trimmed || isLoading) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: trimmed,
            history: messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            userGender: gender,
          }),
        });

        if (!res.body) {
          throw new Error("No response body");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

        const assistantId = crypto.randomUUID();
        let assistantContent = "";

        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "" },
        ]);

        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunk = value ? decoder.decode(value) : "";
          assistantContent += chunk;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: assistantContent } : m
            )
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  };
}
