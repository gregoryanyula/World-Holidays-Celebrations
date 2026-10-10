import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Search, 
  Calendar as CalendarIcon, 
  Share2, 
  Bell, 
  Moon, 
  Sun, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Heart, 
  Lock, 
  Cloud, 
  ChevronRight, 
  ExternalLink,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  Volume2,
  Bookmark,
  TrendingUp,
  Download,
  Send,
  Zap,
  Brain,
  Layers,
  HelpCircle,
  Menu,
  Trophy,
  Flame,
  BookOpen,
  Plane
} from 'lucide-react';
import { Holiday, UserEventReminder, CommunityPost, NotificationItem, UserPreferences, AppTab, FestiveStreakData } from '../types';
import { TRANSLATIONS } from '../data';
import { decryptText, encryptText } from '../utils/crypto';
import { FestiveStreak } from './FestiveStreak';
import confetti from 'canvas-confetti';

interface HeaderProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  hasUnreadNotifications: boolean;
  onOpenSyncModal: () => void;
  onOpenFeedback: () => void;
  onStartOnboarding: () => void;
  onOpenVault?: () => void;
  onOpenPrivacy?: () => void;
  isGlobeView?: boolean;
  onToggleGlobeView?: () => void;
  isOffline?: boolean;
  explorerBadgeCount?: number;
  streakData?: FestiveStreakData;
  onOpenGlobalGuide?: () => void;
  currentUser?: { uid: string; displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  onSignInWithGoogle?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  preferences,
  setPreferences,
  activeTab,
  setActiveTab,
  notifications,
  onOpenNotifications,
  hasUnreadNotifications,
  onOpenSyncModal,
  onOpenFeedback,
  onStartOnboarding,
  onOpenVault,
  onOpenPrivacy,
  isGlobeView = false,
  onToggleGlobeView,
  isOffline = false,
  explorerBadgeCount,
  streakData,
  onOpenGlobalGuide,
  currentUser,
  onSignInWithGoogle,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[preferences.language] || TRANSLATIONS.en;

  const toggleDarkMode = () => {
    setPreferences((prev: UserPreferences) => {
      const updated = { ...prev, darkMode: !prev.darkMode };
      if (updated.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return updated;
    });
  };

  const changeLanguage = (lang: any) => {
    setPreferences((prev: UserPreferences) => {
      const updated = { ...prev, language: lang };
      try {
        localStorage.setItem('worldfest_preferences', JSON.stringify(updated));
      } catch (err) {
        // Ignore
      }
      return updated;
    });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-stone-900/90 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('explore')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Globe2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100 font-serif">
                  WorldFest
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                  Global
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
                Holidays & Special Days of the World
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'explore'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Compass className="w-4 h-4" />
              {t.upcomingTab || 'Timeline'}
            </button>
            <button
              onClick={() => setActiveTab('countries')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'countries'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Countries & UN Days</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'calendar'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              {t.calendarTab || 'My Calendar'}
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'heatmap'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Global Heatmap</span>
            </button>
            <button
              onClick={() => setActiveTab('community')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'community'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {t.communityTab || 'Community'}
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>Quiz & Trivia</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-300/40">
                Play
              </span>
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                activeTab === 'insights'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              AI Cultural Intelligence
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'planner'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold shadow-xs'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Plane className="w-4 h-4 text-amber-500" />
              <span>Annual Travel Planner</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/40">
                AI
              </span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{t.settingsTab || 'Badges & Settings'}</span>
              {explorerBadgeCount !== undefined && explorerBadgeCount > 0 && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/50">
                  {explorerBadgeCount}
                </span>
              )}
            </button>
          </nav>

          {/* Controls: 3D Globe, E2EE Vault, Language, Dark mode, Push Alerts, Cloud Sync */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Festive Streak Interactive Flame in Header */}
            {streakData && (
              <FestiveStreak streakData={streakData} variant="header" />
            )}

            {/* 3D Globe Mode Button */}
            {onToggleGlobeView && (
              <button
                onClick={onToggleGlobeView}
                title={isGlobeView ? "Switch to Grid View" : "Launch Interactive 3D Globe"}
                className={`py-1.5 px-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  isGlobeView 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' 
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <Globe2 className={`w-3.5 h-3.5 ${isGlobeView ? 'animate-spin' : 'text-indigo-500'}`} />
                <span className="hidden sm:inline">{isGlobeView ? '3D Active' : '3D Globe'}</span>
              </button>
            )}

            {/* E2EE Vault Button */}
            {onOpenVault && (
              <button
                onClick={onOpenVault}
                title="E2EE Encrypted File & Message Vault"
                className="py-1.5 px-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/50 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="hidden lg:inline">Encrypted Vault</span>
              </button>
            )}

            {/* Offline indicator if active */}
            {isOffline && (
              <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Offline Mode
              </span>
            )}

            {/* Language Selector */}
            <select
              aria-label="Language selection"
              value={preferences.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="text-xs bg-stone-100 dark:bg-stone-800 border-none rounded-lg px-2 py-1.5 font-medium text-stone-700 dark:text-stone-300 focus:ring-1 focus:ring-rose-500 outline-none cursor-pointer hidden sm:block"
            >
              <option value="en">English (EN)</option>
              <option value="es">Español (ES)</option>
              <option value="fr">Français (FR)</option>
              <option value="zh">中文 (ZH)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="ar">العربية (AR)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ja">日本語 (JA)</option>
            </select>

            {/* Cloud Sync Status Button */}
            <button
              onClick={onOpenSyncModal}
              title="Cloud Sync & Backup"
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors relative"
            >
              <Cloud className="w-4 h-4 text-sky-500" />
            </button>

            {/* Push Notifications trigger */}
            <button
              onClick={onOpenNotifications}
              title="Notifications & Upcoming Alerts"
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {hasUnreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
              )}
            </button>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDarkMode}
              title={preferences.darkMode ? 'Light mode' : 'Dark mode for evening comfort'}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              {preferences.darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-600" />
              )}
            </button>

            {/* Privacy Compliance Shield */}
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                title="GDPR & CCPA Data Privacy Rights"
                className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </button>
            )}

            {/* 100+ Major Holidays Guide Modal Trigger */}
            {onOpenGlobalGuide && (
              <button
                onClick={onOpenGlobalGuide}
                title="100+ Major Holidays & Origins Compendium"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-indigo-500/15 border border-amber-300/60 dark:border-amber-700/60 text-xs font-bold text-stone-900 dark:text-stone-100 hover:scale-105 transition shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                <span>100+ Holidays Guide</span>
              </button>
            )}

            {/* Help / Onboarding Tour */}
            <button
              onClick={onStartOnboarding}
              title="App Tour & Features Guide"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
            >
              <HelpCircle className="w-3.5 h-3.5 text-stone-400" />
              Guide
            </button>

            {/* Firebase Auth Google Sign-in / Profile */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-stone-200 dark:border-stone-800">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-8 h-8 rounded-full border border-amber-500/40 object-cover shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-xs font-bold text-stone-900 dark:text-white truncate max-w-[100px] leading-tight">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono leading-none">
                    Synced
                  </span>
                </div>
                {onSignOut && (
                  <button
                    onClick={onSignOut}
                    className="text-[11px] text-stone-500 hover:text-rose-500 px-2 py-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                    title="Sign Out"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            ) : onSignInWithGoogle ? (
              <button
                onClick={onSignInWithGoogle}
                className="py-1.5 px-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs hover:shadow-xs transition cursor-pointer"
                title="Sign in with Google to sync bookmarks & travel plans"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span className="hidden sm:inline">Google Sign In</span>
              </button>
            ) : null}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200 dark:border-stone-800 space-y-1">
            {onOpenGlobalGuide && (
              <button
                onClick={() => { onOpenGlobalGuide(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-300/40 flex items-center gap-2 mb-2"
              >
                <BookOpen className="w-4 h-4 text-rose-500" />
                <span>🌍 100+ Major Holidays & Origins Guide</span>
              </button>
            )}
            <button
              onClick={() => { setActiveTab('explore'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-rose-500" />
              {t.upcomingTab || 'Timeline'}
            </button>
            <button
              onClick={() => { setActiveTab('quiz'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-indigo-500" />
              <span>Interactive Quiz & Trivia</span>
            </button>
            <button
              onClick={() => { setActiveTab('countries'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>Countries & UN Days</span>
            </button>
            <button
              onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <CalendarIcon className="w-4 h-4 text-indigo-500" />
              {t.calendarTab || 'Personalized Calendar'}
            </button>
            <button
              onClick={() => { setActiveTab('heatmap'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              <span>Global Heatmap</span>
            </button>
            <button
              onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              {t.communityTab || 'Community Stories'}
            </button>
            <button
              onClick={() => { setActiveTab('insights'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              AI Cultural Intelligence
            </button>
            <button
              onClick={() => { setActiveTab('planner'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <Plane className="w-4 h-4 text-amber-500" />
              <span>✈️ Annual Travel Planner</span>
            </button>
            <button
              onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {t.settingsTab || 'Security, E2EE & Sync'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
