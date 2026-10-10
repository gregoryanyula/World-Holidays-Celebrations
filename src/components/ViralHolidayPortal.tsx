import React, { useState, useRef, useEffect } from 'react';
import { 
  Globe2, 
  Sparkles, 
  Share2, 
  Bookmark, 
  Play, 
  Download, 
  Copy, 
  Check, 
  Tag, 
  Gift, 
  ArrowRight, 
  Volume2, 
  Calendar as CalendarIcon, 
  MapPin, 
  Package, 
  Heart, 
  Users, 
  ExternalLink,
  MessageCircle,
  Twitter,
  Linkedin,
  Film,
  X
} from 'lucide-react';
import { Holiday } from '../types';
import { SocialShareWidget } from './SocialShareWidget';
import confetti from 'canvas-confetti';

interface ViralHolidayPortalProps {
  holidays: Holiday[];
  onSelectHoliday: (holiday: Holiday) => void;
  onOpenRentDecor: (holiday?: Holiday) => void;
  onOpenSharePoster: (holiday: Holiday) => void;
}

interface CelebrationVideo {
  id: string;
  holidayId: string;
  holidayName: string;
  country: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string; // Embeddable/direct preview
  description: string;
}

export const VIRAL_VIDEOS: CelebrationVideo[] = [
  {
    id: 'vid-diwali',
    holidayId: 'diwali',
    holidayName: 'Diwali',
    country: 'India',
    title: 'Varanasi Ghats: 100,000 Floating Diyas at Dusk',
    duration: '1:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/HrrW3rO51ak?autoplay=1',
    description: 'Breathtaking celestial illumination along the sacred Ganges riverbank with ceremonial bells and chants.'
  },
  {
    id: 'vid-muertos',
    holidayId: 'dia_de_los_muertos',
    holidayName: 'Día de los Muertos',
    country: 'Mexico',
    title: 'Oaxaca Midnight Vigil: Marigolds, Copal & Memory',
    duration: '2:15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/s24z51-9sW8?autoplay=1',
    description: 'Ancestral welcoming rituals in San Agustín Etla with monumental sand tapestries and brass bands.'
  },
  {
    id: 'vid-carnival',
    holidayId: 'carnival_rio',
    holidayName: 'Rio Carnival',
    country: 'Brazil',
    title: 'Sambadrome Parades: The Rhythms of Mangueira',
    duration: '2:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/G6g5F2k4n38?autoplay=1',
    description: 'Explosion of batucada percussion, monumental floats, and feathered dancers under midnight floodlights.'
  },
  {
    id: 'vid-songkran',
    holidayId: 'songkran',
    holidayName: 'Songkran Festival',
    country: 'Thailand',
    title: 'Chiang Mai Ancient Moats: Cleansing Water War',
    duration: '1:50',
    thumbnailUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/kFj0u91_2bE?autoplay=1',
    description: 'Nationwide renewal splashing ceremony washing away misfortune to welcome the Buddhist Solar New Year.'
  },
  {
    id: 'vid-oktoberfest',
    holidayId: 'oktoberfest',
    holidayName: 'Oktoberfest',
    country: 'Germany',
    title: 'Theresienwiese: Traditional Brass Oompah & Bierzelt',
    duration: '2:10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/NnI4K2mZ9tY?autoplay=1',
    description: 'Rousing toast rituals (Ein Prosit), rustic wooden beer barrels, and alpine folk celebrations.'
  },
  {
    id: 'vid-midsummer',
    holidayId: 'midsummer',
    holidayName: 'Midsummer',
    country: 'Sweden',
    title: 'Dalarna Archipelago: Maypole Floral Dance at Midnight Sun',
    duration: '1:40',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/5aLh7cM6N4w?autoplay=1',
    description: 'Woven wildflower crowns, smoked herring feasts, and joyful traditional ring dances under perpetual daylight.'
  }
];

