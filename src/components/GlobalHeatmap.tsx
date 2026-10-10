import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { 
  Flame, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Compass, 
  Layers, 
  Filter, 
  ExternalLink, 
  Eye, 
  CalendarPlus, 
  Download, 
  Info,
  X,
  TrendingUp,
  Globe2
} from 'lucide-react';
import { Holiday } from '../types';
import { FALLBACK_WORLD_GEOJSON, fetchWorldTopoJson } from '../utils/worldGeoData';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import confetti from 'canvas-confetti';

interface GlobalHeatmapProps {
  holidays: Holiday[];
  onSelectHoliday?: (holiday: Holiday) => void;
  onSyncGoogleCalendar?: (holiday: Holiday) => void;
}

interface RegionHeatData {
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lng: number;
  holidays: Holiday[];
  densityScore: number; // 0 - 100
  activeThisMonthCount: number;
  peakHolidayName: string;
  densityTier: 'low' | 'moderate' | 'high' | 'hyper';
}

export const GlobalHeatmap: React.FC<GlobalHeatmapProps> = ({
  holidays,
  onSelectHoliday,
  onSyncGoogleCalendar
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // States
  const [filterMode, setFilterMode] = useState<'current_month' | 'all_year' | 'cultural' | 'religious'>('current_month');
  const [selectedRegion, setSelectedRegion] = useState<RegionHeatData | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<RegionHeatData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoomTransform, setZoomTransform] = useState<d3.ZoomTransform | null>(null);
  const [worldData, setWorldData] = useState<any>(FALLBACK_WORLD_GEOJSON);
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  // Current calendar month (1 - 12)
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' });

  // 1. Fetch rich topojson if available, otherwise fallback is already active
  useEffect(() => {
    let mounted = true;
    fetchWorldTopoJson().then(topo => {
      if (mounted && topo && topo.objects && topo.objects.countries) {
        try {
          const geo = (topojson.feature as any)(topo, topo.objects.countries);
          setWorldData(geo);
        } catch {
          // fallback remains
        }
      }
    });
    return () => { mounted = false; };
  }, []);

  // 2. Predefined country beacons for rich regional clustering
  const baseHubs = useMemo(() => [
    { country: 'India', countryCode: 'IN', flag: '🇮🇳', lat: 20.5937, lng: 78.9629 },
    { country: 'Mexico', countryCode: 'MX', flag: '🇲🇽', lat: 23.6345, lng: -102.5528 },
    { country: 'China', countryCode: 'CN', flag: '🇨🇳', lat: 35.8617, lng: 104.1954 },
    { country: 'Germany', countryCode: 'DE', flag: '🇩🇪', lat: 51.1657, lng: 10.4515 },
    { country: 'Brazil', countryCode: 'BR', flag: '🇧🇷', lat: -14.2350, lng: -51.9253 },
    { country: 'Thailand', countryCode: 'TH', flag: '🇹🇭', lat: 15.8700, lng: 100.9925 },
    { country: 'Ireland', countryCode: 'IE', flag: '🇮🇪', lat: 53.1424, lng: -7.6921 },
    { country: 'Japan', countryCode: 'JP', flag: '🇯🇵', lat: 36.2048, lng: 138.2529 },
    { country: 'Saudi Arabia', countryCode: 'SA', flag: '🇸🇦', lat: 23.8859, lng: 45.0792 },
    { country: 'United States', countryCode: 'US', flag: '🇺🇸', lat: 37.0902, lng: -95.7129 },
    { country: 'Sweden', countryCode: 'SE', flag: '🇸🇪', lat: 60.1282, lng: 18.6435 },
    { country: 'Egypt', countryCode: 'EG', flag: '🇪🇬', lat: 26.8206, lng: 30.8025 },
    { country: 'Peru', countryCode: 'PE', flag: '🇵🇪', lat: -9.1900, lng: -75.0152 },
    { country: 'South Africa', countryCode: 'ZA', flag: '🇿🇦', lat: -30.5595, lng: 22.9375 },
    { country: 'Global & UN', countryCode: 'UN', flag: '🌐', lat: 40.7128, lng: -74.0060 }
  ], []);

  // 3. Calculate Regional Festive Density based on active filter
  const regionHeatList: RegionHeatData[] = useMemo(() => {
    return baseHubs.map(hub => {
      // Filter holidays relevant to this hub
      const matched = holidays.filter(h => {
        if (hub.countryCode !== 'UN' && h.countryCode === hub.countryCode) return true;
        const hC = h.country.toLowerCase();
        const hubC = hub.country.toLowerCase();
        return hC.includes(hubC) || hubC.includes(hC);
      });

      // Filter by mode
      let filtered = matched;
      if (filterMode === 'current_month') {
        filtered = matched.filter(h => h.month === currentMonth || h.month === (currentMonth % 12 + 1));
        // If current month has fewer than 1, still include at least 1 holiday for density preview
        if (filtered.length === 0 && matched.length > 0) {
          filtered = [matched[0]];
        }
      } else if (filterMode === 'cultural') {
        filtered = matched.filter(h => h.category === 'cultural');
      } else if (filterMode === 'religious') {
        filtered = matched.filter(h => h.category === 'religious');
      }

      // Calculate Density Score (0 - 100)
      const count = filtered.length;
      const avgPop = count > 0 
        ? filtered.reduce((acc, cur) => acc + (cur.popularityScore || 75), 0) / count 
        : 50;
      
      const activeThisMonth = matched.filter(h => h.month === currentMonth).length;
      
      // Bonus multiplier for active celebrations right now
      const monthBonus = activeThisMonth > 0 ? 18 : 0;
      const densityScore = Math.min(100, Math.round((count * 12) + (avgPop * 0.45) + monthBonus));

      // Tier classification
      let densityTier: 'low' | 'moderate' | 'high' | 'hyper' = 'low';
      if (densityScore >= 88) densityTier = 'hyper';
      else if (densityScore >= 72) densityTier = 'high';
      else if (densityScore >= 52) densityTier = 'moderate';

      // Peak holiday
      const sorted = [...filtered].sort((a, b) => (b.popularityScore || 0) - (a.popularityScore || 0));
      const peakHolidayName = sorted[0]?.name || (matched[0]?.name || 'Cultural Observance');

      return {
        ...hub,
        holidays: sorted.length > 0 ? sorted : matched,
        densityScore,
        activeThisMonthCount: activeThisMonth,
        peakHolidayName,
        densityTier
      };
    });
  }, [baseHubs, holidays, filterMode, currentMonth]);

  // Overall Hottest Region right now
  const hottestRegion = useMemo(() => {
    return [...regionHeatList].sort((a, b) => b.densityScore - a.densityScore)[0] || regionHeatList[0];
  }, [regionHeatList]);

  // Active celebrations across the globe this month
  const totalMonthCelebrations = useMemo(() => {
    return holidays.filter(h => h.month === currentMonth).length;
  }, [holidays, currentMonth]);

  // 4. D3 Drawing & Zoom Effect
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = 960;
    const height = 520;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    // Projection & Path generator
    const projection = d3.geoNaturalEarth1()
      .scale(160)
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    // Defs for Heatmap Radial Gradients
    const defs = svg.append('defs');

    // Hyper Tier Gradient (Blazing Violet-Crimson)
    const hyperGrad = defs.append('radialGradient')
      .attr('id', 'heatGrad-hyper')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    hyperGrad.append('stop').attr('offset', '0%').attr('stop-color', '#f43f5e').attr('stop-opacity', 0.95);
    hyperGrad.append('stop').attr('offset', '50%').attr('stop-color', '#ec4899').attr('stop-opacity', 0.6);
    hyperGrad.append('stop').attr('offset', '100%').attr('stop-color', '#be123c').attr('stop-opacity', 0);

    // High Tier Gradient (Vibrant Crimson-Orange)
    const highGrad = defs.append('radialGradient')
      .attr('id', 'heatGrad-high')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    highGrad.append('stop').attr('offset', '0%').attr('stop-color', '#ffedd5').attr('stop-opacity', 1);
    highGrad.append('stop').attr('offset', '25%').attr('stop-color', '#f97316').attr('stop-opacity', 0.85);
    highGrad.append('stop').attr('offset', '65%').attr('stop-color', '#ea580c').attr('stop-opacity', 0.45);
    highGrad.append('stop').attr('offset', '100%').attr('stop-color', '#c2410c').attr('stop-opacity', 0);

    // Moderate Tier Gradient (Amber-Gold)
    const modGrad = defs.append('radialGradient')
      .attr('id', 'heatGrad-moderate')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    modGrad.append('stop').attr('offset', '0%').attr('stop-color', '#fef08a').attr('stop-opacity', 0.9);
    modGrad.append('stop').attr('offset', '50%').attr('stop-color', '#f59e0b').attr('stop-opacity', 0.5);
    modGrad.append('stop').attr('offset', '100%').attr('stop-color', '#d97706').attr('stop-opacity', 0);

    // Low Tier Gradient (Cyan-Indigo)
    const lowGrad = defs.append('radialGradient')
      .attr('id', 'heatGrad-low')
      .attr('cx', '50%').attr('cy', '50%').attr('r', '50%');
    lowGrad.append('stop').attr('offset', '0%').attr('stop-color', '#38bdf8').attr('stop-opacity', 0.7);
    lowGrad.append('stop').attr('offset', '50%').attr('stop-color', '#0284c7').attr('stop-opacity', 0.35);
    lowGrad.append('stop').attr('offset', '100%').attr('stop-color', '#0369a1').attr('stop-opacity', 0);

    // Glow filter for beacons
    const filter = defs.append('filter').attr('id', 'heatGlow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Root Group for Zoom/Pan
    const g = svg.append('g').attr('class', 'map-stage');

    // 1. Ocean Background Circle / Sphere
    g.append('path')
      .datum({ type: 'Sphere' })
      .attr('class', 'sphere')
      .attr('d', pathGenerator as any)
      .attr('fill', '#090d16')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1.5);

    // 2. Graticules (Latitude & Longitude grid lines)
    const graticule = d3.geoGraticule10();
    g.append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', pathGenerator as any)
      .attr('fill', 'none')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 0.6)
      .attr('stroke-opacity', 0.6);

    // 3. World Landmass Features
    if (worldData && worldData.features) {
      g.selectAll('.land')
        .data(worldData.features)
        .enter()
        .append('path')
        .attr('class', 'land')
        .attr('d', pathGenerator as any)
        .attr('fill', '#172033')
        .attr('stroke', '#334155')
        .attr('stroke-width', 0.75)
        .attr('transition', 'fill 0.2s')
        .on('mouseover', function() {
          d3.select(this).attr('fill', '#1e293b');
        })
        .on('mouseout', function() {
          d3.select(this).attr('fill', '#172033');
        });
    }

    // 4. Heatmap Density Overlays (Multi-level Radiant Heat Rings)
    const heatGroup = g.append('g').attr('class', 'heat-overlays');

    regionHeatList.forEach(region => {
      const coords = projection([region.lng, region.lat]);
      if (!coords) return;

      const [cx, cy] = coords;
      const baseRadius = 22 + (region.densityScore / 100) * 38;

      // Outer heat dissipation bloom
      heatGroup.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', baseRadius * 1.5)
        .attr('fill', `url(#heatGrad-${region.densityTier})`)
        .attr('opacity', 0.75)
        .attr('pointer-events', 'none');

      // Core concentrated heat ring
      heatGroup.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', baseRadius * 0.9)
        .attr('fill', `url(#heatGrad-${region.densityTier})`)
        .attr('opacity', 0.9)
        .attr('pointer-events', 'none');

      // Hyper tier animated pulse ripple
      if (region.densityTier === 'hyper' || region.densityTier === 'high') {
        heatGroup.append('circle')
          .attr('cx', cx)
          .attr('cy', cy)
          .attr('r', baseRadius * 0.6)
          .attr('fill', 'none')
          .attr('stroke', region.densityTier === 'hyper' ? '#f43f5e' : '#f97316')
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.8)
          .attr('class', 'animate-ping')
          .style('animation-duration', region.densityTier === 'hyper' ? '2.5s' : '3.5s');
      }

      // Interactive Beacon Core Pin
      const beaconGroup = heatGroup.append('g')
        .attr('transform', `translate(${cx}, ${cy})`)
        .style('cursor', 'pointer');

      // Pulsing center beacon dot
      beaconGroup.append('circle')
        .attr('r', region.densityTier === 'hyper' ? 6 : 4.5)
        .attr('fill', region.densityTier === 'hyper' ? '#ffffff' : region.densityTier === 'high' ? '#ffedd5' : '#fef08a')
        .attr('stroke', region.densityTier === 'hyper' ? '#e11d48' : '#ea580c')
        .attr('stroke-width', 2.5)
        .attr('filter', 'url(#heatGlow)');

      // Small Density Badge Label
      beaconGroup.append('text')
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '9px')
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold')
        .attr('class', 'select-none pointer-events-none drop-shadow-md')
        .text(`${region.flag} ${region.densityScore}`);

      // Invisible larger hit area for smooth hover/clicks
      beaconGroup.append('circle')
        .attr('r', 24)
        .attr('fill', 'transparent')
        .on('mouseenter', (event) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setHoveredRegion(region);
            setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
          }
        })
        .on('mousemove', (event) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top });
          }
        })
        .on('mouseleave', () => {
          setHoveredRegion(null);
        })
        .on('click', () => {
          setSelectedRegion(region);
          try {
            confetti({
              particleCount: 20,
              spread: 45,
              origin: { y: 0.6 }
            });
          } catch {
            // ignore
          }
        });
    });

    // 5. D3 Zoom Behavior (Scroll, Drag, Touch)
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8])
      .translateExtent([[-150, -100], [width + 150, height + 100]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomTransform(event.transform);
      });

    svg.call(zoom);

    // Initial transform if stored
    if (zoomTransform) {
      g.attr('transform', zoomTransform.toString());
    }

  }, [worldData, regionHeatList, filterMode]);

  // Zoom control helpers
  const handleZoomChange = (delta: number) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(400).call(
      (d3.zoom<SVGSVGElement, unknown>() as any).scaleBy,
      delta > 0 ? 1.4 : 0.7
    );
  };

  const handleResetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(600).call(
      (d3.zoom<SVGSVGElement, unknown>() as any).transform,
      d3.zoomIdentity
    );
  };

  const handleRegionJump = (lat: number, lng: number, scale: number = 2.6) => {
    if (!svgRef.current) return;
    const width = 960;
    const height = 520;
    const projection = d3.geoNaturalEarth1().scale(160).translate([width / 2, height / 2]);
    const p = projection([lng, lat]);
    if (!p) return;

    const x = width / 2 - p[0] * scale;
    const y = height / 2 - p[1] * scale;

    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(
      (d3.zoom<SVGSVGElement, unknown>() as any).transform,
      d3.zoomIdentity.translate(x, y).scale(scale)
    );
  };

  const triggerCalendarFeedback = (holidayName: string, service: string) => {
    setCalendarToast(`Added "${holidayName}" to ${service}!`);
    setTimeout(() => setCalendarToast(null), 3500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Metric Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-rose-950/70 to-stone-900 border border-stone-800 p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-rose-500/30">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-500 animate-pulse" />
                D3.js Global Festive Heatmap
              </span>
              <span className="text-xs text-stone-400">Current Season: {currentMonthName}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-white">
              Planetary Celebration Density
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Explore where festive energy is burning brightest across continents. Pan and zoom the world projection to inspect active cultural clusters, sacred holidays, and regional peak dates.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Hottest Region
              </div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-white">
                <span>{hottestRegion.flag}</span>
                <span className="truncate">{hottestRegion.country}</span>
              </div>
              <div className="text-[11px] font-mono text-rose-400 font-semibold">
                {hottestRegion.densityScore}/100 Density
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Active in {currentMonthName}
              </div>
              <div className="text-lg font-serif font-black text-amber-400">
                {totalMonthCelebrations} Celebrations
              </div>
              <div className="text-[10px] text-stone-400">
                Worldwide ongoing
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-1 col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Global Index
              </div>
              <div className="text-lg font-serif font-black text-emerald-400">
                Active Peak
              </div>
              <div className="text-[10px] text-stone-400">
                15 Core Cultural Hubs
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div 
        ref={containerRef}
        className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-stone-800 shadow-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[580px]"
      >
        {/* Map Header Toolbar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
          {/* Filter Mode Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0">
              Density Metric:
            </span>
            {[
              { id: 'current_month', label: `🔥 Active in ${currentMonthName}` },
              { id: 'all_year', label: '🌍 All-Year Density' },
              { id: 'cultural', label: '🏮 Cultural Festivals' },
              { id: 'religious', label: '✨ Sacred Traditions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id as any)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  filterMode === tab.id
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* D3 Zoom Controls */}
          <div className="flex items-center gap-1.5 bg-stone-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-700/60 shadow-lg">
            <button
              onClick={() => handleZoomChange(1)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoomChange(-1)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SVG D3 Projection Canvas */}
        <div className="relative w-full flex-1 min-h-[440px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
          <svg
            ref={svgRef}
            viewBox="0 0 960 520"
            className="w-full h-full max-h-[520px] select-none"
            style={{ shapeRendering: 'geometricPrecision' }}
          />

          {/* Hover Tooltip Overlay */}
          {hoveredRegion && (
            <div
              className="absolute z-20 pointer-events-none bg-stone-900/95 backdrop-blur-md border border-stone-700 p-3 rounded-2xl shadow-2xl text-xs space-y-1 transform -translate-x-1/2 -translate-y-full mb-3 min-w-[210px] text-white"
              style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-stone-800 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{hoveredRegion.flag}</span>
                  <span className="font-bold text-white text-xs">{hoveredRegion.country}</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  hoveredRegion.densityTier === 'hyper' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {hoveredRegion.densityScore}/100 Heat
                </span>
              </div>
              <div className="text-[11px] text-stone-300">
                {hoveredRegion.holidays.length} Indexed Celebrations
              </div>
              <div className="text-[10px] text-rose-400 font-semibold truncate">
                🌟 Peak: {hoveredRegion.peakHolidayName}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-amber-400 font-bold pt-1">
                Click to inspect holidays + calendar sync →
              </div>
            </div>
          )}
        </div>

        {/* Toast Notification */}
        {calendarToast && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 bg-emerald-600/95 text-white px-4 py-2 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
            <Sparkles className="w-4 h-4 text-white" />
            <span>{calendarToast}</span>
          </div>
        )}

        {/* Bottom Region Quick Focus Dock & Heatmap Legend */}
        <div className="relative z-10 pt-3 border-t border-stone-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-white">
          {/* Quick Region Jump Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 shrink-0">
              Quick Focus:
            </span>
            {[
              { name: 'All Continents', lat: 20, lng: 0, scale: 1 },
              { name: 'Asia & Pacific', lat: 22, lng: 95, scale: 2.3 },
              { name: 'Europe', lat: 50, lng: 15, scale: 3.2 },
              { name: 'Americas', lat: 10, lng: -85, scale: 2.1 },
              { name: 'Africa & Mid-East', lat: 10, lng: 28, scale: 2.4 }
            ].map((reg, idx) => (
              <button
                key={idx}
                onClick={() => handleRegionJump(reg.lat, reg.lng, reg.scale)}
                className="py-1 px-2.5 rounded-xl bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-700/60 text-xs font-medium shrink-0 transition"
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Heatmap Legend Bar */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs bg-stone-900/80 p-1.5 px-3 rounded-2xl border border-stone-800">
            <span className="text-[10px] font-bold uppercase text-stone-400">
              Heat Scale:
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" />
                Moderate
              </span>
              <span className="text-stone-600">→</span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Warm
              </span>
              <span className="text-stone-600">→</span>
              <span className="flex items-center gap-1 text-orange-500">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                Blazing
              </span>
              <span className="text-stone-600">→</span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block animate-pulse" />
                Hyper-Peak
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* REGIONAL FESTIVE DENSITY INSPECTOR MODAL */}
      {selectedRegion && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-stone-900 border border-stone-700/90 rounded-3xl shadow-2xl p-5 sm:p-6 max-w-2xl w-full max-h-[90vh] flex flex-col space-y-4 overflow-hidden text-white ring-1 ring-white/10">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-center text-3xl shadow-inner">
                  {selectedRegion.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                      {selectedRegion.country}
                    </h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {selectedRegion.densityScore}/100 Density
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Festive Intensity Tier: <strong className="text-rose-400 capitalize">{selectedRegion.densityTier} Peak</strong> ({selectedRegion.holidays.length} Observances Indexed)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedRegion(null)}
                className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Holidays in this Heat Hub */}
            <div className="overflow-y-auto space-y-3 pr-1 py-1 no-scrollbar">
              {selectedRegion.holidays.map((holiday, idx) => (
                <div
                  key={holiday.id}
                  className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-rose-500/40 transition space-y-2.5 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {holiday.bannerUrl && (
                        <img
                          src={holiday.bannerUrl}
                          alt={holiday.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-stone-700"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-serif font-bold text-white group-hover:text-rose-400 transition">
                            {idx + 1}. {holiday.name}
                          </span>
                          {holiday.localName && (
                            <span className="text-[11px] text-stone-400 italic">
                              ({holiday.localName})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-stone-400">
                          <span className="font-mono text-amber-300 font-semibold flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {holiday.date}
                          </span>
                          <span>•</span>
                          <span className="capitalize px-1.5 py-0.2 rounded bg-stone-800 text-stone-300 text-[10px]">
                            {holiday.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Add to Calendar Links */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                      <a
                        href={getGoogleCalendarUrl(holiday)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          triggerCalendarFeedback(holiday.name, 'Google Calendar');
                          onSyncGoogleCalendar?.(holiday);
                        }}
                        className="py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-semibold flex items-center gap-1 transition shadow-sm"
                        title="Add to Google Calendar"
                      >
                        <CalendarPlus className="w-3.5 h-3.5 text-indigo-200" />
                        <span>Google Cal</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>

                      <button
                        onClick={() => {
                          downloadIcsFile(holiday);
                          triggerCalendarFeedback(holiday.name, 'iCal / Outlook');
                        }}
                        className="py-1.5 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition"
                        title="Download .ICS file"
                      >
                        <Download className="w-3.5 h-3.5 text-stone-400" />
                        <span>.ICS</span>
                      </button>

                      {onSelectHoliday && (
                        <button
                          onClick={() => {
                            onSelectHoliday(holiday);
                            setSelectedRegion(null);
                          }}
                          className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
                          title="Open full interactive lore and climate"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed pl-1">
                    {holiday.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-3">
              <span className="text-xs text-stone-400">
                Heat density combines seasonal timing, global participation, and historical heritage.
              </span>
              <button
                onClick={() => setSelectedRegion(null)}
                className="py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
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
