import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Music, 
  Headphones, 
  Sliders, 
  Info,
  Radio
} from 'lucide-react';
import { Holiday, HolidaySoundscape } from '../types';
import { atmosphericAudio } from '../utils/atmosphericAudio';

interface AtmosphericSoundPlayerProps {
  holiday: Holiday;
  autoPlay?: boolean;
}

export const SOUNDSCAPE_PRESETS_META: Record<string, HolidaySoundscape> = {
  sitar_bells: {
    title: 'Sacred Sitar & Temple Bells',
    instrument: 'Indian Classical Sitar, Tanpura Drone, Brass Diyas',
    genre: 'Indian Classical / Raga Yaman',
    description: 'Resonant harmonic overtones and meditative microtonal meend glides evoking holy temples at twilight.',
    preset: 'sitar_bells',
    presetKey: 'sitar_bells'
  },
  mariachi_brass: {
    title: 'Mariachi Brass & Fiesta Strum',
    instrument: 'Vihuela, Trumpets & Guitarrón',
    genre: 'Mexican Son Huasteco & Mariachi',
    description: 'Joyful rhythmic chord strums and triumphant trumpet flourishes honoring ancestors and national heritage.',
    preset: 'mariachi_brass',
    presetKey: 'mariachi_brass'
  },
  guzheng_firecrackers: {
    title: 'Guzheng Zither & Festive Firecrackers',
    instrument: '21-String Guzheng & Silk Pentatonic Harmonies',
    genre: 'Traditional Chinese Folk',
    description: 'Cascading pentatonic arpeggios with gentle distant sparkler pops to invite fortune and ward off evil.',
    preset: 'guzheng_firecrackers',
    presetKey: 'guzheng_firecrackers'
  },
  oud_breeze: {
    title: 'Oud Strings & Evening Ramadan Breeze',
    instrument: 'Arabic Fretless Oud & Desert Ney',
    genre: 'Middle Eastern Maqam Hijaz',
    description: 'Deep resonant wooden tones accompanied by a warm desert wind wash at the breaking of the fast.',
    preset: 'oud_breeze',
    presetKey: 'oud_breeze'
  },
  bavarian_polka: {
    title: 'Bavarian Accordion & Brass Oom-Pah',
    instrument: 'Steirische Harmonika & Bass Tuba',
    genre: 'Bavarian Volksfest Polka',
    description: 'Lively folk beats echoing through the beer halls of Munich during Oktoberfest festivities.',
    preset: 'bavarian_polka',
    presetKey: 'bavarian_polka'
  },
  batucada_samba: {
    title: 'Batucada Samba & Agogô Bells',
    instrument: 'Surdo Drum, Agogô Twin Bells & Shakers',
    genre: 'Rio Carnival Street Samba',
    description: 'Irresistible syncopated polyrhythms that pulse through the streets of Rio de Janeiro during Carnaval.',
    preset: 'batucada_samba',
    presetKey: 'batucada_samba'
  },
  thai_water: {
    title: 'Ranat Xylophone & Songkran Waterfalls',
    instrument: 'Ranat Ek Wooden Xylophone & Flowing Water',
    genre: 'Classical Thai Piphat & Water Soundscape',
    description: 'Sparkling wooden mallet melodies complemented by gentle refreshing water flows during Thai New Year.',
    preset: 'thai_water',
    presetKey: 'thai_water'
  },
  celtic_whistle: {
    title: 'Celtic Tin Whistle & Bodhrán Drum',
    instrument: 'Irish Penny Whistle & Goatskin Bodhrán',
    genre: 'Irish Traditional Folk Reel',
    description: 'Airy, spirited pennywhistle ornamentation grounded by the primordial heartbeat of a Celtic frame drum.',
    preset: 'celtic_whistle',
    presetKey: 'celtic_whistle'
  },
  klezmer_chimes: {
    title: 'Klezmer Clarinet & Menorah Chimes',
    instrument: 'Freygish Wood Clarinet & Temple Chimes',
    genre: 'Jewish Eastern European Klezmer',
    description: 'Soulful weeping and laughing clarinet ornamentation celebrating sacred miracles and festival lights.',
    preset: 'klezmer_chimes',
    presetKey: 'klezmer_chimes'
  },
  andean_panpipes: {
    title: 'Andean Zampoña Panpipes & Charango',
    instrument: 'Bamboo Zampoña Pan Flute & Mountain Wind',
    genre: 'Inca Andean Solstice Rituals',
    description: 'Breathy mountain flutes floating above the high Andes during the sacred Inca Festival of the Sun.',
    preset: 'andean_panpipes',
    presetKey: 'andean_panpipes'
  },
  scandi_folk: {
    title: 'Nyckelharpa Drone & Midsummer Sun',
    instrument: 'Keyed Fiddle (Nyckelharpa) & Summer Wind',
    genre: 'Nordic Folk Solstice Ballad',
    description: 'Warm, resonant symphonic strings capturing the magic of perpetual twilight during Midsummer night.',
    preset: 'scandi_folk',
    presetKey: 'scandi_folk'
  },
  african_djembe: {
    title: 'African Djembe Polyrhythm & Kalimba',
    instrument: 'Carved Goat-skin Djembe & Thumb Piano',
    genre: 'Pan-African Heritage Rhythms',
    description: 'Deep bass thumps, crisp hand slaps, and soothing kalimba drops honoring heritage and unity.',
    preset: 'african_djembe',
    presetKey: 'african_djembe'
  },
  choral_carols: {
    title: 'Cathedral Organ & Winter Solstice Chimes',
    instrument: 'Choral Organ Pipe Swells & Cathedral Bells',
    genre: 'Winter Sacred Choral Hymns',
    description: 'Celestial reverbs and majestic bronze cathedral bells ringing across snowy rooftops on Christmas Eve.',
    preset: 'choral_carols',
    presetKey: 'choral_carols'
  },
  persian_santur: {
    title: 'Persian Santur & Spring Equinox River',
    instrument: 'Hammered Santur Dulcimer & Flowing Brook',
    genre: 'Persian Classical Dastgah Shur',
    description: 'Shimmering metallic hammer strikes on 72 strings heralding the arrival of spring and Nowruz.',
    preset: 'persian_santur',
    presetKey: 'persian_santur'
  },
  taiko_flute: {
    title: 'Taiko Thunder & Shakuhachi Flute',
    instrument: 'Japanese Taiko Drum & Bamboo Shakuhachi',
    genre: 'Japanese Matsuri & Obon Chants',
    description: 'Heart-shaking drum strikes answering breathy bamboo flute melodies to welcome returning ancestors.',
    preset: 'taiko_flute',
    presetKey: 'taiko_flute'
  },
  hearthside_strings: {
    title: 'Hearthside Acoustic & Fireside Crackle',
    instrument: 'Acoustic Guitar Fingerpicking & Hearth Logs',
    genre: 'Harvest Americana / Hearth Ambience',
    description: 'Warm woody acoustic guitar fingerpicking alongside crackling cedar fires for Thanksgiving and autumn feasts.',
    preset: 'hearthside_strings',
    presetKey: 'hearthside_strings'
  }
};

