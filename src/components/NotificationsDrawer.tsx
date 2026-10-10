import React from 'react';
import { 
  X, 
  Bell, 
  Calendar as CalendarIcon, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectHoliday: (holidayId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectHoliday
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-md h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
                Festive Alerts & Countdown Updates
              </h3>
              <p className="text-xs text-stone-500">
                Daily reminders & international observance alerts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mark read button */}
        <div className="px-5 py-2.5 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium">
            {notifications.filter(n => !n.read).length} new alerts
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
          >
            Mark all read
          </button>
        </div>

        {/* Notification list */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.actionHolidayId) {
                  onSelectHoliday(item.actionHolidayId);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition cursor-pointer ${
                item.read
                  ? 'bg-stone-50/60 dark:bg-stone-800/30 border-stone-200/60 dark:border-stone-800'
                  : 'bg-white dark:bg-stone-800/90 border-rose-200 dark:border-rose-900/60 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5">
                  {item.type === 'reminder' && <CalendarIcon className="w-4 h-4" />}
                  {item.type === 'security' && <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                  {item.type === 'trending' && <Sparkles className="w-4 h-4 text-amber-500" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-stone-400">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
