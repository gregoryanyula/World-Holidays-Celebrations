import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MicOff, X, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { playAlertChime } from '../utils/notifications';

interface VoiceSearchInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  language?: string;
  className?: string;
}

export const VoiceSearchInput: React.FC<VoiceSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search 190+ world holidays, delicacies, traditions...",
  language = 'en',
  className = ''
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check Web Speech API availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSpeech = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      setSpeechSupported(hasSpeech);
    }
  }, []);

  const getLocaleCode = (lang: string): string => {
    switch (lang) {
      case 'es': return 'es-ES';
      case 'fr': return 'fr-FR';
      case 'de': return 'de-DE';
      case 'zh': return 'zh-CN';
      case 'ar': return 'ar-SA';
      case 'hi': return 'hi-IN';
      case 'ja': return 'ja-JP';
      case 'pt': return 'pt-BR';
      default: return 'en-US';
    }
  };

  const startListening = () => {
    setErrorMessage(null);

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSpeechSupported(false);
      setErrorMessage('Voice search is not supported in this browser. Try Chrome, Edge, or Safari.');
      return;
    }

    try {
      // Abort previous instance if any
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognitionClass();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getLocaleCode(language);
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        playAlertChime('countdown');
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        onChange(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech detected. Please speak closer to your microphone.');
        } else {
          setErrorMessage(`Voice search error (${event.error}). Try again.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        playAlertChime('success');
      };

      recognition.start();
    } catch (err: any) {
      console.error('Failed to initialize speech recognition', err);
      setErrorMessage('Could not activate microphone. Please check permissions.');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleClear = () => {
    onChange('');
    setTranscript('');
    setErrorMessage(null);
  };

  return (
    <div className={`relative flex-1 w-full ${className}`}>
      <div className="relative flex items-center">
        {/* Left Search Icon */}
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (errorMessage) setErrorMessage(null);
          }}
          placeholder={isListening ? "Listening... Speak your holiday search..." : placeholder}
          className={`w-full pl-10 pr-24 py-2.5 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 outline-none transition ${
            isListening
              ? 'bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500 ring-2 ring-rose-500/20'
              : 'bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:ring-2 focus:ring-rose-500'
          }`}
        />

        {/* Action Controls Right Container */}
        <div className="absolute right-2 flex items-center gap-1.5">
          {/* Clear Button */}
          {value && (
            <button
              onClick={handleClear}
              className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Voice Search Button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            className={`p-1.5 rounded-lg flex items-center gap-1 text-xs font-semibold transition ${
              isListening
                ? 'bg-rose-600 text-white shadow-md animate-pulse'
                : speechSupported
                ? 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 hover:text-rose-600'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-300 dark:text-stone-600 cursor-not-allowed'
            }`}
            title={
              !speechSupported 
                ? "Voice search is not supported in this browser" 
                : isListening 
                ? "Listening... Click to stop" 
                : "Search by voice (Web Speech API)"
            }
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Stop</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Voice</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Voice Transcription Banner / Feedback */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-stone-900 rounded-xl border border-rose-500/40 shadow-xl z-30 animate-in fade-in slide-in-from-top-2 duration-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
            <div>
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 block">
                {transcript ? `Hearing: "${transcript}"` : 'Listening... Speak a holiday name (e.g., "Diwali", "Eid", "Carnival")...'}
              </span>
              <span className="text-[10px] text-stone-400">
                Powered by Web Speech API • Automatic hands-free filter
              </span>
            </div>
          </div>

          <button
            onClick={stopListening}
            className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 text-rose-700 dark:text-rose-300 text-xs font-semibold"
          >
            Done
          </button>
        </div>
      )}

      {/* Error Message Tooltip if microphone was denied */}
      {errorMessage && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-2 z-20 shadow-md">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
