import React, { useState, useEffect, useMemo } from 'react';
import { 
  Smartphone, 
  Sparkles, 
  Copy, 
  Check, 
  Calendar, 
  Clock, 
  Heart, 
  ExternalLink, 
  ChevronRight, 
  Layers, 
  Flame, 
  Bell, 
  Share2, 
  Plus, 
  ShieldCheck,
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';
import { Holiday, UserEventReminder, UserPreferences, SupportedLanguage } from '../types';
import { getLocalizedHoliday } from '../utils/holidayTranslations';
import confetti from 'canvas-confetti';

interface HomeScreenWidgetsGuideProps {
  reminders: UserEventReminder[];
  holidays: Holiday[];
  preferences: UserPreferences;
  onSelectHoliday?: (holiday: Holiday) => void;
  onToggleBookmark?: (holidayId: string) => void;
}

export const HomeScreenWidgetsGuide: React.FC<HomeScreenWidgetsGuideProps> = ({
  reminders,
  holidays,
  preferences,
  onSelectHoliday = () => {},
  onToggleBookmark = () => {}
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'lockscreen'>('ios');
  const [widgetSize, setWidgetSize] = useState<'small' | 'medium' | 'lockscreen'>('medium');
  const [selectedHolidayId, setSelectedHolidayId] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());

  // Update clock every second for live widget simulator
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Find bookmarked holidays sorted by date
  const bookmarkedHolidays = useMemo(() => {
    const matches: { reminder: UserEventReminder; holiday: Holiday }[] = [];
    for (const r of reminders) {
      const h = holidays.find(item => item.id === r.holidayId);
      if (h) {
        matches.push({ reminder: r, holiday: getLocalizedHoliday(h, preferences.language) });
      }
    }
    // Sort by date upcoming
    matches.sort((a, b) => new Date(a.holiday.date).getTime() - new Date(b.holiday.date).getTime());
    return matches;
  }, [reminders, holidays, preferences.language]);

  // Determine the targeted holiday for the widget
  const targetHoliday = useMemo(() => {
    if (selectedHolidayId) {
      const found = holidays.find(h => h.id === selectedHolidayId);
      if (found) return getLocalizedHoliday(found, preferences.language);
    }
    if (bookmarkedHolidays.length > 0) {
      return bookmarkedHolidays[0].holiday;
    }
    // Default to spotlight holiday (e.g. Diwali)
    return holidays[0] ? getLocalizedHoliday(holidays[0], preferences.language) : null;
  }, [selectedHolidayId, bookmarkedHolidays, holidays, preferences.language]);

  // Calculate live countdown for targetHoliday
  const countdown = useMemo(() => {
    if (!targetHoliday) return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false };
    const target = new Date(targetHoliday.date + 'T00:00:00');
    const diff = target.getTime() - now.getTime();

    if (diff <= 0 && diff > -86400000) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true };
    }

    const totalSeconds = Math.max(0, Math.floor(diff / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, isToday: false };
  }, [targetHoliday, now]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(type);
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.8 } });
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Generate Scriptable iOS Widget Code Snippet
  const scriptableCode = useMemo(() => {
    if (!targetHoliday) return '';
    return `// WorldFest iOS Home Screen Widget (Scriptable)
// Displays your next bookmarked celebration countdown
const holiday = {
  name: "${targetHoliday.name}",
  localName: "${targetHoliday.localName || ''}",
  date: "${targetHoliday.date}",
  country: "${targetHoliday.country}",
  greeting: "${targetHoliday.greeting}",
  bannerUrl: "${targetHoliday.bannerUrl}"
};

const widget = new ListWidget();
widget.backgroundColor = new Color("#1c1917");

// Title & Country
const titleText = widget.addText(holiday.name);
titleText.textColor = Color.white();
titleText.font = Font.boldSystemFont(16);

widget.addSpacer(4);
const countryText = widget.addText(holiday.country + " • " + holiday.date);
countryText.textColor = new Color("#f43f5e");
countryText.font = Font.systemFont(11);

widget.addSpacer(12);
// Countdown Calculation
const targetDate = new Date(holiday.date + "T00:00:00");
const now = new Date();
const diffDays = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));

const countText = widget.addText(diffDays > 0 ? diffDays + " DAYS LEFT" : "CELEBRATING TODAY!");
countText.textColor = new Color("#fbbf24");
countText.font = Font.heavySystemFont(22);

widget.addSpacer(6);
const greetingText = widget.addText('"' + holiday.greeting + '"');
greetingText.textColor = new Color("#a8a29e");
greetingText.font = Font.italicSystemFont(11);

// Tap opens WorldFest app
widget.url = "${window.location.origin}/#holiday=${targetHoliday.id}";

if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}
Script.complete();`;
  }, [targetHoliday]);

  // Generate KWGT Formula for Android
  const kwgtFormula = useMemo(() => {
    if (!targetHoliday) return '';
    return `$if(tf("${targetHoliday.date}T00:00:00", D) > 0, tf("${targetHoliday.date}T00:00:00", D) + " Days until ${targetHoliday.name}", "Celebrating ${targetHoliday.name} Today!")$`;
  }, [targetHoliday]);

  // Generate JSON config for Shortcuts or Webhook
  const widgetJson = useMemo(() => {
    if (!targetHoliday) return '{}';
    return JSON.stringify({
      holidayId: targetHoliday.id,
      name: targetHoliday.name,
      date: targetHoliday.date,
      country: targetHoliday.country,
      daysRemaining: countdown.days,
      hoursRemaining: countdown.hours,
      greeting: targetHoliday.greeting,
      deepLinkUrl: `${window.location.origin}/#holiday=${targetHoliday.id}`,
      lastUpdated: now.toISOString()
    }, null, 2);
  }, [targetHoliday, countdown, now]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950 to-indigo-950 text-white p-6 sm:p-8 border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5 text-rose-400" />
            <span>Native Mobile Widget Integration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
            Home Screen & Lock Screen Countdown Widgets
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Follow our guide to place an auto-updating live countdown widget on your <strong>Apple iPhone / iPad</strong> or <strong>Google Android</strong> home screen. Glance at your next bookmarked celebration without even opening the app.
          </p>
        </div>
      </div>

      {/* 2. Active Target Celebration Selector */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>Current Widget Target Celebration</span>
          </div>
          <p className="text-sm font-semibold text-stone-900 dark:text-white mt-0.5">
            {targetHoliday ? targetHoliday.name : 'No holiday selected'}
            <span className="ml-2 font-mono text-xs font-normal text-stone-500">
              ({targetHoliday?.date})
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-stone-500 dark:text-stone-400 whitespace-nowrap">
            Switch Target:
          </label>
          <select
            value={targetHoliday?.id || ''}
            onChange={(e) => setSelectedHolidayId(e.target.value)}
            className="flex-1 sm:flex-initial text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-stone-800 dark:text-stone-200 focus:ring-1 focus:ring-rose-500 outline-none font-medium"
          >
            {bookmarkedHolidays.length > 0 && (
              <optgroup label="🌟 My Bookmarked Celebrations">
                {bookmarkedHolidays.map(({ holiday }) => (
                  <option key={holiday.id} value={holiday.id}>
                    ⭐ {holiday.name} ({holiday.date})
                  </option>
                ))}
              </optgroup>
            )}
            <optgroup label="🌍 Global Featured Festivals">
              {holidays.map(h => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.country})
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* 3. INTERACTIVE LIVE WIDGET SIMULATOR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Live Interactive Widget Simulator
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Real-time rendering of your widget as it will look on your smartphone.
            </p>
          </div>

          {/* Controls: Platform & Size */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Platform Toggle */}
            <div className="p-1 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center border border-stone-200 dark:border-stone-700 text-xs">
              <button
                onClick={() => setPlatform('ios')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  platform === 'ios'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Apple iOS
              </button>
              <button
                onClick={() => setPlatform('android')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  platform === 'android'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Google Android
              </button>
              <button
                onClick={() => setPlatform('lockscreen')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  platform === 'lockscreen'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                    : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Lock Screen
              </button>
            </div>

            {/* Size Toggle (for iOS / Android) */}
            {platform !== 'lockscreen' && (
              <div className="p-1 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center border border-stone-200 dark:border-stone-700 text-xs">
                <button
                  onClick={() => setWidgetSize('small')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
                    widgetSize === 'small'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  2×2 Small
                </button>
                <button
                  onClick={() => setWidgetSize('medium')}
                  className={`px-2.5 py-1.5 rounded-lg font-semibold transition ${
                    widgetSize === 'medium'
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-900 dark:hover:text-white'
                  }`}
                >
                  4×2 Wide
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visual Phone Backdrop Container */}
        <div className="relative rounded-3xl bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200 dark:from-stone-900 dark:via-stone-950 dark:to-stone-900 p-6 sm:p-10 border border-stone-300/80 dark:border-stone-800 flex items-center justify-center min-h-[300px] overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-radial from-rose-500/5 to-transparent pointer-events-none" />

          {/* SIMULATED WIDGET: iOS MEDIUM (4x2) */}
          {platform === 'ios' && widgetSize === 'medium' && targetHoliday && (
            <div 
              onClick={() => onSelectHoliday(targetHoliday)}
              className="w-full max-w-md rounded-[28px] bg-stone-900/90 dark:bg-stone-900 text-white p-5 shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
              <img
                src={targetHoliday.bannerUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay -z-10 group-hover:scale-105 transition-transform duration-700"
              />

              <div className="relative z-10 flex flex-col justify-between h-44">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{targetHoliday.country}</span>
                      <span>•</span>
                      <span>{targetHoliday.date}</span>
                    </div>
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-white drop-shadow-sm mt-0.5 line-clamp-1">
                      {targetHoliday.name}
                    </h4>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 backdrop-blur border border-white/20 text-stone-200">
                    WorldFest
                  </span>
                </div>

                {/* Big Live Countdown Ticker */}
                <div className="my-auto py-2">
                  {countdown.isToday ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-amber-300 animate-pulse">🎉 CELEBRATING TODAY!</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-3">
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                          {countdown.days}
                        </span>
                        <span className="text-xs uppercase font-bold text-stone-400">days</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold text-stone-200">
                          {String(countdown.hours).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-stone-400">h</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold text-stone-200">
                          {String(countdown.minutes).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-stone-400">m</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-xl font-bold text-rose-400">
                          {String(countdown.seconds).padStart(2, '0')}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-stone-400">s</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Greeting */}
                <div className="flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/10">
                  <span className="italic truncate pr-2">"{targetHoliday.greeting}"</span>
                  <span className="text-[10px] text-rose-400 font-semibold shrink-0 flex items-center gap-1 group-hover:underline">
                    Tap to Open <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* SIMULATED WIDGET: iOS SMALL (2x2) */}
          {platform === 'ios' && widgetSize === 'small' && targetHoliday && (
            <div 
              onClick={() => onSelectHoliday(targetHoliday)}
              className="w-44 h-44 rounded-[28px] bg-stone-900/90 dark:bg-stone-900 text-white p-4 shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden group cursor-pointer hover:scale-[1.03] transition-transform flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-500/20 rounded-full blur-xl pointer-events-none" />
              <img
                src={targetHoliday.bannerUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay -z-10"
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  {targetHoliday.date.substring(5)}
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>

              <div className="relative z-10 my-auto text-center py-1">
                <div className="font-mono text-4xl font-black text-amber-400 leading-none">
                  {countdown.days}
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mt-1">
                  Days Left
                </div>
              </div>

              <div className="relative z-10">
                <h5 className="font-serif font-bold text-xs text-white truncate">
                  {targetHoliday.name}
                </h5>
                <p className="text-[10px] text-stone-400 truncate">
                  {targetHoliday.country}
                </p>
              </div>
            </div>
          )}

          {/* SIMULATED WIDGET: ANDROID MATERIAL YOU (4x2) */}
          {platform === 'android' && widgetSize === 'medium' && targetHoliday && (
            <div 
              onClick={() => onSelectHoliday(targetHoliday)}
              className="w-full max-w-md rounded-[32px] bg-amber-100/95 dark:bg-stone-900 text-stone-900 dark:text-white p-5 shadow-2xl border border-amber-300/40 dark:border-stone-800 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {countdown.days}d
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white leading-tight">
                      {targetHoliday.name}
                    </h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      {targetHoliday.country} • {targetHoliday.date}
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-stone-900/10 dark:bg-white/10 text-[10px] font-mono font-bold">
                  Material You
                </div>
              </div>

              {/* Countdown Bar */}
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 flex items-center justify-around text-center my-2">
                <div>
                  <span className="block font-mono text-2xl font-black text-rose-600 dark:text-rose-400">
                    {countdown.days}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500">Days</span>
                </div>
                <div className="h-6 w-px bg-stone-200 dark:bg-stone-700" />
                <div>
                  <span className="block font-mono text-xl font-bold text-stone-800 dark:text-stone-200">
                    {countdown.hours}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500">Hours</span>
                </div>
                <div className="h-6 w-px bg-stone-200 dark:bg-stone-700" />
                <div>
                  <span className="block font-mono text-xl font-bold text-stone-800 dark:text-stone-200">
                    {countdown.minutes}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500">Mins</span>
                </div>
                <div className="h-6 w-px bg-stone-200 dark:bg-stone-700" />
                <div>
                  <span className="block font-mono text-xl font-bold text-amber-600 dark:text-amber-400">
                    {countdown.seconds}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-stone-500">Secs</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400 mt-2">
                <span className="italic truncate mr-2">"{targetHoliday.greeting}"</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold shrink-0">Open celebration</span>
              </div>
            </div>
          )}

          {/* SIMULATED WIDGET: ANDROID TILE (2x2) */}
          {platform === 'android' && widgetSize === 'small' && targetHoliday && (
            <div 
              onClick={() => onSelectHoliday(targetHoliday)}
              className="w-44 h-44 rounded-[32px] bg-rose-100 dark:bg-stone-900 p-4 border border-rose-200 dark:border-stone-800 text-stone-900 dark:text-white shadow-xl flex flex-col justify-between cursor-pointer hover:scale-[1.03] transition-transform"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-rose-700 dark:text-rose-400">
                  {targetHoliday.date}
                </span>
                <span className="text-xs">🎉</span>
              </div>
              <div className="text-center my-auto">
                <div className="font-mono text-4xl font-black text-rose-600 dark:text-rose-400 leading-none">
                  {countdown.days}
                </div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-stone-600 dark:text-stone-400 mt-1">
                  Days Left
                </div>
              </div>
              <div>
                <p className="font-serif font-bold text-xs truncate">{targetHoliday.name}</p>
                <p className="text-[10px] text-stone-500 truncate">{targetHoliday.country}</p>
              </div>
            </div>
          )}

          {/* SIMULATED WIDGET: LOCK SCREEN GLANCE (iOS / Android) */}
          {platform === 'lockscreen' && targetHoliday && (
            <div className="w-full max-w-sm rounded-2xl bg-black/60 text-white p-4 border border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center font-mono font-black text-lg text-white">
                  {countdown.days}
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">
                    Next Festival Glance
                  </div>
                  <h5 className="font-serif font-bold text-sm text-white truncate max-w-[190px]">
                    {targetHoliday.name}
                  </h5>
                  <p className="text-[11px] text-stone-300">
                    {targetHoliday.date} • {targetHoliday.country}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono text-amber-300 font-bold block">
                  {countdown.days}d {countdown.hours}h
                </span>
                <span className="text-[9px] text-stone-400 uppercase">
                  Remaining
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. STEP-BY-STEP NATIVE INSTRUCTIONS */}
      <div className="space-y-6">
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-500" />
          Step-by-Step Installation Instructions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* iOS 16/17/18+ Guide */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xl">🍏</span>
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  Apple iOS (iPhone & iPad)
                </h4>
                <p className="text-[11px] text-stone-500">Supports iOS 16, 17, 18+ WidgetKit</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Install WorldFest PWA:</strong> Open this web app in Safari, tap the <strong>Share button</strong> (square with up arrow), and select <strong>"Add to Home Screen"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Enter Jiggle Mode:</strong> Return to your iPhone Home Screen. Touch and hold any empty area or wallpaper until the app icons begin to jiggle.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Tap the '+' Add Button:</strong> Tap the <strong>+</strong> button located in the top-left corner of your screen to open the iOS Widget Gallery.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Choose WorldFest Widget:</strong> Search or scroll to <strong>WorldFest</strong> (or Safari Web App). Swipe between <strong>Small (2×2)</strong>, <strong>Medium (4×2)</strong>, or <strong>Lock Screen Glance</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <span>
                  <strong>Tap 'Add Widget':</strong> Place the widget on your screen and tap <strong>Done</strong>. Tapping it anytime launches the app directly into your saved festival details!
                </span>
              </li>
            </ol>

            {/* Scriptable Code Export for iOS Power Users */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  ⚡ Pro Option: iOS Scriptable Widget
                </span>
                <button
                  onClick={() => copyToClipboard(scriptableCode, 'scriptable')}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-semibold flex items-center gap-1 transition"
                >
                  {copiedCode === 'scriptable' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'scriptable' ? 'Copied Code!' : 'Copy Scriptable Code'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Install the free <span className="underline">Scriptable app</span> from App Store, create a new script, paste this code, and select it from your iOS Widget picker for zero-lag updates.
              </p>
            </div>
          </div>

          {/* Android 13/14/15+ Guide */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100 dark:border-stone-800">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                  Google Android (Pixel, Galaxy, etc.)
                </h4>
                <p className="text-[11px] text-stone-500">Supports Android 13, 14, 15+ Material You</p>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Install WorldFest Web App:</strong> In Google Chrome, tap the 3-dot menu and select <strong>"Add to Home screen"</strong> or <strong>"Install App"</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Open Widget Selector:</strong> Touch and hold any empty space on your Android Home Screen launcher until the pop-up menu appears.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Select 'Widgets':</strong> Tap the <strong>Widgets</strong> icon to open the system widget directory.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Drag WorldFest 4×2 or 2×2:</strong> Scroll down to <strong>WorldFest</strong>. Touch and hold the countdown widget and drag it to your desired home screen page.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <span>
                  <strong>Material You Palette:</strong> The widget will automatically harmonize with your device's wallpaper dynamic palette and update countdowns every minute.
                </span>
              </li>
            </ol>

            {/* KWGT Formula for Android Power Users */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  ⚡ Pro Option: KWGT Kustom Widget
                </span>
                <button
                  onClick={() => copyToClipboard(kwgtFormula, 'kwgt')}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-[11px] font-semibold flex items-center gap-1 transition"
                >
                  {copiedCode === 'kwgt' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'kwgt' ? 'Copied Formula!' : 'Copy KWGT Formula'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Use with KWGT Kustom Widget Maker for fully custom font, blur background, and always-on-display integration.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Direct Widget JSON API Payload */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-500" />
                Live Widget Data Payload (JSON)
              </h4>
              <p className="text-xs text-stone-500">
                Use this endpoint payload for Apple Shortcuts, Tasker, Home Assistant, or custom lock-screens.
              </p>
            </div>

            <button
              onClick={() => copyToClipboard(widgetJson, 'json')}
              className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-stone-800 transition"
            >
              {copiedCode === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode === 'json' ? 'JSON Copied!' : 'Copy Widget JSON'}</span>
            </button>
          </div>

          <pre className="p-3 rounded-xl bg-stone-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-40 border border-stone-800">
            {widgetJson}
          </pre>
        </div>
      </div>
    </div>
  );
};
