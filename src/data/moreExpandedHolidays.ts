import { Holiday } from '../types';

export const MORE_GLOBAL_HOLIDAYS: Holiday[] = [
  // ==========================================
  // LATIN AMERICA & CARIBBEAN
  // ==========================================
  {
    id: 'festa-junina-brazil',
    name: 'Festa Junina (Saint John June Bonfire Festival)',
    localName: 'Festa Junina (São João)',
    date: '2026-06-24',
    month: 6,
    day: 24,
    country: 'Brazil',
    countryCode: 'BR',
    category: 'cultural',
    description: 'Brazil\'s joyous winter harvest celebration commemorating Saints John, Peter, and Anthony. Second only to Carnival in scale, millions dance the traditional Quadrilha in countryside plaid attire around massive bonfires with accordion forró music.',
    traditions: [
      'Dancing the lively Quadrilha square dance dressed in straw hats and painted freckles',
      'Gathering around monumental wooden bonfires (fogueiras) illuminating town squares',
      'Decking streets with miles of colorful paper flags (bandeirinhas) and paper lanterns',
      'Fairground games like Correio Elegante (romantic love telegrams) and fishing booths'
    ],
    greeting: 'Viva São João! Viva Festa Junina!',
    foodDelicacies: ['Pamonha (Sweet Fresh Corn Paste in Husk)', 'Canjica (Sweet White Corn Pudding)', 'Quentão (Hot Spiced Cachaça Punch)', 'Bolo de Fubá (Cornmeal Cake)', 'Pé de Moleque (Peanut Brittle)'],
    bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Festa Junina', 'Brazil', 'Sao Joao', 'Quadrilha', 'Bonfire', 'Forro'],
    facts: [
      'The largest Festa Junina in the world is held in Campina Grande, Paraíba, spanning a full 30 days of non-stop forró concerts.',
      'Corn is the culinary heart of Festa Junina because the festival coincides with the major corn harvest in northeastern Brazil.'
    ],
    popularityScore: 96,
    latitude: -7.2247,
    longitude: -35.8866,
    weatherProfile: {
      tempCelsius: '20°C - 27°C',
      tempFahrenheit: '68°F - 80°F',
      climate: 'Pleasant Tropical Winter - Breezy & Clear',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-to-late June in northeastern Brazil (Caruaru or Campina Grande).',
      recommendedPacking: ['Checkered flannel shirt', 'Straw hat', 'Comfortable dancing boots for forró']
    },
    festivePeak: {
      peakDays: 'June 23 (São João Eve) & June 24',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Parque do Povo in Campina Grande, Paraíba',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'festa-junina-lantern',
      name: 'Festa Junina Paper Balloon & Bonfire',
      modelType: 'lantern',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.1,
      description: 'Lustrous multicolored paper lantern floating above glowing crackling firewood embers.'
    }
  },
  {
    id: 'dia-de-la-independencia-mexico',
    name: 'Mexican Independence Day (El Grito de Dolores)',
    localName: 'Día de la Independencia (El Grito)',
    date: '2026-09-16',
    month: 9,
    day: 16,
    country: 'Mexico',
    countryCode: 'MX',
    category: 'national',
    description: 'Mexico\'s most patriotic holiday commemorating Father Miguel Hidalgo\'s 1810 cry for freedom in the town of Dolores. At 11:00 PM on September 15, the President rings the historic liberty bell on the balcony of the National Palace and shouts "¡Viva México!" to half a million citizens.',
    traditions: [
      'El Grito: Hundreds of thousands chanting "¡Viva México!" as confetti and fireworks explode over the Zócalo',
      'Mariachi brass bands playing timeless rancheras like "Cielito Lindo" and "El Rey"',
      'Decking homes and plazas in green, white, and red tricolor banners and streamers',
      'Sipping tequila and mezcal toasts accompanied by patriotic culinary feasts'
    ],
    greeting: '¡Viva México! ¡Viva la Independencia!',
    foodDelicacies: ['Chiles en Nogada (Poblano Chiles with Walnut Cream & Pomegranate)', 'Pozole Rojo with Shredded Pork', 'Tamales Oaxaqueños', 'Tostadas de Tinga'],
    bannerUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mexico', 'El Grito', 'Independence', 'Mariachi', 'Zocalo', 'National Holiday'],
    facts: [
      'Contrary to common international confusion, Cinco de Mayo is not Mexican Independence Day; September 16 is Mexico\'s true national day.',
      'Chiles en Nogada was created by Augustinian nuns in Puebla in 1821 to honor military leader Agustín de Iturbide, incorporating the three colors of the Mexican flag: green poblano, white cream, red pomegranate.'
    ],
    popularityScore: 98,
    latitude: 19.4326,
    longitude: -99.1332,
    weatherProfile: {
      tempCelsius: '13°C - 23°C',
      tempFahrenheit: '55°F - 73°F',
      climate: 'Crisp Highland Autumn - Evening Rain Showers',
      rainRisk: 'Moderate',
      bestTravelWindow: 'September 14 - 17 in Mexico City or San Miguel de Allende.',
      recommendedPacking: ['Light waterproof jacket for evening drizzle', 'Festive green, white, or red attire', 'Ear protection for Zócalo fireworks']
    },
    festivePeak: {
      peakDays: 'September 15 (11:00 PM El Grito) & September 16 (Military Parade)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Very High',
      bestViewingSpot: 'The Zócalo (Plaza de la Constitución) in Mexico City',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'mexican-liberty-bell',
      name: 'Campana de Dolores Liberty Bell',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#10b981',
      scaleDefault: 1.1,
      description: 'Bronze national liberty bell wrapped in the tricolor green, white, and red Mexican ribbon.'
    }
  },
  {
    id: 'barranquilla-carnival-colombia',
    name: 'Carnaval de Barranquilla (Golden Caribbean Carnival)',
    localName: 'Carnaval de Barranquilla',
    date: '2027-02-06',
    month: 2,
    day: 6,
    country: 'Colombia',
    countryCode: 'CO',
    category: 'cultural',
    description: 'Colombia\'s most vital cultural celebration and UNESCO Masterpiece of Oral and Intangible Heritage. Four days of nonstop Caribbean rhythms, cumbia dancing, the Battle of Flowers parade, and the whimsical antics of Marimonda and Son de Negro characters.',
    traditions: [
      'La Batalla de Flores (Battle of Flowers): Six-hour opening parade with flower-encrusted floats and Cumbia troupes',
      'The Marimonda: Unique native Barranquilla character with an elephant trunk, big ears, and backwards jacket mocking authority',
      'Danza de los Congos and Danza del Garabato depicting the timeless battle between life and death',
      'The Burial of Joselito Carnaval on Tuesday marking the tearful end of the festivities'
    ],
    greeting: '¡Quien lo vive es quien lo goza! (Those who live it enjoy it!)',
    foodDelicacies: ['Arepa de Huevo (Deep-Fried Corn Pocket with Egg & Meat)', 'Sancocho Trifásico Stew', 'Arroz de Lisa (Mullet Fish Rice in Bijao Leaves)', 'Carimañolas (Yucca Fritters)'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Barranquilla', 'Colombia', 'Carnaval', 'Cumbia', 'UNESCO', 'Caribbean'],
    facts: [
      'Proclaimed a UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity in 2003.',
      'The city\'s famous slogan proclaims: "Quien lo vive es quien lo goza" (He who lives it is he who enjoys it).'
    ],
    popularityScore: 95,
    latitude: 10.9685,
    longitude: -74.7813,
    weatherProfile: {
      tempCelsius: '25°C - 32°C',
      tempFahrenheit: '77°F - 90°F',
      climate: 'Tropical Caribbean Heat with Refreshing Trade Winds',
      rainRisk: 'Low',
      bestTravelWindow: 'Early February for Friday night Guacherna through Fat Tuesday.',
      recommendedPacking: ['Light tropical clothing', 'Cornstarch flour protection / sunglasses', 'Comfortable sneakers for dancing']
    },
    festivePeak: {
      peakDays: 'February 6 (Battle of Flowers) & February 7 (Great Parade)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Vía 40 bleachers (Palcos) along the river corridor',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'marimonda-mask-colombia',
      name: 'Barranquilla Marimonda Headdress',
      modelType: 'feathered_mask',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.2,
      description: 'Lively Colombian Marimonda mask with elongated trunk, neon satin ears, and swinging tie.'
    }
  },
  {
    id: 'festival-de-las-flores-medellin',
    name: 'Feria de las Flores (Medellín Flower Fair)',
    localName: 'Feria de las Flores',
    date: '2026-08-01',
    month: 8,
    day: 1,
    country: 'Colombia (Medellín)',
    countryCode: 'CO',
    category: 'cultural',
    description: 'Medellín\'s signature ten-day flower festival in the "City of Eternal Spring", honoring the generational silleteros (peasant flower farmers) who march through the city carrying 80-kilogram floral mosaic tapestries strapped to their foreheads.',
    traditions: [
      'Desfile de Silleteros: 500 farmers carrying massive circular wooden silhouettes adorned with over 80 species of fresh flowers',
      'Visiting the mountain village of Santa Elena to watch flower farmers weave their intricate silletas through the night',
      'The Classic and Antique Car Parade with over 300 pristine vintage vehicles',
      'Chiva bus concerts packed with brass bands touring illuminated city avenues'
    ],
    greeting: '¡Feliz Feria de las Flores! ¡Viva Santa Elena!',
    foodDelicacies: ['Bandeja Paisa (Beans, Rice, Chicharrón, Chorizo, Fried Egg, Avocado)', 'Arepas de Choclo with Quesito', 'Empanadas Antioqueñas', 'Aguardiente Antioqueño'],
    bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Medellin', 'Flower Fair', 'Silleteros', 'Colombia', 'Floral Art', 'Spring'],
    facts: [
      'The tradition began in 1957; historically, peasant farmers carried goods and even elderly family members on wooden silletero chairs on their backs down steep Andean trails.',
      'A single monumental silleta can weigh over 80 kilograms (175 pounds) and contain more than 15,000 individual blossoms.'
    ],
    popularityScore: 94,
    latitude: 6.2442,
    longitude: -75.5812,
    weatherProfile: {
      tempCelsius: '17°C - 27°C',
      tempFahrenheit: '62°F - 80°F',
      climate: 'City of Eternal Spring - Perfect Temperate Warmth',
      rainRisk: 'Low',
      bestTravelWindow: 'Early August for the Silleteros parade and Santa Elena farm tours.',
      recommendedPacking: ['Light breathable layers', 'Comfortable walking shoes for steep mountain farms', 'Hat for daytime sun']
    },
    festivePeak: {
      peakDays: 'August 8 - 10 (Silleteros Parade Finale)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Avenida del Río grandstands or a rustic farm finca in Santa Elena',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'silletero-flower-disc',
      name: 'Monumental Silletero Floral Tapestry',
      modelType: 'golden_lotus',
      festiveAuraColor: '#ec4899',
      scaleDefault: 1.3,
      description: 'Gigantic circular wooden silleta woven with thousands of vibrant orchids, lilies, heliconias, and marigolds.'
    }
  },

  // ==========================================
  // EUROPE & MEDITERRANEAN
  // ==========================================
  {
    id: 'las-fallas-valencia',
    name: 'Las Fallas (Festival of Fire & Monumental Sculptures)',
    localName: 'Las Fallas de Valencia',
    date: '2027-03-15',
    month: 3,
    day: 15,
    country: 'Spain (Valencia)',
    countryCode: 'ES',
    category: 'cultural',
    description: 'An explosive five-day celebration in Valencia honoring Saint Joseph. Over 750 monumental satirical papier-mâché sculptures (fallas) up to five stories tall fill every neighborhood, culminating on the final night (La Cremà) when all of them are burned to ashes in roaring infernos.',
    traditions: [
      'La Mascletà: Daily 2:00 PM earth-shattering rhythmic gunpowder explosion concerts in Plaza del Ayuntamiento',
      'La Cremà: Midnight burning of all 750 multi-million-euro monuments in giant neighborhood bonfires',
      'L\'Ofrena de Flors: Two-day emotional floral offering creating a 15-meter-tall gown of fresh flowers for the Virgin',
      'Despertà: Neighborhood brass bands marching at 8:00 AM throwing firecrackers (trons de bac) to wake the city'
    ],
    greeting: '¡Bones Falles! ¡Visca València!',
    foodDelicacies: ['Buñuelos de Calabaza (Pumpkin Fritters) dipped in Hot Thick Chocolate', 'Authentic Paella Valenciana cooked over orange wood', 'Horchata de Chufa'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Las Fallas', 'Valencia', 'Spain', 'Fire Festival', 'UNESCO', 'Mascleta'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2016.',
      'The public votes for one single figure (the Ninot Indultat) to be saved from the flames each year and preserved in the Fallero Museum.'
    ],
    popularityScore: 97,
    latitude: 39.4699,
    longitude: -0.3763,
    weatherProfile: {
      tempCelsius: '11°C - 21°C',
      tempFahrenheit: '52°F - 70°F',
      climate: 'Glorious Mediterranean Early Spring',
      rainRisk: 'Low',
      bestTravelWindow: 'March 15 - 19; book central Valencia hotels 6 months in advance.',
      recommendedPacking: ['Comfortable sneakers for walking 20km exploring neighborhood fallas', 'Earplugs for daily 2:00 PM Mascletà']
    },
    festivePeak: {
      peakDays: 'March 18 (Nit del Foc Fireworks) & March 19 (La Cremà Midnight Burning)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Plaza del Ayuntamiento or Plaza del Pilar for monument burnings',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'fallas-fire-ninot',
      name: 'Flamboyant Fallas Ninot & Sparklers',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.2,
      description: 'Hand-painted satirical Valencian sculpture glowing in golden embers with erupting roman candles.'
    }
  },
  {
    id: 'castells-human-towers-catalonia',
    name: 'Concurs de Castells (Catalan Human Towers Championship)',
    localName: 'Concurs de Castells',
    date: '2026-10-03',
    month: 10,
    day: 3,
    country: 'Spain (Catalonia)',
    countryCode: 'ES',
    category: 'cultural',
    description: 'The breathtaking biennial competition of human towers (Castells) in the Roman amphitheater of Tarragona. Teams (colles) of up to 500 members construct awe-inspiring human castles up to ten stories high, crowned by a tiny child who raises their hand at the summit.',
    traditions: [
      'The Pinya: Hundreds of team members packing tightly together in a dense human foundation ring to absorb shock',
      'The Enxaneta: A courageous child climber (wearing a padded helmet) who scrambles to the 10th tier and raises four fingers (l\'aleta)',
      'The Gralles and Timbal: Traditional double-reed oboes and drums playing the hypnotic Toc de Castells cadence',
      'Descarregar: Successfully deconstructing the tower without falling—the ultimate test of balance and mutual trust'
    ],
    greeting: '¡Força, equilibri, valor i seny! (Strength, balance, courage and wisdom!)',
    foodDelicacies: ['Calçots with Romesco Sauce', 'Pa amb Tomàquet with Fuet Sausage', 'Crema Catalana', 'Cava Sparkling Wine'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Castells', 'Human Towers', 'Catalonia', 'Tarragona', 'UNESCO', 'Teamwork'],
    facts: [
      'Recognized by UNESCO as a Masterpiece of the Oral and Intangible Heritage of Humanity in 2010.',
      'The traditional motto of the castellers embodies four core virtues: Força (Strength), Equilibri (Balance), Valor (Courage), and Seny (Wisdom).'
    ],
    popularityScore: 93,
    latitude: 41.1189,
    longitude: 1.2445,
    weatherProfile: {
      tempCelsius: '16°C - 24°C',
      tempFahrenheit: '61°F - 75°F',
      climate: 'Mild Golden Mediterranean Autumn',
      rainRisk: 'Low',
      bestTravelWindow: 'First weekend of October in Tarragona or late August in Vilafranca del Penedès.',
      recommendedPacking: ['Light windbreaker', 'Binoculars for viewing top tiers from arena seats', 'Comfortable footwear']
    },
    festivePeak: {
      peakDays: 'October 3 - 4',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Tarraco Arena Plaça (historic converted bullring) in Tarragona',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'casteller-faixa-sash',
      name: 'Casteller Black Faixa & Neckerchief',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#ef4444',
      scaleDefault: 1.0,
      description: 'Traditional wool supportive sash (faixa) wrapped around white trousers with a red bandana with white polka dots.'
    }
  },
  {
    id: 'bastille-day-france',
    name: 'Bastille Day (French National Day / La Fête Nationale)',
    localName: 'Le 14 Juillet (La Fête Nationale)',
    date: '2026-07-14',
    month: 7,
    day: 14,
    country: 'France',
    countryCode: 'FR',
    category: 'national',
    description: 'France\'s national celebration commemorating the storming of the Bastille prison in 1789 and the 1790 Fête de la Fédération. Celebrated with the historic military parade down the Champs-Élysées, festive fire station dance balls (Bals des Pompiers), and breathtaking fireworks over the Eiffel Tower.',
    traditions: [
      'The Military Parade: The French Armed Forces and Patrouille de France jet flyover trailing blue, white, and red smoke',
      'Bals des Pompiers: Fire stations across Paris throwing open their gates for public music and dancing through the night',
      'The Eiffel Tower Fireworks: A 30-minute world-class pyrotechnic and classical concert on the Champ de Mars',
      'Champagne picnics in city parks and riverside quays along the Seine'
    ],
    greeting: 'Bonne Fête Nationale! Vive la France!',
    foodDelicacies: ['Baguette with Camembert & Saucisson Sec', 'Gougeres (Gruyère Cheese Puffs)', 'Crêpes Suzette', 'Fresh Oysters with Mignonette', 'Chilled Rosé Wine from Provence'],
    bannerUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bastille Day', 'France', 'Paris', 'Eiffel Tower', 'Fireworks', 'National Holiday'],
    facts: [
      'The military parade on the Champs-Élysées has been held on July 14 almost uninterrupted since 1880, making it the oldest regular military parade in the world.',
      'The French do not call it "Bastille Day"—they simply refer to it as "Le 14 Juillet" (The 14th of July) or "La Fête Nationale".'
    ],
    popularityScore: 98,
    latitude: 48.8566,
    longitude: 2.3522,
    weatherProfile: {
      tempCelsius: '19°C - 29°C',
      tempFahrenheit: '66°F - 84°F',
      climate: 'Warm Parisian Summer Sun',
      rainRisk: 'Low',
      bestTravelWindow: 'July 13 - 15 in Paris to enjoy firehouse balls on the 13th and fireworks on the 14th.',
      recommendedPacking: ['Picnic blanket for the Champ de Mars or Seine banks', 'Sun hat & sunscreen', 'Comfortable walking sandals']
    },
    festivePeak: {
      peakDays: 'July 14 (10:00 AM Parade & 11:00 PM Fireworks)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Pont de Bir-Hakeim, Pont de l\'Alma, or Champ de Mars in Paris',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'eiffel-tricolore-sparks',
      name: 'Luminous Eiffel Tower & Tricolore Fireworks',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#3b82f6',
      scaleDefault: 1.3,
      description: 'Luminous miniature Eiffel Tower erupting with glittering blue, white, and red fireworks.'
    }
  },
  {
    id: 'fete-de-la-musique-world-music-day',
    name: 'Fête de la Musique (World Music Day)',
    localName: 'Fête de la Musique',
    date: '2026-06-21',
    month: 6,
    day: 21,
    country: 'France & Over 120 Countries Worldwide',
    countryCode: 'FR',
    category: 'cultural',
    description: 'An extraordinary global music celebration born in France on the summer solstice in 1982. On this day, all music is free and open to everyone: amateur and professional musicians are invited to perform on street corners, plazas, bridges, rooftops, and balconies without permits.',
    traditions: [
      'Street performances on every corner spanning jazz, electronic techno, classical quartets, rock, and African drumming',
      'All outdoor musical performances must be completely free and accessible to the public by law',
      'Wandering from neighborhood to neighborhood until 4:00 AM following acoustic and amplified soundscapes',
      'Spontaneous public dancing in historic squares and beside canal banks'
    ],
    greeting: 'Faites de la musique, Fête de la Musique!',
    foodDelicacies: ['Street Crepes with Nutella', 'Falafel in the Marais', 'Craft Beer on Tap', 'Charcuterie Boards', 'Fresh Croissants at Dawn'],
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    tags: ['World Music Day', 'Fete de la Musique', 'Paris', 'Free Concerts', 'Summer Solstice'],
    facts: [
      'Conceived in 1982 by French Minister of Culture Jack Lang and composer Maurice Fleuret with the slogan: "Faites de la musique, Fête de la Musique" (Make music, celebrate music).',
      'Now officially observed in over 1,000 cities across 120 countries on five continents every June 21.'
    ],
    popularityScore: 95,
    latitude: 48.8566,
    longitude: 2.3522,
    weatherProfile: {
      tempCelsius: '17°C - 26°C',
      tempFahrenheit: '62°F - 79°F',
      climate: 'Summer Solstice - Longest Daylight of the Year',
      rainRisk: 'Low',
      bestTravelWindow: 'June 20 - 22 in Paris, Berlin, or Lyon.',
      recommendedPacking: ['Comfortable sneakers for 8 hours of street roaming', 'Portable phone charger', 'Light jacket for after-midnight breezes']
    },
    festivePeak: {
      peakDays: 'June 21 (6:00 PM to 3:00 AM)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Canal Saint-Martin, Place de la République, and Montmartre steps in Paris',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'fete-musique-notes',
      name: 'Glowing Acoustic Guitar & Musical Clef',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#8b5cf6',
      scaleDefault: 1.1,
      description: 'Luminous wooden guitar encircled by floating neon musical notes and treble clefs.'
    }
  },
  {
    id: 'kings-day-koningsdag-netherlands',
    name: 'King\'s Day (Koningsdag / The Orange Street Carnival)',
    localName: 'Koningsdag',
    date: '2026-04-27',
    month: 4,
    day: 27,
    country: 'Netherlands',
    countryCode: 'NL',
    category: 'national',
    description: 'The national birthday celebration of King Willem-Alexander where the entire nation of the Netherlands erupts into a sea of neon orange ("Oranjegekte"). Canals in Amsterdam jam with thousands of party boats, every street becomes a free flea market (vrijmarkt), and live DJ stages pulse in public squares.',
    traditions: [
      'Oranjegekte (Orange Craziness): Wearing head-to-toe bright orange clothes, wigs, hats, and face paint',
      'The Vrijmarkt (Free Market): Anyone is permitted to set up a sidewalk blanket to sell secondhand treasures or homemade treats without a license or paying tax',
      'Amsterdam canal boat parties: Thousands of decorated boats playing music and navigating the historic Grachtengordel',
      'King\'s Night (Koningsnacht): Massive street and club parties across the country on the evening before King\'s Day'
    ],
    greeting: 'Fijne Koningsdag! Lang leve de Koning! (Long live the King!)',
    foodDelicacies: ['Tompouce Pastry with Bright Orange Icing', 'Bitterballen with Spicy Mustard', 'Herring with Diced Onions (Haring)', 'Poffertjes (Mini Yeast Pancakes with Butter & Powdered Sugar)', 'Orange Bitter Liqueur'],
    bannerUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kings Day', 'Koningsdag', 'Netherlands', 'Amsterdam', 'Orange', 'Street Party'],
    facts: [
      'Bakeries across the Netherlands report selling over 600% more Tompouce pastries on King\'s Day than on any other day of the year, all topped with special orange fondant.',
      'The Dutch royal family belongs to the House of Orange-Nassau, which is why orange is the beloved national sporting and festive color despite not appearing on the red-white-blue flag.'
    ],
    popularityScore: 97,
    latitude: 52.3676,
    longitude: 4.9041,
    weatherProfile: {
      tempCelsius: '9°C - 16°C',
      tempFahrenheit: '48°F - 61°F',
      climate: 'Crisp Dutch Spring - Tulip Season in Full Bloom',
      rainRisk: 'Moderate',
      bestTravelWindow: 'April 26 - 28 in Amsterdam, Utrecht, or The Hague; visit Keukenhof tulip gardens the day after.',
      recommendedPacking: ['Bright orange clothing (essential!)', 'Small euro coins for children\'s games in the Vrijmarkt', 'Comfortable waterproof shoes']
    },
    festivePeak: {
      peakDays: 'April 26 (King\'s Night) & April 27 (King\'s Day)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Prinsengracht and Keizersgracht bridges or Vondelpark in Amsterdam',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'dutch-orange-crown',
      name: 'Regal Dutch Orange Crown & Tulip',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.1,
      description: 'Gleaming golden royal crown draped with Dutch orange velvet and flanked by blooming orange tulips.'
    }
  },
  {
    id: 'up-helly-aa-shetland',
    name: 'Up Helly Aa (Shetland Viking Fire Festival)',
    localName: 'Up Helly Aa',
    date: '2027-01-26',
    month: 1,
    day: 26,
    country: 'Scotland (Shetland Islands)',
    countryCode: 'GB',
    category: 'cultural',
    description: 'Europe\'s largest fire festival held in Lerwick, Shetland, celebrating the islands\' deep Norse Viking heritage at the end of the Yule season. A squad of 1,000 costumed Viking guizers led by the Guizer Jarl march with flaming torches and cast them into a full-size, hand-built Viking longship.',
    traditions: [
      'The Jarl Squad: 50 men dressed in full Viking battle dress with winged silver helmets, raven-engraved axes, and reindeer pelts',
      'The Burning of the Galley: 1,000 flaming paraffin torches hurled simultaneously into the Viking dragon longship',
      'Singing the rousing anthems "The Up Helly Aa Song" and "The Norseman\'s Home" around the roaring inferno',
      'All-night hall partying: Guizer squads touring a dozen community halls performing theatrical comedy sketches until 8:00 AM'
    ],
    greeting: 'Skål! Welcome to Up Helly Aa!',
    foodDelicacies: ['Shetland Salt Beef Mutton', 'Reestit Mutton Soup with Bannocks', 'Fresh Shetland Scallops & Mussels', 'Peat-Smoked Single Malt Scotch'],
    bannerUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Up Helly Aa', 'Vikings', 'Shetland', 'Fire Festival', 'Scotland', 'Norse'],
    facts: [
      'Volunteers spend over 4,000 hours throughout the long dark winter handcrafting the exquisite Viking galley, only for it to be completely burned to ashes in under 20 minutes.',
      'The entire island of Shetland takes the following Wednesday off as a statutory public holiday to recover from the night of revelry.'
    ],
    popularityScore: 94,
    latitude: 60.1548,
    longitude: -1.1492,
    weatherProfile: {
      tempCelsius: '1°C - 5°C',
      tempFahrenheit: '34°F - 41°F',
      climate: 'Sub-Arctic Maritime Winter - Dramatic Gales & Sea Foam',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Last week of January; Lerwick B&Bs and ferry tickets from Aberdeen must be booked one year in advance.',
      recommendedPacking: ['Heavy windproof & waterproof mountaineering gear', 'Old wool coat that won\'t be ruined by paraffin torch soot']
    },
    festivePeak: {
      peakDays: 'January 26 (Last Tuesday of January)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'King George V Playing Field in Lerwick for the galley burning',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'viking-dragon-prow',
      name: 'Carved Viking Dragon Galley & Battleaxe',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.3,
      description: 'Ferocious carved wooden dragon longship prow glowing amidst an inferno of leaping Viking sparks.'
    }
  },
  {
    id: 'saint-lucias-day-sweden',
    name: 'Saint Lucia\'s Day (Festival of Light)',
    localName: 'Luciadagen',
    date: '2026-12-13',
    month: 12,
    day: 13,
    country: 'Sweden, Norway & Finland',
    countryCode: 'SE',
    category: 'seasonal',
    description: 'A deeply moving Nordic tradition bringing light to the darkest days of winter. A maiden chosen as Lucia, dressed in a flowing white gown with a crimson sash and wearing a crown of real burning candles in her hair, leads a choir of maidens and star boys singing ancient winter hymns.',
    traditions: [
      'The Lucia Procession: Singing "Natten går tunga fjät" (Sancta Lucia) in candlelit cathedrals and school halls',
      'The Lucia Crown: Lingonberry sprigs woven into a wreath holding five glowing white candles worn on the head',
      'Tärnor (maidens) carrying handheld candles and Stjärngossar (star boys) wearing tall conical white paper caps',
      'Serving hot morning saffron buns (Lussekatter) and spiced mulled wine (Glögg) to loved ones in bed'
    ],
    greeting: 'Glad Lucia! (Happy Saint Lucia Day!)',
    foodDelicacies: ['Lussekatter (Saffron Buns with Raisin Eyes)', 'Pepparkakor (Thin Ginger Snap Cookies)', 'Glögg (Mulled Spiced Wine with Almonds & Raisins)', 'Risgrynsgröt (Cinnamon Rice Porridge)'],
    bannerUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    tags: ['Saint Lucia', 'Sweden', 'Festival of Light', 'Winter Solstice', 'Saffron Buns', 'Nordic'],
    facts: [
      'Before calendar reforms in Sweden in 1753, December 13 coincided with the winter solstice, considered the longest and most supernatural night of the year when livestock could speak.',
      'Saffron buns (Lussekatter) are baked in an "S" shape called an "ox-eye" or "cat\'s tail", with dark raisins representing glowing feline eyes.'
    ],
    popularityScore: 93,
    latitude: 59.3293,
    longitude: 18.0686,
    weatherProfile: {
      tempCelsius: '-3°C to 2°C',
      tempFahrenheit: '26°F - 36°F',
      climate: 'Dark Snowy Nordic Winter - Warm Candlelight',
      rainRisk: 'Low',
      bestTravelWindow: 'December 11 - 14 in Stockholm or Gothenburg for cathedral concert performances.',
      recommendedPacking: ['Warm thermal undergarments & down jacket', 'Wool socks & insulated boots', 'Gloves']
    },
    festivePeak: {
      peakDays: 'December 13 (Dawn & Evening Concerts)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Intimate / Serene',
      bestViewingSpot: 'Storkyrkan (Stockholm Cathedral) or Skansen open-air museum',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'lucia-candle-crown',
      name: 'Saint Lucia Lingonberry Candle Crown',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#fde047',
      scaleDefault: 1.0,
      description: 'Lush green lingonberry wreath bearing five illuminated glowing candles with dripping beeswax.'
    }
  },

  // ==========================================
  // ASIA & PACIFIC CONTINUED
  // ==========================================
  {
    id: 'gion-matsuri-kyoto',
    name: 'Gion Matsuri (Kyoto\'s Grand Float Festival)',
    localName: '祇園祭',
    date: '2026-07-17',
    month: 7,
    day: 17,
    country: 'Japan (Kyoto)',
    countryCode: 'JP',
    category: 'cultural',
    description: 'Kyoto\'s most venerable summer festival spanning the entire month of July, dating back to 869 AD when it was established to appease plague deities. Famous for its colossal multiton wooden floats (Yamahoko) towering up to 25 meters tall, decorated with priceless historic tapestries and pulled through ancient streets by dozens of men.',
    traditions: [
      'Yamahoko Junko: Grand procession of 34 towering floats assembled without a single nail using ancient rope-binding techniques',
      'The sacred Chigo boy cutting the sacred Shimenawa rope with a single katana sword stroke to commence the parade',
      'Yoiyama nights: Festive street food stalls, lantern illuminations, and families displaying heirloom folding screens in machiya townhouses',
      'Gion-bayashi: Traditional flutes, gongs, and taiko drums playing hypnotic melodies atop moving floats'
    ],
    greeting: 'Yoi Matsuri o! (良いお祭りを！)',
    foodDelicacies: ['Hamo Eel Sashimi & Tempura (Summer delicacy of Kyoto)', 'Ayuyaki (Sweet Fish Shaped Cakes)', 'Chigo Mochi (Skewered Sweet Rice Cakes)', 'Mitarashi Dango'],
    bannerUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Gion Matsuri', 'Kyoto', 'Japan', 'Yamahoko', 'UNESCO', 'Summer Festival'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2009.',
      'The giant Hoko floats weigh up to 12 metric tons and carry up to 40-50 musicians, requiring teams of men with wet bamboo slats to execute dramatic 90-degree street turns (Tsujimawashi).'
    ],
    popularityScore: 98,
    latitude: 35.0037,
    longitude: 135.7772,
    weatherProfile: {
      tempCelsius: '24°C - 33°C',
      tempFahrenheit: '75°F - 91°F',
      climate: 'Steamy Japanese Summer - Humid Kyoto Basin',
      rainRisk: 'Moderate',
      bestTravelWindow: 'July 14 - 17 for the Saki-matsuri Yoiyama nights and main Yamahoko Junko procession.',
      recommendedPacking: ['Light cotton yukata or linen attire', 'Sensu folding fan', 'Cooling wipes & neck towel']
    },
    festivePeak: {
      peakDays: 'July 16 (Yoiyama Eve) & July 17 (Main Float Procession)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Intersection of Shijo-dori and Kawaramachi-dori for Tsujimawashi turns',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'yamahoko-hoko-float',
      name: 'Kyoto Yamahoko Sacred Float & Lanterns',
      modelType: 'lantern',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.4,
      description: 'Majestic tiered wooden Kyoto festival float adorned with crimson chochin paper lanterns and sacred halberd mast.'
    }
  },
  {
    id: 'nebuta-matsuri-aomori',
    name: 'Aomori Nebuta Matsuri (Illuminated Warrior Lanterns)',
    localName: '青森ねぶた祭',
    date: '2026-08-02',
    month: 8,
    day: 2,
    country: 'Japan (Tohoku)',
    countryCode: 'JP',
    category: 'cultural',
    description: 'One of Japan\'s most visually spectacular summer festivals in northern Honshu. Gigantic three-dimensional illuminated paper floats depicting fierce mythological warriors, samurai, and dragons are pushed through the streets accompanied by thousands of Haneto dancers chanting "Rassera, Rassera!"',
    traditions: [
      'Carrying 20 monumental illuminated washi floats, each containing over 800 light bulbs and measuring 9 meters wide',
      'Dancing as a Haneto dancer: Anyone who rents or wears the authentic Haneto costume is legally permitted to join the parade',
      'The energetic call-and-response chant: "Rassera, Rassera, Rasse-Rasse-Rassera!"',
      'The maritime finale on August 7: Nebuta floats paraded on illuminated barges across Aomori Bay while fireworks burst above'
    ],
    greeting: 'Rassera! Happy Nebuta!',
    foodDelicacies: ['Aomori Fresh Scallop Rice (Hotate Meshi)', 'Apple Cider Sorbet (Aomori is Japan\'s apple capital)', 'Towada Barayaki (Grilled Beef & Onions)', 'Tsugaru Ramen with Dried Sardine Broth'],
    bannerUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nebuta', 'Aomori', 'Japan', 'Tohoku', 'Lanterns', 'Samurai'],
    facts: [
      'Each Nebuta float takes three full months of master artisanal craftsmanship: bending wire armatures, pasting thousands of sheets of washi paper, and hand-painting sumi ink and vibrant dyes.',
      'Over 3 million visitors flock to Aomori City each August, nearly ten times the city\'s resident population.'
    ],
    popularityScore: 96,
    latitude: 40.8244,
    longitude: 140.7400,
    weatherProfile: {
      tempCelsius: '20°C - 28°C',
      tempFahrenheit: '68°F - 82°F',
      climate: 'Refreshing Northern Japanese Summer',
      rainRisk: 'Low',
      bestTravelWindow: 'August 2 - 7 for the nightly processions and bay fireworks finale.',
      recommendedPacking: ['Haneto dancer costume rental voucher', 'Walking sandals with thick socks', 'Hydration pack']
    },
    festivePeak: {
      peakDays: 'August 4 - 7',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Shinmachi-dori street route near Aomori Station',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'nebuta-warrior-lantern',
      name: 'Glowing Nebuta Samurai Warrior Float',
      modelType: 'lantern',
      festiveAuraColor: '#ef4444',
      scaleDefault: 1.3,
      description: 'Luminous painted washi paper samurai warrior with blazing golden eyes, roaring amidst churning ocean waves.'
    }
  },
  {
    id: 'thaipusam-malaysia-singapore',
    name: 'Thaipusam (Sacred Murugan Penance Festival)',
    localName: 'தைப்பூசம்',
    date: '2027-01-21',
    month: 1,
    day: 21,
    country: 'Malaysia & Singapore',
    countryCode: 'MY',
    category: 'religious',
    description: 'A deeply awe-inspiring Hindu festival celebrated predominantly by the Tamil diaspora, commemorating Goddess Parvati giving Lord Murugan the sacred divine spear (Vel) to vanquish evil. Devotees carry elaborate Kavadi altars pierced into their skin as acts of supreme devotion and thanksgiving.',
    traditions: [
      'Carrying the Paal Kudam: Silver pots of sacred fresh milk carried on the head as an offering to Lord Murugan',
      'The Vel Kavadi: Colossal 30-kilogram arched steel canopies decorated with peacock feathers, balanced on needles pierced into skin and flesh',
      'Climbing the 272 vibrant rainbow steps of Batu Caves in Kuala Lumpur while surrounded by chanting drums',
      'Entering a profound state of spiritual trance (Arul Vakku) without feeling pain or shedding blood'
    ],
    greeting: 'Happy Thaipusam! Murugannukku Arogara! (வெற்றிவேல் முருகனுக்கு அரோகரா)',
    foodDelicacies: ['Thiruvathirai Kali Sweet Rice', 'South Indian Vegetable Biryani', 'Panakam (Jaggery Ginger Cardamom Drink)', 'Payasam', 'Crispy Medu Vada'],
    bannerUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    tags: ['Thaipusam', 'Batu Caves', 'Malaysia', 'Hinduism', 'Murugan', 'Kavadi'],
    facts: [
      'Devotees prepare for Thaipusam for 48 consecutive days with strict celibacy, vegetarian diet, daily prayer, and sleeping on bare floors.',
      'The Batu Caves site in Selangor features a colossal 140-foot-tall golden statue of Lord Murugan, the tallest Murugan statue in the world.'
    ],
    popularityScore: 95,
    latitude: 3.2379,
    longitude: 101.6840,
    weatherProfile: {
      tempCelsius: '24°C - 32°C',
      tempFahrenheit: '75°F - 90°F',
      climate: 'Tropical Warm & Humid',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Late January in Kuala Lumpur; visit Batu Caves in the cool pre-dawn hours.',
      recommendedPacking: ['Modest yellow temple clothing (yellow is sacred to Murugan)', 'Comfortable footwear easy to remove at cave entrance', 'Hydration']
    },
    festivePeak: {
      peakDays: 'January 21 (Main Full Moon Day)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Very High',
      bestViewingSpot: 'The foot of the 272 rainbow steps at Batu Caves',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'murugan-vel-peacock',
      name: 'Sacred Golden Vel & Peacock Plumes',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.2,
      description: 'Gilded divine spear (Vel) of Lord Murugan flanked by emerald and sapphire peacock feathers and burning camphor.'
    }
  },
  {
    id: 'anzac-day-australia-new-zealand',
    name: 'ANZAC Day (Dawn Service of Remembrance)',
    localName: 'ANZAC Day',
    date: '2026-04-25',
    month: 4,
    day: 25,
    country: 'Australia & New Zealand',
    countryCode: 'AU',
    category: 'national',
    description: 'A solemn national day of remembrance in Australia and New Zealand commemorating all military personnel who served and died in wars, conflicts, and peacekeeping operations. Commences at the crack of dawn with silence, bugle calls of the Last Post, and rosemary pinned to lapels.',
    traditions: [
      'The Dawn Service: Gathering in reverent silence at war memorials at 4:30 AM, matching the hour of the Gallipoli landing',
      'The sounding of "The Last Post" by solo buglers followed by two minutes of solemn national silence and "Reveille"',
      'Wearing sprigs of aromatic wild rosemary on coats, representing remembrance and fidelity',
      'Playing "Two-Up" in local pubs (the only day of the year this traditional gambling coin-toss game is legally permitted)'
    ],
    greeting: 'Lest We Forget.',
    foodDelicacies: ['Crispy Golden Anzac Biscuits (Rolled Oats, Coconut, Golden Syrup)', 'Gunfire Breakfast (Coffee laced with Rum & Bacon)', 'Damper Bread with Golden Syrup', 'Meat Pies'],
    bannerUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80',
    tags: ['ANZAC Day', 'Australia', 'New Zealand', 'Remembrance', 'Dawn Service', 'Gallipoli'],
    facts: [
      'Anzac biscuits were specifically developed by wives and women\'s groups during WWI because their ingredients did not spoil during the months-long sea voyages to European frontlines.',
      'ANZAC stands for Australian and New Zealand Army Corps.'
    ],
    popularityScore: 95,
    latitude: -33.8688,
    longitude: 151.2093,
    weatherProfile: {
      tempCelsius: '14°C - 22°C',
      tempFahrenheit: '57°F - 72°F',
      climate: 'Crisp Southern Autumn - Fresh Morning Dew',
      rainRisk: 'Low',
      bestTravelWindow: 'Late April in Sydney, Melbourne, or Canberra; arrive at war memorials by 4:00 AM.',
      recommendedPacking: ['Warm dark jacket for pre-dawn outdoor service', 'Umbrella', 'Coin pocket change for Two-Up games']
    },
    festivePeak: {
      peakDays: 'April 25 (4:30 AM Dawn Service)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Cenotaph in Martin Place, Sydney, or the Shrine of Remembrance in Melbourne',
      recommendedDurationDays: 2
    },
    arDecorItem: {
      id: 'anzac-rosemary-poppy',
      name: 'Remembrance Red Poppy & Sprig of Rosemary',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#ef4444',
      scaleDefault: 0.9,
      description: 'Luminous red Flanders poppy entwined with green Gallipoli rosemary sprigs.'
    }
  },
  {
    id: 'world-earth-day-international',
    name: 'Earth Day (Global Environmental Mobilization)',
    localName: 'International Mother Earth Day',
    date: '2026-04-22',
    month: 4,
    day: 22,
    country: 'Global Observance (190+ Countries)',
    countryCode: 'UN',
    category: 'un_day',
    description: 'The world\'s largest civic environmental observance, mobilizing over 1 billion people in 192 countries for climate action, reforestation, renewable energy transition, plastic reduction, and biodiversity preservation.',
    traditions: [
      'Massive global tree-planting campaigns and coral reef restoration drives',
      'Beach, river, and urban community plastic cleanups organized by volunteer coalitions',
      'Turning off non-essential electricity and observing renewable energy showcases',
      'Educational workshops in schools and universities on sustainable agriculture and circular economies'
    ],
    greeting: 'Happy Earth Day! Protect Our Shared Planet!',
    foodDelicacies: ['Locally Sourced Farm-to-Table Salads', 'Plant-Based Organic Feasts', 'Fresh Seasonal Fruit Smoothies', 'Artisanal Wild Grain Sourdough'],
    bannerUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    tags: ['Earth Day', 'Environment', 'Climate Action', 'Sustainability', 'UN', 'Nature'],
    facts: [
      'First launched on April 22, 1970, when 20 million Americans took to the streets, leading directly to the creation of the US Environmental Protection Agency and Clean Air Act.',
      'On Earth Day 2016, the historic United Nations Paris Climate Accord was formally signed by over 170 nations simultaneously.'
    ],
    popularityScore: 97,
    latitude: 40.7128,
    longitude: -74.0060,
    weatherProfile: {
      tempCelsius: '12°C - 21°C (Northern Hemisphere)',
      tempFahrenheit: '54°F - 70°F',
      climate: 'Springtime Rebirth Across the Northern Hemisphere',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-to-late April; participate in National Park service volunteer initiatives.',
      recommendedPacking: ['Reusable stainless steel water canteen', 'Gardening gloves for cleanups', 'Eco-friendly walking gear']
    },
    festivePeak: {
      peakDays: 'April 22',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Central Park in New York or UNESCO Biosphere Reserves worldwide',
      recommendedDurationDays: 2
    },
    arDecorItem: {
      id: 'earth-globe-seedling',
      name: 'Luminescent Earth Sphere & Sprouting Seedling',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#10b981',
      scaleDefault: 1.1,
      description: 'Glowing blue-marble Earth orb cradled by a vibrant emerald plant sprout and drifting cloud vapors.'
    }
  }
];
