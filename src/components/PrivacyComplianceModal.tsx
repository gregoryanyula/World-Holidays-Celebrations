import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Download, 
  Trash2, 
  Check, 
  Lock, 
  FileText, 
  AlertCircle, 
  X, 
  ExternalLink,
  Shield,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { PrivacyComplianceState, UserPreferences, UserEventReminder } from '../types';

interface PrivacyComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  complianceState: PrivacyComplianceState;
  onUpdateCompliance: (state: PrivacyComplianceState) => void;
  reminders: UserEventReminder[];
  preferences: UserPreferences;
  onPurgeAllData: () => void;
}

export const PrivacyComplianceModal: React.FC<PrivacyComplianceModalProps> = ({
  isOpen,
  onClose,
  complianceState,
  onUpdateCompliance,
  reminders,
  preferences,
  onPurgeAllData
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExportDataPackage = () => {
    const dataPackage = {
      exportedAt: new Date().toISOString(),
      standards: ['GDPR (Regulation EU 2016/679)', 'CCPA / CPRA (Cal. Civ. Code § 1798.100)'],
      userData: {
        preferences,
        savedEventReminders: reminders,
        complianceSettings: complianceState,
        offlineCacheVersion: '2.0.0'
      }
    };

    const blob = new Blob([JSON.stringify(dataPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `worldfest-gdpr-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePurge = () => {
    if (confirm('CRITICAL ACTION: This will permanently purge all your reminders, saved holidays, encrypted files, and local data under GDPR Article 17 (Right to be Forgotten). Proceed?')) {
      onPurgeAllData();
      setPurgeSuccess(true);
      setTimeout(() => {
        setPurgeSuccess(false);
        onClose();
      }, 2000);
    }
  };

  const toggleConsent = (field: keyof PrivacyComplianceState) => {
    if (field === 'necessaryCookies') return; // Strictly necessary is locked
    const nextState = {
      ...complianceState,
      [field]: !complianceState[field],
      auditLogs: [
        {
          action: `Consent updated: ${field}`,
          timestamp: new Date().toLocaleTimeString(),
          details: `Status set to ${!complianceState[field]}`
        },
        ...complianceState.auditLogs.slice(0, 10)
      ]
    };
    onUpdateCompliance(nextState);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-2xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Global Privacy Standard
                </span>
                <span className="text-stone-300 dark:text-stone-700">•</span>
                <span className="text-xs text-stone-500">GDPR & CCPA Compliant</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-white">
                Data Privacy & Rights Center
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Statutory Rights Overview */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-2">
            <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>User Data Sovereignty & Zero-Knowledge Architecture</span>
            </span>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-xs">
              WorldFest enforces end-to-end client encryption (AES-GCM 256-bit). We do not sell your personal preferences, calendar schedules, or festival notes to advertisers or brokers.
            </p>
          </div>

          {/* Granular Consent Controls */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-stone-900 dark:text-white text-sm">
              Granular Consent & Cookies Management
            </h3>

            <div className="space-y-2">
              {/* Essential */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block text-xs">
                    Strictly Necessary & Offline Storage
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Required for core holiday encyclopedias and local offline caching.
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
                  Always Active
                </span>
              </div>

              {/* CCPA Do Not Sell */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block text-xs">
                    CCPA: Do Not Sell or Share My Information
                  </span>
                  <span className="text-[11px] text-stone-400">
                    California Consumer Privacy Act (CCPA § 1798.120) opt-out declaration.
                  </span>
                </div>
                <button
                  onClick={() => toggleConsent('ccpaDoNotSell')}
                  className={`w-10 h-6 rounded-full transition relative ${
                    complianceState.ccpaDoNotSell ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition transform ${
                      complianceState.ccpaDoNotSell ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Push notifications consent */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/80 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 block text-xs">
                    Festive Reminders & Notifications
                  </span>
                  <span className="text-[11px] text-stone-400">
                    Allow browser push notifications for upcoming holiday events.
                  </span>
                </div>
                <button
                  onClick={() => toggleConsent('festiveReminders')}
                  className={`w-10 h-6 rounded-full transition relative ${
                    complianceState.festiveReminders ? 'bg-indigo-500' : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition transform ${
                      complianceState.festiveReminders ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Subject Rights (GDPR Art. 17 & 20) */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif font-bold text-stone-900 dark:text-white text-sm">
              Your Statutory Rights (GDPR & CCPA)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Portability */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 flex flex-col justify-between space-y-3">
                <div>
                  <span className="font-bold text-stone-800 dark:text-stone-200 block text-xs">
                    Right to Data Portability
                  </span>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Download a full verifiable machine-readable copy (JSON) of your saved data.
                  </span>
                </div>
                <button
                  onClick={handleExportDataPackage}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {downloadSuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                  <span>{downloadSuccess ? 'Downloaded!' : 'Export My Data (.JSON)'}</span>
                </button>
              </div>

              {/* Erasure */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex flex-col justify-between space-y-3">
                <div>
                  <span className="font-bold text-rose-800 dark:text-rose-300 block text-xs">
                    Right to Erasure (Be Forgotten)
                  </span>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    Permanently scrub your encrypted notes, reminders, and cloud sync records.
                  </span>
                </div>
                <button
                  onClick={handlePurge}
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  {purgeSuccess ? <Check className="w-3.5 h-3.5" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>{purgeSuccess ? 'Purged Successfully' : 'Purge All My Data'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audit Logs */}
          {complianceState.auditLogs.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                Recent Privacy Audit Trail
              </span>
              <div className="p-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 font-mono text-[10px] space-y-1 text-stone-600 dark:text-stone-300 max-h-32 overflow-y-auto">
                {complianceState.auditLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span>{log.action}</span>
                    <span className="text-stone-400">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