// Helper to determine the best default soundscape for any holiday
export const getSoundscapeForHoliday = (holiday: Holiday): HolidaySoundscape => {
  if (holiday.soundscape) {
    return holiday.soundscape;
  }

  const id = holiday.id.toLowerCase();
  const cat = holiday.category;
  const country = (holiday.country || '').toLowerCase();
  const name = holiday.name.toLowerCase();

  if (id.includes('diwali') || country.includes('india')) {
    return SOUNDSCAPE_PRESETS_META.sitar_bells;
  }
  if (id.includes('muertos') || id.includes('cinco') || id.includes('republic') || country.includes('mexico')) {
    return SOUNDSCAPE_PRESETS_META.mariachi_brass;
  }
  if (id.includes('lunar') || id.includes('mid-autumn') || id.includes('singles') || country.includes('china')) {
    return SOUNDSCAPE_PRESETS_META.guzheng_firecrackers;
  }
  if (id.includes('eid') || id.includes('ramadan') || country.includes('saudi') || country.includes('islam')) {
    return SOUNDSCAPE_PRESETS_META.oud_breeze;
  }
  if (id.includes('oktoberfest') || country.includes('germany')) {
    return SOUNDSCAPE_PRESETS_META.bavarian_polka;
  }
  if (id.includes('carnival') || id.includes('lovers') || country.includes('brazil')) {
    return SOUNDSCAPE_PRESETS_META.batucada_samba;
  }
  if (id.includes('songkran') || country.includes('thailand')) {
    return SOUNDSCAPE_PRESETS_META.thai_water;
  }
  if (id.includes('patrick') || id.includes('burns') || country.includes('ireland') || country.includes('scotland')) {
    return SOUNDSCAPE_PRESETS_META.celtic_whistle;
  }
  if (id.includes('hanukkah') || id.includes('kippur') || id.includes('hashanah') || country.includes('israel')) {
    return SOUNDSCAPE_PRESETS_META.klezmer_chimes;
  }
  if (id.includes('inti') || country.includes('peru') || country.includes('andes')) {
    return SOUNDSCAPE_PRESETS_META.andean_panpipes;
  }
  if (id.includes('midsommar') || country.includes('sweden')) {
    return SOUNDSCAPE_PRESETS_META.scandi_folk;
  }
  if (id.includes('kwanzaa') || id.includes('juneteenth') || id.includes('timkat') || country.includes('ethiopia') || country.includes('africa')) {
    return SOUNDSCAPE_PRESETS_META.african_djembe;
  }
  if (id.includes('nowruz') || id.includes('equinox') || country.includes('iran')) {
    return SOUNDSCAPE_PRESETS_META.persian_santur;
  }
  if (id.includes('obon') || id.includes('rei') || id.includes('white') || country.includes('japan')) {
    return SOUNDSCAPE_PRESETS_META.taiko_flute;
  }
  if (id.includes('christmas') || id.includes('boxing') || id.includes('easter')) {
    return SOUNDSCAPE_PRESETS_META.choral_carols;
  }

  return SOUNDSCAPE_PRESETS_META.hearthside_strings;
};

