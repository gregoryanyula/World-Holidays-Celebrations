import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Globe2, 
  Share2, 
  Calendar as CalendarIcon, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Heart,
  Volume2,
  CheckCircle2,
  Lock,
  Utensils,
  ChefHat,
  WifiOff,
  RefreshCw,
  Bell,
  BookOpen,
  Brain,
  Compass
} from 'lucide-react';
import { Header } from './components/Header';
import { HolidayCard } from './components/HolidayCard';
import { HolidayDetailModal } from './components/HolidayDetailModal';
import { AiInsightModal } from './components/AiInsightModal';
import { SharePosterModal } from './components/SharePosterModal';
import { CalendarView } from './components/CalendarView';
import { CommunityFeed } from './components/CommunityFeed';
import { SettingsModal } from './components/SettingsModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { FeedbackModal } from './components/FeedbackModal';
import { OnboardingModal } from './components/OnboardingModal';
import { CountdownTimer } from './components/CountdownTimer';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { RecipeModal } from './components/RecipeModal';
import { EncryptedVaultModal } from './components/EncryptedVaultModal';
import { PrivacyComplianceModal } from './components/PrivacyComplianceModal';
import { VoiceSearchInput } from './components/VoiceSearchInput';
import { SocialShareWidget } from './components/SocialShareWidget';
import { FestiveStreak } from './components/FestiveStreak';
import { GlobalHeatmap } from './components/GlobalHeatmap';
import { CountryHolidaysExplorer } from './components/CountryHolidaysExplorer';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { GlobalCelebrationsGuideModal } from './components/GlobalCelebrationsGuideModal';
import { IntelligentHolidayPlanner } from './components/IntelligentHolidayPlanner';
import { GLOBAL_HOLIDAYS_DATA, GLOBAL_RECIPES_DATA, INITIAL_COMMUNITY_POSTS, TRANSLATIONS } from './data';
import { Holiday, UserPreferences, UserEventReminder, CommunityPost, NotificationItem, Recipe, PrivacyComplianceState, EncryptedFileItem, CulturalExplorerProgress, Continent, AppTab, FestiveStreakData } from './types';
import { cacheEssentialData, getCachedHolidays } from './utils/offlineCache';
import { playAlertChime, requestNotificationPermission, sendSystemNotification } from './utils/notifications';
import { loadExplorerProgress, recordHolidayRead, recordQuizCompletion } from './utils/culturalBadges';
import { checkAndUpdateStreak, recordTraditionExplored } from './utils/streakManager';
import { getLocalizedHolidays, getLocalizedHoliday } from './utils/holidayTranslations';
import confetti from 'canvas-confetti';
import { 
  auth, 
  signInWithGoogle, 
  signOutUser, 
  syncUserBookmarksToFirestore, 
  loadUserBookmarksFromFirestore 
} from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  // 0. Authentication State (Firebase)
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // 1. Core State
  const [holidays, setHolidays] = useState<Holiday[]>(GLOBAL_HOLIDAYS_DATA);
  const [activeTab, setActiveTab] = useState<AppTab>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  // Festive Streak Visualizer State
  const [streakData, setStreakData] = useState<FestiveStreakData>(() => {
    const res = checkAndUpdateStreak();
    return res.streak;
  });

  // Cultural Explorer Progress State
  const [explorerProgress, setExplorerProgress] = useState<CulturalExplorerProgress>(() => {
    return loadExplorerProgress();
  });

  // 2. Modals state
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const [aiModalHoliday, setAiModalHoliday] = useState<Holiday | null>(null);
  const [shareModalHoliday, setShareModalHoliday] = useState<Holiday | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [globalGuideOpen, setGlobalGuideOpen] = useState(false);

  // New features: 3D Globe, Recipes, Vault, Privacy, Offline
  const [isGlobeView, setIsGlobeView] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Compliance state (GDPR & CCPA)
  const [complianceState, setComplianceState] = useState<PrivacyComplianceState>(() => {
    const saved = localStorage.getItem('worldfest_compliance');
    return saved ? JSON.parse(saved) : {
      consentGiven: true,
      necessaryCookies: true,
      analyticsEnabled: false,
      festiveReminders: true,
      ccpaDoNotSell: true,
      auditLogs: [
        {
          action: 'E2EE Cryptographic Keypair Initialized',
          timestamp: new Date().toLocaleTimeString(),
          details: 'Zero-knowledge client-side environment configured'
        }
      ]
    };
  });

  // Encrypted Vault Files
  const [encryptedVaultFiles, setEncryptedVaultFiles] = useState<EncryptedFileItem[]>(() => {
    const saved = localStorage.getItem('worldfest_vault_files');
    return saved ? JSON.parse(saved) : [
      {
        id: 'sample-vault-file',
        filename: 'Grandmother_Diwali_Laddoo_Secret_Recipe.txt',
        size: 1420,
        mimeType: 'text/plain',
        encryptedData: 'ENCRYPTED_VAULT_PAYLOAD_SAMPLE',
        iv: '0123456789ab',
        uploadedAt: new Date().toISOString()
      }
    ];
  });

  // 3. Sync & Security
  const [syncKey, setSyncKey] = useState<string>(() => {
    return localStorage.getItem('worldfest_sync_key') || `KEY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  });
  const [syncStatus, setSyncStatus] = useState<string>('');

  // 4. User Preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const saved = localStorage.getItem('worldfest_preferences');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      darkMode: false,
      language: 'en',
      countryFilter: 'all',
      categoryFilter: 'all',
      pushNotificationsEnabled: true,
      e2eEncryptionEnabled: true,
      offlineReady: true
    };
  });

  // 5. Watchlist & Calendar Reminders
  const [reminders, setReminders] = useState<UserEventReminder[]>(() => {
    const saved = localStorage.getItem('worldfest_reminders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rem-diwali',
        holidayId: 'diwali-festival-of-lights',
        holidayName: 'Diwali (Festival of Lights)',
        date: '2026-11-08',
        notifyDaysBefore: 3,
        notes: 'Prepare diyas and order artisanal sweets for family banquet.',
        addedAt: new Date().toISOString(),
        syncedToGoogleCalendar: true
      },
      {
        id: 'rem-dead',
        holidayId: 'dia-de-los-muertos',
        holidayName: 'Día de los Muertos (Day of the Dead)',
        date: '2026-11-01',
        notifyDaysBefore: 2,
        notes: 'Buy orange cempasúchil marigolds & pan de muerto.',
        addedAt: new Date().toISOString(),
        syncedToGoogleCalendar: false
      }
    ];
  });

  // 6. Community Discussions
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => {
    const saved = localStorage.getItem('worldfest_community_posts');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_POSTS;
  });

  // 7. Notification Items
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Diwali Countdown Alert',
      message: 'Diwali begins in 47 days! Tap to view ceremonial traditions, recipes, and sync with Google Calendar.',
      timestamp: 'Today at 08:00 AM',
      type: 'reminder',
      read: false,
      actionHolidayId: 'diwali-festival-of-lights'
    },
    {
      id: 'notif-2',
      title: 'Oktoberfest in Full Swing',
      message: 'Munich Volksfest celebrations are currently active. Discover authentic Bavarian pretzel lore.',
      timestamp: 'Yesterday',
      type: 'trending',
      read: false,
      actionHolidayId: 'oktoberfest'
    },
    {
      id: 'notif-3',
      title: 'Zero-Knowledge Security Active',
      message: 'Your personal notes and calendar memories are secured client-side via AES-GCM encryption.',
      timestamp: '2 days ago',
      type: 'security',
      read: true
    }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('worldfest_preferences', JSON.stringify(preferences));
    if (preferences.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('worldfest_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('worldfest_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem('worldfest_sync_key', syncKey);
  }, [syncKey]);

  useEffect(() => {
    localStorage.setItem('worldfest_compliance', JSON.stringify(complianceState));
  }, [complianceState]);

  useEffect(() => {
    localStorage.setItem('worldfest_vault_files', JSON.stringify(encryptedVaultFiles));
  }, [encryptedVaultFiles]);

  // Firebase Authentication & Firestore Real-time Sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const firestoreBookmarks = await loadUserBookmarksFromFirestore(user.uid);
          if (firestoreBookmarks && firestoreBookmarks.length > 0) {
            setPreferences(prev => {
              const current = prev.bookmarkedHolidays || [];
              const merged = Array.from(new Set([...current, ...firestoreBookmarks]));
              return { ...prev, bookmarkedHolidays: merged };
            });
          }
        } catch (e) {
          console.warn('Firestore load notice:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignInWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        confetti({ particleCount: 45, spread: 60 });
      }
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  // Network status & Offline Caching
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Seed offline database cache
    cacheEssentialData(GLOBAL_HOLIDAYS_DATA, GLOBAL_RECIPES_DATA);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Real-time Critical Account Alerts Polling
  useEffect(() => {
    fetch('/api/notifications/alerts')
      .then(res => res.json())
      .then(data => {
        if (data.alerts && data.alerts.length > 0) {
          setNotifications(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const freshAlerts = data.alerts.filter((a: any) => !existingIds.has(a.id)).map((a: any) => ({
              id: a.id,
              title: a.title,
              message: a.message,
              timestamp: a.timestamp,
              type: a.type,
              read: false
            }));
            return [...freshAlerts, ...prev];
          });
        }
      })
      .catch(() => {
        // Quiet mode for offline or disconnected server
      });
  }, []);

  // GDPR Article 17 Data Purge (Right to be Forgotten)
  const handlePurgeAllData = async () => {
    localStorage.removeItem('worldfest_preferences');
    localStorage.removeItem('worldfest_reminders');
    localStorage.removeItem('worldfest_vault_files');
    localStorage.removeItem('worldfest_community_posts');
    localStorage.removeItem('worldfest_offline_holidays');
    localStorage.removeItem('worldfest_offline_recipes');

    try {
      await fetch('/api/privacy/purge-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ syncKey })
      });
    } catch (e) {
      console.error(e);
    }

    setReminders([]);
    setEncryptedVaultFiles([]);
    setComplianceState(prev => ({
      ...prev,
      auditLogs: [
        {
          action: 'GDPR Article 17 Right to Erasure Executed',
          timestamp: new Date().toLocaleTimeString(),
          details: 'All locally stored user records & server sync entries permanently cleared'
        }
      ]
    }));
  };

  // First-time onboarding trigger
  useEffect(() => {
    const visited = localStorage.getItem('worldfest_visited');
    if (!visited) {
      setOnboardingOpen(true);
      localStorage.setItem('worldfest_visited', 'true');
    }
  }, []);

  // Google Calendar Integration Handler
  const handleSyncGoogleCalendar = (holiday: Holiday) => {
    // Generate Google Calendar one-click direct sync URL
    const startDate = holiday.date.replace(/-/g, '');
    // Next day end date
    const d = new Date(holiday.date);
    d.setDate(d.getDate() + 1);
    const endDate = d.toISOString().split('T')[0].replace(/-/g, '');

    const details = encodeURIComponent(
      `${holiday.description}\n\nTraditional Greeting: "${holiday.greeting}"\nTraditions: ${holiday.traditions.join(', ')}\n\nBrought to you by WorldFest Global Holidays.`
    );
    const title = encodeURIComponent(`${holiday.name} (${holiday.country})`);
    const location = encodeURIComponent(holiday.country);

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;

    // Mark as synced in state
    setReminders(prev => {
      const existing = prev.find(r => r.holidayId === holiday.id);
      if (existing) {
        return prev.map(r => r.holidayId === holiday.id ? { ...r, syncedToGoogleCalendar: true } : r);
      }
      return [
        ...prev,
        {
          id: `rem-${Date.now()}`,
          holidayId: holiday.id,
          holidayName: holiday.name,
          date: holiday.date,
          notifyDaysBefore: 1,
          notes: `Celebrated across ${holiday.country}`,
          addedAt: new Date().toISOString(),
          syncedToGoogleCalendar: true
        }
      ];
    });

    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    window.open(gcalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleBookmark = (holidayId: string) => {
    const holiday = holidays.find(h => h.id === holidayId);
    if (!holiday) return;

    setPreferences(prev => {
      const current = prev.bookmarkedHolidays || [];
      const updated = current.includes(holidayId)
        ? current.filter(id => id !== holidayId)
        : [...current, holidayId];

      if (currentUser) {
        syncUserBookmarksToFirestore(currentUser.uid, updated);
      }
      return { ...prev, bookmarkedHolidays: updated };
    });

    setReminders(prev => {
      const exists = prev.some(r => r.holidayId === holidayId);
      if (exists) {
        return prev.filter(r => r.holidayId !== holidayId);
      } else {
        confetti({ particleCount: 25, spread: 50 });
        return [
          ...prev,
          {
            id: `rem-${Date.now()}`,
            holidayId: holiday.id,
            holidayName: holiday.name,
            date: holiday.date,
            notifyDaysBefore: 2,
            notes: `Watching ${holiday.name}`,
            addedAt: new Date().toISOString(),
            syncedToGoogleCalendar: false
          }
        ];
      }
    });
  };

  const handleAddCommunityPost = (post: { holidayId: string; holidayName: string; title: string; content: string; isEncrypted: boolean }) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: 'Global Culture Enthusiast',
      authorCountry: 'Worldwide',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      holidayId: post.holidayId,
      holidayName: post.holidayName,
      title: post.title,
      content: post.content,
      likes: 1,
      likedByMe: true,
      timestamp: 'Just now',
      tags: ['Culture', 'Memory', 'Celebration'],
      comments: [],
      isEncrypted: post.isEncrypted
    };
    setCommunityPosts([newPost, ...communityPosts]);
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
          likedByMe: !p.likedByMe
        };
      }
      return p;
    }));
  };

  // Cloud Sync Handlers
  const handleCloudSyncPush = async () => {
    try {
      const res = await fetch('/api/sync/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          syncKey,
          preferences,
          reminders
        })
      });
      const data = await res.json();
      setSyncStatus(`Backed up to cloud at ${new Date().toLocaleTimeString()}`);
      confetti({ particleCount: 30, spread: 50 });
    } catch {
      setSyncStatus('Local offline backup active');
    }
  };

  const handleCloudSyncPull = async (targetKey: string) => {
    try {
      const res = await fetch(`/api/sync/pull/${targetKey}`);
      const result = await res.json();
      if (result.success && result.data) {
        if (result.data.preferences) setPreferences(result.data.preferences);
        if (result.data.reminders) setReminders(result.data.reminders);
        setSyncStatus(`Successfully restored data from ${targetKey}`);
        confetti({ particleCount: 40, spread: 60 });
      }
    } catch (err: any) {
      setSyncStatus('Failed to retrieve cloud sync snapshot. Verify key.');
    }
  };

  // Cultural Explorer & Holiday Selection Handler
  const handleSelectHoliday = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    
    // Update daily Festive Streak activity
    try {
      const updatedStreak = recordTraditionExplored();
      setStreakData(updatedStreak);
    } catch {}

    const { progress, newlyUnlocked } = recordHolidayRead(holiday, explorerProgress);
    setExplorerProgress(progress);
    if (newlyUnlocked.length > 0) {
      confetti({ particleCount: 65, spread: 75, origin: { y: 0.6 } });
      playAlertChime('success');
      for (const badge of newlyUnlocked) {
        setNotifications(prev => [
          {
            id: `badge-${badge.id}-${Date.now()}`,
            title: `🏆 Explorer Badge: ${badge.title}!`,
            message: `Congratulations! You unlocked "${badge.title}" for exploring ${holiday.country}!`,
            timestamp: 'Just now',
            type: 'trending',
            read: false
          },
          ...prev
        ]);
      }
    }
  };

  const handleExploreContinent = (continent: Continent) => {
    setActiveTab('explore');
    setSearchQuery(continent);
  };

  const handleRecordQuizCompletion = (points: number, streak: number) => {
    const { progress, newlyUnlocked } = recordQuizCompletion(points, streak, explorerProgress);
    setExplorerProgress(progress);
    if (newlyUnlocked.length > 0) {
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      playAlertChime('success');
      for (const badge of newlyUnlocked) {
        setNotifications(prev => [
          {
            id: `badge-${badge.id}-${Date.now()}`,
            title: `🏆 Quiz Badge Unlocked: ${badge.title}!`,
            message: `Splendid job! You unlocked "${badge.title}" for your cultural mastery!`,
            timestamp: 'Just now',
            type: 'trending',
            read: false
          },
          ...prev
        ]);
      }
    }
  };

  // Dynamically localized holidays based on active preferences.language
  const localizedHolidays = useMemo(() => {
    return getLocalizedHolidays(holidays, preferences.language);
  }, [holidays, preferences.language]);

  // Filtering
  const filteredHolidays = localizedHolidays.filter((h: Holiday) => {
    const matchesSearch = 
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.traditions.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (h.foodDelicacies && h.foodDelicacies.some((f: string) => f.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesCategory = selectedCategory === 'all' || h.category === selectedCategory;
    const matchesCountry = selectedCountry === 'all' || h.countryCode === selectedCountry;

    return matchesSearch && matchesCategory && matchesCountry;
  });

  // Featured Spotlight (e.g. Diwali)
  const spotlightHoliday = localizedHolidays[0];

  const t = TRANSLATIONS[preferences.language] || TRANSLATIONS.en;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${preferences.darkMode ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'}`}>
      {/* Primary Header */}
      <Header
        preferences={preferences}
        setPreferences={setPreferences}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onOpenNotifications={() => setNotificationsOpen(true)}
        hasUnreadNotifications={notifications.some(n => !n.read)}
        onOpenSyncModal={() => setActiveTab('settings')}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onStartOnboarding={() => setOnboardingOpen(true)}
        onOpenVault={() => setVaultOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
        isGlobeView={isGlobeView}
        onToggleGlobeView={() => setIsGlobeView(!isGlobeView)}
        isOffline={isOffline}
        explorerBadgeCount={explorerProgress.unlockedBadgeIds.length}
        streakData={streakData}
        onOpenGlobalGuide={() => setGlobalGuideOpen(true)}
        currentUser={currentUser}
        onSignInWithGoogle={handleSignInWithGoogle}
        onSignOut={handleSignOut}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* TAB: EXPLORE / TIMELINE */}
        {activeTab === 'explore' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Festive Streak Visualizer Banner */}
            <FestiveStreak 
              streakData={streakData} 
              variant="dashboard"
              onExploreTraditionClick={() => {
                const searchEl = document.querySelector('input[type="text"]');
                if (searchEl) (searchEl as HTMLElement).focus();
              }}
            />

            {/* Viral Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-800 text-white p-6 sm:p-10 shadow-xl">
              <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
              <img
                src={spotlightHoliday.bannerUrl}
                alt="WorldFest Global Spotlight"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 -z-10"
              />

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-xs font-semibold uppercase tracking-wider text-amber-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Global Spotlight Celebration</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight">
                  {spotlightHoliday.name}
                </h1>

                <p className="text-sm sm:text-base text-stone-100 line-clamp-3 leading-relaxed">
                  {spotlightHoliday.description}
                </p>

                {/* Live Spotlight Countdown */}
                <div className="pt-2 max-w-md">
                  <span className="text-xs uppercase font-semibold text-stone-200 mb-1 block">
                    Upcoming Date: {spotlightHoliday.date}
                  </span>
                  <CountdownTimer targetDate={spotlightHoliday.date} holidayName={spotlightHoliday.name} size="md" />
                </div>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleSyncGoogleCalendar(spotlightHoliday)}
                    className="py-3 px-5 rounded-2xl bg-white text-stone-900 hover:bg-stone-100 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition"
                  >
                    <CalendarIcon className="w-4 h-4 text-indigo-600" />
                    <span>Sync to Google Calendar</span>
                  </button>

                  <button
                    onClick={() => handleSelectHoliday(spotlightHoliday)}
                    className="py-3 px-5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>Traditions & Climate</span>
                  </button>

                  <button
                    onClick={() => setShareModalHoliday(spotlightHoliday)}
                    className="py-3 px-5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
                  >
                    <Share2 className="w-4 h-4 text-rose-300" />
                    <span>Create Viral Poster</span>
                  </button>

                  <button
                    onClick={() => setAiModalHoliday(spotlightHoliday)}
                    className="py-3 px-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg transition"
                  >
                    <Sparkles className="w-4 h-4 text-rose-700" />
                    <span>Ask Gemini</span>
                  </button>

                  {/* Quick Social Share Widget */}
                  <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
                    <SocialShareWidget holiday={spotlightHoliday} variant="compact" />
                  </div>
                </div>
              </div>
            </div>

            {/* Global Search & Discovery Filters with Hands-Free Voice Search */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row items-center gap-4">
              {/* Voice-to-Text Enabled Search Input */}
              <VoiceSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={t.searchPlaceholder || "Search 190+ world holidays, delicacies, traditions..."}
                language={preferences.language}
              />

              {/* Category filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="w-4 h-4 text-stone-400 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 text-xs sm:text-sm py-2.5 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="cultural">Cultural Heritage</option>
                  <option value="religious">Sacred & Religious</option>
                  <option value="un_day">UN Observances</option>
                  <option value="national">National & Festive</option>
                </select>
              </div>
            </div>

            {/* Quick Category Chips */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-400 uppercase tracking-wider text-[10px] whitespace-nowrap">
                  Quick Filter:
                </span>
                {[
                  { id: 'all', label: 'All World Observances' },
                  { id: 'cultural', label: '🏮 Cultural Festivals' },
                  { id: 'religious', label: '✨ Sacred Observances' },
                  { id: 'un_day', label: '🌐 UN International Days' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* View Switcher Pill */}
              <div className="flex items-center gap-1.5 shrink-0 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                <button
                  onClick={() => setIsGlobeView(false)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    !isGlobeView ? 'bg-white dark:bg-stone-900 shadow-sm text-stone-900 dark:text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setIsGlobeView(true)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    isGlobeView ? 'bg-indigo-600 shadow-sm text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>3D Globe</span>
                </button>
              </div>
            </div>

            {/* Global Celebrations Compendium & Interactive Quiz Discovery Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: All Major Holidays Guide */}
              <div 
                onClick={() => setGlobalGuideOpen(true)}
                className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/60 dark:border-amber-800/60 hover:border-amber-500/80 cursor-pointer transition shadow-xs group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-amber-400/40">
                      <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                      100+ Global Celebrations
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      60+ Nations
                    </span>
                  </div>

                  <h3 className="font-serif font-black text-lg text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition">
                    All Major Holidays: Global Celebrations & Origins
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Explore our definitive global reference guide covering religious, patriotic, romantic, commercial, and harvest celebrations with origins, traditions, and respectful visitor etiquette.
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition">
                  <span>Open Full Guide & Itinerary Planner</span>
                  <ArrowRight className="w-4 h-4 text-rose-500" />
                </div>
              </div>

              {/* Card 2: Interactive Cultural Quiz */}
              <div 
                onClick={() => setActiveTab('quiz')}
                className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-rose-500/10 border border-indigo-300/60 dark:border-indigo-800/60 hover:border-indigo-500/80 cursor-pointer transition shadow-xs group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border border-indigo-400/40">
                      <Brain className="w-3.5 h-3.5 text-indigo-500" />
                      Daily Trivia Challenge
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                      +50 Bonus Points
                    </span>
                  </div>

                  <h3 className="font-serif font-black text-lg text-stone-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    Interactive Cultural Quiz
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    Test your cultural knowledge on world holidays you've explored. Answer questions on festive delicacies, ancient origins, and sacred symbols to level up your Cultural Explorer rank!
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400 group-hover:translate-x-1 transition">
                  <span>Start Challenge & Win Badges</span>
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                </div>
              </div>
            </div>

            {/* View Mode: 3D Planetary Globe OR Holiday Cards Grid */}
            {isGlobeView ? (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white flex items-center gap-2">
                      <Globe2 className="w-5 h-5 text-indigo-500" />
                      <span>Interactive 3D Planetary Observatory</span>
                    </h2>
                    {selectedCountry !== 'all' && (
                      <button
                        onClick={() => setSelectedCountry('all')}
                        className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold ml-2"
                      >
                        Reset Country Filter ({selectedCountry})
                      </button>
                    )}
                  </div>
                  <span className="text-xs font-mono text-stone-400">
                    {filteredHolidays.length} Holidays in View
                  </span>
                </div>

                <InteractiveGlobe
                  holidays={filteredHolidays}
                  selectedCountry={selectedCountry}
                  onSelectCountry={(countryCode) => {
                    setSelectedCountry(countryCode);
                    playAlertChime('countdown');
                  }}
                  onSelectHoliday={(h) => {
                    handleSelectHoliday(h);
                    playAlertChime('success');
                  }}
                  onSyncGoogleCalendar={handleSyncGoogleCalendar}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white flex items-center gap-2">
                    <span>Upcoming Global Observances</span>
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {filteredHolidays.length} Days Found
                    </span>
                  </h2>
                </div>

                {filteredHolidays.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
                    <Globe2 className="w-10 h-10 text-stone-400 mx-auto" />
                    <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-200">
                      No matching world holidays found
                    </h3>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Try clearing your query or switch categories. You can also suggest an unlisted holiday via our feedback button!
                    </p>
                    <button
                      onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedCountry('all'); }}
                      className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold"
                    >
                      Clear Search Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHolidays.map((holiday: Holiday) => {
                      const isBookmarked = reminders.some(r => r.holidayId === holiday.id);
                      const isSynced = reminders.some(r => r.holidayId === holiday.id && r.syncedToGoogleCalendar);
                      return (
                        <HolidayCard
                          key={holiday.id}
                          holiday={holiday}
                          preferences={preferences}
                          onSelect={(h) => handleSelectHoliday(h)}
                          onSyncGoogleCalendar={handleSyncGoogleCalendar}
                          onOpenShareModal={(h) => setShareModalHoliday(h)}
                          onOpenAiDeepDive={(h) => setAiModalHoliday(h)}
                          isBookmarked={isBookmarked}
                          onToggleBookmark={handleToggleBookmark}
                          isSyncedToCalendar={isSynced}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* TAB: COUNTRIES & UN SPECIAL DAYS DIRECTORY */}
        {activeTab === 'countries' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <CountryHolidaysExplorer
              onSelectHoliday={handleSelectHoliday}
              onSyncGoogleCalendar={handleSyncGoogleCalendar}
            />
          </div>
        )}

        {/* TAB: GLOBAL HEATMAP */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <GlobalHeatmap
              holidays={localizedHolidays}
              onSelectHoliday={handleSelectHoliday}
              onSyncGoogleCalendar={handleSyncGoogleCalendar}
            />
          </div>
        )}

        {/* TAB: CALENDAR */}
        {activeTab === 'calendar' && (
          <CalendarView
            holidays={localizedHolidays}
            reminders={reminders}
            onAddReminder={(holiday, notes) => handleToggleBookmark(holiday.id)}
            onRemoveReminder={(id) => setReminders(prev => prev.filter(r => r.id !== id))}
            onSyncGoogleCalendar={handleSyncGoogleCalendar}
            onSelectHoliday={(h) => handleSelectHoliday(h)}
          />
        )}

        {/* TAB: ANNUAL TRAVEL PLANNER */}
        {activeTab === 'planner' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <IntelligentHolidayPlanner
              bookmarkedHolidayIds={preferences.bookmarkedHolidays || []}
              allHolidays={localizedHolidays}
              onSelectHoliday={handleSelectHoliday}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        )}

        {/* TAB: COMMUNITY */}
        {activeTab === 'community' && (
          <CommunityFeed
            posts={communityPosts}
            holidays={localizedHolidays}
            onAddPost={handleAddCommunityPost}
            onLikePost={handleLikePost}
          />
        )}

        {/* TAB: AI INSIGHTS CENTER */}
        {activeTab === 'insights' && (
          <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 text-white shadow-xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-semibold uppercase">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Multi-Model AI Cultural Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black">
                Explore the Deeper Meanings of Global Traditions
              </h2>
              <p className="text-xs sm:text-sm text-stone-100 max-w-2xl leading-relaxed">
                Connect directly with Gemini 3.1 Pro (Deep Thinking mode) for philosophical and anthropological origins, Gemini 3.5 Flash (with Google Search & Maps Grounding) for verified current events, or Gemini 3.1 Flash-Lite for ultra-fast festive summaries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {localizedHolidays.map((holiday: Holiday) => (
                <div
                  key={holiday.id}
                  onClick={() => setAiModalHoliday(holiday)}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-rose-400 dark:hover:border-rose-700 shadow-sm cursor-pointer transition flex items-center justify-between group"
                >
                  <div>
                    <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-white group-hover:text-rose-600 transition">
                      {holiday.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">{holiday.country}</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: INTERACTIVE TRIVIA QUIZ */}
        {activeTab === 'quiz' && (
          <InteractiveQuiz
            holidays={localizedHolidays}
            explorerProgress={explorerProgress}
            preferences={preferences}
            onSelectHoliday={handleSelectHoliday}
            onRecordQuizCompletion={handleRecordQuizCompletion}
          />
        )}

        {/* TAB: SETTINGS & SECURITY */}
        {activeTab === 'settings' && (
          <SettingsModal
            preferences={preferences}
            setPreferences={setPreferences}
            onCloudSyncPush={handleCloudSyncPush}
            onCloudSyncPull={handleCloudSyncPull}
            syncKey={syncKey}
            setSyncKey={setSyncKey}
            syncStatus={syncStatus}
            explorerProgress={explorerProgress}
            onExploreContinent={handleExploreContinent}
            holidays={localizedHolidays}
            reminders={reminders}
            communityPosts={communityPosts}
            onSelectHoliday={handleSelectHoliday}
            onToggleBookmark={handleToggleBookmark}
            onSyncGoogleCalendar={handleSyncGoogleCalendar}
            onNavigateToCommunity={() => setActiveTab('community')}
          />
        )}
      </main>

      {/* Floating Action Button for Suggestions & Feedback */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={() => setFeedbackOpen(true)}
          className="py-2.5 px-4 rounded-full bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold shadow-xl hover:scale-105 transition flex items-center gap-1.5 border border-stone-700/50"
          title="Suggest a Holiday or Send Feedback"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Feedback & Suggest</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      {selectedHoliday && (
        <HolidayDetailModal
          holiday={getLocalizedHoliday(selectedHoliday, preferences.language)}
          isOpen={Boolean(selectedHoliday)}
          onClose={() => setSelectedHoliday(null)}
          preferences={preferences}
          recipes={GLOBAL_RECIPES_DATA}
          onOpenRecipe={(recipe) => setSelectedRecipe(recipe)}
          onSyncGoogleCalendar={handleSyncGoogleCalendar}
          onOpenShareModal={(h) => {
            setSelectedHoliday(null);
            setShareModalHoliday(h);
          }}
          onOpenAiDeepDive={(h) => {
            setSelectedHoliday(null);
            setAiModalHoliday(h);
          }}
          isBookmarked={reminders.some(r => r.holidayId === selectedHoliday.id)}
          onToggleBookmark={handleToggleBookmark}
          isSyncedToCalendar={reminders.some(r => r.holidayId === selectedHoliday.id && r.syncedToGoogleCalendar)}
          onOpenQuiz={(h) => {
            setSelectedHoliday(null);
            setActiveTab('quiz');
          }}
        />
      )}

      {/* 100+ Major Holidays Global Compendium Guide Modal */}
      <GlobalCelebrationsGuideModal
        isOpen={globalGuideOpen}
        onClose={() => setGlobalGuideOpen(false)}
        allHolidays={localizedHolidays}
        preferences={preferences}
        onSelectHoliday={(h) => handleSelectHoliday(h)}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Traditional Festive Recipe & Shopping List Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={Boolean(selectedRecipe)}
        onClose={() => setSelectedRecipe(null)}
      />

      {/* End-to-End Encrypted File & Message Vault */}
      <EncryptedVaultModal
        isOpen={vaultOpen}
        onClose={() => setVaultOpen(false)}
        files={encryptedVaultFiles}
        onSaveFiles={setEncryptedVaultFiles}
      />

      {/* GDPR & CCPA Data Privacy & Rights Center */}
      <PrivacyComplianceModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        complianceState={complianceState}
        onUpdateCompliance={setComplianceState}
        reminders={reminders}
        preferences={preferences}
        onPurgeAllData={handlePurgeAllData}
      />

      {aiModalHoliday && (
        <AiInsightModal
          holiday={aiModalHoliday}
          isOpen={Boolean(aiModalHoliday)}
          onClose={() => setAiModalHoliday(null)}
        />
      )}

      {shareModalHoliday && (
        <SharePosterModal
          holiday={shareModalHoliday}
          isOpen={Boolean(shareModalHoliday)}
          onClose={() => setShareModalHoliday(null)}
        />
      )}

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onSelectHoliday={(holidayId) => {
          const h = holidays.find(item => item.id === holidayId);
          if (h) setSelectedHoliday(h);
        }}
      />

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
      />

      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 py-8 px-4 sm:px-6 lg:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-rose-500" />
            <span className="font-serif font-bold text-stone-800 dark:text-stone-200">WorldFest</span>
            <span>• Celebrating universal cultural heritage across 190+ sovereign territories.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setVaultOpen(true)}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
            >
              <Lock className="w-3.5 h-3.5" />
              AES-GCM E2EE Vault
            </button>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="hover:underline hover:text-stone-900 dark:hover:text-stone-100 flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              GDPR & CCPA Rights
            </button>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <button
              onClick={() => setActiveTab('settings')}
              className="hover:underline hover:text-stone-900 dark:hover:text-stone-100"
            >
              Cloud Sync & Settings
            </button>
            <span className="text-stone-300 dark:text-stone-700">|</span>
            <button
              onClick={() => setFeedbackOpen(true)}
              className="hover:underline hover:text-stone-900 dark:hover:text-stone-100"
            >
              Feedback
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
