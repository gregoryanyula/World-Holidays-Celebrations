import { Holiday, HolidayRespectGuidelines, HolidaySoundscape } from '../types';

export interface GuideCategorySection {
  id: string;
  title: string;
  icon: string;
  badge: string;
  description: string;
  holidays: Array<{
    name: string;
    holidayId: string;
    date: string;
    origin: string;
    traditions: string;
    globalVariations?: string;
    funFact?: string;
    shoppingTip?: string;
  }>;
}

export const MAJOR_HOLIDAYS_BY_CATEGORY: GuideCategorySection[] = [
  {
    id: 'religious',
    title: 'Religious Holidays',
    icon: 'Sparkles',
    badge: 'Faith & Community',
    description: 'Foundational to cultures worldwide, tied to spiritual devotion, historical miracles, and community charity.',
    holidays: [
      {
        name: 'Christmas (December 25)',
        holidayId: 'christmas',
        date: 'December 25',
        origin: 'Celebrates the birth of Jesus Christ, rooted in the Gospel of Luke. Chosen to coincide with pagan winter solstice festivals like Saturnalia.',
        traditions: 'Gift-giving linked to the Magi, evergreen Christmas trees symbolizing eternal life, and Midnight Mass.',
        globalVariations: 'In the Philippines, it’s a month-long festival with colorful Parol star lanterns and "Simbang Gabi" dawn Masses. In the UK/Commonwealth, followed by Boxing Day.',
        funFact: 'St. Nicholas, the patron saint behind Santa Claus, was a 4th-century Greek bishop renowned for secretly gifting gold dowries to impoverished daughters.'
      },
      {
        name: 'Kwanzaa (December 26–January 1)',
        holidayId: 'kwanzaa',
        date: 'December 26 – January 1',
        origin: 'Created in 1966 by Dr. Maulana Karenga as a Pan-African cultural holiday celebrating community, resilience, and African heritage.',
        traditions: 'Seven principles (Nguzo Saba), lighting the Kinara candle holder (3 red, 1 black, 3 green candles), and exchanging handmade or educational gifts (Zawadi).',
        funFact: 'The name Kwanzaa comes from the Swahili phrase "matunda ya kwanza", meaning "first fruits of the harvest".'
      },
      {
        name: 'Easter (March/April, movable date)',
        holidayId: 'easter',
        date: 'Movable (Spring full moon)',
        origin: 'Commemorates the resurrection of Jesus Christ, observed on the first Sunday after the first full moon following the spring equinox.',
        traditions: 'Egg hunts symbolizing rebirth and empty tomb, dawn church services, hot cross buns (UK), and Tsoureki braided bread (Greece).',
        globalVariations: 'In Spain, Semana Santa features dramatic candlelit penitential processions with magnificent floats (pasos).',
        funFact: 'The Easter Bunny stems from German folklore (Osterhase), while Easter eggs echo ancient Persian and Germanic spring fertility celebrations.'
      },
      {
        name: 'Eid al-Fitr (End of Ramadan)',
        holidayId: 'eid-al-fitr',
        date: 'Varies by lunar calendar',
        origin: 'Marks the completion of Ramadan, the holy month of fasting, reflection, and community devotion.',
        traditions: 'Communal Salat al-Eid morning prayer in open fields, mandatory Zakat al-Fitr charity, and visiting extended families.',
        globalVariations: 'In Indonesia (Lebaran), it triggers the nationwide "Mudik" homecoming exodus. Families feast on Ketupat and date-filled Ma’amoul cookies.',
        funFact: 'Charity (Zakat) must be disbursed before dawn prayers so every community member can participate in the celebratory feast.'
      },
      {
        name: 'Eid al-Adha (Festival of Sacrifice)',
        holidayId: 'eid-al-adha',
        date: 'Varies by lunar calendar',
        origin: 'Commemorates Prophet Ibrahim’s willingness to sacrifice his son in obedience to God. Concludes the annual Hajj pilgrimage in Mecca.',
        traditions: 'Qurbani animal sacrifice with meat strictly divided: 1/3 to the family, 1/3 to relatives/friends, and 1/3 to the needy and vulnerable.',
        funFact: 'Over 2 million pilgrims from 160+ countries gather simultaneously in Mina and Mount Arafat during this time.'
      },
      {
        name: 'Diwali (Festival of Lights)',
        holidayId: 'diwali-festival-of-lights',
        date: 'October/November',
        origin: 'Celebrates Lord Rama’s return to Ayodhya after defeating Ravana in the Ramayana, and invokes Goddess Lakshmi for prosperity and wisdom.',
        traditions: 'Lighting clay diyas, designing colorful geometric floor rangolis, eco-fireworks, and sharing mithai (sweets).',
        globalVariations: 'In Bali, Indonesia, Galungan honors deities and ancestors with tall bamboo penjor poles. In Nepal, Tihar celebrates dogs, cows, and crows during Gai Jatra.',
        funFact: 'Over 1 billion people celebrate Diwali annually across India, Nepal, Fiji, Guyana, Mauritius, and the diaspora.'
      },
      {
        name: 'Yom Kippur (Day of Atonement)',
        holidayId: 'yom-kippur',
        date: 'September/October (10 Tishrei)',
        origin: 'The holiest day in Judaism, observed 10 days after Rosh Hashanah. Dedicated to 25 hours of fasting, intensive prayer, and spiritual repentance.',
        traditions: 'Attending synagogue services all day, wearing white clothing to signify purity and humility, and refraining from work, leather shoes, or perfumes.',
        funFact: 'The solemn 25-hour fast concludes with a single, triumphant blast of the Shofar (ram’s horn), followed by a joyful break-fast feast.'
      },
      {
        name: 'Rosh Hashanah (Jewish New Year)',
        holidayId: 'rosh-hashanah',
        date: 'September/October (1–2 Tishrei)',
        origin: 'Marks the traditional anniversary of the creation of the world and humanity, initiating the Ten Days of Awe leading up to Yom Kippur.',
        traditions: 'Dipping crisp apple slices in sweet honey to wish for a "sweet new year", tasting pomegranates with 613 seeds, and sounding the Shofar 100 times.',
        funFact: 'Round challah breads are baked rather than braided, symbolizing the cyclical and unending nature of life and seasons.'
      }
    ]
  },
  {
    id: 'national',
    title: 'National & Patriotic Holidays',
    icon: 'ShieldCheck',
    badge: 'Sovereignty & History',
    description: 'Celebrating national identity, liberation, and pivotal milestones in the march of human freedom.',
    holidays: [
      {
        name: 'Independence Day (July 4, USA)',
        holidayId: 'us-independence-day',
        date: 'July 4',
        origin: 'Commemorates the adoption of the Declaration of Independence by the Continental Congress on July 4, 1776, declaring sovereignty from Britain.',
        traditions: 'Backyard barbecues, red-white-and-blue decor, brass band concerts, and monumental fireworks over city skylines.',
        funFact: 'Fireworks were first detonated in 1777 at Fort Ticonderoga and Philadelphia. John Adams predicted July 2 would be the historic day, but July 4 prevailed!'
      },
      {
        name: 'Bastille Day (July 14, France)',
        holidayId: 'bastille-day',
        date: 'July 14',
        origin: 'Marks the storming of the Bastille prison on July 14, 1789, a turning point in the French Revolution that dismantled absolute royal tyranny.',
        traditions: 'Oldest military parade on the Champs-Élysées, firemen’s balls (Bals des pompiers) in local firehouses, and fireworks illuminating the Eiffel Tower.',
        funFact: 'Known in France as "La Fête Nationale" or simply "Le Quatorze Juillet"; the word "Bastille Day" is primarily used by English speakers.'
      },
      {
        name: 'Day of the Republic / Grito de Dolores (September 16, Mexico)',
        holidayId: 'mexico-day-of-the-republic',
        date: 'September 16',
        origin: 'Honors Father Miguel Hidalgo’s historic 1810 cry for freedom ("El Grito de Dolores"), initiating Mexico’s war of independence against Spain.',
        traditions: 'The President rings Hidalgo’s bell at the National Palace shouting "¡Viva México!", massive mariachi concerts, and eating Chiles en Nogada.',
        funFact: 'Not to be confused with Cinco de Mayo! September 16 is Mexico’s premier national holiday celebrated in every zócalo town square.'
      },
      {
        name: 'Cinco de Mayo (May 5, Mexico & USA)',
        holidayId: 'cinco-de-mayo',
        date: 'May 5',
        origin: 'Commemorates the unlikely victory of the Mexican army over the French Empire at the Battle of Puebla on May 5, 1862.',
        traditions: 'Battle reenactments in Puebla, mariachi performances, folkloric zapateado dance, and savoring savory mole poblano.',
        funFact: 'While a regional civic holiday in Mexico, it has become a nationwide celebration of Mexican-American heritage and music in the United States.'
      }
    ]
  },
  {
    id: 'romantic',
    title: 'Romantic & Love-Themed Holidays',
    icon: 'Heart',
    badge: 'Affection & Bonds',
    description: 'Celebrating romance, deep companionship, and cultural expressions of love across the continents.',
    holidays: [
      {
        name: 'Valentine’s Day (February 14)',
        holidayId: 'valentines-day',
        date: 'February 14',
        origin: 'Named for St. Valentine, a 3rd-century Roman priest who secretly performed marriages for soldiers in defiance of Emperor Claudius II.',
        traditions: 'Exchanging handwritten cards, red roses, and fine chocolates. In Japan, women gift "Giri-choco" to colleagues and "Honmei-choco" to romantic interests.',
        funFact: 'The oldest known Valentine love poem was penned from the Tower of London in 1415 by Charles, Duke of Orléans, to his wife.'
      },
      {
        name: 'White Day (March 14, Japan & East Asia)',
        holidayId: 'white-day-japan',
        date: 'March 14',
        origin: 'Created by the Japanese confectionery association in 1978 as an answer to Valentine’s Day, where men reciprocate gifts given by women one month earlier.',
        traditions: 'Men gift white chocolates, marshmallows, cookies, and jewelry under the rule of "Sanbai Gaeshi" (triple the value of the original gift).',
        funFact: 'White was chosen as a symbol of pure, sweet love and sugar confection.'
      },
      {
        name: 'Black Day (April 14, South Korea)',
        holidayId: 'black-day-korea',
        date: 'April 14',
        origin: 'A humorous South Korean cultural counterpart for singles who did not receive gifts on Valentine’s Day (Feb 14) or White Day (March 14).',
        traditions: 'Singles dress in black clothing and gather at local diners to feast on steaming bowls of Jajangmyeon (thick noodles in black bean sauce).',
        funFact: 'Korean popular culture features monthly date-themed holidays on the 14th of every single month of the year.'
      },
      {
        name: 'Burns Night (January 25, Scotland)',
        holidayId: 'burns-night',
        date: 'January 25',
        origin: 'Celebrates Scotland’s beloved national poet Robert Burns on his birthday, honoring his iconic love ballads like "A Red, Red Rose" and "Auld Lang Syne".',
        traditions: 'Piping in the Haggis with bagpipes, reciting the theatrical "Address to a Haggis", toast with single malt Scotch whisky, and reciting poetry.',
        funFact: 'The haggis is theatrically cut open with a ceremonial sgian-dubh dirk during the recitation of the verse "An’ cut you up wi’ ready slight".'
      },
      {
        name: 'Lovers’ Day / Dia dos Namorados (June 12 / June 6, Brazil)',
        holidayId: 'lovers-day-brazil',
        date: 'June 12',
        origin: 'Celebrated on the eve of Saint Anthony’s Day (Santo Antônio), the Portuguese Franciscan friar revered as the patron saint of marriage and matchmaking.',
        traditions: 'Couples exchange passionate cartões love notes, bouquets of orchids, and jewelry, followed by festive candlelit dinners and samba melodies.',
        funFact: 'Single individuals perform playful folkloric folk charms (simpatias) to St. Anthony to help find their ideal life partner.'
      }
    ]
  },
  {
    id: 'commercial',
    title: 'Gift-Giving & Commercial Holidays',
    icon: 'Gift',
    badge: 'Commerce & Economy',
    description: 'Shaping international retail seasons, charitable drives, and centuries-old etiquette of reciprocal appreciation.',
    holidays: [
      {
        name: 'Singles’ Day / Double 11 (November 11, China)',
        holidayId: 'singles-day-china',
        date: 'November 11',
        origin: 'Started in 1993 by Nanjing University students celebrating being single (11/11 resembles 4 bare sticks). Transformed into the world’s largest shopping event.',
        traditions: 'Alibaba’s 11.11 Global Shopping Festival, televised galas with pop stars, flash sales, and gifting oneself special treats.',
        shoppingTip: 'Prepare digital shopping carts days in advance; record-breaking volumes often trigger instant sellouts within seconds of midnight.',
        funFact: 'Generates more gross merchandise volume in 24 hours than Black Friday and Cyber Monday combined.'
      },
      {
        name: 'Black Friday (Day after Thanksgiving)',
        holidayId: 'black-friday',
        date: 'Late November',
        origin: 'Originated in Philadelphia in the 1960s to describe heavy post-Thanksgiving traffic, later reinterpreted as retailers turning profitable ("in the black").',
        traditions: 'Early morning store openings, doorbuster markdowns, and kickstarting holiday shopping across the USA, UK, Canada, and online globally.',
        shoppingTip: 'Check price-history trackers online to verify genuine discounts versus staged markups.'
      },
      {
        name: 'Cyber Monday (Monday after Thanksgiving)',
        holidayId: 'cyber-monday',
        date: 'Late November',
        origin: 'Coined in 2005 by the National Retail Federation to describe the surge in digital e-commerce shopping when workers returned to high-speed office internet.',
        traditions: 'Online exclusive discounts, digital tech bundles, and gift purchasing.',
        shoppingTip: 'Use browser coupon extensions and price alerts to stack savings.'
      },
      {
        name: 'Boxing Day (December 26)',
        holidayId: 'boxing-day',
        date: 'December 26',
        origin: 'Victorian British custom where churches distributed alms from collection boxes to the poor, and employers gifted servants with boxes of provisions.',
        traditions: 'Post-Christmas retail sales, charitable food drives, leftovers sandwiches, and marquee Premier League football and Test cricket fixtures.',
        funFact: 'Observed as an official public bank holiday in the UK, Canada, Australia, and New Zealand.'
      },
      {
        name: 'Oseibo / Rei (Late December, Japan)',
        holidayId: 'rei-japan',
        date: 'December 20–28',
        origin: 'Centuries-old Japanese year-end gift-giving tradition to express sincere gratitude (rei) to supervisors, mentors, doctors, and benefactors.',
        traditions: 'Presenting impeccably wrapped gourmet delicacies (ham, premium nori, seasonal fruit) using furoshiki wrapping cloths.',
        shoppingTip: 'Gift wrapping is considered an art form; always avoid odd numbers of items and never wrap in green or white mourning motifs.',
        funFact: 'Recipients often send immediate handwritten thank-you notes (Orei-jou) within three days of arrival.'
      }
    ]
  },
  {
    id: 'nature',
    title: 'Nature & Harvest Holidays',
    icon: 'Sun',
    badge: 'Seasons & Astronomy',
    description: 'Celebrating astronomy, equinoxes, fertile soils, and gratitude for the earth’s harvest abundance.',
    holidays: [
      {
        name: 'Spring Equinox & Nowruz (March 20)',
        holidayId: 'nowruz-persian-new-year',
        date: 'March 20',
        origin: 'Rooted in ancient Zoroastrian traditions celebrating astronomical spring when day and night are equal. Celebrated across Iran and Central Asia for 3,000+ years.',
        traditions: 'Spring house-cleaning (Khaneh-Tekani), setting the Haft Sin table with 7 symbolic items, jumping over bonfires on Chaharshanbe Suri, and visiting kin.',
        funFact: 'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity.'
      },
      {
        name: 'Ostara (Spring Equinox, Germanic)',
        holidayId: 'spring-equinox',
        date: 'March 20–22',
        origin: 'Ancient Germanic and Celtic pagan celebration of the spring equinox, honoring Ēostre, the goddess of dawn, spring, and fertility.',
        traditions: 'Decorating real eggs with natural herb dyes, planting spring garden seeds, lighting dawn fires, and welcoming the sacred hare.',
        funFact: 'The English word "Easter" is etymologically derived directly from the Germanic goddess Ēostre.'
      },
      {
        name: 'Thanksgiving (USA & Canada)',
        holidayId: 'thanksgiving',
        date: '4th Thursday in Nov (US) / 2nd Monday in Oct (Canada)',
        origin: 'Commemorates the 1621 three-day harvest feast shared between the English Pilgrims and the Wampanoag people in Plymouth. Proclaimed a national holiday by Lincoln in 1863.',
        traditions: 'Roast turkey with cranberry sauce and stuffing, pumpkin pie, the Macy’s Thanksgiving Day Parade in NYC, and NFL football.',
        funFact: 'Wild cranberries, venison, cod, and corn were on the 1621 menu; modern sweet potato casseroles and mashed potatoes came much later!'
      },
      {
        name: 'Mid-Autumn Harvest Moon Festival (China & East Asia)',
        holidayId: 'mid-autumn-festival',
        date: 'September/October (15th of 8th lunar month)',
        origin: 'Dating back over 3,000 years to the Shang Dynasty, worshiping the full harvest moon and honoring Chang’e, the mythical Moon Goddess.',
        traditions: 'Admiring the bright full harvest moon, sharing rich lotus seed mooncakes with salted yolk, and hanging vibrant lantern riddle displays.',
        funFact: 'The round shape of mooncakes and the full moon symbolize harmony, completeness, and family reunion.'
      }
    ]
  },
  {
    id: 'cultural',
    title: 'Cultural & Historical Holidays',
    icon: 'Globe2',
    badge: 'Heritage & Identity',
    description: 'Honoring ancestral memory, civil resistance, workers’ rights, and vibrant folk traditions.',
    holidays: [
      {
        name: 'Obon Festival (August 13–16, Japan)',
        holidayId: 'obon-japan',
        date: 'August 13–16',
        origin: 'A Buddhist-Shinto tradition observed for over 500 years where families welcome back the visiting spirits of their deceased ancestors.',
        traditions: 'Hanging paper chochin lanterns, communal Bon Odori circle dances around a yagura drum tower, and releasing floating lanterns (Toro Nagashi) on rivers.',
        funFact: 'Watermelon-splitting games (Suikawari) and dazzling summer fireworks (Hanabi) often conclude the festivities.'
      },
      {
        name: 'Halloween / Samhain (October 31)',
        holidayId: 'halloween',
        date: 'October 31',
        origin: 'Evolved from the ancient Celtic festival of Samhain in Ireland, marking the boundary between harvest and winter when spirits could cross into the living world.',
        traditions: 'Dressing in costumes to disguise oneself from wandering spirits, carving scary faces into pumpkins (jack-o’-lanterns), and neighborhood trick-or-treating.',
        funFact: 'Original Irish jack-o’-lanterns were carved into turnips and rutabagas; pumpkins were adopted in America because they were much easier to carve!'
      },
      {
        name: 'International Workers’ Day / May Day (May 1)',
        holidayId: 'labor-day-international',
        date: 'May 1',
        origin: 'Commemorates the 1886 Haymarket affair in Chicago and the international struggle for the eight-hour workday.',
        traditions: 'Labor union rallies, civic parades for workers’ safety and fair wages, and exchanging Lily of the Valley flowers (in France as Porte-bonheur).',
        funFact: 'Celebrated as an official public holiday in over 80 countries across Europe, Latin America, Africa, and Asia.'
      },
      {
        name: 'Pride Month (June)',
        holidayId: 'pride-month',
        date: 'Month of June',
        origin: 'Commemorates the June 1969 Stonewall uprising in Greenwich Village, New York City, sparking the modern global movement for LGBTQ+ civil rights.',
        traditions: 'Massive rainbow pride marches, human rights workshops, artistic memorials, and community equality galas in hundreds of cities worldwide.',
        funFact: 'The original 8-color rainbow flag was designed in 1978 by artist and activist Gilbert Baker in San Francisco.'
      }
    ]
  }
];

