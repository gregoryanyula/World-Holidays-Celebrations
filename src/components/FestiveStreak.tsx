import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  Shield, 
  Calendar, 
  Award, 
  Check, 
  Info, 
  X, 
  ChevronRight, 
  Zap, 
  Trophy,
  History,
  BookOpen
} from 'lucide-react';
import { FestiveStreakData } from '../types';
import { getStreakTier, getPastDateString, getTodayString } from '../utils/streakManager';
import confetti from 'canvas-confetti';

interface FestiveStreakProps {
  streakData: FestiveStreakData;
  onExploreTraditionClick?: () => void;
  onRefreshStreak?: () => void;
  variant?: 'dashboard' | 'compact' | 'header';
}

export const FestiveStreak: React.FC<FestiveStreakProps> = ({
  streakData,
  onExploreTraditionClick,
  onRefreshStreak,
  variant = 'dashboard'
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSparkling, setIsSparkling] = useState(false);

  const tier = getStreakTier(streakData.currentStreak);
  const today = getTodayString();
  const isTodayLogged = streakData.lastLoginDate === today;

  const handleFireClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 800);

    try {
      confetti({
        particleCount: tier.particleCount + 12,
        spread: 55,
        origin: { y: 0.6 },
        colors: tier.tier === 4 
          ? ['#a855f7', '#ec4899', '#f59e0b', '#3b82f6']
          : ['#f97316', '#ef4444', '#f59e0b', '#fbbf24']
      });
    } catch {
      // ignore
    }

    setModalOpen(true);
  };

  // Helper for 7-day visual dots
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const dateStr = getPastDateString(6 - i);
    const d = new Date(dateStr + 'T12:00:00');
    const dayName = d.toLocaleDateString('en-US', { weekday: 'narrow' });
    const isCompleted = streakData.history.includes(dateStr);
    const isCurrentDay = dateStr === today;
    return { dateStr, dayName, isCompleted, isCurrentDay };
  });

  // Render SVG Flame that dynamically increases in layers, height, and corona intensity
  const renderDynamicFlameIcon = (size: 'sm' | 'md' | 'lg' = 'md') => {
    const scaleClass = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-16 h-16' : tier.flameSizeClass;

    return (
      <div 
        className="relative inline-flex items-center justify-center cursor-pointer select-none group"
        onClick={handleFireClick}
        title={`Festive Streak: ${streakData.currentStreak} Days (${tier.title}). Click to inspect!`}
      >
        {/* Ambient Pulsing Aura (scales with streak tier) */}
        <div 
          className={`absolute inset-0 rounded-full blur-md transition-all duration-700 pointer-events-none ${
            tier.tier === 4
              ? 'bg-gradient-to-r from-violet-600 via-pink-500 to-amber-400 opacity-70 animate-pulse'
              : tier.tier === 3
              ? 'bg-gradient-to-r from-rose-600 via-orange-500 to-amber-400 opacity-60 animate-pulse'
              : tier.tier === 2
              ? 'bg-gradient-to-r from-orange-500 to-amber-400 opacity-45'
              : 'bg-amber-400 opacity-30'
          }`}
          style={{ transform: `scale(${1 + tier.tier * 0.22})` }}
        />

        {/* Outer Radiant Flare Corona for high streaks */}
        {tier.tier >= 3 && (
          <div 
            className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping opacity-30 pointer-events-none"
            style={{ animationDuration: tier.tier === 4 ? '2s' : '3s' }}
          />
        )}

        {/* Dynamic Multi-layered SVG Flame */}
        <svg 
          viewBox="0 0 36 36" 
          className={`${scaleClass} relative z-10 transition-transform duration-300 group-hover:scale-110 ${isSparkling ? 'scale-125' : ''}`}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Flame Gradient */}
            <linearGradient id={`outerFlame-${tier.tier}`} x1="18" y1="36" x2="18" y2="0" gradientUnits="userSpaceOnUse">
              {tier.tier === 4 ? (
                <>
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="45%" stopColor="#ec4899" />
                  <stop offset="80%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ffffff" />
                </>
              ) : tier.tier === 3 ? (
                <>
                  <stop offset="0%" stopColor="#be123c" />
                  <stop offset="45%" stopColor="#f43f5e" />
                  <stop offset="75%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fef08a" />
                </>
              ) : tier.tier === 2 ? (
                <>
                  <stop offset="0%" stopColor="#c2410c" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="85%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#fffbeb" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="55%" stopColor="#f59e0b" />
                  <stop offset="90%" stopColor="#fde68a" />
                </>
              )}
            </linearGradient>

            {/* Inner Core Flame Gradient */}
            <linearGradient id={`innerFlame-${tier.tier}`} x1="18" y1="34" x2="18" y2="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="60%" stopColor="#ffffff" />
            </linearGradient>
          </defs>

          {/* Base outer roaring tongue of fire */}
          <path 
            d="M18 2C16.8 5.6 14.5 9.2 12.2 12.6C9.6 16.5 7 20.8 7 25.5C7 31.3 11.9 36 18 36C24.1 36 29 31.3 29 25.5C29 19.8 25.4 15.2 23 11.8C20.6 8.4 19.2 5.2 18 2Z" 
            fill={`url(#outerFlame-${tier.tier})`} 
            className="filter drop-shadow-sm"
          />

          {/* Secondary dynamic flickers for Tier 2+ */}
          {tier.tier >= 2 && (
            <path 
              d="M18 7C16.5 10 13.5 13.5 11 17C14.5 16 16 13 18 10C20 13 21.5 16 25 17C22.5 13.5 19.5 10 18 7Z" 
              fill="#fed7aa" 
              opacity="0.85"
            />
          )}

          {/* Inner hot blazing white-gold core */}
          <path 
            d="M18 16C16.2 19 14.5 22 14.5 25C14.5 28.3 16.1 30.5 18 30.5C19.9 30.5 21.5 28.3 21.5 25C21.5 22 19.8 19 18 16Z" 
            fill={`url(#innerFlame-${tier.tier})`} 
          />

          {/* Crackling floating sparks for Tier 3 and 4 */}
          {tier.tier >= 3 && (
            <>
              <circle cx="9" cy="14" r="1.2" fill="#fef08a" className="animate-ping" style={{ animationDuration: '1.4s' }} />
              <circle cx="27" cy="12" r="1.4" fill="#fed7aa" className="animate-ping" style={{ animationDuration: '1.8s' }} />
              <circle cx="18" cy="4" r="1" fill="#ffffff" />
            </>
          )}

          {/* Astral star burst core for Tier 4 */}
          {tier.tier === 4 && (
            <circle cx="18" cy="24" r="2.2" fill="#ffffff" className="animate-pulse" />
          )}
        </svg>

        {/* Interactive Badge Pill Overlay */}
        <span className="absolute -bottom-1.5 -right-1 px-1.5 py-0.2 rounded-full bg-stone-900 border border-amber-400/50 text-[10px] font-mono font-black text-amber-300 shadow-md">
          {streakData.currentStreak}d
        </span>
      </div>
    );
  };

  // Header / Compact Variant
  if (variant === 'header') {
    return (
      <>
        <button
          onClick={handleFireClick}
          className="flex items-center gap-1.5 py-1 px-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-200 dark:border-stone-700/80 transition-all text-xs font-semibold"
          title={`Festive Streak: ${streakData.currentStreak} Days`}
        >
          {renderDynamicFlameIcon('sm')}
          <span className="font-bold text-amber-600 dark:text-amber-400 text-xs">
            {streakData.currentStreak}
          </span>
          <span className="hidden lg:inline text-[11px] text-stone-500 dark:text-stone-400 font-medium">
            Streak
          </span>
        </button>

        {/* Modal render */}
        {modalOpen && renderModal()}
      </>
    );
  }

  // Dashboard Visualizer (Full Banner / Card Widget)
  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/60 text-white p-4 sm:p-6 border border-stone-800 shadow-xl">
        {/* Glow ambient background spot */}
        <div 
          className={`absolute -right-10 -bottom-10 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
            tier.tier === 4 ? 'bg-violet-600/25' : tier.tier === 3 ? 'bg-rose-600/25' : 'bg-amber-500/20'
          }`} 
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Fire Icon & Title Info */}
          <div className="flex items-center gap-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-stone-950/80 border border-stone-800/90 shadow-inner flex items-center justify-center shrink-0">
              {renderDynamicFlameIcon('md')}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  Festive Streak Tier {tier.tier}: {tier.title}
                </span>
                {isTodayLogged && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                    <Check className="w-3 h-3" />
                    Today Active
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                  {streakData.currentStreak} Day{streakData.currentStreak !== 1 ? 's' : ''}
                </h3>
                <span className="text-xs text-stone-400 font-medium">
                  (Best: {streakData.longestStreak} days)
                </span>
              </div>

              <p className="text-xs text-stone-300 max-w-md">
                {tier.description}
              </p>
            </div>
          </div>

          {/* Middle: 7-Day History Track */}
          <div className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800 flex items-center gap-2 sm:gap-3 self-start md:self-center">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 pr-1">
              Past 7 Days:
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {last7Days.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      item.isCompleted
                        ? tier.tier >= 3
                          ? 'bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-md shadow-rose-500/30 ring-1 ring-amber-300'
                          : 'bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 shadow-md shadow-amber-500/20'
                        : item.isCurrentDay
                        ? 'bg-stone-800 text-amber-400 border border-dashed border-amber-400 animate-pulse'
                        : 'bg-stone-800/80 text-stone-500 border border-stone-700/50'
                    }`}
                  >
                    {item.isCompleted ? (
                      <Flame className="w-4 h-4 fill-current" />
                    ) : (
                      <span className="text-[10px]">{item.dayName}</span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-stone-400">
                    {item.dayName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleFireClick}
              className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Inspect Fire</span>
            </button>

            {onExploreTraditionClick && (
              <button
                onClick={onExploreTraditionClick}
                className="py-2.5 px-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Today's Lore</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {modalOpen && renderModal()}
    </>
  );

  function renderModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl p-5 sm:p-7 max-w-lg w-full max-h-[92vh] overflow-y-auto space-y-6 text-white no-scrollbar ring-1 ring-white/10">
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center">
                {renderDynamicFlameIcon('md')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    Festive Streak
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Tier {tier.tier}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Consecutive days of cultural discovery & tradition study
                </p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Hero Streak Display */}
          <div className="text-center p-6 rounded-3xl bg-stone-950/80 border border-stone-800 space-y-3 relative overflow-hidden">
            <div className="flex justify-center">
              {renderDynamicFlameIcon('lg')}
            </div>

            <div className="space-y-1">
              <div className="text-4xl font-serif font-black text-amber-400">
                {streakData.currentStreak} Days
              </div>
              <div className="text-sm font-semibold text-stone-200">
                {tier.title} • {tier.badgeName}
              </div>
              <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed pt-1">
                {tier.description}
              </p>
            </div>

            {/* Next Milestone Bar */}
            <div className="pt-3 max-w-xs mx-auto space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium">
                <span>Next Milestone: {tier.nextMilestone} Days</span>
                <span className="text-amber-400 font-bold">
                  {Math.max(0, tier.nextMilestone - streakData.currentStreak)} days left
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${Math.min(100, Math.round((streakData.currentStreak / tier.nextMilestone) * 100))}%` 
                  }}
                />
              </div>
            </div>
          </div>

          {/* Streak Protectors & Traditions Explored Today */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-semibold flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Streak Shields
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                  {streakData.freezesRemaining} Available
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Shields automatically prevent flame extinguishment if you miss a single calendar day.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-400 font-semibold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Today's Lore
                </span>
                <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 rounded-lg bg-amber-950/60 border border-amber-500/30">
                  {streakData.traditionsExploredToday} Explored
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                Read 3 holidays daily to maximize your festive flame radiance and unlock explorer badges!
              </p>
            </div>
          </div>

          {/* Flame Intensity Roadmap */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Flame Intensity Hierarchy
            </h4>
            <div className="space-y-2">
              {[
                { name: 'Kindling Ember', days: '1–3 Days', desc: 'Gentle amber hearth flame for new travelers.', active: tier.tier === 1 },
                { name: 'Rising Blaze', days: '4–7 Days', desc: 'Vibrant dual-core orange fire illuminating heritage.', active: tier.tier === 2 },
                { name: 'Inferno of Traditions', days: '8–14 Days', desc: 'Roaring crimson torch with crackling festive sparks.', active: tier.tier === 3 },
                { name: 'Celestial Astral Flame', days: '15+ Days', desc: 'Supreme cosmic violet-gold aurora blazing globally.', active: tier.tier === 4 }
              ].map((lvl, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    lvl.active
                      ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                      : 'bg-stone-950/60 border-stone-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${lvl.active ? 'bg-amber-400 animate-ping' : 'bg-stone-700'}`} />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{lvl.name}</span>
                        {lvl.active && (
                          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/20 px-1.5 rounded">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-stone-400">{lvl.desc}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-300 shrink-0">
                    {lvl.days}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Lore Tidbit */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-rose-950/40 border border-amber-700/30 text-xs text-stone-300 space-y-1">
            <span className="font-bold text-amber-300 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Sacred Fire in World Cultures
            </span>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              From the Olympic Flame in Greece to Zoroastrian Atash Behram and the sacred lamps of Diwali, fire has represented unbroken memory, purity, and communal enlightenment for millennia.
            </p>
          </div>

          {/* Bottom Button */}
          <button
            onClick={() => setModalOpen(false)}
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition shadow-lg shadow-amber-500/20"
          >
            Keep the Flame Burning
          </button>
        </div>
      </div>
    );
  }
};
