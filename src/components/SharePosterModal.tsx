import React, { useState } from 'react';
import { 
  X, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Instagram, 
  Linkedin, 
  Twitter, 
  MessageCircle,
  Calendar,
  MapPin,
  Volume2
} from 'lucide-react';
import { Holiday } from '../types';
import confetti from 'canvas-confetti';

interface SharePosterModalProps {
  holiday: Holiday;
  isOpen: boolean;
  onClose: () => void;
}

export const SharePosterModal: React.FC<SharePosterModalProps> = ({ holiday, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'poster' | 'caption'>('poster');
  const [activePlatform, setActivePlatform] = useState<'instagram' | 'x' | 'whatsapp' | 'linkedin'>('instagram');

  if (!isOpen) return null;

  const getCaptions = () => {
    switch (activePlatform) {
      case 'instagram':
        return `✨ Counting down to ${holiday.name} in ${holiday.country}! 🌍\n\n"${holiday.greeting}"\n\nDid you know? ${holiday.facts[0]}\n\nTraditions include:\n${holiday.traditions.slice(0, 2).map(t => `• ${t}`).join('\n')}\n\nJoin the worldwide celebration on WorldFest! 🏮🎉\n\n${holiday.tags.map(t => `#${t.replace(/\s+/g, '')}`).join(' ')} #WorldFest #GlobalTraditions`;
      case 'whatsapp':
        return `🏮 *${holiday.name}* (${holiday.country})\n📅 Date: ${holiday.date}\n✨ Traditional Greeting: "${holiday.greeting}"\n\n"${holiday.description}"\n\nTraditions:\n${holiday.traditions.slice(0, 3).map(t => `• ${t}`).join('\n')}\n\nCelebrate together on WorldFest: ${typeof window !== 'undefined' ? window.location.origin : ''}`;
      case 'linkedin':
        return `🌐 Cultural Awareness & Inclusion Spotlight: ${holiday.name}\n\nCelebrated across ${holiday.country}, ${holiday.name} represents unity, heritage, and timeless communal values.\n\nKey traditional observances:\n${holiday.traditions.map(t => `- ${t}`).join('\n')}\n\nTraditional greeting: "${holiday.greeting}"\n\nHonoring our diverse global workforce and community partners. #CulturalDiversity #GlobalHeritage #${holiday.name.replace(/\s+/g, '')}`;
      case 'x':
        return `🎉 Countdown is ON for ${holiday.name}! (${holiday.date})\n\n"${holiday.greeting}"\n\nDid you know: ${holiday.facts[0]}\n\nExplore world celebrations on WorldFest! 🌍✨\n\n#${holiday.name.replace(/\s+/g, '')} #WorldHolidays`;
    }
  };

  const handleCopy = () => {
    const text = getCaptions();
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${holiday.name} - Worldwide Celebration`,
          text: `Countdown to ${holiday.name} on ${holiday.date}! "${holiday.greeting}"`,
          url: window.location.href
        });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 dark:text-white text-base">
                Viral Share & Poster Generator
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Share {holiday.name} across social networks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-stone-200 dark:border-stone-800 flex gap-2">
          <button
            onClick={() => setSelectedFormat('poster')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedFormat === 'poster'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            High-Impact Poster Card
          </button>
          <button
            onClick={() => setSelectedFormat('caption')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedFormat === 'caption'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            Social Captions & Hashtags
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {selectedFormat === 'poster' ? (
            <div className="space-y-3">
              {/* Virtual Rendered Poster Canvas */}
              <div 
                id={`poster-card-${holiday.id}`}
                className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-square w-full shadow-xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between p-6 text-white"
              >
                <img
                  src={holiday.bannerUrl}
                  alt={holiday.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 -z-10" />

                {/* Top Branding */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold tracking-wider uppercase text-[10px]">WorldFest Special Day</span>
                  </div>
                  <span className="text-xs font-mono font-bold bg-rose-600/90 px-2.5 py-1 rounded-full shadow">
                    {holiday.date}
                  </span>
                </div>

                {/* Center / Bottom Typographic Art */}
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center gap-1 text-xs text-rose-300 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{holiday.country}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight drop-shadow-lg">
                    {holiday.name}
                  </h2>
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm italic text-amber-200">
                    "{holiday.greeting}"
                  </div>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {holiday.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/20 text-[10px] text-stone-300">
                    <span>worldfest.app • Celebrate World Traditions</span>
                    <span>190+ Countries</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-center text-stone-500 dark:text-stone-400">
                Optimized 1:1 square for Instagram, WhatsApp status, and digital greetings.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Platform Selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePlatform('instagram')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activePlatform === 'instagram'
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border border-rose-300 dark:border-rose-800'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </button>
                <button
                  onClick={() => setActivePlatform('x')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activePlatform === 'x'
                      ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 border border-sky-300 dark:border-sky-800'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>Twitter / X</span>
                </button>
                <button
                  onClick={() => setActivePlatform('whatsapp')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activePlatform === 'whatsapp'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={() => setActivePlatform('linkedin')}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition ${
                    activePlatform === 'linkedin'
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border border-indigo-300 dark:border-indigo-800'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </button>
              </div>

              {/* Caption Text Box */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm font-sans whitespace-pre-line text-stone-800 dark:text-stone-200 max-h-60 overflow-y-auto">
                {getCaptions()}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/80 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Text & Hashtags
              </>
            )}
          </button>

          <button
            onClick={handleNativeShare}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md shadow-rose-500/20"
          >
            <Share2 className="w-4 h-4" />
            Share to Socials
          </button>
        </div>
      </div>
    </div>
  );
};
