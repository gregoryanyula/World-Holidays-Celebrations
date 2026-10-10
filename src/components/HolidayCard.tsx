import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Share2, 
  Sparkles, 
  Heart, 
  Volume2, 
  BookOpen, 
  ChevronRight, 
  Check, 
  MapPin, 
  Utensils, 
  Download,
  Info
} from 'lucide-react';
import { Holiday, UserPreferences } from '../types';
import { CountdownTimer } from './CountdownTimer';
import confetti from 'canvas-confetti';

interface HolidayCardProps {
  holiday: Holiday;
  preferences: UserPreferences;
  onSelect: (holiday: Holiday) => void;
  onSyncGoogleCalendar: (holiday: Holiday) => void;
  onOpenShareModal: (holiday: Holiday) => void;
  onOpenAiDeepDive: (holiday: Holiday) => void;
  isBookmarked?: boolean;
  onToggleBookmark: (holidayId: string) => void;
  isSyncedToCalendar?: boolean;
}

export const HolidayCard: React.FC<HolidayCardProps> = ({
  holiday,
  preferences,
  onSelect,
  onSyncGoogleCalendar,
  onOpenShareModal,
  onOpenAiDeepDive,
  isBookmarked = false,
  onToggleBookmark,
  isSyncedToCalendar = false
}) => {
  const [speaking, setSpeaking] = useState(false);

  const triggerConfetti = (e: React.MouseEvent) => {
    e.stopPropagation();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleSpeakGreeting = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(holiday.greeting);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'cultural':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300/40';
      case 'religious':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300/40';
      case 'un_day':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300/40';
      case 'national':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/40';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300/40';
    }
  };

  return (
    <div 
      onClick={() => onSelect(holiday)}
      className="group relative bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:border-rose-300 dark:hover:border-rose-900/60 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Banner Image with Overlay */}
      <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={holiday.bannerUrl}
          alt={holiday.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${getCategoryBadgeClass(holiday.category)}`}>
            {holiday.category.replace('_', ' ')}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(holiday.id);
              }}
              title={isBookmarked ? 'Remove from favorites' : 'Save to my celebration list'}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition"
            >
              <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenShareModal(holiday);
              }}
              title="Share viral social poster & captions"
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Banner Details */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-stone-200 mb-1">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="font-medium truncate">{holiday.country}</span>
          </div>
          <h3 className="font-serif font-bold text-lg leading-snug line-clamp-1 drop-shadow-md">
            {holiday.name}
          </h3>
          {holiday.localName && (
            <p className="text-xs text-stone-300 font-mono tracking-wide truncate">
              {holiday.localName}
            </p>
          )}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Countdown display */}
        <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 font-medium mb-2">
            <span>Date: <strong className="text-stone-800 dark:text-stone-200">{holiday.date}</strong></span>
            <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Countdown</span>
          </div>
          <CountdownTimer targetDate={holiday.date} holidayName={holiday.name} size="sm" />
        </div>

        {/* Short Summary */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
          {holiday.description}
        </p>

        {/* Greeting with pronunciation audio */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs">
          <div className="truncate mr-2">
            <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-400 block">
              Greeting
            </span>
            <span className="font-medium text-stone-800 dark:text-stone-200 truncate block">
              {holiday.greeting}
            </span>
          </div>
          <button
            onClick={handleSpeakGreeting}
            title="Listen to native greeting"
            className="p-1.5 rounded-lg bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 hover:scale-105 transition"
          >
            <Volume2 className={`w-3.5 h-3.5 ${speaking ? 'animate-bounce text-rose-500' : ''}`} />
          </button>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2">
          {/* Google Calendar Sync */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSyncGoogleCalendar(holiday);
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              isSyncedToCalendar
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {isSyncedToCalendar ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Synced
              </>
            ) : (
              <>
                <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
                Sync Calendar
              </>
            )}
          </button>

          {/* AI Deep Dive */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenAiDeepDive(holiday);
            }}
            title="AI Cultural Intelligence"
            className="p-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/50 transition flex items-center gap-1 text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
