import { Continent, CulturalBadge, CulturalExplorerProgress, Holiday } from '../types';

// Map country codes and country names to continent
export const getContinentForHoliday = (holiday: Holiday): Continent => {
  const code = (holiday.countryCode || '').toUpperCase().trim();
  const country = (holiday.country || '').toLowerCase();

  // Explicit country code mapping
  const continentByCode: Record<string, Continent> = {
    // Asia
    IN: 'Asia', CN: 'Asia', JP: 'Asia', TH: 'Asia', SA: 'Asia', AE: 'Asia',
    KR: 'Asia', VN: 'Asia', ID: 'Asia', SG: 'Asia', IL: 'Asia', TR: 'Asia',
    IR: 'Asia', PH: 'Asia', MY: 'Asia', PK: 'Asia', BD: 'Asia', NP: 'Asia',
    LK: 'Asia', MM: 'Asia', KH: 'Asia', QA: 'Asia', KW: 'Asia', OM: 'Asia',

    // Europe
    IE: 'Europe', DE: 'Europe', ES: 'Europe', IT: 'Europe', SE: 'Europe',
    GB: 'Europe', UK: 'Europe', FR: 'Europe', GR: 'Europe', PT: 'Europe',
    NL: 'Europe', BE: 'Europe', NO: 'Europe', DK: 'Europe', PL: 'Europe',
    RU: 'Europe', AT: 'Europe', CH: 'Europe', FI: 'Europe', CZ: 'Europe',
    HU: 'Europe', RO: 'Europe', IS: 'Europe', UA: 'Europe',

    // Africa
    EG: 'Africa', NG: 'Africa', ZA: 'Africa', ET: 'Africa', KE: 'Africa',
    GH: 'Africa', MA: 'Africa', SN: 'Africa', TZ: 'Africa', RW: 'Africa',
    UG: 'Africa', CI: 'Africa', DZ: 'Africa', TN: 'Africa', CM: 'Africa',
    ZW: 'Africa', SZ: 'Africa', AO: 'Africa',

    // North America
    US: 'North America', MX: 'North America', CA: 'North America',
    CU: 'North America', JM: 'North America', GT: 'North America',
    CR: 'North America', PA: 'North America', DO: 'North America',

    // South America
    BR: 'South America', PE: 'South America', CO: 'South America',
    AR: 'South America', CL: 'South America', BO: 'South America',
    EC: 'South America', UY: 'South America', VE: 'South America',
    PY: 'South America',

    // Oceania
    AU: 'Oceania', NZ: 'Oceania', FJ: 'Oceania', WS: 'Oceania',
    TO: 'Oceania', PG: 'Oceania', VU: 'Oceania',

    // Global / International
    UN: 'Global', INT: 'Global', GLOBAL: 'Global'
  };

  if (continentByCode[code]) {
    return continentByCode[code];
  }

  // Fallback by country text inspection
  if (country.includes('india') || country.includes('china') || country.includes('japan') || country.includes('thailand') || country.includes('asia') || country.includes('korea') || country.includes('saudi') || country.includes('vietnam')) {
    return 'Asia';
  }
  if (country.includes('ireland') || country.includes('germany') || country.includes('spain') || country.includes('italy') || country.includes('france') || country.includes('europe') || country.includes('britain') || country.includes('scotland') || country.includes('sweden')) {
    return 'Europe';
  }
  if (country.includes('nigeria') || country.includes('ethiopia') || country.includes('egypt') || country.includes('kenya') || country.includes('ghana') || country.includes('africa') || country.includes('south africa') || country.includes('morocco')) {
    return 'Africa';
  }
  if (country.includes('mexico') || country.includes('united states') || country.includes('usa') || country.includes('canada') || country.includes('caribbean')) {
    return 'North America';
  }
  if (country.includes('brazil') || country.includes('peru') || country.includes('colombia') || country.includes('argentina') || country.includes('chile') || country.includes('latin america') || country.includes('south america')) {
    return 'South America';
  }
  if (country.includes('australia') || country.includes('zealand') || country.includes('fiji') || country.includes('samoa') || country.includes('pacific') || country.includes('oceania')) {
    return 'Oceania';
  }
  if (country.includes('united nations') || country.includes('worldwide') || country.includes('global') || country.includes('international')) {
    return 'Global';
  }

  return 'Global';
};

