import React, { useState } from 'react';
import { 
  X, 
  Globe2, 
  Calendar as CalendarIcon, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to WorldFest',
      subtitle: 'Global Holidays & Special Days Encyclopedia',
      desc: 'Explore the vibrant tapestry of traditions, sacred festivals, and UN observances celebrated across 190+ countries worldwide with real-time countdowns.',
      icon: Globe2,
      badge: 'Step 1 of 4'
    },
    {
      title: 'Personalized Calendar & Countdown Timers',
      subtitle: 'Never miss a cultural moment',
      desc: 'Sync global holidays directly into your Google Calendar or add them to your private watchlist with synchronized countdowns.',
      icon: CalendarIcon,
      badge: 'Step 2 of 4'
    },
    {
      title: 'Viral Social Posters & Community Stories',
      subtitle: 'Share greetings and traditions',
      desc: 'Generate viral aesthetic greeting posters for Instagram, LinkedIn, and X, or read authentic culinary traditions from the global community.',
      icon: Share2,
      badge: 'Step 3 of 4'
    },
    {
      title: 'Zero-Trust E2EE & Gemini Intelligence',
      subtitle: 'Privacy first, grounded in truth',
      desc: 'Ask Gemini 3.1 Pro (Deep Thinking) or Gemini 3.5 Flash (Search & Maps grounded) for respectful cultural insights, all backed by AES-GCM client encryption.',
      icon: ShieldCheck,
      badge: 'Step 4 of 4'
    }
  ];

  const current = steps[step];
  const IconComponent = current.icon;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      confetti({ particleCount: 50, spread: 70 });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/50">
            {current.badge}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center space-y-3 py-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
            <IconComponent className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-rose-600 dark:text-rose-400">
            {current.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-md mx-auto">
            {current.desc}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'w-6 bg-rose-500' : 'w-2 bg-stone-200 dark:bg-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1 hover:bg-stone-200 dark:hover:bg-stone-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition shadow-md shadow-rose-500/20"
          >
            <span>{step === steps.length - 1 ? 'Start Celebrating!' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
