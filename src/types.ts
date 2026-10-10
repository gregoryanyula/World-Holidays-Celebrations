export interface Holiday {
  id: string;
  name: string;
  localName?: string;
  date: string; // YYYY-MM-DD
  month: number; // 1 - 12
  day: number;
  country: string;
  countryCode: string;
  category: 'cultural' | 'national' | 'religious' | 'international' | 'seasonal' | 'un_day';
  description: string;
  traditions: string[];
  greeting: string;
  foodDelicacies: string[];
  bannerUrl: string;
  videoHighlightsUrl?: string;
  tags: string[];
  facts: string[];
  popularityScore: number;
  latitude?: number;
  longitude?: number;
  originHistory?: string;
  soundscape?: HolidaySoundscape;
  respectGuidelines?: HolidayRespectGuidelines;
  celebrationEpicenter?: CelebrationEpicenter;
  traditionalAttire?: TraditionalAttireData;
  weatherProfile?: HolidayWeatherProfile;
  festivePeak?: FestivePeakInfo;
  arDecorItem?: WebARDecorItem;
}

export interface HolidayWeatherProfile {
  tempCelsius: string;
  tempFahrenheit: string;
  climate: string;
  rainRisk: 'Low' | 'Moderate' | 'High';
  bestTravelWindow: string;
  recommendedPacking: string[];
}

export interface FestivePeakInfo {
  peakDays: string;
  peakTimeOfDay: 'Morning' | 'Afternoon' | 'Twilight / Evening' | 'Midnight' | 'All-Day';
  crowdLevel: 'Bustling' | 'High Energy' | 'Very High' | 'Intimate / Serene';
  bestViewingSpot?: string;
  recommendedDurationDays: number;
}

export interface WebARDecorItem {
  id: string;
  name: string;
  modelType: 'diya_lamp' | 'sugar_skull' | 'lantern' | 'shamrock' | 'menorah' | 'crescent_lantern' | 'christmas_tree' | 'feathered_mask' | 'cherry_blossom' | 'maypole' | 'beer_stein' | 'fireworks_sparkler' | 'golden_lotus' | 'sacred_chalice';
  festiveAuraColor: string;
  scaleDefault: number;
  description: string;
}

export interface VacationPlanSuggestion {
  holidayId: string;
  holidayName: string;
  country: string;
  countryCode: string;
  date: string;
  suggestedArrivalDate: string;
  suggestedDepartureDate: string;
  totalDays: number;
  ptoDaysNeeded: number;
  recommendedSeason: string;
  weatherSummary: string;
  peakMoment: string;
  crowdLevel: string;
  flightBookingDeadline: string;
  budgetAdvisor: string;
  packingList: string[];
  bannerUrl: string;
}

export interface CelebrationEpicenter {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  zoomLevel: number;
  epicenterName: string;
  significance: string;
  historicDistrict?: string;
}

export interface AttireColorPalette {
  name: string;
  hex: string;
  meaning: string;
}

export interface AttireGarment {
  id: string;
  name: string;
  nativeTerm?: string;
  ensembleType: 'feminine' | 'masculine' | 'unisex' | 'ceremonial' | 'accessory';
  categoryLabel: string;
  description: string;
  fabrics: string[];
  colors: string[];
  culturalSignificance: string;
  motifsOrPatterns?: string;
  placeholderVisualUrl: string;
  placeholderAltText: string;
  accentColor: string;
}

export interface TraditionalAttireData {
  holidayId: string;
  holidayName: string;
  country: string;
  overview: string;
  historicalContext: string;
  auspiciousColors: AttireColorPalette[];
  garments: AttireGarment[];
  adornmentsAndJewelry: string[];
  visitorEtiquetteTips: {
    canVisitorsWear: string;
    dos: string[];
    donts: string[];
  };
  modernAdaptations?: string;
}

export interface HolidaySoundscape {
  title: string;
  instrument: string;
  description: string;
  genre: string;
  preset: 'sitar_bells' | 'mariachi_brass' | 'guzheng_firecrackers' | 'oud_breeze' | 'bavarian_polka' | 'batucada_samba' | 'thai_water' | 'celtic_whistle' | 'klezmer_chimes' | 'andean_panpipes' | 'scandi_folk' | 'african_djembe' | 'choral_carols' | 'persian_santur' | 'taiko_flute' | 'hearthside_strings';
  presetKey?: 'sitar_bells' | 'mariachi_brass' | 'guzheng_firecrackers' | 'oud_breeze' | 'bavarian_polka' | 'batucada_samba' | 'thai_water' | 'celtic_whistle' | 'klezmer_chimes' | 'andean_panpipes' | 'scandi_folk' | 'african_djembe' | 'choral_carols' | 'persian_santur' | 'taiko_flute' | 'hearthside_strings';
  audioUrl?: string;
}

