import { Holiday, Continent } from '../types';

export interface CountryInfo {
  code: string;
  name: string;
  nativeName?: string;
  flag: string;
  continent: Continent;
  capital: string;
  culturalSummary: string;
  majorHolidaysCount: number;
}

export interface DetailedCountryHoliday {
  id: string;
  name: string;
  localName?: string;
  date: string;
  type: 'Public Holiday' | 'Cultural Special Day' | 'Sacred Observance' | 'International Day' | 'National Observance';
  category: 'cultural' | 'religious' | 'un_day' | 'national';
  description: string;
  traditions: string[];
  greeting?: string;
  foodDelicacies?: string[];
  bannerUrl: string;
  month: number;
  day: number;
}

// 1. All International & UN Observances
export const INTERNATIONAL_SPECIAL_DAYS: DetailedCountryHoliday[] = [
  {
    id: 'intl-women-day',
    name: "International Women's Day",
    localName: 'IWD',
    date: '2027-03-08',
    month: 3,
    day: 8,
    type: 'International Day',
    category: 'un_day',
    description: 'A global celebration honoring the social, economic, cultural, and political achievements of women, while championing gender equality and human rights across every continent.',
    traditions: [
      'Wearing purple ribbons, dresses, and pins representing justice and dignity',
      'Distributing yellow mimosa blossoms in Italy and Eastern Europe',
      'Global marches, community forums, and artistic exhibitions',
      'Donations to grassroots women empowerment initiatives'
    ],
    greeting: "Happy International Women's Day!",
    foodDelicacies: ['Mimosa Cake', 'Torta Mimosa', 'Violet Infusions'],
    bannerUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-earth-day',
    name: 'Earth Day',
    localName: 'International Mother Earth Day',
    date: '2027-04-22',
    month: 4,
    day: 22,
    type: 'International Day',
    category: 'un_day',
    description: 'The world’s largest civic observance dedicated to planetary environmental preservation, climate action, reforestation, and ecological stewardship.',
    traditions: [
      'Massive global tree planting campaigns (Canopy Project)',
      'Community beach, forest, and riverbed cleanups',
      'Green energy pledges and sustainable living workshops',
      'Switching off non-essential electricity for reflective communion'
    ],
    greeting: 'Happy Earth Day! Love our planet.',
    foodDelicacies: ['Plant-Based Feasts', 'Local Organic Harvest Bowls', 'Herbal Tisanes'],
    bannerUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-peace-day',
    name: 'International Day of Peace',
    localName: 'World Peace Day',
    date: '2027-09-21',
    month: 9,
    day: 21,
    type: 'International Day',
    category: 'un_day',
    description: 'Sanctioned by the United Nations as a day of global 24-hour ceasefire, non-violence, and international fraternity across warring zones.',
    traditions: [
      'Ringing of the UN Peace Bell cast from coins collected by children in 60 countries',
      'Observing a worldwide minute of silence at 12:00 noon local time',
      'Folding and flying white paper peace cranes',
      'Cross-border youth dialogues and musical concerts'
    ],
    greeting: 'May peace prevail on Earth.',
    foodDelicacies: ['Pomegranate Seeds', 'White Bread & Salt of Hospitality', 'Olive Oil & Fig Cakes'],
    bannerUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-health-day',
    name: 'World Health Day',
    localName: 'WHO Anniversary',
    date: '2027-04-07',
    month: 4,
    day: 7,
    type: 'International Day',
    category: 'un_day',
    description: 'Founded by the World Health Organization to raise global awareness on universal healthcare access, medical equity, and maternal wellness.',
    traditions: [
      'Free community health screenings and fitness walks',
      'Honoring nurses, physicians, and community healthcare workers',
      'Nutritional workshops emphasizing fresh regional food systems'
    ],
    greeting: 'Wishing you health, vitality, and well-being!',
    foodDelicacies: ['Superfood Smoothies', 'Fresh Medley of Berries', 'Nutritious Greens & Legumes'],
    bannerUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-human-rights-day',
    name: 'Human Rights Day',
    localName: 'Universal Declaration Day',
    date: '2026-12-10',
    month: 12,
    day: 10,
    type: 'International Day',
    category: 'un_day',
    description: 'Commemorates the adoption of the Universal Declaration of Human Rights in 1948, affirming the inalienable rights of every human being.',
    traditions: [
      'Lighting the Candle of Liberty and Hope',
      'Conferring international human rights and peace awards',
      'Public readings of the 30 articles of the Universal Declaration'
    ],
    greeting: 'Human rights for all people everywhere.',
    foodDelicacies: ['Bread of Solidarity', 'Fair Trade Cocoa', 'Shared Communal Stew'],
    bannerUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-oceans-day',
    name: 'World Oceans Day',
    localName: 'One Ocean, One Climate',
    date: '2027-06-08',
    month: 6,
    day: 8,
    type: 'International Day',
    category: 'un_day',
    description: 'Highlights the vital role of the ocean as the lungs of our planet and advocates for maritime conservation and plastic reduction.',
    traditions: [
      'Marine sanctuary dives and coral reef restoration',
      'Zero single-use plastic pledges across coastal cities',
      'Educational aquarium tours and blue-economy panels'
    ],
    greeting: 'Protect and honor our azure seas!',
    foodDelicacies: ['Sustainably Harvested Seaweed Snacks', 'Spirulina Tonic', 'Coastal Salt Breads'],
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-happiness-day',
    name: 'International Day of Happiness',
    localName: 'Happiness for All',
    date: '2027-03-20',
    month: 3,
    day: 20,
    type: 'International Day',
    category: 'un_day',
    description: 'Conceived by the United Nations with inspiration from Bhutan’s Gross National Happiness philosophy, recognizing joy and social connection as essential human rights.',
    traditions: [
      'Performing random acts of kindness for neighbors and strangers',
      'Gratitude journaling circles and communal smiling flashmobs',
      'Sharing heartwarming local cultural folklore'
    ],
    greeting: 'Spread joy, kindness, and smiles today!',
    foodDelicacies: ['Artisanal Dark Chocolate', 'Sunshine Citrus Tarts', 'Warm Honey Pastries'],
    bannerUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-workers-day',
    name: "International Workers' Day (May Day)",
    localName: 'Labor Day / Día del Trabajo',
    date: '2027-05-01',
    month: 5,
    day: 5,
    type: 'International Day',
    category: 'cultural',
    description: 'A historic worldwide celebration of labor movements, working people, social justice, and the international 8-hour workday movement.',
    traditions: [
      'Labor union processions and solidarity rallies',
      'Presenting lily of the valley flowers (Muguet) in France for good luck',
      'Community picnics, brass bands, and outdoor concerts'
    ],
    greeting: "Happy May Day! Solidarity with all workers.",
    foodDelicacies: ['Spring Greens & Asparagus', 'Picnic Sandwiches', 'Cider & Elderflower Spritz'],
    bannerUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-youth-day',
    name: 'International Youth Day',
    localName: 'Youth Leading Change',
    date: '2027-08-12',
    month: 8,
    day: 12,
    type: 'International Day',
    category: 'un_day',
    description: 'Draws attention to the cultural vitality, technological innovation, and civic contributions of youth across developing and developed nations.',
    traditions: [
      'Youth hackathons and cultural innovation summits',
      'Community mural paintings and street art festivals',
      'Open-mic spoken word and intercultural music jams'
    ],
    greeting: 'Empowering youth to transform the world!',
    foodDelicacies: ['Street Food Wraps', 'Boba Teas', 'Tropical Fruit Bowls'],
    bannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'intl-book-day',
    name: 'World Book and Copyright Day',
    localName: 'Dia del Llibre / St Jordi',
    date: '2027-04-23',
    month: 4,
    day: 23,
    type: 'International Day',
    category: 'cultural',
    description: 'Celebrates the transformative power of literature, honoring William Shakespeare and Miguel de Cervantes who both passed away on this date in 1616.',
    traditions: [
      'Exchanging a book for a fresh red rose in Catalonia and worldwide',
      'Literary readings in public squares and libraries',
      'Book donations to rural schools and cultural centers'
    ],
    greeting: 'Happy World Book Day! Read deeply.',
    foodDelicacies: ['Rose Petal Jam Pastries', 'Literary Afternoon Tea', 'Spanish Churros con Chocolate'],
    bannerUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'
  }
];