// All available digital achievement badges in the Cultural Explorer system
export const CULTURAL_BADGES: CulturalBadge[] = [
  {
    id: 'first-footsteps',
    title: 'First Footsteps',
    subtitle: 'Novice Cultural Explorer',
    description: 'Began the cultural journey by reading your very first world holiday tradition.',
    requiredCount: 1,
    category: 'voyager',
    icon: 'Compass',
    tier: 'bronze',
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 'asia-voyager',
    title: 'Silk Road Voyager',
    subtitle: 'Asian Heritage Explorer',
    description: 'Read 2 or more traditional festivals originating across the Asian continent.',
    continent: 'Asia',
    requiredCount: 2,
    category: 'continent',
    icon: 'Sparkles',
    tier: 'silver',
    color: 'from-red-500 to-amber-600'
  },
  {
    id: 'europe-scholar',
    title: 'Old World Scholar',
    subtitle: 'European Folklore Explorer',
    description: 'Read 2 or more historic holidays and folk customs across Europe.',
    continent: 'Europe',
    requiredCount: 2,
    category: 'continent',
    icon: 'BookOpen',
    tier: 'silver',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'africa-pioneer',
    title: 'Cradle of Humanity',
    subtitle: 'African Traditions Explorer',
    description: 'Read 2 or more celebrations originating across the African continent.',
    continent: 'Africa',
    requiredCount: 2,
    category: 'continent',
    icon: 'Sun',
    tier: 'silver',
    color: 'from-amber-600 to-emerald-600'
  },
  {
    id: 'north-america-explorer',
    title: 'Northern Horizons',
    subtitle: 'North American Heritage Explorer',
    description: 'Read 2 or more festivities rooted in North American indigenous & modern cultures.',
    continent: 'North America',
    requiredCount: 2,
    category: 'continent',
    icon: 'MapPin',
    tier: 'silver',
    color: 'from-teal-500 to-cyan-700'
  },
  {
    id: 'south-america-explorer',
    title: 'Andes & Amazon Wayfarer',
    subtitle: 'South American Heritage Explorer',
    description: 'Read 2 or more vibrant celebrations and carnivals from South America.',
    continent: 'South America',
    requiredCount: 2,
    category: 'continent',
    icon: 'Flame',
    tier: 'silver',
    color: 'from-emerald-500 to-teal-700'
  },
  {
    id: 'oceania-voyager',
    title: 'Pacific Wayfinder',
    subtitle: 'Oceania & Island Explorer',
    description: 'Read 1 or more island celebrations and indigenous festivals from Oceania.',
    continent: 'Oceania',
    requiredCount: 1,
    category: 'continent',
    icon: 'Waves',
    tier: 'bronze',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'continental-triad',
    title: 'Continental Triad',
    subtitle: 'Cross-Continental Explorer',
    description: 'Expanded your worldview by exploring holidays across at least 3 distinct continents.',
    requiredCount: 3,
    category: 'voyager',
    icon: 'Globe2',
    tier: 'gold',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'grand-globetrotter',
    title: 'Grand Globetrotter',
    subtitle: 'World Citizen Master',
    description: 'Explored diverse traditions across 5 or more different continents.',
    requiredCount: 5,
    category: 'mastery',
    icon: 'Award',
    tier: 'diamond',
    color: 'from-rose-500 to-amber-500'
  },
  {
    id: 'cultural-polymath',
    title: 'Cultural Polymath',
    subtitle: 'Heritage Master Scholar',
    description: 'Read in-depth details for 8 or more world celebrations across the global calendar.',
    requiredCount: 8,
    category: 'mastery',
    icon: 'Trophy',
    tier: 'diamond',
    color: 'from-amber-400 via-rose-500 to-purple-600'
  },
  {
    id: 'quiz-novice',
    title: 'Trivia Trainee',
    subtitle: 'Lore Apprentice',
    description: 'Earned 100 or more Cultural Explorer trivia challenge bonus points.',
    requiredCount: 100,
    category: 'voyager',
    icon: 'Award',
    tier: 'bronze',
    color: 'from-amber-500 to-emerald-600'
  },
  {
    id: 'quiz-master',
    title: 'Cultural Lore Virtuoso',
    subtitle: 'Global Trivia Master',
    description: 'Earned 500 or more Cultural Explorer quiz bonus points through daily trivia challenges.',
    requiredCount: 500,
    category: 'mastery',
    icon: 'Sparkles',
    tier: 'gold',
    color: 'from-indigo-600 via-rose-500 to-amber-400'
  }
];

