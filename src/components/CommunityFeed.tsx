import React, { useState, useRef } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Send, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Globe2, 
  Filter,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { CommunityPost, Holiday } from '../types';
import { encryptText } from '../utils/crypto';
import { SocialShareWidget } from './SocialShareWidget';
import confetti from 'canvas-confetti';

interface SwipeablePostCardProps {
  post: CommunityPost;
  onLikePost: (postId: string) => void;
}

const SwipeablePostCard: React.FC<SwipeablePostCardProps> = ({ post, onLikePost }) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const touchStartXRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - touchStartXRef.current;
    if (diff > 0) {
      setDragOffset(Math.min(120, diff));
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 70) {
      onLikePost(post.id);
      confetti({ particleCount: 20, spread: 45 });
    }
    setDragOffset(0);
    setIsSwiping(false);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background revealed on swipe right */}
      <div 
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 flex items-center px-6 text-white font-bold text-xs gap-2 rounded-2xl"
        style={{ opacity: Math.min(1, dragOffset / 50) }}
      >
        <Heart className="w-5 h-5 fill-white animate-pulse" />
        <span>{dragOffset > 70 ? 'Release to Like! ❤️' : 'Swipe Right to Like'}</span>
      </div>

      {/* Foreground Post Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isSwiping ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative z-10 p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3 cursor-grab active:cursor-grabbing"
      >
        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={post.avatar}
              alt={post.author}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-stone-200 dark:border-stone-700"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-stone-900 dark:text-white">
                  {post.author}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                  {post.authorCountry}
                </span>
                {post.isEncrypted && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 font-mono">
                    <Lock className="w-3 h-3" />
                    E2EE
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-400">{post.timestamp}</span>
            </div>
          </div>

          <span className="text-xs font-mono font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
            {post.holidayName}
          </span>
        </div>

        {/* Post Body */}
        <div>
          <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-white">
            {post.title}
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1.5 leading-relaxed">
            {post.content}
          </p>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] text-stone-500 dark:text-stone-400 hover:text-rose-500 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions: Like, Comment, Share */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLikePost(post.id)}
              className={`flex items-center gap-1.5 transition ${
                post.likedByMe ? 'text-rose-500 font-bold' : 'hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${post.likedByMe ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{post.likes}</span>
            </button>

            <span className="flex items-center gap-1.5 text-stone-500">
              <MessageSquare className="w-4 h-4" />
              <span>{post.comments?.length || 0} Comments</span>
            </span>

            <span className="hidden sm:inline-block text-[11px] text-stone-400 italic">
              💡 Swipe right to like
            </span>
          </div>

          {/* Instant Social Media Sharing */}
          <SocialShareWidget post={post} variant="compact" />
        </div>

        {/* Comments Thread if present */}
        {post.comments && post.comments.length > 0 && (
          <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
            {post.comments.map(c => (
              <div key={c.id} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 text-xs">
                <div className="flex items-center justify-between text-stone-500 mb-1">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">
                    {c.author} ({c.authorCountry})
                  </span>
                  <span className="text-[10px]">{c.timestamp}</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300">{c.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface CommunityFeedProps {
  posts: CommunityPost[];
  holidays: Holiday[];
  onAddPost: (post: { holidayId: string; holidayName: string; title: string; content: string; isEncrypted: boolean }) => void;
  onLikePost: (postId: string) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  posts,
  holidays,
  onAddPost,
  onLikePost
}) => {
  const [selectedHolidayId, setSelectedHolidayId] = useState<string>(holidays[0]?.id || '');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [encryptPost, setEncryptPost] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterHoliday, setFilterHoliday] = useState<string>('all');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    setIsSubmitting(true);
    const chosenHoliday = holidays.find(h => h.id === selectedHolidayId) || holidays[0];

    let postTitle = newTitle.trim();
    let postContent = newContent.trim();

    if (encryptPost) {
      postTitle = await encryptText(postTitle, 'worldfest-community-key');
      postContent = await encryptText(postContent, 'worldfest-community-key');
    }

    onAddPost({
      holidayId: chosenHoliday.id,
      holidayName: chosenHoliday.name,
      title: postTitle,
      content: postContent,
      isEncrypted: encryptPost
    });

    setNewTitle('');
    setNewContent('');
    setIsSubmitting(false);
    confetti({ particleCount: 30, spread: 60 });
  };

  const displayedPosts = filterHoliday === 'all'
    ? posts
    : posts.filter(p => p.holidayId === filterHoliday);

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 sm:p-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300/40">
              Community Hub
            </span>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              {posts.length} Global Stories
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
            Global Celebration Stories & Traditions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-xl">
            Read first-hand accounts from community members observing ancient and contemporary holidays worldwide.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Create Post Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Share Your Tradition Story
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400 mb-1">
                  Select Holiday / Celebration
                </label>
                <select
                  value={selectedHolidayId}
                  onChange={(e) => setSelectedHolidayId(e.target.value)}
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:ring-1 focus:ring-rose-500 outline-none"
                >
                  {holidays.map(h => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400 mb-1">
                  Story Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How we celebrate..."
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:ring-1 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-stone-400 mb-1">
                  Your Cultural Memory / Experience
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Describe your family ritual, the scents, music, or how visitors are welcomed..."
                  className="w-full text-xs sm:text-sm p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 focus:ring-1 focus:ring-rose-500 outline-none resize-none"
                />
              </div>

              {/* Encryption Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-stone-700 dark:text-stone-300 font-medium">
                    Encrypt with End-to-End Key
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={encryptPost}
                  onChange={(e) => setEncryptPost(e.target.checked)}
                  className="rounded text-rose-500 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newTitle.trim() || !newContent.trim()}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 shadow-md shadow-rose-500/20"
              >
                <Send className="w-4 h-4" />
                <span>Publish Story to Community</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Feed Filter */}
          <div className="flex items-center justify-between bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2 text-xs font-medium text-stone-600 dark:text-stone-300">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>Filter by Celebration:</span>
            </div>
            <select
              value={filterHoliday}
              onChange={(e) => setFilterHoliday(e.target.value)}
              className="text-xs bg-stone-100 dark:bg-stone-800 border-none rounded-lg px-2.5 py-1.5 font-medium text-stone-800 dark:text-stone-200 outline-none"
            >
              <option value="all">All Celebrations</option>
              {holidays.map(h => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* Posts List */}
          {displayedPosts.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 text-stone-500 text-xs">
              No stories published for this festival yet. Be the first to share your cultural memory!
            </div>
          ) : (
            displayedPosts.map((post) => (
              <SwipeablePostCard key={post.id} post={post} onLikePost={onLikePost} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