// 2. Comprehensive Countries Directory with Rich Cultural Data and Holidays
export const WORLD_COUNTRIES_REGISTRY: Record<string, {
  info: CountryInfo;
  holidays: DetailedCountryHoliday[];
}> = {
  US: {
    info: {
      code: 'US',
      name: 'United States',
      nativeName: 'United States of America',
      flag: '🇺🇸',
      continent: 'North America',
      capital: 'Washington, D.C.',
      culturalSummary: 'A vibrant mosaic of indigenous roots, immigrant heritages, and federal commemorations spanning Thanksgiving feasts, Fourth of July pyrotechnics, and civil rights milestones.',
      majorHolidaysCount: 10
    },
    holidays: [
      {
        id: 'us-independence-day',
        name: 'Independence Day (4th of July)',
        localName: 'The Fourth of July',
        date: '2027-07-04',
        month: 7,
        day: 4,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the adoption of the Declaration of Independence in 1776, celebrated with fireworks, neighborhood parades, and patriotic concerts across all 50 states.',
        traditions: ['Illuminated municipal fireworks displays', 'Family outdoor barbecues and cookouts', 'Marching band patriotic parades', 'Reading the Declaration of Independence'],
        greeting: 'Happy 4th of July!',
        foodDelicacies: ['Smoked BBQ Ribs', 'Sweet Corn on the Cob', 'Apple Pie à la Mode', 'Watermelon Slices'],
        bannerUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'us-thanksgiving',
        name: 'Thanksgiving Day',
        localName: 'American Thanksgiving',
        date: '2026-11-26',
        month: 11,
        day: 26,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'An iconic annual national holiday celebrating harvest bounty, family reunions, and gratitude, rooted in the 1621 harvest meal between Pilgrims and Wampanoag Native Americans.',
        traditions: ['Family banquet feast centered on roast turkey', 'Macy’s Thanksgiving Day Parade in NYC', 'Expressing gratitude around the dinner table', 'Touchdown football games'],
        greeting: 'Happy Thanksgiving! Wishing you warmth and bounty.',
        foodDelicacies: ['Roast Turkey with Herb Stuffing', 'Cranberry Sauce', 'Mashed Potatoes with Rich Gravy', 'Spiced Pumpkin Pie'],
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'us-mlk-day',
        name: 'Martin Luther King Jr. Day',
        localName: 'MLK Day of Service',
        date: '2027-01-18',
        month: 1,
        day: 18,
        type: 'Public Holiday',
        category: 'national',
        description: 'Honors the life and peaceful civil rights legacy of Dr. Martin Luther King Jr., observed as a national day of community service and racial justice remembrance.',
        traditions: ['Volunteering for community food drives and clinics', 'Recitations of the "I Have a Dream" speech', 'Civil rights marches and reflection vigils'],
        greeting: 'Honor Dr. King through community service.',
        foodDelicacies: ['Southern Soul Food Stew', 'Skillet Cornbread', 'Sweet Potato Pie'],
        bannerUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'us-juneteenth',
        name: 'Juneteenth National Independence Day',
        localName: 'Freedom Day / Emancipation Day',
        date: '2027-06-19',
        month: 6,
        day: 19,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates June 19, 1865, when enslaved African Americans in Galveston, Texas finally received news of emancipation, symbolizing freedom and resilient Black culture.',
        traditions: ['Eating traditional red-colored celebratory foods', 'Street festivals with African drumming and gospel', 'Reading the Emancipation Proclamation'],
        greeting: 'Happy Juneteenth! Celebrating Black freedom & resilience.',
        foodDelicacies: ['Red Velvet Cake', 'Hibiscus Red Drink', 'Barbecue Brisket', 'Collard Greens'],
        bannerUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'us-halloween',
        name: 'Halloween',
        localName: 'All Hallows’ Eve',
        date: '2026-10-31',
        month: 10,
        day: 31,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Celebrated across neighborhoods with costumed trick-or-treating, jack-o’-lantern carving, haunted storytelling, and autumnal masquerades.',
        traditions: ['Children trick-or-treating for candy in costume', 'Carving glowing faces into fresh pumpkins', 'Haunted houses and horror movie marathons'],
        greeting: 'Happy Halloween! Trick or Treat!',
        foodDelicacies: ['Caramel Apples', 'Candy Corn', 'Roasted Pumpkin Seeds', 'Spiced Apple Cider'],
        bannerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  JP: {
    info: {
      code: 'JP',
      name: 'Japan',
      nativeName: '日本 (Nihon / Nippon)',
      flag: '🇯🇵',
      continent: 'Asia',
      capital: 'Tokyo',
      culturalSummary: 'A sublime harmony of Shinto nature shrines, Buddhist mindfulness, and seasonal festivals (Matsuri) celebrating cherry blossoms, ancestral souls, and celestial stars.',
      majorHolidaysCount: 8
    },
    holidays: [
      {
        id: 'jp-oshogatsu',
        name: 'Oshogatsu (Japanese New Year)',
        localName: 'お正月 (Oshōgatsu)',
        date: '2027-01-01',
        month: 1,
        day: 1,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The most sacred and significant holiday in Japan. Families cleanse their homes, visit shrines for Hatsumode, and enjoy lucky feasts wishing longevity and good fortune.',
        traditions: ['First shrine visit of the year (Hatsumōde)', 'Ringing 108 temple bell tolls (Joya no Kane)', 'Giving lucky monetary gift envelopes (Otoshidama) to children', 'Hanging pine and bamboo Kadomatsu decorations'],
        greeting: 'Akemashite Omedetou Gozaimasu! (明けましておめでとうございます)',
        foodDelicacies: ['Osechi-ryori lacquered gift boxes', 'Ozoni Mochi Soup', 'Toshikoshi Soba (Year-Crossing Buckwheat Noodles)'],
        bannerUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'jp-hanami',
        name: 'Hanami (Cherry Blossom Festival)',
        localName: '花見 (Hanami)',
        date: '2027-04-02',
        month: 4,
        day: 2,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'The centuries-old Japanese tradition of welcoming spring by picnicking beneath magnificent clouds of blooming Sakura cherry blossoms, meditating on impermanence (Mono no aware).',
        traditions: ['Spreading blue tarps beneath Sakura blossoms for convivial picnics', 'Evening lantern blossom viewings (Yozakura)', 'Singing, sharing sake, and capturing spring photography'],
        greeting: 'Kanpai! Enjoy the fleeting beauty of the Sakura.',
        foodDelicacies: ['Hanami Dango (Tri-colored sweet rice dumplings)', 'Sakura Mochi wrapped in salted cherry leaves', 'Bento boxes with tamagoyaki'],
        bannerUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'jp-obon',
        name: 'Obon Festival',
        localName: 'お盆 (Obon)',
        date: '2027-08-13',
        month: 8,
        day: 13,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'A Buddhist-Shinto spiritual festival honoring the spirits of ancestors who temporarily return to visit their living relatives, celebrated with hypnotic circle dances (Bon Odori).',
        traditions: ['Bon Odori rhythmic folk circle dancing in yukata robes', 'Floating illuminated paper lanterns down rivers (Tōrō Nagashi)', 'Welcoming fires (Mukaebi) and send-off fires (Okuribi)'],
        greeting: 'May ancestors guide and bless your family.',
        foodDelicacies: ['Kagami Mochi', 'Watermelon dusted with sea salt', 'Somen chilled noodles', 'Kyuri Uma (Cucumber horse figurines)'],
        bannerUrl: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'jp-tanabata',
        name: 'Tanabata (Star Festival)',
        localName: '七夕 (Tanabata)',
        date: '2027-07-07',
        month: 7,
        day: 7,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Celebrates the legendary celestial reunion of the weaver star Orihime (Vega) and the cowherd star Hikoboshi (Altair), separated by the expanse of the Milky Way.',
        traditions: ['Writing poetic wishes on colorful Tanzaku paper strips', 'Tying wish strips onto leafy fresh bamboo branches', 'Stargazing the summer Milky Way from shrines and riversides'],
        greeting: 'May your heartfelt wishes reach the stars!',
        foodDelicacies: ['Somen noodles representing the celestial Milky Way', 'Chilled melon skewers', 'Star-shaped jellies'],
        bannerUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  IN: {
    info: {
      code: 'IN',
      name: 'India',
      nativeName: 'भारत (Bhārat)',
      flag: '🇮🇳',
      continent: 'Asia',
      capital: 'New Delhi',
      culturalSummary: 'An extraordinary tapestry of ancient philosophical traditions, dazzling festival of lights, joyful colors of spring, and rich multicultural unity.',
      majorHolidaysCount: 9
    },
    holidays: [
      {
        id: 'in-diwali',
        name: 'Diwali (Deepavali)',
        localName: 'दीपावली (Deepāvali)',
        date: '2026-11-08',
        month: 11,
        day: 8,
        type: 'Public Holiday',
        category: 'religious',
        description: 'The triumph of light over spiritual darkness and knowledge over ignorance. Millions of clay oil lamps (diyas) illuminate rooftops, courtyards, and rivers.',
        traditions: ['Lighting earthen diyas and brass lamps', 'Creating colorful floor Rangoli designs with flower petals and rice powder', 'Lakshmi Puja prayer invocations for fortune and virtue', 'Bursting joyous fireworks and exchanging rich sweet boxes'],
        greeting: 'Shubh Deepavali! (शुभ दीपावली)',
        foodDelicacies: ['Kaju Katli (Cashew Fudge)', 'Gulab Jamun', 'Crispy Jalebi soaked in saffron syrup', 'Savory Chakli & Samosas'],
        bannerUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'in-holi',
        name: 'Holi (Festival of Colors)',
        localName: 'होली (Holī)',
        date: '2027-03-22',
        month: 3,
        day: 22,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The exhilarating arrival of spring where social boundaries dissolve as millions douse one another in vibrant dry gulal powders and fragrant herbal waters.',
        traditions: ['Holika Dahan bonfires on the eve burning away negative energy', 'Playful throwing of organic gulal pigments and water balloons', 'Visiting relatives and embracing friends to wipe away past grudges'],
        greeting: 'Bura na mano, Holi hai! Happy Holi! (होली की हार्दिक शुभकामनाएं)',
        foodDelicacies: ['Crispy Gujiya filled with mawa & dry fruits', 'Chilled Thandai infused with cardamom, almonds & fennel', 'Dahi Vada', 'Puris with spiced aloo'],
        bannerUrl: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'in-independence-day',
        name: 'Indian Independence Day',
        localName: 'स्वतंत्रता दिवस (Swatantrata Diwas)',
        date: '2027-08-15',
        month: 8,
        day: 15,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the nation’s independence in 1947 after centuries of British colonial rule, marked by the prime minister hoisting the tricolor flag at the Red Fort in Delhi.',
        traditions: ['Hoisting the Tiranga national tricolor flag', 'Soaring vibrant kites in the sky across northern cities', 'Singing the national anthem Jana Gana Mana'],
        greeting: 'Swatantrata Diwas ki Hardik Shubhkamnayein!',
        foodDelicacies: ['Tricolor Barfi (Tiranga Sweets)', 'Saffron Jalebi', 'Dhokla with Green Chutney'],
        bannerUrl: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  MX: {
    info: {
      code: 'MX',
      name: 'Mexico',
      nativeName: 'México',
      flag: '🇲🇽',
      continent: 'North America',
      capital: 'Mexico City',
      culturalSummary: 'Rich syncretism blending ancient Mesoamerican Mexica and Maya cosmic reverence with vibrant Spanish baroque pageantry, brass mariachi, and artisanal culinary heritage.',
      majorHolidaysCount: 8
    },
    holidays: [
      {
        id: 'mx-dia-muertos',
        name: 'Día de los Muertos (Day of the Dead)',
        localName: 'Día de Muertos',
        date: '2026-11-01',
        month: 11,
        day: 1,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'A joyful multi-day celebration honoring departed ancestors whose souls return to visit. Families build radiant ofrenda altars adorned with bright cempasúchil marigolds.',
        traditions: ['Building elaborate multi-tiered ofrendas with photographs of loved ones', 'Carpet paths of golden cempasúchil marigold petals to guide souls', 'Painting sugar skull faces inspired by La Catrina', 'Overnight cemetery candlelight vigils with guitars and songs'],
        greeting: '¡Feliz Día de los Muertos! Recordando con amor y alegría.',
        foodDelicacies: ['Pan de Muerto dusted with orange blossom sugar', 'Sugar Skulls (Calaveritas)', 'Rich Mole Poblano', 'Warm Atole & Champurrado'],
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'mx-grito-dolores',
        name: 'Mexican Independence Day (El Grito)',
        localName: 'Día de la Independencia',
        date: '2027-09-16',
        month: 9,
        day: 16,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates Father Miguel Hidalgo’s historic 1810 "Cry of Dolores" initiating the war for Mexican independence from Spanish rule.',
        traditions: ['The President chanting "¡Viva México!" from the National Palace balcony on the eve of the 15th', 'Ringing the historic bell of Dolores followed by red, white, and green fireworks', 'Lively street fiestas with mariachi bands and folk ballet'],
        greeting: '¡Viva México! ¡Viva la Independencia!',
        foodDelicacies: ['Chiles en Nogada showcasing the tricolor flag', 'Pozole Rojo with shredded pork & hominy', 'Crispy Tostadas', 'Mezcal & Tequila'],
        bannerUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'mx-posadas',
        name: 'Las Posadas',
        localName: 'Las Posadas Navideñas',
        date: '2026-12-16',
        month: 12,
        day: 16,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'A nine-night festive procession reenacting Mary and Joseph’s search for lodging in Bethlehem, culminating in breaking star-shaped piñatas.',
        traditions: ['Candlelight processions singing traditional petition carols', 'Breaking seven-pointed clay piñatas filled with seasonal fruits and candies', 'Gathering around nativity scenes with neighbors'],
        greeting: '¡Buenas Posadas y Felices Fiestas!',
        foodDelicacies: ['Hot Ponche Navideño with tejocotes & sugarcane', 'Tamales wrapped in corn husks', 'Sweet Buñuelos dusted with cinnamon sugar'],
        bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  BR: {
    info: {
      code: 'BR',
      name: 'Brazil',
      nativeName: 'Brasil',
      flag: '🇧🇷',
      continent: 'South America',
      capital: 'Brasília',
      culturalSummary: 'World-renowned for the thunderous drums of Samba, pulsating coastal Carnival processions, Afro-Brazilian culinary soul, and heartfelt Festa Junina harvests.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'br-carnaval',
        name: 'Carnaval do Brasil (Rio Carnival)',
        localName: 'Carnaval',
        date: '2027-02-05',
        month: 2,
        day: 5,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The most famous, vibrant, and spectacle-filled pre-Lenten carnival on Earth. Hundreds of thousands dance in neighborhood street blocks (blocos) and the iconic Sambadrome.',
        traditions: ['Grand Samba School parades inside the Rio Sambadrome', 'Spontaneous neighborhood street parties (Blocos de Rua)', 'Dazzling sequined costumes, feather crowns, and glitter', 'Thunderous batucada percussion ensembles'],
        greeting: '¡Alegria! ¡Feliz Carnaval!',
        foodDelicacies: ['Hearty Feijoada stew with black beans & smoked meats', 'Crispy Coxinha chicken croquettes', 'Refreshing Caipirinhas with fresh lime and cachaça', 'Açaí bowls topped with granola'],
        bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'br-festa-junina',
        name: 'Festa Junina (Saint John Festival)',
        localName: 'Festas Juninas / São João',
        date: '2027-06-24',
        month: 6,
        day: 24,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Brazil’s winter harvest extravaganza honoring rural life, Saint John the Baptist, and country folklore with square dancing and corn treats.',
        traditions: ['Quadrilha country square dancing in checkered shirts and straw hats', 'Giant outdoor community bonfires (Fogueiras)', 'Bunting pennants hung across city avenues', 'Forró accordion dance music until sunrise'],
        greeting: 'Viva São João! Viva a colheita!',
        foodDelicacies: ['Pamonha (Fresh sweet corn paste wrapped in husks)', 'Canjica creamy corn pudding', 'Bolo de Fubá (Cornmeal cake)', 'Quentão hot spiced mulled cachaça'],
        bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  GB: {
    info: {
      code: 'GB',
      name: 'United Kingdom',
      nativeName: 'United Kingdom of Great Britain and Northern Ireland',
      flag: '🇬🇧',
      continent: 'Europe',
      capital: 'London',
      culturalSummary: 'Rich history uniting British royal pageantry, Scottish poetry banquets, Celtic lore, parliamentary Guy Fawkes bonfires, and cozy Boxing Day winter warmth.',
      majorHolidaysCount: 8
    },
    holidays: [
      {
        id: 'gb-bonfire-night',
        name: 'Guy Fawkes Night (Bonfire Night)',
        localName: 'Bonfire Night',
        date: '2026-11-05',
        month: 11,
        day: 5,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Commemorates the failure of the 1605 Gunpowder Plot to blow up King James I and the House of Lords in London.',
        traditions: ['Lighting blazing community bonfires burning effigies of Guy Fawkes', 'Sensational fireworks displays over towns and villages', 'Spinning hand sparklers and reciting: "Remember, remember, the fifth of November"'],
        greeting: 'Remember, remember, the 5th of November!',
        foodDelicacies: ['Parkin ginger cake', 'Jacket potatoes baked in bonfire embers', 'Toffee apples', 'Bangers and mash with onion gravy'],
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'gb-burns-night',
        name: 'Burns Night',
        localName: 'Robert Burns Supper',
        date: '2027-01-25',
        month: 1,
        day: 25,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Celebrates the birthday, poetry, and immortal memory of Scotland’s national bard Robert Burns with bagpipes, tartan, and haggis feasts.',
        traditions: ['Piping in the haggis with traditional Great Highland Bagpipes', 'Reciting the dramatic "Address to a Haggis"', 'Singing "Auld Lang Syne" with joined hands', 'Drinking fine single-malt Scotch whisky'],
        greeting: 'Slàinte mhath! Happy Burns Night!',
        foodDelicacies: ['Savory Haggis', 'Neeps and Tatties (Swede turnip and mashed potatoes)', 'Tipsy Laird trifle with Scottish raspberries'],
        bannerUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'gb-boxing-day',
        name: 'Boxing Day',
        localName: 'St. Stephen’s Day',
        date: '2026-12-26',
        month: 12,
        day: 26,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Historically the day servants and tradespeople received "Christmas boxes" of gifts and money from employers, now celebrated with family walks and football matches.',
        traditions: ['Attending traditional Premier League Boxing Day football matches', 'Crisp countryside walks with extended family', 'Charity icy ocean plunges along British coasts'],
        greeting: 'Happy Boxing Day! Enjoy the festive respite.',
        foodDelicacies: ['Bubble and Squeak with leftover roast vegetables', 'Cold Turkey sandwiches with cranberry and stuffing', 'Mince pies and clotted cream'],
        bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  DE: {
    info: {
      code: 'DE',
      name: 'Germany',
      nativeName: 'Deutschland',
      flag: '🇩🇪',
      continent: 'Europe',
      capital: 'Berlin',
      culturalSummary: 'Famed for festive Christmas markets (Weihnachtsmärkte), Bavarian Oktoberfest beer tents, German Unity Day, and enchanting folklore like Walpurgis Night.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'de-oktoberfest',
        name: 'Oktoberfest',
        localName: 'Die Wiesn (München)',
        date: '2027-09-18',
        month: 9,
        day: 18,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'The world’s largest folk festival held annually on the Theresienwiese in Munich, celebrating Bavarian craft brewing, folk music, and Lederhosen attire.',
        traditions: ['Mayor of Munich tapping the first beer keg shouting "O\'zapft is!"', 'Wearing traditional Lederhosen and Dirndl dress', 'Brass folk bands playing "Ein Prosit der Gemütlichkeit"'],
        greeting: 'O’zapft is! Prost auf die Gemütlichkeit!',
        foodDelicacies: ['Giant Soft Pretzels (Brezen) with Obatzda cheese', 'Roast Crispy Pork Knuckle (Schweinshaxe)', 'Rotisserie Half Chicken (Hendl)', 'Bavarian Sweet Mustard'],
        bannerUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'de-unity-day',
        name: 'German Unity Day',
        localName: 'Tag der Deutschen Einheit',
        date: '2027-10-03',
        month: 10,
        day: 3,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the historic reunification of East and West Germany in 1990 after the fall of the Berlin Wall, uniting divided families and the republic.',
        traditions: ['Civic unity celebrations hosted in rotating state capitals', 'Citizens’ festival at the Brandenburg Gate in Berlin', 'Open doors at federal museums and cultural institutions'],
        greeting: 'Alles Gute zum Tag der Deutschen Einheit!',
        foodDelicacies: ['Currywurst with crispy pommes', 'Thuringian Bratwurst', 'Fresh Apple Strudel with vanilla bean sauce'],
        bannerUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  TH: {
    info: {
      code: 'TH',
      name: 'Thailand',
      nativeName: 'ประเทศไทย (Prathet Thai)',
      flag: '🇹🇭',
      continent: 'Asia',
      capital: 'Bangkok',
      culturalSummary: 'A radiant Buddhist realm of golden temples, gracious smiles, vibrant floating lantern ceremonies, and the world’s most exhilarating water festival.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'th-songkran',
        name: 'Songkran (Thai New Year Water Festival)',
        localName: 'เทศกาลสงกรานต์ (Songkran)',
        date: '2027-04-13',
        month: 4,
        day: 13,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The traditional Thai New Year marking astrological transit into Aries. Streets transform into joyous nation-wide friendly water fights washing away misfortune.',
        traditions: ['Pouring fragrant water over sacred Buddha statues (Song Nam Phra)', 'Respectfully washing the hands of elders with floral jasmine water (Rod Nam Dum Hua)', 'Friendly city-wide water gun and bucket festivities', 'Applying white chalk powder (Din Sor Pong) as a blessing of protection'],
        greeting: 'Sawatdee Pee Mai! (สุขสันต์วันสงกรานต์)',
        foodDelicacies: ['Khao Chae (Jasmine-scented chilled rice with savory condiments)', 'Mango Sticky Rice with rich coconut cream', 'Pad Thai with fresh prawns'],
        bannerUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'th-loy-krathong',
        name: 'Loy Krathong (Festival of Lights)',
        localName: 'ลอยกระทง (Loy Krathong)',
        date: '2026-11-24',
        month: 11,
        day: 24,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Observed on the full moon night of the 12th lunar month. Millions release decorated floating leaf baskets onto rivers and canals to honor the Water Goddess Phra Mae Khongkha.',
        traditions: ['Handcrafting Krathongs from banana tree trunks, folded leaves, and orchids', 'Lighting incense and candles inside the floating basket and releasing wishes', 'Simultaneous Yi Peng sky lantern releases in Chiang Mai filling the heavens with golden embers'],
        greeting: 'Suksan Wan Loy Krathong! May your sorrows float away.',
        foodDelicacies: ['Crispy Golden Coconut Pancakes (Kanom Krok)', 'Banana Leaf Steamed Cakes', 'Spicy Lemongrass Tom Yum Soup'],
        bannerUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  CN: {
    info: {
      code: 'CN',
      name: 'China',
      nativeName: '中国 (Zhōngguó)',
      flag: '🇨🇳',
      continent: 'Asia',
      capital: 'Beijing',
      culturalSummary: 'Five millennia of continuous civilization celebrated through the lunisolar calendar, familial reunion feasts, poetry under harvest moons, and dragon boat races.',
      majorHolidaysCount: 8
    },
    holidays: [
      {
        id: 'cn-spring-festival',
        name: 'Chinese New Year (Spring Festival)',
        localName: '春节 (Chūnjié)',
        date: '2027-02-06',
        month: 2,
        day: 6,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The pinnacle of traditional Chinese celebrations marking the renewal of the earth and the reunion of all family members from around the globe.',
        traditions: ['Sumptuous New Year’s Eve family reunion dinner (Nian Ye Fan)', 'Giving bright red envelopes (Hongbao) containing lucky money', 'Setting off fireworks and firecrackers to ward off the mythical beast Nian', 'Pasting red door couplets (Chunlian) and paper-cut art'],
        greeting: 'Gong Xi Fa Cai! Xin Nian Kuai Le! (恭喜发财，新年快乐)',
        foodDelicacies: ['Dumplings (Jiaozi) shaped like ancient gold ingots', 'Whole Steamed Fish symbolizing surplus every year (Nian Nian You Yu)', 'Nian Gao sweet sticky rice cake', 'Spring Rolls'],
        bannerUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cn-mid-autumn',
        name: 'Mid-Autumn Festival (Mooncake Day)',
        localName: '中秋节 (Zhōngqiūjié)',
        date: '2027-09-15',
        month: 9,
        day: 15,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Celebrates the brightest full harvest moon of the year, honoring family completeness and the legendary moon goddess Chang’e.',
        traditions: ['Appreciating the radiant full moon with family in gardens and balconies', 'Sharing rich mooncakes with loved ones', 'Carrying illuminated paper lanterns shaped like rabbits and stars', 'Sipping fragrant sweet osmanthus wine'],
        greeting: 'Zhongqiu Kuaile! Wishing you a full moon and harmonious reunion.',
        foodDelicacies: ['Traditional Baked Mooncakes with salted egg yolk & lotus seed paste', 'Snow Skin Mooncakes with durian or matcha', 'Pomelo fruit slices', 'Osmanthus tea'],
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'cn-dragon-boat',
        name: 'Dragon Boat Festival (Duanwu)',
        localName: '端午节 (Duānwǔjié)',
        date: '2027-06-09',
        month: 6,
        day: 9,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Commemorates the ancient patriotic poet Qu Yuan who lived during the Warring States period, celebrated with exhilarating dragon boat racing.',
        traditions: ['Spectacular dragon boat races with rhythmic drum cadences', 'Eating pyramidal sticky rice dumplings (Zongzi) wrapped in bamboo leaves', 'Hanging aromatic calamus and mugwort leaves on entry doors for health', 'Wearing colorful silk fragrance pouches'],
        greeting: 'Duanwu An Kang! (端午安康)',
        foodDelicacies: ['Savory Zongzi with pork belly and salted egg', 'Sweet Red Bean Zongzi', 'Salted Duck Eggs', 'Realgar herbal wine'],
        bannerUrl: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  SA: {
    info: {
      code: 'SA',
      name: 'Saudi Arabia',
      nativeName: 'المملكة العربية السعودية',
      flag: '🇸🇦',
      continent: 'Middle East',
      capital: 'Riyadh',
      culturalSummary: 'Cradle of Islamic civilization, celebrated for the twin sacred feasts of Eid al-Fitr and Eid al-Adha, rich Bedouin coffee hospitality, and historic National Day.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'sa-eid-al-fitr',
        name: 'Eid al-Fitr',
        localName: 'عيد الفطر المبارك',
        date: '2027-03-10',
        month: 3,
        day: 10,
        type: 'Public Holiday',
        category: 'religious',
        description: 'The joyful three-day festival concluding the holy fasting month of Ramadan, marked by communal prayers, charity, and lavish hospitality.',
        traditions: ['Attending early morning congregational Eid prayers', 'Paying Zakat al-Fitr charitable food donations to ensure no one goes hungry', 'Donning new festive thobes and abayas', 'Visiting neighbors with coffee and date sweets'],
        greeting: 'Eid Mubarak! Kul ‘am wa antum bi-khayr! (عيد مبارك وكل عام وأنتم بخير)',
        foodDelicacies: ['Ma’amoul date and pistachio shortbread cookies', 'Fragrant Kabsa spiced rice with lamb', 'Fresh Medjool dates with cardamom Arabic Gahwa coffee'],
        bannerUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'sa-national-day',
        name: 'Saudi National Day',
        localName: 'اليوم الوطني السعودي',
        date: '2027-09-23',
        month: 9,
        day: 23,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the unification of the Kingdom of Saudi Arabia in 1932 by King Abdulaziz, celebrated with green flag parades and airshows.',
        traditions: ['Illuminating skyscrapers in brilliant emerald green lights', 'Royal Saudi Air Force aerobatic jet displays', 'Traditional Ardah sword dance performances in historical plazas'],
        greeting: 'Dam Izzuk Ya Watan! (دام عزك يا وطن)',
        foodDelicacies: ['Saleeq creamy rice with roasted chicken', 'Luqaimat sweet dumplings drizzled with date syrup', 'Arabic coffee with saffron'],
        bannerUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  IE: {
    info: {
      code: 'IE',
      name: 'Ireland',
      nativeName: 'Éire',
      flag: '🇮🇪',
      continent: 'Europe',
      capital: 'Dublin',
      culturalSummary: 'An emerald isle of rich Celtic mythology, patron saint processions, joyful fiddle tunes, and ancient seasonal festivals like Samhain that birthed Halloween.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'ie-st-patricks-day',
        name: "St. Patrick's Day",
        localName: 'Lá Fhéile Pádraig',
        date: '2027-03-17',
        month: 3,
        day: 17,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Honors Saint Patrick, the patron saint of Ireland who brought Christianity using the three-leaf shamrock, celebrated with global green pageantry.',
        traditions: ['Wearing green ribbons, clothing, and shamrocks', 'Grand international parades with bagpipes and giant puppets', 'Traditional Ceili social dancing and lively Irish pub sessions', 'Illuminating world landmarks in emerald green lights'],
        greeting: 'Lá Fhéile Pádraig Sona Duit! (Happy St. Patrick’s Day!)',
        foodDelicacies: ['Corned Beef and Cabbage with boiled potatoes', 'Traditional Irish Soda Bread with salted butter', 'Irish Stew with tender lamb and root vegetables', 'Warm Irish Coffee topped with fresh cream'],
        bannerUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'ie-samhain',
        name: 'Samhain (Celtic New Year & Halloween Roots)',
        localName: 'Oíche Shamhna',
        date: '2026-10-31',
        month: 10,
        day: 31,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'The ancient Gaelic festival marking the end of harvest and onset of winter, when the veil between this world and the Otherworld was believed to be at its thinnest.',
        traditions: ['Lighting ritual hill bonfires like the Hill of Ward tradition', 'Carving scary faces into hollowed-out turnips (ancient jack-o’-lanterns)', 'Barmbrack fruit bread fortune divination', 'Masking in animal skins to disguise oneself from spirits'],
        greeting: 'Oíche Shamhna Shona Duit! Happy ancient Samhain!',
        foodDelicacies: ['Barmbrack with hidden rings, coins, and cloth charms', 'Colcannon (Mashed potatoes with kale, butter, and cream)', 'Roasted Apples with cinnamon and honey'],
        bannerUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  KR: {
    info: {
      code: 'KR',
      name: 'South Korea',
      nativeName: '대한민국 (Daehan Minguk)',
      flag: '🇰🇷',
      continent: 'Asia',
      capital: 'Seoul',
      culturalSummary: 'A dynamic fusion of centuries-old Joseon royal court rites, lunar harvest gratitude (Chuseok), beautiful Hanbok attire, and cutting-edge global cultural waves.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'kr-seollal',
        name: 'Seollal (Korean Lunar New Year)',
        localName: '설날 (Seollal)',
        date: '2027-02-06',
        month: 2,
        day: 6,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'The premier Korean family celebration where relatives gather in colorful Hanbok robes to perform ancestral memorial rites and pay deep bows of respect to elders.',
        traditions: ['Sebae deep formal bow to elders who gift crisp New Year money (Sebaetdon)', 'Charye ancestral table veneration rituals', 'Playing traditional folk games like Yut Nori stick game', 'Flying shields and spinning tops in village squares'],
        greeting: 'Saehae bok mani badeuseyo! (새해 복 많이 받으세요)',
        foodDelicacies: ['Tteokguk (Sliced rice cake soup eaten to gain a year of age and purity)', 'Jeon savory pan-fried pancakes', 'Japchae sweet potato glass noodles with beef and vegetables', 'Sikhye sweet fermented rice drink'],
        bannerUrl: 'https://images.unsplash.com/photo-1538669715315-155098f6bbe0?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'kr-chuseok',
        name: 'Chuseok (Korean Harvest Moon Festival)',
        localName: '추석 (Chuseok / Hangawi)',
        date: '2027-09-15',
        month: 9,
        day: 15,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'A major three-day harvest festival where Koreans travel to their ancestral hometowns to give thanks to the earth’s bounty and ancestors under the autumn full moon.',
        traditions: ['Making crescent moon-shaped Songpyeon rice cakes over fresh pine needles', 'Beolcho ancestral grave weeding and cleaning visits', 'Ganggangsullae women’s circle dancing under the harvest moon', 'Ssireum traditional wrestling matches'],
        greeting: 'Pungseonghan Hangawi bonaeseyo! (풍성한 한가위 보내세요)',
        foodDelicacies: ['Songpyeon stuffed with toasted sesame seeds, honey, and chestnuts', 'Toranguk (Taro beef soup)', 'Freshly harvested Korean Pears and persimmons'],
        bannerUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  FR: {
    info: {
      code: 'FR',
      name: 'France',
      nativeName: 'République française',
      flag: '🇫🇷',
      continent: 'Europe',
      capital: 'Paris',
      culturalSummary: 'A cradle of Enlightenment ideals, celebrated through Bastille Day fireworks over the Eiffel Tower, the nationwide Fête de la Musique, and historic culinary artistry.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'fr-bastille-day',
        name: 'Bastille Day (French National Day)',
        localName: 'Fête Nationale / 14 Juillet',
        date: '2027-07-14',
        month: 7,
        day: 14,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the storming of the Bastille prison in 1789, a turning point in the French Revolution affirming Liberty, Equality, and Fraternity.',
        traditions: ['Military parade along the Champs-Élysées inspected by the President', 'Eiffel Tower grand pyrotechnic light show', 'Firefighters’ charity balls (Bals des pompiers) dancing through the night'],
        greeting: 'Bonne Fête Nationale! Vive la République, vive la France!',
        foodDelicacies: ['Artisanal Baguettes with Camembert and Comté', 'Macarons and Petits Fours', 'Champagne & Crémant', 'Crêpes Suzette'],
        bannerUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'fr-fete-musique',
        name: 'Fête de la Musique (World Music Day)',
        localName: 'Fête de la Musique',
        date: '2027-06-21',
        month: 6,
        day: 21,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'Initiated in France in 1982 on the Summer Solstice, where every corner of every French city fills with free amateur and professional live music concerts.',
        traditions: ['Unrestricted open-air street performances across sidewalks and bridges', 'Free admission to all public symphonies and concert halls', 'Dancing into the warm solstice twilight with acoustic and electronic music'],
        greeting: 'Faites de la musique! Happy World Music Day!',
        foodDelicacies: ['Gourmet Street Crêpes', 'Charcuterie Boards', 'Chilled Rosé Wine from Provence'],
        bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  IT: {
    info: {
      code: 'IT',
      name: 'Italy',
      nativeName: 'Italia',
      flag: '🇮🇹',
      continent: 'Europe',
      capital: 'Rome',
      culturalSummary: 'Renowned for Venice Carnival masquerades, Ferragosto summer escapes, ancient historical patron saint feasts, and incomparable culinary regionalism.',
      majorHolidaysCount: 7
    },
    holidays: [
      {
        id: 'it-carnevale-venezia',
        name: 'Venice Carnival (Carnevale di Venezia)',
        localName: 'Carnevale di Venezia',
        date: '2027-01-30',
        month: 1,
        day: 30,
        type: 'Cultural Special Day',
        category: 'cultural',
        description: 'One of the most artistic and enchanting pre-Lenten carnivals in the world, famed for its porcelain masks (Bauta & Volto) and candlelit gondola flotillas.',
        traditions: ['Flight of the Angel (Volo dell’Angelo) descending from St. Mark’s Campanile', 'Elaborate 18th-century baroque costumes and hand-painted porcelain masks', 'Grand masquerade balls in historic Venetian palazzos along the Grand Canal'],
        greeting: 'Buon Carnevale! Che la festa abbia inizio!',
        foodDelicacies: ['Frìtole (Venetian fried sweet dough balls with pine nuts and raisins)', 'Galani / Chiacchiere dusted with powdered sugar', 'Prosecco di Valdobbiadene'],
        bannerUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'it-ferragosto',
        name: 'Ferragosto (Assumption & Mid-Summer Feast)',
        localName: 'Ferragosto',
        date: '2027-08-15',
        month: 8,
        day: 15,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Originating from the ancient Roman Feriae Augusti festival of Emperor Augustus, celebrating the peak of summer with coastal excursions and banquet lunches.',
        traditions: ['Escaping cities for beach barbecues and mountain picnics', 'Grand midnight fireworks over coastal bays and lakes', 'Long multi-course family al fresco lunches beneath olive trees'],
        greeting: 'Buon Ferragosto a tutti!',
        foodDelicacies: ['Roast squab or stuffed chicken', 'Prosciutto e Melone (Cured ham wrapped around sweet cantaloupe)', 'Chilled Watermelon (Cocomero)', 'Caprese Salad with fresh buffalo mozzarella'],
        bannerUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  EG: {
    info: {
      code: 'EG',
      name: 'Egypt',
      nativeName: 'مصر (Miṣr)',
      flag: '🇪🇬',
      continent: 'Africa',
      capital: 'Cairo',
      culturalSummary: 'Cradle of ancient pharaonic wonder on the banks of the Nile, where millenia-old spring celebrations like Sham El-Nessim unite all communities in joy.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'eg-sham-el-nessim',
        name: 'Sham El-Nessim (Spring Festival of the Nile)',
        localName: 'شم النسيم (Sham El-Nessim)',
        date: '2027-05-03',
        month: 5,
        day: 3,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'An ancient Egyptian festival celebrated for over 4,500 years since the Old Kingdom, marking the rebirth of nature and the blossoming of spring along the Nile.',
        traditions: ['Picnicking in lush gardens along the banks of the Nile River', 'Painting boiled eggs with colorful patterns of good luck and fertility', 'Taking scenic felucca wooden sailboat rides across the Nile breeze'],
        greeting: 'Kull sannah wa intum tayyibeen! Happy Sham El-Nessim!',
        foodDelicacies: ['Feseekh (Traditional fermented cured mullet fish)', 'Fresh green scallions and romaine lettuce', 'Colored hard-boiled eggs', 'Fluffy Baladi bread'],
        bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  ZA: {
    info: {
      code: 'ZA',
      name: 'South Africa',
      nativeName: 'South Africa / Suid-Afrika / Mzansi',
      flag: '🇿🇦',
      continent: 'Africa',
      capital: 'Pretoria / Cape Town',
      culturalSummary: 'The Rainbow Nation celebrated for Freedom Day, Nelson Mandela Day of service, and National Heritage Day where all eleven official cultures unite over the open-flame braai.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'za-heritage-day',
        name: 'Heritage Day (National Braai Day)',
        localName: 'Heritage Day / Braaidag',
        date: '2027-09-24',
        month: 9,
        day: 24,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'Celebrates South Africa’s rich cultural diversity across Zulu, Xhosa, Sotho, Afrikaner, Indian, and British heritages, united around open-flame barbecue fires (Braai).',
        traditions: ['Gathering outdoors for communal braais over fragrant wood coals', 'Dressing in vibrant traditional cultural attire like Shweshwe and beadwork', 'Storytelling celebrating ancestral roots and multicultural harmony'],
        greeting: 'Happy Heritage Day! Proudly South African.',
        foodDelicacies: ['Boerewors spiced beef sausages', 'Braaied Lamb Chops with Chakalaka spicy relish', 'Pap (Maize porridge)', 'Malva Pudding with warm custard'],
        bannerUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 'za-freedom-day',
        name: 'Freedom Day',
        localName: 'Freedom Day',
        date: '2027-04-27',
        month: 4,
        day: 27,
        type: 'Public Holiday',
        category: 'national',
        description: 'Commemorates the first post-apartheid democratic elections held on April 27, 1994, which elected Nelson Mandela as president and established democratic equality.',
        traditions: ['National memorial addresses by leaders celebrating freedom fighters', 'Community unity concerts and art exhibitions', 'Reflecting on human rights and the constitution'],
        greeting: 'Celebrate freedom, democracy, and equality for all.',
        foodDelicacies: ['Bobotie spiced baked mince with egg custard', 'Rooibos tea with honey', 'Koeksisters sweet twisted syrup pastries'],
        bannerUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  AU: {
    info: {
      code: 'AU',
      name: 'Australia',
      nativeName: 'Commonwealth of Australia',
      flag: '🇦🇺',
      continent: 'Oceania',
      capital: 'Canberra',
      culturalSummary: 'A sun-drenched continent honoring tens of thousands of years of First Nations Indigenous culture alongside ANZAC Day remembrance and beachside Christmas celebrations.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'au-anzac-day',
        name: 'ANZAC Day',
        localName: 'Australian & New Zealand Army Corps Day',
        date: '2027-04-25',
        month: 4,
        day: 25,
        type: 'Public Holiday',
        category: 'national',
        description: 'One of Australia and New Zealand’s most sacred national days, commemorating the landing of ANZAC troops at Gallipoli in 1915 and honoring all who served.',
        traditions: ['Emotional Dawn Services at cenotaphs as the bugle plays The Last Post', 'Wearing red Flanders poppy flowers and rosemary sprigs for remembrance', 'Playing the traditional coin-tossing game of Two-Up at RSL clubs'],
        greeting: 'Lest We Forget.',
        foodDelicacies: ['Crispy Golden Anzac Oat Biscuits', 'Campfire Billy Tea with eucalyptus leaves', 'Roast Lamb with rosemary potatoes'],
        bannerUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  NZ: {
    info: {
      code: 'NZ',
      name: 'New Zealand',
      nativeName: 'Aotearoa',
      flag: '🇳🇿',
      continent: 'Oceania',
      capital: 'Wellington',
      culturalSummary: 'The land of the long white cloud, renowned for the revival of Matariki (the Māori New Year star cluster), Waitangi Day treaties, and earth-oven Hāngī feasts.',
      majorHolidaysCount: 6
    },
    holidays: [
      {
        id: 'nz-matariki',
        name: 'Matariki (Māori New Year)',
        localName: 'Te Mātahi o te Tau',
        date: '2027-06-25',
        month: 6,
        day: 25,
        type: 'Public Holiday',
        category: 'cultural',
        description: 'A statutory national public holiday in New Zealand celebrating the rising of the Pleiades star cluster (Matariki), marking remembrance, gratitude, and future planting.',
        traditions: ['Early dawn stargazing of the Matariki constellation with Karakia blessings', 'Sharing communal Hāngī feasts cooked in earthen steam pits', 'Flying traditional Māori kites (Manu Tukutuku) to bridge earth and sky'],
        greeting: 'Mānawatia a Matariki! (Celebrate and honor Matariki!)',
        foodDelicacies: ['Traditional Hāngī (Kumara sweet potato, pork, pumpkin steamed over hot volcanic stones)', 'Kānga Pīrau (Fermented corn pudding)', 'Rewena Paraoa (Māori sourdough potato bread)'],
        bannerUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
};