const STORAGE_KEY = 'worldfest_cultural_explorer_v1';

export const getInitialProgress = (): CulturalExplorerProgress => {
  return {
    viewedHolidayIds: [],
    continentCounts: {
      Asia: 0,
      Europe: 0,
      Africa: 0,
      'North America': 0,
      'South America': 0,
      Oceania: 0,
      'Middle East': 0,
      Global: 0
    },
    unlockedBadgeIds: [],
    unlockedTimestamps: {},
    quizBonusPoints: 0,
    quizzesCompleted: 0,
    highestQuizStreak: 0
  };
};

export const loadExplorerProgress = (): CulturalExplorerProgress => {
  if (typeof window === 'undefined') return getInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw);
    return {
      viewedHolidayIds: Array.isArray(parsed.viewedHolidayIds) ? parsed.viewedHolidayIds : [],
      continentCounts: {
        Asia: parsed.continentCounts?.Asia || 0,
        Europe: parsed.continentCounts?.Europe || 0,
        Africa: parsed.continentCounts?.Africa || 0,
        'North America': parsed.continentCounts?.['North America'] || 0,
        'South America': parsed.continentCounts?.['South America'] || 0,
        Oceania: parsed.continentCounts?.Oceania || 0,
        'Middle East': parsed.continentCounts?.['Middle East'] || 0,
        Global: parsed.continentCounts?.Global || 0
      },
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
      unlockedTimestamps: parsed.unlockedTimestamps || {},
      quizBonusPoints: typeof parsed.quizBonusPoints === 'number' ? parsed.quizBonusPoints : 0,
      quizzesCompleted: typeof parsed.quizzesCompleted === 'number' ? parsed.quizzesCompleted : 0,
      highestQuizStreak: typeof parsed.highestQuizStreak === 'number' ? parsed.highestQuizStreak : 0
    };
  } catch (e) {
    console.error('Failed to load cultural explorer progress:', e);
    return getInitialProgress();
  }
};

export const saveExplorerProgress = (progress: CulturalExplorerProgress): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save cultural explorer progress:', e);
  }
};

// Check which badges should be unlocked given current counts and views
export const evaluateBadges = (
  progress: CulturalExplorerProgress
): { updatedProgress: CulturalExplorerProgress; newlyUnlocked: CulturalBadge[] } => {
  const newlyUnlocked: CulturalBadge[] = [];
  const updatedUnlockedBadgeIds = [...progress.unlockedBadgeIds];
  const updatedTimestamps = { ...progress.unlockedTimestamps };

  const totalHolidaysViewed = progress.viewedHolidayIds.length;
  // Distinct continents with at least 1 holiday read (excluding purely Global or including it if valid)
  const distinctContinentsCount = (Object.keys(progress.continentCounts) as Continent[])
    .filter(c => c !== 'Global' && progress.continentCounts[c] > 0).length;

  for (const badge of CULTURAL_BADGES) {
    if (updatedUnlockedBadgeIds.includes(badge.id)) continue;

    let isUnlocked = false;

    if (badge.id === 'first-footsteps') {
      isUnlocked = totalHolidaysViewed >= 1;
    } else if (badge.continent && badge.continent !== 'All') {
      const count = progress.continentCounts[badge.continent] || 0;
      isUnlocked = count >= badge.requiredCount;
    } else if (badge.id === 'continental-triad') {
      isUnlocked = distinctContinentsCount >= badge.requiredCount;
    } else if (badge.id === 'grand-globetrotter') {
      isUnlocked = distinctContinentsCount >= badge.requiredCount;
    } else if (badge.id === 'cultural-polymath') {
      isUnlocked = totalHolidaysViewed >= badge.requiredCount;
    } else if (badge.id === 'quiz-novice' || badge.id === 'quiz-master') {
      const pts = progress.quizBonusPoints || 0;
      isUnlocked = pts >= badge.requiredCount;
    }

    if (isUnlocked) {
      updatedUnlockedBadgeIds.push(badge.id);
      updatedTimestamps[badge.id] = new Date().toISOString();
      newlyUnlocked.push(badge);
    }
  }

  const updatedProgress: CulturalExplorerProgress = {
    ...progress,
    unlockedBadgeIds: updatedUnlockedBadgeIds,
    unlockedTimestamps: updatedTimestamps
  };

  return { updatedProgress, newlyUnlocked };
};

