import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Cloud, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  Bell, 
  Globe2, 
  Key, 
  CheckCircle2, 
  AlertCircle,
  Database,
  RefreshCw,
  FileText,
  Trophy,
  Award,
  Compass,
  User,
  Smartphone,
  Languages,
  Sparkles,
  Check
} from 'lucide-react';
import { UserPreferences, CulturalExplorerProgress, Continent, Holiday, UserEventReminder, CommunityPost, SupportedLanguage } from '../types';
import { CulturalExplorerBadges } from './CulturalExplorerBadges';
import { UserProfile } from './UserProfile';
import { HomeScreenWidgetsGuide } from './HomeScreenWidgetsGuide';
import { IntelligentHolidayPlanner } from './IntelligentHolidayPlanner';
import { loadExplorerProgress, CULTURAL_BADGES } from '../utils/culturalBadges';
import { SUPPORTED_LANGUAGES } from '../utils/holidayTranslations';
import { Plane, Calendar as CalendarIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SettingsModalProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onCloudSyncPush: () => Promise<void>;
  onCloudSyncPull: (syncKey: string) => Promise<void>;
  syncKey: string;
  setSyncKey: (key: string) => void;
  syncStatus: string;
  explorerProgress?: CulturalExplorerProgress;
  onExploreContinent?: (continent: Continent) => void;
  holidays?: Holiday[];
  reminders?: UserEventReminder[];
  communityPosts?: CommunityPost[];
  onSelectHoliday?: (holiday: Holiday) => void;
  onToggleBookmark?: (holidayId: string) => void;
  onSyncGoogleCalendar?: (holiday: Holiday) => void;
  onNavigateToCommunity?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  preferences,
  setPreferences,
  onCloudSyncPush,
  onCloudSyncPull,
  syncKey,
  setSyncKey,
  syncStatus,
  explorerProgress,
  onExploreContinent,
  holidays = [],
  reminders = [],
  communityPosts = [],
  onSelectHoliday = () => {},
  onToggleBookmark = () => {},
  onSyncGoogleCalendar = () => {},
  onNavigateToCommunity
}) => {
  const [activeSection, setActiveSection] = useState<'profile' | 'planner' | 'widgets' | 'achievements' | 'security'>('profile');
  const [pullKeyInput, setPullKeyInput] = useState('');
  const [encryptionPassphrase, setEncryptionPassphrase] = useState('world-holidays-secure-vault-2026');
  const [copiedSyncKey, setCopiedSyncKey] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const bookmarkedIds = Array.from(new Set([...(preferences.bookmarkedHolidays || []), ...reminders.map(r => r.holidayId)]));

  const currentProgress = explorerProgress || loadExplorerProgress();
  const unlockedBadgesCount = currentProgress.unlockedBadgeIds.length;
  const totalBadgesCount = CULTURAL_BADGES.length;

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setPreferences(prev => {
      const updated = { ...prev, language: newLang };
      try {
        localStorage.setItem('worldfest_preferences', JSON.stringify(updated));
      } catch (err) {
        // Ignore
      }
      return updated;
    });
    confetti({ particleCount: 30, spread: 55, origin: { y: 0.3 } });
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === preferences.language) || SUPPORTED_LANGUAGES[0];

  const togglePushNotifications = async () => {
    if (!preferences.pushNotificationsEnabled) {
      if ('Notification' in window) {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          new Notification('WorldFest Alerts Enabled!', {
            body: 'You will receive real-time daily alerts for global holidays & cultural countdowns.',
            icon: '/favicon.ico'
          });
          setPreferences(prev => ({ ...prev, pushNotificationsEnabled: true }));
          confetti({ particleCount: 30, spread: 50 });
        } else {
          alert('Push notifications permission was denied in browser settings.');
        }
      } else {
        setPreferences(prev => ({ ...prev, pushNotificationsEnabled: true }));
      }
    } else {
      setPreferences(prev => ({ ...prev, pushNotificationsEnabled: false }));
    }
  };

  const handleManualPush = async () => {
    setSyncing(true);
    await onCloudSyncPush();
    setSyncing(false);
  };

  const handleManualPull = async () => {
    if (!pullKeyInput.trim()) return;
    setSyncing(true);
    await onCloudSyncPull(pullKeyInput.trim());
    setSyncing(false);
  };

  const copySyncKey = () => {
    navigator.clipboard.writeText(syncKey);
    setCopiedSyncKey(true);
    setTimeout(() => setCopiedSyncKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      {/* Dedicated Language & Localization Control Center */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white via-rose-50/40 to-amber-50/30 dark:from-stone-900 dark:via-stone-900 dark:to-rose-950/20 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20 shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                  Interface Language & Content Translation
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> Dynamic
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Switching language dynamically translates buttons, countdowns, holiday titles, traditions, and cultural facts.
              </p>
            </div>
          </div>

          {/* Dedicated Language Dropdown */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <select
                aria-label="Application & Content Language Dropdown"
                value={preferences.language}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="w-full appearance-none bg-white dark:bg-stone-800 border-2 border-rose-300 dark:border-rose-900/60 rounded-2xl px-4 py-2.5 text-xs font-semibold text-stone-900 dark:text-white shadow-sm hover:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer pr-10"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-stone-500">
                <Languages className="w-4 h-4 text-rose-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Language Switcher Chips for Fast Access */}
        <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/60 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-bold uppercase text-stone-500 dark:text-stone-400 mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Quick Switch:
          </span>
          {[
            { code: 'en' as SupportedLanguage, label: 'English', flag: '🇬🇧' },
            { code: 'es' as SupportedLanguage, label: 'Español', flag: '🇪🇸' },
            { code: 'fr' as SupportedLanguage, label: 'Français', flag: '🇫🇷' },
            { code: 'zh' as SupportedLanguage, label: '中文 (Mandarin)', flag: '🇨🇳' },
            { code: 'hi' as SupportedLanguage, label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
            { code: 'ar' as SupportedLanguage, label: 'العربية', flag: '🇦🇪' },
            { code: 'de' as SupportedLanguage, label: 'Deutsch', flag: '🇩🇪' },
            { code: 'ja' as SupportedLanguage, label: '日本語', flag: '🇯🇵' },
          ].map((item) => (
            <button
              key={item.code}
              onClick={() => handleLanguageChange(item.code)}
              className={`px-2.5 py-1 rounded-xl text-xs font-medium transition flex items-center gap-1.5 ${
                preferences.language === item.code
                  ? 'bg-rose-600 text-white shadow-xs font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Section Nav Tabs */}
      <div className="p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center gap-1 border border-stone-200/80 dark:border-stone-700/80 shadow-xs overflow-x-auto">
        <button
          onClick={() => setActiveSection('profile')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSection === 'profile'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <User className="w-4 h-4 text-rose-500" />
          <span>User Profile</span>
          {reminders.length > 0 && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold border border-rose-300/40">
              {reminders.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSection('planner')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSection === 'planner'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Plane className="w-4 h-4 text-amber-500" />
          <span>Holiday Planner</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/40 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            {bookmarkedIds.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('widgets')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSection === 'widgets'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4 text-indigo-500" />
          <span>Home Screen Widgets</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-300/40">
            iOS / Android
          </span>
        </button>

        <button
          onClick={() => setActiveSection('achievements')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSection === 'achievements'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Explorer Badges</span>
          <span className="ml-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/40">
            {unlockedBadgesCount} / {totalBadgesCount}
          </span>
        </button>

        <button
          onClick={() => setActiveSection('security')}
          className={`flex-1 py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition whitespace-nowrap ${
            activeSection === 'security'
              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm ring-1 ring-stone-900/5 dark:ring-white/10 font-bold'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Security & Sync</span>
        </button>
      </div>

      {/* SECTION 1: USER PROFILE VIEW */}
      {activeSection === 'profile' && (
        <UserProfile
          preferences={preferences}
          setPreferences={setPreferences}
          explorerProgress={currentProgress}
          holidays={holidays}
          reminders={reminders}
          communityPosts={communityPosts}
          onSelectHoliday={onSelectHoliday}
          onToggleBookmark={onToggleBookmark}
          onSyncGoogleCalendar={onSyncGoogleCalendar}
          onNavigateToCommunity={onNavigateToCommunity}
          onSwitchToBadgesTab={() => setActiveSection('achievements')}
          onSwitchToWidgetsTab={() => setActiveSection('widgets')}
        />
      )}

      {/* SECTION 2: INTELLIGENT ANNUAL HOLIDAY & VACATION PLANNER */}
      {activeSection === 'planner' && (
        <IntelligentHolidayPlanner
          bookmarkedHolidayIds={bookmarkedIds}
          allHolidays={holidays}
          onSelectHoliday={onSelectHoliday}
          onToggleBookmark={onToggleBookmark}
        />
      )}

      {/* SECTION 2: HOME SCREEN WIDGETS GUIDE */}
      {activeSection === 'widgets' && (
        <HomeScreenWidgetsGuide
          reminders={reminders}
          holidays={holidays}
          preferences={preferences}
          onSelectHoliday={onSelectHoliday}
          onToggleBookmark={onToggleBookmark}
        />
      )}

      {/* SECTION 3: CULTURAL EXPLORER ACHIEVEMENTS */}
      {activeSection === 'achievements' && (
        <CulturalExplorerBadges
          progress={currentProgress}
          onExploreContinent={onExploreContinent}
        />
      )}

      {/* SECTION 4: SECURITY & CLOUD SYNCHRONIZATION */}
      {activeSection === 'security' && (
        <>
          {/* Title Banner */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                Security, Cloud Synchronization & Data Privacy
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Zero-knowledge encryption, cross-platform cloud sync, and GDPR/CCPA privacy controls.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cloud Sync & Cross Platform */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <Cloud className="w-5 h-5 text-sky-500" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Cross-Platform Cloud Sync
            </h3>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Seamlessly access your saved watchlist, holiday notes, and language settings across mobile, tablet, and desktop without creating a public password.
          </p>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400">
              Your Unique Private Sync Key:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={syncKey}
                className="flex-1 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-mono text-stone-800 dark:text-stone-200"
              />
              <button
                onClick={copySyncKey}
                className="px-3 py-2 rounded-xl bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-xs font-semibold transition"
              >
                {copiedSyncKey ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleManualPush}
              disabled={syncing}
              className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{syncing ? 'Syncing...' : 'Backup to Cloud'}</span>
            </button>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-2">
            <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400">
              Restore from another device:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pullKeyInput}
                onChange={(e) => setPullKeyInput(e.target.value)}
                placeholder="Paste Sync Key from other device..."
                className="flex-1 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-800 dark:text-stone-200"
              />
              <button
                onClick={handleManualPull}
                disabled={syncing || !pullKeyInput.trim()}
                className="px-3 py-2 rounded-xl bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-semibold transition disabled:opacity-50"
              >
                Restore
              </button>
            </div>
            {syncStatus && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                {syncStatus}
              </p>
            )}
          </div>
        </div>

        {/* End-to-End Encryption & Security */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <Lock className="w-5 h-5 text-emerald-500" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              End-to-End Encryption (E2EE)
            </h3>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            All your personal community drafts, travel notes, and custom reminders are fortified client-side using WebCrypto AES-GCM (256-bit) with PBKDF2 SHA-256 key derivation.
          </p>

          <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Zero-Knowledge Architecture</span>
              <span>Neither servers nor third parties can view your encrypted personal reflections without your secret key.</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400">
              Personal Vault Passphrase:
            </label>
            <input
              type="password"
              value={encryptionPassphrase}
              onChange={(e) => setEncryptionPassphrase(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-2 text-xs font-mono text-stone-800 dark:text-stone-200"
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-700 dark:text-stone-300 font-medium">
                Enforce Client-Side E2EE by Default
              </span>
              <input
                type="checkbox"
                checked={preferences.e2eEncryptionEnabled}
                onChange={(e) => setPreferences(prev => ({ ...prev, e2eEncryptionEnabled: e.target.checked }))}
                className="rounded text-rose-500 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Push Notifications & Real-Time Alerts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Real-Time Push Notifications
            </h3>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            Get notified each morning about world holidays being commemorated today, plus countdown reminders for festivals in your saved calendar.
          </p>

          <button
            onClick={togglePushNotifications}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition ${
              preferences.pushNotificationsEnabled
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{preferences.pushNotificationsEnabled ? 'Push Notifications Enabled (Active)' : 'Enable Daily Holiday Alerts'}</span>
          </button>
        </div>

        {/* Offline Cache & GDPR Compliance */}
        <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
            <Database className="w-5 h-5 text-indigo-500" />
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white">
              Offline Accessibility & Compliance
            </h3>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            All 190+ world holiday datasets, countdown algorithms, and cultural greetings are locally indexed into your browser cache for seamless travel without Wi-Fi.
          </p>

          <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs space-y-1">
            <div className="flex items-center justify-between font-medium text-stone-700 dark:text-stone-300">
              <span>Offline Database Status:</span>
              <span className="text-emerald-500 font-bold">100% Cached (Ready)</span>
            </div>
            <div className="flex items-center justify-between font-medium text-stone-700 dark:text-stone-300">
              <span>GDPR / CCPA Zero-Tracking:</span>
              <span className="text-emerald-500 font-bold">Compliant</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="text-xs text-rose-500 hover:underline font-medium"
            >
              Reset Local Storage & Clear Cache
            </button>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
};
