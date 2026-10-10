import { FestiveStreakData } from '../types';

const STREAK_STORAGE_KEY = 'worldfest_festive_streak_v1';

export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getPastDateString(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getInitialStreak(): FestiveStreakData {
  const today = getTodayString();
  const yesterday = getPastDateString(1);
  const twoDaysAgo = getPastDateString(2);
  const threeDaysAgo = getPastDateString(3);

  // Default to a vibrant 4-day streak for fresh sessions so users immediately experience the rising fire aesthetic
  return {
    currentStreak: 4,
    longestStreak: 7,
    lastLoginDate: today,
    history: [threeDaysAgo, twoDaysAgo, yesterday, today],
    freezesRemaining: 2,
    traditionsExploredToday: 2,
    unlockedMilestones: ['milestone-3-days']
  };
}

export function loadStreakData(): FestiveStreakData {
  try {
    const raw = localStorage.getItem(STREAK_STORAGE_KEY);
    if (!raw) {
      const initial = getInitialStreak();
      saveStreakData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.currentStreak !== 'number') {
      return getInitialStreak();
    }
    return parsed;
  } catch {
    return getInitialStreak();
  }
}

export function saveStreakData(data: FestiveStreakData): void {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function checkAndUpdateStreak(): { 
  streak: FestiveStreakData; 
  isNewDay: boolean; 
  streakIncreased: boolean; 
  freezeUsed: boolean;
} {
  const currentData = loadStreakData();
  const today = getTodayString();
  const yesterday = getPastDateString(1);

  if (currentData.lastLoginDate === today) {
    return {
      streak: currentData,
      isNewDay: false,
      streakIncreased: false,
      freezeUsed: false
    };
  }

  let streakIncreased = false;
  let freezeUsed = false;
  let newStreak = currentData.currentStreak;

  if (currentData.lastLoginDate === yesterday) {
    // Logged in yesterday -> increment streak!
    newStreak += 1;
    streakIncreased = true;
  } else {
    // Gap of more than 1 day
    if (currentData.freezesRemaining > 0) {
      // Consume a freeze to protect the streak!
      currentData.freezesRemaining -= 1;
      freezeUsed = true;
      newStreak += 1;
      streakIncreased = true;
    } else {
      // Streak broken, restart at 1
      newStreak = 1;
    }
  }

  const updatedHistory = Array.from(new Set([...currentData.history, today]));
  const updatedLongest = Math.max(currentData.longestStreak, newStreak);

  // Check milestones
  const milestones = [...(currentData.unlockedMilestones || [])];
  if (newStreak >= 3 && !milestones.includes('milestone-3-days')) milestones.push('milestone-3-days');
  if (newStreak >= 7 && !milestones.includes('milestone-7-days')) milestones.push('milestone-7-days');
  if (newStreak >= 14 && !milestones.includes('milestone-14-days')) milestones.push('milestone-14-days');
  if (newStreak >= 30 && !milestones.includes('milestone-30-days')) milestones.push('milestone-30-days');

  const updatedData: FestiveStreakData = {
    ...currentData,
    currentStreak: newStreak,
    longestStreak: updatedLongest,
    lastLoginDate: today,
    history: updatedHistory,
    traditionsExploredToday: 0,
    unlockedMilestones: milestones
  };

  saveStreakData(updatedData);

  return {
    streak: updatedData,
    isNewDay: true,
    streakIncreased,
    freezeUsed
  };
}

export function recordTraditionExplored(): FestiveStreakData {
  const current = loadStreakData();
  const updated: FestiveStreakData = {
    ...current,
    traditionsExploredToday: (current.traditionsExploredToday || 0) + 1
  };
  saveStreakData(updated);
  return updated;
}

export interface StreakTierInfo {
  tier: 1 | 2 | 3 | 4;
  title: string;
  badgeName: string;
  minStreak: number;
  nextMilestone: number;
  colorName: string;
  flameSizeClass: string;
  glowClass: string;
  particleCount: number;
  description: string;
}

export function getStreakTier(streak: number): StreakTierInfo {
  if (streak >= 15) {
    return {
      tier: 4,
      title: 'Celestial Astral Flame',
      badgeName: 'Global Luminary',
      minStreak: 15,
      nextMilestone: 30,
      colorName: 'text-violet-400',
      flameSizeClass: 'w-10 h-10 sm:w-12 sm:h-12',
      glowClass: 'shadow-violet-500/50 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]',
      particleCount: 28,
      description: 'Supreme cultural devotion! A transcendent violet-gold astral fire blazing across all continents.'
    };
  }
  if (streak >= 8) {
    return {
      tier: 3,
      title: 'Inferno of Traditions',
      badgeName: 'Torchbearer',
      minStreak: 8,
      nextMilestone: 15,
      colorName: 'text-rose-500',
      flameSizeClass: 'w-9 h-9 sm:w-11 sm:h-11',
      glowClass: 'shadow-rose-500/50 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]',
      particleCount: 18,
      description: 'Roaring celebration! Your continuous devotion illuminates global heritage worldwide.'
    };
  }
  if (streak >= 4) {
    return {
      tier: 2,
      title: 'Rising Blaze',
      badgeName: 'Heritage Seeker',
      minStreak: 4,
      nextMilestone: 8,
      colorName: 'text-orange-500',
      flameSizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
      glowClass: 'shadow-orange-500/40 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]',
      particleCount: 10,
      description: 'Bright and steady! You are consistently uncovering sacred rites and folklore.'
    };
  }
  return {
    tier: 1,
    title: 'Kindling Ember',
    badgeName: 'Curious Novice',
    minStreak: 1,
    nextMilestone: 4,
    colorName: 'text-amber-500',
    flameSizeClass: 'w-7 h-7 sm:w-9 sm:h-9',
    glowClass: 'shadow-amber-500/30 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]',
    particleCount: 5,
    description: 'A glowing spark ignited. Log in daily to feed the cultural hearth.'
  };
}
