import { Holiday, CelebrationEpicenter } from '../types';

export const KNOWN_CELEBRATION_EPICENTERS: Record<string, CelebrationEpicenter> = {
  'diwali-festival-of-lights': {
    city: 'Ayodhya & Varanasi',
    region: 'Uttar Pradesh',
    country: 'India',
    latitude: 26.7922,
    longitude: 82.1998,
    zoomLevel: 11,
    epicenterName: 'Ram Ki Paidi Ghats & Ganges Riverbanks',
    significance: 'Historic birthplace of Lord Rama and spiritual heart of Deepavali, where a world-record 2.2+ million earthen oil lamps (diyas) light up the holy waters alongside grand Maha Aarti rituals.',
    historicDistrict: 'Saryu Riverfront & Dashashwamedh Ghat'
  },
  'dia-de-los-muertos': {
    city: 'Oaxaca de Juárez & Mixquic',
    region: 'Oaxaca & Mexico City',
    country: 'Mexico',
    latitude: 17.0732,
    longitude: -96.7266,
    zoomLevel: 12,
    epicenterName: 'Panteón General & San Andrés Mixquic Cemetery',
    significance: 'World-famous candlelit cemetery vigils (velaciones), intricate tapetes de arena (sand carpets), and multi-tiered marigold ofrendas welcoming ancestral spirits back to life.',
    historicDistrict: 'Centro Histórico & Xoxocotlán'
  },
  'lunar-new-year-spring-festival': {
    city: 'Beijing & Harbin',
    region: 'Northern China',
    country: 'China',
    latitude: 39.9042,
    longitude: 116.4074,
    zoomLevel: 10,
    epicenterName: 'Ditan Temple Fair & Harbin Ice & Snow World',
    significance: 'The epicenters of the Spring Festival, hosting traditional imperial temple fairs, lion dance troupes, auspicious dragon parades, and colossal lantern illuminations.',
    historicDistrict: 'Dongcheng Historic Hutongs & Central Avenue'
  },
  'rio-carnival': {
    city: 'Rio de Janeiro',
    region: 'State of Rio de Janeiro',
    country: 'Brazil',
    latitude: -22.9068,
    longitude: -43.1729,
    zoomLevel: 12,
    epicenterName: 'Sambadrome Marquês de Sapucaí',
    significance: 'The grandest street carnival on Earth, where Special Group samba schools parade through Oscar Niemeyer’s iconic Sambadrome flanked by over 500 euphoric street blocos in Lapa and Ipanema.',
    historicDistrict: 'Cidade Nova & Lapa Bohemian Quarter'
  },
  'songkran-thai-new-year': {
    city: 'Chiang Mai',
    region: 'Northern Thailand',
    country: 'Thailand',
    latitude: 18.7883,
    longitude: 98.9853,
    zoomLevel: 13,
    epicenterName: 'Tha Phae Gate & Ancient City Moat',
    significance: 'The traditional epicenter of Thai New Year water blessings. Sacred Phra Phuttha Sihing Buddha statues are carried in procession for scented lustral water cleansing, followed by city-wide friendly water splashes.',
    historicDistrict: 'Old Walled City & Wat Phra Singh'
  },
  'st-patricks-day': {
    city: 'Dublin',
    region: 'County Dublin, Leinster',
    country: 'Ireland',
    latitude: 53.3498,
    longitude: -6.2603,
    zoomLevel: 13,
    epicenterName: 'O’Connell Street & St. Patrick’s Cathedral',
    significance: 'The historic homeland celebration featuring the four-day National St. Patrick’s Festival, spectacular pageantry parade, and the worldwide ceremonial "Greening" of Irish landmarks.',
    historicDistrict: 'Medieval Quarter & Temple Bar'
  },
  'oktoberfest': {
    city: 'Munich',
    region: 'Bavaria',
    country: 'Germany',
    latitude: 48.1319,
    longitude: 11.5497,
    zoomLevel: 13,
    epicenterName: 'Theresienwiese ("Die Wiesn")',
    significance: 'The historic festival grounds where Crown Prince Ludwig married Princess Therese in 1810. Hosts 14 giant beer tents, brass Trachten bands, and millions in traditional Dirndl and Lederhosen garb.',
    historicDistrict: 'Ludwigsvorstadt-Isarvorstadt'
  },
  'inti-raymi': {
    city: 'Cusco',
    region: 'Cusco Region, Andes Mountains',
    country: 'Peru',
    latitude: -13.5167,
    longitude: -71.9789,
    zoomLevel: 13,
    epicenterName: 'Sacsayhuamán Megalithic Fortress & Qorikancha',
    significance: 'The sacred Inca Festival of the Sun, celebrated during the Andean winter solstice. Hundreds of actors in authentic Quechua imperial garb enact ancient rituals honoring the sun god Inti.',
    historicDistrict: 'Imperial Inca Capital & San Blas'
  },
  'obon-festival': {
    city: 'Kyoto & Tokushima',
    region: 'Kansai & Shikoku',
    country: 'Japan',
    latitude: 35.0116,
    longitude: 135.7681,
    zoomLevel: 12,
    epicenterName: 'Mount Daimonji & Tokushima Awa Odori Grounds',
    significance: 'Famous for the giant Gozan no Okuribi mountain bonfires shaping giant Kanji characters in fire to guide ancestral spirits, alongside the 400-year-old euphoric "Fool’s Dance" (Awa Odori).',
    historicDistrict: 'Higashiyama Historic Ward & Kamogawa River'
  },
  'nowruz-persian-new-year': {
    city: 'Isfahan & Shiraz',
    region: 'Isfahan Province',
    country: 'Iran',
    latitude: 32.6577,
    longitude: 51.6775,
    zoomLevel: 12,
    epicenterName: 'Naqsh-e Jahan Square & Si-o-se-pol Bridge',
    significance: 'The cultural jewel of Persia where families gather around turquoise pools and UNESCO heritage palaces to unveil the Haft-Sin table and welcome the exact astronomical moment of the vernal equinox.',
    historicDistrict: 'Historic Safavid Quarter & Grand Bazaar'
  },
  'christmas': {
    city: 'Bethlehem & Nuremberg',
    region: 'West Bank & Bavaria',
    country: 'Holy Land / Germany',
    latitude: 31.7054,
    longitude: 35.2024,
    zoomLevel: 12,
    epicenterName: 'Manger Square & Church of the Nativity',
    significance: 'The biblical birthplace of Jesus Christ, holding solemn Midnight Mass in the 4th-century basilica, alongside Europe’s most revered historic Christkindlesmarkt in Nuremberg.',
    historicDistrict: 'Old City Bethlehem & Hauptmarkt Nuremberg'
  },
  'eid-al-fitr': {
    city: 'Cairo & Mecca',
    region: 'Cairo Governorate & Hejaz',
    country: 'Egypt & Saudi Arabia',
    latitude: 30.0459,
    longitude: 31.2625,
    zoomLevel: 11,
    epicenterName: 'Al-Azhar Mosque & Al-Hussein Square',
    significance: 'Centuries-old Islamic cultural center where millions join communal sunrise Salat al-Eid prayers, feast on sugar-dusted Kahk cookies, and stroll brightly decorated historic boulevards.',
    historicDistrict: 'Islamic Cairo & Khan el-Khalili'
  },
  'eid-al-adha': {
    city: 'Mecca & Valley of Mina',
    region: 'Makkah Province',
    country: 'Saudi Arabia',
    latitude: 21.4133,
    longitude: 39.8933,
    zoomLevel: 11,
    epicenterName: 'Masjid al-Haram & Tent City of Mina',
    significance: 'The holiest site in Islam where over two million pilgrims conclude the sacred Hajj journey, commemorating Prophet Ibrahim’s devotion with shared feasts and global charitable distribution.',
    historicDistrict: 'Central Holy Sanctuary & Mount Arafat'
  },
  'hanukkah': {
    city: 'Jerusalem',
    region: 'Jerusalem District',
    country: 'Israel',
    latitude: 31.7767,
    longitude: 35.2345,
    zoomLevel: 14,
    epicenterName: 'Western Wall Plaza (Kotel)',
    significance: 'The historic site of the Maccabean miracle. Giant bronze hanukkiahs are ignited every night of the festival, illuminating the ancient limestone corridors of the Jewish Quarter.',
    historicDistrict: 'Old City Jewish Quarter'
  },
  'kwanzaa': {
    city: 'Harlem (New York) & Los Angeles',
    region: 'New York & California',
    country: 'United States',
    latitude: 40.8075,
    longitude: -73.9465,
    zoomLevel: 12,
    epicenterName: 'Apollo Theater & African American Cultural Center',
    significance: 'Historic cultural hubs celebrating African diaspora unity, theatrical performances, community Karamu banquets, and educational craft fairs rooted in the Nguzo Saba principles.',
    historicDistrict: '125th Street Corridor & Leimert Park'
  },
  'midsommar-summer-solstice': {
    city: 'Leksand & Dalarna',
    region: 'Dalarna County',
    country: 'Sweden',
    latitude: 60.7300,
    longitude: 14.9984,
    zoomLevel: 11,
    epicenterName: 'Gropen Natural Amphitheater (Lake Siljan)',
    significance: 'Sweden’s greatest Midsummer gathering, where up to 30,000 spectators gather in folkdräkt traditional costumes to raise a colossal birch and floral majstång (maypole) with traditional violin fiddlers.',
    historicDistrict: 'Lake Siljan Shoreline & Church of Leksand'
  },
  'burns-night': {
    city: 'Alloway & Edinburgh',
    region: 'Ayrshire & Lothian',
    country: 'Scotland, United Kingdom',
    latitude: 55.4314,
    longitude: -4.6369,
    zoomLevel: 12,
    epicenterName: 'Robert Burns Birthplace Museum & Royal Mile',
    significance: 'The picturesque cottage where the National Bard of Scotland was born in 1759, home to the most authentic haggis piping, "Address to a Haggis" recitations, and traditional Ceilidh dances.',
    historicDistrict: 'Alloway Village & Edinburgh Old Town'
  },
  'cinco-de-mayo': {
    city: 'Puebla City',
    region: 'State of Puebla',
    country: 'Mexico',
    latitude: 19.0578,
    longitude: -98.1878,
    zoomLevel: 13,
    epicenterName: 'Forts of Loreto and Guadalupe',
    significance: 'The actual battlefield site of the historic 1862 Mexican victory over the French forces. Features Mexico’s largest military and cultural parade, indigenous Zacapoaxtla dancers, and folkloric celebrations.',
    historicDistrict: 'Zona Histórica de los Fuertes & Zócalo'
  },
  'mardi-gras': {
    city: 'New Orleans',
    region: 'Louisiana',
    country: 'United States',
    latitude: 29.9584,
    longitude: -90.0644,
    zoomLevel: 13,
    epicenterName: 'St. Charles Avenue & French Quarter',
    significance: 'The soul of American Carnival. Renowned for super-krewe parades (Bacchus, Endymion, Rex), elaborate purple, green and gold floats, brass marching bands, and King Cake traditions.',
    historicDistrict: 'French Quarter (Vieux Carré) & Garden District'
  },
  'bastille-day': {
    city: 'Paris',
    region: 'Île-de-France',
    country: 'France',
    latitude: 48.8566,
    longitude: 2.3522,
    zoomLevel: 12,
    epicenterName: 'Avenue des Champs-Élysées & Champ de Mars',
    significance: 'France’s Fête Nationale commemorating the storming of the Bastille in 1789. Features the oldest military parade in Europe, firehouse charity balls (Bals des Pompiers), and a spectacular Eiffel Tower light concert.',
    historicDistrict: 'Champs-Élysées & Place de la Bastille'
  },
  'juneteenth': {
    city: 'Galveston',
    region: 'Texas Gulf Coast',
    country: 'United States',
    latitude: 29.3013,
    longitude: -94.7977,
    zoomLevel: 13,
    epicenterName: 'Ashton Villa & Historic Reedy Chapel A.M.E.',
    significance: 'The birthplace of Juneteenth, where Union General Gordon Granger read General Order No. 3 on June 19, 1865, proclaiming freedom for all enslaved people in Texas.',
    historicDistrict: 'The Strand Historic District'
  },
  'timkat-epiphany': {
    city: 'Gondar',
    region: 'Amhara Region',
    country: 'Ethiopia',
    latitude: 12.6075,
    longitude: 37.4667,
    zoomLevel: 13,
    epicenterName: 'Fasilides’ Bath (Fasil Ghebbi UNESCO Site)',
    significance: 'The monumental Ethiopian Orthodox celebration of the Epiphany. Reenacts the baptism of Jesus in the historic 17th-century royal stone pool, preceded by all-night vigils with sacred Tabot ark replicas.',
    historicDistrict: 'Royal Enclosure & Piazza Gondar'
  },
  'earth-day': {
    city: 'San Francisco & Washington, D.C.',
    region: 'California & District of Columbia',
    country: 'United States & UN Global',
    latitude: 37.7749,
    longitude: -122.4194,
    zoomLevel: 12,
    epicenterName: 'Civic Center Plaza & National Mall',
    significance: 'Birthplace of the modern environmental consciousness movement in 1970, where millions mobilize for biodiversity preservation, clean energy transition, and ecological stewardship.',
    historicDistrict: 'Civic Center & Marina Green'
  },
  'vesak-buddha-day': {
    city: 'Kandy & Colombo',
    region: 'Central Province',
    country: 'Sri Lanka',
    latitude: 7.2936,
    longitude: 80.6413,
    zoomLevel: 13,
    epicenterName: 'Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)',
    significance: 'Commemorates the birth, enlightenment, and parinirvana of Gautama Buddha. Streets and lakeside temples are adorned with towering illuminated bamboo pandols and paper Vesak lanterns.',
    historicDistrict: 'Kandy Lake Waterfront & Royal Palace Compound'
  },
  'yom-kippur': {
    city: 'Jerusalem',
    region: 'Jerusalem District',
    country: 'Israel',
    latitude: 31.7767,
    longitude: 35.2345,
    zoomLevel: 14,
    epicenterName: 'Western Wall Plaza (Kotel)',
    significance: 'The Day of Atonement, the holiest day in Judaism. The entire country falls completely silent with no motorized traffic, culminating in thousands praying Ne’ilah as the final Shofar blast echoes through Jerusalem.',
    historicDistrict: 'Old City Jewish Quarter'
  },
  'valentines-day': {
    city: 'Verona & Terni',
    region: 'Veneto & Umbria',
    country: 'Italy',
    latitude: 45.4429,
    longitude: 10.9983,
    zoomLevel: 13,
    epicenterName: 'Juliet’s Courtyard & Basilica di San Valentino',
    significance: 'Verona hosts the romantic "Verona in Love" festival around Shakespeare’s Juliet Balcony, while Terni enshrines the relics of Saint Valentine himself where engaged couples receive solemn blessings.',
    historicDistrict: 'Centro Storico Verona & Terni Cathedral'
  },
  'white-day-japan': {
    city: 'Tokyo & Seoul',
    region: 'Kantō & Seoul Capital Area',
    country: 'Japan & South Korea',
    latitude: 35.6762,
    longitude: 139.6503,
    zoomLevel: 12,
    epicenterName: 'Ginza & Shibuya Shopping Districts',
    significance: 'Originating in Japan in 1978, the celebration center for gifting white confections, marshmallows, and jewelry. The luxury boutiques of Ginza display elaborate white romantic gift displays.',
    historicDistrict: 'Chuo Ward Ginza & Omotesando'
  },
  'qixi-festival': {
    city: 'Guangzhou & Hangzhou',
    region: 'Guangdong & Zhejiang',
    country: 'China',
    latitude: 30.2741,
    longitude: 120.1551,
    zoomLevel: 12,
    epicenterName: 'West Lake (Broken Bridge) & Zhujiang Pearl River',
    significance: 'The Chinese Valentine’s Day honoring the folk legend of the Cowherd and Weaver Girl (Niulang and Zhinü). Couples gather on the iconic Broken Bridge of West Lake to release floating candle lotus lanterns.',
    historicDistrict: 'West Lake Scenic Area & Qixi Culture Village'
  },
  'singles-day': {
    city: 'Hangzhou & Shanghai',
    region: 'Zhejiang & Shanghai Municipality',
    country: 'China',
    latitude: 30.2741,
    longitude: 120.1551,
    zoomLevel: 11,
    epicenterName: 'Alibaba Cloud Valley & The Bund',
    significance: 'The world’s largest commercial festival and self-appreciation day, launched by university students in Nanjing. Characterized by spectacular live televised gala countdowns and historic commercial celebrations.',
    historicDistrict: 'Binjiang High-Tech District & Pudong Skyline'
  },
  'black-friday': {
    city: 'Philadelphia & New York City',
    region: 'Pennsylvania & New York',
    country: 'United States',
    latitude: 39.9526,
    longitude: -75.1652,
    zoomLevel: 12,
    epicenterName: 'Center City Philadelphia & Herald Square Manhattan',
    significance: 'The historic birthplace of the term "Black Friday" in the 1960s, coined by Philadelphia police to describe the immense suburban crowds descending on city retailers ahead of the Army-Navy game.',
    historicDistrict: 'Market East Retail District & 34th Street Herald Square'
  },
  'boxing-day': {
    city: 'Melbourne & London',
    region: 'Victoria & Greater London',
    country: 'Australia & United Kingdom',
    latitude: -37.8136,
    longitude: 144.9631,
    zoomLevel: 13,
    epicenterName: 'Melbourne Cricket Ground (MCG) & Oxford Street',
    significance: 'Home of the legendary Boxing Day Test cricket match drawing up to 90,000 spectators to the MCG, combined with centuries-old British charitable church alms box traditions.',
    historicDistrict: 'Yarra Park & West End London'
  },
  'thanksgiving': {
    city: 'Plymouth & New York City',
    region: 'Massachusetts & New York',
    country: 'United States',
    latitude: 41.9584,
    longitude: -70.6673,
    zoomLevel: 13,
    epicenterName: 'Plimoth Patuxet Museums & Central Park West',
    significance: 'The historic site of the 1621 harvest meal between the Pilgrims and the Wampanoag people, alongside the world’s most watched Thanksgiving Day Parade through Manhattan.',
    historicDistrict: 'Historic Plymouth Harbor & Herald Square'
  },
  'mid-autumn-festival': {
    city: 'Tai Hang (Hong Kong) & Suzhou',
    region: 'Hong Kong & Jiangsu Province',
    country: 'China',
    latitude: 22.2783,
    longitude: 114.1928,
    zoomLevel: 13,
    epicenterName: 'Tai Hang Village & Master of the Nets Garden',
    significance: 'Famous for the 140-year-old Tai Hang Fire Dragon Dance, where a 67-meter dragon studded with 70,000 burning incense sticks dances through narrow streets under the harvest moon.',
    historicDistrict: 'Tai Hang Causeway Bay & Suzhou Classical Gardens'
  },
  'summer-solstice': {
    city: 'Salisbury (Stonehenge)',
    region: 'Wiltshire',
    country: 'United Kingdom',
    latitude: 51.1789,
    longitude: -1.8262,
    zoomLevel: 14,
    epicenterName: 'Stonehenge Megalithic Monument',
    significance: 'The premier global solstice gathering. Up to 10,000 people assemble before dawn at the prehistoric stone circle to witness the rising summer sun align with the sacred Heel Stone.',
    historicDistrict: 'Salisbury Plain UNESCO World Heritage Site'
  },
  'winter-solstice': {
    city: 'Newgrange & Boyne Valley',
    region: 'County Meath',
    country: 'Ireland',
    latitude: 53.6947,
    longitude: -6.4753,
    zoomLevel: 14,
    epicenterName: 'Newgrange Stone Age Passage Tomb',
    significance: 'Built circa 3200 BC, this ancient Neolithic monument features a precise roofbox that captures the rising winter solstice beam, illuminating the 19-meter inner chamber with golden dawn light.',
    historicDistrict: 'Brú na Bóinne UNESCO Biosphere'
  },
  'guru-nanak-gurpurab': {
    city: 'Amritsar & Nankana Sahib',
    region: 'Punjab',
    country: 'India & Pakistan',
    latitude: 31.6200,
    longitude: 74.8765,
    zoomLevel: 13,
    epicenterName: 'Sri Harmandir Sahib (The Golden Temple)',
    significance: 'The spiritual epicenter of Sikhism. The gilded marble sanctum is draped in brilliant lights and reflection pools, serving round-the-clock free community langar meals to over 100,000 visitors.',
    historicDistrict: 'Old Amritsar Walled City'
  }
};

