import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Volume2, 
  Share2, 
  Sparkles, 
  Check, 
  Heart, 
  Utensils, 
  BookOpen, 
  ShieldCheck, 
  Globe2,
  ExternalLink,
  ChefHat,
  Printer,
  Download
} from 'lucide-react';
import { Holiday, UserPreferences, Recipe } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { SocialShareWidget } from './SocialShareWidget';
import { HolidayWeatherWidget } from './HolidayWeatherWidget';
import { GiftGuide } from './GiftGuide';
import { downloadIcsFile } from '../utils/calendar';
import { Gift, BookOpen as BookIcon, Radio, Brain, HelpCircle, Shirt, Compass } from 'lucide-react';
import { AtmosphericSoundPlayer } from './AtmosphericSoundPlayer';
import { HolidayCelebrationMap } from './HolidayCelebrationMap';
import { TraditionalAttireSection } from './TraditionalAttireSection';
import { ReactThreeFiberWebAR } from './ReactThreeFiberWebAR';
import confetti from 'canvas-confetti';

interface HolidayDetailModalProps {
  holiday: Holiday;
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  recipes?: Recipe[];
  onOpenRecipe?: (recipe: Recipe) => void;
  onSyncGoogleCalendar: (holiday: Holiday) => void;
  onOpenShareModal: (holiday: Holiday) => void;
  onOpenAiDeepDive: (holiday: Holiday) => void;
  isBookmarked: boolean;
  onToggleBookmark: (holidayId: string) => void;
  isSyncedToCalendar: boolean;
  onOpenQuiz?: (holiday: Holiday) => void;
  onRentDecor?: (holiday: Holiday) => void;
}

