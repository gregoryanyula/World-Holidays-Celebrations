import React, { useState, useMemo } from 'react';
import { 
  Globe2, 
  Search, 
  MapPin, 
  Calendar as CalendarIcon, 
  Sparkles, 
  CalendarPlus, 
  Download, 
  BookOpen, 
  Filter, 
  Tag, 
  ChevronRight, 
  Layers, 
  Flame, 
  ExternalLink,
  Gift
} from 'lucide-react';
import { 
  WORLD_COUNTRIES_REGISTRY, 
  INTERNATIONAL_SPECIAL_DAYS, 
  DetailedCountryHoliday, 
  CountryInfo 
} from '../data/worldHolidayDirectory';
import { Holiday, Continent, UserPreferences } from '../types';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import confetti from 'canvas-confetti';

interface CountryHolidaysExplorerProps {
  onSelectHoliday: (holiday: Holiday) => void;
  onSyncGoogleCalendar: (holiday: Holiday) => void;
  initialCountryCode?: string;
  preferences?: UserPreferences;
}

export const CountryHolidaysExplorer: React.FC<CountryHolidaysExplorerProps> = ({
  onSelectHoliday,
  onSyncGoogleCalendar,
  initialCountryCode = 'ALL',
  preferences
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    initialCountryCode !== 'all' && initialCountryCode !== 'ALL' ? initialCountryCode : 'US'
  );
  const [continentFilter, setContinentFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  // Available countries list
  const countriesList = useMemo(() => {
    return Object.values(WORLD_COUNTRIES_REGISTRY).map(entry => entry.info);
  }, []);

  // Filtered countries based on continent
  const visibleCountries = useMemo(() => {
    if (continentFilter === 'ALL') return countriesList;
    return countriesList.filter(c => c.continent === continentFilter);
  }, [continentFilter, countriesList]);

  // Selected Country data
  const isInternationalMode = selectedCountryCode === 'INTL';
  const currentCountryEntry = WORLD_COUNTRIES_REGISTRY[selectedCountryCode];

  // Holidays list for current view
  const currentHolidays = useMemo(() => {
    let list: DetailedCountryHoliday[] = [];
    if (isInternationalMode) {
      list = INTERNATIONAL_SPECIAL_DAYS;
    } else if (currentCountryEntry) {
      list = currentCountryEntry.holidays;
    }

    return list.filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.localName && item.localName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = 
        categoryFilter === 'all' || 
        item.category === categoryFilter ||
        (categoryFilter === 'public' && item.type === 'Public Holiday') ||
        (categoryFilter === 'cultural' && item.type === 'Cultural Special Day');

      return matchesSearch && matchesCategory;
    });
  }, [isInternationalMode, currentCountryEntry, searchQuery, categoryFilter]);

  const convertToAppHoliday = (dh: DetailedCountryHoliday): Holiday => {
    const countryName = isInternationalMode ? 'International & UN' : currentCountryEntry?.info.name || 'Global';
    const cCode = isInternationalMode ? 'UN' : currentCountryEntry?.info.code || 'UN';

    return {
      id: dh.id,
      name: dh.name,
      localName: dh.localName,
      date: dh.date,
      month: dh.month,
      day: dh.day,
      country: countryName,
      countryCode: cCode,
      category: dh.category,
      description: dh.description,
      traditions: dh.traditions,
      greeting: dh.greeting || 'Happy celebration!',
      foodDelicacies: dh.foodDelicacies || [],
      bannerUrl: dh.bannerUrl,
      tags: ['Culture', 'Tradition', dh.category],
      facts: [dh.description],
      popularityScore: 95
    };
  };

  const handleCalendarClick = (dh: DetailedCountryHoliday) => {
    const h = convertToAppHoliday(dh);
    onSyncGoogleCalendar(h);
    setCalendarToast(`Added "${dh.name}" to Google Calendar!`);
    try {
      confetti({ particleCount: 20, spread: 40 });
    } catch {}
    setTimeout(() => setCalendarToast(null), 3000);
  };

  const handleIcsDownload = (dh: DetailedCountryHoliday) => {
    const h = convertToAppHoliday(dh);
    downloadIcsFile(h, 1);
    setCalendarToast(`Downloaded .ics for "${dh.name}"!`);
    setTimeout(() => setCalendarToast(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {calendarToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CalendarIcon className="w-4 h-4 text-emerald-400" />
          <span>{calendarToast}</span>
        </div>
      )}

      {/* Hero Showcase Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-slate-900 to-rose-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Globe2 className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Comprehensive World Holiday Directory</span>
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-4xl text-white tracking-tight">
            Explore All Holidays & Special Days by Country
          </h2>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            Select any country from across 6 continents or view International UN Observances. Discover statutory public holidays, sacred ceremonies, ancestral traditions, and local festive customs.
          </p>
        </div>

        {/* Quick Continent Filter Tabs */}
        <div className="relative z-10 pt-6 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setContinentFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl transition ${
              continentFilter === 'ALL'
                ? 'bg-white text-stone-900 shadow-md font-bold'
                : 'bg-white/10 hover:bg-white/20 text-stone-200'
            }`}
          >
            All Continents
          </button>
          {(['North America', 'South America', 'Europe', 'Asia', 'Africa', 'Middle East', 'Oceania'] as Continent[]).map((cont) => (
            <button
              key={cont}
              onClick={() => setContinentFilter(cont)}
              className={`px-3 py-1.5 rounded-xl transition ${
                continentFilter === cont
                  ? 'bg-rose-500 text-white shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200'
              }`}
            >
              {cont}
            </button>
          ))}
          <button
            onClick={() => { setSelectedCountryCode('INTL'); setContinentFilter('ALL'); }}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
              isInternationalMode
                ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                : 'bg-white/10 hover:bg-white/20 text-amber-200'
            }`}
          >
            <span>🌐 International & UN Days</span>
          </button>
        </div>
      </div>

      {/* Country Selection Rail & Search Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
        {/* Country Selector Grid / Buttons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Select a Country to View Its Holidays:
            </span>
            <span className="text-[11px] text-stone-400">
              {visibleCountries.length} Countries Available
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCountryCode('INTL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
                isInternationalMode
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>🌐</span>
              <span>All International / UN Days</span>
            </button>

            {visibleCountries.map((c) => {
              const isSelected = selectedCountryCode === c.code;
              return (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountryCode(c.code)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition flex items-center gap-2 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-white/20' : 'bg-stone-200 dark:bg-stone-700'}`}>
                    {c.majorHolidaysCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* In-Country Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${isInternationalMode ? 'International Observances' : currentCountryEntry?.info.name || 'country'} (e.g. food, tradition, date)...`}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-44 text-xs py-2.5 px-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 outline-none"
            >
              <option value="all">All Day Types</option>
              <option value="public">Official Public Holidays</option>
              <option value="cultural">Cultural & Folk Festivals</option>
              <option value="religious">Sacred & Spiritual Days</option>
              <option value="national">National Commemorations</option>
              <option value="un_day">UN & Global Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Selected Country Banner / Cultural Profile */}
      {!isInternationalMode && currentCountryEntry && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-stone-50 via-indigo-50/40 to-stone-50 dark:from-stone-800/60 dark:via-stone-800/40 dark:to-stone-800/60 border border-stone-200 dark:border-stone-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="text-4xl sm:text-5xl shrink-0 p-1 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-xs">
              {currentCountryEntry.info.flag}
            </span>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-black text-xl text-stone-900 dark:text-white">
                  {currentCountryEntry.info.name}
                </h3>
                {currentCountryEntry.info.nativeName && (
                  <span className="text-xs text-stone-500 font-mono">
                    ({currentCountryEntry.info.nativeName})
                  </span>
                )}
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  {currentCountryEntry.info.continent}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                  Capital: {currentCountryEntry.info.capital}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
                {currentCountryEntry.info.culturalSummary}
              </p>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-stone-200 dark:border-stone-700">
            <span className="text-xs text-stone-500">Holidays in Directory:</span>
            <span className="font-serif font-bold text-xl sm:text-2xl text-rose-600 dark:text-rose-400">
              {currentCountryEntry.holidays.length} Special Days
            </span>
          </div>
        </div>
      )}

      {/* International Overview Banner */}
      {isInternationalMode && (
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-white dark:bg-stone-900 rounded-2xl border border-amber-300/40 shadow-xs">
              🌐
            </span>
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-white">
                United Nations & Worldwide International Days
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Official global observances designated to mobilize political will, address global challenges, and celebrate collective human achievements across all member nations.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 shrink-0">
            {INTERNATIONAL_SPECIAL_DAYS.length} Global Days
          </span>
        </div>
      )}

      {/* Holidays Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
          <span>
            Showing {currentHolidays.length} Observances {searchQuery && `matching "${searchQuery}"`}
          </span>
          <span className="text-stone-400 font-normal">Click any card to explore rituals, delicacies & gift ideas</span>
        </div>

        {currentHolidays.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-3">
            <CalendarIcon className="w-10 h-10 text-stone-400 mx-auto" />
            <h4 className="font-serif font-bold text-base text-stone-800 dark:text-stone-200">
              No holidays found matching your filters
            </h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search keywords or switch category filter to "All Day Types".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setCategoryFilter('all'); }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentHolidays.map((dh) => {
              const appHoliday = convertToAppHoliday(dh);
              return (
                <div
                  key={dh.id}
                  className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-lg hover:border-rose-400 dark:hover:border-rose-700 transition flex flex-col justify-between group"
                >
                  {/* Card Header & Banner */}
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-stone-950">
                      <img
                        src={dh.bannerUrl}
                        alt={dh.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white border border-white/20">
                          {dh.type}
                        </span>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-600/90 text-white shadow-sm">
                          {dh.date}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h4 className="font-serif font-black text-lg tracking-tight line-clamp-1">
                          {dh.name}
                        </h4>
                        {dh.localName && (
                          <p className="text-xs text-stone-300 font-mono italic line-clamp-1">
                            {dh.localName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                        {dh.description}
                      </p>

                      {/* Traditions Snippet */}
                      {dh.traditions && dh.traditions.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                            Key Traditions:
                          </span>
                          <div className="space-y-1 text-xs text-stone-700 dark:text-stone-300">
                            {dh.traditions.slice(0, 2).map((t, idx) => (
                              <div key={idx} className="flex items-start gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                <span className="line-clamp-1">{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Food & Feasts Tags */}
                      {dh.foodDelicacies && dh.foodDelicacies.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {dh.foodDelicacies.slice(0, 3).map((food, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium border border-emerald-200 dark:border-emerald-900/40"
                            >
                              🍴 {food}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCalendarClick(dh)}
                        className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 transition"
                        title="Add to Google Calendar"
                      >
                        <CalendarPlus className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleIcsDownload(dh)}
                        className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
                        title="Download .ICS file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectHoliday(appHoliday)}
                      className="py-2 px-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-rose-600 dark:hover:bg-rose-500 text-white dark:text-stone-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Details & Gift Guide</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
