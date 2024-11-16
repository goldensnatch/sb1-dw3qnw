import React from 'react';
import { motion } from 'framer-motion';
import { X, Send } from 'lucide-react';

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
    >
      <div className="bg-green-600 p-4 flex justify-between items-center">
        <h3 className="text-white font-semibold">Landscape Assistant</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex items-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm">
                Howdy! I'm here to help with your landscaping project. What can I assist you with today?
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t p-4">
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;