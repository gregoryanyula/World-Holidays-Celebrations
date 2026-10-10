import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Shirt, 
  Palette, 
  Info, 
  ShieldCheck, 
  ZoomIn, 
  X, 
  RefreshCw, 
  Layers, 
  Check, 
  Copy, 
  HelpCircle,
  Eye,
  Award
} from 'lucide-react';
import { Holiday, TraditionalAttireData, AttireGarment } from '../types';
import { getTraditionalAttireForHoliday } from '../utils/traditionalAttireData';

interface TraditionalAttireSectionProps {
  holiday: Holiday;
  className?: string;
}

export const TraditionalAttireSection: React.FC<TraditionalAttireSectionProps> = ({
  holiday,
  className = ''
}) => {
  const [attireData, setAttireData] = useState<TraditionalAttireData>(() => 
    getTraditionalAttireForHoliday(holiday)
  );
  const [activeFilter, setActiveFilter] = useState<'all' | 'feminine' | 'masculine' | 'unisex' | 'ceremonial' | 'accessory'>('all');
  const [selectedGarmentForLightbox, setSelectedGarmentForLightbox] = useState<AttireGarment | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showPromptInput, setShowPromptInput] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Reset or re-evaluate when holiday changes
  useEffect(() => {
    setAttireData(getTraditionalAttireForHoliday(holiday));
    setActiveFilter('all');
    setSelectedGarmentForLightbox(null);
    setImgErrors({});
  }, [holiday.id]);

  const handleCopyColorHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleGenerateAiAttire = async (customFocus?: string) => {
    setIsGeneratingAi(true);
    try {
      const response = await fetch('/api/ai/traditional-attire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          holidayName: holiday.name,
          country: holiday.country,
          localName: holiday.localName,
          traditions: holiday.traditions,
          query: customFocus || customPrompt || 'Full festive attire, ceremonial weaving, and color lore'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.garments && data.garments.length > 0) {
          setAttireData(data);
          setShowPromptInput(false);
          setCustomPrompt('');
        }
      }
    } catch (err) {
      console.warn('AI Attire generation fallback to curated data:', err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const filteredGarments = attireData.garments.filter(garment => {
    if (activeFilter === 'all') return true;
    return garment.ensembleType === activeFilter;
  });

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Section Header & AI Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-300/60 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-200 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-400/40">
              <Shirt className="w-3.5 h-3.5 text-rose-500" />
              Attire & Traditional Dress
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-200 text-[10px] font-mono font-bold flex items-center gap-1 border border-amber-400/40">
              <Sparkles className="w-3 h-3 text-amber-500" />
              AI Anthropological Analysis
            </span>
          </div>

          <h3 className="font-serif font-black text-lg text-stone-900 dark:text-white">
            Festive Clothing, Textiles & Ceremonial Garb
          </h3>
          <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xl">
            {attireData.overview}
          </p>
        </div>

        {/* AI Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setShowPromptInput(!showPromptInput)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 transition shadow-2xs"
          >
            {showPromptInput ? 'Cancel' : 'Custom AI Focus'}
          </button>
          <button
            onClick={() => handleGenerateAiAttire()}
            disabled={isGeneratingAi}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
            <span>{isGeneratingAi ? 'Analyzing...' : 'Deepen with AI'}</span>
          </button>
        </div>
      </div>

      {/* Optional Custom AI Prompt Input */}
      {showPromptInput && (
        <div className="p-3.5 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-2 animate-in fade-in duration-200">
          <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
            Ask Gemini AI for specific attire analysis:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. Focus on ceremonial wedding attire, winter layers, or handwoven embroidery stitches"
              className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={() => handleGenerateAiAttire(customPrompt)}
              disabled={isGeneratingAi}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition disabled:opacity-60"
            >
              Analyze
            </button>
          </div>
        </div>
      )}

      {/* Historical Lineage & Weaving Traditions Note */}
      {attireData.historicalContext && (
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/70 text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-stone-900 dark:text-white">Textile Heritage & History:</strong> {attireData.historicalContext}
          </p>
        </div>
      )}

      {/* Auspicious Festive Color Palette */}
      {attireData.auspiciousColors && attireData.auspiciousColors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              Auspicious Colors & Cultural Symbolism
            </h4>
            <span className="text-[11px] text-stone-500">
              Click swatch to copy hex code
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {attireData.auspiciousColors.map((color, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyColorHex(color.hex)}
                className="p-3 rounded-2xl bg-white dark:bg-stone-800/70 border border-stone-200 dark:border-stone-700/80 hover:border-rose-400 dark:hover:border-rose-500 transition cursor-pointer group flex flex-col justify-between shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full shadow-xs border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                      {color.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500 uppercase flex items-center gap-1 group-hover:text-rose-600 transition">
                    {copiedHex === color.hex ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-2.5 h-2.5 opacity-60" />
                    )}
                    {color.hex}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2">
                  {color.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Garments & Ensemble Filter Pills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
            <Shirt className="w-4 h-4 text-rose-500" />
            Typical Clothing & Traditional Ensembles ({attireData.garments.length})
          </h4>

          {/* Filter Bar */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-800 p-0.5 rounded-xl text-[11px] font-semibold">
            {[
              { id: 'all', label: 'All Garments' },
              { id: 'feminine', label: 'Feminine' },
              { id: 'masculine', label: 'Masculine' },
              { id: 'unisex', label: 'Unisex / Sacred' },
              { id: 'accessory', label: 'Adornments' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  activeFilter === tab.id
                    ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-2xs font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Garment Cards Grid with Placeholder Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGarments.map((garment) => {
            const hasImgError = imgErrors[garment.id];

            return (
              <div
                key={garment.id}
                className="rounded-3xl bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 overflow-hidden shadow-xs hover:border-rose-400/60 dark:hover:border-rose-600/60 transition group flex flex-col justify-between"
              >
                {/* Visual Placeholder Header with Shimmer & Silhouette */}
                <div className="relative h-48 w-full bg-stone-900 overflow-hidden">
                  {!hasImgError ? (
                    <img
                      src={garment.placeholderVisualUrl}
                      alt={garment.placeholderAltText || garment.name}
                      onError={() => setImgErrors(prev => ({ ...prev, [garment.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    /* Stylized SVG Fallback Visual Placeholder */
                    <div 
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${garment.accentColor || '#C41E3A'} 0%, #1c1917 100%)`
                      }}
                    >
                      <Shirt className="w-16 h-16 text-white/40 drop-shadow mb-2 animate-pulse" />
                      <span className="font-serif font-bold text-sm tracking-wide">
                        {garment.name}
                      </span>
                      <span className="text-[10px] font-mono text-white/70">
                        {garment.nativeTerm || 'Traditional Dress Silhouette'}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 uppercase tracking-wider">
                      {garment.categoryLabel}
                    </span>
                  </div>

                  {/* Inspect Visual Button Top Right */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => setSelectedGarmentForLightbox(garment)}
                      title="Inspect Attire Visual"
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition hover:scale-110"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Garment Title Over Visual */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h5 className="font-serif font-black text-base drop-shadow-sm leading-tight">
                      {garment.name}
                    </h5>
                    {garment.nativeTerm && (
                      <p className="text-[11px] text-stone-300 font-mono italic">
                        {garment.nativeTerm}
                      </p>
                    )}
                  </div>
                </div>

                {/* Garment Details Body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      {garment.description}
                    </p>

                    {/* Fabrics & Textiles */}
                    {garment.fabrics && garment.fabrics.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block">
                          Fabrics & Construction:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {garment.fabrics.map((fabric, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700/60 text-stone-700 dark:text-stone-300 text-[10px] font-medium"
                            >
                              🧵 {fabric}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Motifs / Patterns */}
                    {garment.motifsOrPatterns && (
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        <strong className="text-stone-700 dark:text-stone-300">Motifs & Needlework:</strong> {garment.motifsOrPatterns}
                      </p>
                    )}
                  </div>

                  {/* Cultural Significance Footer Box */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700/60">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-300/30 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{garment.culturalSignificance}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Adornments, Traditional Jewelry & Hair Styling */}
      {attireData.adornmentsAndJewelry && attireData.adornmentsAndJewelry.length > 0 && (
        <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80 space-y-2.5">
          <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-rose-500" />
            Sacred Adornments, Hair Styling & Traditional Footwear
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attireData.adornmentsAndJewelry.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700 text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visitor Etiquette & Cultural Appreciation Guidelines */}
      {attireData.visitorEtiquetteTips && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-stone-500/5 border border-emerald-300/60 dark:border-emerald-800/60 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
              Visitor Dress Etiquette & Cultural Appreciation
            </h4>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
            {attireData.visitorEtiquetteTips.canVisitorsWear}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Respectful Dos */}
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                ✓ What to Do
              </span>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
                {attireData.visitorEtiquetteTips.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Respectful Don'ts */}
            <div className="p-3 rounded-2xl bg-white/80 dark:bg-stone-900/60 border border-rose-200/60 dark:border-rose-800/40 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1">
                ✕ What to Avoid
              </span>
              <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1.5">
                {attireData.visitorEtiquetteTips.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Zoom Modal for Garment Visual Inspection */}
      {selectedGarmentForLightbox && (
        <div 
          onClick={() => setSelectedGarmentForLightbox(null)}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-stone-900 w-full max-w-lg rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4"
          >
            <div className="relative h-64 w-full bg-stone-950 overflow-hidden">
              <img
                src={selectedGarmentForLightbox.placeholderVisualUrl}
                alt={selectedGarmentForLightbox.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedGarmentForLightbox(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold uppercase tracking-wider inline-block mb-1">
                  {selectedGarmentForLightbox.categoryLabel}
                </span>
                <h3 className="font-serif font-black text-xl">
                  {selectedGarmentForLightbox.name}
                </h3>
                {selectedGarmentForLightbox.nativeTerm && (
                  <p className="text-xs text-stone-300 font-mono italic">
                    {selectedGarmentForLightbox.nativeTerm}
                  </p>
                )}
              </div>
            </div>

            <div className="p-5 space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <p className="leading-relaxed">
                {selectedGarmentForLightbox.description}
              </p>

              <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 space-y-1">
                <span className="font-bold text-stone-900 dark:text-white block">
                  Cultural Significance:
                </span>
                <p>{selectedGarmentForLightbox.culturalSignificance}</p>
              </div>

              {selectedGarmentForLightbox.fabrics && (
                <div>
                  <span className="font-bold text-stone-900 dark:text-white block mb-1">
                    Authentic Fabrics:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedGarmentForLightbox.fabrics.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[10px]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectedGarmentForLightbox(null)}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold transition"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
