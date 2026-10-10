import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  MapPin, 
  Brain, 
  Zap, 
  Send, 
  Loader2, 
  ExternalLink,
  BookOpen,
  Volume2,
  VolumeX,
  RotateCcw,
  Bot,
  User,
  Compass
} from 'lucide-react';
import { Holiday } from '../types';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  modelBadge?: string;
  groundingLinks?: Array<{ uri: string; title: string }>;
  timestamp: string;
}

interface AiInsightModalProps {
  holiday: Holiday;
  isOpen: boolean;
  onClose: () => void;
}

export const AiInsightModal: React.FC<AiInsightModalProps> = ({ holiday, isOpen, onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'fast' | 'thinking' | 'search' | 'maps'>('fast');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Initialize multi-turn conversation thread with an initial greeting from the Cultural Guide
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      role: 'model',
      text: `Hello! I am your WorldFest Cultural Heritage Guide. We are exploring **${holiday.name}** celebrated in **${holiday.country}**.\n\nAsk me anything about its historical genesis, sacred rituals, traditional attire, signature feast dishes, or where to experience it authentically!`,
      modelBadge: 'Gemini Cultural Guide',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string, overrideMode?: 'fast' | 'thinking' | 'search' | 'maps') => {
    const query = (textToSend || inputMessage).trim();
    if (!query || loading) return;

    const currentMode = overrideMode || mode;
    setInputMessage('');

    // Append user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Build history for backend
      const historyPayload = newMessages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyPayload,
          holidayName: holiday.name,
          country: holiday.country,
          mode: currentMode
        })
      });

      const data = await res.json();

      let groundingChunks: Array<{ uri: string; title: string }> = [];
      if (data.groundingMetadata?.groundingChunks) {
        groundingChunks = data.groundingMetadata.groundingChunks
          .filter((c: any) => c.web?.uri)
          .map((c: any) => ({ uri: c.web.uri, title: c.web.title || c.web.uri }));
      }

      let badge = 'Gemini 3.1 Flash-Lite';
      if (currentMode === 'thinking') badge = 'Gemini 3.1 Pro (Deep Thinking: HIGH)';
      else if (currentMode === 'search') badge = 'Gemini 3.5 Flash (Google Search Grounded)';
      else if (currentMode === 'maps') badge = 'Gemini 3.5 Flash (Google Maps Grounded)';

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'Thank you for your question. What other aspect of this festival would you like to explore?',
        modelBadge: badge,
        groundingLinks: groundingChunks.length > 0 ? groundingChunks : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const fallbackMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `Network status note: ${err.message}. Showing local verified archives: ${holiday.name} (${holiday.localName || ''}) in ${holiday.country}. Key traditions include: ${holiday.traditions.join(', ')}.`,
        modelBadge: 'Offline Cultural Archive',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingId(msgId);
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: `Conversation restarted! Exploring **${holiday.name}** in **${holiday.country}**. How may I guide your cultural exploration?`,
        modelBadge: 'Gemini Cultural Guide',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[750px]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50/70 dark:bg-stone-900/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-black text-stone-900 dark:text-white text-base sm:text-lg">
                  Gemini Cultural Guide
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-300/40">
                  Multi-Turn
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Exploring <strong className="text-stone-800 dark:text-stone-200">{holiday.name}</strong> · {holiday.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
              title="Close Guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intelligence Role / Mode Selector Bar */}
        <div className="px-3 sm:px-4 py-2 bg-stone-100/80 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setMode('fast')}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              mode === 'fast'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Fast (Flash-Lite)</span>
          </button>

          <button
            onClick={() => setMode('thinking')}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              mode === 'thinking'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-purple-500" />
            <span>Deep Thinking (Pro)</span>
          </button>

          <button
            onClick={() => setMode('search')}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              mode === 'search'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span>Search Grounding (3.5)</span>
          </button>

          <button
            onClick={() => setMode('maps')}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer ${
              mode === 'maps'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-500" />
            <span>Maps Grounding (3.5)</span>
          </button>
        </div>

        {/* Scrollable Chat Messages Thread */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 space-y-2 shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-br-none'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-white rounded-bl-none border border-stone-200 dark:border-stone-700/60'
                  }`}
                >
                  {/* Badge & Audio Trigger */}
                  {!isUser && (
                    <div className="flex items-center justify-between text-[11px] pb-1 border-b border-stone-200/60 dark:border-stone-700/60 font-mono text-stone-500 dark:text-stone-400">
                      <span>{msg.modelBadge || 'Gemini Cultural Guide'}</span>
                      <button
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className="p-1 hover:text-stone-800 dark:hover:text-stone-200 rounded transition cursor-pointer"
                        title="Read aloud"
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {/* Message Body */}
                  <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                    {msg.text}
                  </div>

                  {/* Grounding Source Links if available */}
                  {msg.groundingLinks && msg.groundingLinks.length > 0 && (
                    <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 space-y-1">
                      <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                        Verified Grounding Sources:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.groundingLinks.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.uri}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 text-[11px] text-stone-700 dark:text-stone-300 hover:text-rose-500 border border-stone-200 dark:border-stone-700 truncate max-w-[220px]"
                          >
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            <span className="truncate">{link.title || link.uri}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`text-[10px] text-right ${isUser ? 'text-rose-100' : 'text-stone-400'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700/60 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                <span>
                  {mode === 'thinking' ? 'Gemini 3.1 Pro is performing deep anthropological analysis...' : 'Consulting cultural archives and grounding data...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto">
          {[
            'Historical genesis & roots',
            'Signature feast delicacies',
            'Traditional attire & etiquette',
            'Best local spots to celebrate'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={loading}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-rose-400 text-stone-600 dark:text-stone-300 text-[11px] font-medium whitespace-nowrap transition cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Bottom Input Field */}
        <div className="p-3 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask Gemini about ${holiday.name}...`}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-transparent focus:border-rose-500 focus:bg-white dark:focus:bg-stone-900 text-xs sm:text-sm text-stone-900 dark:text-white outline-none transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="p-2.5 sm:px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-rose-500/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
