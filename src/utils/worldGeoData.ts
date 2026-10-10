// Embedded simplified GeoJSON coordinates for world continents & major celebration regions
// Ensures D3.js can render world map boundaries instantly offline and online

export interface GeoFeature {
  type: string;
  properties: {
    name: string;
    continent: string;
    code: string;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

export interface WorldGeoData {
  type: string;
  features: GeoFeature[];
}

// Simplified coastlines and continent polygons for instant zero-latency rendering
export const FALLBACK_WORLD_GEOJSON: any = {
  type: "FeatureCollection",
  features: [
    // North America
    {
      type: "Feature",
      properties: { name: "North America", continent: "North America", code: "NA" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-168, 71], [-160, 68], [-140, 70], [-125, 68], [-105, 74], [-80, 75], [-60, 65],
          [-55, 50], [-65, 43], [-75, 35], [-80, 25], [-97, 26], [-97, 20], [-87, 13],
          [-77, 8], [-83, 10], [-92, 16], [-105, 20], [-115, 30], [-124, 38], [-125, 48],
          [-132, 54], [-140, 59], [-152, 58], [-165, 60], [-168, 71]
        ]]
      }
    },
    // South America
    {
      type: "Feature",
      properties: { name: "South America", continent: "South America", code: "SA" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-77, 8], [-72, 12], [-60, 10], [-50, 4], [-35, -5], [-35, -12], [-38, -18],
          [-45, -24], [-50, -30], [-58, -38], [-65, -45], [-68, -55], [-75, -50],
          [-73, -40], [-72, -30], [-70, -18], [-77, -8], [-80, 0], [-77, 8]
        ]]
      }
    },
    // Europe
    {
      type: "Feature",
      properties: { name: "Europe", continent: "Europe", code: "EU" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-10, 36], [0, 38], [15, 38], [25, 36], [28, 41], [30, 46], [40, 50],
          [55, 55], [60, 65], [40, 68], [25, 71], [15, 65], [5, 60], [8, 55],
          [2, 51], [-5, 48], [-9, 43], [-10, 36]
        ]]
      }
    },
    // Africa
    {
      type: "Feature",
      properties: { name: "Africa", continent: "Africa", code: "AF" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-17, 15], [-12, 28], [-5, 36], [10, 37], [25, 32], [33, 30], [35, 20],
          [43, 12], [51, 10], [42, -5], [35, -20], [32, -28], [28, -33], [18, -35],
          [12, -20], [8, 4], [2, 6], [-5, 5], [-15, 10], [-17, 15]
        ]]
      }
    },
    // Asia & Middle East
    {
      type: "Feature",
      properties: { name: "Asia", continent: "Asia", code: "AS" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [35, 32], [42, 40], [50, 40], [60, 45], [70, 55], [90, 65], [115, 70],
          [140, 72], [170, 65], [140, 50], [130, 40], [122, 30], [118, 22], [105, 10],
          [100, 2], [95, 15], [80, 10], [75, 20], [68, 24], [55, 25], [45, 15],
          [35, 25], [35, 32]
        ]]
      }
    },
    // Australia & Oceania
    {
      type: "Feature",
      properties: { name: "Oceania", continent: "Oceania", code: "OC" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [114, -22], [125, -15], [135, -12], [145, -15], [152, -25], [150, -35],
          [140, -38], [130, -32], [116, -34], [114, -22]
        ]]
      }
    },
    // Japan
    {
      type: "Feature",
      properties: { name: "Japan", continent: "Asia", code: "JP" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [130, 32], [135, 35], [142, 43], [140, 36], [132, 33], [130, 32]
        ]]
      }
    },
    // British Isles
    {
      type: "Feature",
      properties: { name: "British Isles", continent: "Europe", code: "UK" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-6, 50], [-1, 51], [1, 53], [-2, 58], [-5, 58], [-5, 54], [-6, 50]
        ]]
      }
    },
    // India subcontinent subpolygon for rich definition
    {
      type: "Feature",
      properties: { name: "India Subcontinent", continent: "Asia", code: "IN" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [68, 24], [75, 30], [80, 30], [88, 24], [85, 20], [80, 12], [77, 8],
          [75, 12], [72, 18], [68, 24]
        ]]
      }
    }
  ]
};

// Asynchronous fetch with fallback for full detailed TopoJSON if network allows
export async function fetchWorldTopoJson(): Promise<any> {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    if (!res.ok) throw new Error('Network error');
    return await res.json();
  } catch {
    return null;
  }
}
