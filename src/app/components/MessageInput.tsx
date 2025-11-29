import { Send } from "lucide-react";
import { MessageProps } from "../lib/types";

function MessageInput({input, handleChange, handleSend, isLoading, handleKeyPress}:MessageProps) {
  return (
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyUp ={handleKeyPress}
            placeholder="Ask about workouts, meals, form, alternatives..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-black"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-linear-to-r from-green-600 to-orange-500 text-white rounded-full p-3 hover:from-green-700 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
  )
}

export default MessageInput