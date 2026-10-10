import { Holiday } from '../types';

export const EXPANDED_GLOBAL_HOLIDAYS: Holiday[] = [
  // ==========================================
  // ASIA & PACIFIC
  // ==========================================
  {
    id: 'songkran-water-festival',
    name: 'Songkran (Thai New Year Water Festival)',
    localName: 'เทศกาลสงกรานต์',
    date: '2026-04-13',
    month: 4,
    day: 13,
    country: 'Thailand & Southeast Asia',
    countryCode: 'TH',
    category: 'cultural',
    description: 'The traditional Thai New Year celebration renowned for joyful nationwide water cleansing rituals, symbolizing the washing away of misfortune and welcoming renewal, blessings, and prosperity.',
    traditions: [
      'Pouring fragrant water gently over sacred Buddha statues (Song Nam Phra)',
      'Washing the hands and feet of elders to seek forgiveness and merit (Rot Nam Dam Hua)',
      'Nationwide cheerful street water fights with water guns and silver bowls',
      'Visiting local Buddhist wats to make merit and build sand stupas (chedis)'
    ],
    greeting: 'Suksan Wan Songkran! (สุขสันต์วันสงกรานต์)',
    foodDelicacies: ['Khao Chae (Chilled Jasmine Water Rice)', 'Pad Thai', 'Mango Sticky Rice', 'Massaman Curry'],
    bannerUrl: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=1200&q=80',
    tags: ['Water Festival', 'New Year', 'Thailand', 'Buddhist', 'Renewal', 'UNESCO'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2023.',
      'The word Songkran originates from the ancient Sanskrit term "sankranti", signifying astrological transition into Aries.'
    ],
    popularityScore: 97,
    latitude: 13.7563,
    longitude: 100.5018,
    originHistory: 'Ancient Buddhist-Brahmanical astrological calendar marking the sun entering the first zodiac sign.',
    weatherProfile: {
      tempCelsius: '29°C - 37°C',
      tempFahrenheit: '84°F - 98°F',
      climate: 'Peak Tropical Summer - Hot & Vibrant',
      rainRisk: 'Low',
      bestTravelWindow: 'Arrive in Bangkok or Chiang Mai on April 12 before major road closures begin.',
      recommendedPacking: ['Waterproof phone case', 'Quick-dry UV clothing', 'Water goggles', 'Non-slip sandals']
    },
    festivePeak: {
      peakDays: 'April 13 - 15',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Silom Road in Bangkok or the ancient Moat in Chiang Mai',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'songkran-water-bowl',
      name: 'Silver Jasmine Water Bowl',
      modelType: 'golden_lotus',
      festiveAuraColor: '#06b6d4',
      scaleDefault: 1.0,
      description: 'Traditional carved Thai silver water vessel with floating white jasmine petals and sacred scented water.'
    }
  },
  {
    id: 'loy-krathong-yi-peng',
    name: 'Loy Krathong & Yi Peng (Lantern Festivals)',
    localName: 'ลอยกระทง และ ประเพณียี่เป็ง',
    date: '2026-11-24',
    month: 11,
    day: 24,
    country: 'Thailand',
    countryCode: 'TH',
    category: 'cultural',
    description: 'An ethereal festival honoring the Goddess of Water (Phra Mae Khongkha) by floating candlelit banana-leaf baskets (krathongs) down rivers and releasing thousands of glowing sky lanterns (khom loi) into the twilight sky.',
    traditions: [
      'Handcrafting krathongs from banana trunk discs, folded pandan leaves, orchids, and incense',
      'Synchronized mass sky lantern releases illuminating the night in Chiang Mai',
      'Making silent wishes for spiritual forgiveness, harmony, and gratitude',
      'Candlelit temple illumination and traditional Lanna folk dance performances'
    ],
    greeting: 'Suksan Wan Loy Krathong! (สุขสันต์วันลอยกระทง)',
    foodDelicacies: ['Sai Oua (Northern Thai Herb Sausage)', 'Khao Soi Coconut Curry Noodles', 'Kanom Krok'],
    bannerUrl: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Lantern Festival', 'Thailand', 'Rivers', 'Spiritual', 'Night Festival'],
    facts: [
      'Krathongs are crafted from 100% biodegradable materials like banana stalks and bread to nourish river aquatic life.',
      'The twin celebration in Chiang Mai (Yi Peng) dates back over 700 years to the ancient Lanna Kingdom.'
    ],
    popularityScore: 98,
    latitude: 18.7883,
    longitude: 98.9853,
    weatherProfile: {
      tempCelsius: '19°C - 29°C',
      tempFahrenheit: '66°F - 84°F',
      climate: 'Cool Dry Season - Clear Starry Skies',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-November for prime cool weather and crisp night viewing in Northern Thailand.',
      recommendedPacking: ['Light evening jacket', 'Camera with low-light tripod', 'Slip-on shoes for temple visits']
    },
    festivePeak: {
      peakDays: 'November 24 (Full Moon Night)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Ping River bridges and Mae Jo grounds in Chiang Mai',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'lotus-krathong',
      name: 'Glowing Lotus River Krathong',
      modelType: 'lantern',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.1,
      description: 'Intricately folded banana-leaf lotus basket illuminated with beeswax candles and aromatic incense sticks.'
    }
  },
  {
    id: 'chuseok-korean-thanksgiving',
    name: 'Chuseok (Korean Autumn Harvest Moon)',
    localName: '추석 (한가위)',
    date: '2026-09-25',
    month: 9,
    day: 25,
    country: 'South Korea',
    countryCode: 'KR',
    category: 'cultural',
    description: 'Korea\'s three-day autumn harvest moon festival where families gather in their ancestral hometowns to honor forebears, share fresh harvests, and give thanks for abundance.',
    traditions: [
      'Charye: Elaborate morning ancestral memorial table arrangements',
      'Seongmyo: Visiting ancestral burial mounds to clean and trim grass (Beolcho)',
      'Steaming colorful half-moon shaped songpyeon rice cakes over aromatic pine needles',
      'Ganggangsullae: Traditional women\'s circle dance under the full harvest moon'
    ],
    greeting: 'Pungseonghan Hangawi bonaeseyo! (풍성한 한가위 보내세요!)',
    foodDelicacies: ['Songpyeon (Rice Cakes with Sesame & Honey)', 'Jeon (Savory Pancakes)', 'Japchae', 'Galbi Jjim'],
    bannerUrl: 'https://images.unsplash.com/photo-1538669715315-155098f6bbe3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Korea', 'Harvest Moon', 'Family', 'Tradition', 'Songpyeon'],
    facts: [
      'The half-moon shape of Songpyeon symbolizes growth, prosperity, and continuous fulfillment.',
      'One of the largest mass migrations in Asia as millions travel across Korea to hometowns (Gwiseong).'
    ],
    popularityScore: 94,
    latitude: 37.5665,
    longitude: 126.9780,
    weatherProfile: {
      tempCelsius: '16°C - 24°C',
      tempFahrenheit: '61°F - 75°F',
      climate: 'Crisp Early Autumn - Brilliant Sunshine',
      rainRisk: 'Low',
      bestTravelWindow: 'Late September during the beginning of Korea\'s vibrant autumn foliage season.',
      recommendedPacking: ['Layered autumn clothing', 'Comfortable walking shoes', 'Modest attire for heritage palaces']
    },
    festivePeak: {
      peakDays: 'September 24 - 26',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Namsan Seoul Tower or Gyeongbokgung Palace',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'korean-songpyeon-basket',
      name: 'Harvest Songpyeon Platter',
      modelType: 'golden_lotus',
      festiveAuraColor: '#ec4899',
      scaleDefault: 0.9,
      description: 'Handcrafted ceramic dish with pastel-hued songpyeon rice cakes scented with fresh pine needles.'
    }
  },
  {
    id: 'tet-nguyen-dan-vietnam',
    name: 'Tết Nguyên Đán (Vietnamese Lunar New Year)',
    localName: 'Tết Nguyên Đán',
    date: '2027-02-06',
    month: 2,
    day: 6,
    country: 'Vietnam',
    countryCode: 'VN',
    category: 'cultural',
    description: 'The most sacred and significant Vietnamese celebration, marking the arrival of spring based on the lunisolar calendar with ancestral worship, festive house cleaning, and culinary reunions.',
    traditions: [
      'Wrapping square Bánh Chưng cakes with sticky rice, mung beans, and pork in dong leaves',
      'Displaying flowering pink peach blossom (Hoa Đào) or yellow apricot blossom (Hoa Mai) trees',
      'Giving red envelopes (Lì Xì) containing lucky money to children and grandparents',
      'Honoring the Kitchen Gods (Ông Công Ông Táo) with carp released into sacred waters'
    ],
    greeting: 'Chúc Mừng Năm Mới! Vạn Sự Như Ý!',
    foodDelicacies: ['Bánh Chưng', 'Bánh Tét', 'Thịt Kho Tàu (Caramelized Pork & Eggs)', 'Dưa Món (Pickled Vegetables)'],
    bannerUrl: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vietnam', 'Lunar New Year', 'Spring Festival', 'Ancestors', 'Tet'],
    facts: [
      'The first guest to enter a home after midnight on New Year\'s Eve (Xông Đất) is believed to determine the household\'s luck for the entire year.',
      'Bánh Chưng was created over 2,000 years ago during the mythical Hùng King Dynasty to symbolize the Earth.'
    ],
    popularityScore: 95,
    latitude: 21.0285,
    longitude: 105.8542,
    weatherProfile: {
      tempCelsius: '17°C - 23°C (Hanoi) / 24°C - 31°C (Saigon)',
      tempFahrenheit: '63°F - 73°F (North) / 75°F - 88°F (South)',
      climate: 'Mild & Refreshing in the North; Dry Sunny in the South',
      rainRisk: 'Low',
      bestTravelWindow: 'Early February before Tet week to witness buzzing flower markets.',
      recommendedPacking: ['Light windbreaker', 'Walking shoes for bustling Old Quarter street markets']
    },
    festivePeak: {
      peakDays: 'February 6 - 9',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Hoan Kiem Lake in Hanoi and Nguyen Hue Flower Street in Ho Chi Minh City',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'tet-blossom-tree',
      name: 'Spring Peach Blossom Branch',
      modelType: 'cherry_blossom',
      festiveAuraColor: '#f43f5e',
      scaleDefault: 1.2,
      description: 'Luminous pink Hoa Đào branch accented with miniature red lucky felt lanterns.'
    }
  },
  {
    id: 'nyepi-day-of-silence-bali',
    name: 'Nyepi (Balinese Day of Absolute Silence)',
    localName: 'Hari Raya Nyepi (Tahun Baru Saka)',
    date: '2026-03-20',
    month: 3,
    day: 20,
    country: 'Indonesia (Bali)',
    countryCode: 'ID',
    category: 'cultural',
    description: 'A deeply spiritual Hindu New Year on Bali where the entire island enters 24 hours of total silence, fasting, and meditation. No lights, no fires, no travel, and no internet, allowing nature and the soul to reset while demonic spirits are deceived into believing the island is uninhabited.',
    traditions: [
      'The eve of Nyepi: Spectacular Pengrupukan parades with gigantic mythological monster effigies (Ogoh-ogoh)',
      'The 4 sacred prohibitions (Catur Brata Penyepian): No fire/light, no work, no movement, no entertainment',
      'Total island lockdown overseen by traditional Pecalang neighborhood guardians',
      'Ngembak Geni: Day after silence dedicated to visiting loved ones for forgiveness and mutual reconciliation'
    ],
    greeting: 'Selamat Hari Raya Nyepi, Tahun Baru Caka!',
    foodDelicacies: ['Nasi Tumpeng (Sacred Yellow Cone Rice)', 'Lawar Balinese Salad', 'Babi Guling (Festive Roast)'],
    bannerUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bali', 'Silence', 'Hinduism', 'Ogoh-Ogoh', 'Meditation', 'Spiritual Reset'],
    facts: [
      'Bali’s Ngurah Rai International Airport completely shuts down for 24 hours—the only international airport worldwide that closes for religious silence.',
      'With zero light pollution across the island, the night sky reveals one of the most blindingly clear views of the Milky Way on Earth.'
    ],
    popularityScore: 96,
    latitude: -8.4095,
    longitude: 115.1889,
    weatherProfile: {
      tempCelsius: '24°C - 31°C',
      tempFahrenheit: '75°F - 88°F',
      climate: 'Tropical Warm - End of Rainy Season',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-March; book a resort stay with food provisions at least 3 months ahead.',
      recommendedPacking: ['Stargazing telescope or binoculars', 'Battery packs', 'Good books for silent reflection']
    },
    festivePeak: {
      peakDays: 'March 19 (Eve Parades) & March 20 (Silence)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Intimate / Serene',
      bestViewingSpot: 'Ubud cultural village crossroads for Ogoh-ogoh parades',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'balinese-canang-sari',
      name: 'Canang Sari Floral Offering',
      modelType: 'golden_lotus',
      festiveAuraColor: '#eab308',
      scaleDefault: 0.9,
      description: 'Sacred woven Balinese palm-leaf basket filled with colorful fragrant blossoms, betel nut, and burning incense.'
    }
  },
  {
    id: 'vesak-buddha-day',
    name: 'Vesak (Buddha Purnima / Day of Enlightenment)',
    localName: 'Visakha Puja / बुद्ध पूर्णिमा',
    date: '2026-05-31',
    month: 5,
    day: 31,
    country: 'Sri Lanka, India & Southeast Asia',
    countryCode: 'LK',
    category: 'religious',
    description: 'The most sacred day in Buddhism commemorating the birth, supreme enlightenment (Bodhi), and passing into Parinirvana of Gautama Buddha under the full moon of Vaisakha.',
    traditions: [
      'Bathing statues of the infant Buddha with floral and herbal infusions (symbolizing purity)',
      'Dansalas: Free food stalls established along highways providing gourmet meals to pilgrims',
      'Erecting towering illuminated bamboo storytelling structures (Pandols / Thoranas)',
      'Hanging octagonal paper Vesak kudu lanterns outside every doorway'
    ],
    greeting: 'Happy Vesak! / Subha Vesak Mangalyak Wewa!',
    foodDelicacies: ['Kiri Bath (Milk Rice with Lunu Miris)', 'Kavum (Oil Cakes)', 'Lotus Root Tea', 'Sweet Kokis'],
    bannerUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    tags: ['Buddhism', 'Enlightenment', 'Vesak', 'Sri Lanka', 'Peace', 'Lanterns'],
    facts: [
      'Recognized officially by the United Nations General Assembly in 1999 as an international day of observance.',
      'Practicing Buddhists observe vegetarianism throughout Vesak to cultivate universal compassion for all sentient beings.'
    ],
    popularityScore: 93,
    latitude: 6.9271,
    longitude: 79.8612,
    weatherProfile: {
      tempCelsius: '26°C - 32°C',
      tempFahrenheit: '79°F - 90°F',
      climate: 'Tropical Monsoon Warmth',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Late May for majestic night illuminations in Colombo and Kandy.',
      recommendedPacking: ['Modest pure white clothing for temples', 'Easy slip-off sandals', 'Umbrella']
    },
    festivePeak: {
      peakDays: 'May 31 (Vesak Full Moon)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Temple of the Sacred Tooth Relic in Kandy, Sri Lanka',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'vesak-kudu-lantern',
      name: 'Octagonal Vesak Lantern',
      modelType: 'lantern',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.1,
      description: 'Luminous Sri Lankan paper lantern decorated with flowing translucent paper streamers and warm inner candle glow.'
    }
  },
  {
    id: 'matariki-maori-new-year',
    name: 'Matariki (Māori Pleiades New Year)',
    localName: 'Mānawatia a Matariki',
    date: '2026-07-10',
    month: 7,
    day: 10,
    country: 'New Zealand (Aotearoa)',
    countryCode: 'NZ',
    category: 'cultural',
    description: 'The indigenous Māori New Year marked by the rising of the Matariki star cluster (the Pleiades) in the pre-dawn winter sky. A time to honor those who passed, celebrate abundance, and plant seeds for the future.',
    traditions: [
      'Whakarongo ki ngā whetū: Pre-dawn star-gazing to forecast harvest conditions for the coming year',
      'Hāngī feasts cooked slowly beneath the earth using heated stones and volcanic steam',
      'Wānanga: Cultural storytelling, kapa haka songs, and carving workshops around campfires',
      'Hau Tapu: Traditional food steam offerings sent to the night stars in gratitude'
    ],
    greeting: 'Mānawatia a Matariki! (Celebrate Matariki!)',
    foodDelicacies: ['Hāngī (Pork, Sweet Kūmara, Pumpkin)', 'Rewena Bread (Fermented Sourdough)', 'Kawa Kawa Herbal Tea'],
    bannerUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    tags: ['Māori', 'New Zealand', 'Pleiades', 'Indigenous', 'Astronomy', 'Winter Solstice'],
    facts: [
      'Made an official national public holiday in New Zealand in 2022, the first indigenous-focused statutory holiday in the nation\'s modern history.',
      'Each of the nine visible stars in the Matariki cluster represents a different element of well-being, ocean life, food crops, or memory.'
    ],
    popularityScore: 92,
    latitude: -36.8485,
    longitude: 174.7633,
    weatherProfile: {
      tempCelsius: '8°C - 15°C',
      tempFahrenheit: '46°F - 59°F',
      climate: 'Crisp Southern Winter - Starry Nights',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Early July for pristine pre-dawn stargazing across Rotorua and the Dark Sky reserves of Lake Tekapo.',
      recommendedPacking: ['Thermal wool base layers', 'Windproof winter jacket', 'Warm beanie and gloves']
    },
    festivePeak: {
      peakDays: 'July 10 (Rising of the Stars)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Intimate / Serene',
      bestViewingSpot: 'Mount Eden (Maungawhau) in Auckland or Lake Tekapo Stargazing Reserve',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'maori-koru-symbol',
      name: 'Silver Fern & Koru Spiral',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#10b981',
      scaleDefault: 1.0,
      description: 'Luminescent green pounamu jade spiral representing new beginnings, personal growth, and harmony.'
    }
  },
  {
    id: 'naadam-festival-mongolia',
    name: 'Naadam Festival (Three Games of Men)',
    localName: 'Эрийн гурван наадам',
    date: '2026-07-11',
    month: 7,
    day: 11,
    country: 'Mongolia',
    countryCode: 'MN',
    category: 'national',
    description: 'Mongolia\'s epic national celebration of nomadic heritage, showcasing the legendary "Three Games of Men": traditional wrestling, horseback cross-country racing across the steppe, and archery.',
    traditions: [
      'Bökh wrestling tournaments featuring the mythical eagle dance (Devjee) performed by champions',
      'Wild cross-country horse races over 30 kilometers across open steppe, ridden by skilled child jockeys',
      'Traditional knuckle-bone flicking (Shagai) competitions and composite horn archery',
      'Elaborate parade of athletes, horsemen, and dancers wearing historic silk Deel robes'
    ],
    greeting: 'Saikhan Naadaarai! ( сайхан наадаарай! )',
    foodDelicacies: ['Khuushuur (Deep-fried Mutton Meat Pastries)', 'Airag (Fermented Mare\'s Milk)', 'Buuz (Steamed Dumplings)'],
    bannerUrl: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mongolia', 'Nomadic', 'Wrestling', 'Horses', 'UNESCO', 'Steppe'],
    facts: [
      'Inscribed on UNESCO\'s Intangible Cultural Heritage list; has been celebrated for centuries since the era of Genghis Khan.',
      'Unlike Western horse racing, Mongolian races test stamina over endurance distances of 15 to 30 kilometers.'
    ],
    popularityScore: 94,
    latitude: 47.9188,
    longitude: 106.9176,
    weatherProfile: {
      tempCelsius: '18°C - 28°C',
      tempFahrenheit: '64°F - 82°F',
      climate: 'Glorious Steppe Summer - Sunny and Mild',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-July for the opening ceremony in Ulaanbaatar and country ger camp homestays.',
      recommendedPacking: ['Sun hat & sunglasses', 'Sturdy walking boots', 'Light windbreaker for cool evening breezes']
    },
    festivePeak: {
      peakDays: 'July 11 - 13',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'National Sports Stadium in Ulaanbaatar & Hui Doloon Hudag horse racing valley',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'mongolian-soyombo-crest',
      name: 'Golden Soyombo Emblem',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.0,
      description: 'Gilded Mongolian national crest embodying the flame, sun, moon, two fish (yin-yang), and protective fortress pillars.'
    }
  },
  {
    id: 'nowruz-persian-new-year',
    name: 'Nowruz (Persian Spring Equinox New Year)',
    localName: 'نوروز',
    date: '2026-03-20',
    month: 3,
    day: 20,
    country: 'Iran, Central Asia & Caucasus',
    countryCode: 'IR',
    category: 'cultural',
    description: 'An ancient celebration marking the exact moment of the vernal equinox, celebrating the rebirth of nature, universal peace, and rejuvenation across Iran, Central Asia, and the Caucasus for over 3,000 years.',
    traditions: [
      'Setting up the Haft-Sin table displaying 7 symbolic items starting with the Persian letter Sin (S)',
      'Chaharshanbe Suri: Jumping over bonfires on the last Tuesday eve to burn away ill health',
      'Khaneh Tekani: Meticulous "spring cleaning" of every corner of the house',
      'Sizdah Bedar: Picnicking outdoors on the 13th day and releasing sprouted wheat grass into flowing streams'
    ],
    greeting: 'Nowruz Mubarak! (نوروز مبارک)',
    foodDelicacies: ['Sabzi Polo ba Mahi (Herbed Rice with Smoked Fish)', 'Kuku Sabzi', 'Samanu (Sweet Wheat Pudding)', 'Baklava'],
    bannerUrl: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nowruz', 'Persian', 'Spring Equinox', 'UNESCO', 'Central Asia', 'New Year'],
    facts: [
      'Celebrated by over 300 million people worldwide; inscribed on UNESCO\'s Intangible Cultural Heritage list.',
      'The 7 items of Haft-Sin represent love (Senjed), rebirth (Sabzeh), health (Seeb), sunrise/patience (Somagh), wisdom (Seer), affluence (Serkeh), and sweetness (Samanu).'
    ],
    popularityScore: 97,
    latitude: 35.6892,
    longitude: 51.3890,
    weatherProfile: {
      tempCelsius: '12°C - 21°C',
      tempFahrenheit: '54°F - 70°F',
      climate: 'Delightful Spring Blossom Season',
      rainRisk: 'Low',
      bestTravelWindow: 'Late March for lush almond and apricot blossoms across Persian gardens.',
      recommendedPacking: ['Light trench coat', 'Comfortable walking shoes for historical bazaars']
    },
    festivePeak: {
      peakDays: 'March 20 (Exact Equinox Moment)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Naqsh-e Jahan Square in Isfahan or Tajrish Bazaar in Tehran',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'haft-sin-sabzeh',
      name: 'Nowruz Sprouted Sabzeh Bowl',
      modelType: 'golden_lotus',
      festiveAuraColor: '#10b981',
      scaleDefault: 1.0,
      description: 'Lush green wheatgrass sprouted in an embossed turquoise ceramic bowl tied with a vibrant red silk ribbon.'
    }
  },
  {
    id: 'harbin-ice-festival',
    name: 'Harbin International Ice & Snow Festival',
    localName: '哈尔滨国际冰雪节',
    date: '2027-01-05',
    month: 1,
    day: 5,
    country: 'China',
    countryCode: 'CN',
    category: 'seasonal',
    description: 'The largest winter festival in the world, featuring colossal full-scale architectural palaces, bridges, and pagodas carved entirely from thick blocks of crystalline Songhua River ice, illuminated with lasers and computerized LED lights.',
    traditions: [
      'Harvesting 100,000 cubic meters of river ice with handheld saws by local ice masons',
      'Walking through towering illuminated ice replicas of world landmarks and frozen fairytale castles',
      'Braving high-speed ice slides stretching hundreds of meters down castle towers',
      'Watching brave polar swimmers take plunges into freezing river pools cut through the ice'
    ],
    greeting: 'Ice & Snow Greetings! (冰雪节快乐！)',
    foodDelicacies: ['Dongbei Candied Hawthorn Berries (Bingtanghulu)', 'Russian Bread (Dalieba)', 'Hot Pot with Mutton', 'Harbin Red Sausage'],
    bannerUrl: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?auto=format&fit=crop&w=1200&q=80',
    tags: ['Harbin', 'Ice Festival', 'China', 'Winter Wonderland', 'Sculptures'],
    facts: [
      'The entire illuminated ice city spans over 600,000 square meters, making it visible even from suborbital satellites.',
      'Temperatures routinely drop below -25°C (-13°F), creating ideal natural cryogenic preservation for ice art for over two months.'
    ],
    popularityScore: 96,
    latitude: 45.8038,
    longitude: 126.5350,
    weatherProfile: {
      tempCelsius: '-26°C to -12°C',
      tempFahrenheit: '-15°F to 10°F',
      climate: 'Sub-Zero Siberian Arctic Frost',
      rainRisk: 'Low',
      bestTravelWindow: 'Early January right after opening ceremony for pristine unmelted carvings.',
      recommendedPacking: ['Extreme cold parkas (-30°C rated)', 'Thermal boots & heat packs', 'Camera battery insulated wraps']
    },
    festivePeak: {
      peakDays: 'January 5 - 15',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Harbin Ice and Snow World (Bingxue Dawandi)',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'crystalline-ice-castle',
      name: 'Glowing Crystalline Ice Pagoda',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#38bdf8',
      scaleDefault: 1.3,
      description: 'Translucent ice pagoda carved with intricate dragon eaves, glowing with shifting cyan, magenta, and sapphire LED refractions.'
    }
  },
  {
    id: 'dragon-boat-festival-duanwu',
    name: 'Dragon Boat Festival (Duanwu Jie)',
    localName: '端午节',
    date: '2026-06-19',
    month: 6,
    day: 19,
    country: 'China, Taiwan & East Asia',
    countryCode: 'CN',
    category: 'cultural',
    description: 'An ancient traditional festival commemorating the patriotic poet Qu Yuan (340–278 BCE), celebrated with thunderous dragon boat regattas, aromatic pyramid-shaped zongzi rice dumplings, and herbal sachets.',
    traditions: [
      'Pounding rhythmic drums to synchronize dozens of paddlers in ornate dragon-headed longboats',
      'Wrapping bamboo leaf pyramids stuffed with glutinous rice, salted egg yolk, and chestnuts (Zongzi)',
      'Hanging mugwort and calamus leaves over doorways to ward off pests and malevolent spirits',
      'Balancing raw eggs on their ends at the exact stroke of noon for year-long good fortune'
    ],
    greeting: 'Duanwu An Kang! (端午安康！)',
    foodDelicacies: ['Salty Pork Belly Zongzi', 'Sweet Red Bean Paste Zongzi', 'Realgar Wine', 'Salted Duck Eggs'],
    bannerUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Dragon Boat', 'Duanwu', 'China', 'Zongzi', 'UNESCO', 'River Racing'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of Intangible Cultural Heritage in 2009.',
      'According to legend, locals rushed out in boats drumming loudly to scare away fish from harming Qu Yuan, throwing sticky rice into the river to feed the waters.'
    ],
    popularityScore: 95,
    latitude: 31.2304,
    longitude: 121.4737,
    weatherProfile: {
      tempCelsius: '23°C - 31°C',
      tempFahrenheit: '73°F - 88°F',
      climate: 'Early Summer Warmth',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-June for premier waterside boat races in Hong Kong Victoria Harbour or Yueyang.',
      recommendedPacking: ['Sun protection hat', 'Waterproof phone lanyard', 'Light breathable linen clothes']
    },
    festivePeak: {
      peakDays: 'June 19 (5th day of 5th lunar month)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Shing Mun River in Hong Kong or Miluo River in Hunan',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'dragon-boat-drum',
      name: 'Carved Dragon Boat Drum & Oar',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#dc2626',
      scaleDefault: 1.1,
      description: 'Lacquered crimson dragon boat cadence drum accompanied by golden carved dragon scales.'
    }
  },
  {
    id: 'pushkar-camel-fair',
    name: 'Pushkar Camel & Livestock Fair (Pushkar Mela)',
    localName: 'पुष्कर मेला',
    date: '2026-11-20',
    month: 11,
    day: 20,
    country: 'India (Rajasthan)',
    countryCode: 'IN',
    category: 'cultural',
    description: 'One of the world\'s largest camel and livestock fairs held on the edge of the Thar Desert, blending livestock trading, turban-tying contests, mustache championships, and sacred Kartik Purnima full-moon holy lake dips.',
    traditions: [
      'Parading decorated camels with shaved geometric patterns, mirrored textiles, and brass ankle bells',
      'Sacred full moon bathing in holy Pushkar Lake at dawn to attain salvation',
      'The "Longest Mustache" and "Matka Phod" (clay pot race) carnival competitions',
      'Desert camping under moonlit sand dunes with Rajasthani folk musicians and Kalbelia dancers'
    ],
    greeting: 'Pushkar Mela ki Shubhkamnayein! (शुभकामनाएं)',
    foodDelicacies: ['Dal Baati Churma', 'Malpua Sweet Pancakes', 'Kachori with Spicy Mint Chutney', 'Masala Chai'],
    bannerUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    tags: ['Pushkar', 'Rajasthan', 'Desert', 'Camel Fair', 'Hinduism', 'Cultural Spectacle'],
    facts: [
      'Over 50,000 camels, horses, and cattle are brought to Pushkar across the desert dunes each November.',
      'Pushkar is home to one of the extremely rare temples dedicated to the creator god Lord Brahma in the world.'
    ],
    popularityScore: 94,
    latitude: 26.4886,
    longitude: 74.5509,
    weatherProfile: {
      tempCelsius: '14°C - 28°C',
      tempFahrenheit: '57°F - 82°F',
      climate: 'Crisp Desert Winter - Warm Days & Chilly Nights',
      rainRisk: 'Low',
      bestTravelWindow: 'November during Kartik Purnima for optimal desert temperatures.',
      recommendedPacking: ['Desert scarf / shemagh for dust', 'Layered fleece for freezing desert nights', 'Sunscreen']
    },
    festivePeak: {
      peakDays: 'November 20 - 24',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Mela Ground and Brahma Ghat steps around Pushkar Lake',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'rajasthani-turban-camel',
      name: 'Bejeweled Rajasthani Camel Saddle',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.2,
      description: 'Intricately embroidered desert saddle with brass bells, cowrie shells, and saffron silk pompoms.'
    }
  },
  {
    id: 'onam-kerala-harvest',
    name: 'Onam (Kerala Harvest & King Mahabali Festival)',
    localName: 'ഓണം',
    date: '2026-08-26',
    month: 8,
    day: 26,
    country: 'India (Kerala)',
    countryCode: 'IN',
    category: 'cultural',
    description: 'The harvest festival of Kerala celebrating the mythical homecoming of the beloved and just ancient King Mahabali, celebrated by all communities across the state with floral floor carpets, boat races, and a 26-dish feast.',
    traditions: [
      'Pookkalam: Creating intricate, geometric flower rangolis with fresh marigolds and jasmine outside doorways',
      'Vallam Kali: Majestic snake boat races with 100 oarsmen rowing in rhythmic sync to boat songs (Vanchipattu)',
      'Onasadya: A grand vegetarian feast of 26 to 30 distinct dishes served on a fresh banana leaf',
      'Pulikali: Energetic tiger dances where artists paint tiger faces directly onto their torsos'
    ],
    greeting: 'Happy Onam! / Onashamsakal! (ഓണാശംസകൾ)',
    foodDelicacies: ['Avial', 'Payasam Sweet Pudding', 'Sambar', 'Thoran', 'Banana Chips (Upperi)', 'Pachadi'],
    bannerUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Onam', 'Kerala', 'Snake Boat Race', 'Harvest', 'Pookkalam', 'Sadhya'],
    facts: [
      'The Onasadya feast includes specific placement etiquette on the banana leaf, with sweet items placed on the bottom right and spicy picklings on the top left.',
      'The Chundan Vallam (snake boats) stretch up to 138 feet in length and carry up to 110 crew members.'
    ],
    popularityScore: 95,
    latitude: 9.9312,
    longitude: 76.2673,
    weatherProfile: {
      tempCelsius: '24°C - 30°C',
      tempFahrenheit: '75°F - 86°F',
      climate: 'Lush Post-Monsoon Greenery',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Late August to early September for vibrant backwater boat races.',
      recommendedPacking: ['Light breathable cottons (Kasavu sari/mundu)', 'Compact travel umbrella', 'Insect repellent']
    },
    festivePeak: {
      peakDays: 'August 26 (Thiruvonam Day)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Punnamada Lake in Alappuzha (Nehru Trophy boat race) & Thrikkakara Temple',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'onam-pookkalam-mandala',
      name: 'Pookkalam Sacred Flower Mandala',
      modelType: 'golden_lotus',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.4,
      description: 'Luminous circular flower tapestry radiating with rings of yellow marigolds, purple Gomphrena, and lotus petals.'
    }
  },
  {
    id: 'durga-puja-kolkata',
    name: 'Durga Puja (Triumph of Goddess Durga)',
    localName: 'শারদীয়া দুর্গাপূজা',
    date: '2026-10-18',
    month: 10,
    day: 18,
    country: 'India (West Bengal) & Bangladesh',
    countryCode: 'IN',
    category: 'cultural',
    description: 'An awe-inspiring 10-day carnival of art, faith, and community celebrating the ten-armed warrior Goddess Durga defeating the demon Mahishasura. Entire cities transform into open-air contemporary art museums featuring thousands of themed architectural pandals.',
    traditions: [
      'Pandal hopping: Visiting hundreds of neighborhood art pavilions sculpted as palaces, temples, or modern themes',
      'Dhunuchi Naach: Frenetic devotional dancing with earthen clay incense burners filled with burning coconut husk',
      'Dhaak drumming: Resounding percussion by traditional Bengali drummers filling streets with thunderous beats',
      'Sindoor Khela: Married women smearing vermilion powder on each other on the final day of immersion (Bijoya Dashami)'
    ],
    greeting: 'Subho Sarodiyar Priti O Shubhechha! (শুভ দুর্গাপূজা)',
    foodDelicacies: ['Khichuri Bhog with Labra', 'Kosha Mangsho', 'Mishti Doi (Sweet Yogurt)', 'Sandesh', 'Luchi with Alur Dom'],
    bannerUrl: 'https://images.unsplash.com/photo-1570783457193-270830db9f18?auto=format&fit=crop&w=1200&q=80',
    tags: ['Durga Puja', 'Kolkata', 'UNESCO', 'Bengal', 'Street Art', 'Festivals'],
    facts: [
      'Inscribed on UNESCO\'s Intangible Cultural Heritage list in 2021 as a supreme example of public art and religious pluralism.',
      'The idols are sculpted from sacred clay collected from the banks of the sacred Hooghly River in the artisanal quarter of Kumartuli.'
    ],
    popularityScore: 98,
    latitude: 22.5726,
    longitude: 88.3639,
    weatherProfile: {
      tempCelsius: '22°C - 31°C',
      tempFahrenheit: '72°F - 88°F',
      climate: 'Pleasant Autumn - Clear Skies & Gentle Breeze',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-October during the peak 5 days (Sasthi through Dashami).',
      recommendedPacking: ['Comfortable walking sneakers (15,000+ steps/day pandal hopping)', 'Traditional festive kurtas']
    },
    festivePeak: {
      peakDays: 'October 18 - 22 (Maha Ashtami to Dashami)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Very High',
      bestViewingSpot: 'College Square, Bagbazar Sarbojanin, and Maddox Square in Kolkata',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'durga-trishul-dhaak',
      name: 'Golden Trishul & Festive Dhaak Drum',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#ef4444',
      scaleDefault: 1.2,
      description: 'Gilded divine trident (trishul) flanked by white-feathered Bengali dhaak drums and smoking terracotta incense.'
    }
  },
  {
    id: 'tanabata-star-festival-japan',
    name: 'Tanabata (The Star Lovers Festival)',
    localName: '七夕 (たなばた)',
    date: '2026-07-07',
    month: 7,
    day: 7,
    country: 'Japan',
    countryCode: 'JP',
    category: 'cultural',
    description: 'The romantic Japanese Star Festival celebrating the annual reunion of celestial lovers Orihime (Vega) and Hikoboshi (Altair), separated by the heavenly river of the Milky Way and permitted to meet only once a year on the 7th night of the 7th month.',
    traditions: [
      'Writing personal wishes, poems, and dreams on colorful rectangular paper strips called Tanzaku',
      'Hanging Tanzaku and handcrafted paper origami orbs on tall fresh bamboo branches',
      'Wearing lightweight summer cotton yukatas and wooden geta sandals to evening lantern fairs',
      'Strolling along shopping arcades decorated with 10-meter-long blowing paper streamers (Fukinagashi)'
    ],
    greeting: 'Happy Tanabata! (七夕おめでとう！)',
    foodDelicacies: ['Somen Cold Noodles (representing the Milky Way)', 'Takoyaki', 'Kakigori Shaved Ice', 'Taiyaki Waffles'],
    bannerUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Japan', 'Tanabata', 'Milky Way', 'Stars', 'Yukata', 'Bamboo'],
    facts: [
      'The Sendai Tanabata Matsuri in Tohoku is the most famous in Japan, using millions of handcrafted washi paper decorations that take months to fold.',
      'Somen noodles are traditionally eaten cold with dipping sauce because their long thin white strands mirror the heavenly stars of the Milky Way.'
    ],
    popularityScore: 93,
    latitude: 38.2682,
    longitude: 140.8694,
    weatherProfile: {
      tempCelsius: '22°C - 29°C',
      tempFahrenheit: '72°F - 84°F',
      climate: 'Warm Japanese Summer Evenings',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Early July (or August 6–8 for the traditional Sendai lunar Tanabata).',
      recommendedPacking: ['Breathable cotton summer clothes', 'Light folding fan (sensu)', 'Portable umbrella']
    },
    festivePeak: {
      peakDays: 'July 7 (Night of the Stars)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Sendai Shopping Arcades or Tokyo Zojoji Temple with illuminated Tokyo Tower backdrop',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'tanabata-washi-streamer',
      name: 'Sendai Tanabata Washi Streamer',
      modelType: 'lantern',
      festiveAuraColor: '#ec4899',
      scaleDefault: 1.3,
      description: 'Vibrant handcrafted washi paper sphere trailing five cascading multi-colored prayer ribbons.'
    }
  },

  // ==========================================
  // MIDDLE EAST & NORTH AFRICA
  // ==========================================
  {
    id: 'eid-al-adha-sacrifice',
    name: 'Eid al-Adha (Feast of the Sacrifice)',
    localName: 'عيد الأضحى المبارك',
    date: '2026-05-27',
    month: 5,
    day: 27,
    country: 'Global Islamic World',
    countryCode: 'UN',
    category: 'religious',
    description: 'The major Islamic holiday honoring Prophet Ibrahim\'s devotion and willingness to sacrifice his son in obedience to God. Coninciding with the completion of the annual Hajj pilgrimage in Mecca, it is marked by prayer, family feasting, and mandatory charitable meat distribution to the impoverished.',
    traditions: [
      'Communal morning Eid prayer in open-air prayer grounds (Musallas)',
      'Qurbani/Udhiyah sacrifice divided into three equal portions: family, relatives/friends, and the needy',
      'Wearing new festive attire and applying oud perfumed oil',
      'Visiting extended elders and sharing sweet hospitality'
    ],
    greeting: 'Eid Mubarak! / Kul \'am wa antum bi-khair! (كل عام وأنتم بخير)',
    foodDelicacies: ['Mandi Lamb Rice', 'Sheer Khurma', 'Ma\'amoul Cookies', 'Roast Lamb Shoulder', 'Tagine with Prunes'],
    bannerUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    tags: ['Eid', 'Hajj', 'Islam', 'Charity', 'Sacrifice', 'Family Feast'],
    facts: [
      'Over 2 million Muslim pilgrims converge simultaneously on Mount Arafat near Mecca during the days preceding Eid al-Adha.',
      'One third of all sacrificed meat must strictly be donated to destitute individuals who cannot afford meat during the year.'
    ],
    popularityScore: 99,
    latitude: 21.4225,
    longitude: 39.8262,
    weatherProfile: {
      tempCelsius: '28°C - 42°C',
      tempFahrenheit: '82°F - 108°F',
      climate: 'Dry Hot Desert Summer',
      rainRisk: 'Low',
      bestTravelWindow: 'Late May; plan hotel and travel bookings months in advance due to Hajj peak season.',
      recommendedPacking: ['Lightweight linen or breathable cottons', 'Sun umbrella & hydration pack', 'Slip-on leather sandals']
    },
    festivePeak: {
      peakDays: 'May 27 - 30 (4 Days of Celebration)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Grand Mosque courtyards and historic old souks in Cairo, Istanbul, or Marrakech',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'fanous-eid-lantern',
      name: 'Brass Islamic Fanous Lantern',
      modelType: 'crescent_lantern',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.1,
      description: 'Ornate pierced brass lantern casting intricate arabesque geometric light patterns across the floor.'
    }
  },
  {
    id: 'passover-pesach',
    name: 'Passover (Pesach / Feast of Unleavened Bread)',
    localName: 'פסח',
    date: '2026-04-02',
    month: 4,
    day: 2,
    country: 'Israel & Global Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'An eight-day celebration commemorating the liberation of the Israelites from slavery in ancient Egypt, the ten biblical plagues, and the miracle of the Exodus, observed with the ceremonial Seder banquet and the eating of unleavened matzah.',
    traditions: [
      'The Passover Seder: Reading the Haggadah narrative with four cups of wine',
      'The Seder Plate: Symbolic foods including maror (bitter herbs), charoset (apple-nut paste), and shankbone',
      'Searching the house for Chametz (leavened grains) using a feather and candlelight before the holiday begins',
      'Afikoman hunt: Children searching for the hidden piece of matzah to redeem for a celebratory prize'
    ],
    greeting: 'Chag Pesach Sameach! (חג פסח שמח!)',
    foodDelicacies: ['Crispy Matzah', 'Matzo Ball Soup', 'Charoset (Spiced Apple & Walnut)', 'Slow-Cooked Beef Brisket', 'Gefilte Fish'],
    bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    tags: ['Passover', 'Pesach', 'Exodus', 'Freedom', 'Judaism', 'Seder'],
    facts: [
      'Matzah must be mixed, rolled, and baked within strictly 18 minutes to ensure no fermentation takes place.',
      'The four questions recited by the youngest child at the table begin with "Mah Nishtanah": "Why is this night different from all other nights?"'
    ],
    popularityScore: 96,
    latitude: 31.7683,
    longitude: 35.2137,
    weatherProfile: {
      tempCelsius: '14°C - 23°C',
      tempFahrenheit: '57°F - 73°F',
      climate: 'Mild Mediterranean Spring - Wildflowers in Bloom',
      rainRisk: 'Low',
      bestTravelWindow: 'Early April during the lush Judean hills blooming season.',
      recommendedPacking: ['Light layers for day; warm sweater for cool Jerusalem evenings', 'Modest attire for sacred sites']
    },
    festivePeak: {
      peakDays: 'April 2 (Seder Night)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Western Wall (Kotel) in Old City Jerusalem for Birkat Kohanim',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'kiddush-cup-seder',
      name: 'Silver Elijah Kiddush Goblet',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#93c5fd',
      scaleDefault: 1.0,
      description: 'Engraved sterling silver goblet filled with sweet ruby wine, illuminated by soft candlelight.'
    }
  },
  {
    id: 'rosh-hashanah-jewish-new-year',
    name: 'Rosh Hashanah (Jewish New Year / Day of Shofar)',
    localName: 'ראש השנה',
    date: '2026-09-12',
    month: 9,
    day: 12,
    country: 'Israel & Global Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'The Jewish New Year marking the creation of the world, commencing the Ten Days of Awe (Yamim Noraim) leading to Yom Kippur. A time of introspective repentance, prayer, and joyous hope for a sweet, peaceful year ahead.',
    traditions: [
      'Sounding the Shofar: 100 piercing blasts blown from a curved ram\'s horn awakening the spiritual soul',
      'Dipping crisp apple slices into golden wildflower honey to pray for a "sweet new year"',
      'Tashlich: Walking to a living body of water on the first afternoon to symbolically cast off sins',
      'Eating pomegranate seeds symbolizing the hope to perform good deeds as numerous as its seeds'
    ],
    greeting: 'Shanah Tovah U\'Metukah! (שנה טובה ומתוקה!)',
    foodDelicacies: ['Apples dipped in Honey', 'Round Braided Challah with Raisins', 'Pomegranate', 'Honey Cake (Lekach)', 'Roast Chicken with Tzimmes'],
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rosh Hashanah', 'New Year', 'Shofar', 'Apples & Honey', 'Judaism', 'High Holidays'],
    facts: [
      'The holiday challah bread is baked into a round spiral rather than a straight braid to symbolize the cyclical nature of time and life.',
      'According to Jewish tradition, an average pomegranate contains exactly 613 seeds, matching the 613 mitzvot (commandments) in the Torah.'
    ],
    popularityScore: 95,
    latitude: 32.0853,
    longitude: 34.7818,
    weatherProfile: {
      tempCelsius: '22°C - 30°C',
      tempFahrenheit: '72°F - 86°F',
      climate: 'Warm Mediterranean Late Summer',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-September for golden sunshine and beachside Tashlich walks in Tel Aviv.',
      recommendedPacking: ['White festive linen attire', 'Comfortable walking sandals', 'Sun hat']
    },
    festivePeak: {
      peakDays: 'September 12 - 13',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Jaffa port seaside cliffs for Tashlich rituals',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'ram-horn-shofar',
      name: 'Polished Ram\'s Horn Shofar',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.0,
      description: 'Gleaming carved ram\'s horn shofar resting upon a platter of ruby pomegranates and golden honey.'
    }
  },

  // ==========================================
  // EUROPE
  // ==========================================
  {
    id: 'midsummer-midsommar-sweden',
    name: 'Midsummer (Midsommarafton)',
    localName: 'Midsommar',
    date: '2026-06-19',
    month: 6,
    day: 19,
    country: 'Sweden & Nordic Nations',
    countryCode: 'SE',
    category: 'seasonal',
    description: 'Sweden\'s most cherished summer celebration marking the summer solstice and the longest day of the year under the magical midnight sun, celebrated in meadows and countryside villages with maypoles, flower crowns, and pickled herring banquets.',
    traditions: [
      'Raising the tall floral maypole (Midsommarstång) decorated with birch boughs and wild meadow wreaths',
      'Dancing the silly frog circle dance "Små grodorna" around the maypole with family and neighbors',
      'Weaving crowns of seven different wildflowers (Blomsterkrans) to wear in hair',
      'Folklore: Picking 7 different wildflowers in absolute silence and placing them beneath one\'s pillow to dream of one\'s future spouse'
    ],
    greeting: 'Trevlig Midsommar! (Glad Midsommar!)',
    foodDelicacies: ['Pickled Herring (Sill) in Dill & Mustard', 'Fresh New Potatoes with Sour Cream & Chives', 'Wild Strawberries with Heavy Cream', 'Aquavit (Snaps)'],
    bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Midsummer', 'Midsommar', 'Sweden', 'Nordic', 'Summer Solstice', 'Midnight Sun'],
    facts: [
      'In northern Sweden above the Arctic Circle, the sun never sets at all during Midsummer, bathing festivities in a surreal 24-hour golden glow.',
      'The traditional maypole is not named after the month of May, but comes from the archaic Swedish verb "maja", meaning "to bedeck with green leaves".'
    ],
    popularityScore: 97,
    latitude: 59.3293,
    longitude: 18.0686,
    weatherProfile: {
      tempCelsius: '15°C - 24°C',
      tempFahrenheit: '59°F - 75°F',
      climate: 'Lush Nordic Solstice - 20+ Hours of Daylight',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-June in Dalarna around Lake Siljan or the Stockholm Archipelago.',
      recommendedPacking: ['Light sweater for breezy archipelago evenings', 'Floral summer dresses / linen shirts', 'Mosquito repellent for countryside meadows']
    },
    festivePeak: {
      peakDays: 'June 19 (Midsommarafton)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Skansen open-air museum in Stockholm or Leksand in Dalarna',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'swedish-maypole-wreath',
      name: 'Bedecked Birch Maypole & Wreath',
      modelType: 'maypole',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.4,
      description: 'Traditional Swedish birch-leaf maypole adorned with two blooming wildflower wreaths and blue-yellow ribbon streamers.'
    }
  },
  {
    id: 'la-tomatina-buñol',
    name: 'La Tomatina (The Giant Tomato Fight)',
    localName: 'La Tomatina de Buñol',
    date: '2026-08-26',
    month: 8,
    day: 26,
    country: 'Spain',
    countryCode: 'ES',
    category: 'cultural',
    description: 'The world\'s most famous food fight held in the Valencian town of Buñol, where 20,000 international participants throw over 150 metric tons of overripe tomatoes at each other in the village streets for one hour of pure crimson merriment.',
    traditions: [
      'The Palo Jabón challenge: Climbing a two-story greased wooden pole to snatch a leg of Spanish cured ham (jamón)',
      'Firing of the water cannon signal at 11:00 AM triggering 60 minutes of non-stop tomato barrage',
      'Local residents spraying participants with garden hoses from balconies to clean the streets afterwards',
      'Eating traditional paella valenciana cooked in gigantic communal pans the night before'
    ],
    greeting: '¡Viva La Tomatina! ¡Buñol en fiesta!',
    foodDelicacies: ['Paella Valenciana with Rabbit & Rosemary', 'Horchata de Chufa with Fartons', 'Sangria', 'Tapas'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Tomatina', 'Spain', 'Buñol', 'Valencia', 'Food Fight', 'Summer Festival'],
    facts: [
      'The tomatoes used are specifically grown in Extremadura and are overripe and low-grade, unfit for culinary consumption, and squashed before throwing to prevent injury.',
      'The tomato acid naturally bleaches and cleans the historic cobblestone streets of Buñol, leaving them spotless once washed down.'
    ],
    popularityScore: 96,
    latitude: 39.4206,
    longitude: -0.7909,
    weatherProfile: {
      tempCelsius: '24°C - 33°C',
      tempFahrenheit: '75°F - 91°F',
      climate: 'Sizzling Mediterranean Summer',
      rainRisk: 'Low',
      bestTravelWindow: 'Late August; stay in Valencia and take the early morning commuter train into Buñol.',
      recommendedPacking: ['Swimming goggles (essential for tomato juice protection!)', 'Old clothes & sneakers you can discard', 'Waterproof phone case']
    },
    festivePeak: {
      peakDays: 'August 26 (Last Wednesday of August)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Plaza del Pueblo in Buñol along Calle Cid',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'tomatina-splat-cannon',
      name: 'Festive Crimson Tomato Splat',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#ef4444',
      scaleDefault: 1.1,
      description: 'Lively 3D splash of crimson ripe tomatoes and celebratory Spanish confetti.'
    }
  },
  {
    id: 'venice-carnival-carnevale',
    name: 'Carnival of Venice (Carnevale di Venezia)',
    localName: 'Carnevale di Venezia',
    date: '2027-01-30',
    month: 1,
    day: 30,
    country: 'Italy',
    countryCode: 'IT',
    category: 'cultural',
    description: 'An enchanting, theatrical carnival dating back to the 11th century where the historic canals, bridges, and palazzo ballrooms of Venice fill with masked revelers dressed in 18th-century silk costumes, gold-leaf Bauta masks, and velvet tricorn hats.',
    traditions: [
      'The Flight of the Angel (Volo dell\'Angelo) descending on a zip line from St. Mark\'s Campanile bell tower',
      'Wearing historic porcelain and papier-mâché masks (Bauta, Moretta, Medico della Peste)',
      'Exclusive candlelit masked galas and classical music minuets in private Grand Canal palazzos',
      'The Grand Canal historic boat parade of decorated gondolas and costumed oarsmen'
    ],
    greeting: 'Buon Carnevale a tutti! (Good Carnival!)',
    foodDelicacies: ['Frittelle Veneziane (Sweet Raisin & Pine Nut Fritters)', 'Galani / Chiacchiere (Crispy Fried Pastry Ribbons)', 'Cicchetti & Prosecco', 'Risotto al Nero di Seppia'],
    bannerUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    tags: ['Venice', 'Carnevale', 'Masks', 'Italy', 'Baroque', 'Grand Canal'],
    facts: [
      'Masks were originally worn in the Venetian Republic so citizens could cross rigid aristocratic social divides and speak freely without identity prejudice.',
      'The Bauta mask was specifically designed with a protruding lower chin so the wearer could drink and eat without removing the mask.'
    ],
    popularityScore: 98,
    latitude: 45.4387,
    longitude: 12.3271,
    weatherProfile: {
      tempCelsius: '4°C - 10°C',
      tempFahrenheit: '39°F - 50°F',
      climate: 'Romantic Winter Chill with Lagoon Mist',
      rainRisk: 'Low',
      bestTravelWindow: 'Early February for atmospheric morning canal mist and lower hotel rates on weekdays.',
      recommendedPacking: ['Elegant wool overcoat & cashmere scarf', 'Comfortable boots for cobblestone bridges', 'Camera with portrait lens']
    },
    festivePeak: {
      peakDays: 'February 6 - 9 (Fat Thursday to Mardi Gras)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Piazza San Marco and the Bridge of Sighs at sunrise',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'venetian-bauta-mask',
      name: 'Gold-Leaf Venetian Carnival Mask',
      modelType: 'feathered_mask',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.1,
      description: 'Lustrous baroque mask covered in cracked antique gold leaf, edged with purple velvet ribbons and iridescent peacock feathers.'
    }
  },
  {
    id: 'hogmanay-scottish-new-year',
    name: 'Hogmanay (Scottish New Year & Torchlight Procession)',
    localName: 'Hogmanay',
    date: '2026-12-31',
    month: 12,
    day: 31,
    country: 'Scotland (United Kingdom)',
    countryCode: 'GB',
    category: 'cultural',
    description: 'Scotland\'s legendary multi-day New Year festival in Edinburgh, world-renowned for its fiery torchlight processions led by Viking Jarl Squads, street ceilidh dances, bagpipes, fireworks over Edinburgh Castle, and the singing of Auld Lang Syne.',
    traditions: [
      'The Torchlight Procession: 40,000 torchbearers marching through the Royal Mile led by Shetland Vikings',
      'First-Footing: The ancient belief that a dark-haired stranger bringing coal, shortbread, and whisky brings good fortune',
      'Joining hands in gigantic human circles at midnight to sing Robert Burns\'s "Auld Lang Syne"',
      'The Loony Dook: Braving an icy New Year\'s Day morning dip in the freezing Firth of Forth in fancy dress'
    ],
    greeting: 'A Guid New Year to ane an\' a\'! (Happy Hogmanay!)',
    foodDelicacies: ['Traditional Scottish Haggis with Neeps & Tatties', 'Buttery Shortbread', 'Cranachan Dessert (Oats, Raspberries, Cream, Whisky)', 'Single Malt Scotch'],
    bannerUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Hogmanay', 'Scotland', 'Edinburgh', 'New Year', 'Vikings', 'Ceilidh'],
    facts: [
      'For nearly 400 years following the Protestant Reformation, Christmas was banned in Scotland, making Hogmanay the primary winter celebration for Scots.',
      'The word Hogmanay likely derives from the Old French "aguillanneuf", an ancient gift-giving cry at the turning of the year.'
    ],
    popularityScore: 97,
    latitude: 55.9533,
    longitude: -3.1883,
    weatherProfile: {
      tempCelsius: '1°C - 7°C',
      tempFahrenheit: '34°F - 45°F',
      climate: 'Crisp Highland Winter - Frost & Fire',
      rainRisk: 'Moderate',
      bestTravelWindow: 'December 29 – January 2 for the complete 4-day festival itinerary in Edinburgh.',
      recommendedPacking: ['Heavy thermal down coat', 'Waterproof leather boots', 'Warm tartan scarf & gloves']
    },
    festivePeak: {
      peakDays: 'December 30 (Torchlight) & December 31 (Midnight Bells)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Princes Street Gardens and Calton Hill overlooking the illuminated castle',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'scottish-viking-torch',
      name: 'Flaming Hogmanay Procession Torch',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.2,
      description: 'Handcrafted Scottish pine torch glowing with roaring orange flames and swirling festive sparks.'
    }
  },
  {
    id: 'san-fermin-running-of-the-bulls',
    name: 'San Fermín & The Running of the Bulls',
    localName: 'Fiestas de San Fermín (El Encierro)',
    date: '2026-07-06',
    month: 7,
    day: 6,
    country: 'Spain (Navarre)',
    countryCode: 'ES',
    category: 'cultural',
    description: 'The world-famous festival in Pamplona honoring patron Saint Fermín, made immortal by Ernest Hemingway. Commencing with the explosive Chupinazo rocket, runners dressed in white with red neckerchiefs guide six fighting bulls through the cobblestone streets to the arena each morning at 8:00 AM.',
    traditions: [
      'El Chupinazo: The rocket blast on July 6 at noon in the Plaza Consistorial showering the crowd in champagne',
      'El Encierro: The daily 875-meter morning bull run lasting an adrenaline-filled 2 to 3 minutes',
      'Singing the morning chant to Saint Fermín three times before the corral gates open',
      'The Giants and Big-heads (Gigantes y Cabezudos) parade of colossal papier-mâché figures'
    ],
    greeting: '¡Viva San Fermín! ¡Gora San Fermin!',
    foodDelicacies: ['Ajoarriero (Navarrese Cod with Garlic & Peppers)', 'Chistorra Sausage on Baguette', 'Pintxos with Zurracapote (Spiced Wine Punch)', 'Churros with Thick Chocolate'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['San Fermin', 'Running of the Bulls', 'Pamplona', 'Spain', 'Hemingway', 'Tradition'],
    facts: [
      'The uniform of white shirt and trousers with red pañuelo (neckerchief) and faja (sash) honors the martyrdom of Saint Fermín, with the red symbolizing his blood.',
      'Ernest Hemingway visited Pamplona in 1923, which inspired his breakout 1926 novel "The Sun Also Rises", bringing global fame to the festival.'
    ],
    popularityScore: 95,
    latitude: 42.8125,
    longitude: -1.6458,
    weatherProfile: {
      tempCelsius: '17°C - 30°C',
      tempFahrenheit: '62°F - 86°F',
      climate: 'Warm Spanish Summer with Basque Breeze',
      rainRisk: 'Low',
      bestTravelWindow: 'July 6 – 10; balcony rental reservations along Calle Estafeta must be booked 6-9 months ahead.',
      recommendedPacking: ['White t-shirts & white cotton pants (bring spares!)', 'Comfortable running sneakers with high grip']
    },
    festivePeak: {
      peakDays: 'July 6 (Chupinazo) & July 7 (First Encierro)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Very High',
      bestViewingSpot: 'A rented second-floor wooden balcony along Calle Estafeta or Calle Mercaderes',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'san-fermin-panuelo',
      name: 'Crimson San Fermín Pañuelo',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#dc2626',
      scaleDefault: 1.0,
      description: 'Vibrant crimson Navarrese neckerchief embroidered with the golden Saint Fermín coat of arms.'
    }
  },

  // ==========================================
  // SUB-SAHARAN AFRICA
  // ==========================================
  {
    id: 'timkat-ethiopian-epiphany',
    name: 'Timkat (Ethiopian Orthodox Epiphany)',
    localName: 'ጥምቀት',
    date: '2027-01-19',
    month: 1,
    day: 19,
    country: 'Ethiopia',
    countryCode: 'ET',
    category: 'religious',
    description: 'The most sacred religious festival of the Ethiopian Orthodox Tewahedo Church, commemorating the baptism of Jesus in the Jordan River. Priests carry replicas of the Ark of the Covenant (Tabots) wrapped in rich velvet and gold embroidery to holy pools at dawn.',
    traditions: [
      'Procession of the Tabots: Deacons and priests chanting with silver sistra rattles, prayer sticks (meqwamiya), and drums (kebero)',
      'Dawn blessing and collective renewal of baptismal vows by leaping joyously into blessed holy water pools',
      'Wearing handwoven pristine white cotton robes (Netela and Gabi) with colorful geometric borders',
      'The joyful dance of the priests (Werekeb) twirling fringed velvet ceremonial umbrellas'
    ],
    greeting: 'Melkam Timkat! (መልካም የጥምቀት በዓል!)',
    foodDelicacies: ['Doro Wat (Spicy Chicken Stew with Boiled Eggs)', 'Sourdough Injera Flatbread', 'Defo Dabo (Honey Herb Bread)', 'Traditional Spiced Ethiopian Coffee Ceremony'],
    bannerUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    tags: ['Timkat', 'Ethiopia', 'Epiphany', 'Orthodox', 'Gondar', 'UNESCO', 'Tabot'],
    facts: [
      'Inscribed on UNESCO\'s Intangible Cultural Heritage list in 2019.',
      'The 17th-century stone bath of Emperor Fasilides in Gondar is the grandest setting on Earth for Timkat, filled with diverted river water for the baptismal ceremonies.'
    ],
    popularityScore: 95,
    latitude: 12.6075,
    longitude: 37.4674,
    weatherProfile: {
      tempCelsius: '12°C - 27°C',
      tempFahrenheit: '54°F - 80°F',
      climate: 'Crisp Highland Dry Season - Brilliant Blue Skies',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-January during the peak dry season in the historic northern circuit (Gondar & Lalibela).',
      recommendedPacking: ['Lightweight pure white cotton Netela scarf', 'Comfortable walking shoes for stone steps', 'Sun protection']
    },
    festivePeak: {
      peakDays: 'January 19 (Main Baptism Day)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Fasilides’ Bath in Gondar or Jan Meda grounds in Addis Ababa',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'ethiopian-lalibela-cross',
      name: 'Carved Brass Ethiopian Processional Cross',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.2,
      description: 'Magnificent filigreed Lalibela processional cross crafted from antique brass, draped with regal crimson silk.'
    }
  },
  {
    id: 'iri-ji-new-yam-festival-igbo',
    name: 'Iri Ji Ohuru (Igbo New Yam Harvest Festival)',
    localName: 'Iri Ji',
    date: '2026-08-15',
    month: 8,
    day: 15,
    country: 'Nigeria & West Africa',
    countryCode: 'NG',
    category: 'cultural',
    description: 'The monumental harvest festival of the Igbo people of southeastern Nigeria, giving thanks to the earth deity Ani and ancestral spirits for the abundance of the yam—revered as the undisputed "King of Crops".',
    traditions: [
      'The ceremonial roasting and cutting of the first yam by the community monarch (Eze or Igwe)',
      'Pouring libations of fresh palm wine in gratitude to the earth and forebears',
      'The sacred Masquerade (Mmanwu) performances with towering wooden masks embodying forest spirits',
      'Traditional wrestling matches (Mgba) accompanied by energetic Udu clay drums and ekwe slit gongs'
    ],
    greeting: 'Nnoo na Iri Ji Ohuru! (Happy New Yam Festival!)',
    foodDelicacies: ['Roasted Yam with Spicy Palm Oil & Utazi Leaves', 'Ji Mmanu (Yam Porridge with Dried Fish)', 'Fresh Palm Wine', 'Egusi Soup with Pounded Yam'],
    bannerUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['New Yam', 'Igbo', 'Nigeria', 'West Africa', 'Harvest', 'Masquerade'],
    facts: [
      'In traditional Igbo society, no member of the community is permitted to eat harvested yams from the new season until the official Iri Ji ceremony has concluded.',
      'A man\'s wealth and leadership status was historically measured by the height and size of his yam barn (Oba).'
    ],
    popularityScore: 92,
    latitude: 6.5244,
    longitude: 3.3792,
    weatherProfile: {
      tempCelsius: '24°C - 30°C',
      tempFahrenheit: '75°F - 86°F',
      climate: 'Warm Tropical Monsoon',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-August in Enugu, Anambra, or Owerri for traditional royal palace festivals.',
      recommendedPacking: ['Breathable cotton African print attire (Ankara/Isiagu)', 'Insect repellent', 'Comfortable sandals']
    },
    festivePeak: {
      peakDays: 'August 15 - 18',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Palace of the Obi of Onitsha or community village square in Enugu',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'igbo-isiagu-drum',
      name: 'Royal Igbo Isiagu Stool & Ekwe Drum',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.1,
      description: 'Hand-carved wooden slit gong drum resting on a ceremonial royal lion-headed Isiagu textile.'
    }
  },
  {
    id: 'fete-du-vodoun-benin',
    name: 'Fête du Vodoun (National Voodoo Day)',
    localName: 'Fête du Vodoun',
    date: '2027-01-10',
    month: 1,
    day: 10,
    country: 'Benin',
    countryCode: 'BJ',
    category: 'cultural',
    description: 'An official national holiday in Benin celebrating the ancestral religion of Vodun (Voodoo), tracing back over 10,000 years. Centered in the coastal spiritual capital of Ouidah, devotees gather on beaches and sacred shrines for trance drumming, ancestral invocations, and masquerade blessings.',
    traditions: [
      'Blessing rituals by the Supreme Spiritual Chief (Daagbo Hounon Houna II) at the Temple of Pythons',
      'The dance of the Zangbeto: Towering conical hay spirits that spin rapidly as spiritual night watchmen',
      'The arrival of the Egungun masqueraders representing reincarnated royal ancestors clothed in glittering patchwork silk',
      'Offerings of gin, cowrie shells, and palm oil at the Gate of No Return beach memorial'
    ],
    greeting: 'Bonne Fête du Vodoun! / Ku do Vodun zān!',
    foodDelicacies: ['Amiwo (Spiced Red Cornmeal Paste with Smoked Fish)', 'Aloko (Fried Sweet Plantains)', 'Akassa with Gboma Dessi (Spinach & Crab Stew)', 'Sodabi (Distilled Palm Spirit)'],
    bannerUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Benin', 'Vodun', 'Voodoo', 'Zangbeto', 'West Africa', 'Spiritual Heritage'],
    facts: [
      'Benin was the first country in the world to declare an official national public holiday honoring traditional indigenous African religions in 1996.',
      'Contrary to Hollywood folklore, authentic Vodun is centered on healing, herbal medicine, deep reverence for natural spirits (earth, water, wind, thunder), and ancestral guidance.'
    ],
    popularityScore: 91,
    latitude: 6.3631,
    longitude: 2.0850,
    weatherProfile: {
      tempCelsius: '26°C - 33°C',
      tempFahrenheit: '79°F - 91°F',
      climate: 'Tropical Dry Season - Warm Coastal Sunshine',
      rainRisk: 'Low',
      bestTravelWindow: 'Early January for optimal dry weather and peaceful coastal beach strolls.',
      recommendedPacking: ['Lightweight linen clothing', 'High SPF sunscreen', 'Sturdy walking shoes for sacred forest trails']
    },
    festivePeak: {
      peakDays: 'January 10 (National Festival Day)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The beach sands surrounding the Gate of No Return in Ouidah',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'benin-zangbeto-spirit',
      name: 'Spiritual Zangbeto Straw Masquerade',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.3,
      description: 'Spinning sacred straw cone of the Zangbeto night guardian, sparkling with cowrie shell talismans and amber firelight.'
    }
  },

  // ==========================================
  // AMERICAS & CARIBBEAN
  // ==========================================
  {
    id: 'inti-raymi-sun-festival-cuzco',
    name: 'Inti Raymi (Inca Festival of the Sun)',
    localName: 'Inti Raymi',
    date: '2026-06-24',
    month: 6,
    day: 24,
    country: 'Peru (Cusco)',
    countryCode: 'PE',
    category: 'cultural',
    description: 'The monumental Inca festival celebrating the winter solstice and the Sun God Inti in the imperial capital of Cusco. Hundreds of Quechua actors in gold headdresses and woven textiles reenact the ancient winter solstice rituals at the monumental fortress of Sacsayhuamán.',
    traditions: [
      'The ceremonial greeting to the morning sun at the Temple of the Sun (Qorikancha)',
      'The imperial procession of the Sapa Inca and the Coya (Empress) on gilded golden litters',
      'The sacred llama sacrifice and blessing with fermented chicha de jora corn beer',
      'Chanting ancient Quechua hymns and lighting the new sacred solar fire with curved gold mirrors'
    ],
    greeting: '¡Kusikuypuni Inti Raymipi! (¡Feliz Inti Raymi!)',
    foodDelicacies: ['Chiri Uchu (Traditional Cold Festive Platter with Roasted Guinea Pig, Jerky, Corn)', 'Tamales Cusqueños', 'Chicha Morada (Spiced Purple Corn Drink)', 'Pachamanca Underground Roast'],
    bannerUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    tags: ['Inti Raymi', 'Inca', 'Peru', 'Cusco', 'Solstice', 'Sacsayhuaman', 'Andes'],
    facts: [
      'Instituted around 1412 by the ninth Inca ruler, Pachacuti, as the most important religious ceremony of the Tawantinsuyu empire.',
      'The ceremony is conducted entirely in the original imperial Quechua language.'
    ],
    popularityScore: 97,
    latitude: -13.5319,
    longitude: -71.9675,
    weatherProfile: {
      tempCelsius: '2°C - 20°C',
      tempFahrenheit: '35°F - 68°F',
      climate: 'Crisp Andean Winter - Piercing Sunshine & Freezing Nights',
      rainRisk: 'Low',
      bestTravelWindow: 'Late June for the clearest skies of the year in Cusco and Machu Picchu.',
      recommendedPacking: ['Alpaca wool sweater & thermal jacket for frosty nights', 'Sunblock & UV sunglasses (3,400m altitude)', 'Coca tea or altitude medication']
    },
    festivePeak: {
      peakDays: 'June 24 (Solstice Reenactment)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Grandstands at the megalithic fortress of Sacsayhuamán',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'inca-golden-sun-disc',
      name: 'Gilded Inca Inti Sun Disc',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.3,
      description: 'Radiant golden solar medallion adorned with turquoise beads and flaming sun rays.'
    }
  },
  {
    id: 'mardi-gras-new-orleans',
    name: 'Mardi Gras (Fat Tuesday Carnival)',
    localName: 'Mardi Gras',
    date: '2027-02-09',
    month: 2,
    day: 9,
    country: 'United States (Louisiana)',
    countryCode: 'US',
    category: 'cultural',
    description: 'The world-famous carnival of New Orleans culminating on Fat Tuesday before Ash Wednesday, packed with legendary super-krewes parading towering illuminated floats, marching brass bands, bead throws, and flamboyant costume masquerades.',
    traditions: [
      'Catching beaded necklaces, painted coconuts (Zulu), and doubloons thrown from double-decker floats',
      'The Black Masking Indians (Mardi Gras Indians) showcasing hand-beaded feathered suits that take an entire year to stitch',
      'Sharing circular braided King Cake with purple, green, and gold sugar, looking for the lucky plastic baby inside',
      'Second-line brass band street parades dancing through the French Quarter and Tremé'
    ],
    greeting: 'Laissez les bons temps rouler! (Let the good times roll!)',
    foodDelicacies: ['Cinnamon Pecan King Cake', 'Seafood & Andouille Gumbo', 'Crawfish Boil with Corn & Potatoes', 'Warm Powdered Sugar Beignets', 'Jambalaya'],
    bannerUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mardi Gras', 'New Orleans', 'Carnival', 'Fat Tuesday', 'Jazz', 'King Cake'],
    facts: [
      'The official colors chosen in 1892 carry specific symbolic meanings: Purple represents Justice, Green represents Faith, and Gold represents Power.',
      'By Louisiana state law, all float riders in New Orleans are legally required to wear a mask during the parade.'
    ],
    popularityScore: 98,
    latitude: 29.9511,
    longitude: -90.0715,
    weatherProfile: {
      tempCelsius: '11°C - 20°C',
      tempFahrenheit: '52°F - 68°F',
      climate: 'Mild Southern Winter - Breezy & Festive',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Friday through Tuesday of Carnival week for all major Super-Krewe parades (Bacchus, Orpheus, Endymion, Rex).',
      recommendedPacking: ['Comfortable walking shoes', 'Layered jackets for variable evening weather', 'Tote bag for parade throws and beads']
    },
    festivePeak: {
      peakDays: 'February 6 - 9 (Fat Tuesday)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'Very High',
      bestViewingSpot: 'St. Charles Avenue parade route in the Garden District',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'mardi-gras-jester-mask',
      name: 'Purple, Green & Gold Mardi Gras Headdress',
      modelType: 'feathered_mask',
      festiveAuraColor: '#a855f7',
      scaleDefault: 1.2,
      description: 'Lustrous carnival mask adorned with metallic emerald, violet, and gold plumage and jester bells.'
    }
  },
  {
    id: 'trinidad-tobago-carnival',
    name: 'Trinidad & Tobago Carnival (The Mother of All Carnivals)',
    localName: 'Trinidad Carnival',
    date: '2027-02-08',
    month: 2,
    day: 8,
    country: 'Trinidad and Tobago',
    countryCode: 'TT',
    category: 'cultural',
    description: 'The explosive Caribbean carnival renowned worldwide as the greatest street party on earth. Fuelled by relentless Soca and Calypso music, the thunder of steelpans, mud-drenched pre-dawn J\'ouvert revelry, and thousands of masqueraders crossing the stage in dazzling bikini-and-beads costumes.',
    traditions: [
      'J\'ouvert: Pre-dawn street parade of mud, paint, chocolate, and oil symbolizing liberation and primal joy',
      'Panorama: The ultimate international steelpan championship where 100-piece orchestras compete fiercely',
      '"Playing Mas": Thousands jumping up behind gigantic multi-ton music trucks in bead-and-feather regalia',
      'The Dimanche Gras extravaganza crowning the King and Queen of Carnival with 30-foot wire-sculpted costumes'
    ],
    greeting: 'Happy Carnival! See you on the road!',
    foodDelicacies: ['Doubles (Spiced Chickpeas on Fried Flatbread with Pepper Sauce)', 'Roti with Curried Goat', 'Corn Soup', 'Pelau (Caramelized Chicken & Pigeon Peas Rice)', 'Shark and Bake at Maracas Beach'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Carnival', 'Trinidad', 'Soca', 'Steeldrum', 'Jouvert', 'Caribbean'],
    facts: [
      'The steelpan, invented in Trinidad in the 1930s from discarded oil drums, is the only major acoustic musical instrument invented in the 20th century.',
      'Carnival evolved as an act of resistance by enslaved Africans who transformed European masquerade balls into expressions of freedom following emancipation in 1838.'
    ],
    popularityScore: 97,
    latitude: 10.6549,
    longitude: -61.5019,
    weatherProfile: {
      tempCelsius: '24°C - 31°C',
      tempFahrenheit: '75°F - 88°F',
      climate: 'Tropical Caribbean Dry Season',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-February for Panorama finals through Carnival Tuesday.',
      recommendedPacking: ['Sneakers you do not mind discarding after J\'ouvert', 'Sunscreen & hydration canteen', 'Glitter & vibrant festival wear']
    },
    festivePeak: {
      peakDays: 'February 8 (J\'ouvert & Carnival Monday) & February 9 (Carnival Tuesday)',
      peakTimeOfDay: 'All-Day',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Queen’s Park Savannah stage in Port of Spain',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'trinidad-steelpan-feathers',
      name: 'Chromatic Steelpan & Carnival Plumage',
      modelType: 'feathered_mask',
      festiveAuraColor: '#06b6d4',
      scaleDefault: 1.2,
      description: 'Gleaming chromed steelpan drum encircled by towering tropical turquoise and canary yellow ostrich plumes.'
    }
  },
  {
    id: 'junkanoo-bahamas',
    name: 'Junkanoo Street Festival (Boxing Day & New Year)',
    localName: 'Junkanoo',
    date: '2026-12-26',
    month: 12,
    day: 26,
    country: 'The Bahamas',
    countryCode: 'BS',
    category: 'cultural',
    description: 'The exhilarating national street festival of The Bahamas held on Boxing Day and New Year\'s Day. Starting at 2:00 AM, rival groups of thousands parade through downtown Nassau with colossal crepe-paper costumes, cowbells, brass horns, and goatskin drums.',
    traditions: [
      'The thunderous beat of handcrafted goatskin drums heated over open kerosene lamps to tighten the hides',
      'Continuous rhythmic clanging of heavy brass cowbells (kalik-kalik-kalik)',
      'Displaying monumental 20-foot-tall costumes crafted with painstaking precision from layers of fringed crepe paper',
      'Judging and fierce competition between legendary groups like the Valley Boys, Saxons, and Roots'
    ],
    greeting: 'Happy Junkanoo! Rush on!',
    foodDelicacies: ['Bahamian Conch Salad with Lime & Goat Pepper', 'Cracked Conch', 'Guava Duff with Warm Rum Sauce', 'Peas \'n Rice', 'Switcha (Fresh Limeade)'],
    bannerUrl: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?auto=format&fit=crop&w=1200&q=80',
    tags: ['Junkanoo', 'Bahamas', 'Boxing Day', 'Crepe Paper', 'Goatskin Drums', 'Nassau'],
    facts: [
      'Named in honor of John Canoe, an 18th-century West African prince and warrior who outwitted European invaders on the Gold Coast.',
      'Junkanoo costumes take an entire year to construct by secret group workshops using solely cardboard, aluminum wire, glue, and hand-fringed paper.'
    ],
    popularityScore: 94,
    latitude: 25.0443,
    longitude: -77.3504,
    weatherProfile: {
      tempCelsius: '20°C - 26°C',
      tempFahrenheit: '68°F - 79°F',
      climate: 'Ideal Warm Island Winter - Gentle Trade Winds',
      rainRisk: 'Low',
      bestTravelWindow: 'Late December around Christmas and New Year in downtown Nassau.',
      recommendedPacking: ['Light sweater for breezy 3:00 AM parade start', 'Earplugs if sensitive to 1,000 cowbells', 'Bleacher seat cushions']
    },
    festivePeak: {
      peakDays: 'December 26 (2:00 AM - 10:00 AM) & January 1',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Bay Street bleachers in downtown Nassau',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'junkanoo-cowbell-headdress',
      name: 'Bahamian Junkanoo Cowbells & Headdress',
      modelType: 'feathered_mask',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.2,
      description: 'Pair of brass Junkanoo cowbells accented with fringed kaleidoscopic paper feathers.'
    }
  }
];