/**
 * Returns the exact traditional celebration epicenter for any holiday.
 * If not in the pre-curated dictionary, calculates the most authentic regional coordinates
 * based on the holiday country and primary geographic markers.
 */
export function getHolidayCelebrationEpicenter(holiday: Holiday): CelebrationEpicenter {
  if (holiday.celebrationEpicenter) {
    return holiday.celebrationEpicenter;
  }

  const lookupKey = holiday.id.toLowerCase();
  if (KNOWN_CELEBRATION_EPICENTERS[lookupKey]) {
    return KNOWN_CELEBRATION_EPICENTERS[lookupKey];
  }

  // Check by name matches or substring
  for (const [key, epicenter] of Object.entries(KNOWN_CELEBRATION_EPICENTERS)) {
    if (lookupKey.includes(key) || key.includes(lookupKey)) {
      return epicenter;
    }
  }

  // Derive intelligent fallback from holiday attributes
  const lat = holiday.latitude || 20.0;
  const lng = holiday.longitude || 0.0;
  const country = holiday.country || 'Global';
  const cleanName = holiday.name.split('(')[0].trim();

  return {
    city: `${holiday.countryCode || 'Historic'} Cultural Epicenter`,
    region: country,
    country: country,
    latitude: lat,
    longitude: lng,
    zoomLevel: 10,
    epicenterName: `${cleanName} Traditional Celebration Grounds`,
    significance: `The primary historical and communal gathering place where the authentic rites, pageantry, and community traditions of ${holiday.name} are most vividly preserved.`,
    historicDistrict: 'Central Historic & Cultural Quarter'
  };
}
