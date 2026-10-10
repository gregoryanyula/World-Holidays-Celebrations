import { Holiday, HolidayWeatherInfo } from '../types';

// WMO Weather interpretation codes (WW) mapping
export const getWeatherCondition = (code: number, isDay: boolean = true): { description: string; icon: string } => {
  switch (code) {
    case 0:
      return { description: isDay ? 'Sunny & Clear Skies' : 'Clear Night Skies', icon: isDay ? 'Sun' : 'Moon' };
    case 1:
      return { description: 'Mainly Clear', icon: isDay ? 'Sun' : 'Moon' };
    case 2:
      return { description: 'Partly Cloudy', icon: 'CloudSun' };
    case 3:
      return { description: 'Overcast & Cloudy', icon: 'Cloud' };
    case 45:
    case 48:
      return { description: 'Foggy & Misty', icon: 'Cloud' };
    case 51:
    case 53:
    case 55:
      return { description: 'Light Festive Drizzle', icon: 'CloudRain' };
    case 61:
    case 63:
    case 65:
      return { description: 'Rain Showers', icon: 'CloudRain' };
    case 71:
    case 73:
    case 75:
      return { description: 'Snow Flurries', icon: 'CloudSnow' };
    case 77:
      return { description: 'Snow Grains', icon: 'CloudSnow' };
    case 80:
    case 81:
    case 82:
      return { description: 'Passing Showers', icon: 'CloudRain' };
    case 85:
    case 86:
      return { description: 'Snow Showers', icon: 'CloudSnow' };
    case 95:
      return { description: 'Thunderstorm', icon: 'CloudLightning' };
    case 96:
    case 99:
      return { description: 'Severe Thunderstorm', icon: 'CloudLightning' };
    default:
      return { description: 'Mild & Fair Weather', icon: 'Sun' };
  }
};

// Calculate typical seasonal climate based on hemisphere and month
export const getSeasonalClimate = (
  latitude: number,
  month: number,
  holidayName: string,
  country: string
): { seasonName: string; typicalHigh: number; typicalLow: number; notes: string } => {
  const isNorthern = latitude >= 0;

  // Derive season
  let season = 'Spring';
  if (isNorthern) {
    if (month === 12 || month === 1 || month === 2) season = 'Winter';
    else if (month >= 3 && month <= 5) season = 'Spring';
    else if (month >= 6 && month <= 8) season = 'Summer';
    else season = 'Autumn / Fall';
  } else {
    // Southern Hemisphere inverted
    if (month === 12 || month === 1 || month === 2) season = 'Summer';
    else if (month >= 3 && month <= 5) season = 'Autumn / Fall';
    else if (month >= 6 && month <= 8) season = 'Winter';
    else season = 'Spring';
  }

  // Country specific climate calibrations
  const c = country.toLowerCase();
  let typicalHigh = 24;
  let typicalLow = 16;
  let notes = `Mild ${season.toLowerCase()} climate with pleasant festival conditions.`;

  if (c.includes('india')) {
    if (month === 10 || month === 11) {
      typicalHigh = 29; typicalLow = 16;
      notes = 'Post-monsoon dry season with crystal clear starry nights, perfect for lighting open-air diyas.';
    } else if (month >= 3 && month <= 5) {
      typicalHigh = 36; typicalLow = 24;
      notes = 'Warm, vibrant pre-monsoon sunshine with festive evening breezes.';
    }
  } else if (c.includes('mexico')) {
    if (month === 10 || month === 11) {
      typicalHigh = 23; typicalLow = 11;
      notes = 'Cool autumn highland evenings in cemeteries with dry weather honoring the departed.';
    }
  } else if (c.includes('china')) {
    if (month === 1 || month === 2) {
      typicalHigh = 3; typicalLow = -6;
      notes = 'Crisp winter frost and occasional celebratory snowfall, best enjoyed with steaming hot jiaozi dumplings.';
    } else if (month === 9 || month === 10) {
      typicalHigh = 22; typicalLow = 13;
      notes = 'Pleasant autumn breeze with high visibility for watching the luminous harvest moon.';
    }
  } else if (c.includes('saudi') || c.includes('islamic')) {
    typicalHigh = 31; typicalLow = 20;
    notes = 'Warm desert days transitioning into cool, peaceful evenings for communal midnight Eid gatherings.';
  } else if (c.includes('germany')) {
    typicalHigh = 19; typicalLow = 9;
    notes = 'Brisk Bavarian autumn air, ideal for warm pretzels and vibrant marquee festival tents.';
  } else if (c.includes('brazil')) {
    typicalHigh = 32; typicalLow = 24;
    notes = 'Tropical summer carnival warmth with sun-drenched afternoons and lively balmy nights on the Sambadrome.';
  } else if (c.includes('thailand')) {
    typicalHigh = 35; typicalLow = 26;
    notes = 'Peak tropical dry season heat, making the nationwide Songkran water splashing joyfully refreshing.';
  } else if (c.includes('ireland')) {
    typicalHigh = 11; typicalLow = 4;
    notes = 'Brisk emerald spring morning with occasional soft Irish rain showers and parade cheer.';
  } else if (c.includes('new zealand')) {
    typicalHigh = 14; typicalLow = 7;
    notes = 'Crisp mid-winter ocean atmosphere in Aotearoa with clear dawn skies for spotting the Matariki constellation.';
  } else if (c.includes('ethiopia')) {
    typicalHigh = 25; typicalLow = 10;
    notes = 'Sunny dry season in the Ethiopian highlands, ideal for ceremonial water blessings and processions.';
  } else if (c.includes('peru')) {
    typicalHigh = 20; typicalLow = 2;
    notes = 'Dry Andean winter solstice with intense highland sunshine and cold starlit nights at high altitude.';
  } else if (c.includes('sweden')) {
    typicalHigh = 22; typicalLow = 12;
    notes = 'Nearly 24 hours of golden daylight with mild Scandinavian summer breezes for outdoor maypole dancing.';
  } else if (c.includes('united states')) {
    typicalHigh = 31; typicalLow = 22;
    notes = 'Warm, sunny early summer weather across Galveston and southern states, classic for festive cookouts.';
  } else {
    if (season === 'Winter') {
      typicalHigh = 6; typicalLow = -2;
      notes = 'Winter conditions with cool breezes and cozy communal indoor or lantern festivities.';
    } else if (season === 'Summer') {
      typicalHigh = 28; typicalLow = 19;
      notes = 'Sunny and warm seasonal weather suitable for outdoor street parades and banquets.';
    } else {
      typicalHigh = 20; typicalLow = 12;
      notes = 'Moderate seasonal temperatures with pleasant weather for festival traditions.';
    }
  }

  return {
    seasonName: season,
    typicalHigh,
    typicalLow,
    notes
  };
};

