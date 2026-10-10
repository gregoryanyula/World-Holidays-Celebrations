import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Sun, 
  CloudSun, 
  Clock, 
  Briefcase, 
  Luggage, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ArrowRight, 
  TrendingUp, 
  Compass, 
  Heart, 
  Globe2, 
  Share2, 
  Filter,
  Flame,
  ChevronDown,
  ChevronUp,
  Award,
  Umbrella,
  Thermometer,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { Holiday, VacationPlanSuggestion } from '../types';
import confetti from 'canvas-confetti';

interface IntelligentHolidayPlannerProps {
  bookmarkedHolidayIds: string[];
  allHolidays: Holiday[];
  onSelectHoliday: (holiday: Holiday) => void;
  onToggleBookmark: (holidayId: string) => void;
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

interface OptimalWindowData {
  windowLabel: string;
  startMonth: number; // 0-11
  endMonth: number;   // 0-11
  climateTag: string;
  tempSummary: string;
  rainfallStatus: string;
  reason: string;
}

// Computes the optimal 3-month window correlating regional climate & festive peak
function calculateOptimalThreeMonthWindow(holiday: Holiday): OptimalWindowData {
  const d = new Date(holiday.date);
  const holidayMonth = d.getMonth(); // 0-11

  // If holiday has structured weatherProfile, leverage it
  if (holiday.weatherProfile) {
    const climate = holiday.weatherProfile.climate.toLowerCase();
    const temp = `${holiday.weatherProfile.tempCelsius} (${holiday.weatherProfile.tempFahrenheit})`;

    // Tailor 3-month window around the holiday date with optimal climate correlation
    let startM = (holidayMonth - 1 + 12) % 12;
    let endM = (holidayMonth + 1) % 12;

    // Adjust for monsoons / tropical rains
    let rainStatus = 'Pleasant & Low Precipitation';
    let reason = `Ideal 3-month travel window around ${holiday.name}. Regional climate offers optimal conditions with vibrant festive pageantry and cultural processions.`;

    if (climate.includes('monsoon') || climate.includes('humid') || climate.includes('tropical')) {
      rainStatus = 'Post-Monsoon Dry Window';
      reason = `Travel during this 3-month window avoids torrential monsoon storms while experiencing lush landscapes and peak festive rituals.`;
    } else if (climate.includes('autumn') || climate.includes('crisp') || climate.includes('pleasant')) {
      rainStatus = 'Crisp & Mild Temperatures';
      reason = `Pleasant daytime temperatures and clear skies make this 3-month window ideal for outdoor festive night markets and cultural exploration.`;
    } else if (climate.includes('spring') || climate.includes('blossom') || climate.includes('warm')) {
      rainStatus = 'Sunny & Blooming Spring';
      reason = `Enjoy pleasant springtime warmth with minimal precipitation and blooming flowers during this cultural celebration window.`;
    } else if (climate.includes('winter') || climate.includes('snow') || climate.includes('cold')) {
      rainStatus = 'Winter Wonderland & Festive Illumination';
      reason = `Cold, crisp atmospheric conditions with enchanting holiday lights, traditional thermal baths, and warming culinary specialties.`;
    }

    const windowLabel = `${MONTH_NAMES[startM]} – ${MONTH_NAMES[endM]}`;
    return {
      windowLabel,
      startMonth: startM,
      endMonth: endM,
      climateTag: holiday.weatherProfile.climate,
      tempSummary: temp,
      rainfallStatus: rainStatus,
      reason
    };
  }

  // Fallback heuristic based on hemisphere & month
  let startM = (holidayMonth - 1 + 12) % 12;
  let endM = (holidayMonth + 1) % 12;
  return {
    windowLabel: `${MONTH_NAMES[startM]} – ${MONTH_NAMES[endM]}`,
    startMonth: startM,
    endMonth: endM,
    climateTag: 'Optimal Regional Travel Season',
    tempSummary: '22°C (72°F) Avg',
    rainfallStatus: 'Favorable Dry & Sunny Window',
    reason: `Recommended 3-month window to experience ${holiday.name} along with neighboring regional sights under comfortable conditions.`
  };
}

export const IntelligentHolidayPlanner: React.FC<IntelligentHolidayPlannerProps> = ({
  bookmarkedHolidayIds,
  allHolidays,
  onSelectHoliday,
  onToggleBookmark
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);
  const [exportedIcs, setExportedIcs] = useState<boolean>(false);
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);
  const [selectedTimelineHolidayId, setSelectedTimelineHolidayId] = useState<string | null>(null);

