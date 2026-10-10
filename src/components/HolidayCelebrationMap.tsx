import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, ExternalLink, Layers, ZoomIn, ZoomOut, RotateCcw, Compass, Sparkles } from 'lucide-react';
import { Holiday, CelebrationEpicenter } from '../types';
import { getHolidayCelebrationEpicenter } from '../utils/celebrationLocations';

interface HolidayCelebrationMapProps {
  holiday: Holiday;
  className?: string;
}

type MapLayerType = 'voyager' | 'osm' | 'dark';

export const HolidayCelebrationMap: React.FC<HolidayCelebrationMapProps> = ({
  holiday,
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  const [activeLayer, setActiveLayer] = useState<MapLayerType>('voyager');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const epicenter: CelebrationEpicenter = getHolidayCelebrationEpicenter(holiday);

  const tileServers: Record<MapLayerType, { url: string; attribution: string; subdomains?: string }> = {
    voyager: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a>, &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      subdomains: 'abcd'
    },
    osm: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    },
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://carto.com/" target="_blank">CARTO</a>, &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
      subdomains: 'abcd'
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const { latitude, longitude, zoomLevel } = epicenter;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: [latitude, longitude],
      zoom: zoomLevel,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true
    });

    mapInstanceRef.current = map;

    // Add Tile Layer
    const layerConfig = tileServers[activeLayer];
    const tileLayer = L.tileLayer(layerConfig.url, {
      attribution: layerConfig.attribution,
      subdomains: layerConfig.subdomains || 'abc',
      maxZoom: 19
    }).addTo(map);

    tileLayerRef.current = tileLayer;

    // Custom Festive Epicenter Pin Icon with Glowing Animation
    const customIcon = L.divIcon({
      className: 'festive-pin-container',
      html: `
        <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full cursor-pointer group">
          <div class="absolute -inset-2 bg-rose-500/30 rounded-full animate-ping pointer-events-none"></div>
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-stone-900 group-hover:scale-110 transition-transform">
            <svg class="w-5 h-5 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
            </svg>
          </div>
          <div class="absolute bottom-0 w-2.5 h-1 bg-black/40 rounded-full blur-[1px] translate-y-1"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -42]
    });

    // Create Pin Marker
    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    markerRef.current = marker;

    // Rich Popup Content
    const popupContent = `
      <div style="font-family: inherit; min-width: 210px; padding: 2px;">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background: #e11d48;"></span>
          <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: #e11d48; letter-spacing: 0.05em;">Celebration Epicenter</span>
        </div>
        <div style="font-size: 13px; font-weight: 800; color: #1c1917; margin-bottom: 2px;">${epicenter.city}</div>
        <div style="font-size: 11px; color: #57534e; margin-bottom: 6px;">${epicenter.region}, ${epicenter.country}</div>
        <div style="font-size: 11px; color: #292524; line-height: 1.35; background: #fff1f2; padding: 6px 8px; border-radius: 8px; border: 1px solid #fecdd3;">
          ${epicenter.significance}
        </div>
      </div>
    `;

    marker.bindPopup(popupContent, { maxWidth: 280 });

    // Invalidate size after mount to prevent gray tile glitches
    setTimeout(() => {
      map.invalidateSize();
      setMapLoaded(true);
    }, 150);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [holiday.id, epicenter.latitude, epicenter.longitude]);

  // Handle tile layer change
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    const layerConfig = tileServers[activeLayer];
    tileLayerRef.current.setUrl(layerConfig.url);
  }, [activeLayer]);

  // Recenter map on celebration epicenter
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([epicenter.latitude, epicenter.longitude], epicenter.zoomLevel, {
      duration: 1.2
    });
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const osmUrl = `https://www.openstreetmap.org/?mlat=${epicenter.latitude}&mlon=${epicenter.longitude}#map=${epicenter.zoomLevel}/${epicenter.latitude}/${epicenter.longitude}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${epicenter.latitude},${epicenter.longitude}`;

  return (
    <div className={`p-4 rounded-3xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 shadow-xs space-y-3 ${className}`}>
      {/* Header with Title and Epicenter Details */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 border border-rose-400/30">
              <MapPin className="w-3 h-3 text-rose-500" />
              Traditional Celebration Epicenter
            </span>
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
              {epicenter.latitude.toFixed(4)}°, {epicenter.longitude.toFixed(4)}°
            </span>
          </div>

          <h4 className="font-serif font-black text-sm sm:text-base text-stone-900 dark:text-white flex items-center gap-1.5">
            <span>{epicenter.city}, {epicenter.region}</span>
            <span className="text-stone-400 dark:text-stone-500 font-sans font-normal text-xs">• {epicenter.country}</span>
          </h4>
        </div>

        {/* Map Actions */}
        <div className="flex items-center gap-1">
          {/* Layer switcher */}
          <div className="flex items-center bg-stone-200/80 dark:bg-stone-700/80 p-0.5 rounded-lg text-[10px] font-bold">
            <button
              onClick={() => setActiveLayer('voyager')}
              className={`px-2 py-0.5 rounded-md transition ${activeLayer === 'voyager' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs' : 'text-stone-600 dark:text-stone-400'}`}
              title="Clean Voyager map layer"
            >
              Voyager
            </button>
            <button
              onClick={() => setActiveLayer('osm')}
              className={`px-2 py-0.5 rounded-md transition ${activeLayer === 'osm' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs' : 'text-stone-600 dark:text-stone-400'}`}
              title="OpenStreetMap Standard layer"
            >
              OSM
            </button>
            <button
              onClick={() => setActiveLayer('dark')}
              className={`px-2 py-0.5 rounded-md transition ${activeLayer === 'dark' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-2xs' : 'text-stone-600 dark:text-stone-400'}`}
              title="Night / Dark mode layer"
            >
              Dark
            </button>
          </div>

          {/* External links */}
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in OpenStreetMap"
            className="p-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-700 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-stone-300/80 dark:border-stone-700 shadow-inner bg-stone-200 dark:bg-stone-900">
        <div
          ref={mapContainerRef}
          style={{ height: isExpanded ? '340px' : '220px' }}
          className="w-full transition-all duration-300 z-10"
        />

        {/* Floating Interactive Controls On Map */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-1 rounded-xl shadow-md border border-stone-200 dark:border-stone-700">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-stone-200 dark:bg-stone-700 my-0.5" />
          <button
            onClick={handleRecenter}
            title="Recenter Epicenter"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-rose-600 dark:text-rose-400 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Floating Bottom Left Epicenter Badge */}
        <div className="absolute bottom-2.5 left-2.5 z-20 max-w-[80%] bg-stone-950/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl border border-white/10 shadow-lg text-[11px] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-semibold truncate">
            {epicenter.epicenterName}
          </span>
        </div>

        {/* Expand / Minimize toggle button */}
        <button
          onClick={() => {
            setIsExpanded(!isExpanded);
            setTimeout(() => mapInstanceRef.current?.invalidateSize(), 320);
          }}
          className="absolute bottom-2.5 right-2.5 z-20 px-2 py-1 rounded-lg bg-stone-950/85 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 hover:bg-stone-900 transition"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Cultural Gathering & Historical Grounding Explanation */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-300/40 dark:border-amber-900/40 space-y-1">
        <div className="flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Why this location is the cultural heart of {holiday.name}:
          </span>
          {epicenter.historicDistrict && (
            <span className="text-[10px] font-mono font-normal opacity-80 hidden sm:inline">
              District: {epicenter.historicDistrict}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
          {epicenter.significance}
        </p>
      </div>
    </div>
  );
};