export const ViralHolidayPortal: React.FC<ViralHolidayPortalProps> = ({
  holidays,
  onSelectHoliday,
  onOpenRentDecor,
  onOpenSharePoster
}) => {
  // Referral system state
  const [referralCount, setReferralCount] = useState<number>(() => {
    return Number(localStorage.getItem('worldfest_ref_count') || 2);
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeVideo, setActiveVideo] = useState<CelebrationVideo | null>(null);

  // Poster Designer State
  const [posterHolidayId, setPosterHolidayId] = useState<string>(holidays[0]?.id || 'diwali');
  const [posterTheme, setPosterTheme] = useState<'midnight_gold' | 'vibrant_fiesta' | 'sacred_heritage' | 'nordic_minimal'>('midnight_gold');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const selectedPosterHoliday = holidays.find(h => h.id === posterHolidayId) || holidays[0];

  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=CELEBRATE-2026&utm_source=viral_share` 
    : 'https://worldfest.app/?ref=CELEBRATE-2026';

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopiedLink(true);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSimulateInvite = () => {
    const next = referralCount + 1;
    setReferralCount(next);
    localStorage.setItem('worldfest_ref_count', String(next));
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
  };

  const handleBookmarkGuide = () => {
    setBookmarked(true);
    localStorage.setItem('worldfest_guide_bookmarked', 'true');
    confetti({ particleCount: 30, spread: 50 });
  };

  // High-Resolution Poster Canvas Generator
  useEffect(() => {
    if (!canvasRef.current || !selectedPosterHoliday) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1080x1080 square Instagram/WhatsApp poster
    canvas.width = 1080;
    canvas.height = 1080;

    // Background gradient based on theme
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
    if (posterTheme === 'midnight_gold') {
      bgGrad.addColorStop(0, '#0f0c1b');
      bgGrad.addColorStop(0.5, '#1e112a');
      bgGrad.addColorStop(1, '#09050d');
    } else if (posterTheme === 'vibrant_fiesta') {
      bgGrad.addColorStop(0, '#e11d48');
      bgGrad.addColorStop(0.5, '#ea580c');
      bgGrad.addColorStop(1, '#7c2d12');
    } else if (posterTheme === 'sacred_heritage') {
      bgGrad.addColorStop(0, '#134e4a');
      bgGrad.addColorStop(0.5, '#065f46');
      bgGrad.addColorStop(1, '#022c22');
    } else {
      bgGrad.addColorStop(0, '#1e293b');
      bgGrad.addColorStop(0.5, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle decorative rings / sacred geometries
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(540, 540, 420, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(540, 540, 320, 0, Math.PI * 2);
    ctx.stroke();

    // Top Header Pill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.roundRect(140, 90, 800, 70, 35);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ALL MAJOR HOLIDAYS · GLOBAL CELEBRATIONS & ORIGINS', 540, 134);

    // Country & Date
    ctx.fillStyle = '#fda4af';
    ctx.font = '600 32px sans-serif';
    ctx.fillText(`${selectedPosterHoliday.country.toUpperCase()}  •  ${selectedPosterHoliday.date}`, 540, 260);

    // Holiday Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px Georgia, serif';
    ctx.fillText(selectedPosterHoliday.name, 540, 360);

    if (selectedPosterHoliday.localName) {
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'italic 34px Georgia, serif';
      ctx.fillText(`“${selectedPosterHoliday.localName}”`, 540, 420);
    }

    // Greeting Card Quote Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(100, 480, 880, 140, 24);
    ctx.fill();

    ctx.fillStyle = '#fde68a';
    ctx.font = 'italic bold 36px Georgia, serif';
    ctx.fillText(`"${selectedPosterHoliday.greeting}"`, 540, 560);

    // Key Traditions & Facts
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('SACRED OBSERVANCES & RITUALS:', 140, 680);

    ctx.font = 'normal 26px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    selectedPosterHoliday.traditions.slice(0, 3).forEach((t, i) => {
      ctx.fillText(`• ${t}`, 140, 730 + i * 45);
    });

    // Bottom Footer
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(100, 920, 880, 2);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('100+ Major Holidays · 165+ Countries · Origins & Traditions', 140, 975);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#fb7185';
    ctx.fillText('Free Reference Guide: worldfest.app', 940, 975);
  }, [posterHolidayId, posterTheme, selectedPosterHoliday]);

  const handleDownloadPoster = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${selectedPosterHoliday.name.replace(/\s+/g, '_')}_Global_Holiday_Poster.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
    confetti({ particleCount: 40, spread: 60 });
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. VIRAL HERO BANNER WITH REQUIRED REBRAND & TL;DR */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-stone-950 via-purple-950 to-stone-900 border border-stone-800 text-white p-6 sm:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.15),transparent_50%)]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              100+ Major Holidays · 165+ Countries
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-stone-300 text-xs font-medium">
              Free Definitive Reference Guide
            </span>
          </div>

          {/* Mandatory Rebrand Title */}
          <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight bg-gradient-to-r from-white via-stone-100 to-amber-200 bg-clip-text text-transparent">
            All Major Holidays: A Full List of Global Celebrations & Origins
          </h1>

          {/* Mandatory TL;DR Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-stone-100 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase">
              <Tag className="w-3.5 h-3.5" />
              <span>TL;DR Cultural Reference</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed font-sans text-stone-200">
              <strong className="text-white">100+ major holidays</strong> from <strong className="text-white">165+ countries</strong>, their origins, traditions, and key dates. Whether you’re planning a trip, studying cultures, or just curious, this is your ultimate reference for global celebrations—from New Year’s Eve to Diwali and beyond. Bookmark this for quick facts on dates, significance, and how to observe them respectfully.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleBookmarkGuide}
              className={`py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition shadow-lg ${
                bookmarked 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-white text-stone-950 hover:bg-stone-100 shadow-white/10'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
              <span>{bookmarked ? '✓ Bookmarked in Browser' : 'Bookmark This Reference (Ctrl + D)'}</span>
            </button>

            <button
              onClick={() => onOpenRentDecor()}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white hover:opacity-95 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-rose-500/20 transition"
            >
              <Package className="w-4 h-4" />
              <span>Rent Event Decor</span>
            </button>

            <button
              onClick={handleCopyReferral}
              className="py-3.5 px-6 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur border border-white/25 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition"
            >
              <Share2 className="w-4 h-4 text-rose-300" />
              <span>{copiedLink ? 'Free Link Copied!' : 'Copy Free Share Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. "RENT EVENT DECOR" CELEBRATION CONCIERGE BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-300/50 dark:border-amber-700/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5" />
            <span>Turnkey Celebration Decor Rentals</span>
          </div>
          <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900 dark:text-white">
            Rent Event Decor for Your Next Cultural Gathering
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Authentic ceremonial styling delivered straight to your door: pure brass hanging diyas for Diwali, authentic Oaxaca 3-tier ofrenda arches for Día de los Muertos, Bavarian brewery table sets for Oktoberfest, and imperial silk lanterns. Complete with free return packing and setup concierge.
          </p>
        </div>

        <button
          onClick={() => onOpenRentDecor()}
          className="shrink-0 py-3 px-6 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 shadow-md transition"
        >
          <span>Explore Decor Packages</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. CINEMATIC CELEBRATION REELS & VIDEO HIGHLIGHTS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Film className="w-4 h-4" />
              <span>Cinematic Celebration Video Reels</span>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white mt-1">
              Watch Authentic World Festivities in Motion
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-mono">
            High-Definition Global Footage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VIRAL_VIDEOS.map(video => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Play Icon Circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-rose-600 ml-0.5" />
                  </div>
                </div>

                <span className="absolute bottom-2 right-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur">
                  {video.duration}
                </span>

                <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600/90 text-white">
                  {video.holidayName} · {video.country}
                </span>
              </div>

              <div className="p-4 space-y-1.5 bg-white dark:bg-stone-900 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white line-clamp-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition">
                    {video.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 font-semibold">
                  <span>Watch Video Reel</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. VIRAL POSTER GENERATOR & CANVAS EXPORT */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>High-Resolution Poster & Social Card Generator</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-white mt-1">
              Create & Export Shareable Celebration Posters
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Generate 1080x1080 square social graphics for Instagram, WhatsApp status, and classroom presentations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPoster}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold flex items-center gap-2 hover:opacity-95 shadow-md shadow-rose-500/20 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Poster (.PNG)</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 mb-1.5">
                Select Holiday (100+ Celebrations)
              </label>
              <select
                value={posterHolidayId}
                onChange={(e) => setPosterHolidayId(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none"
              >
                {holidays.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.name} — {h.country} ({h.date})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 mb-1.5">
                Poster Aesthetic Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'midnight_gold', label: 'Midnight Gold (Cinematic)' },
                  { id: 'vibrant_fiesta', label: 'Vibrant Fiesta (Bold)' },
                  { id: 'sacred_heritage', label: 'Sacred Emerald (Heritage)' },
                  { id: 'nordic_minimal', label: 'Nordic Slate (Minimal)' }
                ].map(th => (
                  <button
                    key={th.id}
                    onClick={() => setPosterTheme(th.id as any)}
                    className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition ${
                      posterTheme === th.id
                        ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 shadow-xs'
                        : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Share to Social Media Channels */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Instant Share to Social Media:
              </span>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`🏮 Explore ${selectedPosterHoliday.name} (${selectedPosterHoliday.date}) on All Major Holidays reference: ${referralUrl}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`✨ Countdown to ${selectedPosterHoliday.name}! Full origins & traditions guide on All Major Holidays:`)}&url=${encodeURIComponent(referralUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition"
                >
                  <Twitter className="w-3.5 h-3.5" />
                  <span>X / Twitter</span>
                </a>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={() => onOpenSharePoster(selectedPosterHoliday)}
                  className="py-2 px-3 rounded-xl bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 hover:bg-stone-300 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>More Networks</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Canvas Output Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-stone-300 dark:border-stone-700 aspect-square bg-stone-950">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[11px] text-stone-400 mt-2 font-mono">
              Live Canvas Render · 1080 x 1080 px Studio Quality
            </span>
          </div>
        </div>
      </div>

      {/* 5. REFERRAL FREE LINKS & AMBASSADOR PERKS */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-950 to-stone-950 text-white border border-indigo-900/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Gift className="w-4 h-4" />
              <span>Ambassador Referral Program & Free Rewards</span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-1">
              Share Your Free Link & Unlock Event Decor Credits
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Invite friends, educators, and event planners to bookmark this free global holiday reference. Every invite unlocks discounts on authentic event decor rentals and downloadable 4K poster collections.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-indigo-300 block">Your Verified Invites:</span>
            <span className="text-3xl font-serif font-black text-amber-300">{referralCount} Friends</span>
          </div>
        </div>

        {/* Milestone Progression Bar */}
        <div className="space-y-2">
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (referralCount / 10) * 100)}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className={`p-2.5 rounded-xl border ${referralCount >= 3 ? 'bg-amber-500/20 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-stone-400'}`}>
              <span className="font-bold block text-[11px]">Tier 1 (3 Invites)</span>
              <span>20% Off Event Decor</span>
              {referralCount >= 3 && <span className="text-emerald-400 text-[10px] block font-bold">✓ Unlocked! Code: CULTURE20</span>}
            </div>

            <div className={`p-2.5 rounded-xl border ${referralCount >= 5 ? 'bg-amber-500/20 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-stone-400'}`}>
              <span className="font-bold block text-[11px]">Tier 2 (5 Invites)</span>
              <span>Free 4K Poster Pack</span>
              {referralCount >= 5 && <span className="text-emerald-400 text-[10px] block font-bold">✓ Unlocked!</span>}
            </div>

            <div className={`p-2.5 rounded-xl border ${referralCount >= 10 ? 'bg-amber-500/20 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-stone-400'}`}>
              <span className="font-bold block text-[11px]">Tier 3 (10 Invites)</span>
              <span>$100 Decor Rental Credit</span>
              {referralCount >= 10 ? <span className="text-emerald-400 text-[10px] block font-bold">✓ Unlocked! Code: AMBASSADOR</span> : <span className="text-[10px] text-stone-400 block">{10 - referralCount} more needed</span>}
            </div>
          </div>
        </div>

        {/* Copy Referral Box */}
        <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-300 truncate w-full sm:w-auto">
            <Globe2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">{referralUrl}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={handleCopyReferral}
              className="flex-1 sm:flex-none py-2 px-4 rounded-xl bg-white text-stone-900 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-stone-100 transition"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied!' : 'Copy Free Link'}</span>
            </button>

            <button
              onClick={handleSimulateInvite}
              className="py-2 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition"
              title="Test simulation: increments referral count to unlock reward tier codes immediately"
            >
              + Simulate Invite
            </button>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-stone-950 w-full max-w-3xl rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between text-white">
              <div>
                <span className="text-xs text-rose-400 font-bold uppercase">{activeVideo.holidayName} · {activeVideo.country}</span>
                <h3 className="font-serif font-bold text-lg">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>

            <div className="p-4 bg-stone-900 text-xs text-stone-300 flex items-center justify-between">
              <p>{activeVideo.description}</p>
              <button
                onClick={() => {
                  const match = holidays.find(h => h.id === activeVideo.holidayId);
                  if (match) onSelectHoliday(match);
                  setActiveVideo(null);
                }}
                className="shrink-0 ml-4 py-2 px-3 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-500 transition"
              >
                View Full Lore & Dates →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
