import React, { useState, useEffect } from 'react';
import { 
  Gift, 
  Sparkles, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  RefreshCw, 
  Heart, 
  Share2, 
  ShoppingBag, 
  Palette, 
  Sliders, 
  Copy, 
  CheckCircle2, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Holiday } from '../types';
import confetti from 'canvas-confetti';

interface GiftItem {
  name: string;
  localName?: string;
  significance: string;
  priceTier: string;
  bestFor: string;
  presentationTip: string;
}

interface GiftGuideData {
  culturalContext: string;
  auspiciousColors: string[];
  etiquetteDos: string[];
  etiquetteDonts: string[];
  gifts: GiftItem[];
}

interface GiftGuideProps {
  holiday: Holiday;
}

export const GiftGuide: React.FC<GiftGuideProps> = ({ holiday }) => {
  const [recipient, setRecipient] = useState('Family & Host');
  const [budgetTier, setBudgetTier] = useState('Thoughtful & Authentic');
  const [loading, setLoading] = useState(false);
  const [guideData, setGuideData] = useState<GiftGuideData | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showEtiquette, setShowEtiquette] = useState(true);

  // Fetch or generate gift guide on mount or holiday change
  const fetchGiftGuide = async (rec = recipient, bgt = budgetTier) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/gift-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holidayName: holiday.name,
          country: holiday.country,
          traditions: holiday.traditions,
          recipient: rec,
          budget: bgt
        })
      });
      const data = await res.json();
      setGuideData(data);
    } catch {
      // Offline fallback
      setGuideData({
        culturalContext: `Gifting during ${holiday.name} centers on sharing sweetness, honoring kinship, and reciprocating hospitality.`,
        auspiciousColors: ['Gold', 'Warm Red', 'Deep Emerald', 'Saffron'],
        etiquetteDos: [
          'Present your gift with both hands accompanied by a warm festive greeting.',
          'Consider dietary practices like vegetarian, halal, or kosher.',
          'Include a handwritten festive message wishing peace and happiness.'
        ],
        etiquetteDonts: [
          'Avoid sharp objects or scissors which can symbolize severing friendships.',
          'Refrain from somber black or plain white wrapping associated with mourning.',
          'Never offer gifts using only the left hand in South Asian or Arab cultures.'
        ],
        gifts: [
          {
            name: 'Festive Delicacy Sweets or Pastry Box',
            localName: 'Mithai / Confections',
            significance: 'Imparts sweetness and joy into the recipient’s home for the upcoming season.',
            priceTier: 'Thoughtful Gift',
            bestFor: 'Hosts & Families',
            presentationTip: 'Wrap in shimmering golden or jewel-toned fabric.'
          },
          {
            name: 'Artisanal Incense, Scented Candle or Botanical Oil',
            localName: 'Aromatics & Light',
            significance: 'Cleanses the home atmosphere and symbolizes inner illumination.',
            priceTier: 'Modest Token',
            bestFor: 'Friends & Elders',
            presentationTip: 'Present in a reusable natural jute or silk bag.'
          },
          {
            name: 'Heritage Herbal Tea & Honey Assortment',
            localName: 'Nourishing Harvest',
            significance: 'A gesture of health, longevity, and warm hospitality.',
            priceTier: 'Traditional Auspicious',
            bestFor: 'Colleagues & Mentors',
            presentationTip: 'Tie with natural ribbon and an auspicious blossom.'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGiftGuide();
  }, [holiday.id]);

  const handleCustomGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGiftGuide(recipient, budgetTier);
    try {
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  const handleCopyGift = (gift: GiftItem, idx: number) => {
    const text = `🎁 ${gift.name} (${gift.localName || ''})\nCultural Meaning: ${gift.significance}\nPrice Tier: ${gift.priceTier} | Best For: ${gift.bestFor}\nPresentation: ${gift.presentationTip}\n(From WorldFest Culturally Authentic Gift Guide for ${holiday.name})`;
    navigator.clipboard?.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="space-y-6 text-stone-800 dark:text-stone-200">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-300/50 dark:border-amber-900/40 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-white">
                Culturally Appropriate Gift Guide
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                AI-curated gifting etiquette & auspicious ideas for {holiday.name} ({holiday.country})
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/60">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Gemini AI Powered
          </span>
        </div>

        {guideData && guideData.culturalContext && (
          <p className="text-xs text-stone-600 dark:text-stone-300 italic pt-1 border-t border-stone-200/60 dark:border-stone-800/60">
            "{guideData.culturalContext}"
          </p>
        )}
      </div>

      {/* Interactive AI Customizer Toolbar */}
      <form onSubmit={handleCustomGenerate} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-rose-500" />
            Customize Gifting Context
          </span>
          <span className="text-[11px] text-stone-400">Tailors etiquette & price tier</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
              Who are you gifting?
            </label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 outline-none"
            >
              <option value="Family & Host">Family, Hosts & Dinner Gatherings</option>
              <option value="Elders & Parents">Elders, Grandparents & Parents</option>
              <option value="Friends & Peers">Close Friends & Peers</option>
              <option value="Colleagues & Clients">Colleagues, Mentors & Business Clients</option>
              <option value="Children & Youth">Children & Younger Generation</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-stone-500 dark:text-stone-400 mb-1">
              Budget & Presentation Style
            </label>
            <select
              value={budgetTier}
              onChange={(e) => setBudgetTier(e.target.value)}
              className="w-full text-xs py-2 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 outline-none"
            >
              <option value="Thoughtful & Authentic">Thoughtful & Authentic ($20 - $50)</option>
              <option value="Modest Token">Modest & Heartfelt Token ($10 - $25)</option>
              <option value="Traditional Auspicious">Traditional Auspicious ($50 - $100)</option>
              <option value="Ceremonial / Premium">Ceremonial / Premium Keepsake ($100+)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          {guideData && guideData.auspiciousColors && guideData.auspiciousColors.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
              <Palette className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px]">Auspicious Wrapping:</span>
              <div className="flex items-center gap-1">
                {guideData.auspiciousColors.map((color, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 font-medium">
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition ml-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Curating Gifting Lore...' : 'Regenerate with Gemini'}</span>
          </button>
        </div>
      </form>

      {/* Suggested Gift Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            Curated Gift Selections ({guideData?.gifts.length || 0})
          </h4>
          <span className="text-[11px] text-stone-400">Click copy to save or share idea</span>
        </div>

        {loading ? (
          <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/40 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 space-y-2">
            <RefreshCw className="w-6 h-6 text-amber-500 animate-spin mx-auto" />
            <p className="text-xs text-stone-500">Consulting cultural traditions and respectful etiquette...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guideData?.gifts.map((gift, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400/60 dark:hover:border-amber-600/60 transition shadow-xs flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        {gift.name}
                      </h5>
                      {gift.localName && (
                        <span className="text-[11px] text-stone-400 italic">
                          ({gift.localName})
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60 shrink-0">
                      {gift.priceTier}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {gift.significance}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <span>Best for: <strong className="text-stone-800 dark:text-stone-200">{gift.bestFor}</strong></span>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-[11px] text-stone-600 dark:text-stone-300 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                    <span>Presentation: {gift.presentationTip}</span>
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleCopyGift(gift, idx)}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-emerald-500">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Gift Idea</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cultural Etiquette Dos & Taboos */}
      {guideData && (
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-3">
          <button
            onClick={() => setShowEtiquette(!showEtiquette)}
            className="w-full flex items-center justify-between text-xs font-bold text-stone-900 dark:text-white"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Cultural Gifting Etiquette: Essential Dos & Taboos</span>
            </div>
            {showEtiquette ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
          </button>

          {showEtiquette && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Respectful Dos */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Respectful Practices (Dos)</span>
                </div>
                <div className="space-y-1.5">
                  {guideData.etiquetteDos?.map((d, i) => (
                    <div key={i} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2 bg-emerald-50/50 dark:bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crucial Taboos (Don'ts) */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cultural Taboos to Avoid (Don'ts)</span>
                </div>
                <div className="space-y-1.5">
                  {guideData.etiquetteDonts?.map((dont, i) => (
                    <div key={i} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2 bg-rose-50/50 dark:bg-rose-950/20 p-2.5 rounded-xl border border-rose-100 dark:border-rose-900/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span>{dont}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
