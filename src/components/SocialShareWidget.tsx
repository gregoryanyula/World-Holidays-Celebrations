import React, { useState } from 'react';
import { 
  Instagram, 
  Twitter, 
  MessageCircle, 
  Share2, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Holiday, CommunityPost } from '../types';
import { InstagramStoryModal } from './InstagramStoryModal';
import confetti from 'canvas-confetti';

interface SocialShareWidgetProps {
  holiday?: Holiday;
  post?: CommunityPost;
  variant?: 'compact' | 'expanded';
  className?: string;
  titlePrefix?: string;
}

export const SocialShareWidget: React.FC<SocialShareWidgetProps> = ({
  holiday,
  post,
  variant = 'compact',
  className = '',
  titlePrefix
}) => {
  const [copied, setCopied] = useState(false);
  const [instagramModalOpen, setInstagramModalOpen] = useState(false);

  const itemName = holiday ? holiday.name : post?.title || 'Cultural Story';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://worldfest.app';

  // Formatted content for WhatsApp
  const getWhatsAppText = (): string => {
    if (holiday) {
      return `🏮 *${holiday.name}* (${holiday.country})\n` +
        `📅 Date: ${holiday.date}\n` +
        `✨ Traditional Greeting: "${holiday.greeting}"\n\n` +
        `"${holiday.description}"\n\n` +
        `Discover world countdowns, culinary recipes & traditions on WorldFest:\n${shareUrl}`;
    }
    if (post) {
      return `📖 *${post.title}*\n` +
        `Festive memory by ${post.author} celebrating ${post.holidayName}:\n` +
        `"${post.content.slice(0, 160)}..."\n\n` +
        `Read more inspiring global culture stories on WorldFest:\n${shareUrl}`;
    }
    return `Discover world celebrations on WorldFest: ${shareUrl}`;
  };

  // Formatted content for Twitter / X
  const getTwitterText = (): string => {
    if (holiday) {
      const tag = holiday.name.replace(/[^a-zA-Z0-9]/g, '');
      return `🎉 Countdown is on for ${holiday.name} in ${holiday.country}! "${holiday.greeting}" Explore global celebrations and recipes on @WorldFest:`;
    }
    if (post) {
      return `Inspiring cultural story by ${post.author} on ${post.holidayName}: "${post.title}" 🌍✨`;
    }
    return `Discover world celebrations on WorldFest:`;
  };

  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = getWhatsAppText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    confetti({ particleCount: 20, spread: 50 });
  };

  const handleShareTwitter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = getTwitterText();
    const tags = holiday 
      ? `${holiday.name.replace(/[^a-zA-Z0-9]/g, '')},WorldFest,CulturalHeritage` 
      : `WorldFest,HeritageStory`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(tags)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    confetti({ particleCount: 20, spread: 50 });
  };

  const handleShareInstagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInstagramModalOpen(true);
  };

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = holiday 
      ? `${holiday.name} - ${holiday.greeting} (${holiday.date}). Explore on WorldFest: ${shareUrl}`
      : `"${post?.title}" by ${post?.author} on WorldFest: ${shareUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 25, spread: 45 });
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === 'expanded') {
    return (
      <>
        <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-stone-50 via-rose-50/30 to-amber-50/40 dark:from-stone-800/80 dark:via-stone-800/60 dark:to-stone-800/40 border border-stone-200 dark:border-stone-700/80 space-y-3.5 ${className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-rose-500" />
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                {titlePrefix || 'Instant Social Media Sharing'}
              </h4>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              One-Click Publishing
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300">
            Share this festival instantly to your social channels with preformatted festive greetings and custom hashtags:
          </p>

          {/* Direct Platform Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            {/* Instagram Stories */}
            <button
              onClick={handleShareInstagram}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-500 hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
              title="Generate 9:16 Instagram Story Card & Copy Stickers"
            >
              <Instagram className="w-4 h-4 shrink-0" />
              <span>Instagram Stories</span>
            </button>

            {/* Twitter / X */}
            <button
              onClick={handleShareTwitter}
              className="py-2.5 px-3 rounded-xl bg-black hover:bg-stone-900 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
              title="Post instantly to Twitter / X"
            >
              <Twitter className="w-4 h-4 shrink-0" />
              <span>Twitter / X</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
              title="Send to WhatsApp chats or status"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Instagram Story Creator Modal */}
        <InstagramStoryModal
          isOpen={instagramModalOpen}
          onClose={() => setInstagramModalOpen(false)}
          holiday={holiday}
          post={post}
        />
      </>
    );
  }

  // Compact Variant (Inline in Community Posts or Cards)
  return (
    <>
      <div className={`flex items-center gap-1.5 ${className}`}>
        {/* Instagram Stories Button */}
        <button
          onClick={handleShareInstagram}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-pink-600 dark:text-pink-400 border border-pink-500/20 text-[11px] font-medium flex items-center gap-1 transition"
          title="Share to Instagram Stories (9:16)"
        >
          <Instagram className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Story</span>
        </button>

        {/* Twitter / X Button */}
        <button
          onClick={handleShareTwitter}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 text-[11px] font-medium flex items-center gap-1 transition"
          title="Share on Twitter / X"
        >
          <Twitter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tweet</span>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleShareWhatsApp}
          className="p-1.5 sm:px-2 sm:py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40 dark:border-emerald-800 text-[11px] font-medium flex items-center gap-1 transition"
          title="Share via WhatsApp"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>

        {/* Copy fallback */}
        <button
          onClick={handleQuickCopy}
          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          title="Copy link"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Instagram Story Creator Modal */}
      <InstagramStoryModal
        isOpen={instagramModalOpen}
        onClose={() => setInstagramModalOpen(false)}
        holiday={holiday}
        post={post}
      />
    </>
  );
};