// Respectful Etiquette Protocol Guidelines from the prompt
export const RESPECTFUL_OBSERVANCE_GUIDELINES = {
  dos: [
    {
      title: 'Research Local Customs in Advance',
      description: 'Understand sacred color symbolism before arriving (e.g. avoid wearing mourning black to Hindu weddings or white flowers in certain Asian celebrations).'
    },
    {
      title: 'Follow Sacred Footwear & Attire Rules',
      description: 'Remove shoes when entering Japanese homes, Buddhist temples, Hindu mandirs, and mosques. Cover shoulders and knees in sacred spaces.'
    },
    {
      title: 'Ask Permission Before Photographing',
      description: 'Always ask family members before taking photos of private ofrendas, mourning gravesites, or worshiping congregations during sacred moments.'
    },
    {
      title: 'Support Authentic Local Artisans',
      description: 'Purchase festive treats and crafts directly from local neighborhood markets, bakers, and generational craftsmen.'
    },
    {
      title: 'Learn Authentic Cultural Greetings',
      description: 'Greet locals in their native tongue: "Shubh Deepavali", "Eid Mubarak", "¡Feliz Día!", "Gong Xi Fa Cai", or "Lá Fhéile Pádraig Sona Duit".'
    }
  ],
  donts: [
    {
      title: 'Never Mock or Trivialize Sacred Holidays',
      description: 'Avoid sarcastic or dismissive remarks about solemn fasts, religious tenets, or sacred historical memorial rites.'
    },
    {
      title: 'Don’t Assume Everyone Celebrates the Same Way',
      description: 'Celebrations vary wildly across regions (e.g., month-long Philippine Christmas vs. minimalist Western Christmas; Bali Galungan vs. North Indian Diwali).'
    },
    {
      title: 'Never Crash Private Family Gatherings',
      description: 'Unless you have been explicitly welcomed, do not intrude upon intimate family break-fast banquets or ancestor home altars.'
    },
    {
      title: 'Don’t Disregard Dress Codes',
      description: 'Never wear shorts, beachwear, or casual graphic tees to religious ceremonies, synagogues, cathedrals, or solemn memorials.'
    },
    {
      title: 'Never Appropriate Sacred Ritual Objects',
      description: 'Do not purchase or treat ceremonial objects (such as Native American headdresses or consecrated deity statues) as decorative costume novelties.'
    }
  ],
  travelTips: [
    {
      context: 'Bank & Commercial Closures',
      tip: 'During nationwide holidays (such as Eid al-Fitr across the Gulf, Lunar New Year across East Asia, or Yom Kippur in Israel), government offices, banks, and grocery markets will be closed. Plan currency, transit, and rations 48 hours in advance.'
    },
    {
      context: 'Sensitive Political Discussions',
      tip: 'On national holidays like Bastille Day in France or Independence Day in Mexico, focus on cultural history and music rather than sparking divisive local party debates.'
    },
    {
      context: 'Thoughtful Hospitality Gifts',
      tip: 'When invited to someone’s home for a celebration, always bring a small gift such as high-grade sweets, chocolates, tea, or flowers (be mindful of even numbers in Japan!).'
    },
    {
      context: 'Respecting Quiet Observances',
      tip: 'During solemn days of reflection like Yom Kippur in Israel or Bali’s Nyepi (Day of Silence), avoid loud phone calls, music, driving, or disruptive activities in public.'
    }
  ]
};