// Register that a holiday was read by the user
export const recordHolidayRead = (
  holiday: Holiday,
  currentProgress: CulturalExplorerProgress
): { progress: CulturalExplorerProgress; newlyUnlocked: CulturalBadge[] } => {
  // If already viewed, still evaluate just in case, but avoid double counting
  const alreadyViewed = currentProgress.viewedHolidayIds.includes(holiday.id);
  const continent = getContinentForHoliday(holiday);

  let updatedProgress: CulturalExplorerProgress = {
    ...currentProgress,
    viewedHolidayIds: alreadyViewed
      ? currentProgress.viewedHolidayIds
      : [...currentProgress.viewedHolidayIds, holiday.id],
    continentCounts: {
      ...currentProgress.continentCounts,
      [continent]: alreadyViewed
        ? currentProgress.continentCounts[continent]
        : (currentProgress.continentCounts[continent] || 0) + 1
    }
  };

  const evalResult = evaluateBadges(updatedProgress);
  saveExplorerProgress(evalResult.updatedProgress);

  return {
    progress: evalResult.updatedProgress,
    newlyUnlocked: evalResult.newlyUnlocked
  };
};

// Register quiz bonus points earned
export const recordQuizCompletion = (
  pointsEarned: number,
  streakAchieved: number,
  currentProgress: CulturalExplorerProgress
): { progress: CulturalExplorerProgress; newlyUnlocked: CulturalBadge[] } => {
  const currentBonus = currentProgress.quizBonusPoints || 0;
  const currentCompleted = currentProgress.quizzesCompleted || 0;
  const currentHighest = currentProgress.highestQuizStreak || 0;

  const updatedProgress: CulturalExplorerProgress = {
    ...currentProgress,
    quizBonusPoints: currentBonus + pointsEarned,
    quizzesCompleted: currentCompleted + 1,
    highestQuizStreak: Math.max(currentHighest, streakAchieved)
  };

  const evalResult = evaluateBadges(updatedProgress);
  saveExplorerProgress(evalResult.updatedProgress);

  return {
    progress: evalResult.updatedProgress,
    newlyUnlocked: evalResult.newlyUnlocked
  };
};

// Compute progress percentage and status for a specific badge
export const getBadgeProgress = (
  badge: CulturalBadge,
  progress: CulturalExplorerProgress
): { current: number; total: number; percent: number; isUnlocked: boolean } => {
  const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);
  const total = badge.requiredCount;

  let current = 0;
  if (badge.id === 'first-footsteps') {
    current = Math.min(progress.viewedHolidayIds.length, total);
  } else if (badge.continent && badge.continent !== 'All') {
    current = Math.min(progress.continentCounts[badge.continent] || 0, total);
  } else if (badge.id === 'continental-triad' || badge.id === 'grand-globetrotter') {
    const distinct = (Object.keys(progress.continentCounts) as Continent[])
      .filter(c => c !== 'Global' && progress.continentCounts[c] > 0).length;
    current = Math.min(distinct, total);
  } else if (badge.id === 'cultural-polymath') {
    current = Math.min(progress.viewedHolidayIds.length, total);
  } else if (badge.id === 'quiz-novice' || badge.id === 'quiz-master') {
    current = Math.min(progress.quizBonusPoints || 0, total);
  }

  const percent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 100;
  return { current, total, percent, isUnlocked };
};

// Compute overall explorer rank and title
export const getExplorerRank = (unlockedCount: number): { rank: string; level: number; nextTarget: number } => {
  if (unlockedCount >= 9) return { rank: 'Grand Cultural Ambassador', level: 5, nextTarget: 10 };
  if (unlockedCount >= 6) return { rank: 'Distinguished Globetrotter', level: 4, nextTarget: 9 };
  if (unlockedCount >= 4) return { rank: 'Continental Voyager', level: 3, nextTarget: 6 };
  if (unlockedCount >= 2) return { rank: 'Heritage Pathmaker', level: 2, nextTarget: 4 };
  if (unlockedCount >= 1) return { rank: 'Curious Wanderer', level: 1, nextTarget: 2 };
  return { rank: 'Aspiring Explorer', level: 0, nextTarget: 1 };
};