export interface HolidayRespectGuidelines {
  dos: string[];
  donts: string[];
  travelTip: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  holidayId: string;
  holidayName: string;
  category: string;
  culturalInsight: string;
}

export interface RecipeIngredient {
  item: string;
  amount: string;
  category: 'Produce' | 'Pantry' | 'Spices' | 'Dairy' | 'Meat/Seafood';
}

export interface Recipe {
  id: string;
  holidayId: string;
  holidayName: string;
  name: string;
  localName?: string;
  description: string;
  origin: string;
  culturalSignificance: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  dietary: string[];
  ingredients: RecipeIngredient[];
  instructions: string[];
  chefTips: string[];
  imageUrl: string;
}

export interface ShoppingListItem {
  id: string;
  holidayId: string;
  recipeName: string;
  item: string;
  amount: string;
  category: string;
  checked: boolean;
  addedAt: string;
}

export interface EncryptedFileItem {
  id: string;
  filename: string;
  mimeType: string;
  size: number;
  encryptedData: string; // base64
  iv: string; // base64
  uploadedAt: string;
  holidayId?: string;
  holidayName?: string;
  notes?: string;
}

export interface PrivacyComplianceState {
  consentGiven: boolean;
  necessaryCookies: boolean;
  analyticsEnabled: boolean;
  festiveReminders: boolean;
  ccpaDoNotSell: boolean;
  auditLogs: Array<{ action: string; timestamp: string; details: string }>;
}

export interface UserEventReminder {
  id: string;
  holidayId: string;
  holidayName: string;
  date: string;
  notifyDaysBefore: number;
  customReminderTime?: string; // e.g. "09:00"
  notes: string;
  addedAt: string;
  syncedToGoogleCalendar?: boolean;
  googleCalendarEventId?: string;
  hasNativeIcsExported?: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorCountry: string;
  avatar: string;
  holidayId: string;
  holidayName: string;
  title: string;
  content: string;
  likes: number;
  likedByMe?: boolean;
  timestamp: string;
  tags: string[];
  comments: CommunityComment[];
  isEncrypted?: boolean;
}

export interface CommunityComment {
  id: string;
  author: string;
  authorCountry: string;
  content: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'reminder' | 'trending' | 'announcement' | 'security' | 'privacy';
  read: boolean;
  actionHolidayId?: string;
  isCritical?: boolean;
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'zh' | 'hi' | 'ar' | 'de' | 'ja' | 'pt';

export interface UserPreferences {
  darkMode: boolean;
  language: SupportedLanguage;
  countryFilter: string;
  categoryFilter: string;
  pushNotificationsEnabled: boolean;
  soundAlertsEnabled?: boolean;
  e2eEncryptionEnabled: boolean;
  offlineReady: boolean;
  lowBandwidthMode?: boolean;
  lastCloudSync?: string;
  bookmarkedHolidays?: string[];
}

export type Continent = 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania' | 'Middle East' | 'Global';

export interface CulturalBadge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  continent?: Continent | 'All';
  requiredCount: number;
  category: 'continent' | 'voyager' | 'mastery';
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'diamond';
  color: string;
}

export type AppTab = 'explore' | 'showcase' | 'decor' | 'countries' | 'calendar' | 'planner' | 'heatmap' | 'community' | 'quiz' | 'insights' | 'settings';

export interface DecorRentalPackage {
  id: string;
  holidayId: string;
  holidayName: string;
  title: string;
  theme: string;
  basePrice: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  itemsIncluded: string[];
  dimensionsAndSpecs: string;
  recommendedAudienceSize: string;
  depositAmount: number;
  isPopular?: boolean;
}

export interface FestiveStreakData {
  currentStreak: number;
  longestStreak: number;
  lastLoginDate: string; // YYYY-MM-DD
  history: string[]; // List of YYYY-MM-DD dates completed
  freezesRemaining: number;
  traditionsExploredToday: number;
  unlockedMilestones: string[];
}

export interface CulturalExplorerProgress {
  viewedHolidayIds: string[];
  continentCounts: Record<Continent, number>;
  unlockedBadgeIds: string[];
  unlockedTimestamps: Record<string, string>; // badgeId -> ISO string
  quizBonusPoints?: number;
  quizzesCompleted?: number;
  highestQuizStreak?: number;
}

export interface HolidayWeatherInfo {
  temperature: number;
  apparentTemperature?: number;
  humidity: number;
  windSpeed: number;
  precipitation?: number;
  weatherCode: number;
  conditionDescription: string;
  seasonName: string;
  seasonTypicalHigh: number;
  seasonTypicalLow: number;
  eventDateConditionNotes: string;
  isDaytime?: boolean;
  isOfflineEstimated?: boolean;
  fetchedAt: string;
}
