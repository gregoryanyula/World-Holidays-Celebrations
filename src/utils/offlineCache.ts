import { Holiday, Recipe } from '../types';

const STORAGE_KEYS = {
  HOLIDAYS_CACHE: 'worldfest_offline_holidays_v2',
  RECIPES_CACHE: 'worldfest_offline_recipes_v2',
  LAST_CACHED_AT: 'worldfest_offline_cached_at'
};

/**
 * Pre-cache all essential holiday encyclopedias and curated recipes to localStorage
 */
export function cacheEssentialData(holidays: Holiday[], recipes: Recipe[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.HOLIDAYS_CACHE, JSON.stringify(holidays));
    localStorage.setItem(STORAGE_KEYS.RECIPES_CACHE, JSON.stringify(recipes));
    localStorage.setItem(STORAGE_KEYS.LAST_CACHED_AT, new Date().toISOString());
  } catch (e) {
    console.warn('Offline storage limit or quota warning:', e);
  }
}

/**
 * Retrieve cached holidays if offline
 */
export function getCachedHolidays(): Holiday[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HOLIDAYS_CACHE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Retrieve cached recipes if offline
 */
export function getCachedRecipes(): Recipe[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECIPES_CACHE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
