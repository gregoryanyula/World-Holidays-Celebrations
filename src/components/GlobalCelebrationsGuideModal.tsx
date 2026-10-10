import React, { useState } from 'react';
import { 
  X, 
  Globe2, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  Gift, 
  Sun, 
  ExternalLink, 
  Check, 
  Search, 
  Info,
  Compass,
  ArrowRight,
  Bookmark,
  Share2,
  ListFilter,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Holiday, UserPreferences } from '../types';
import { 
  MAJOR_HOLIDAYS_BY_CATEGORY, 
  RESPECTFUL_OBSERVANCE_GUIDELINES,
  COMPREHENSIVE_MAJOR_HOLIDAYS 
} from '../data/majorHolidaysGuide';

interface GlobalCelebrationsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  allHolidays: Holiday[];
  preferences: UserPreferences;
  onSelectHoliday: (holiday: Holiday) => void;
  onToggleBookmark: (holidayId: string) => void;
}

export const GlobalCelebrationsGuideModal: React.FC<GlobalCelebrationsGuideModalProps> = ({
  isOpen,
  onClose,
  allHolidays,
  preferences,
  onSelectHoliday,
  onToggleBookmark
}) => {
  const [activeGuideTab, setActiveGuideTab] = useState<'categories' | 'respect' | 'dates' | 'planner' | 'about'>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('religious');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Quick Planner state: chosen holiday id per category
  const [plannerSelections, setPlannerSelections] = useState<Record<string, string>>({
    religious: 'diwali-festival-of-lights',
    national: 'mexico-day-of-the-republic',
    romantic: 'burns-night',
    commercial: 'singles-day-china',
    nature: 'nowruz-persian-new-year',
    cultural: 'obon-japan'
  });
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentCategoryData = MAJOR_HOLIDAYS_BY_CATEGORY.find(c => c.id === selectedCategory) || MAJOR_HOLIDAYS_BY_CATEGORY[0];

  const handleOpenHoliday = (holidayId: string) => {
    const found = allHolidays.find(h => h.id.toLowerCase().includes(holidayId.toLowerCase())) 
      || COMPREHENSIVE_MAJOR_HOLIDAYS.find(h => h.id.toLowerCase().includes(holidayId.toLowerCase()));
    if (found) {
      onSelectHoliday(found);
      onClose();
    }
  };

  const handleSelectPlannerItem = (catId: string, hId: string) => {
    setPlannerSelections(prev => ({ ...prev, [catId]: hId }));
  };

  const handleBookmarkAllPlan = () => {
    Object.values(plannerSelections).forEach(id => {
      onToggleBookmark(id);
    });
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  // Filtered list of holidays for dates matrix
  const filteredHolidaysForDates = allHolidays
    .filter(h => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        h.name.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.tags.some(t => t.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Hero Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-700 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/90 hover:text-white transition"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black uppercase tracking-wider border border-white/30 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-amber-300" />
                Global Compendium
              </span>
              <span className="text-[11px] font-mono bg-black/30 px-2 py-0.5 rounded-full border border-white/20">
                100+ Major Holidays & Origins
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif font-black tracking-tight drop-shadow-sm">
              All Major Holidays: Global Celebrations & Origins
            </h2>
            <p className="text-stone-100 text-xs sm:text-sm leading-relaxed">
              Your definitive reference for global celebrations, roots, and mindful cultural observance—from Christmas and Eid to Nowruz, Obon, and beyond.
            </p>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="mt-5 pt-3 border-t border-white/20 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveGuideTab('categories')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                activeGuideTab === 'categories'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Holidays by Category</span>
            </button>

            <button
              onClick={() => setActiveGuideTab('respect')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                activeGuideTab === 'respect'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Observe Respectfully (Do’s & Don’ts)</span>
            </button>

            <button
              onClick={() => setActiveGuideTab('dates')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                activeGuideTab === 'dates'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-rose-300" />
              <span>Dates by Month</span>
            </button>

            <button
              onClick={() => setActiveGuideTab('planner')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                activeGuideTab === 'planner'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Quick Holiday Planner</span>
            </button>

            <button
              onClick={() => setActiveGuideTab('about')}
              className={`py-1.5 px-3 rounded-xl transition flex items-center gap-1.5 ${
                activeGuideTab === 'about'
                  ? 'bg-white text-stone-900 shadow-md font-bold'
                  : 'text-stone-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-indigo-300" />
              <span>Why Holidays Matter</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 flex-1 overflow-y-auto space-y-6">

          {/* TAB 1: Categories Breakdown */}
          {activeGuideTab === 'categories' && (
            <div className="space-y-6">
              {/* Category Pills Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MAJOR_HOLIDAYS_BY_CATEGORY.map(cat => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 border-transparent shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {cat.id === 'religious' && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                      {cat.id === 'national' && <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />}
                      {cat.id === 'romantic' && <Heart className="w-3.5 h-3.5 text-rose-500" />}
                      {cat.id === 'commercial' && <Gift className="w-3.5 h-3.5 text-amber-600" />}
                      {cat.id === 'nature' && <Sun className="w-3.5 h-3.5 text-emerald-500" />}
                      {cat.id === 'cultural' && <Globe2 className="w-3.5 h-3.5 text-purple-500" />}
                      <span>{cat.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Category Description */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/80">
                <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 tracking-wider block">
                  Category Significance
                </span>
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-0.5">
                  {currentCategoryData.description}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentCategoryData.holidays.map((h, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700/80 shadow-xs hover:border-amber-400 dark:hover:border-amber-500 transition space-y-3 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-black text-base text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition">
                          {h.name}
                        </h4>
                        <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                          {h.date}
                        </span>
                      </div>

                      <button
                        onClick={() => handleOpenHoliday(h.holidayId)}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-rose-50 dark:bg-stone-700/60 dark:hover:bg-rose-950/40 text-stone-600 hover:text-rose-600 dark:text-stone-300 dark:hover:text-rose-400 transition shrink-0"
                        title="View Full Holiday Page with Soundscapes"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Origin */}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-stone-900 dark:text-white block">
                        Origin & Lore:
                      </span>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        {h.origin}
                      </p>
                    </div>

                    {/* Traditions */}
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-stone-900 dark:text-white block">
                        Key Traditions:
                      </span>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                        {h.traditions}
                      </p>
                    </div>

                    {/* Global Variations or Fun Fact */}
                    {h.globalVariations && (
                      <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/50 dark:border-indigo-800/40 text-[11px] text-indigo-900 dark:text-indigo-200">
                        <strong>Global Variations:</strong> {h.globalVariations}
                      </div>
                    )}

                    {h.funFact && (
                      <div className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/50 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200">
                        <strong>Fun Fact:</strong> {h.funFact}
                      </div>
                    )}

                    {h.shoppingTip && (
                      <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 text-[11px] text-emerald-900 dark:text-emerald-200">
                        <strong>Shopping Tip:</strong> {h.shoppingTip}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Respectful Observance Guide */}
          {activeGuideTab === 'respect' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm">
                    How to Observe Holidays Respectfully as a Global Traveler
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200 mt-1 leading-relaxed">
                    Experiencing global celebrations is a privilege that connects us to ancestral memory and deep community solidarity. Follow these cultural guidelines to honor host communities with genuine respect.
                  </p>
                </div>
              </div>

              {/* Do's and Don'ts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* DO's */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Cultural Do’s
                  </h4>
                  <div className="space-y-2.5">
                    {RESPECTFUL_OBSERVANCE_GUIDELINES.dos.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1"
                      >
                        <span className="font-bold text-stone-900 dark:text-white block">
                          {idx + 1}. {item.title}
                        </span>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DONT's */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Cultural Don’ts
                  </h4>
                  <div className="space-y-2.5">
                    {RESPECTFUL_OBSERVANCE_GUIDELINES.donts.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-1"
                      >
                        <span className="font-bold text-stone-900 dark:text-white block">
                          {idx + 1}. {item.title}
                        </span>
                        <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practical Travel Logistics Tips */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                  Practical Travel Logistics & Protocols
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {RESPECTFUL_OBSERVANCE_GUIDELINES.travelTips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-stone-100/70 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 text-xs space-y-1"
                    >
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400 block text-[11px]">
                        {tip.context}
                      </span>
                      <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-[11px]">
                        {tip.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Dates by Month (2024–2026) */}
          {activeGuideTab === 'dates' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by holiday name, country, or category..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <span className="text-xs text-stone-500 font-mono shrink-0">
                  Showing {filteredHolidaysForDates.length} world celebrations
                </span>
              </div>

              {/* Table / List View */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredHolidaysForDates.map(holiday => (
                  <div
                    key={holiday.id}
                    onClick={() => handleOpenHoliday(holiday.id)}
                    className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 hover:border-amber-400 dark:hover:border-amber-500 cursor-pointer transition flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-12 h-12 rounded-xl bg-stone-200 dark:bg-stone-700 flex flex-col items-center justify-center text-center shrink-0 border border-stone-300 dark:border-stone-600">
                        <span className="text-[10px] font-mono uppercase font-bold text-stone-500 dark:text-stone-400 leading-tight">
                          {new Date(holiday.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-sm font-serif font-black text-stone-900 dark:text-white leading-tight">
                          {holiday.day}
                        </span>
                      </div>

                      <div className="truncate">
                        <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition truncate">
                          {holiday.name}
                        </h4>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {holiday.country} • <span className="capitalize">{holiday.category}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 group-hover:translate-x-0.5 transition hidden sm:inline">
                        Explore →
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-rose-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Quick Holiday Planner */}
          {activeGuideTab === 'planner' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-100 flex items-start gap-3">
                <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif font-bold text-sm">
                    Personalized Cultural Explorer Planner
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                    Pick 1 celebration from each of the 6 major cultural categories below to generate your custom year-round exploration roadmap. Bookmark your selections to track countdowns on your widgets!
                  </p>
                </div>
              </div>

              {/* 6 Category Pickers */}
              <div className="space-y-4">
                {MAJOR_HOLIDAYS_BY_CATEGORY.map(category => (
                  <div key={category.id} className="space-y-2">
                    <span className="text-xs font-serif font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {category.title}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.holidays.map(h => {
                        const isChosen = plannerSelections[category.id] === h.holidayId;
                        return (
                          <button
                            key={h.holidayId}
                            onClick={() => handleSelectPlannerItem(category.id, h.holidayId)}
                            className={`p-3 rounded-xl text-left border transition flex items-center justify-between gap-2 text-xs ${
                              isChosen
                                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-950 dark:text-amber-100 font-bold ring-1 ring-amber-500'
                                : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            <span className="truncate">{h.name}</span>
                            {isChosen && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-stone-500 font-mono">
                  {Object.keys(plannerSelections).length} Celebrations Selected in your Roadmap
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleBookmarkAllPlan}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-bold text-xs shadow-md hover:opacity-90 transition flex items-center gap-2"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{copiedPlan ? 'All Bookmarked to Profile!' : 'Bookmark Selected to Roadmap'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Why Global Holidays Matter */}
          {activeGuideTab === 'about' && (
            <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
                <h4 className="font-serif font-black text-base text-indigo-950 dark:text-indigo-100">
                  Why Global Holidays Matter
                </h4>
                <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
                  Understanding global holidays isn’t just about knowing when people take time off—it’s about connecting with diverse cultures, histories, and values. Holidays shape identities, foster unity, and even influence global economies.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <h5 className="font-serif font-bold text-sm text-stone-900 dark:text-white">
                  Empathy, Cultural Fluency, & Practical Insights
                </h5>
                <p>
                  For travelers, world celebrations reveal hidden traditions—like Obon in Japan, where families welcome ancestral spirits with lanterns, or Day of the Dead in Mexico, where vibrant marigolds and sugar skulls honor the deceased.
                </p>
                <p>
                  Holidays also highlight vital social movements, from International Workers’ Day and Pride Month to Holocaust Remembrance Day and Earth Day. By studying these celebrations, you gain cultural fluency and practical insights—whether planning an international voyage, collaborating with global teams, or expanding your worldview.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900/90 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>WorldFest Cultural Compendium • 2026 Edition</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