export const HolidayDetailModal: React.FC<HolidayDetailModalProps> = ({
  holiday,
  isOpen,
  onClose,
  preferences,
  recipes = [],
  onOpenRecipe,
  onSyncGoogleCalendar,
  onOpenShareModal,
  onOpenAiDeepDive,
  isBookmarked,
  onToggleBookmark,
  isSyncedToCalendar,
  onOpenQuiz,
  onRentDecor
}) => {
  const [speaking, setSpeaking] = useState(false);
  const [icsExported, setIcsExported] = useState(false);
  const [isWebAROpen, setIsWebAROpen] = useState(false);
  const [modalTab, setModalTab] = useState<'traditions' | 'attire' | 'gift_guide' | 'delicacies'>('traditions');

  // Swipe-to-dismiss state on mobile
  const [dragOffsetY, setDragOffsetY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const touchStartYRef = React.useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartYRef.current;
    if (diff > 0) {
      setDragOffsetY(diff * 0.75);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffsetY > 110) {
      onClose();
    }
    setDragOffsetY(0);
    setIsDragging(false);
  };

  if (!isOpen) return null;

  const holidayRecipes = recipes.filter(r => r.holidayId === holiday.id);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(holiday.greeting);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNativeIcsExport = () => {
    downloadIcsFile(holiday, 1);
    setIcsExported(true);
    confetti({ particleCount: 25, spread: 50 });
    setTimeout(() => setIcsExported(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateY(${dragOffsetY}px)`,
          opacity: 1 - Math.min(0.5, dragOffsetY / 300),
          transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease'
        }}
        className="bg-white dark:bg-stone-900 w-full max-w-3xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] relative"
      >
        {/* Mobile Swipe-to-Dismiss Pull Indicator Handle */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center cursor-grab active:cursor-grabbing sm:hidden pointer-events-none">
          <div className="w-12 h-1.5 bg-white/70 rounded-full shadow-sm" />
        </div>

        {/* Banner with Hero Imagery */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
          <img
            src={holiday.bannerUrl}
            alt={holiday.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

          {/* Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/20">
              {holiday.category.replace('_', ' ')}
            </span>
            <div className="flex items-center gap-2">
              {/* WebAR Festive View Button */}
              <button
                onClick={() => setIsWebAROpen(true)}
                className="px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md border border-cyan-400/40 shadow-sm transition"
                title="Place 3D Festive Decor in WebAR"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-200 animate-spin-slow" />
                <span>WebAR 3D</span>
              </button>

              <button
                onClick={() => onToggleBookmark(holiday.id)}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur transition"
              >
                <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Banner bottom title */}
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-200">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{holiday.country}</span>
              <span className="text-stone-400">•</span>
              <CalendarIcon className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-semibold">{holiday.date}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight drop-shadow-md">
              {holiday.name}
            </h2>
            {holiday.localName && (
              <p className="text-xs sm:text-sm text-stone-300 font-mono italic">
                {holiday.localName}
              </p>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6">
          {/* Navigation Tabs for Overview, Attire, Gift Guide, and Feasts */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setModalTab('traditions')}
              className={`flex-1 min-w-[125px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                modalTab === 'traditions'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <BookIcon className="w-3.5 h-3.5 text-rose-500" />
              <span>Lore & Traditions</span>
            </button>
            <button
              onClick={() => setModalTab('attire')}
              className={`flex-1 min-w-[125px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                modalTab === 'attire'
                  ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Shirt className="w-3.5 h-3.5 text-rose-500" />
              <span>Attire & Dress</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-300/40">
                AI
              </span>
            </button>
            <button
              onClick={() => setModalTab('gift_guide')}
              className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                modalTab === 'gift_guide'
                  ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Gift Guide</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/40">
                AI
              </span>
            </button>
            <button
              onClick={() => setModalTab('delicacies')}
              className={`flex-1 min-w-[110px] py-2 px-2.5 rounded-xl flex items-center justify-center gap-1.5 transition ${
                modalTab === 'delicacies'
                  ? 'bg-white dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-emerald-500" />
              <span>Feasts & Food</span>
            </button>
          </div>

          {modalTab === 'attire' && (
            <TraditionalAttireSection holiday={holiday} />
          )}

          {modalTab === 'gift_guide' && (
            <GiftGuide holiday={holiday} />
          )}

          {modalTab === 'delicacies' && (
            <div className="space-y-5">
              {/* Culinary Delicacies & Curated Recipes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-emerald-500" />
                    Festive Delicacies & Signature Feasts
                  </h3>
                  {holidayRecipes.length > 0 && onOpenRecipe && (
                    <button
                      onClick={() => onOpenRecipe(holidayRecipes[0])}
                      className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Curated Recipes ({holidayRecipes.length}) →</span>
                    </button>
                  )}
                </div>

                {holidayRecipes.length > 0 && onOpenRecipe && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-amber-500/5 border border-amber-300/60 dark:border-amber-900/50 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                        <ChefHat className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-serif font-bold text-sm text-stone-900 dark:text-white block">
                          {holidayRecipes[0].name}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Step-by-step guide • Printable PDF • Scalable Shopping Checklist
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenRecipe(holidayRecipes[0])}
                      className="py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View Recipe & Shopping List</span>
                    </button>
                  </div>
                )}

                {holiday.foodDelicacies && holiday.foodDelicacies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {holiday.foodDelicacies.map((food, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold"
                      >
                        🍴 {food}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {modalTab === 'traditions' && (
            <>
              {/* Atmospheric Sounds Live Player */}
              <AtmosphericSoundPlayer holiday={holiday} />

              {/* Countdown timer module */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                  <span className="font-semibold uppercase tracking-wider">Live Time Remaining</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{holiday.date}</span>
                </div>
                <CountdownTimer targetDate={holiday.date} holidayName={holiday.name} size="lg" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-rose-500" />
                  Cultural Significance & Lore
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {holiday.description}
                </p>
              </div>

              {/* Historical Origins & Roots if available */}
              {holiday.originHistory && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300/50 dark:border-amber-900/50 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Historical Origin & Foundational Roots
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
                    {holiday.originHistory}
                  </p>
                </div>
              )}

              {/* Authentic Greeting */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-300/40 dark:border-amber-900/40 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                    Traditional Festive Greeting
                  </span>
                  <p className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-white mt-0.5">
                    "{holiday.greeting}"
                  </p>
                </div>
                <button
                  onClick={handleSpeak}
                  className="p-3 rounded-xl bg-white dark:bg-stone-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 shadow-sm hover:scale-105 transition shrink-0"
                  title="Pronounce Greeting"
                >
                  <Volume2 className={`w-5 h-5 ${speaking ? 'animate-bounce text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Small Interactive Map Pinpointing Celebration Epicenter */}
              <HolidayCelebrationMap holiday={holiday} />

              {/* Traditions & Rituals Grid */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Sacred Traditions & Observances
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {holiday.traditions.map((tradition, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 text-xs sm:text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{tradition}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traditional Attire & Cultural Dress Callout Banner */}
              <div 
                onClick={() => setModalTab('attire')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/15 via-amber-500/15 to-purple-500/15 border border-rose-400/50 dark:border-rose-700/60 flex items-center justify-between cursor-pointer hover:opacity-95 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <span>Attire & Traditional Dress</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 rounded bg-rose-500 text-white">AI Visuals</span>
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Explore authentic garments, ceremonial fabrics, auspicious color symbolism & etiquette
                    </span>
                  </div>
                </div>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                  View Attire →
                </span>
              </div>

              {/* Respectful Observance Guidelines if present */}
              {holiday.respectGuidelines && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3 text-xs">
                  <h4 className="font-serif font-bold text-sm text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Respectful Visitor Etiquette & Protocol
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 dark:text-stone-300 text-[11px]">
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Do:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {holiday.respectGuidelines.dos.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-rose-800 dark:text-rose-300 block">Don’t:</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {holiday.respectGuidelines.donts.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {holiday.respectGuidelines.travelTip && (
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 pt-1 border-t border-emerald-200/60 dark:border-emerald-800/60">
                      <strong>Traveler Tip:</strong> {holiday.respectGuidelines.travelTip}
                    </p>
                  )}
                </div>
              )}

              {/* Interactive Quiz Callout Banner */}
              {onOpenQuiz && (
                <div
                  onClick={() => {
                    onOpenQuiz(holiday);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-rose-500/15 to-amber-500/15 border border-indigo-400/50 dark:border-indigo-700/60 flex items-center justify-between cursor-pointer hover:opacity-95 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-serif font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                        <span>Take Cultural Explorer Trivia Challenge</span>
                        <span className="text-[10px] font-mono font-bold px-1.5 rounded bg-amber-400 text-stone-950">+50 Pts</span>
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        Test your knowledge of {holiday.name} and earn explorer points
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                    Play Quiz →
                  </span>
                </div>
              )}

              {/* Regional Travel Window & Festive Peak Intelligence */}
              {(holiday.weatherProfile || holiday.festivePeak) && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      Travel Windows & Festive Peak Observation
                    </span>
                    <button
                      onClick={() => setIsWebAROpen(true)}
                      className="px-2.5 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] flex items-center gap-1 shadow-xs transition"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Experience in WebAR</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700 dark:text-stone-300 text-[11px]">
                    {holiday.weatherProfile && (
                      <div className="space-y-1 p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-amber-200/60 dark:border-amber-800/40">
                        <span className="font-bold text-stone-900 dark:text-stone-100 block">🌤️ Regional Climate:</span>
                        <p>{holiday.weatherProfile.tempCelsius} ({holiday.weatherProfile.tempFahrenheit}) · {holiday.weatherProfile.climate}</p>
                        <p className="text-[10px] text-stone-500 pt-0.5"><strong>Travel Window:</strong> {holiday.weatherProfile.bestTravelWindow}</p>
                      </div>
                    )}
                    {holiday.festivePeak && (
                      <div className="space-y-1 p-2.5 rounded-xl bg-white/80 dark:bg-stone-900/60 border border-amber-200/60 dark:border-amber-800/40">
                        <span className="font-bold text-stone-900 dark:text-stone-100 block">🔥 Festive Peak & Crowds:</span>
                        <p><strong>Peak Days:</strong> {holiday.festivePeak.peakDays} ({holiday.festivePeak.peakTimeOfDay})</p>
                        <p className="text-[10px] text-stone-500 pt-0.5"><strong>Crowd Energy:</strong> {holiday.festivePeak.crowdLevel} {holiday.festivePeak.bestViewingSpot ? `· ${holiday.festivePeak.bestViewingSpot}` : ''}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Real-Time Origin Country Weather & Event Date Climate Widget */}
              <HolidayWeatherWidget holiday={holiday} />

              {/* Quick AI Gift Guide Callout Banner */}
              <div 
                onClick={() => setModalTab('gift_guide')}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 border border-amber-400/50 dark:border-amber-700/60 flex items-center justify-between cursor-pointer hover:opacity-95 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <span>Culturally Appropriate Gift Guide</span>
                      <span className="text-[10px] font-mono font-bold px-1.5 rounded bg-amber-400 text-stone-950">AI</span>
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Explore respectful gifts, auspicious colors, and crucial taboos for {holiday.name}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-bold group-hover:translate-x-1 transition flex items-center gap-1">
                  View Guide →
                </span>
              </div>

              {/* Culinary Delicacies snippet */}
              {holiday.foodDelicacies && holiday.foodDelicacies.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                      Signature Delicacies:
                    </span>
                    <button onClick={() => setModalTab('delicacies')} className="text-emerald-600 dark:text-emerald-400 hover:underline">
                      See Recipes →
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {holiday.foodDelicacies.map((food, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold"
                      >
                        🍴 {food}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Social Media Sharing Widget */}
              <SocialShareWidget holiday={holiday} variant="expanded" />

              {/* Verified Facts */}
              {holiday.facts && holiday.facts.length > 0 && (
                <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-xs space-y-2">
                  <span className="font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                    Verified Historical Lore:
                  </span>
                  <ul className="space-y-1.5 list-disc list-inside text-stone-600 dark:text-stone-300">
                    {holiday.facts.map((fact, idx) => (
                      <li key={idx}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {/* Calendar Sync Button */}
            <button
              onClick={() => onSyncGoogleCalendar(holiday)}
              className={`py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isSyncedToCalendar
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>{isSyncedToCalendar ? 'Google Synced' : 'Google Calendar'}</span>
            </button>

            {/* Native Device .ICS Export */}
            <button
              onClick={handleNativeIcsExport}
              className="py-2.5 px-3.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Download RFC 5545 .ics for Apple Calendar, Outlook, iOS, or Android"
            >
              <Download className="w-3.5 h-3.5 text-indigo-500" />
              <span>{icsExported ? 'Downloaded .ICS' : 'Add to Device (.ics)'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Poster Button */}
            <button
              onClick={() => onOpenShareModal(holiday)}
              className="py-2.5 px-3.5 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-500" />
              <span>Share Poster</span>
            </button>

            {/* AI Intelligence Button */}
            <button
              onClick={() => onOpenAiDeepDive(holiday)}
              className="py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition shadow-md shadow-rose-500/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Gemini Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* WebAR Festive Experience Modal Overlay (Powered by React Three Fiber) */}
      <ReactThreeFiberWebAR
        holiday={holiday}
        isOpen={isWebAROpen}
        onClose={() => setIsWebAROpen(false)}
      />
    </div>
  );
};