// Fetch real-time weather from Open-Meteo external API
export const fetchHolidayOriginWeather = async (holiday: Holiday): Promise<HolidayWeatherInfo> => {
  const lat = holiday.latitude ?? 28.6139;
  const lon = holiday.longitude ?? 77.2090;
  const month = holiday.month || 1;

  const climate = getSeasonalClimate(lat, month, holiday.name, holiday.country);

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lon.toFixed(4)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

    // Timeout of 6 seconds to never hang UI
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Open-Meteo API returned status ${response.status}`);
    }

    const data = await response.json();
    const current = data.current || {};
    const weatherCode = current.weather_code ?? 0;
    const isDay = current.is_day === 1;
    const cond = getWeatherCondition(weatherCode, isDay);

    return {
      temperature: Math.round(current.temperature_2m ?? climate.typicalHigh),
      apparentTemperature: Math.round(current.apparent_temperature ?? current.temperature_2m ?? climate.typicalHigh),
      humidity: Math.round(current.relative_humidity_2m ?? 55),
      windSpeed: Math.round(current.wind_speed_10m ?? 12),
      precipitation: current.precipitation ?? 0,
      weatherCode,
      conditionDescription: cond.description,
      seasonName: climate.seasonName,
      seasonTypicalHigh: climate.typicalHigh,
      seasonTypicalLow: climate.typicalLow,
      eventDateConditionNotes: climate.notes,
      isDaytime: isDay,
      isOfflineEstimated: false,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err) {
    console.warn('Weather API fetch failed or offline; using regional climate estimate:', err);
    // Graceful offline fallback
    const cond = getWeatherCondition(0, true);
    return {
      temperature: climate.typicalHigh,
      apparentTemperature: climate.typicalHigh,
      humidity: 58,
      windSpeed: 10,
      precipitation: 0,
      weatherCode: 0,
      conditionDescription: cond.description,
      seasonName: climate.seasonName,
      seasonTypicalHigh: climate.typicalHigh,
      seasonTypicalLow: climate.typicalLow,
      eventDateConditionNotes: climate.notes,
      isDaytime: true,
      isOfflineEstimated: true,
      fetchedAt: 'Estimated Climate'
    };
  }
};
