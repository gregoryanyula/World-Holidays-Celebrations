import React, { useState } from 'react';
import { 
  Award, 
  Compass, 
  Globe2, 
  Sparkles, 
  Trophy, 
  Sun, 
  BookOpen, 
  MapPin, 
  Flame, 
  Waves, 
  CheckCircle2, 
  Lock, 
  Filter, 
  ChevronRight 
} from 'lucide-react';
import { Continent, CulturalBadge, CulturalExplorerProgress } from '../types';
import { 
  CULTURAL_BADGES, 
  getBadgeProgress, 
  getExplorerRank 
} from '../utils/culturalBadges';
import confetti from 'canvas-confetti';

interface CulturalExplorerBadgesProps {
  progress: CulturalExplorerProgress;
  onExploreContinent?: (continent: Continent) => void;
}

export const CulturalExplorerBadges: React.FC<CulturalExplorerBadgesProps> = ({
  progress,
  onExploreContinent
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked' | 'continent'>('all');

  const unlockedCount = progress.unlockedBadgeIds.length;
  const totalBadges = CULTURAL_BADGES.length;
  const totalHolidaysViewed = progress.viewedHolidayIds.length;

  const continentList: Continent[] = ['Asia', 'Europe', 'Africa', 'North America', 'South America', 'Oceania'];
  const exploredContinentsCount = continentList.filter(c => (progress.continentCounts[c] || 0) > 0).length;

  const rankInfo = getExplorerRank(unlockedCount);

  // Helper to map string icon to Lucide Component
  const renderBadgeIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Compass': return <Compass className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'MapPin': return <MapPin className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Waves': return <Waves className={className} />;
      case 'Globe2': return <Globe2 className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      default: return <Award className={className} />;
    }
  };

  const filteredBadges = CULTURAL_BADGES.filter(badge => {
    const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    if (filter === 'continent') return badge.category === 'continent';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner: Explorer Rank & Global Progress */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-rose-950 text-white shadow-md relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <Globe2 className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Cultural Explorer System
              </span>
              <span className="text-xs text-stone-300 font-mono">
                Level {rankInfo.level}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>{rankInfo.rank}</span>
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              Earn digital achievements by reading and learning about holiday traditions, authentic greetings, and festive delicacies across world continents.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block text-xl font-bold font-mono text-amber-300">
                {unlockedCount} / {totalBadges}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">
                Badges Earned
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block text-xl font-bold font-mono text-emerald-300">
                {exploredContinentsCount} / 6
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">
                Continents
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block text-xl font-bold font-mono text-sky-300">
                {totalHolidaysViewed}
              </span>
              <span className="text-[10px] text-stone-300 uppercase tracking-wider">
                Holidays Read
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-1.5">
            <span>Overall Badge Completion</span>
            <span className="font-mono font-bold text-amber-300">
              {Math.round((unlockedCount / totalBadges) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.round((unlockedCount / totalBadges) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Continents Exploration Tracker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-rose-500" />
            <span>Continental Heritage Journey</span>
          </h4>
          <span className="text-xs text-stone-400">
            Click any continent to filter exploration
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {continentList.map(continent => {
            const count = progress.continentCounts[continent] || 0;
            const hasExplored = count > 0;

            return (
              <div
                key={continent}
                onClick={() => onExploreContinent?.(continent)}
                className={`p-3 rounded-xl border transition cursor-pointer ${
                  hasExplored
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 hover:border-rose-400'
                    : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 truncate">
                    {continent}
                  </span>
                  {hasExplored ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-500" title="Continent Explored" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-stone-300 dark:bg-stone-600" title="Not yet explored" />
                  )}
                </div>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-[11px] text-stone-400">Holidays:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {count} read
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Filter Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Filter Badges:
          </span>
        </div>

        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              filter === 'all'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            All ({totalBadges})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              filter === 'unlocked'
                ? 'bg-white dark:bg-stone-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              filter === 'locked'
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            In Progress ({totalBadges - unlockedCount})
          </button>
          <button
            onClick={() => setFilter('continent')}
            className={`px-3 py-1 rounded-lg transition font-medium ${
              filter === 'continent'
                ? 'bg-white dark:bg-stone-700 text-rose-600 dark:text-rose-400 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Continents
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBadges.map(badge => {
          const { current, total, percent, isUnlocked } = getBadgeProgress(badge, progress);
          const unlockedTime = progress.unlockedTimestamps[badge.id];

          return (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border transition relative overflow-hidden flex items-start gap-4 ${
                isUnlocked
                  ? 'bg-white dark:bg-stone-900 border-amber-300/80 dark:border-amber-900/60 shadow-sm'
                  : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-90'
              }`}
            >
              {/* Badge Medallion Icon */}
              <div
                onClick={() => {
                  if (isUnlocked) {
                    confetti({ particleCount: 25, spread: 45 });
                  }
                }}
                className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center text-white shadow-md cursor-pointer transition transform active:scale-95 bg-gradient-to-br ${badge.color} ${
                  isUnlocked ? 'ring-2 ring-amber-400/40 ring-offset-2 dark:ring-offset-stone-900' : 'grayscale-50 brightness-75'
                }`}
              >
                {renderBadgeIcon(badge.icon, "w-7 h-7")}
              </div>

              {/* Badge Details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white truncate">
                    {badge.title}
                  </h5>

                  {/* Status Pill */}
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0">
                      <Lock className="w-3 h-3" />
                      <span>{current}/{total}</span>
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 block">
                  {badge.subtitle}
                </span>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {badge.description}
                </p>

                {/* Progress bar or Unlock date */}
                {isUnlocked ? (
                  <div className="pt-1 flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>
                      Earned {unlockedTime ? new Date(unlockedTime).toLocaleDateString() : 'on WorldFest'}
                    </span>
                  </div>
                ) : (
                  <div className="pt-1 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-stone-400">
                      <span>Requirement Progress</span>
                      <span className="font-mono font-semibold">{percent}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
