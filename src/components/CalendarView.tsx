import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  Lock,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { Holiday, UserEventReminder } from '../types';
import { CountdownTimer } from './CountdownTimer';

interface CalendarViewProps {
  holidays: Holiday[];
  reminders: UserEventReminder[];
  onAddReminder: (holiday: Holiday, notes?: string) => void;
  onRemoveReminder: (reminderId: string) => void;
  onSyncGoogleCalendar: (holiday: Holiday) => void;
  onSelectHoliday: (holiday: Holiday) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  holidays,
  reminders,
  onAddReminder,
  onRemoveReminder,
  onSyncGoogleCalendar,
  onSelectHoliday
}) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // 1 - 12
  const [selectedYear, setSelectedYear] = useState<number>(2026);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthHolidays = holidays.filter(h => {
    const parts = h.date.split('-');
    const m = parseInt(parts[1], 10);
    const y = parseInt(parts[0], 10);
    return m === selectedMonth && (y === selectedYear || y === selectedYear + 1);
  });

  const handlePrevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Month Navigator & Calendar Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-rose-500" />
            Personalized Global Celebration Calendar
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Track multi-faith observances, UN special days, and sync reminders directly into Google Calendar.
          </p>
        </div>

        {/* Month Selector Buttons */}
        <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-xl border border-stone-200 dark:border-stone-700">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-sm sm:text-base font-serif px-3 min-w-[140px] text-center text-stone-800 dark:text-stone-100">
            {months[selectedMonth - 1]} {selectedYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Month's Holidays Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white flex items-center gap-2">
              <span>Holidays in {months[selectedMonth - 1]}</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                {monthHolidays.length} Observances
              </span>
            </h3>
          </div>

          {monthHolidays.length === 0 ? (
            <div className="p-8 text-center bg-stone-50 dark:bg-stone-900/40 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800">
              <p className="text-sm text-stone-500">
                No indexed celebrations recorded in {months[selectedMonth - 1]} {selectedYear}. Switch months to view upcoming celebrations like Diwali (Nov), Hanukkah (Dec), or Lunar New Year (Feb).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {monthHolidays.map((holiday) => {
                const isSaved = reminders.some(r => r.holidayId === holiday.id);
                return (
                  <div
                    key={holiday.id}
                    onClick={() => onSelectHoliday(holiday)}
                    className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-300 dark:hover:border-rose-900/60 shadow-sm transition cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                        <span className="font-semibold font-mono text-rose-600 dark:text-rose-400">
                          {holiday.date}
                        </span>
                        <span className="capitalize px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px]">
                          {holiday.category.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 dark:text-white text-base">
                        {holiday.name}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                        {holiday.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                      <CountdownTimer targetDate={holiday.date} holidayName={holiday.name} size="sm" />
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSyncGoogleCalendar(holiday);
                          }}
                          title="Add to Google Calendar"
                          className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
                        >
                          <CalendarIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddReminder(holiday);
                          }}
                          title="Add to personal celebration list"
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Col: Personal Saved Reminders & Synced Schedule */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                My Celebration Watchlist
              </h3>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {reminders.length}
              </span>
            </div>

            {reminders.length === 0 ? (
              <div className="py-8 text-center text-xs text-stone-500 space-y-2">
                <Sparkles className="w-6 h-6 mx-auto text-stone-400" />
                <p>Your celebration watchlist is empty.</p>
                <p className="text-[11px] text-stone-400">
                  Bookmark any festival or sync it to Google Calendar to receive countdown reminders.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex items-start justify-between gap-2"
                  >
                    <div>
                      <h4 className="font-medium text-xs sm:text-sm text-stone-900 dark:text-white">
                        {rem.holidayName}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span className="font-mono text-rose-600 dark:text-rose-400 font-semibold">{rem.date}</span>
                        {rem.syncedToGoogleCalendar && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" />
                            G-Cal Synced
                          </span>
                        )}
                      </div>
                      {rem.notes && (
                        <p className="text-[11px] italic text-stone-600 dark:text-stone-300 mt-1">
                          "{rem.notes}"
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveReminder(rem.id)}
                      className="text-stone-400 hover:text-rose-500 p-1 transition"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
