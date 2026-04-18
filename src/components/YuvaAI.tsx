import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { getYuvaResponse } from '../lib/gemini';
import { cn } from '../lib/utils';

const YuvaAI: React.FC = () => {
  const { lang, t, user } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pre-load voices
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    if (messages.length === 0) {
      setMessages([{ role: 'bot', text: t('welcome_msg') }]);
    }
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    
    // Stop any current speaking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Attempt to find a "brilliant" female voice
    let selectedVoice = null;
    
    if (lang === 'en') {
      // Priority: Google UK English Female, Samantha, Google US English, any English Female
      selectedVoice = voices.find(v => v.name === 'Google UK English Female') ||
                      voices.find(v => v.name === 'Samantha') ||
                      voices.find(v => v.name.includes('Female') && v.lang.startsWith('en')) ||
                      voices.find(v => v.lang.startsWith('en'));
    } else {
      // Find voice for specific language
      selectedVoice = voices.find(v => v.lang.startsWith(lang) && v.name.includes('Female')) ||
                      voices.find(v => v.lang.startsWith(lang));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.pitch = 1.1;
    utterance.rate = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsTyping(true);
    const response = await getYuvaResponse(userMsg, lang, user);
    setIsTyping(false);
    
    setMessages(prev => [...prev, { role: 'bot', text: response }]);
    speak(response);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-96 bg-[var(--bg-app)] border-3 border-[var(--border-app)] shadow-[6px_6px_0px_0px_var(--border-app)] rounded-lg flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[var(--border-app)] p-3 flex justify-between items-center text-white dark:bg-transparent dark:border-b-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-white flex items-center justify-center text-white font-retro text-[8px]">
                  Y
                </div>
                <span className="font-retro text-[9px] tracking-tighter">YuvaAI</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={cn("transition-colors", voiceEnabled ? "text-white" : "text-white/30")}
                  title={voiceEnabled ? "Mute Voice" : "Unmute Voice"}
                >
                  <Volume2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform text-white"><X size={18} /></button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="h-96 overflow-y-auto p-4 space-y-4 bg-transparent"
            >
              {messages.map((m, i) => (
                <div key={i} className={cn("flex flex-col", m.role === 'user' ? "items-end" : "items-start")}>
                  <div className="font-retro text-[6px] opacity-40 mb-1">
                    {m.role === 'user' ? user?.name : 'YuvaAI'}
                  </div>
                  <div className={cn(
                    "max-w-[85%] p-3 border-2 font-sans font-bold text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "border-[var(--accent-app)] text-[var(--accent-app)] bg-[var(--accent-app)] bg-opacity-5" 
                      : "border-[var(--border-app)] bg-black/5"
                  )}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="border-2 border-dashed border-[var(--border-app)] p-2 animate-pulse font-retro text-[7px]">
                  Scanning...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t-2 border-[var(--border-app)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Entry cmd..."
              className="flex-1 bg-transparent border-2 border-[var(--border-app)] p-3 outline-none font-sans font-bold text-xs focus:border-[var(--accent-app)]"
            />
            <button 
              onClick={handleSend}
              className="retro-button p-2"
            >
              <Send size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <motion.button
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setIsOpen(!isOpen)}
      className="group relative w-20 h-20 bg-transparent rounded-none flex items-center justify-center text-[var(--accent-app)] border-4 border-[var(--accent-app)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_var(--neon-red)] transition-all overflow-hidden"
    >
      {isSpeaking && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 bg-[var(--accent-app)] rounded-full blur-xl"
        />
      )}
      <div className="absolute inset-0 bg-[var(--accent-app)] opacity-0 group-hover:opacity-10"></div>
      <MessageSquare size={36} />
      <span className="absolute -top-14 right-0 bg-black text-white text-[8px] font-retro px-4 py-2 border-4 border-[var(--border-app)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
        {t('ask_yuva')}
      </span>
      </motion.button>
    </div>
  );
};

export default YuvaAI;
