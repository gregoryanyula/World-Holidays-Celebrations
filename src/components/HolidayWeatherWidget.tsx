import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  Thermometer, 
  Wind, 
  Droplets, 
  RefreshCw, 
  Calendar, 
  Compass, 
  Globe, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Holiday, HolidayWeatherInfo } from '../types';
import { fetchHolidayOriginWeather } from '../utils/weatherApi';

interface HolidayWeatherWidgetProps {
  holiday: Holiday;
}

export const HolidayWeatherWidget: React.FC<HolidayWeatherWidgetProps> = ({ holiday }) => {
  const [weather, setWeather] = useState<HolidayWeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHolidayOriginWeather(holiday);
      setWeather(data);
    } catch (err) {
      console.error('Failed to load weather:', err);
      setError('Unable to reach external weather satellite.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [holiday.id]);

  const toDisplayTemp = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const renderWeatherIcon = (code: number, isDay: boolean = true) => {
    if (code === 0 || code === 1) {
      return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
    }
    if (code === 2) {
      return <CloudSun className="w-8 h-8 text-amber-400" />;
    }
    if (code === 3 || code === 45 || code === 48) {
      return <Cloud className="w-8 h-8 text-stone-400" />;
    }
    if ((code >= 51 && code <= 65) || (code >= 80 && code <= 82)) {
      return <CloudRain className="w-8 h-8 text-sky-400" />;
    }
    if (code >= 71 && code <= 77 || code === 85 || code === 86) {
      return <CloudSnow className="w-8 h-8 text-indigo-300" />;
    }
    if (code >= 95) {
      return <CloudLightning className="w-8 h-8 text-amber-500" />;
    }
    return <Sun className="w-8 h-8 text-amber-500" />;
  };

  return (
    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/90 shadow-sm overflow-hidden transition">
      {/* Header bar */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-sky-500/10 via-amber-500/5 to-transparent border-b border-stone-100 dark:border-stone-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-white flex items-center gap-1.5">
              <span>Origin Climate & Weather</span>
              <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                {holiday.country}
              </span>
            </h4>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Live forecast from Open-Meteo external API & event date climate
            </p>
          </div>
        </div>

        {/* Action controls: Unit Toggle & Refresh */}
        <div className="flex items-center gap-2">
          {/* Unit Toggle */}
          <div className="inline-flex rounded-xl bg-stone-100 dark:bg-stone-800 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setUnit('C')}
              className={`px-2 py-1 rounded-lg transition ${
                unit === 'C'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-2 py-1 rounded-lg transition ${
                unit === 'F'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-xs'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              °F
            </button>
          </div>

          {/* Refresh Button */}
          <button
            onClick={loadWeather}
            disabled={loading}
            title="Refresh live weather"
            className="p-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-sky-600 dark:hover:text-sky-400 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 space-y-4">
        {loading && !weather ? (
          <div className="flex items-center justify-center py-6 gap-3 text-stone-400 text-xs">
            <RefreshCw className="w-5 h-5 animate-spin text-sky-500" />
            <span>Connecting to Open-Meteo API satellite telemetry...</span>
          </div>
        ) : weather ? (
          <>
            {/* Top Row: Current Live Temperature & Weather Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Left: Big Temperature & Icon */}
              <div className="sm:col-span-6 flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-br from-sky-50/70 to-indigo-50/30 dark:from-sky-950/20 dark:to-indigo-950/10 border border-sky-100 dark:border-sky-900/30">
                <div className="p-2 rounded-2xl bg-white dark:bg-stone-800 shadow-sm shrink-0">
                  {renderWeatherIcon(weather.weatherCode, weather.isDaytime)}
                </div>
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-stone-900 dark:text-white">
                      {toDisplayTemp(weather.temperature)}°{unit}
                    </span>
                    {weather.apparentTemperature !== undefined && (
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        Feels like {toDisplayTemp(weather.apparentTemperature)}°{unit}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 block capitalize">
                    {weather.conditionDescription}
                  </span>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <Globe className="w-3 h-3 text-sky-500" />
                    Live conditions at origin coords ({holiday.latitude?.toFixed(1)}°, {holiday.longitude?.toFixed(1)}°)
                  </span>
                </div>
              </div>

              {/* Right: Humidity, Wind, Atmosphere */}
              <div className="sm:col-span-6 grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-stone-400 text-[11px] mb-1">
                    <Droplets className="w-3.5 h-3.5 text-sky-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {weather.humidity}%
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700/60">
                  <div className="flex items-center gap-1.5 text-stone-400 text-[11px] mb-1">
                    <Wind className="w-3.5 h-3.5 text-teal-500" />
                    <span>Wind Speed</span>
                  </div>
                  <span className="text-sm font-bold text-stone-800 dark:text-stone-200">
                    {weather.windSpeed} km/h
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Event Date Typical Conditions & Festival Atmosphere */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                    Typical Weather on Event Date ({holiday.date})
                  </span>
                </div>

                {/* Season Badge & Temperature Range */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
                    {weather.seasonName}
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300">
                    High: {toDisplayTemp(weather.seasonTypicalHigh)}° / Low: {toDisplayTemp(weather.seasonTypicalLow)}°
                  </span>
                </div>
              </div>

              {/* Climate observation notes */}
              <p className="text-xs text-amber-950/80 dark:text-amber-200/80 leading-relaxed">
                "{weather.eventDateConditionNotes}"
              </p>
            </div>

            {/* Footer status notice */}
            <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>
                  {weather.isOfflineEstimated
                    ? 'Regional climatological model active'
                    : `Verified via Open-Meteo API • Updated ${weather.fetchedAt}`}
                </span>
              </div>
              <span className="hidden sm:inline">
                Seasonal forecast calibrated for {holiday.country}
              </span>
            </div>
          </>
        ) : (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>{error || 'Weather telemetry offline. Showing seasonal estimates.'}</span>
            </div>
            <button
              onClick={loadWeather}
              className="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