// Full list of Holidays to incorporate into data
export const COMPREHENSIVE_MAJOR_HOLIDAYS: Holiday[] = [
  {
    id: 'christmas',
    name: 'Christmas',
    localName: 'Natale / Noël / Navidad / Pasko',
    date: '2026-12-25',
    month: 12,
    day: 25,
    country: 'Global Christian World',
    countryCode: 'UN',
    category: 'religious',
    description: 'Celebrates the birth of Jesus Christ, rooted in the Gospel of Luke. Chosen to coincide with ancient winter solstice festivals like Saturnalia. Celebrated globally with gift-giving, carol singing, decorated evergreen trees, and midnight liturgical services.',
    traditions: [
      'Midnight Mass (Misa de Gallo) and candlelight cathedral vigils',
      'Decorating evergreen Christmas trees symbolizing eternal life',
      'Exchanging gifts linked to the biblical Magi’s gold, frankincense, and myrrh',
      'Philippines: Simbang Gabi nine-day dawn Masses with glowing Parol star lanterns'
    ],
    greeting: 'Merry Christmas! / ¡Feliz Navidad! / Joyeux Noël!',
    foodDelicacies: ['Roast Turkey with Stuffing', 'Bibingka & Puto Bumbong', 'Panettone', 'Mince Pies', 'Gingerbread'],
    bannerUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    tags: ['Christmas', 'Winter Solstice', 'Religious', 'Global', 'Magi'],
    facts: [
      'The date December 25 was officially instituted in 336 AD during the reign of Roman Emperor Constantine.',
      'In the Philippines, the Christmas season begins as early as September, making it the longest Christmas festival in the world.'
    ],
    popularityScore: 100,
    latitude: 31.7054,
    longitude: 35.2024,
    originHistory: 'Gospel of Luke; theological celebration of the Incarnation aligned historically with Roman winter solstice celebrations.',
    soundscape: {
      title: 'Cathedral Organ & Winter Solstice Chimes',
      instrument: 'Pipe Organ, Cathedral Bells, Choral Harmonies',
      genre: 'Sacred European Choral',
      description: 'Soaring pipe organ swells and cathedral bells echoing over snowy twilight streets.',
      preset: 'choral_carols'
    },
    respectGuidelines: {
      dos: ['Respect church silence during solemn Midnight Mass', 'Accept hospitality and share goodwill with neighbors'],
      donts: ['Do not use phone cameras with flash during sacred liturgical sacraments'],
      travelTip: 'Expect widespread store and public transit shutdowns from midday Dec 24 through Dec 26.'
    }
  },
  {
    id: 'kwanzaa',
    name: 'Kwanzaa',
    localName: 'Kwanzaa (First Fruits)',
    date: '2026-12-26',
    month: 12,
    day: 26,
    country: 'United States & Pan-African Diaspora',
    countryCode: 'US',
    category: 'cultural',
    description: 'A 7-day Pan-African cultural festival founded in 1966 by Dr. Maulana Karenga, celebrating family, community values, self-determination, and African heritage.',
    traditions: [
      'Lighting the seven candles of the Kinara (Mishumaa Saba) each evening',
      'Reflecting on the Nguzo Saba (Seven Principles: Umoja, Kujichagulia, Ujima, Ujamaa, Nia, Kuumba, Imani)',
      'Displaying traditional African harvest symbols: Mkeka mat, Mazao crops, and Kikombe cha Umoja unity cup',
      'Hosting the joyous Karamu Ya Imani feast on December 31'
    ],
    greeting: 'Habari Gani? (What is the news?) - Umoja! (Unity!)',
    foodDelicacies: ['West African Jollof Rice', 'Southern Baked Macaroni & Cheese', 'Fried Plantains (Dodo)', 'Sweet Potato Pie'],
    bannerUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Kwanzaa', 'African-American', 'Nguzo Saba', 'Pan-African', 'Heritage'],
    facts: [
      'The colors of Kwanzaa are black for the people, red for the noble blood shed in the struggle, and green for the fertile future of Africa.',
      'Gifts (Zawadi) are traditionally handmade, cultural, or educational books to encourage learning and creativity.'
    ],
    popularityScore: 91,
    latitude: 34.0522,
    longitude: -118.2437,
    originHistory: 'Created in 1966 by Dr. Maulana Karenga following the Watts rebellion to foster African-American pride and unity.',
    soundscape: {
      title: 'African Djembe Polyrhythm & Kalimba',
      instrument: 'Djembe, Kalimba, Shekere',
      genre: 'Pan-African Heritage',
      description: 'Resonant bass drum beats and gentle thumb piano melodies honoring the Nguzo Saba principles.',
      preset: 'african_djembe'
    },
    respectGuidelines: {
      dos: ['Take time to learn the meaning of the specific principle celebrated each day', 'Support Black-owned cultural businesses'],
      donts: ['Do not treat Kwanzaa as a substitute for religious faith; it is a cultural and community celebration open to all backgrounds'],
      travelTip: 'Community center celebrations in major cities often feature free drumming workshops and art markets.'
    }
  },
  {
    id: 'boxing-day',
    name: 'Boxing Day',
    localName: 'Boxing Day / St. Stephen’s Day',
    date: '2026-12-26',
    month: 12,
    day: 26,
    country: 'United Kingdom, Canada & Commonwealth',
    countryCode: 'GB',
    category: 'cultural',
    description: 'A traditional British and Commonwealth bank holiday that originated in the Victorian era as a day for employers and church parishes to give gift boxes and food hampers to servants, postmen, and the poor.',
    traditions: [
      'Charitable donations and volunteering at local food banks',
      'Attending high-stakes Premier League football and Test cricket matches',
      'Shopping massive post-holiday clearance sales',
      'Enjoying leftover holiday roast turkey and ham bubble-and-squeak'
    ],
    greeting: 'Happy Boxing Day! Wishing you rest and good cheer!',
    foodDelicacies: ['Bubble and Squeak', 'Cold Roast Ham & Piccalilli', 'Mince Pies with Brandy Butter', 'Cheddar & Chutney'],
    bannerUrl: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80',
    tags: ['Boxing Day', 'United Kingdom', 'Commonwealth', 'Football', 'Charity'],
    facts: [
      'Dates back to the Middle Ages when metal alms boxes in churches were opened on the Feast of St. Stephen and contents distributed to the needy.',
      'In Australia, the Boxing Day Test match at the Melbourne Cricket Ground draws over 90,000 spectators.'
    ],
    popularityScore: 89,
    latitude: 51.5074,
    longitude: -0.1278,
    soundscape: {
      title: 'Hearthside Acoustic & Fireside Crackle',
      instrument: 'Acoustic Guitar, Warm Strings, Fireside Ambience',
      genre: 'Commonwealth Folk Acoustic',
      description: 'Mellow acoustic guitar and comforting fireside atmosphere on the day after Christmas.',
      preset: 'hearthside_strings'
    }
  },
  {
    id: 'easter',
    name: 'Easter Sunday (Resurrection Sunday)',
    localName: 'Pascua / Pâques / Ostern / Pascha',
    date: '2027-03-28',
    month: 3,
    day: 28,
    country: 'Christian World & Worldwide',
    countryCode: 'UN',
    category: 'religious',
    description: 'Commemorates the resurrection of Jesus Christ on the third day after his crucifixion. Celebrated on the first Sunday after the first full moon post-equinox with joyous church hymns, festive egg painting, and abundant feasts.',
    traditions: [
      'Easter egg hunts symbolizing new life and the rolling away of the stone',
      'Dawn sunrise church services with lilies and choral alleluias',
      'Spain: Dramatic Holy Week (Semana Santa) processions with penitents and historic statues',
      'Sharing spiced Hot Cross Buns and roasted spring lamb'
    ],
    greeting: 'Happy Easter! He is risen! / ¡Felices Pascuas!',
    foodDelicacies: ['Hot Cross Buns', 'Roast Leg of Spring Lamb', 'Tsoureki Sweet Bread', 'Colomba di Pasqua', 'Chocolate Easter Eggs'],
    bannerUrl: 'https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?auto=format&fit=crop&w=1200&q=80',
    tags: ['Easter', 'Resurrection', 'Spring', 'Semana Santa', 'Eggs'],
    facts: [
      'The Easter Bunny (Osterhase) originated in 17th-century German Protestant folklore as an egg-laying hare judging children’s conduct.',
      'Easter’s date moves between March 22 and April 25 because it is calculated from the spring equinox and lunar full moon cycle.'
    ],
    popularityScore: 97,
    latitude: 37.3891,
    longitude: -5.9845,
    originHistory: 'Christian New Testament Gospels; coincides historically with the Jewish Passover (Pesach) and springtime rejuvenation.',
    soundscape: {
      title: 'Cathedral Organ & Winter Solstice Chimes',
      instrument: 'Pipe Organ, Cathedral Bells, Choral Alleluia',
      genre: 'Sacred European Choral',
      description: 'Triumphant pipe organ chords and ringing bells welcoming the dawn of spring and spiritual renewal.',
      preset: 'choral_carols'
    },
    respectGuidelines: {
      dos: ['Dress respectfully for church ceremonies and historic processions', 'Respect solemn silence during Holy Week penitential marches in Spain and Italy'],
      donts: ['Do not cut across moving religious processions'],
      travelTip: 'Accommodations in Seville, Rome, and Jerusalem book out months in advance for Holy Week.'
    }
  },
  {
    id: 'eid-al-adha',
    name: 'Eid al-Adha (Festival of Sacrifice)',
    localName: 'عيد الأضحى المبارك (Eid al-Adha)',
    date: '2027-05-16',
    month: 5,
    day: 16,
    country: 'Islamic World & Worldwide',
    countryCode: 'SA',
    category: 'religious',
    description: 'The major Islamic holiday honoring Prophet Ibrahim’s willingness to sacrifice his son in obedience to God. Concludes the annual Hajj pilgrimage in Mecca, observed with Qurbani animal sacrifices shared generously with the poor.',
    traditions: [
      'Communal early morning Eid prayer (Salat al-Eid)',
      'Qurbani sacrifice with meat divided into three equal portions: 1/3 family, 1/3 relatives, 1/3 needy',
      'Pilgrims performing the rites of Hajj at Mina, Arafat, and the Kaaba in Mecca',
      'Wearing finest festive clothes and visiting relatives'
    ],
    greeting: 'Eid Mubarak! / Kul ‘am wa antum bi-khair!',
    foodDelicacies: ['Slow-Roasted Spiced Lamb (Mechoui)', 'Biryani', 'Fatteh Meat Broth with Crispy Pita', 'Ma’amoul Dates'],
    bannerUrl: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80',
    tags: ['Eid', 'Hajj', 'Islam', 'Charity', 'Sacrifice'],
    facts: [
      'Also known as the Greater Eid (Eid al-Kabir), it lasts for four days in many Muslim-majority nations.',
      'The practice of dividing meat ensures that impoverished members of the community enjoy protein-rich festive meals.'
    ],
    popularityScore: 98,
    latitude: 21.4225,
    longitude: 39.8262,
    originHistory: 'Quranic account of Prophet Ibrahim (Abraham); spiritual pillar commemorating unconditional devotion to divine compassion.',
    soundscape: {
      title: 'Oud Strings & Evening Ramadan Breeze',
      instrument: 'Oud, Ney, Desert Wind',
      genre: 'Middle Eastern Maqam Hijaz',
      description: 'Soulful fretless oud melodies and soothing desert air celebrating community fellowship.',
      preset: 'oud_breeze'
    },
    respectGuidelines: {
      dos: ['Wish Muslim friends "Eid Mubarak"', 'Acknowledge that many businesses close during the four days of Eid'],
      donts: ['Do not schedule crucial corporate deadlines during the peak days of Eid al-Adha'],
      travelTip: 'Expect commercial closures and flight bookings surrounding Mecca and the Arabian Peninsula to be at annual capacity.'
    }
  },
  {
    id: 'yom-kippur',
    name: 'Yom Kippur (Day of Atonement)',
    localName: 'יוֹם כִּפּוּר (Yom Kippur)',
    date: '2026-09-21',
    month: 9,
    day: 21,
    country: 'Israel & Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'The holiest and most solemn day of the Jewish calendar, occurring 10 days after Rosh Hashanah. Marked by a 25-hour complete fast, continuous prayer, confession of sins, and spiritual reconciliation.',
    traditions: [
      'Complete 25-hour fast from sunset to sunset (no eating, drinking, or washing)',
      'Wearing white clothing (Kittel) to symbolize spiritual purity and humility',
      'Spending the entire day in synagogue immersed in the five prayer services',
      'Sounding the long, final Shofar blast (Tekiah Gedolah) at nightfall to mark the fast’s end'
    ],
    greeting: 'G’mar Chatimah Tovah! (May you be sealed for a good year in the Book of Life!)',
    foodDelicacies: ['Bagels with Lox & Cream Cheese (Break-fast)', 'Kugel', 'Chicken Soup with Matzo Balls', 'Honey Cake'],
    bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    tags: ['Yom Kippur', 'Judaism', 'Atonement', 'Fasting', 'Shofar'],
    facts: [
      'In Israel, all air traffic halts, television broadcasts pause, and motor vehicles do not drive; children cycle peacefully through empty highways.',
      'The book of Jonah is read in its entirety in the afternoon service as a lesson on repentance and divine mercy.'
    ],
    popularityScore: 93,
    latitude: 31.7767,
    longitude: 35.2345,
    originHistory: 'Torah (Leviticus 16:29–31); established as the Sabbath of Sabbaths for communal repentance and moral rededication.',
    soundscape: {
      title: 'Klezmer Clarinet & Menorah Chimes',
      instrument: 'Soulful Clarinet, Shofar, Temple Chimes',
      genre: 'Jewish Sacred Melodies',
      description: 'Solemn and soaring clarinet notes evoking heartfelt prayer, concluding with the clear resonance of the Shofar.',
      preset: 'klezmer_chimes'
    },
    respectGuidelines: {
      dos: ['Wish Jewish colleagues "Have an easy fast" or "G’mar Chatimah Tovah"', 'Respect complete quietness in observant neighborhoods'],
      donts: ['Do not eat, drink, or smoke in public in observant areas of Israel during Yom Kippur', 'Do not play loud music'],
      travelTip: 'Public transport, airports, restaurants, and shops across Israel shut down completely for 25 hours.'
    }
  },
  {
    id: 'rosh-hashanah',
    name: 'Rosh Hashanah (Jewish New Year)',
    localName: 'רֹאשׁ הַשָּׁנָה',
    date: '2026-09-12',
    month: 9,
    day: 12,
    country: 'Israel & Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'The Jewish New Year marking the anniversary of the creation of the world. It begins the Ten Days of Repentance leading up to Yom Kippur, observed with festive candle-lighting, synagogue liturgy, and symbolic sweet foods.',
    traditions: [
      'Dipping crisp apple wedges into golden honey to invoke a sweet new year',
      'Blowing the Shofar ram’s horn 100 times to awaken the soul to introspection',
      'Eating round Challah bread symbolizing the cyclical nature of the seasons and life',
      'Performing Tashlich by tossing breadcrumbs into a flowing stream to symbolically cast away mistakes'
    ],
    greeting: 'Shanah Tovah U’Metukah! (A Good and Sweet New Year!)',
    foodDelicacies: ['Apples dipped in Honey', 'Round Challah with Raisins', 'Pomegranate Arils', 'Honey Cake (Lekach)', 'Gefilte Fish'],
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rosh Hashanah', 'Jewish New Year', 'Honey', 'Shofar', 'Apples'],
    facts: [
      'Pomegranates are eaten because tradition holds they contain 613 seeds, corresponding to the 613 commandments (mitzvot) in the Torah.',
      'The sounding of the Shofar follows strict musical rhythms: Tekiah (one long note), Shevarim (three broken notes), and Teruah (nine rapid staccato notes).'
    ],
    popularityScore: 92,
    latitude: 31.7683,
    longitude: 35.2137,
    soundscape: {
      title: 'Klezmer Clarinet & Menorah Chimes',
      instrument: 'Clarinet, Chimes, Acoustic Strings',
      genre: 'Jewish Traditional',
      description: 'Lively, sweet clarinet melodies celebrating the sweet hopes of a fresh year.',
      preset: 'klezmer_chimes'
    }
  },
  {
    id: 'us-independence-day',
    name: 'Independence Day (4th of July)',
    localName: 'Fourth of July',
    date: '2027-07-04',
    month: 7,
    day: 4,
    country: 'United States of America',
    countryCode: 'US',
    category: 'national',
    description: 'Commemorates the adoption of the Declaration of Independence on July 4, 1776 by the Second Continental Congress, declaring sovereignty from the Kingdom of Great Britain. Celebrated nationwide with fireworks, parades, and family cookouts.',
    traditions: [
      'Elaborate public fireworks displays across city harbors and parks',
      'Backyard barbecues featuring burgers, hot dogs, and corn on the cob',
      'Town parades featuring veteran marching bands and local floats',
      'Reading the Declaration of Independence at civic centers'
    ],
    greeting: 'Happy 4th of July! Happy Independence Day!',
    foodDelicacies: ['Smoked BBQ Ribs', 'Grilled Burgers & Hot Dogs', 'Apple Pie à la Mode', 'Watermelon Slices', 'Potato Salad'],
    bannerUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80',
    tags: ['4th of July', 'Independence', 'USA', 'Fireworks', 'Barbecue'],
    facts: [
      'The first Independence Day fireworks were set off in Philadelphia and Fort Ticonderoga in 1777, just one year after the Declaration was approved.',
      'John Adams predicted July 2 would be celebrated with illuminations, as that was the day Congress voted for independence, but July 4 was the date stamped on the document.'
    ],
    popularityScore: 98,
    latitude: 38.8951,
    longitude: -77.0364,
    originHistory: 'Declaration of Independence authored primarily by Thomas Jefferson and adopted by representatives of the thirteen colonies.',
    soundscape: {
      title: 'Hearthside Acoustic & Fireside Crackle',
      instrument: 'Brass Horns, Marching Snare, Acoustic Guitar',
      genre: 'American Patriotic Folk',
      description: 'Spirited brass and acoustic strums evoking community parades and evening fireworks.',
      preset: 'hearthside_strings'
    }
  },
  {
    id: 'bastille-day',
    name: 'Bastille Day (La Fête Nationale)',
    localName: 'Le 14 Juillet / La Fête Nationale',
    date: '2027-07-14',
    month: 7,
    day: 14,
    country: 'France & French Territories',
    countryCode: 'FR',
    category: 'national',
    description: 'Marks the storming of the Bastille medieval fortress on July 14, 1789, a turning point in the French Revolution that symbolized the fall of absolute royal despotism and the triumph of Liberté, Égalité, Fraternité.',
    traditions: [
      'The prestigious military parade down the Avenue des Champs-Élysées in Paris',
      'Spectacular fireworks illuminating the Eiffel Tower and Champ de Mars',
      'Bals des pompiers (traditional dancing parties in local fire stations)',
      'Displaying the Tricolore flag (blue, white, and red)'
    ],
    greeting: 'Bonne Fête Nationale! Vive la France! Vive la République!',
    foodDelicacies: ['Fresh Crusty Baguettes', 'Artisanal French Cheeses (Brie, Comté)', 'Crêpes Suzette', 'Macarons', 'Kir Royale'],
    bannerUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    tags: ['Bastille Day', 'France', 'Paris', 'Revolution', 'Liberty'],
    facts: [
      'At the time of the storming in 1789, only seven prisoners were held inside the Bastille, but its symbolic status as a royal fortress made its capture legendary.',
      'France officially instituted July 14 as the national holiday in 1880, also celebrating the 1790 Fête de la Fédération unity rally.'
    ],
    popularityScore: 96,
    latitude: 48.8566,
    longitude: 2.3522,
    soundscape: {
      title: 'Bavarian Accordion & Brass Oom-Pah',
      instrument: 'Musette Accordion, Brass Fanfare',
      genre: 'French Musette / Patriotic Chime',
      description: 'Lively Parisian accordion melodies capturing the joy of open-air street dances.',
      preset: 'bavarian_polka'
    },
    respectGuidelines: {
      dos: ['Join the friendly dances at local fire stations (Bals des pompiers)', 'Watch the Eiffel Tower fireworks from Trocadéro or river quays'],
      donts: ['Avoid contentious local political arguments during patriotic festivities'],
      travelTip: 'Paris Metro stations around the Champs-Élysées and Eiffel Tower close early in the afternoon for security.'
    }
  },
  {
    id: 'mexico-day-of-the-republic',
    name: 'Mexican Independence Day (El Grito)',
    localName: 'Día de la Independencia / El Grito de Dolores',
    date: '2026-09-16',
    month: 9,
    day: 16,
    country: 'Mexico',
    countryCode: 'MX',
    category: 'national',
    description: 'Celebrates Father Miguel Hidalgo’s 1810 historic call to arms ("Grito de Dolores") against Spanish colonial rule. At 11 PM on September 15, the President rings the historic bell at the National Palace shouting "¡Viva México!", echoed in every plaza across the nation.',
    traditions: [
      'The ceremonial reenactment of "El Grito" from the balcony of the National Palace',
      'Streets packed with mariachi bands, trumpets, and folkloric zapateado dancers',
      'Spectacular civic parades and green-white-red fireworks illuminating cathedral zócalos',
      'Tasting seasonal Chiles en Nogada showing the colors of the Mexican flag'
    ],
    greeting: '¡Viva México! ¡Viva la Independencia!',
    foodDelicacies: ['Chiles en Nogada (Poblano Chiles with Walnut Cream & Pomegranate)', 'Pozole Rojo', 'Tamales', 'Mole Oaxaqueño'],
    bannerUrl: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=80',
    tags: ['Mexico', 'Independence', 'El Grito', 'Mariachi', 'Hidalgo'],
    facts: [
      'Although Father Hidalgo launched the rebellion on September 16, 1810, full independence was officially achieved 11 years later in 1821.',
      'Chiles en Nogada was created by Augustinian nuns in Puebla in 1821 to honor general Agustín de Iturbide with the national colors.'
    ],
    popularityScore: 95,
    latitude: 19.4326,
    longitude: -99.1332,
    soundscape: {
      title: 'Mariachi Brass & Fiesta Strum',
      instrument: 'Trumpets, Vihuela, Guitarrón',
      genre: 'Mexican Mariachi & Son',
      description: 'Triumphant brass fanfares and vihuela chord strums shouting ¡Viva México!',
      preset: 'mariachi_brass'
    }
  },
  {
    id: 'cinco-de-mayo',
    name: 'Cinco de Mayo',
    localName: 'El Cinco de Mayo / Batalla de Puebla',
    date: '2027-05-05',
    month: 5,
    day: 5,
    country: 'Mexico & United States',
    countryCode: 'MX',
    category: 'cultural',
    description: 'Commemorates the victorious stand of the Mexican army, commanded by General Ignacio Zaragoza, against invading French Empire forces at the Battle of Puebla on May 5, 1862. In the US, it has flourished into a massive festival of Mexican-American heritage and cuisine.',
    traditions: [
      'Puebla: Historical battle reenactments on the Loreto and Guadalupe hilltops',
      'Colorful street parades featuring dancers in traditional Charro and Adelita dress',
      'Mariachi music, accordion norteño tunes, and community festivals',
      'Feasting on slow-simmered Mole Poblano and fresh handmade tortillas'
    ],
    greeting: '¡Feliz Cinco de Mayo! Celebrating courage and heritage!',
    foodDelicacies: ['Mole Poblano with Tender Chicken', 'Chalupas Poblanas', 'Tacos al Pastor', 'Fresh Guacamole & Tortilla Chips', 'Agua de Horchata'],
    bannerUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cinco de Mayo', 'Puebla', 'Mexico', 'Mexican-American', 'Heritage'],
    facts: [
      'Cinco de Mayo is not Mexico’s Independence Day (that is September 16!). It celebrates a single military victory against a far better-equipped French army.',
      'General Ignacio Zaragoza, who led the Mexican troops to victory, was born in what is now Goliad, Texas.'
    ],
    popularityScore: 92,
    latitude: 19.0414,
    longitude: -98.2063,
    soundscape: {
      title: 'Mariachi Brass & Fiesta Strum',
      instrument: 'Trumpets, Vihuela, Guitarrón',
      genre: 'Mexican Son Huasteco & Mariachi',
      description: 'Lively acoustic strums and proud brass fanfares celebrating courage and culture.',
      preset: 'mariachi_brass'
    }
  },
  {
    id: 'valentines-day',
    name: 'Valentine’s Day',
    localName: 'Día de San Valentín / Saint Valentin',
    date: '2027-02-14',
    month: 2,
    day: 14,
    country: 'Global Observance',
    countryCode: 'UN',
    category: 'cultural',
    description: 'A global celebration of romantic love, affection, and friendship. Named for St. Valentine, a 3rd-century Roman priest who secretly wed Christian couples facing persecution. Observed with handwritten love letters, floral bouquets, and chocolates.',
    traditions: [
      'Gifting long-stemmed red roses and decadent chocolate truffles',
      'Writing intimate declarations of love inside greeting cards',
      'Romantic candlelit restaurant dinners and romantic getaways',
      'Japan: Women gift chocolate (Giri-choco to friends, Honmei-choco to partners)'
    ],
    greeting: 'Happy Valentine’s Day! / ¡Feliz San Valentín! / Joyeuse Saint-Valentin!',
    foodDelicacies: ['Dark Chocolate Truffles', 'Chocolate-Covered Strawberries', 'Raspberry Heart Macarons', 'Champagne Fondue'],
    bannerUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Valentine', 'Love', 'Romance', 'Flowers', 'Global'],
    facts: [
      'Approximately 145 million Valentine’s Day cards are exchanged globally each year, making it the second-largest card-sending holiday after Christmas.',
      'In Verona, Italy, thousands of romantic letters addressed to "Juliet" arrive from around the world each February.'
    ],
    popularityScore: 98,
    latitude: 41.9028,
    longitude: 12.4964,
    soundscape: {
      title: 'Hearthside Acoustic & Fireside Crackle',
      instrument: 'Acoustic Guitar, Soft Strings, Gentle Chimes',
      genre: 'Romantic Acoustic Serenade',
      description: 'Warm fingerpicked acoustic chords and tender strings expressing heartfelt devotion.',
      preset: 'hearthside_strings'
    }
  },
  {
    id: 'white-day-japan',
    name: 'White Day',
    localName: 'ホワイトデー (Howaito Dē)',
    date: '2027-03-14',
    month: 3,
    day: 14,
    country: 'Japan, South Korea & Taiwan',
    countryCode: 'JP',
    category: 'cultural',
    description: 'Celebrated exactly one month after Valentine’s Day. In East Asian custom where women give chocolates on February 14, White Day is the designated occasion for men to reciprocate with thoughtful white sweets and gifts.',
    traditions: [
      'Men gifting white chocolate, soft marshmallows, delicate candy, or cookies',
      'Following the romantic rule of "Sanbai Gaeshi" (returning two to three times the value)',
      'Exchanging white floral bouquets and white jewelry',
      'Young couples taking scenic dates to observation decks and cafes'
    ],
    greeting: 'Happy White Day! (ホワイトデーおめでとう！)',
    foodDelicacies: ['White Chocolate Bark', 'Fluffy Marshmallows', 'Matcha White Chocolate Cookies', 'Konpeitō Sugar Crystals'],
    bannerUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=1200&q=80',
    tags: ['White Day', 'Japan', 'South Korea', 'Romance', 'Sweets'],
    facts: [
      'In Japanese confectionery lore, marshmallows were the first marketed gift, symbolizing pure and honest love.',
      'Followed on April 14 in South Korea by "Black Day", when single friends gather over comforting black-bean noodles.'
    ],
    popularityScore: 88,
    latitude: 35.6762,
    longitude: 139.6503,
    soundscape: {
      title: 'Taiko Thunder & Shakuhachi Flute',
      instrument: 'Koto, Bamboo Flute, Gentle Chimes',
      genre: 'Modern Japanese Acoustic',
      description: 'Gentle traditional koto strings and delicate bells capturing youthful springtime affection.',
      preset: 'taiko_flute'
    }
  },
  {
    id: 'black-day-korea',
    name: 'Black Day',
    localName: '블랙데이 (Black Day)',
    date: '2027-04-14',
    month: 4,
    day: 14,
    country: 'South Korea',
    countryCode: 'KR',
    category: 'cultural',
    description: 'An informal holiday celebrated by singles on April 14. Those who did not receive gifts on Valentine’s Day or White Day dress in black clothing and gather with friends at Chinese-Korean diners to eat steaming bowls of black-bean noodles.',
    traditions: [
      'Wearing black outfits, hats, or accessories',
      'Feasting on large bowls of Jajangmyeon (noodles covered in dark fermented black bean paste)',
      'Laughing and bonding with single friends over shared freedom',
      'Cafes hosting special black-coffee and dark-chocolate promotions'
    ],
    greeting: 'Happy Black Day! May your noodles be delicious and friendships warm!',
    foodDelicacies: ['Jajangmyeon (Black Bean Sauce Noodles)', 'Tangsuyuk (Sweet & Sour Pork)', 'Black Sesame Ice Cream', 'Iced Americano'],
    bannerUrl: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&w=1200&q=80',
    tags: ['Black Day', 'South Korea', 'Singles', 'Jajangmyeon', 'Community'],
    facts: [
      'In South Korea, nearly every 14th of the month has an unofficial theme (e.g. Diary Day in Jan, Rose Day in May, Silver Day in July).',
      'Jajangmyeon sales skyrocket by hundreds of percent across Korean delivery services every April 14.'
    ],
    popularityScore: 87,
    latitude: 37.5665,
    longitude: 126.9780,
    soundscape: {
      title: 'Hearthside Acoustic & Fireside Crackle',
      instrument: 'Acoustic Guitar, Soft Strings',
      genre: 'Acoustic Café Ambience',
      description: 'Relaxed acoustic strums evocative of a warm, comforting afternoon cafe in Seoul.',
      preset: 'hearthside_strings'
    }
  },
  {
    id: 'burns-night',
    name: 'Burns Night',
    localName: 'Burns Supper',
    date: '2027-01-25',
    month: 1,
    day: 25,
    country: 'Scotland & Scottish Diaspora',
    countryCode: 'GB',
    category: 'cultural',
    description: 'Celebrates the life and romantic poetry of Robert Burns, Scotland’s national bard. Famous for the ceremonial Burns Supper featuring bagpipe processions, the dramatic recitation of "Address to a Haggis", Scotch whisky toasts, and ceilidh dancing.',
    traditions: [
      'Ceremonial entrance of the haggis on a silver platter led by a bagpiper in traditional tartan kilt',
      'The host dramatically slicing open the haggis while reciting "Address to a Haggis"',
      'Toasts to the "Lassies" and humorous replies from the women',
      'Singing "Auld Lang Syne" with joined hands at the close of the night'
    ],
    greeting: 'Slàinte Mhath! (Good health!) Happy Burns Night!',
    foodDelicacies: ['Traditional Scottish Haggis', 'Neeps and Tatties (Mashed Turnips & Potatoes)', 'Scotch Broth', 'Cranachan Dessert (Oats, Cream, Raspberries & Whisky)'],
    bannerUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Burns Night', 'Scotland', 'Robert Burns', 'Haggis', 'Bagpipes'],
    facts: [
      'The very first Burns supper was organized by close friends of the poet at Burns Cottage in Ayrshire in July 1801, five years after his death.',
      'Robert Burns penned "Auld Lang Syne", the most widely sung New Year’s anthem across the globe.'
    ],
    popularityScore: 90,
    latitude: 55.9533,
    longitude: -3.1883,
    soundscape: {
      title: 'Celtic Tin Whistle & Bodhrán Drum',
      instrument: 'Tin Whistle, Bodhrán, Bagpipe Drone',
      genre: 'Traditional Scottish Reel',
      description: 'Lively highland pennywhistle ornamentation grounded by the heartbeat of a goatskin bodhrán.',
      preset: 'celtic_whistle'
    }
  },
  {
    id: 'lovers-day-brazil',
    name: 'Dia dos Namorados (Brazilian Lovers’ Day)',
    localName: 'Dia dos Namorados',
    date: '2027-06-12',
    month: 6,
    day: 12,
    country: 'Brazil',
    countryCode: 'BR',
    category: 'cultural',
    description: 'Brazil’s vibrant celebration of romance celebrated on June 12, the eve of Saint Anthony’s Day (patron saint of marriage). Couples exchange bouquets, chocolates, love letters, and celebrate with romantic samba dinners.',
    traditions: [
      'Exchanging flowers, fine chocolates, and handwritten "cartões" love notes',
      'Single individuals performing folk matchmaking charms (simpatias) to St. Anthony',
      'Romantic candlelit dinner dates with live bossa nova and samba melodies',
      'Festive evening street strolls across Rio, São Paulo, and Salvador'
    ],
    greeting: 'Feliz Dia dos Namorados! Te amo!',
    foodDelicacies: ['Brigadeiros (Gourmet Chocolate Fudge Balls)', 'Beijinhos de Coco', 'Grilled Picanha Steak', 'Moqueca de Peixe'],
    bannerUrl: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brazil', 'Dia dos Namorados', 'Romance', 'Saint Anthony', 'Samba'],
    facts: [
      'Brazil celebrates on June 12 instead of February 14 because February often coincides with Carnival celebrations, and June 13 honors matchmaking Saint Anthony.',
      'Advertising pioneer João Doria created the commercial campaign for Dia dos Namorados in São Paulo in 1948.'
    ],
    popularityScore: 91,
    latitude: -23.5505,
    longitude: -46.6333,
    soundscape: {
      title: 'Batucada Samba & Agogô Bells',
      instrument: 'Bossa Nova Classical Guitar, Surdo, Shaker',
      genre: 'Brazilian Bossa Nova & Samba',
      description: 'Sensual nylon guitar fingerpicking and subtle percussion evoking an evening on Ipanema beach.',
      preset: 'batucada_samba'
    }
  },
  {
    id: 'singles-day-china',
    name: 'Singles’ Day (Double 11)',
    localName: '双十一 (Shuāng Shíyī) / 光棍节',
    date: '2026-11-11',
    month: 11,
    day: 11,
    country: 'China & Global E-Commerce',
    countryCode: 'CN',
    category: 'cultural',
    description: 'Originally founded in 1993 by university students as an ironic celebration for singles (11/11 looking like four bare branches). Has since grown into the largest 24-hour retail and digital entertainment phenomenon in human history.',
    traditions: [
      'Alibaba and JD.com televised gala countdowns with international superstars',
      'Midnight flash-sale shopping sprees across thousands of digital brands',
      'Singles gifting themselves luxury treats and hosting bachelor/bachelorette dinners',
      'Eating four fried dough fritters (Youtiao) representing the four "ones"'
    ],
    greeting: 'Happy 11.11! Treat yourself to joy!',
    foodDelicacies: ['Crispy Youtiao (Fried Dough Crullers)', 'Steamed Baozi', 'Boba Pearl Milk Tea', 'Hotpot Banquets'],
    bannerUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Singles Day', 'Double 11', 'China', 'Shopping', 'Global Retail'],
    facts: [
      'Singles’ Day routinely generates over $130 billion USD in sales within 24 hours, dwarfing all other global shopping events combined.',
      'Over 1 billion delivery packages are dispatched across China and the world within the subsequent 72 hours.'
    ],
    popularityScore: 94,
    latitude: 30.2741,
    longitude: 120.1551,
    soundscape: {
      title: 'Guzheng Zither & Festive Firecrackers',
      instrument: 'Guzheng, Pipa, Festive Chimes',
      genre: 'Contemporary Chinese Folk',
      description: 'Fast-paced, vibrant plucked zither strings celebrating prosperity, technology, and celebration.',
      preset: 'guzheng_firecrackers'
    }
  },
  {
    id: 'nowruz-persian-new-year',
    name: 'Nowruz (Persian New Year)',
    localName: 'نوروز (Nowruz) / New Day',
    date: '2027-03-20',
    month: 3,
    day: 20,
    country: 'Iran, Afghanistan, Central Asia & Diaspora',
    countryCode: 'IR',
    category: 'seasonal',
    description: 'Marks the exact astronomical moment of the Vernal Equinox and the rebirth of nature. Celebrated for over 3,000 years across the Persian cultural realm, honoring spring renewal, family ties, and communal harmony with the symbolic Haft Sin table.',
    traditions: [
      'Spring house-cleaning (Khaneh-Tekani) to cleanse negative winter energy',
      'Assembling the Haft Sin table with 7 symbolic items: Sabzeh (rebirth), Samanu (power), Senjed (love), Seer (medicine), Seeb (beauty), Somāq (sunrise), and Serkeh (patience)',
      'Chaharshanbe Suri: Jumping over bonfires singing "Zardi-ye man az to, sorkhi-ye to az man"',
      'Sizdah Bedar: Picnicking outdoors on the 13th day and releasing sprouted wheat into moving water'
    ],
    greeting: 'Nowruz Mobarak! (نوروز مبارک) Happy Persian New Year!',
    foodDelicacies: ['Sabzi Polo ba Mahi (Herb Herbed Rice with Fish)', 'Ash-e Reshteh (Thick Noodle Soup)', 'Kuku Sabzi (Persian Herb Frittata)', 'Baklava & Nan-e Berenji'],
    bannerUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80',
    tags: ['Nowruz', 'Persian', 'Equinox', 'Spring', 'Haft Sin', 'UNESCO'],
    facts: [
      'Inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in 2009.',
      'Unlike solar or lunar calendar dates that start at midnight, Nowruz begins at the precise second the sun crosses the celestial equator.'
    ],
    popularityScore: 96,
    latitude: 35.6892,
    longitude: 51.3890,
    soundscape: {
      title: 'Persian Santur & Spring Equinox River',
      instrument: 'Santur Dulcimer, Tar, Spring Stream',
      genre: 'Persian Classical Dastgah Shur',
      description: 'Shimmering metallic hammer strikes on 72 strings with babbling mountain water heralding spring.',
      preset: 'persian_santur'
    },
    respectGuidelines: {
      dos: ['Congratulate Persian friends on the exact moment of the equinox', 'Compliment the beauty of the family’s Haft Sin table'],
      donts: ['Do not touch or disturb the delicate goldfish or sprouted lentils on the Haft Sin table'],
      travelTip: 'Businesses and government offices across Iran, Azerbaijan, and Central Asia close for up to two weeks.'
    }
  },
  {
    id: 'spring-equinox',
    name: 'Spring Equinox & Ostara',
    localName: 'Ostara / Vernal Equinox',
    date: '2027-03-20',
    month: 3,
    day: 20,
    country: 'Global & Celtic-Germanic Traditions',
    countryCode: 'UN',
    category: 'seasonal',
    description: 'The astronomical moment when day and night are of equal length across the globe. Celebrated for millennia at ancient megalithic sites like Stonehenge and Chichen Itza, honoring fertility, agriculture, and the return of light.',
    traditions: [
      'Watching the sunrise illuminate ancient solar alignments at megalithic monuments',
      'Dyeing fresh eggs with wild flower and onion skin infusions',
      'Planting heirloom seeds in home gardens',
      'Baking honey cakes and brewing floral teas'
    ],
    greeting: 'Blessed Ostara! Happy Spring Equinox!',
    foodDelicacies: ['Herbed Spring Omelette', 'Fresh Baked Honey Spelt Bread', 'Elderflower Infusion', 'Dandelion Greens Salad'],
    bannerUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80',
    tags: ['Spring Equinox', 'Ostara', 'Astronomy', 'Earth', 'Nature'],
    facts: [
      'At the Mayan pyramid of El Castillo in Chichen Itza, the setting sun on the equinox casts a shadow that looks like a serpent slithering down the stone stairs.',
      'The astronomical balance of 12 hours daylight and 12 hours night occurs everywhere on the globe simultaneously.'
    ],
    popularityScore: 90,
    latitude: 51.1789,
    longitude: -1.8262,
    soundscape: {
      title: 'Nyckelharpa Drone & Midsummer Sun',
      instrument: 'Folk Flute, Wooden Drone, Birds in Spring',
      genre: 'European Pagan / Folk',
      description: 'Airy wooden flute notes and gentle morning birdsong welcoming the return of life.',
      preset: 'scandi_folk'
    }
  },
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    localName: 'Thanksgiving Day / Action de grâce',
    date: '2026-11-26',
    month: 11,
    day: 26,
    country: 'United States & Canada',
    countryCode: 'US',
    category: 'cultural',
    description: 'A national holiday dedicated to expressing gratitude for harvest abundance, family, and blessing. Traces its history to the 1621 harvest feast between English pilgrims and the Wampanoag people, established as a federal holiday by Abraham Lincoln in 1863.',
    traditions: [
      'Gathering for an expansive roast turkey feast with savory herb stuffing',
      'Watching the iconic giant balloons of the Macy’s Thanksgiving Day Parade in NYC',
      'Gathering to watch NFL Thanksgiving football games',
      'Volunteering at soup kitchens and organizing community food drives'
    ],
    greeting: 'Happy Thanksgiving! Wishing you warmth, peace, and abundance!',
    foodDelicacies: ['Herb-Roasted Turkey with Rich Gravy', 'Cornbread Stuffing', 'Cranberry Sauce', 'Mashed Potatoes', 'Spiced Pumpkin Pie', 'Green Bean Casserole'],
    bannerUrl: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Thanksgiving', 'Harvest', 'Gratitude', 'Turkey', 'USA', 'Canada'],
    facts: [
      'Canada observes Thanksgiving on the second Monday of October, earlier than the US, due to its northern farming seasons and earlier harvest.',
      'The annual Presidential Turkey Pardon at the White House officially began in 1989 under President George H.W. Bush.'
    ],
    popularityScore: 98,
    latitude: 41.9584,
    longitude: -70.6673,
    soundscape: {
      title: 'Hearthside Acoustic & Fireside Crackle',
      instrument: 'Acoustic Guitar, Banjo, Crackling Wood',
      genre: 'Americana Hearthside Folk',
      description: 'Warm, cozy fingerpicked acoustic chords and the gentle crackle of a hearth fire.',
      preset: 'hearthside_strings'
    }
  },
  {
    id: 'obon-japan',
    name: 'Obon Festival',
    localName: 'お盆 (Obon)',
    date: '2027-08-13',
    month: 8,
    day: 13,
    country: 'Japan',
    countryCode: 'JP',
    category: 'cultural',
    description: 'An ancient Japanese Buddhist custom honoring the spirits of ancestors. Families clean ancestral graves, light welcome fires (Mukaebi) and farewell fires (Okuribi), dance the Bon Odori in community squares, and release glowing floating lanterns onto rivers.',
    traditions: [
      'Bon Odori: Community circle dancing around a central wooden yagura stage with taiko drummers',
      'Lighting Chochin red lanterns in homes to help guiding spirits find their way',
      'Toro Nagashi: Releasing thousands of illuminated floating paper lanterns down rivers to the sea',
      'Cleaning ancestral family gravestones and offering seasonal fruit and sweet dango'
    ],
    greeting: 'O-Bon no jiki desu ne (Thinking of our beloved ancestors)',
    foodDelicacies: ['Somen Cold Noodles on Ice', 'Watermelon Slices (Suika)', 'Mitarashi Dango', 'Tempura', 'Kakigōri Shaved Ice'],
    bannerUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    tags: ['Obon', 'Japan', 'Ancestors', 'Lanterns', 'Bon Odori'],
    facts: [
      'In Kyoto, five giant bonfires shaped like kanji characters (such as Daimonji) are lit on surrounding mountains during the Gozan no Okuribi.',
      'Crafted cucumber horses (fast arrival) and eggplant oxen (slow departure) are placed at home altars for ancestral travel.'
    ],
    popularityScore: 95,
    latitude: 35.0116,
    longitude: 135.7681,
    originHistory: 'Originating from the Buddhist Ullambana Sutra, practiced in Japan for over 500 years blending with native Shinto ancestral reverence.',
    soundscape: {
      title: 'Taiko Thunder & Shakuhachi Flute',
      instrument: 'Taiko Drum, Shakuhachi, Wooden Clappers',
      genre: 'Japanese Matsuri & Bon Odori',
      description: 'Rhythmic taiko drum pulses and bamboo flute melodies welcoming ancestral spirits home.',
      preset: 'taiko_flute'
    },
    respectGuidelines: {
      dos: ['Remove your shoes when entering homes and temple grounds', 'Join in the communal Bon Odori dance respectfully if locals invite you'],
      donts: ['Do not step over or sit on the edge of ancestral gravestones'],
      travelTip: 'The week of Obon is one of Japan’s three peak travel seasons (Shinkansen trains and domestic hotels book out months ahead).'
    }
  },
  {
    id: 'halloween',
    name: 'Halloween (All Hallows’ Eve)',
    localName: 'Oíche Shamhna / Halloween',
    date: '2026-10-31',
    month: 10,
    day: 31,
    country: 'Ireland, United States & Global',
    countryCode: 'IE',
    category: 'cultural',
    description: 'Evolved from the ancient Celtic festival of Samhain in Ireland, when the veil between the living and spirit worlds was believed to be thinnest. Celebrated worldwide with whimsical costumes, carving jack-o’-lanterns, haunted houses, and trick-or-treating.',
    traditions: [
      'Trick-or-treating: Children in costumes visiting neighborhood doors for sweets',
      'Carving scary or humorous faces into hollowed pumpkins with candles inside',
      'Wearing costumes to ward off mischievous roaming spirits',
      'Bobbing for apples and telling ghost stories around autumn bonfires'
    ],
    greeting: 'Happy Halloween! Trick or Treat!',
    foodDelicacies: ['Barmbrack Fruit Bread (Ireland)', 'Candy Corn', 'Caramel Apples', 'Pumpkin Spice Pastries', 'Cider Doughnuts'],
    bannerUrl: 'https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?auto=format&fit=crop&w=1200&q=80',
    tags: ['Halloween', 'Samhain', 'Costumes', 'Pumpkins', 'Celtic'],
    facts: [
      'The original Celtic jack-o’-lanterns in Ireland and Scotland were carved out of turnip and rutabaga roots; pumpkins were introduced when Irish immigrants discovered them in the Americas.',
      'In Irish Barmbrack bread, traditional charms (a coin for wealth, a ring for marriage) were baked inside to tell fortunes.'
    ],
    popularityScore: 97,
    latitude: 53.3498,
    longitude: -6.2603,
    soundscape: {
      title: 'Celtic Tin Whistle & Bodhrán Drum',
      instrument: 'Celtic Drone, Spooky Chimes, Wind Wash',
      genre: 'Celtic Samhain Ambience',
      description: 'Mysterious Celtic winds and subtle drumbeats evoking ancient harvest bonfires on the hills of Tara.',
      preset: 'celtic_whistle'
    }
  },
  {
    id: 'labor-day-international',
    name: 'International Workers’ Day (May Day)',
    localName: 'Día Internacional de los Trabajadores / Fête du Travail',
    date: '2027-05-01',
    month: 5,
    day: 1,
    country: 'Worldwide (Over 80 Nations)',
    countryCode: 'UN',
    category: 'national',
    description: 'Celebrates the historic achievements of the international labor movement and the promotion of workers’ rights, social justice, and fair working conditions. Commemorates the 1886 Haymarket struggle for the universal eight-hour workday.',
    traditions: [
      'Civic marches, trade union parades, and peaceful rallies for labor equity',
      'France: Gifting delicate wild Lily of the Valley (Muguet) sprigs as a symbol of spring good fortune',
      'Public speeches and cultural concerts in historic city plazas',
      'Observing an official public holiday across Europe, Asia, and Latin America'
    ],
    greeting: 'Happy International Workers’ Day! Solidarity and dignity for all!',
    foodDelicacies: ['Communal Paella', 'French Baguettes with Comté', 'Picnic Sandwiches', 'Street Food Feasts'],
    bannerUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80',
    tags: ['Workers Day', 'May Day', 'Labor', 'Social Justice', 'Solidarity'],
    facts: [
      'In France, May 1 is the only day of the year where any individual is legally permitted to sell freshly picked Lily of the Valley on public streets tax-free.',
      'Established in 1889 by the Second International assembly in Paris in memory of Chicago’s Haymarket martyrs.'
    ],
    popularityScore: 91,
    latitude: 48.8566,
    longitude: 2.3522,
    soundscape: {
      title: 'Bavarian Accordion & Brass Oom-Pah',
      instrument: 'Accordion, Brass Fanfare',
      genre: 'European Civic March',
      description: 'Stirring acoustic accordion and brass melodies honoring dignity and unity.',
      preset: 'bavarian_polka'
    }
  },
  {
    id: 'pride-month',
    name: 'Pride Month',
    localName: 'Mes del Orgullo / Pride Month',
    date: '2027-06-01',
    month: 6,
    day: 1,
    country: 'Worldwide Observance',
    countryCode: 'UN',
    category: 'cultural',
    description: 'Celebrated throughout the month of June in commemoration of the 1969 Stonewall uprising in New York City. Recognizes the resilience, culture, human rights, and love of LGBTQ+ communities across the world with massive parades and cultural showcases.',
    traditions: [
      'Vibrant Pride marches through metropolitan downtowns with colorful floats and music',
      'Flying the iconic 8-color rainbow flag and inclusive progress banners',
      'Film festivals, human rights symposiums, and queer history memorials',
      'Lighting municipal city halls and historic monuments in rainbow colors'
    ],
    greeting: 'Happy Pride! Celebrate love, equality, and authentic living!',
    foodDelicacies: ['Rainbow Layer Cake', 'Confetti Cupcakes', 'Fruit Tartlets', 'Festive Street Cocktails & Mocktails'],
    bannerUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80',
    tags: ['Pride', 'LGBTQ+', 'Stonewall', 'Human Rights', 'Rainbow'],
    facts: [
      'The original rainbow flag was hand-dyed and stitched by Gilbert Baker and thirty volunteers for the San Francisco Gay Freedom Day in 1978.',
      'São Paulo, Brazil hosts one of the largest Pride parades in the world, regularly gathering over 3 to 4 million participants on Avenida Paulista.'
    ],
    popularityScore: 97,
    latitude: 40.7338,
    longitude: -74.0028,
    soundscape: {
      title: 'Batucada Samba & Agogô Bells',
      instrument: 'Synth Swells, Street Percussion, Whistles',
      genre: 'Euphoric Street Parade Samba',
      description: 'High-energy celebratory rhythms and brass fanfares echoing the spirit of liberation and freedom.',
      preset: 'batucada_samba'
    }
  }
];
