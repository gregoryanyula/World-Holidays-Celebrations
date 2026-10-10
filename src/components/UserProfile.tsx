import React, { useState } from 'react';
import { 
  User, 
  Trophy, 
  Award, 
  Heart, 
  Bookmark, 
  Calendar, 
  Sparkles, 
  Globe2, 
  ExternalLink, 
  Trash2, 
  MessageSquare, 
  Compass, 
  Clock, 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Download,
  CalendarPlus,
  ShieldCheck,
  Send,
  Eye,
  Smartphone
} from 'lucide-react';
import { Holiday, UserEventReminder, CommunityPost, CulturalExplorerProgress, UserPreferences, Continent } from '../types';
import { CULTURAL_BADGES, getExplorerRank, getBadgeProgress } from '../utils/culturalBadges';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';
import confetti from 'canvas-confetti';

interface UserProfileProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  explorerProgress: CulturalExplorerProgress;
  holidays: Holiday[];
  reminders: UserEventReminder[];
  communityPosts: CommunityPost[];
  onSelectHoliday: (holiday: Holiday) => void;
  onToggleBookmark: (holidayId: string) => void;
  onSyncGoogleCalendar: (holiday: Holiday) => void;
  onNavigateToCommunity?: () => void;
  onSwitchToBadgesTab?: () => void;
  onSwitchToWidgetsTab?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  preferences,
  setPreferences,
  explorerProgress,
  holidays,
  reminders,
  communityPosts,
  onSelectHoliday,
  onToggleBookmark,
  onSyncGoogleCalendar,
  onNavigateToCommunity,
  onSwitchToBadgesTab,
  onSwitchToWidgetsTab
}) => {
  const [profileSubTab, setProfileSubTab] = useState<'overview' | 'badges' | 'community' | 'favorites'>('overview');

  // Compute Explorer Stats
  const unlockedBadges = CULTURAL_BADGES.filter(b => explorerProgress.unlockedBadgeIds.includes(b.id));
  const rankInfo = getExplorerRank(unlockedBadges.length);
  const totalBadges = CULTURAL_BADGES.length;

  const exploredContinentsCount = (Object.keys(explorerProgress.continentCounts) as Continent[])
    .filter(c => c !== 'Global' && (explorerProgress.continentCounts[c] || 0) > 0).length;

  // Community contributions by this user
  const userAuthoredPosts = communityPosts.filter(p => 
    p.author === 'Global Culture Enthusiast' || p.author.toLowerCase().includes('you') || p.id.startsWith('post-')
  );
  const userLikedPosts = communityPosts.filter(p => p.likedByMe);

  // Map reminders to full holiday objects
  const savedHolidaysWithDetails = reminders.map(reminder => {
    const matched = holidays.find(h => h.id === reminder.holidayId);
    return {
      reminder,
      holiday: matched
    };
  }).filter((item): item is { reminder: UserEventReminder; holiday: Holiday } => item.holiday !== undefined);

  // Next badge target
  const nextBadge = CULTURAL_BADGES.find(b => !explorerProgress.unlockedBadgeIds.includes(b.id));

  const formatUnlockDate = (badgeId: string) => {
    const timestamp = explorerProgress.unlockedTimestamps?.[badgeId];
    if (!timestamp) return 'Recently Earned';
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently Earned';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. HERO IDENTITY CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-rose-950/80 to-stone-900 border border-stone-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Avatar & User Info */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 p-1 shadow-lg shadow-rose-900/30">
                <div className="w-full h-full rounded-xl bg-stone-900 flex items-center justify-center overflow-hidden">
                  <User className="w-9 h-9 text-rose-300" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-amber-500 text-stone-950 shadow-md font-bold text-[10px] flex items-center gap-0.5">
                <Trophy className="w-3 h-3 fill-stone-950" />
                <span>Lv.{rankInfo.level}</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Global Culture Explorer
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {rankInfo.rank}
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-1 flex items-center gap-2">
                <span>Personal Learning Passport & Heritage Sanctuary</span>
                <span>•</span>
                <span className="text-amber-400 font-medium">Active Explorer</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-stone-400">Next Title:</span>
                <span className="text-[11px] font-semibold text-rose-300">
                  {rankInfo.level >= 5 ? 'Maximum Ambassador Mastery Achieved' : `${unlockedBadges.length} / ${rankInfo.nextTarget} badges to next rank`}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Badges / Shortcut */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onSwitchToBadgesTab && (
              <button
                onClick={onSwitchToBadgesTab}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center gap-2 transition backdrop-blur-sm"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>All Badges Catalog</span>
              </button>
            )}
            {onNavigateToCommunity && (
              <button
                onClick={onNavigateToCommunity}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/40 flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Community Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Earned Badges</span>
            </div>
            <div className="text-2xl font-bold font-serif text-white mt-1">
              {unlockedBadges.length}
              <span className="text-xs text-stone-400 font-sans font-normal ml-1">/ {totalBadges}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Globe2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Continents Explored</span>
            </div>
            <div className="text-2xl font-bold font-serif text-white mt-1">
              {exploredContinentsCount}
              <span className="text-xs text-stone-400 font-sans font-normal ml-1">/ 6</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <Bookmark className="w-3.5 h-3.5 text-rose-400" />
              <span>Favorite Saved</span>
            </div>
            <div className="text-2xl font-bold font-serif text-white mt-1">
              {savedHolidaysWithDetails.length}
              <span className="text-xs text-stone-400 font-sans font-normal ml-1">holidays</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-stone-400 text-xs">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Community Impact</span>
            </div>
            <div className="text-2xl font-bold font-serif text-white mt-1">
              {userAuthoredPosts.length + userLikedPosts.length}
              <span className="text-xs text-stone-400 font-sans font-normal ml-1">actions</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROFILE NAVIGATION PILLS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setProfileSubTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-2 ${
            profileSubTab === 'overview'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Profile Overview</span>
        </button>

        <button
          onClick={() => setProfileSubTab('badges')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-2 ${
            profileSubTab === 'badges'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Earned Badges ({unlockedBadges.length})</span>
        </button>

        <button
          onClick={() => setProfileSubTab('favorites')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-2 ${
            profileSubTab === 'favorites'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4 text-rose-500" />
          <span>Favorite Holidays ({savedHolidaysWithDetails.length})</span>
        </button>

        <button
          onClick={() => setProfileSubTab('community')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-2 ${
            profileSubTab === 'community'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-500" />
          <span>Community History ({userAuthoredPosts.length + userLikedPosts.length})</span>
        </button>
      </div>

      {/* 3. SUB-TAB: OVERVIEW */}
      {profileSubTab === 'overview' && (
        <div className="space-y-6">
          {/* EARNED BADGES HIGHLIGHT ROW */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  Earned Cultural Badges
                </h3>
              </div>
              <button
                onClick={() => setProfileSubTab('badges')}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <span>View All ({unlockedBadges.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {unlockedBadges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {unlockedBadges.slice(0, 3).map(badge => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-2xl bg-gradient-to-br from-stone-50 to-amber-50/40 dark:from-stone-800/80 dark:to-stone-850 border border-stone-200 dark:border-stone-700/80 flex items-start gap-3.5 shadow-xs"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-stone-900 dark:text-white text-sm truncate">
                          {badge.title}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300">
                          {badge.tier}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                        {badge.subtitle}
                      </p>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>Unlocked {formatUnlockDate(badge.id)}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-dashed border-stone-300 dark:border-stone-700 text-center space-y-2">
                <Compass className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                <h4 className="font-semibold text-stone-900 dark:text-white text-sm">
                  Begin Your Global Heritage Journey
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Click on any festival in the directory to explore its sacred traditions, recipes, and origin climate to earn your first &quot;First Footsteps&quot; badge!
                </p>
              </div>
            )}
          </div>

          {/* TWO COLUMN: FAVORITE HOLIDAYS & COMMUNITY HISTORY TEASERS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FAVORITE SAVED HOLIDAYS */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-rose-500" />
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                    Favorite Celebrations
                  </h3>
                </div>
                <button
                  onClick={() => setProfileSubTab('favorites')}
                  className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <span>See All ({savedHolidaysWithDetails.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {savedHolidaysWithDetails.length > 0 ? (
                <div className="space-y-3">
                  {savedHolidaysWithDetails.slice(0, 3).map(({ holiday, reminder }) => (
                    <div
                      key={holiday.id}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between gap-3 hover:border-rose-300 dark:hover:border-rose-700 transition"
                    >
                      <div 
                        onClick={() => onSelectHoliday(holiday)}
                        className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                      >
                        <img
                          src={holiday.bannerUrl}
                          alt={holiday.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                            {holiday.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{holiday.country}</span>
                            <span>•</span>
                            <span className="font-mono">{holiday.date}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => onSyncGoogleCalendar(holiday)}
                          title="Add to Google Calendar"
                          className="p-2 rounded-xl bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 border border-stone-200 dark:border-stone-600 shadow-xs transition"
                        >
                          <CalendarPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onSelectHoliday(holiday)}
                          title="View Details"
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-800 shadow-xs transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-dashed border-stone-300 dark:border-stone-700 text-center space-y-2">
                  <Bookmark className="w-7 h-7 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    No holidays favorited yet. Click the bookmark icon on any holiday card to curate your celebration watchlist!
                  </p>
                </div>
              )}
            </div>

            {/* COMMUNITY CONTRIBUTION HISTORY */}
            <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                    Community Contributions
                  </h3>
                </div>
                <button
                  onClick={() => setProfileSubTab('community')}
                  className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Activity Log</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {userAuthoredPosts.length > 0 ? (
                  userAuthoredPosts.slice(0, 2).map(post => (
                    <div
                      key={post.id}
                      className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/70 border border-stone-200/80 dark:border-stone-700/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-stone-400 shrink-0">{post.timestamp}</span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                        &quot;{post.content}&quot;
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                        <span className="font-semibold text-rose-500">🎉 {post.holidayName}</span>
                        <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          {post.likes} Applauds
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                      <Sparkles className="w-4 h-4" />
                      <span>Ready to Share a Tradition?</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300">
                      Share family recipes, local memories, or ceremonial photos with fellow cultural learners worldwide.
                    </p>
                    {onNavigateToCommunity && (
                      <button
                        onClick={onNavigateToCommunity}
                        className="py-1.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition shadow-xs flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Your First Cultural Memory</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Liked Celebrations strip */}
                {userLikedPosts.length > 0 && (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                      Celebrations You Applauded:
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {userLikedPosts.slice(0, 4).map(lp => (
                        <span
                          key={lp.id}
                          className="px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-[11px] font-medium border border-rose-200 dark:border-rose-900 flex items-center gap-1"
                        >
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          <span>{lp.holidayName}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SUB-TAB: EARNED BADGES */}
      {profileSubTab === 'badges' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <span>Your Cultural Explorer Medallions</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Badges officially unlocked through your world festival discovery and lore exploration.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-bold text-stone-900 dark:text-white">
                    {unlockedBadges.length} of {totalBadges} Badges
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {Math.round((unlockedBadges.length / totalBadges) * 100)}% Complete
                  </div>
                </div>
                {onSwitchToBadgesTab && (
                  <button
                    onClick={onSwitchToBadgesTab}
                    className="py-2 px-3.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 transition"
                  >
                    View Full Catalog →
                  </button>
                )}
              </div>
            </div>

            {/* UNLOCKED BADGES GRID */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedBadges.map(badge => (
                <div
                  key={badge.id}
                  className="relative overflow-hidden p-5 rounded-3xl bg-gradient-to-br from-stone-50 to-amber-50/50 dark:from-stone-850 dark:to-stone-900 border border-amber-300/60 dark:border-amber-700/60 shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-13 h-13 rounded-2xl bg-gradient-to-tr ${badge.color} text-white flex items-center justify-center shadow-lg shadow-amber-500/20`}>
                      <Award className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                      {badge.tier}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-white text-base">
                      {badge.title}
                    </h4>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {badge.subtitle}
                    </p>
                    <p className="text-xs text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Unlocked
                    </span>
                    <span>{formatUnlockDate(badge.id)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* IF NO BADGES UNLOCKED */}
            {unlockedBadges.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  No Badges Unlocked Yet
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Start reading celebrations from Asia, Europe, Africa, North America, South America, or Oceania to unlock your first cultural explorer badge!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. SUB-TAB: FAVORITE SAVED HOLIDAYS */}
      {profileSubTab === 'favorites' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2">
                  <Bookmark className="w-6 h-6 text-rose-500" />
                  <span>Favorite Saved Celebrations</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Your personal festival collection, complete with reminders, local notes, and calendar synchronizations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {onSwitchToWidgetsTab && (
                  <button
                    onClick={onSwitchToWidgetsTab}
                    className="text-xs font-bold text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition flex items-center gap-1.5"
                    title="Setup iOS or Android widget for your bookmarked holidays"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add to</span> Phone Widgets →
                  </button>
                )}
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800">
                  {savedHolidaysWithDetails.length} Bookmarked
                </div>
              </div>
            </div>

            {savedHolidaysWithDetails.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedHolidaysWithDetails.map(({ holiday, reminder }) => (
                  <div
                    key={holiday.id}
                    className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 hover:border-rose-300 dark:hover:border-rose-700 transition space-y-3 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-3">
                        <img
                          src={holiday.bannerUrl}
                          alt={holiday.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              {holiday.category}
                            </span>
                            <span className="text-xs text-stone-400 font-mono">{holiday.date}</span>
                          </div>
                          <h4 
                            onClick={() => onSelectHoliday(holiday)}
                            className="text-base font-bold text-stone-900 dark:text-white truncate mt-1 cursor-pointer hover:text-rose-600 transition"
                          >
                            {holiday.name}
                          </h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                            <span>{holiday.country}</span>
                          </p>
                        </div>
                      </div>

                      {reminder.notes && (
                        <div className="mt-3 p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-700/80 text-xs text-stone-600 dark:text-stone-300 italic">
                          &quot;{reminder.notes}&quot;
                        </div>
                      )}
                    </div>

                    {/* Actions & Calendar Links */}
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-700/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onSyncGoogleCalendar(holiday)}
                          className="py-1.5 px-2.5 rounded-lg bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200 dark:border-stone-600 shadow-xs flex items-center gap-1.5 transition"
                          title="Add to Google Calendar"
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-rose-500" />
                          <span>Google Cal</span>
                        </button>

                        <button
                          onClick={() => {
                            downloadIcsFile(holiday);
                            confetti({ particleCount: 25, spread: 45 });
                          }}
                          className="py-1.5 px-2 rounded-lg bg-white dark:bg-stone-700 hover:bg-stone-100 dark:hover:bg-stone-600 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200 dark:border-stone-600 shadow-xs flex items-center gap-1 transition"
                          title="Download Apple / Outlook .ICS file"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>.ICS</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onSelectHoliday(holiday)}
                          className="py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xs flex items-center gap-1 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={() => onToggleBookmark(holiday.id)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center mx-auto">
                  <Bookmark className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                  No Saved Holidays Yet
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                  Browse the calendar or 3D globe to discover festivities. Tap the bookmark icon to save dates and set personalized preparation reminders.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. SUB-TAB: COMMUNITY ACTIVITY HISTORY */}
      {profileSubTab === 'community' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-emerald-500" />
                  <span>Your Community Contribution History</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Chronicle of cultural stories, festive recipes, and traditions you have shared with the global community.
                </p>
              </div>

              {onNavigateToCommunity && (
                <button
                  onClick={onNavigateToCommunity}
                  className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Open Community Board</span>
                </button>
              )}
            </div>

            {/* Authored Stories */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>Stories & Memories Authored ({userAuthoredPosts.length})</span>
              </h4>

              {userAuthoredPosts.length > 0 ? (
                <div className="space-y-3">
                  {userAuthoredPosts.map(post => (
                    <div
                      key={post.id}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-750 space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900 dark:text-white">
                              {post.title}
                            </span>
                            {post.isEncrypted && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300/40 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" />
                                E2EE Secured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                            Festival: {post.holidayName}
                          </p>
                        </div>
                        <span className="text-xs text-stone-400 shrink-0">{post.timestamp}</span>
                      </div>

                      <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                        {post.content}
                      </p>

                      <div className="pt-2 border-t border-stone-200 dark:border-stone-700/80 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                            {post.likes} Applauds
                          </span>
                          <span>•</span>
                          <span>{post.comments.length} Comments</span>
                        </div>
                        <span className="text-[11px] text-stone-400">Published Worldwide</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-dashed border-stone-300 dark:border-stone-700 text-center space-y-2">
                  <MessageSquare className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    You haven&apos;t shared any community celebration stories yet. Join the conversation on the Community tab!
                  </p>
                </div>
              )}
            </div>

            {/* Applauded / Liked Festivities */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <h4 className="font-bold text-sm text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Applauded Community Stories ({userLikedPosts.length})</span>
              </h4>

              {userLikedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userLikedPosts.map(lp => (
                    <div
                      key={lp.id}
                      className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/60 space-y-1"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900 dark:text-white truncate">
                          {lp.title}
                        </span>
                        <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">
                          ❤️ Liked
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        By {lp.author} ({lp.authorCountry}) • {lp.holidayName}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  You haven&apos;t applauded any stories yet. Explore the community tab to show support!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
