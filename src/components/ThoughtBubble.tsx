import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ThoughtBubbleProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ message, isVisible, onDismiss }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="absolute bottom-full right-0 mb-4 mr-2"
        >
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <button
              onClick={onDismiss}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-sm pr-6">{message}</p>
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThoughtBubble;