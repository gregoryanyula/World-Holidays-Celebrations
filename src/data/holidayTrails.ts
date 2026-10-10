export interface HolidayTrailStop {
  id: string;
  name: string;
  holidayName: string;
  countryName: string;
  countryCode: string;
  lat: number;
  lng: number;
  date: string;
  lore: string;
  bannerUrl: string;
  traditionalBlessing: string;
}

export interface HolidayTrail {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  colorHex: number;
  colorCss: string;
  tagline: string;
  historicalOverview: string;
  stops: HolidayTrailStop[];
}

export const HOLIDAY_TRAILS_DATA: HolidayTrail[] = [
  {
    id: 'silk-road-lunar',
    title: 'The Silk Road & Lunar Celebrations Trail',
    shortTitle: 'Silk Road & Lunar Arc',
    icon: '🏮',
    colorHex: 0xf59e0b, // Amber Gold
    colorCss: 'text-amber-400 bg-amber-500/20 border-amber-500/40',
    tagline: 'Bridging Ancient Trade Corridors, Lunisolar Wisdom & Sacred Gatherings',
    historicalOverview: 'Traverse the ancient Silk Road connecting the Far East to Central and Western Asia. Discover how agricultural cycles, astronomical observations, and caravans of spices and silk unified celebrations of renewal across civilizations.',
    stops: [
      {
        id: 'stop-chunjie',
        name: 'China: Spring Festival (Chūnjié)',
        holidayName: 'Lunar New Year (Spring Festival)',
        countryName: 'China',
        countryCode: 'CN',
        lat: 35.8617,
        lng: 104.1954,
        date: '2027-02-06',
        lore: 'The origin point of the lunisolar calendar tradition. Families gather for reunion feasts (Nianyefan) and ward off the mythical winter beast Nian with scarlet banners and fireworks.',
        bannerUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Gong Xi Fa Cai! May good fortune and longevity enter every household.'
      },
      {
        id: 'stop-seollal',
        name: 'South Korea: Seollal Ancestral Renewal',
        holidayName: 'Seollal (Korean Lunar New Year)',
        countryName: 'South Korea',
        countryCode: 'KR',
        lat: 37.5665,
        lng: 126.9780,
        date: '2027-02-06',
        lore: 'Sharing deep historical ties through Confucian filial piety. Families don silk Hanbok to perform Sebae bows to elders, sharing Tteokguk rice cake soup to gain a year of virtue.',
        bannerUrl: 'https://images.unsplash.com/photo-1538669715315-155098f6bbe0?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Saehae bok mani badeuseyo! Abundant blessings in the new year.'
      },
      {
        id: 'stop-songkran',
        name: 'Thailand: Songkran Solar Transition',
        holidayName: 'Songkran (Thai New Year Water Festival)',
        countryName: 'Thailand',
        countryCode: 'TH',
        lat: 15.8700,
        lng: 100.9925,
        date: '2027-04-13',
        lore: 'Marks the astrological passage of the Sun into Aries (Mesha Sankranti). The Buddhist and Brahmin tradition of cleansing images evolved into joyously washing away past misfortunes with water.',
        bannerUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Sawatdee Pee Mai! May cleansing waters bring peace and cool vitality.'
      },
      {
        id: 'stop-diwali',
        name: 'India: Diwali Sacred Illumination',
        holidayName: 'Diwali (Deepavali)',
        countryName: 'India',
        countryCode: 'IN',
        lat: 20.5937,
        lng: 78.9629,
        date: '2026-11-08',
        lore: 'A golden nexus of the spice route. Earthen clay diyas celebrate the timeless victory of inner light over spiritual ignorance and virtue over adversity.',
        bannerUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Shubh Deepavali! May the divine lamp illuminate your spiritual path.'
      },
      {
        id: 'stop-eid',
        name: 'Saudi Arabia & Silk Terminus: Eid al-Fitr',
        holidayName: 'Eid al-Fitr (Festival of Breaking the Fast)',
        countryName: 'Saudi Arabia',
        countryCode: 'SA',
        lat: 23.8859,
        lng: 45.0792,
        date: '2027-03-10',
        lore: 'At the western maritime and caravan terminus of the Silk Road. Celebrates the completion of Ramadan with communal charity (Zakat), sweet dates, and legendary Bedouin hospitality.',
        bannerUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Eid Mubarak! Kul ‘am wa antum bi-khayr.'
      }
    ]
  },
  {
    id: 'festival-of-lights',
    title: 'Global Festival of Lights & Solstice Trail',
    shortTitle: 'Festival of Lights & Solstice',
    icon: '🕯️',
    colorHex: 0xa855f7, // Radiant Purple
    colorCss: 'text-purple-400 bg-purple-500/20 border-purple-500/40',
    tagline: 'Humanity’s Universal Quest to Kindle Light in the Darkest Hours',
    historicalOverview: 'Across differing geographies and faith traditions, human beings have gathered during seasonal darkness to illuminate candles, lanterns, and fires as beacons of resilience, hope, and community warmth.',
    stops: [
      {
        id: 'stop-diwali-lights',
        name: 'India: Diwali Festival of Lights',
        holidayName: 'Diwali (Deepavali)',
        countryName: 'India',
        countryCode: 'IN',
        lat: 20.5937,
        lng: 78.9629,
        date: '2026-11-08',
        lore: 'Earthen diyas lined upon every threshold welcome Lakshmi, goddess of spiritual wealth, while reminding devotees that a single flame can dispel boundless darkness.',
        bannerUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Tamaso mā jyotir gamaya — From darkness, lead us unto light.'
      },
      {
        id: 'stop-loy-krathong',
        name: 'Thailand: Loy Krathong River Illumination',
        holidayName: 'Loy Krathong (Floating Lantern Festival)',
        countryName: 'Thailand',
        countryCode: 'TH',
        lat: 15.8700,
        lng: 100.9925,
        date: '2026-11-24',
        lore: 'On the twelfth lunar full moon, candlelit lotus baskets glide across serene waters, mirroring the celestial release of thousands of glowing Yi Peng paper lanterns in the night sky.',
        bannerUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'May the river lights carry away sorrow and kindle renewed harmony.'
      },
      {
        id: 'stop-saint-lucia',
        name: 'Sweden: Saint Lucia’s Crown of Candles',
        holidayName: 'Saint Lucia’s Day (Luciadagen)',
        countryName: 'Sweden',
        countryCode: 'SE',
        lat: 60.1282,
        lng: 18.6435,
        date: '2026-12-13',
        lore: 'In the deep Nordic winter near the solstice, a maiden clad in white wearing an evergreen wreath of glowing lingonberry candles brings saffron buns and light to dark morning hours.',
        bannerUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Sankta Lucia, ljusklara hägring — Saint Lucia, radiant vision of light.'
      },
      {
        id: 'stop-hanukkah',
        name: 'Israel & Diaspora: Hanukkah Menorah',
        holidayName: 'Hanukkah (Festival of Lights)',
        countryName: 'Israel & Global',
        countryCode: 'IL',
        lat: 31.7683,
        lng: 35.2137,
        date: '2026-12-04',
        lore: 'Eight nights commemorating the miraculous rededication of the Second Temple in Jerusalem, where one day’s supply of sacred olive oil burned brightly for eight full days.',
        bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Chag Urim Sameach! Blessed are the lights of perseverance.'
      },
      {
        id: 'stop-winter-solstice',
        name: 'Global: Winter Solstice Rebirth',
        holidayName: 'Winter Solstice / Yule',
        countryName: 'Global',
        countryCode: 'UN',
        lat: 51.1789,
        lng: -1.8262, // Stonehenge
        date: '2026-12-21',
        lore: 'The shortest day and longest night of the astronomical solar cycle. From ancient Stonehenge alignments to modern hearth vigils, celebrating the sun’s triumphant return.',
        bannerUrl: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'May the turning of the wheel bring gentle light and rebirth.'
      }
    ]
  },
  {
    id: 'carnival-rhythm',
    title: 'The Carnival & Rhythmic Revelry Arc',
    shortTitle: 'Carnival & Revelry Arc',
    icon: '🎭',
    colorHex: 0x10b981, // Emerald Festive
    colorCss: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40',
    tagline: 'Masquerades, Street Batucada & The Cathartic Triumph of Life',
    historicalOverview: 'Follow the migration of carnival traditions from European Renaissance masquerades across the Atlantic, where African rhythms, indigenous ceremonies, and pre-Lenten feasts birthed the world’s most spectacular street arts.',
    stops: [
      {
        id: 'stop-venice-carnival',
        name: 'Italy: Carnevale di Venezia',
        holidayName: 'Venice Carnival (Carnevale di Venezia)',
        countryName: 'Italy',
        countryCode: 'IT',
        lat: 45.4408,
        lng: 12.3155,
        date: '2027-01-30',
        lore: 'The historic cradle of European masquerade. Porcelain Bauta masks leveled all social classes, allowing nobles and commoners alike to dance together under Venetian moonlit canals.',
        bannerUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Buon Carnevale! Where identity transforms into poetic masquerade.'
      },
      {
        id: 'stop-rio-carnival',
        name: 'Brazil: Carnaval do Rio de Janeiro',
        holidayName: 'Carnaval do Brasil (Rio Carnival)',
        countryName: 'Brazil',
        countryCode: 'BR',
        lat: -22.9068,
        lng: -43.1729,
        date: '2027-02-05',
        lore: 'The epicenter of global carnival. African polyrhythms and Brazilian community pride collide in the Sambadrome with thunderous surdo drums and dazzling winged costumes.',
        bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: '¡Alegria! Celebrating the unstoppable heartbeat of human freedom.'
      },
      {
        id: 'stop-mardi-gras',
        name: 'USA: New Orleans Mardi Gras',
        holidayName: 'Mardi Gras (Fat Tuesday)',
        countryName: 'United States',
        countryCode: 'US',
        lat: 29.9511,
        lng: -90.0715,
        date: '2027-02-09',
        lore: 'French, Spanish, and Black masking Indian traditions unite along St. Charles Avenue with brass jazz parades, purple-green-gold beads, and ceremonial king cakes.',
        bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Laissez les bons temps rouler! Let the good times roll!'
      },
      {
        id: 'stop-dia-muertos-carnival',
        name: 'Mexico: Día de los Muertos Festivities',
        holidayName: 'Día de los Muertos (Day of the Dead)',
        countryName: 'Mexico',
        countryCode: 'MX',
        lat: 19.4326,
        lng: -99.1332,
        date: '2026-11-01',
        lore: 'A magnificent affirmation that love and celebration transcend death. Streets bloom with Catrina costumes, joyous brass mariachi, and sugar skull masquerades.',
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: '¡Recordando con amor! Death is not the end, but a return to joy.'
      }
    ]
  },
  {
    id: 'harvest-gratitude',
    title: 'Harvest & Gratitude Heritage Trail',
    shortTitle: 'Harvest & Gratitude Continuum',
    icon: '🌾',
    colorHex: 0xf97316, // Harvest Orange
    colorCss: 'text-orange-400 bg-orange-500/20 border-orange-500/40',
    tagline: 'Ancestral Lineage, Seasonal Cycles & Communal Abundance',
    historicalOverview: 'From ancient Mesoamerican solar rituals to Pacific Maori star risings and Celtic bonfires, humanity has honored the maternal earth for sustenance, remembering ancestors who tilled the soil before us.',
    stops: [
      {
        id: 'stop-mid-autumn',
        name: 'China: Mid-Autumn Harvest Moon',
        holidayName: 'Mid-Autumn Festival (Zhongqiu)',
        countryName: 'China',
        countryCode: 'CN',
        lat: 35.8617,
        lng: 104.1954,
        date: '2027-09-15',
        lore: 'The round mooncake symbolizes familial wholeness and unity under the brightest autumn moon, giving thanks for bountiful grain and fruit harvests.',
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'May our shared joy be as luminous and complete as the full moon.'
      },
      {
        id: 'stop-matariki',
        name: 'New Zealand: Matariki Māori Harvest & New Year',
        holidayName: 'Matariki (Māori New Year)',
        countryName: 'New Zealand',
        countryCode: 'NZ',
        lat: -40.9006,
        lng: 174.8860,
        date: '2027-06-25',
        lore: 'Rising of the Pleiades star cluster signals the end of harvest and the preservation of crops for winter, celebrated with communal earth-oven Hāngī feasts.',
        bannerUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Mānawatia a Matariki! Honoring the past, celebrating the present.'
      },
      {
        id: 'stop-samhain-harvest',
        name: 'Ireland: Samhain Ancient Harvest End',
        holidayName: 'Samhain (Celtic Harvest End)',
        countryName: 'Ireland',
        countryCode: 'IE',
        lat: 53.1424,
        lng: -7.6921,
        date: '2026-10-31',
        lore: 'The ancient Gaelic milestone when herds were brought down from summer pastures and the final autumn crops gathered before the quiet chill of winter set in.',
        bannerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'Oíche Shamhna Shona! Warm hearths and safe winter shelter.'
      },
      {
        id: 'stop-thanksgiving',
        name: 'USA: Thanksgiving Harvest Gathering',
        holidayName: 'Thanksgiving Day',
        countryName: 'United States',
        countryCode: 'US',
        lat: 37.0902,
        lng: -95.7129,
        date: '2026-11-26',
        lore: 'Families journey from across the nation to share autumn roast pumpkin, cranberries, and turkey while voicing gratitude for family, friendship, and health.',
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        traditionalBlessing: 'A joyful Thanksgiving blessed with warmth, peace, and abundance.'
      }
    ]
  }
];