export const AtmosphericSoundPlayer: React.FC<AtmosphericSoundPlayerProps> = ({
  holiday,
  autoPlay = false
}) => {
  const defaultMeta = getSoundscapeForHoliday(holiday);
  const [selectedPresetKey, setSelectedPresetKey] = useState<string>(defaultMeta.presetKey || 'hearthside_strings');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.5);
  const [showPresetsMenu, setShowPresetsMenu] = useState<boolean>(false);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(16).fill(10));
  const animFrameRef = useRef<number | null>(null);

  const currentMeta = SOUNDSCAPE_PRESETS_META[selectedPresetKey] || defaultMeta;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      atmosphericAudio.stop();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Sync state if holiday changes
  useEffect(() => {
    const newDefault = getSoundscapeForHoliday(holiday);
    setSelectedPresetKey(newDefault.presetKey || 'hearthside_strings');
    if (isPlaying) {
      atmosphericAudio.play(newDefault.presetKey || 'hearthside_strings', volume);
    }
  }, [holiday.id]);

  // Audio visualizer animation loop
  useEffect(() => {
    const updateVisualizer = () => {
      if (isPlaying) {
        const rawData = atmosphericAudio.getAnalyserData();
        const bars: number[] = [];
        const step = Math.max(1, Math.floor(rawData.length / 16));
        for (let i = 0; i < 16; i++) {
          const val = rawData[i * step] || 0;
          // Normalize to 15% - 100% height
          const heightPercent = Math.min(100, Math.max(15, Math.round((val / 255) * 100)));
          bars.push(heightPercent);
        }
        setVisualizerBars(bars);
        animFrameRef.current = requestAnimationFrame(updateVisualizer);
      } else {
        setVisualizerBars(new Array(16).fill(8));
      }
    };

    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    } else {
      setVisualizerBars(new Array(16).fill(8));
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      atmosphericAudio.stop();
      setIsPlaying(false);
    } else {
      atmosphericAudio.play(selectedPresetKey, volume);
      setIsPlaying(true);
    }
  };

  const handlePresetSelect = (key: string) => {
    setSelectedPresetKey(key);
    setShowPresetsMenu(false);
    if (isPlaying) {
      atmosphericAudio.play(key, volume);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    atmosphericAudio.setVolume(newVol);
  };

  return (
    <div className="rounded-2xl p-4 bg-gradient-to-br from-stone-900 via-stone-900 to-indigo-950/80 text-white border border-stone-700/80 shadow-lg space-y-3.5">
      {/* Header bar with Atmospheric Sounds badge & toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition shadow-md ${
            isPlaying 
              ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white animate-pulse' 
              : 'bg-stone-800 text-stone-400 border border-stone-700'
          }`}>
            <Music className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-serif font-black tracking-wide uppercase text-rose-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-spin text-amber-400" />
                Atmospheric Sounds
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                isPlaying 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}>
                {isPlaying ? 'Live Ambient' : 'Muted'}
              </span>
            </div>
            <h4 className="font-serif font-bold text-sm text-stone-100 mt-0.5">
              {currentMeta.title}
            </h4>
          </div>
        </div>

        {/* Master Play / Pause Toggle Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowPresetsMenu(!showPresetsMenu)}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700/80 flex items-center gap-1.5 transition"
            title="Choose alternative regional soundscapes"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Change Soundscape</span>
          </button>

          <button
            onClick={togglePlay}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-stone-950 font-black shadow-amber-900/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-stone-950" />
                <span>Play Soundscape</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Frequency Spectrum Visualizer & Audio Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-stone-950/70 border border-stone-800/80">
        {/* Equalizer Frequency Bars */}
        <div className="flex items-end gap-1 h-8 px-2 flex-1 overflow-hidden">
          {visualizerBars.map((height, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-sm transition-all duration-75 ${
                isPlaying
                  ? 'bg-gradient-to-t from-amber-500 via-rose-500 to-indigo-400 opacity-90'
                  : 'bg-stone-800 opacity-40'
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Volume Slider & Mute Toggle */}
        <div className="flex items-center gap-2.5 shrink-0 px-1">
          <button
            onClick={() => handleVolumeChange(volume === 0 ? 0.5 : 0)}
            className="text-stone-400 hover:text-white transition"
            title={volume === 0 ? 'Unmute' : 'Mute'}
          >
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-stone-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-amber-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20 sm:w-24 accent-rose-500 cursor-pointer h-1.5 bg-stone-800 rounded-lg"
            aria-label="Atmospheric sound volume"
          />
          <span className="text-[11px] font-mono text-stone-400 w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Cultural Instrument & Genre Details */}
      <div className="flex items-start gap-2 text-xs text-stone-300">
        <Headphones className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-medium text-stone-200">
            <span className="font-bold text-amber-300">{currentMeta.instrument}</span> • {currentMeta.genre}
          </p>
          <p className="text-[11px] text-stone-400 italic">
            {currentMeta.description}
          </p>
        </div>
      </div>

      {/* Soundscape Preset Selection Drawer */}
      {showPresetsMenu && (
        <div className="pt-3 border-t border-stone-800 space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Explore Global Soundscapes</span>
            <button
              onClick={() => setShowPresetsMenu(false)}
              className="text-stone-400 hover:text-white underline text-[11px]"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {Object.entries(SOUNDSCAPE_PRESETS_META).map(([key, meta]) => {
              const isSelected = selectedPresetKey === key;
              return (
                <button
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  className={`p-2.5 rounded-xl text-left transition flex items-center justify-between gap-2 border ${
                    isSelected
                      ? 'bg-rose-950/60 border-rose-500/80 text-white font-semibold'
                      : 'bg-stone-800/60 border-stone-700/60 text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <div className="truncate">
                    <span className="text-xs font-serif font-bold block truncate">
                      {meta.title}
                    </span>
                    <span className="text-[10px] text-stone-400 truncate block">
                      {meta.genre}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
