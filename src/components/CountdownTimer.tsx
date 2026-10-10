import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Sparkles, AlertCircle } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // YYYY-MM-DD
  holidayName: string;
  size?: 'sm' | 'md' | 'lg';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, holidayName, size = 'md' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      // Ensure target parsed at midnight local time
      const parts = targetDate.split('-');
      const target = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      const diff = target.getTime() - now.getTime();

      // Check if same calendar day
      const isSameDay =
        now.getFullYear() === target.getFullYear() &&
        now.getMonth() === target.getMonth() &&
        now.getDate() === target.getDate();

      if (isSameDay) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          isPast: false
        });
        return;
      }

      if (diff < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: false,
          isPast: true
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        isPast: false
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (timeLeft.isToday) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wide uppercase animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Today is {holidayName}! Celebrate now!</span>
      </div>
    );
  }

  if (timeLeft.isPast) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-medium">
        <Clock className="w-3.5 h-3.5" />
        <span>Celebrated earlier this cycle (Next recurrence 2027)</span>
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-1 font-mono text-xs font-semibold text-stone-800 dark:text-stone-200">
        <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          {timeLeft.days}d
        </span>
        <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
        <span className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-rose-500">
          {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center select-none">
      <div className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur border border-stone-200/80 dark:border-stone-800 shadow-sm">
        <span className="block text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-white">
          {timeLeft.days}
        </span>
        <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 tracking-wider">
          Days
        </span>
      </div>
      <div className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur border border-stone-200/80 dark:border-stone-800 shadow-sm">
        <span className="block text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-white">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 tracking-wider">
          Hours
        </span>
      </div>
      <div className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur border border-stone-200/80 dark:border-stone-800 shadow-sm">
        <span className="block text-xl sm:text-2xl font-bold font-mono text-stone-900 dark:text-white">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-stone-500 dark:text-stone-400 tracking-wider">
          Mins
        </span>
      </div>
      <div className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-stone-900/80 backdrop-blur border border-rose-200 dark:border-rose-900/40 shadow-sm">
        <span className="block text-xl sm:text-2xl font-bold font-mono text-rose-600 dark:text-rose-400">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="text-[10px] uppercase font-semibold text-rose-500 tracking-wider">
          Secs
        </span>
      </div>
    </div>
  );
};