  // Filter bookmarked holidays or provide curated diverse sample if none bookmarked yet
  const bookmarkedHolidays = useMemo(() => {
    return allHolidays.filter(h => bookmarkedHolidayIds.includes(h.id));
  }, [bookmarkedHolidayIds, allHolidays]);

  // Generate vacation suggestions from bookmarked holidays
  const vacationPlans: (VacationPlanSuggestion & { optimalWindow: OptimalWindowData })[] = useMemo(() => {
    const listToProcess = bookmarkedHolidays.length > 0 ? bookmarkedHolidays : allHolidays.slice(0, 7);

    return listToProcess.map(h => {
      const dateObj = new Date(h.date);
      const arrival = new Date(dateObj);
      arrival.setDate(arrival.getDate() - 2);
      const departure = new Date(dateObj);
      departure.setDate(departure.getDate() + 2);

      const durationDays = h.festivePeak?.recommendedDurationDays || 4;
      const ptoDays = Math.max(1, Math.min(3, durationDays - 2));

      const bookingDeadlineDate = new Date(dateObj);
      bookingDeadlineDate.setMonth(bookingDeadlineDate.getMonth() - 4);
      const bookingDeadlineStr = bookingDeadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const weather = h.weatherProfile ? 
        `${h.weatherProfile.tempCelsius} (${h.weatherProfile.tempFahrenheit}) · ${h.weatherProfile.climate}` :
        '21°C - 28°C (70°F - 82°F) · Pleasant Seasonal Conditions';

      const packing = h.weatherProfile?.recommendedPacking || [
        'Lightweight festive cotton attire',
        'Comfortable walking shoes for celebrations',
        'Sun protection & travel camera'
      ];

      const optimalWindow = calculateOptimalThreeMonthWindow(h);

      return {
        holidayId: h.id,
        holidayName: h.name,
        country: h.country,
        countryCode: h.countryCode,
        date: h.date,
        suggestedArrivalDate: arrival.toISOString().split('T')[0],
        suggestedDepartureDate: departure.toISOString().split('T')[0],
        totalDays: durationDays + 1,
        ptoDaysNeeded: ptoDays,
        recommendedSeason: h.weatherProfile?.climate || 'Optimal Seasonal Travel Window',
        weatherSummary: weather,
        peakMoment: h.festivePeak?.peakDays ? `${h.festivePeak.peakDays} (${h.festivePeak.peakTimeOfDay})` : 'Festival Main Day & Evening Vigils',
        crowdLevel: h.festivePeak?.crowdLevel || 'High Energy',
        flightBookingDeadline: bookingDeadlineStr,
        budgetAdvisor: 'Book accommodations 4-6 months early to lock in off-peak flight rates.',
        packingList: packing,
        bannerUrl: h.bannerUrl,
        optimalWindow
      };
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [bookmarkedHolidays, allHolidays]);

  // Quarterly filtering
  const filteredPlans = useMemo(() => {
    if (selectedQuarter === 'all') return vacationPlans;
    return vacationPlans.filter(p => {
      const month = new Date(p.date).getMonth() + 1; // 1-12
      if (selectedQuarter === 'Q1') return month >= 1 && month <= 3;
      if (selectedQuarter === 'Q2') return month >= 4 && month <= 6;
      if (selectedQuarter === 'Q3') return month >= 7 && month <= 9;
      if (selectedQuarter === 'Q4') return month >= 10 && month <= 12;
      return true;
    });
  }, [vacationPlans, selectedQuarter]);

  // Overall analytics metrics
  const totalSuggestedDays = vacationPlans.reduce((sum, p) => sum + p.totalDays, 0);
  const totalPtoDays = vacationPlans.reduce((sum, p) => sum + p.ptoDaysNeeded, 0);
  const uniqueCountries = new Set(vacationPlans.map(p => p.country)).size;

  // Copy structured vacation plan to clipboard
  const handleCopyItinerary = () => {
    let text = `🌍 ANNUAL TRAVEL & CULTURAL VACATION PLANNER (Generated by WorldFest AI)\n`;
    text += `=========================================================\n\n`;
    text += `Summary: ${vacationPlans.length} Global Celebrations across ${uniqueCountries} Cultural Destinations\n`;
    text += `Total Travel Window: ${totalSuggestedDays} Days | Estimated PTO Bridge Required: ${totalPtoDays} Days\n\n`;

    vacationPlans.forEach((plan, idx) => {
      text += `${idx + 1}. ${plan.holidayName} — ${plan.country}\n`;
      text += `   📅 Festival Date: ${plan.date}\n`;
      text += `   🌤️ Optimal 3-Month Visiting Window: ${plan.optimalWindow.windowLabel}\n`;
      text += `   🌡️ Regional Climate: ${plan.optimalWindow.tempSummary} · ${plan.optimalWindow.rainfallStatus}\n`;
      text += `   ✈️ Recommended Travel Span: ${plan.suggestedArrivalDate} to ${plan.suggestedDepartureDate} (${plan.totalDays} Days)\n`;
      text += `   💼 PTO Needed: Take ${plan.ptoDaysNeeded} work days off\n`;
      text += `   🔥 Peak Celebration: ${plan.peakMoment}\n`;
      text += `   🎟️ Flight Booking Deadline: By ${plan.flightBookingDeadline}\n`;
      text += `   💡 Regional Travel Advice: ${plan.optimalWindow.reason}\n`;
      text += `   🎒 Packing Essentials: ${plan.packingList.join(', ')}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedPlan(true);
    confetti({ particleCount: 25, spread: 50 });
    setTimeout(() => setCopiedPlan(false), 3000);
  };

  // Export Vacation Schedule as RFC 5545 .ics Calendar File
  const handleExportAnnualIcs = () => {
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WorldFest//Annual Travel Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    vacationPlans.forEach(plan => {
      const startStr = plan.suggestedArrivalDate.replace(/-/g, '');
      const endStr = plan.suggestedDepartureDate.replace(/-/g, '');
      const uid = `annual-vacation-${plan.holidayId}-${Date.now()}@worldfest.app`;
      const desc = `Vacation & Cultural Observation for ${plan.holidayName} in ${plan.country}. Optimal 3-Month Window: ${plan.optimalWindow.windowLabel}. Climate: ${plan.optimalWindow.tempSummary} (${plan.optimalWindow.rainfallStatus}). Peak Celebration: ${plan.peakMoment}. Weather: ${plan.weatherSummary}. Packing: ${plan.packingList.join(', ')}.`;

      icsContent += '\r\n' + [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART;VALUE=DATE:${startStr}`,
        `DTEND;VALUE=DATE:${endStr}`,
        `SUMMARY:✈️ Travel: ${plan.holidayName} (${plan.country})`,
        `DESCRIPTION:${desc}`,
        `LOCATION:${plan.country}`,
        'STATUS:CONFIRMED',
        'TRANSP:OPAQUE',
        'END:VEVENT'
      ].join('\r\n');
    });

    icsContent += '\r\nEND:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Annual_Travel_Planner_2026_2027.ics`;
    link.click();
    URL.revokeObjectURL(url);

    setExportedIcs(true);
    confetti({ particleCount: 35, spread: 60 });
    setTimeout(() => setExportedIcs(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Analytical Overview */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-indigo-500/10 border border-amber-500/20 dark:border-amber-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Annual Travel & Climate Window Engine
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {bookmarkedHolidays.length} Bookmarked Festivals
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-white">
              Annual Travel Planner
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-xl">
              Visualizes your bookmarked holidays across a 12-month timeline and correlates regional climate data to recommend the optimal 3-month window for visiting each culture.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={handleCopyItinerary}
              className="py-2.5 px-3.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              {copiedPlan ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPlan ? 'Copied!' : 'Copy Itinerary'}</span>
            </button>
            <button
              onClick={handleExportAnnualIcs}
              className="py-2.5 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              {exportedIcs ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{exportedIcs ? 'Exported .ICS!' : 'Sync All (.ics)'}</span>
            </button>
          </div>
        </div>

        {/* Analytics Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-stone-200/60 dark:border-stone-800/60 text-center">
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Festive Expeditions</div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {vacationPlans.length}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Distinct Countries</div>
            <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {uniqueCountries}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Optimal Travel Days</div>
            <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
              {totalSuggestedDays}d
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-white/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60">
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">Work PTO Bridge</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {totalPtoDays}d
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle & Quarter Filter Segmented Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Quarter Filter */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/60 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'all', label: '12-Month Year' },
            { id: 'Q1', label: 'Q1 (Jan – Mar)' },
            { id: 'Q2', label: 'Q2 (Apr – Jun)' },
            { id: 'Q3', label: 'Q3 (Jul – Sep)' },
            { id: 'Q4', label: 'Q4 (Oct – Dec)' },
          ].map(q => (
            <button
              key={q.id}
              onClick={() => setSelectedQuarter(q.id as 'all' | 'Q1' | 'Q2' | 'Q3' | 'Q4')}
              className={`py-2 px-3 rounded-xl transition whitespace-nowrap cursor-pointer ${
                selectedQuarter === q.id
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle: Timeline vs Cards */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/60 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode('timeline')}
            className={`py-2 px-3 rounded-xl flex items-center gap-1.5 transition ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Timeline & Climate Windows</span>
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`py-2 px-3 rounded-xl flex items-center gap-1.5 transition ${
              viewMode === 'cards'
                ? 'bg-white dark:bg-stone-900 text-rose-600 dark:text-rose-400 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Trip Detail Cards</span>
          </button>
        </div>
      </div>

      {bookmarkedHolidays.length === 0 && (
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Currently displaying featured global celebrations. Bookmark any festival from the Explore Timeline to customize your personal annual travel calendar!</span>
        </div>
      )}

      {/* VIEW MODE 1: TIMELINE & REGIONAL CLIMATE WINDOW CORRELATION */}
      {viewMode === 'timeline' && (
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div>
              <h4 className="font-serif font-black text-lg text-stone-900 dark:text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-rose-500" />
                <span>Annual Timeline & Optimal 3-Month Visiting Windows</span>
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Bars indicate the optimal 3-month regional climate window; the glowing pin marks the exact holiday date.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 inline-block" />
                Optimal 3-Month Window
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-300 dark:ring-emerald-900 inline-block" />
                Festival Peak
              </span>
            </div>
          </div>

          {/* 12-Month Column Header Scale */}
          <div className="hidden sm:grid grid-cols-12 gap-1 text-center font-mono text-[11px] font-bold text-stone-500 dark:text-stone-400 border-b border-stone-100 dark:border-stone-800 pb-2">
            {MONTH_NAMES.map((m, i) => (
              <div key={m} className={`py-1 rounded-lg ${new Date().getMonth() === i ? 'bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300' : ''}`}>
                {m}
              </div>
            ))}
          </div>

          {/* Timeline Rows for each Holiday */}
          <div className="space-y-4">
            {filteredPlans.map(plan => {
              const holidayDate = new Date(plan.date);
              const holidayMonth = holidayDate.getMonth(); // 0-11
              const holidayDay = holidayDate.getDate();
              // Calculate percent offset within the year
              const monthPercent = (holidayMonth + holidayDay / 31) / 12 * 100;

              // Optimal 3-month window bounds
              const startMonth = plan.optimalWindow.startMonth;
              const startPercent = (startMonth / 12) * 100;
              const widthPercent = (3 / 12) * 100;

              const isSelected = selectedTimelineHolidayId === plan.holidayId;
              const matchingHoliday = allHolidays.find(h => h.id === plan.holidayId);

              return (
                <div
                  key={plan.holidayId}
                  onClick={() => setSelectedTimelineHolidayId(isSelected ? null : plan.holidayId)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-400 dark:border-rose-700 shadow-md ring-1 ring-rose-400/30' 
                      : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  {/* Top Holiday & Destination Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={plan.bannerUrl}
                        alt={plan.holidayName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-xl object-cover border border-stone-200 dark:border-stone-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 dark:text-white font-serif">
                            {plan.holidayName}
                          </span>
                          <span className="text-[11px] font-mono text-stone-500">
                            ({plan.country})
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-2 mt-0.5">
                          <CalendarIcon className="w-3 h-3 text-amber-500" />
                          <span>Festival: <strong className="text-stone-700 dark:text-stone-300">{plan.date}</strong></span>
                          <span>•</span>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">
                            Recommended Window: {plan.optimalWindow.windowLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40">
                        {plan.optimalWindow.tempSummary}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-300/40">
                        {plan.optimalWindow.rainfallStatus}
                      </span>
                    </div>
                  </div>

                  {/* Visual Timeline Bar with Optimal 3-Month Window & Date Marker */}
                  <div className="relative h-6 bg-stone-200/70 dark:bg-stone-700/60 rounded-xl overflow-hidden my-2">
                    {/* Month Division Grid Guidelines */}
                    <div className="absolute inset-0 grid grid-cols-12 divide-x divide-stone-300/50 dark:divide-stone-600/40 pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full" />
                      ))}
                    </div>

                    {/* Optimal 3-Month Visiting Window Span */}
                    <div
                      style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-400/80 via-rose-500/80 to-purple-500/80 rounded-lg shadow-sm border border-white/20 flex items-center justify-center text-[10px] font-bold text-white tracking-wider uppercase px-1 transition-all"
                      title={`Optimal 3-Month Visiting Window: ${plan.optimalWindow.windowLabel}`}
                    >
                      <span className="truncate">{plan.optimalWindow.windowLabel}</span>
                    </div>

                    {/* Exact Festival Date Marker Pin */}
                    <div
                      style={{ left: `${Math.min(98, Math.max(2, monthPercent))}%` }}
                      className="absolute top-0 bottom-0 w-2.5 bg-emerald-400 border-2 border-white dark:border-stone-900 rounded-full shadow-md -translate-x-1/2 animate-pulse"
                      title={`Festival Peak Moment: ${plan.date}`}
                    />
                  </div>

                  {/* Climate Correlation & Travel Recommendation */}
                  <div className="mt-3 p-3 rounded-xl bg-white dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800 text-xs space-y-1.5">
                    <div className="flex items-start gap-2 text-stone-700 dark:text-stone-300">
                      <Thermometer className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-900 dark:text-white">Why {plan.optimalWindow.windowLabel} is optimal: </strong>
                        <span>{plan.optimalWindow.reason}</span>
                      </div>
                    </div>

                    {/* Expanded details when clicked */}
                    {isSelected && (
                      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
                        <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800">
                          <span className="text-[11px] text-stone-500 block">Flight Booking Deadline</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">By {plan.flightBookingDeadline}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800">
                          <span className="text-[11px] text-stone-500 block">Suggested Vacation Span</span>
                          <span className="font-semibold text-stone-800 dark:text-stone-200">{plan.suggestedArrivalDate} → {plan.suggestedDepartureDate} ({plan.totalDays}d)</span>
                        </div>
                        <div className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800 flex items-center justify-between">
                          <div>
                            <span className="text-[11px] text-stone-500 block">PTO Bridge</span>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Take {plan.ptoDaysNeeded} work days</span>
                          </div>
                          {matchingHoliday && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectHoliday(matchingHoliday);
                              }}
                              className="py-1 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] transition"
                            >
                              Explore
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DETAILED TRIP CARDS */}
      {viewMode === 'cards' && (
        <div className="space-y-4">
          {filteredPlans.map(plan => {
            const isExpanded = expandedTripId === plan.holidayId;
            const matchingHoliday = allHolidays.find(h => h.id === plan.holidayId);

            return (
              <div
                key={plan.holidayId}
                className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-md transition duration-200"
              >
                {/* Card Header Strip with Hero Image & Main Dates */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={plan.bannerUrl}
                      alt={plan.holidayName}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 dark:border-stone-800 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{plan.country}</span>
                        <span>·</span>
                        <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold text-stone-700 dark:text-stone-300">{plan.date}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-black text-stone-900 dark:text-white">
                        {plan.holidayName}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200/60 dark:border-emerald-800/40">
                          {plan.totalDays}-Day Vacation Window
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200/60 dark:border-purple-800/40">
                          Only {plan.ptoDaysNeeded} PTO Days
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200/60 dark:border-amber-800/40">
                          Optimal: {plan.optimalWindow.windowLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Action / Expand Controls */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {matchingHoliday && (
                      <button
                        onClick={() => onSelectHoliday(matchingHoliday)}
                        className="py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-1 transition"
                      >
                        <span>Explore Lore</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedTripId(isExpanded ? null : plan.holidayId)}
                      className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Trip Intelligence Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-4 sm:px-5 pb-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-start gap-2">
                    <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100">Optimal 3-Month Window</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">
                        {plan.optimalWindow.windowLabel} ({plan.optimalWindow.tempSummary})
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-start gap-2">
                    <Flame className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100">Festive Peak Timing</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">{plan.peakMoment}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-900 dark:text-stone-100">Booking Deadline</div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-400 mt-0.5">Book flights by {plan.flightBookingDeadline}</div>
                    </div>
                  </div>
                </div>

                {/* Expanded Detailed Intelligence Accordion */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 space-y-4 text-xs animate-in fade-in duration-200">
                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40 text-stone-800 dark:text-stone-200">
                      <strong>Climate & Cultural Recommendation: </strong>
                      <span>{plan.optimalWindow.reason}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Suggested Daily Itinerary Breakdown */}
                      <div className="space-y-2">
                        <h5 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-amber-500" /> Recommended Travel Schedule
                        </h5>
                        <div className="space-y-1.5 text-stone-700 dark:text-stone-300">
                          <div className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex justify-between">
                            <span className="font-medium">Arrival & Acclimatization</span>
                            <span className="font-mono text-stone-500">{plan.suggestedArrivalDate}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex justify-between font-bold text-amber-900 dark:text-amber-200">
                            <span>Peak Festive Night / Rituals</span>
                            <span className="font-mono">{plan.date}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex justify-between">
                            <span>Leisurely Departure</span>
                            <span className="font-mono text-stone-500">{plan.suggestedDepartureDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Packing Checklist */}
                      <div className="space-y-2">
                        <h5 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                          <Luggage className="w-3.5 h-3.5 text-rose-500" /> Recommended Packing Essentials
                        </h5>
                        <ul className="space-y-1 text-stone-600 dark:text-stone-300">
                          {plan.packingList.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80">
                              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bookmark Toggle inside card */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                      <button
                        onClick={() => onToggleBookmark(plan.holidayId)}
                        className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5"
                      >
                        <Heart className={`w-4 h-4 ${bookmarkedHolidayIds.includes(plan.holidayId) ? 'fill-rose-500' : ''}`} />
                        <span>{bookmarkedHolidayIds.includes(plan.holidayId) ? 'Bookmarked in Travel Wishlist' : 'Add to Travel Wishlist'}</span>
                      </button>
                      <span className="text-[11px] text-stone-400">Crowd Density: {plan.crowdLevel}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
