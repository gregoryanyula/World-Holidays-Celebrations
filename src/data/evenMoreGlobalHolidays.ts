import { Holiday } from '../types';

export const EVEN_MORE_GLOBAL_HOLIDAYS: Holiday[] = [
  {
    id: 'holi-festival-of-colors',
    name: 'Holi (Festival of Colors & Spring Rebirth)',
    localName: 'होली (Holi)',
    date: '2027-03-22',
    month: 3,
    day: 22,
    country: 'India, Nepal & Global Diaspora',
    countryCode: 'IN',
    category: 'cultural',
    description: 'The exuberant Hindu spring festival of colors celebrating the victory of good over evil, the arrival of spring, and the eternal divine love of Radha and Krishna. Barriers of caste, age, and gender dissolve as crowds playfully smear each other with fragrant gulal colored powders.',
    traditions: [
      'Holika Dahan: Lighting community bonfires on the eve to burn away evil and celebrate devotion',
      'Rangwali Holi: Joyous powder battles throwing organic gulal powders (pink, saffron, turquoise, yellow)',
      'Singing traditional folk songs accompanied by Dholak drums and brass cymbals',
      'Visiting neighbors to share sweet fried gujiya pastries and chilled glasses of spiced thandai'
    ],
    greeting: 'Bura na mano, Holi hai! / Happy Holi! (होली की हार्दिक शुभकामनाएं)',
    foodDelicacies: ['Gujiya (Crispy pastry stuffed with sweet khoya & nuts)', 'Thandai (Chilled almond, fennel & saffron milk)', 'Dahi Vada', 'Puran Poli', 'Malpua'],
    bannerUrl: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Holi', 'Colors', 'India', 'Spring', 'Festival of Love', 'Radha Krishna'],
    facts: [
      'Traditionally, the colors were made from natural medicinal herbs like neem, turmeric, saffron, and palash flowers to protect the skin from spring fevers.',
      'In Braj (Mathura and Vrindavan), Holi celebrations begin 40 days before the main date.'
    ],
    popularityScore: 99,
    latitude: 27.4924,
    longitude: 77.6737,
    weatherProfile: {
      tempCelsius: '20°C - 32°C',
      tempFahrenheit: '68°F - 90°F',
      climate: 'Warm Pleasant Indian Springtime',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-to-late March in Mathura, Vrindavan, or Jaipur.',
      recommendedPacking: ['Inexpensive white cotton clothes you can throw away', 'Coconut oil to protect skin and hair from color stains', 'Sunglasses / protective eyewear']
    },
    festivePeak: {
      peakDays: 'March 21 (Holika Bonfire Eve) & March 22 (Rangwali Holi)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Banke Bihari Temple in Vrindavan or the City Palace in Jaipur',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'holi-gulal-platter',
      name: 'Gulal Powder Bowls & Golden Pichkari',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#ec4899',
      scaleDefault: 1.2,
      description: 'Luminous brass pichkari water sprayer flanked by mounds of radiant magenta, turquoise, and saffron powders.'
    }
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi (Vinayaka Chavithi)',
    localName: 'गणेश चतुर्थी',
    date: '2026-09-14',
    month: 9,
    day: 14,
    country: 'India (Maharashtra) & Worldwide',
    countryCode: 'IN',
    category: 'religious',
    description: 'The ten-day grand festival honoring Lord Ganesha, the elephant-headed deity of wisdom, prosperity, and the remover of obstacles. Millions welcome hand-sculpted clay idols into their homes and public community pandals, culminating in colossal ocean immersions (Visarjan).',
    traditions: [
      'Prana Pratishtha: Invoking the divine presence into clay Ganesha idols with mantras and coconut water',
      'Offering 21 fresh steamed modak dumplings (Lord Ganesha\'s favourite sweet)',
      'Dhol Tasha Pathak: Hundreds of synchronized drummers pounding thunderous rhythms in the streets',
      'Anant Chaturdashi Visarjan: Massive singing processions carrying idols to the Arabian Sea for immersion'
    ],
    greeting: 'Ganpati Bappa Morya, Pudhchya Varshi Lavkar Ya! (गणपती बाप्पा मोरया)',
    foodDelicacies: ['Ukadiche Modak (Steamed Rice Flour Dumplings with Jaggery & Coconut)', 'Puran Poli', 'Karanji', 'Sundal', 'Sabudana Khichdi'],
    bannerUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    tags: ['Ganesh Chaturthi', 'Mumbai', 'Maharashtra', 'Modak', 'Hinduism', 'Ganesha'],
    facts: [
      'Freedom fighter Lokmanya Tilak transformed the private home ritual into a massive public festival in 1893 to unite people across caste boundaries during colonial rule.',
      'The famous Lalbaugcha Raja idol in Mumbai draws over 1.5 million devotees in a single day.'
    ],
    popularityScore: 98,
    latitude: 19.0760,
    longitude: 72.8777,
    weatherProfile: {
      tempCelsius: '25°C - 31°C',
      tempFahrenheit: '77°F - 88°F',
      climate: 'Warm Monsoon Tail-End - Dramatic Sea Clouds',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Mid-September in Mumbai or Pune for high-energy Dhol Tasha drum parades.',
      recommendedPacking: ['Waterproof backpack', 'Quick-drying cotton kurta', 'Comfortable footwear for beach crowds']
    },
    festivePeak: {
      peakDays: 'September 14 (Ganesh Sthapana) & September 23 (Anant Chaturdashi Immersion)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Girgaon Chowpatty beach in Mumbai for sunset idol immersions',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'ganesha-modak-lotus',
      name: 'Golden Ganesha & Modak Offering',
      modelType: 'golden_lotus',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.2,
      description: 'Luminous brass idol of Lord Ganesha seated on a pink lotus holding a golden modak and blossoming durva grass.'
    }
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan (Knot of Protection & Love)',
    localName: 'रक्षाबंधन',
    date: '2026-08-28',
    month: 8,
    day: 28,
    country: 'India, Nepal & Global Diaspora',
    countryCode: 'IN',
    category: 'cultural',
    description: 'An ancient Hindu festival celebrating the sacred bond of love and mutual protection between siblings and kindred spirits. Sisters tie an ornate talisman bracelet (Rakhi) around their brothers\' wrists, receive blessings and gifts in return, and share mouthwatering sweets.',
    traditions: [
      'Tying the sacred silken or beaded Rakhi thread around the brother\'s right wrist',
      'Applying an auspicious red kumkum and unbroken rice grain (akshat) tilak on the forehead',
      'Performing a gentle Aarti light prayer for longevity, wisdom, and success',
      'Exchanging thoughtful gifts, cash tokens, and mutual lifelong protection vows'
    ],
    greeting: 'Happy Raksha Bandhan! (रक्षाबंधन की शुभकामनाएं)',
    foodDelicacies: ['Kaju Katli', 'Rasgulla', 'Gulab Jamun', 'Ghevar (Rajasthani Honeycomb Sweet)', 'Besan Ladoo'],
    bannerUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rakhi', 'Raksha Bandhan', 'Siblings', 'India', 'Protection', 'Family'],
    facts: [
      'During the 1905 Partition of Bengal, Nobel laureate Rabindranath Tagore organized mass Rakhi ceremonies where Hindus and Muslims tied Rakhis on each other as a symbol of unity and non-violence.',
      'Astronaut Sunita Williams took a sacred Rakhi into space aboard the International Space Station.'
    ],
    popularityScore: 94,
    latitude: 28.6139,
    longitude: 77.2090,
    weatherProfile: {
      tempCelsius: '26°C - 34°C',
      tempFahrenheit: '79°F - 93°F',
      climate: 'Humid Monsoon Season - Lush Greenery',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Late August; explore vibrant traditional bazaar Rakhi stalls in Old Delhi or Jaipur.',
      recommendedPacking: ['Light breathable cotton attire', 'Small gift envelopes for family', 'Umbrella']
    },
    festivePeak: {
      peakDays: 'August 28 (Shravana Purnima Full Moon)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Chandni Chowk in Delhi or Johari Bazaar in Jaipur for Rakhi markets',
      recommendedDurationDays: 2
    },
    arDecorItem: {
      id: 'bejeweled-rakhi-thread',
      name: 'Bejeweled Golden Rakhi Bracelet',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#ef4444',
      scaleDefault: 0.9,
      description: 'Handcrafted golden filigree Rakhi medallion woven with auspicious crimson silk threads and seed pearls.'
    }
  },
  {
    id: 'baisakhi-vaisakhi-punjab',
    name: 'Vaisakhi / Baisakhi (Sikh New Year & Khalsa Harvest)',
    localName: 'ਵੈਸਾਖੀ',
    date: '2026-04-13',
    month: 4,
    day: 13,
    country: 'India (Punjab) & Global Sikh Diaspora',
    countryCode: 'IN',
    category: 'cultural',
    description: 'The monumental spring harvest festival of Punjab and the birth anniversary of the Khalsa panth, founded by the tenth Sikh Guru, Gobind Singh, in 1699. Marked by energetic Bhangra dancing, martial arts displays (Gatka), Nagar Kirtan street processions, and community kitchen feasts (Langar).',
    traditions: [
      'Nagar Kirtan: Processions led by the Panj Pyare (Five Beloved Ones) escorting the sacred Guru Granth Sahib',
      'Gatka: Breathtaking traditional Sikh sword-and-shield martial arts exhibitions',
      'Lively Bhangra and Giddha folk dances in golden mustard and wheat fields',
      'Serving free multi-course vegetarian meals to hundreds of thousands in community Langars'
    ],
    greeting: 'Vaisakhi diyan lakh lakh vadhaiyan! (ਵੈਸਾਖੀ ਦੀਆਂ ਲੱਖ ਲੱਖ ਵਧਾਈਆਂ)',
    foodDelicacies: ['Makki di Roti with Sarson da Saag', 'Pindi Chole with Fluffy Bhature', 'Kada Prasad (Sacred Halwa)', 'Creamy Sweet Lassi in Clay Tumblers', 'Jalebi'],
    bannerUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    tags: ['Vaisakhi', 'Baisakhi', 'Sikhism', 'Khalsa', 'Punjab', 'Harvest', 'Bhangra'],
    facts: [
      'On Vaisakhi day in 1699 at Anandpur Sahib, Guru Gobind Singh created the Khalsa and initiated the Five Ks: Kesh, Kangha, Kara, Kachera, and Kirpan.',
      'The Golden Temple (Harmandir Sahib) in Amritsar serves free langar meals to over 100,000 pilgrims on Vaisakhi day.'
    ],
    popularityScore: 95,
    latitude: 31.6200,
    longitude: 74.8765,
    weatherProfile: {
      tempCelsius: '19°C - 33°C',
      tempFahrenheit: '66°F - 91°F',
      climate: 'Warm North Indian Spring - Blooming Wheat Fields',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-April in Amritsar or Anandpur Sahib for historic gurdwara celebrations.',
      recommendedPacking: ['Bright saffron or orange head covering (essential for Gurdwara entry)', 'Slip-off shoes', 'Modest clothing covering shoulders and knees']
    },
    festivePeak: {
      peakDays: 'April 13 - 14',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Golden Temple (Harmandir Sahib) complex in Amritsar',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'khanda-sikh-crest',
      name: 'Sacred Gilded Khanda Emblem',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.1,
      description: 'Luminous golden Khanda crest representing divine knowledge, sovereignty, and eternal truth.'
    }
  },
  {
    id: 'qingming-tomb-sweeping',
    name: 'Qingming Festival (Tomb Sweeping Day)',
    localName: '清明节',
    date: '2026-04-05',
    month: 4,
    day: 5,
    country: 'China, Taiwan & Southeast Asia',
    countryCode: 'CN',
    category: 'cultural',
    description: 'A deeply revered traditional Chinese festival of filial piety and spring renewal. Families visit ancestral cemeteries to clean graves, sweep away winter debris, make food and incense offerings, and fly colorful daytime kites into clear spring skies.',
    traditions: [
      'Sweeping, cleaning, and weeding ancestral grave mounds (Sao Mu) and repainting headstone inscriptions',
      'Offering three cups of tea/wine, fresh spring fruits, and burning joss paper currency',
      'Ta Qing: Spring country outings admiring blooming willows, peach blossoms, and fresh green fields',
      'Flying paper kites with small lanterns attached to their strings, releasing wishes into the sky'
    ],
    greeting: 'Qingming An Kang! (清明安康)',
    foodDelicacies: ['Qingtuan (Sweet Green Jade Glutinous Rice Balls with Sweet Red Bean)', 'Sanza (Crispy Fried Dough Twists)', 'Qingming Steamed Snails', 'Spring Peach Blossom Pastry'],
    bannerUrl: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?auto=format&fit=crop&w=1200&q=80',
    tags: ['Qingming', 'Tomb Sweeping', 'Filial Piety', 'China', 'Spring Outing', 'Ancestors'],
    facts: [
      'Celebrated for over 2,500 years since the Zhou dynasty; named Qingming meaning "Clear and Bright" reflecting springtime weather.',
      'Green Qingtuan dumplings are dyed with fresh wild mugwort or barley grass juice, giving them their iconic jade green hue and herbal fragrance.'
    ],
    popularityScore: 94,
    latitude: 31.2304,
    longitude: 121.4737,
    weatherProfile: {
      tempCelsius: '12°C - 20°C',
      tempFahrenheit: '54°F - 68°F',
      climate: 'Crisp Spring Showers - Poetic Drizzle',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Early April in Hangzhou around West Lake or Suzhou classical gardens.',
      recommendedPacking: ['Light raincoat & umbrella', 'Comfortable walking boots for hillside trails', 'Camera for cherry and peach blossoms']
    },
    festivePeak: {
      peakDays: 'April 4 - 6',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'West Lake tea hills in Hangzhou or Shichahai willow lake in Beijing',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'qingtuan-jade-dumpling',
      name: 'Jade Qingtuan Platter & Willow Sprigs',
      modelType: 'golden_lotus',
      festiveAuraColor: '#10b981',
      scaleDefault: 0.9,
      description: 'Luminous bamboo steamer holding glossy emerald Qingtuan rice dumplings draped with fresh willow boughs.'
    }
  },
  {
    id: 'lantern-festival-yuanxiao',
    name: 'Lantern Festival (Yuanxiao Jie / First Full Moon)',
    localName: '元宵节 / 上元节',
    date: '2027-02-21',
    month: 2,
    day: 21,
    country: 'China, Taiwan & Global Diaspora',
    countryCode: 'CN',
    category: 'cultural',
    description: 'The grand finale of the Chinese Lunar New Year celebrated on the first full moon of the lunar calendar. Cities illuminate with millions of artistic lanterns, families solve clever lantern riddles, and everyone eats sweet, round Tangyuan dumplings symbolizing harmony and unity.',
    traditions: [
      'Viewing monumental themed lanterns shaped as mythical dragons, zodiac beasts, and fairy palaces',
      'Solving clever character and poetic riddles written on slips hanging beneath lanterns (Cai Dengmi)',
      'Dragon and Lion dances performing agile acrobatic jumps atop tall wooden poles',
      'Walking across city bridges at night to cross away illness and misfortune (Zou Qiao)'
    ],
    greeting: 'Yuanxiao Jie Kuaile! (元宵节快乐！)',
    foodDelicacies: ['Tangyuan / Yuanxiao (Sweet Sesame, Peanut, or Red Bean Glutinous Balls in Ginger Syrup)', 'Fried Tangyuan', 'Sweet Fermented Rice Wine Soup (Jiuniang)'],
    bannerUrl: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Lantern Festival', 'Yuanxiao', 'Tangyuan', 'Riddles', 'Full Moon', 'China'],
    facts: [
      'In ancient imperial China, young women who were otherwise confined to their homes were allowed to walk freely in the streets at night to view lanterns, making it historical China\'s true Valentine\'s Day.',
      'The difference between Tangyuan (southern) and Yuanxiao (northern) is their creation: Tangyuan are wrapped like dough dumplings, while Yuanxiao are rolled in baskets over dry flour.'
    ],
    popularityScore: 96,
    latitude: 25.0330,
    longitude: 121.5654,
    weatherProfile: {
      tempCelsius: '14°C - 22°C',
      tempFahrenheit: '57°F - 72°F',
      climate: 'Mild Late-Winter Evening Breeze',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-to-late February for the Pingxi Sky Lantern Festival in Taiwan or Zigong Lantern Fair in Sichuan.',
      recommendedPacking: ['Light jacket for night viewing', 'Camera with night tripod mode', 'Comfortable sneakers']
    },
    festivePeak: {
      peakDays: 'February 21 (Full Moon Night)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Pingxi railway tracks in New Taipei City or Yuyuan Garden in Shanghai',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'red-silk-palace-lantern',
      name: 'Imperial Red Silk Palace Lantern',
      modelType: 'lantern',
      festiveAuraColor: '#dc2626',
      scaleDefault: 1.2,
      description: 'Hexagonal imperial palace lantern crafted from scarlet silk and rosewood with hanging golden silk tassels.'
    }
  },
  {
    id: 'shogatsu-japanese-new-year',
    name: 'Shogatsu (Japanese New Year & Hatsumode)',
    localName: '正月 (しょうがつ)',
    date: '2027-01-01',
    month: 1,
    day: 1,
    country: 'Japan',
    countryCode: 'JP',
    category: 'cultural',
    description: 'Japan\'s most important holiday period marking the new year with ancestral quietude, cleanliness, and gratitude. Families eat Toshikoshi soba on New Year\'s Eve, listen to the 108 temple bell rings (Joya no Kane), and make their first sacred shrine visit of the year (Hatsumode).',
    traditions: [
      'Joya no Kane: Buddhist temple bells struck 108 times at midnight to dispel the 108 worldly desires and sins',
      'Hatsumode: The first shrine or temple visit of the year to draw paper fortunes (Omikuji) and buy new protective charms (Omamori)',
      'Hatsuhinode: Watching the first sunrise of the new year over Mount Fuji or coastal shores to pray for luck',
      'Decorating doorways with Kadomatsu (pine and bamboo arrangements) and Shimenawa sacred straw ropes'
    ],
    greeting: 'Akemashite Omedetou Gozaimasu! (明けましておめでとうございます！)',
    foodDelicacies: ['Osechi Ryori (Auspicious lacquer multi-tier bento boxes)', 'Toshikoshi Soba (Year-Crossing Buckwheat Noodles)', 'Ozoni Mochi Soup', 'Otoso (Spiced Medicinal Herbal Sake)'],
    bannerUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Shogatsu', 'Japanese New Year', 'Hatsumode', 'Osechi', 'Shrines', 'Japan'],
    facts: [
      'Each delicacy inside the Osechi lacquer box has a specific symbolic prayer: black soybeans (Kuromame) for hardworking health, herring roe (Kazunoko) for fertility, and sweet rolled omelette (Datemaki) for wisdom.',
      'Tokyo\'s Meiji Shrine welcomes over 3 million visitors during the first three days of Hatsumode alone.'
    ],
    popularityScore: 98,
    latitude: 35.6762,
    longitude: 139.6503,
    weatherProfile: {
      tempCelsius: '3°C - 11°C',
      tempFahrenheit: '37°F - 52°F',
      climate: 'Crisp Sunny Winter - Piercing Clear Blue Skies',
      rainRisk: 'Low',
      bestTravelWindow: 'December 31 – January 3 in Tokyo or Kyoto; experience quiet streets and illuminated shrine courtyards.',
      recommendedPacking: ['Warm thermal overcoat & wool scarf', 'Pocket heat packs (kairo)', 'Slip-on boots for temples']
    },
    festivePeak: {
      peakDays: 'December 31 (Midnight Bells) & January 1 (First Dawn)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Meiji Jingu Shrine in Tokyo or Fushimi Inari Taisha in Kyoto',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'kadomatsu-bamboo-pine',
      name: 'Sacred Kadomatsu Pine & Bamboo Centerpiece',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#10b981',
      scaleDefault: 1.1,
      description: 'Traditional Japanese entrance arrangement of three diagonally cut bamboo shoots, evergreen pine boughs, and plum blossoms.'
    }
  },
  {
    id: 'purim-feast-of-lots',
    name: 'Purim (Feast of Lots & Deliverance)',
    localName: 'פורים',
    date: '2027-03-23',
    month: 3,
    day: 23,
    country: 'Israel & Global Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'The most joyful, carnival-like Jewish holiday commemorating the salvation of the Jewish people from the wicked vizier Haman\'s plot in ancient Persia, as recorded in the biblical Book of Esther (Megillah). Celebrated with costumes, merrymaking, charity, and three-cornered Hamantaschen pastries.',
    traditions: [
      'Reading the Megillah in synagogues, drowning out the villain Haman\'s name with loud grogger noisemakers',
      'Mishloach Manot: Sending gourmet gift baskets with at least two edible treats to friends and neighbors',
      'Matanot La\'Evyonim: Mandatory charity given to at least two needy individuals on Purim day',
      'Dressing up in elaborate masquerade costumes and staging comedic satirical plays (Purimshpil)'
    ],
    greeting: 'Chag Purim Sameach! (חג פורים שמח!)',
    foodDelicacies: ['Hamantaschen (Oznei Haman) filled with Poppy Seed, Chocolate, or Apricot', 'Kreplach Dumplings in Soup', 'Challah with Whole Eggs Baked In', 'Festive Wine'],
    bannerUrl: 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=1200&q=80',
    tags: ['Purim', 'Megillah', 'Hamantaschen', 'Costumes', 'Judaism', 'Carnival'],
    facts: [
      'The name Purim comes from the ancient Persian word "pur", meaning "lots", referring to Haman casting lots to choose the date of destruction.',
      'Tel Aviv hosts the massive "Adloyada" street carnival parade featuring gigantic animated papier-mâché floats.'
    ],
    popularityScore: 94,
    latitude: 32.0853,
    longitude: 34.7818,
    weatherProfile: {
      tempCelsius: '14°C - 22°C',
      tempFahrenheit: '57°F - 72°F',
      climate: 'Delightful Mediterranean Springtime',
      rainRisk: 'Low',
      bestTravelWindow: 'Late March in Jerusalem (where Shushan Purim is celebrated one day later) or Tel Aviv.',
      recommendedPacking: ['A fun costume or mask to join the street festivities', 'Comfortable walking shoes', 'Camera']
    },
    festivePeak: {
      peakDays: 'March 23 (Purim) & March 24 (Shushan Purim in walled cities)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Dizengoff Street and Rothschild Boulevard in Tel Aviv for costume parades',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'purim-grogger-hamantash',
      name: 'Silver Purim Grogger & Hamantaschen Plate',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#3b82f6',
      scaleDefault: 0.9,
      description: 'Spinning sterling silver noisemaker grogger resting beside a platter of golden poppy-seed hamantaschen pastries.'
    }
  },
  {
    id: 'sukkot-feast-of-booths',
    name: 'Sukkot (Feast of Tabernacles / Season of Our Joy)',
    localName: 'סוכות (זמן שמחתנו)',
    date: '2026-09-25',
    month: 9,
    day: 25,
    country: 'Israel & Global Jewish Diaspora',
    countryCode: 'IL',
    category: 'religious',
    description: 'A biblical seven-day festival of gratitude commemorating the 40 years Israelites wandered through the desert living in temporary shelters, as well as the autumn harvest. Families build temporary outdoor foliage huts (Sukkahs) and wave the Four Sacred Species.',
    traditions: [
      'Building the Sukkah booth under the open sky with a roof of natural branches (Sechach) where stars are visible',
      'Eating, sleeping, and hosting friends and family inside the decorated Sukkah for seven days',
      'The Four Species (Arba\'at HaMinim): Waving the fragrant Etrog citron, palm branch (Lulav), myrtle (Hadass), and willow (Aravah) in all six directions',
      'Ushpizin: Welcoming spiritual ancestral guests and real-world neighbors to break bread together'
    ],
    greeting: 'Chag Sukkot Sameach! / Moadim L\'Simcha! (חג סוכות שמח!)',
    foodDelicacies: ['Stuffed Vegetables (Cabbage, Peppers, Grape Leaves symbolizing harvest fullness)', 'Kreplach', 'Honey Pomegranate Roasted Chicken', 'Apple Strudel with Raisins'],
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sukkot', 'Sukkah', 'Lulav', 'Etrog', 'Harvest', 'Judaism', 'Hospitality'],
    facts: [
      'The roof covering (sechach) must be made of materials cut from the earth (like palm fronds or bamboo) and must provide more shade than sun while still allowing stars to be seen through it.',
      'In Jerusalem, hundreds of thousands gather at the Western Wall for the majestic Birkat Kohanim (Priestly Blessing) during the intermediate days of Sukkot.'
    ],
    popularityScore: 93,
    latitude: 31.7767,
    longitude: 35.2345,
    weatherProfile: {
      tempCelsius: '18°C - 28°C',
      tempFahrenheit: '64°F - 82°F',
      climate: 'Mild Golden Autumn - Crisp Starlit Evenings',
      rainRisk: 'Low',
      bestTravelWindow: 'Late September to early October in Jerusalem for Sukkah-hopping and Priestly Blessings.',
      recommendedPacking: ['Light sweater for dining in outdoor Sukkahs at night', 'Modest clothing for Old City visits']
    },
    festivePeak: {
      peakDays: 'September 25 - 28',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Western Wall Plaza in Jerusalem for Birkat Kohanim',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'etrog-lulav-set',
      name: 'Golden Etrog Citron & Palm Lulav',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.1,
      description: 'Pristine yellow Etrog citron resting inside an engraved silver box beside a woven palm Lulav bouquet.'
    }
  },
  {
    id: 'palio-di-siena',
    name: 'Il Palio di Siena (Historic Contrade Horse Race)',
    localName: 'Il Palio di Siena',
    date: '2026-07-02',
    month: 7,
    day: 2,
    country: 'Italy (Tuscany)',
    countryCode: 'IT',
    category: 'cultural',
    description: 'The legendary medieval bareback horse race held twice each summer (July 2 and August 16) in Siena\'s shell-shaped Piazza del Campo. Ten of the city\'s seventeen historic rival neighborhood wards (Contrade) compete fiercely for the sacred painted silk banner (the Drappellone).',
    traditions: [
      'The Corteo Storico: Two-hour medieval pageant of 600 costumed knights, trumpeters, and Alfieri flag-wavers (sbandieratori)',
      'The blessing of the horse inside each Contrada\'s parish church with the priest commanding: "Va\' e torna vincitore!" (Go and return victorious!)',
      'The three heart-stopping laps around the packed dirt track of Piazza del Campo, lasting only 90 seconds',
      'The wild crying, kissing, and joyous street banquets lasting for weeks in the winning Contrada'
    ],
    greeting: 'Viva la Contrada! Buon Palio!',
    foodDelicacies: ['Ricciarelli di Siena (Soft Almond Paste Cookies)', 'Panforte di Siena (Dense Spiced Honey & Candied Fruit Cake)', 'Pici al Ragù di Cinghiale (Wild Boar Pasta)', 'Chianti Classico Red Wine'],
    bannerUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
    tags: ['Palio', 'Siena', 'Tuscany', 'Horse Race', 'Medieval', 'Contrade', 'Italy'],
    facts: [
      'The horse can win the Palio even if its jockey falls off; a horse that crosses the finish line riderless (a "cavallo scosso") is still declared the official winner.',
      'Each of the 17 Contrade has its own animal heraldry, museum, fountain, and church (e.g. Oca the Goose, Drago the Dragon, Torre the Tower).'
    ],
    popularityScore: 97,
    latitude: 43.3188,
    longitude: 11.3308,
    weatherProfile: {
      tempCelsius: '20°C - 31°C',
      tempFahrenheit: '68°F - 88°F',
      climate: 'Sizzling Tuscan Summer Sun',
      rainRisk: 'Low',
      bestTravelWindow: 'June 29 – July 2 or August 13 – 16 for trial races (prove) and neighborhood street banquets.',
      recommendedPacking: ['Contrada silk scarf (fazzoletto)', 'Hat & sun protection for standing in the piazza dirt center', 'Earplugs']
    },
    festivePeak: {
      peakDays: 'July 2 (Palio di Provenzano) & August 16 (Palio dell\'Assunta)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Very High',
      bestViewingSpot: 'A rented private apartment window overlooking Piazza del Campo or the central dirt mosh pit',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'siena-palio-banner',
      name: 'Painted Silk Palio Drappellone Banner',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.3,
      description: 'Hand-painted Tuscan silk banner bearing heraldic symbols of the winning Contrada and the Virgin Mary.'
    }
  },
  {
    id: 'maslenitsa-pancake-week',
    name: 'Maslenitsa (Pancake Week & Farewell to Winter)',
    localName: 'Масленица',
    date: '2027-02-15',
    month: 2,
    day: 15,
    country: 'Eastern Europe & Central Asia',
    countryCode: 'UA',
    category: 'seasonal',
    description: 'An ancient Slavic folk holiday marking the boundary between frosty winter and spring. Celebrating the return of the sun before the solemn fast of Great Lent, families feast on golden round blini (pancakes) resembling the warm sun, engage in snowball battles, and burn the straw Lady Maslenitsa effigy.',
    traditions: [
      'Baking and eating dozens of hot buttered blini (pancakes) topped with caviar, sour cream, jam, and smoked fish',
      'The "Storming of the Snow Fortress" (Vzyatiye snezhnogo gorodka) playful community snowball fight',
      'Sleigh riding on troikas through snowbound pine forests and ice slide racing',
      'Burning the towering straw Maslenitsa effigy on Sunday evening to bid farewell to winter and scatter ashes on fields'
    ],
    greeting: 'Happy Maslenitsa! / Shirokaya Maslenitsa! (Широкая Масленица!)',
    foodDelicacies: ['Golden Blini with Red Caviar & Butter', 'Blini with Sweet Quark Cottage Cheese & Berries', 'Sbiten (Hot Spiced Honey & Herbal Drink)', 'Mushroom Vareniki Dumplings'],
    bannerUrl: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?auto=format&fit=crop&w=1200&q=80',
    tags: ['Maslenitsa', 'Blini', 'Pancake Week', 'Slavic', 'Winter Solstice', 'Spring'],
    facts: [
      'The round golden blini pancakes were historically eaten as solar pagan symbols: hot, round, and yellow, honoring the Slavic sun god Dazhbog.',
      'The final Sunday of Maslenitsa is called "Forgiveness Sunday", where everyone asks each other for mutual forgiveness for any offenses committed during the year.'
    ],
    popularityScore: 93,
    latitude: 50.4501,
    longitude: 30.5234,
    weatherProfile: {
      tempCelsius: '-4°C to 3°C',
      tempFahrenheit: '25°F - 37°F',
      climate: 'Snowy Late-Winter Landscape with Glimpses of Spring Thaw',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-February for village folk festivals and outdoor wooden fairground games.',
      recommendedPacking: ['Insulated winter parka & waterproof boots', 'Wool mittens and ushanka fur hat']
    },
    festivePeak: {
      peakDays: 'February 21 (Forgiveness Sunday & Effigy Burning)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Open-air village museums and public parks',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'golden-blini-sun',
      name: 'Golden Solar Blini Stack & Lady Maslenitsa',
      modelType: 'golden_lotus',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.0,
      description: 'Towering stack of golden buttered blini crowned with red caviar, glowing in warm sunny solar fire.'
    }
  },
  {
    id: 'sinterklaas-eve-netherlands',
    name: 'Sinterklaas (Feast of Saint Nicholas)',
    localName: 'Sinterklaasavond (Pakjesavond)',
    date: '2026-12-05',
    month: 12,
    day: 5,
    country: 'Netherlands & Belgium',
    countryCode: 'NL',
    category: 'cultural',
    description: 'The traditional Dutch children\'s gift festival on the eve of Saint Nicholas. Sinterklaas arrives by steamboat from Spain on his white horse Amerigo, delivering burlap sacks of wrapped gifts accompanied by humorous personalized poems to doorways.',
    traditions: [
      'The grand steamboat arrival (Intocht) in mid-November broadcast live on national television',
      'Children placing shoes (schoentje zetten) by the chimney with carrots and hay for Sinterklaas\'s white horse',
      'Pakjesavond (Gift Evening): A mysterious knock on the front door reveals burlap bags brimming with presents',
      'Writing humorous rhyming poems teasing each family member\'s quirky habits of the past year'
    ],
    greeting: 'Fijne Sinterklaas! / Prettig Sinterklaasfeest!',
    foodDelicacies: ['Pepernoten & Kruidnoten (Mini Spiced Cinnamon Drops)', 'Chocolate Letters (initials of each family member)', 'Banketletter (Almond Paste Flaky Pastry)', 'Taai-Taai Aniseed Cookies', 'Speculaas Brokken'],
    bannerUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sinterklaas', 'Netherlands', 'Saint Nicholas', 'Pakjesavond', 'Pepernoten', 'Dutch'],
    facts: [
      'According to centuries of Dutch folklore, Sinterklaas resides in Madrid, Spain throughout the year before traveling north by steamboat each November.',
      'Every gift on Pakjesavond must be accompanied by an original handwritten rhyming poem that gently roasts the recipient before revealing the contents.'
    ],
    popularityScore: 95,
    latitude: 52.3676,
    longitude: 4.9041,
    weatherProfile: {
      tempCelsius: '3°C - 8°C',
      tempFahrenheit: '37°F - 46°F',
      climate: 'Cozy Chilly Dutch Winter - Hot Cocoa Weather',
      rainRisk: 'Moderate',
      bestTravelWindow: 'December 4 - 6 in Amsterdam or Utrecht for festive canal bakeries and pakjesavond atmosphere.',
      recommendedPacking: ['Warm waterproof winter coat', 'Scarf & gloves', 'Tote bag for speculaas and chocolate letters']
    },
    festivePeak: {
      peakDays: 'December 5 (Pakjesavond Evening)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Canal townhouses along the Keizersgracht in Amsterdam',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'sinterklaas-miter-crozier',
      name: 'Golden Sinterklaas Mitre & Staff',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#dc2626',
      scaleDefault: 1.1,
      description: 'Regal crimson bishop\'s mitre with golden cross flanked by a coiled golden pastoral staff and chocolate letter.'
    }
  },
  {
    id: 'heiva-i-tahiti',
    name: 'Heiva I Tahiti (The Soul of Polynesian Culture)',
    localName: 'Heiva I Tahiti',
    date: '2026-07-03',
    month: 7,
    day: 3,
    country: 'French Polynesia (Tahiti)',
    countryCode: 'PF',
    category: 'cultural',
    description: 'The ultimate celebration of Polynesian culture and identity held in Papeete. Dating back to 1881, hundreds of dancers in monumental natural costumes of fresh leaves, mother-of-pearl, and coconut shells perform thunderous ‘Ori Tahiti drum dances alongside outrigger canoe regattas.',
    traditions: [
      'The legendary ‘Ori Tahiti dance competition featuring 100-dancer troupes performing intricate rapid hip vibrations (Fa\'arapu)',
      'Tu\'aro Ma\'ohi: Traditional ancestral sports championships including heavy stone lifting (up to 150kg), javelin tossing into high coconuts, and fruit-carrying races',
      'Fa\'atete and To\'ere: Rapid polyrhythmic log drumming echoing across To\'atā stadium',
      'Va\'a outrigger canoe races across the turquoise lagoons between Tahiti and Moorea'
    ],
    greeting: '‘Ia ora na! ‘Ia maita\'i te Heiva! (Happy Heiva!)',
    foodDelicacies: ['Poisson Cru / ‘Ota ‘Ika (Raw Tuna marinated in Lime & Fresh Coconut Milk)', 'Pō\'e (Taro & Banana Pudding baked in Banana Leaves)', 'Fafaru', 'Roasted Breadfruit (‘Uru)'],
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Heiva', 'Tahiti', 'Polynesia', 'Ori Tahiti', 'Drumming', 'Lagoon Racing'],
    facts: [
      'During the 19th century, colonial authorities banned traditional Polynesian dancing for over 60 years; Heiva was created as a resilient renaissance of indigenous pride.',
      'Costumes must be crafted entirely from natural, unpreserved botanical materials like fresh pandanus leaves, auti plants, tapa bark cloth, and seashells.'
    ],
    popularityScore: 94,
    latitude: -17.5388,
    longitude: -149.5694,
    weatherProfile: {
      tempCelsius: '22°C - 28°C',
      tempFahrenheit: '72°F - 82°F',
      climate: 'Glorious Polynesian Dry Winter - Refreshing Mara\'amu Trade Winds',
      rainRisk: 'Low',
      bestTravelWindow: 'July for the competition finals at Place To\'atā in Papeete.',
      recommendedPacking: ['Tropical resort wear / pareo sarongs', 'Reef-safe sunscreen & snorkel gear', 'Camera with fast action shutter']
    },
    festivePeak: {
      peakDays: 'July 9 - 14 (Dance Competition Finals)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'To\'atā Stadium in Papeete on the waterfront',
      recommendedDurationDays: 5
    },
    arDecorItem: {
      id: 'tahitian-tiare-headdress',
      name: 'Tahitian Mother-of-Pearl & Tiare Feather Headdress',
      modelType: 'feathered_mask',
      festiveAuraColor: '#06b6d4',
      scaleDefault: 1.2,
      description: 'Towering Polynesian ceremonial crown woven from fragrant white Tiare blossoms, pandanus fiber, and black mother-of-pearl shells.'
    }
  },
  {
    id: 'enkutatash-ethiopian-new-year',
    name: 'Enkutatash (Ethiopian Ge\'ez New Year)',
    localName: 'እንቁጣጣሽ',
    date: '2026-09-11',
    month: 9,
    day: 11,
    country: 'Ethiopia & Eritrea',
    countryCode: 'ET',
    category: 'cultural',
    description: 'The Ethiopian New Year observed on the first day of the month of Meskerem in the ancient Ge\'ez calendar. Coinciding with the end of the heavy rainy season, the highlands bloom with millions of bright yellow Adey Abeba daisies, celebrated with singing girls giving flower drawings.',
    traditions: [
      'Young girls dressed in pristine white Habesha Kemis going from home to home singing "Abebayehosh" and handing out yellow daisy drawings',
      'Lighting the Chibo: Bundles of dried wood burned in home courtyards to celebrate the passing of the rainy season',
      'The traditional multi-round Ethiopian coffee ceremony with roasted frankincense and popcorn',
      'Slaughtering a sheep or goat for family banquets of spicy Doro Wat chicken stew'
    ],
    greeting: 'Melkam Enkutatash! (መልካም አዲስ ዓመት / እንቁጣጣሽ!)',
    foodDelicacies: ['Doro Wat with Hard-Boiled Eggs', 'Fresh Injera Flatbread', 'Defo Dabo (Spiced Honey Bread)', 'Tella (Traditional Fermented Barley Beer)', 'Arak Spirit'],
    bannerUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    tags: ['Enkutatash', 'Ethiopian New Year', 'Adey Abeba', 'Geez Calendar', 'Ethiopia'],
    facts: [
      'Ethiopia follows the ancient 13-month Ge\'ez calendar, which runs roughly seven to eight years behind the Gregorian calendar, famously leading to the tourism slogan "13 Months of Sunshine".',
      'According to legend, King Solomon gifted the Queen of Sheba jewels upon her return to Ethiopia; upon her arrival, her chiefs welcomed her with "Enkutatash", meaning "Gift of Jewels".'
    ],
    popularityScore: 93,
    latitude: 9.0320,
    longitude: 38.7482,
    weatherProfile: {
      tempCelsius: '14°C - 23°C',
      tempFahrenheit: '57°F - 73°F',
      climate: 'End of Rainy Season - Golden Sun & Yellow Daisy Meadows',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-September in Addis Ababa or the Simien Mountains.',
      recommendedPacking: ['Traditional Habesha Kemis or white linen attire', 'Comfortable walking shoes', 'Warm sweater for cool highland nights']
    },
    festivePeak: {
      peakDays: 'September 11 (New Year\'s Day)',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'Bustling',
      bestViewingSpot: 'Entoto Maryam Church and Meskel Square in Addis Ababa',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'adey-abeba-bouquet',
      name: 'Adey Abeba Yellow Wildflower Bouquet',
      modelType: 'golden_lotus',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.0,
      description: 'Luminous bundle of vibrant golden Adey Abeba daisies tied with traditional red, yellow, and green Ethiopian ribbons.'
    }
  },
  {
    id: 'meskel-finding-of-the-true-cross',
    name: 'Meskel (Finding of the True Cross Bonfire)',
    localName: 'መስቀል',
    date: '2026-09-27',
    month: 9,
    day: 27,
    country: 'Ethiopia & Eritrea',
    countryCode: 'religious',
    category: 'religious',
    description: 'A UNESCO Intangible Cultural Heritage festival commemorating the 4th-century Empress Helena discovering the True Cross of Christ in Jerusalem. Centered in Meskel Square in Addis Ababa, tens of thousands gather as Patriarchs ignite a towering conical bonfire (the Demera) decorated with yellow daisies.',
    traditions: [
      'Demera: Assembling a massive pyramid bonfire topped with a cross and yellow Adey Abeba flowers',
      'The Patriarch and priests in gold-embroidered velvet robes circling the Demera three times carrying silver crosses',
      'Igniting the Demera at dusk while hundreds of thousands sing hymns holding glowing candles',
      'Forecasting the coming year\'s agricultural harvest based on the exact direction the burning tower collapses'
    ],
    greeting: 'Melkam Meskel! (እንኳን ለመስቀል በዓል በሰላም አደረሳችሁ!)',
    foodDelicacies: ['Doro Wat Chicken Stew', 'Tibs (Sautéed Beef with Rosemary & Jalapeños)', 'Injera', 'Kitefo with Spiced Butter & Ayib Cheese', 'Fresh Honey Tej Wine'],
    bannerUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
    tags: ['Meskel', 'Demera', 'Ethiopia', 'True Cross', 'UNESCO', 'Bonfire'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2013.',
      'According to tradition, Empress Helena had a vision telling her to light a fire; the smoke rose to the sky and bent down to mark the exact spot where the Cross lay buried.'
    ],
    popularityScore: 94,
    latitude: 9.0107,
    longitude: 38.7613,
    weatherProfile: {
      tempCelsius: '13°C - 24°C',
      tempFahrenheit: '55°F - 75°F',
      climate: 'Crisp Clear Highland Autumn',
      rainRisk: 'Low',
      bestTravelWindow: 'September 26 - 28 in Addis Ababa.',
      recommendedPacking: ['Warm layers for chilly evening bonfire standing', 'Pristine white cotton Netela scarf']
    },
    festivePeak: {
      peakDays: 'September 26 (Demera Eve Bonfire) & September 27 (Meskel Day)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Grandstands at Meskel Square in Addis Ababa',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'demera-pyramid-fire',
      name: 'Blazing Demera Bonfire & Yellow Daisies',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.3,
      description: 'Towering conical straw Demera pyramid bursting into golden embers and fragrant frankincense smoke.'
    }
  },
  {
    id: 'heritage-day-braai-day-south-africa',
    name: 'Heritage Day (National Braai Day)',
    localName: 'Heritage Day (Erfenisdag)',
    date: '2026-09-24',
    month: 9,
    day: 24,
    country: 'South Africa',
    countryCode: 'ZA',
    category: 'national',
    description: 'South Africa\'s celebration of the "Rainbow Nation", encouraging all citizens to celebrate their diverse cultural roots, languages, music, and traditions. Widely and affectionately celebrated around the unifying national pastime of the braai (barbecue open-fire cooking).',
    traditions: [
      'Hosting communal braais: Grilling over aromatic wood coals with neighbors of every background',
      'Wearing colorful traditional indigenous attire (Zulu, Xhosa, Sotho, Ndebele, Venda, Afrikaner)',
      'Sharing musical genres from Amapiano and Kwaito to Marabi and traditional choral harmonies',
      'Storytelling sessions honoring the struggle against apartheid and the vision of Nelson Mandela'
    ],
    greeting: 'Happy Heritage Day! Lekker Braai Day!',
    foodDelicacies: ['Boerewors (Spiced South African Farm Sausage)', 'Lamb Chops with Braai Salt', 'Chakalaka (Spicy Vegetable Relish)', 'Pap (Cornmeal Porridge)', 'Malva Pudding with Warm Custard'],
    bannerUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Heritage Day', 'Braai Day', 'South Africa', 'Rainbow Nation', 'Mandela', 'Barbecue'],
    facts: [
      'Originally known in KwaZulu-Natal as Shaka Day, commemorating the legendary Zulu King Shaka who unified various clans into the Zulu kingdom.',
      'Archbishop Emeritus Desmond Tutu was the patron of National Braai Day, celebrating the braai as a transcendent symbol of reconciliation.'
    ],
    popularityScore: 93,
    latitude: -33.9249,
    longitude: 18.4241,
    weatherProfile: {
      tempCelsius: '13°C - 22°C',
      tempFahrenheit: '55°F - 72°F',
      climate: 'Crisp Early Spring - Blooming Cape Fynbos Wildflowers',
      rainRisk: 'Low',
      bestTravelWindow: 'Late September in Cape Town, Durban, or the Drakensberg mountains.',
      recommendedPacking: ['Windbreaker for Cape Town coastal breeze', 'Comfortable casual braai attire', 'Sunglasses']
    },
    festivePeak: {
      peakDays: 'September 24',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Kirstenbosch National Botanical Garden or Mzoli’s in Gugulethu, Cape Town',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'braai-coals-protea',
      name: 'King Protea Flower & Braai Grill Embers',
      modelType: 'golden_lotus',
      festiveAuraColor: '#ec4899',
      scaleDefault: 1.1,
      description: 'Magnificent pink King Protea bloom resting beside glowing red-hot acacia braai charcoal embers.'
    }
  },
  {
    id: 'crop-over-festival-barbados',
    name: 'Crop Over Festival & Grand Kadooment',
    localName: 'Crop Over',
    date: '2026-08-03',
    month: 8,
    day: 3,
    country: 'Barbados',
    countryCode: 'BB',
    category: 'cultural',
    description: 'Barbados\'s premier summer festival dating back to 1687, originally celebrating the successful end of the sugar cane harvest. Culminates on Grand Kadooment Day where masqueraders in vibrant feather plumes dance along the Spring Garden Highway to infectious Bajan Soca beats.',
    traditions: [
      'The Ceremonial Delivery of the Last Canes and crowning of the King and Queen of the Crop',
      'The Pic-o-de-Crop Calypso competition and Soca Monarch showdown',
      'Foreday Morning Jump: Pre-dawn mud and paint party parading along Bridgetown highways',
      'Grand Kadooment Day: The grand finale street masquerade carnival attended by international celebrities'
    ],
    greeting: 'Happy Crop Over! Sweet Fuh Days!',
    foodDelicacies: ['Flying Fish and Cou-Cou with Spicy Creole Sauce', 'Fish Cakes with Pepper Sauce', 'Pudding and Souse (Pickled Pork with Sweet Potato Pudding)', 'Bajan Rum Punch with Fresh Nutmeg'],
    bannerUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Crop Over', 'Barbados', 'Kadooment', 'Soca', 'Sugar Cane', 'Caribbean Carnival'],
    facts: [
      'Barbadian native and global icon Rihanna regularly attends Grand Kadooment in custom haute-couture feathered costumes.',
      'The festival originated in the late 17th century when enslaved Africans on sugar plantations celebrated the grueling harvest\'s completion with singing and dancing.'
    ],
    popularityScore: 96,
    latitude: 13.1939,
    longitude: -59.5432,
    weatherProfile: {
      tempCelsius: '26°C - 31°C',
      tempFahrenheit: '79°F - 88°F',
      climate: 'Tropical Warm Summer - Warm Ocean Breezes',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Late July through the first Monday of August for all major parties and Kadooment.',
      recommendedPacking: ['Vibrant beach festival wear', 'Waterproof phone pouch for Foreday Morning paint', 'Sun protection & hydration bottle']
    },
    festivePeak: {
      peakDays: 'August 1 (Foreday Morning) & August 3 (Grand Kadooment Day)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Mighty Grynner Highway (Spring Garden Highway) in Bridgetown',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'bajan-kadooment-plumes',
      name: 'Bajan Kadooment Feather Plumes & Sugar Cane',
      modelType: 'feathered_mask',
      festiveAuraColor: '#f59e0b',
      scaleDefault: 1.2,
      description: 'Towering tropical yellow and turquoise carnival plumage intertwined with fresh green sugar cane stalks.'
    }
  },
  {
    id: 'new-years-eve-global',
    name: 'New Year\'s Eve (Global Countdown Celebration)',
    localName: 'New Year\'s Eve / Saint Silvester',
    date: '2026-12-31',
    month: 12,
    day: 31,
    country: 'Worldwide (All Continents)',
    countryCode: 'UN',
    category: 'international',
    description: 'The universal global countdown welcoming the arrival of the new calendar year. Celebrated in every time zone from Sydney Harbour and Tokyo to London, Rio de Janeiro, and New York Times Square with midnight bell tolls, fireworks, champagne toasts, and New Year resolutions.',
    traditions: [
      'The 10-second midnight countdown leading to fireworks cascading from iconic landmarks',
      'The midnight kiss and singing "Auld Lang Syne" with loved ones and friends',
      'Spain and Latin America: Eating 12 green grapes at each stroke of midnight for 12 months of luck',
      'Writing New Year resolutions for personal renewal, travel adventures, and wellness'
    ],
    greeting: 'Happy New Year! / Bonne Année! / ¡Feliz Año Nuevo!',
    foodDelicacies: ['Champagne & Prosecco', 'Oysters on the Half Shell', 'Black-Eyed Peas with Collard Greens (Southern USA for fortune)', 'Lentils with Cotechino Sausage (Italy for wealth)', '12 Lucky Grapes'],
    bannerUrl: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=80',
    tags: ['New Year', 'Global Countdown', 'Fireworks', 'Champagne', 'Midnight', 'Times Square'],
    facts: [
      'The Pacific island nation of Kiribati (Kiritimati) is the first inhabited place on Earth to welcome the New Year, a full 26 hours before Baker Island in the central Pacific.',
      'Over 1 ton of multicolored confetti is dropped manually by volunteers over Times Square at the stroke of midnight.'
    ],
    popularityScore: 100,
    latitude: 40.7580,
    longitude: -73.9855,
    weatherProfile: {
      tempCelsius: 'Varies by destination (Winter frost in NYC/London, warm summer in Sydney/Rio)',
      tempFahrenheit: 'Varies',
      climate: 'Universal Global Night of Celebration',
      rainRisk: 'Low',
      bestTravelWindow: 'December 29 – January 2 in Sydney Harbour, London South Bank, or Copacabana Beach.',
      recommendedPacking: ['Festive evening wear', 'Warm overcoat for northern cities or linen for southern hemisphere beaches', 'Party horn / noisemaker']
    },
    festivePeak: {
      peakDays: 'December 31 (11:59 PM - 12:15 AM)',
      peakTimeOfDay: 'Midnight',
      crowdLevel: 'Very High',
      bestViewingSpot: 'Sydney Opera House forecourt, London Eye, or Times Square NYC',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'new-year-crystal-ball',
      name: 'Crystal Times Square Ball & Fireworks',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#38bdf8',
      scaleDefault: 1.3,
      description: 'Faceted Waterford crystal countdown sphere radiating brilliant white sparkles and gold confetti streamers.'
    }
  },
  {
    id: 'guy-fawkes-bonfire-night',
    name: 'Guy Fawkes Night (Bonfire Night)',
    localName: 'Bonfire Night / Guy Fawkes Night',
    date: '2026-11-05',
    month: 11,
    day: 5,
    country: 'United Kingdom',
    countryCode: 'GB',
    category: 'cultural',
    description: 'The British tradition commemorating the failed Gunpowder Plot of 1605, when Guy Fawkes was caught guarding 36 barrels of gunpowder beneath the House of Lords. Celebrated with soaring neighborhood bonfires, fireworks displays, and burning effigies ("guys").',
    traditions: [
      'Burning handcrafted "Guy" effigies on monumental outdoor community bonfires',
      'Waving hot handheld sparklers in swirling patterns in the dark autumn air',
      'Spectacular organized public pyrotechnics lighting up city parks',
      'Children historically asking passers-by: "Penny for the Guy?"'
    ],
    greeting: 'Remember, remember the fifth of November!',
    foodDelicacies: ['Parkin Cake (Spiced Oatmeal & Black Treacle Gingerbread)', 'Jacket Baked Potatoes wrapped in foil roasted in bonfire embers', 'Toffee Apples', 'Warm Spiced Apple Cider', 'Bangers and Mash'],
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    tags: ['Guy Fawkes', 'Bonfire Night', 'United Kingdom', 'Fireworks', 'Gunpowder Plot'],
    facts: [
      'To this day, the Yeomen of the Guard still conduct a ceremonial search of the cellars beneath the Houses of Parliament before the annual State Opening.',
      'Traditional Yorkshire Parkin cake is baked a week in advance so the black treacle and oatmeal become sticky and moist.'
    ],
    popularityScore: 94,
    latitude: 51.5074,
    longitude: -0.1278,
    weatherProfile: {
      tempCelsius: '6°C - 12°C',
      tempFahrenheit: '43°F - 54°F',
      climate: 'Chilly British Autumn - Woodsmoke & Mist',
      rainRisk: 'Moderate',
      bestTravelWindow: 'Early November; attend the fiery Lewes Bonfire celebrations in Sussex.',
      recommendedPacking: ['Heavy wool coat & warm gloves', 'Sturdy boots for muddy fields', 'Safety glasses for sparklers']
    },
    festivePeak: {
      peakDays: 'November 5',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The Cliffe Bonfire Society procession in Lewes, Sussex, or Alexandra Palace in London',
      recommendedDurationDays: 2
    },
    arDecorItem: {
      id: 'bonfire-night-sparkler',
      name: 'Flazing Bonfire & Golden Sparkler',
      modelType: 'fireworks_sparkler',
      festiveAuraColor: '#f97316',
      scaleDefault: 1.2,
      description: 'Luminous spinning sparkler casting starry golden crackles above a roaring timber bonfire.'
    }
  },
  {
    id: 'dia-de-los-reyes-three-kings',
    name: 'Día de los Reyes (Three Kings Day / Epiphany)',
    localName: 'Día de los Reyes Magos (Epifanía)',
    date: '2027-01-06',
    month: 1,
    day: 6,
    country: 'Spain, Mexico & Latin America',
    countryCode: 'ES',
    category: 'cultural',
    description: 'The beloved celebration marking the arrival of the Three Wise Men (Melchior, Gaspar, and Balthazar) bearing gold, frankincense, and myrrh. In many Hispanic cultures, children receive their main holiday gifts on this magical morning.',
    traditions: [
      'The Cabalgata de Reyes: Spectacular parade of camels, floats, and Kings throwing metric tons of sweets to crowds',
      'Children placing their shoes outside filled with straw and carrots for the Kings\' weary camels',
      'Slicing the circular Rosca / Roscón de Reyes sweet bread containing hidden porcelain or plastic figurines',
      'The finder of the baby figurine hosts the family for homemade tamales on Día de la Candelaria (February 2)'
    ],
    greeting: '¡Feliz Día de Reyes! Que los Reyes Magos te traigan bendiciones!',
    foodDelicacies: ['Rosca de Reyes (Sweet wreath bread decorated with candied figs, cherries & sugar crust)', 'Mexican Hot Chocolate with Cinnamon', 'Tamales Dulces & Verdes', 'Atole de Vainilla'],
    bannerUrl: 'https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=1200&q=80',
    tags: ['Three Kings Day', 'Dia de Reyes', 'Rosca de Reyes', 'Spain', 'Mexico', 'Epiphany'],
    facts: [
      'Madrid hosts one of the oldest Cabalgata parades in the world, dating back to 1866.',
      'The circular shape of the Rosca de Reyes represents the infinite circle of divine love without beginning or end.'
    ],
    popularityScore: 96,
    latitude: 40.4168,
    longitude: -3.7038,
    weatherProfile: {
      tempCelsius: '4°C - 11°C',
      tempFahrenheit: '39°F - 52°F',
      climate: 'Crisp Dry Winter - Blue Skies & Holiday Lights',
      rainRisk: 'Low',
      bestTravelWindow: 'January 4 - 7 in Madrid, Seville, or Mexico City.',
      recommendedPacking: ['Warm winter coat & scarf', 'Umbrella (often used inverted to catch candy at the parade!)', 'Comfortable boots']
    },
    festivePeak: {
      peakDays: 'January 5 (Cabalgata Parade Eve) & January 6 (Rosca Slicing)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Paseo de la Castellana in Madrid or the Zócalo in Mexico City',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'rosca-de-reyes-crown',
      name: 'Rosca de Reyes Sweet Wreath & Crown',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.1,
      description: 'Golden jeweled Rosca de Reyes wreath bread topped with ruby candied cherries and three shining crowns.'
    }
  },
  {
    id: 'mevlana-rumi-whirling-dervishes',
    name: 'Mevlana Seb-i Arus (Rumi\'s Whirling Dervishes)',
    localName: 'Şeb-i Arûs (Mevlana Anma Törenleri)',
    date: '2026-12-17',
    month: 12,
    day: 17,
    country: 'Turkey (Konya)',
    countryCode: 'TR',
    category: 'cultural',
    description: 'The mystical annual commemoration of Sufi poet and mystic Jalal al-Din Muhammad Rumi\'s "Wedding Night" (his passing into divine union with God). Held in Konya, Turkey, the Sema ritual features whirling dervishes spinning in pristine white robes to hypnotic reed ney flute melodies.',
    traditions: [
      'The sacred Sema ceremony: Turning counter-clockwise with right hand raised to receive divine grace and left hand turned down to transmit it to earth',
      'Wearing the tall felt camel\'s-hair cap (Sikke) representing the tombstone of the ego, and black cloak representing the grave',
      'Intoning sacred poetry from Rumi\'s monumental Masnavi and Divan-i Shams',
      'The mournful, transcendent breath of the reed Ney flute guiding the cosmic rotation'
    ],
    greeting: 'Şeb-i Arûs Mübarek Olsun! (Blessed Wedding Night!)',
    foodDelicacies: ['Etli Ekmek (Konya Crisp Flatbread with Spiced Minced Meat)', 'Tirit Kebab', 'Höşmerim Sweet Cheese Dessert', 'Turkish Black Tea with Lokum (Turkish Delight)'],
    bannerUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rumi', 'Whirling Dervishes', 'Sufism', 'Konya', 'Turkey', 'UNESCO', 'Mysticism'],
    facts: [
      'Inscribed on UNESCO\'s Representative List of the Intangible Cultural Heritage of Humanity in 2008.',
      'Rumi famously proclaimed: "Come, come, whoever you are. Wanderer, worshiper, lover of leaving. It doesn\'t matter. Ours is not a caravan of despair."'
    ],
    popularityScore: 95,
    latitude: 37.8746,
    longitude: 32.4932,
    weatherProfile: {
      tempCelsius: '-1°C to 8°C',
      tempFahrenheit: '30°F - 46°F',
      climate: 'Crisp Central Anatolian Winter - Occasional Snowfall',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-December in Konya; high-speed train connects directly from Istanbul and Ankara.',
      recommendedPacking: ['Warm winter wool coat & gloves', 'Slip-off shoes for visiting the Mevlana Museum and Mausoleum']
    },
    festivePeak: {
      peakDays: 'December 17 (Şeb-i Arûs Main Ceremony)',
      peakTimeOfDay: 'Twilight / Evening',
      crowdLevel: 'Intimate / Serene',
      bestViewingSpot: 'Mevlana Cultural Centre auditorium in Konya',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'whirling-dervish-sema',
      name: 'Luminescent Whirling Dervish & Reed Ney',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#38bdf8',
      scaleDefault: 1.2,
      description: 'Spinning white-robed dervish figure enveloped in spiraling celestial light ribbons and antique reed ney flute.'
    }
  },
  {
    id: 'cure-salee-nomad-festival',
    name: 'Cure Salée (Festival of the Nomads)',
    localName: 'Cure Salée',
    date: '2026-09-18',
    month: 9,
    day: 18,
    country: 'Niger & The Sahel',
    countryCode: 'NE',
    category: 'cultural',
    description: 'The monumental annual gathering of Tuareg and Wodaabe nomadic pastoralists in the desert oasis of Ingall. Celebrating the end of the rainy season, herders lead hundreds of thousands of camels, cattle, and goats to the mineral-rich salt pastures while staging majestic camel races and courtship gatherings.',
    traditions: [
      'Leading colossal herds across the Sahara dunes to graze on natural saline and salt flats for livestock vitality',
      'The Taguelmoust: Tuareg men wearing iconic 10-meter-long indigo blue turbans (the "Blue Men of the Desert")',
      'The Fantasia: High-speed desert camel charges across the sand by sword-wielding riders',
      'Desert tea ceremonies around acacia embers pouring foaming green gunpowder tea from brass pots'
    ],
    greeting: 'Salam Alaykum! Oy Mawdo Cure Salée!',
    foodDelicacies: ['Méchoui (Whole Pit-Roasted Desert Lamb)', 'Millet Porridge with Sweet Camel\'s Milk', 'Dates stuffed with Goat Cheese', 'Tuareg Foaming Mint Tea (Three glasses: gentle as life, strong as love, bitter as death)'],
    bannerUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Cure Salee', 'Tuareg', 'Nomads', 'Sahara', 'Camel Race', 'Sahel'],
    facts: [
      'The festival serves as the premier annual social and economic gathering in the Sahara for settling inter-tribal disputes, trading livestock, and arranging marriages.',
      'The indigo dye used in traditional Tuareg turbans rubs off onto the skin, historically giving rise to the name "the blue men of the desert".'
    ],
    popularityScore: 92,
    latitude: 16.7878,
    longitude: 6.9328,
    weatherProfile: {
      tempCelsius: '24°C - 38°C',
      tempFahrenheit: '75°F - 100°F',
      climate: 'Dry Desert Heat - Vast Starlit Saharan Skies',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-September in Ingall, northern Niger; travel must be organized with accredited local guides.',
      recommendedPacking: ['Lightweight cotton desert clothing & tagelmust scarf', 'Sand-proof camera bag', 'High-capacity water purification']
    },
    festivePeak: {
      peakDays: 'September 18 - 20',
      peakTimeOfDay: 'Morning',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The salt flats of Ingall on the edge of the Ténéré desert',
      recommendedDurationDays: 4
    },
    arDecorItem: {
      id: 'tuareg-agadez-cross',
      name: 'Silver Agadez Cross Pendant & Indigo Turban',
      modelType: 'sacred_chalice',
      festiveAuraColor: '#0284c7',
      scaleDefault: 1.1,
      description: 'Hand-hammered silver Tuareg Cross of Agadez resting on folded indigo-dyed desert linen with turquoise gems.'
    }
  },
  {
    id: 'water-splashing-festival-dai',
    name: 'Dai Water Splashing Festival (Po Shui Jie)',
    localName: '泼水节 (Pō Shuǐ Jié)',
    date: '2026-04-13',
    month: 4,
    day: 13,
    country: 'China (Yunnan) & Southeast Asia',
    countryCode: 'CN',
    category: 'cultural',
    description: 'The traditional New Year festival of the indigenous Dai ethnic people in tropical Xishuangbanna, Yunnan. Rooted in Buddhist water-cleansing rituals, the entire city erupts into joyful public water battles, dragon boat racing on the Lancang (Mekong) River, and releasing glowing Kongming sky lanterns.',
    traditions: [
      'Washing the Buddha statue (Yu Fo) with fragrant water scented with jasmine and frangipani blossoms',
      'The joyful communal water splashing battles in city squares wishing happiness and purification',
      'Dragon boat races on the Lancang River accompanied by bronze elephant-foot drum rhythms',
      'Releasing thousands of glowing paper Kongming lanterns into the night sky over riverbanks'
    ],
    greeting: 'Dai New Year Greetings! (泼水节快乐 / 欢度新年)',
    foodDelicacies: ['Dai Lemongrass Grilled Tilapia', 'Pineapple Glutinous Purple Rice', 'Ghost Chicken Salad with Lime & Fresh Herbs', 'Fried River Moss with Sesame'],
    bannerUrl: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&w=1200&q=80',
    tags: ['Water Splashing', 'Dai People', 'Yunnan', 'Xishuangbanna', 'Mekong', 'Lanterns'],
    facts: [
      'In Dai culture, splashing someone with water is the highest expression of respect, affection, and blessing; the more soaked you get, the more good fortune you will receive.',
      'Xishuangbanna borders Myanmar and Laos, making its Dai traditions closely connected to Songkran in Thailand and Thingyan in Myanmar.'
    ],
    popularityScore: 94,
    latitude: 22.0088,
    longitude: 100.7979,
    weatherProfile: {
      tempCelsius: '22°C - 34°C',
      tempFahrenheit: '72°F - 93°F',
      climate: 'Tropical Rainforest Summer - Lush Sunshine',
      rainRisk: 'Low',
      bestTravelWindow: 'Mid-April in Jinghong, Xishuangbanna.',
      recommendedPacking: ['Waterproof phone pouch', 'Quick-dry clothes & sandals', 'Water gun or silver splashing bowl']
    },
    festivePeak: {
      peakDays: 'April 13 - 15',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'Splashing Square in Jinghong and the banks of the Lancang (Mekong) River',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'dai-peacock-water-bowl',
      name: 'Dai Silver Peacock Water Vessel',
      modelType: 'golden_lotus',
      festiveAuraColor: '#06b6d4',
      scaleDefault: 1.1,
      description: 'Carved silver bowl with intricate Dai peacock engravings, filled with scented water and frangipani petals.'
    }
  },
  {
    id: 'umuganura-rwanda-harvest',
    name: 'Umuganura (Rwanda National Harvest Thanksgiving)',
    localName: 'Umuganura',
    date: '2026-08-07',
    month: 8,
    day: 7,
    country: 'Rwanda',
    countryCode: 'RW',
    category: 'cultural',
    description: 'One of the oldest and most sacred celebrations in Rwandan history dating back to the 10th-century kingdom. Celebrating national unity, agricultural prosperity, and thanksgiving, communities gather to share sorghum bread and fresh milk while dancers perform the majestic Intore warrior dance.',
    traditions: [
      'Sharing freshly harvested sorghum bread and drinking fresh raw milk (Amata) from carved wooden gourds',
      'The Intore dance: Acrobatic warrior dance with flowing sisal headdresses imitating the regal horns of royal Inyambo cattle',
      'Royal Inyambo cattle parades showcasing long-horned sacred cows singing cattle poems',
      'National discussions reflecting on achievements, communal solidarity, and self-reliance'
    ],
    greeting: 'Umunsi mwiza w\'Umuganura! (Happy Umuganura!)',
    foodDelicacies: ['Ubugali b\'amasaka (Sorghum Ugali)', 'Fresh Raw Milk (Amata)', 'Isombe (Cassava Leaves with Eggplant & Peanut Butter)', 'Brochettes (Grilled Goat Meat Skewers with Plantains)', 'Akabanga Chili'],
    bannerUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    tags: ['Umuganura', 'Rwanda', 'Harvest', 'Intore Dance', 'Inyambo Cattle', 'Thanksgiving'],
    facts: [
      'Umuganura was historically the supreme royal festival in ancient Rwanda, where the King (Mwami) and the Queen Mother tasted the first fruits of the sorghum harvest before anyone in the realm could eat.',
      'Revitalized as a national public holiday in 2011 to celebrate Rwanda\'s modern economic resilience and cultural heritage.'
    ],
    popularityScore: 92,
    latitude: -1.9706,
    longitude: 30.1044,
    weatherProfile: {
      tempCelsius: '16°C - 27°C',
      tempFahrenheit: '61°F - 80°F',
      climate: 'Pleasant Dry Season in the Land of a Thousand Hills',
      rainRisk: 'Low',
      bestTravelWindow: 'Early August in Nyanza (the royal palace) and Kigali.',
      recommendedPacking: ['Comfortable walking shoes for rolling hills', 'Light jacket for cool Kigali evenings', 'Modest attire']
    },
    festivePeak: {
      peakDays: 'August 7 (First Friday of August)',
      peakTimeOfDay: 'Afternoon',
      crowdLevel: 'High Energy',
      bestViewingSpot: 'The King\'s Palace Museum in Nyanza or BK Arena in Kigali',
      recommendedDurationDays: 3
    },
    arDecorItem: {
      id: 'intore-warrior-headdress',
      name: 'Intore Sisal Headdress & Milk Gourd',
      modelType: 'feathered_mask',
      festiveAuraColor: '#eab308',
      scaleDefault: 1.2,
      description: 'Flowing golden-white sisal fiber Intore warrior mane accompanied by an intricately carved wooden Rwandan milk gourd.'
    }
  }
];

