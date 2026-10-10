import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Instagram, 
  Sparkles, 
  Calendar, 
  MapPin,
  Share2,
  Layers
} from 'lucide-react';
import { Holiday, CommunityPost } from '../types';
import confetti from 'canvas-confetti';

interface InstagramStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  holiday?: Holiday | null;
  post?: CommunityPost | null;
}

export const InstagramStoryModal: React.FC<InstagramStoryModalProps> = ({
  isOpen,
  onClose,
  holiday,
  post
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const title = holiday ? holiday.name : post?.title || 'Cultural Story';
  const subtitle = holiday ? `${holiday.country} • ${holiday.date}` : `By ${post?.author || 'Community'} • ${post?.holidayName || 'WorldFest'}`;
  const quote = holiday ? `"${holiday.greeting}"` : `"${post?.content?.slice(0, 120) || ''}..."`;
  const tags = holiday 
    ? [`#${holiday.name.replace(/\s+/g, '')}`, `#${holiday.country.replace(/\s+/g, '')}`, '#WorldFest', '#CultureStory', '#FestiveVibes']
    : ['#WorldFest', '#CommunityStory', `#${post?.holidayName.replace(/\s+/g, '') || 'Traditions'}`];

  // Draw 1080x1920 Instagram Story onto canvas
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 1080 x 1920 (Standard 9:16 Instagram Story)
    canvas.width = 1080;
    canvas.height = 1920;

    // Background base
    const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
    grad.addColorStop(0, '#1c1917'); // stone-900
    grad.addColorStop(0.4, '#292524'); // stone-800
    grad.addColorStop(0.7, '#4c0519'); // rose-950
    grad.addColorStop(1, '#1e1b4b'); // indigo-950
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle decorative geometric glow circles
    ctx.save();
    ctx.globalAlpha = 0.25;
    const glow1 = ctx.createRadialGradient(250, 450, 50, 250, 450, 400);
    glow1.addColorStop(0, '#e11d48');
    glow1.addColorStop(1, 'transparent');
    ctx.fillStyle = glow1;
    ctx.beginPath();
    ctx.arc(250, 450, 400, 0, Math.PI * 2);
    ctx.fill();

    const glow2 = ctx.createRadialGradient(850, 1400, 50, 850, 1400, 450);
    glow2.addColorStop(0, '#6366f1');
    glow2.addColorStop(1, 'transparent');
    ctx.fillStyle = glow2;
    ctx.beginPath();
    ctx.arc(850, 1400, 450, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Border accent frame
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 960, 1800);

    // Top Brand Pill
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.roundRect(320, 140, 440, 70, [35]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#fde047'; // Amber
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ WORLDFEST HERITAGE ✨', 540, 186);
    ctx.restore();

    // Central Card Container
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.roundRect(110, 280, 860, 1400, [48]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Image thumbnail placeholder / frame
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
    ctx.roundRect(160, 340, 760, 580, [36]);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.stroke();
    ctx.restore();

    // Load and draw image if available
    const imageUrl = holiday?.bannerUrl;
    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(160, 340, 760, 580, [36]);
        ctx.clip();
        ctx.drawImage(img, 160, 340, 760, 580);

        // Dark overlay on image
        const imgOverlay = ctx.createLinearGradient(160, 340, 160, 920);
        imgOverlay.addColorStop(0, 'rgba(0,0,0,0.1)');
        imgOverlay.addColorStop(1, 'rgba(0,0,0,0.6)');
        ctx.fillStyle = imgOverlay;
        ctx.fillRect(160, 340, 760, 580);
        ctx.restore();

        drawRemainingText();
      };
      img.onerror = () => {
        drawRemainingText();
      };
      img.src = imageUrl;
    } else {
      drawRemainingText();
    }

    function drawRemainingText() {
      if (!ctx) return;
      // Subtitle pill / Tag
      ctx.save();
      ctx.fillStyle = '#e11d48';
      ctx.roundRect(170, 970, 380, 55, [28]);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(subtitle.toUpperCase().slice(0, 28), 360, 1006);
      ctx.restore();

      // Main Title
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 64px Georgia, serif';
      ctx.textAlign = 'left';

      // Multiline wrap for title
      const words = title.split(' ');
      let line = '';
      let y = 1100;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 740 && n > 0) {
          ctx.fillText(line, 170, y);
          line = words[n] + ' ';
          y += 76;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 170, y);
      ctx.restore();

      // Quote / Greeting
      ctx.save();
      ctx.fillStyle = '#fbcfe8'; // pink-200
      ctx.font = 'italic 34px Georgia, serif';
      ctx.textAlign = 'left';

      const quoteWords = quote.split(' ');
      let qLine = '';
      let qY = y + 80;
      for (let m = 0; m < quoteWords.length; m++) {
        const testQLine = qLine + quoteWords[m] + ' ';
        const metrics = ctx.measureText(testQLine);
        if (metrics.width > 740 && m > 0) {
          ctx.fillText(qLine, 170, qY);
          qLine = quoteWords[m] + ' ';
          qY += 46;
        } else {
          qLine = testQLine;
        }
      }
      ctx.fillText(qLine, 170, qY);
      ctx.restore();

      // Interactive Sticker simulation for Instagram Story
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.roundRect(240, 1420, 600, 90, [45]);
      ctx.fill();
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 20;

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔗 TAP TO DISCOVER ON WORLDFEST', 540, 1476);
      ctx.restore();

      // Hashtags footer
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(tags.join('   '), 540, 1600);
      ctx.restore();

      // Bottom footer signature
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Celebrating 190+ Sovereign Cultures & Delicacies Worldwide', 540, 1780);
      ctx.restore();
    }
  }, [isOpen, holiday, post, title, subtitle, quote]);

  if (!isOpen) return null;

  const storyCaption = `✨ Celebrating ${title}! ${subtitle}\n\n${quote}\n\nJoin the global celebration & view authentic traditions on WorldFest 🏮🌍\n\n${tags.join(' ')}`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(storyCaption);
    setCopied(true);
    confetti({ particleCount: 30, spread: 60 });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadStoryImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setDownloading(true);
    try {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, '_')}_Instagram_Story.jpg`;
      link.href = dataUrl;
      link.click();
      confetti({ particleCount: 40, spread: 70 });
    } catch (e) {
      console.error('Error generating image', e);
    } finally {
      setDownloading(false);
    }
  };

  const handleOpenInstagram = () => {
    // Copy caption first for convenient paste in Instagram Story text
    handleCopyCaption();

    // Check if on mobile: attempt deep link instagram://story or web
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'instagram://story';
      setTimeout(() => {
        window.open('https://www.instagram.com', '_blank');
      }, 1000);
    } else {
      window.open('https://www.instagram.com', '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>Instagram Story Studio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  9:16 Ultra HD
                </span>
              </h3>
              <p className="text-xs text-stone-400">
                Instant story card formatted for Instagram Stories & Highlights
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Canvas Preview Container (9:16 aspect ratio) */}
          <div className="md:col-span-6 flex flex-col items-center">
            <div className="relative w-56 sm:w-64 rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-700 aspect-[9/16] bg-stone-950">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/50 backdrop-blur text-white">
                  9:16 Story Preview
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-500/80 text-white">
                  Instagram Ready
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Caption */}
          <div className="md:col-span-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-stone-800/60 border border-stone-700/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-400">
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  Story Caption & Stickers:
                </span>
                <span className="text-[10px] text-rose-400 font-mono">Auto-Generated</span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed max-h-28 overflow-y-auto whitespace-pre-line font-sans">
                {storyCaption}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleDownloadStoryImage}
                disabled={downloading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Rendering HD Card...' : '1. Download 9:16 Story Card'}</span>
              </button>

              <button
                onClick={handleOpenInstagram}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition active:scale-[0.98]"
              >
                <Instagram className="w-4 h-4" />
                <span>2. Copy Caption & Open Instagram</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={handleCopyCaption}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 border border-stone-700 transition"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Caption & Hashtags Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>Copy Text & Hashtags Only</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-stone-950/40 border border-stone-800 text-[11px] text-stone-400">
              💡 <span className="font-semibold text-stone-300">How to post:</span> Click <em>Download 9:16 Story Card</em>, then <em>Open Instagram</em>, swipe right to your Story camera, pick your downloaded card, and paste your caption!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
