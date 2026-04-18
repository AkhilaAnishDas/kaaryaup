import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RefreshCw, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const MOTIVATIONAL_QUOTES = [
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "Dr. APJ Abdul Kalam" },
  { text: "Don't just climb the ladder of success - a ladder that has its roots in our soil.", author: "Ratan Tata" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg (Global Context)" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "Efficiency is doing things right; effectiveness is doing the right things.", author: "Management Legend" }
];

const MemoryGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const icons = ['💻', '🎨', '🚀', '🔥', '💎', '📈'];
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = [...icons, ...icons]
      .sort(() => Math.random() - 0.5)
      .map((icon, id) => ({ id, icon }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      if (cards[flipped[0]].icon === cards[flipped[1]].icon) {
        setSolved([...solved, ...flipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped]);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      onComplete();
    }
  }, [solved]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-xl retro-border">
      {cards.map((card, i) => (
        <button
          key={i}
          onClick={() => flipped.length < 2 && !flipped.includes(i) && !solved.includes(i) && setFlipped([...flipped, i])}
          className={cn(
            "w-16 h-16 text-2xl flex items-center justify-center transition-all duration-300 border-4 border-[var(--border-app)]",
            flipped.includes(i) || solved.includes(i) ? "bg-white text-black bg-opacity-100" : "bg-[var(--accent-app)]"
          )}
        >
          {flipped.includes(i) || solved.includes(i) ? card.icon : '?'}
        </button>
      ))}
    </div>
  );
};

export const MotivationModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-90"
        >
          <motion.div 
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-lg bg-[var(--bg-app)] border-8 border-[var(--border-app)] p-10 text-center relative"
          >
            <div className="absolute top-4 right-4 text-yellow-400">
              <Trophy size={48} />
            </div>
            
            <h2 className="font-retro text-3xl mb-6 text-[var(--accent-app)] uppercase">MISSION ACCOMPLISHED!</h2>
            
            <div className="mb-8 space-y-4">
              <p className="text-2xl font-display font-medium italic">"{quote.text}"</p>
              <p className="font-retro text-sm opacity-60">— {quote.author}</p>
            </div>

            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="font-retro text-2xl text-green-500">+100</div>
                <div className="font-display font-bold text-xs uppercase opacity-60">XP Gained</div>
              </div>
              <div className="text-center">
                <div className="font-retro text-2xl text-yellow-500">LVL UP!</div>
                <div className="font-display font-bold text-xs uppercase opacity-60">Status</div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full retro-button bg-[var(--accent-app)] text-white py-4 text-xl"
            >
              CONTINUE JOURNEY
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { cn } from '../lib/utils';
export default MemoryGame;
