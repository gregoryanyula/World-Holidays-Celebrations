import { Holiday, TraditionalAttireData } from '../types';

export const BASELINE_TRADITIONAL_ATTIRE: Record<string, TraditionalAttireData> = {
  'diwali-festival-of-lights': {
    holidayId: 'diwali-festival-of-lights',
    holidayName: 'Diwali (Festival of Lights)',
    country: 'India & South Asia',
    overview: 'Diwali attire is radiant, opulent, and celebratory. Wearing brand-new garments on the first day (Dhanteras) honors Goddess Lakshmi and symbolizes fresh beginnings, prosperity, and the triumph of inner illumination.',
    historicalContext: 'Rooted in ancient Vedic traditions where pure unstitched fabrics (drape garments) represented spiritual purity. Over centuries, Mughal brocades, Banarasi silks, and intricate Zardozi gold embroidery evolved into the festive standard.',
    auspiciousColors: [
      { name: 'Auspicious Vermilion & Crimson', hex: '#C41E3A', meaning: 'Energy, passion, marital prosperity, and divine feminine strength (Shakti).' },
      { name: 'Sacred Haldi Yellow & Saffron', hex: '#EAA221', meaning: 'Sanctity, auspiciousness, sunlight, and spiritual illumination.' },
      { name: 'Royal Gold Brocade', hex: '#D4AF37', meaning: 'Wealth, divine grace of Goddess Lakshmi, and majesty.' },
      { name: 'Deep Emerald Green', hex: '#0B6623', meaning: 'Abundance, new harvest, fertility, and renewal.' }
    ],
    garments: [
      {
        id: 'diwali-saree',
        name: 'Banarasi / Kanjeevaram Silk Saree',
        nativeTerm: 'साड़ी (Sāṛī)',
        ensembleType: 'feminine',
        categoryLabel: 'Feminine Traditional',
        description: 'Six to nine yards of heavy mulberry silk woven with pure gold and silver zari metallic threads. Draped gracefully over a fitted blouse (choli) and petticoat with an ornate pallu over the left shoulder.',
        fabrics: ['Mulberry Silk', 'Pure Gold Zari', 'Brocade'],
        colors: ['Crimson Red', 'Peacock Blue', 'Emerald Green', 'Royal Gold'],
        culturalSignificance: 'The ultimate symbol of Indian heritage, grace, and festive grandeur. Passed down across generations as heirloom garments.',
        motifsOrPatterns: 'Paisley (Kalka), Peacocks, Bel floral vines, and temple border pyramids.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Traditional Indian silk festive saree with intricate gold zari brocade work',
        accentColor: '#C41E3A'
      },
      {
        id: 'diwali-kurta-sherwani',
        name: 'Silk Kurta-Pyjama & Bandhgala Sherwani',
        nativeTerm: 'शेरवानी / कुर्ता (Sherwānī / Kurtā)',
        ensembleType: 'masculine',
        categoryLabel: 'Masculine Ensemble',
        description: 'Tunic-style long shirt paired with drawstring trousers (churidar or pyjama), often layered with an embroidered Nehru vest or royal structured Bandhgala coat.',
        fabrics: ['Raw Dupion Silk', 'Chanderi Cotton-Silk', 'Jacquard Linen'],
        colors: ['Ivory Cream', 'Mustard Ochre', 'Deep Maroon', 'Midnight Indigo'],
        culturalSignificance: 'Blends classical aristocratic elegance with festive comfort, allowing ease for family puja rituals and evening fireworks.',
        motifsOrPatterns: 'Chikankari shadow needlework, subtle mandarin collars, and antique brass buttons.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Festive Indian raw silk kurta sherwani with embroidered Nehru vest',
        accentColor: '#EAA221'
      },
      {
        id: 'diwali-lehenga',
        name: 'Festive Embroidered Lehenga Choli',
        nativeTerm: 'लहंगा चोली (Leheṅgā Choḷī)',
        ensembleType: 'feminine',
        categoryLabel: 'Celebration Ensemble',
        description: 'Voluminous flared skirt with heavy mirror-work (shisha) or gota patti embroidery, cropped blouse, and a diaphanous net or chiffon dupatta veil.',
        fabrics: ['Georgette', 'Velvet', 'Organza', 'Chanderi Silk'],
        colors: ['Marigold Orange', 'Magenta', 'Fuchsia', 'Antique Gold'],
        culturalSignificance: 'Popular among young women and festive dancers; the circular flare mirrors fireworks and spinning diya lamps.',
        motifsOrPatterns: 'Gota patti borders, mirror-work (abhala bharat), and geometric floral swirls.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Flared festive lehenga choli with rich mirror-work and gold borders',
        accentColor: '#D4AF37'
      },
      {
        id: 'diwali-juttis-jewelry',
        name: 'Mojari Juttis & Temple Jewelry',
        nativeTerm: 'मोज़ड़ी / कुंदन (Mojarī / Kundan)',
        ensembleType: 'accessory',
        categoryLabel: 'Accessories & Adornment',
        description: 'Handcrafted leather slip-on shoes with pointed curved toes (Mojari) embellished with beadwork, paired with 22k gold Kundan, Polki uncut diamond jewelry, and glass bangles.',
        fabrics: ['Embroidered Leather', 'Gold-plated Brass', 'Glass Bangles'],
        colors: ['Gold', 'Ruby Red', 'Emerald Green'],
        culturalSignificance: 'Chiming glass bangles (choodiyan) are believed to attract positive energy waves into the household during the evening prayers.',
        motifsOrPatterns: 'Jhumka bell earrings, floral maang tikka, and floral filigree.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Intricate 22k Kundan gold festive temple jewelry and handcrafted mojari shoes',
        accentColor: '#0B6623'
      }
    ],
    adornmentsAndJewelry: [
      'Fresh fragrant jasmine flower garlands (Gajra) woven into hair braids',
      'Elaborate botanical Henna (Mehndi) tattoos across palms and wrists',
      'Ornate Jhumki bell earrings that gently chime during movement',
      'Vermilion forehead Bindi or Chandan sandalwood tilak marking the third eye'
    ],
    visitorEtiquetteTips: {
      canVisitorsWear: 'Yes! Indian communities enthusiastically welcome visitors wearing traditional attire. Wearing a clean kurta or saree is considered a heartfelt sign of respect.',
      dos: [
        'Opt for bright, cheerful colors like saffron, yellow, red, orange, and jewel tones.',
        'Remove footwear before stepping onto prayer rugs or into family homes for puja rituals.',
        'Ensure garments are modest, covering knees and shoulders during religious ceremonies.'
      ],
      donts: [
        'Avoid all-black or plain stark white outfits, which are traditionally associated with mourning rituals in South Asian customs.',
        'Do not step on the flowing hem or pleats of a saree; secure it with discreet safety pins.'
      ]
    },
    modernAdaptations: 'Indo-western fusion ensembles like draped dhoti-pants with structured crop-capes, asymmetrical bandhgalas, and comfortable breathable linen kurtas are trending among younger celebrants.'
  },
  'dia-de-los-muertos': {
    holidayId: 'dia-de-los-muertos',
    holidayName: 'Día de los Muertos (Day of the Dead)',
    country: 'Mexico & Latin America',
    overview: 'Day of the Dead attire is a theatrical, joyful celebration of memory over death. Participants blend indigenous Mexican textiles with Victorian elegance and artistic sugar skull face paint inspired by José Guadalupe Posada’s La Calavera Catrina.',
    historicalContext: 'Originating in pre-Columbian Aztec rituals dedicated to Mictecacihuatl (Queen of the Underworld), layered with Spanish Catholic all-souls customs and 20th-century satire celebrating social equality in death.',
    auspiciousColors: [
      { name: 'Cempasúchil Marigold Orange', hex: '#FF7F00', meaning: 'The sun’s warmth and scent path guiding ancestral souls home.' },
      { name: 'Sacred Maya Purple', hex: '#6A0DAD', meaning: 'Sorrow, remembrance, and the spiritual threshold between worlds.' },
      { name: 'Pure Altar White', hex: '#FDFBF7', meaning: 'Purity, renewal, innocence of deceased children (angelitos).' },
      { name: 'Midnight Black & Obsidian', hex: '#1C1917', meaning: 'The land of the dead (Mictlán) and formal Victorian solemnity.' }
    ],
    garments: [
      {
        id: 'catrina-gown',
        name: 'La Calavera Catrina Victorian Gown',
        nativeTerm: 'Vestido de Catrina',
        ensembleType: 'feminine',
        categoryLabel: 'Feminine Traditional',
        description: 'Opulent floor-length vintage Victorian or Edwardian lace gown with high ruffled necklines, corseted bodice, and flowing train, adorned with velvet and marigold blossoms.',
        fabrics: ['Black Chantilly Lace', 'Crushed Velvet', 'Satin', 'Tulle'],
        colors: ['Black', 'Deep Purple', 'Blood Red', 'Cempasúchil Orange'],
        culturalSignificance: 'Personifies La Catrina, reminding humanity that regardless of vanity, wealth, or station in life, we are all ultimately skeletons underneath.',
        motifsOrPatterns: 'Victorian floral lace, skeleton bone appliqués, and ribbon ruching.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Traditional elegant Catrina Victorian gown with marigold floral headpiece',
        accentColor: '#6A0DAD'
      },
      {
        id: 'traje-de-charro',
        name: 'Gala Traje de Charro Ensemble',
        nativeTerm: 'Traje de Charro de Gala',
        ensembleType: 'masculine',
        categoryLabel: 'Masculine Ensemble',
        description: 'Fitted Mexican equestrian jacket and trousers embellished with silver or bone button accents (grecas/botonaduras), embroidered silk tie (corbatín), and a wide-brimmed sombrero.',
        fabrics: ['Fine Wool Felt', 'Suede', 'Embroidered Silk', 'Silver Filigree'],
        colors: ['Midnight Black', 'Dark Charcoal', 'Bone White', 'Silver'],
        culturalSignificance: 'The ultimate symbol of Mexican gentlemanly pride and mariachi heritage, honoring masculine ancestral generations.',
        motifsOrPatterns: 'Engraved silver horseheads, Aztec frets, and floral embroidery down trouser seams.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Classic Mexican Traje de Charro with silver botonaduras and gala sombrero',
        accentColor: '#FF7F00'
      },
      {
        id: 'oaxaca-tehuana-dress',
        name: 'Indigenous Oaxacan Tehuana / Huipil',
        nativeTerm: 'Huipil & Enagua Oaxaqueña',
        ensembleType: 'feminine',
        categoryLabel: 'Indigenous Traditional',
        description: 'Handwoven boxy tunic (huipil) richly embroidered with satin-stitch tropical flowers, paired with a matching tiered ruffled skirt and starched lace resplandor headdress.',
        fabrics: ['Handwoven Cotton', 'Velvet', 'Silk Thread', 'Stiffened Lace'],
        colors: ['Jet Black with Multicolored Floral Embroidery'],
        culturalSignificance: 'Made famous globally by Frida Kahlo; represents the matriarchal strength, resilience, and artistic genius of Zapotec and Isthmus women.',
        motifsOrPatterns: 'Oversized roses, pansies, carnations, and geometric pre-Columbian fretwork.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Handmade Oaxacan embroidered Tehuana dress with vibrant floral motifs',
        accentColor: '#C41E3A'
      },
      {
        id: 'calavera-makeup-crown',
        name: 'Catrina Sugar Skull Makeup & Floral Corona',
        nativeTerm: 'Maquillaje de Calavera y Corona',
        ensembleType: 'accessory',
        categoryLabel: 'Iconic Adornment',
        description: 'Hand-painted sugar skull face art with white porcelain base, darkened eye sockets ringed with flower petals, cobweb details, and a towering crown of fresh or paper cempasúchil marigolds.',
        fabrics: ['Fresh Marigolds', 'Black Lace Veil', 'Mineral Face Pigments'],
        colors: ['Vibrant Marigold Orange', 'Jet Black', 'Pearl White'],
        culturalSignificance: 'Transforms the living wearer into an ambassador of the spirit world, greeting ancestors not with dread but with festive joy.',
        motifsOrPatterns: 'Floral mandala eye rings, smiling dental stitches, heart nose cavity, and cobwebs.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1572945281869-8402301ab45b?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Artistic Catrina sugar skull face makeup with marigold floral headpiece',
        accentColor: '#FF7F00'
      }
    ],
    adornmentsAndJewelry: [
      'Towering crown (corona) of fresh orange cempasúchil marigolds and red cockscomb flowers',
      'Intricate filigree silver and coral earrings from Oaxaca',
      'Fringed rebozo shawls draped gracefully over shoulders for nocturnal cemetery chills',
      'Handcrafted sugar skull and skeleton bone pendants'
    ],
    visitorEtiquetteTips: {
      canVisitorsWear: 'Yes! Visitors are warmly encouraged to wear traditional embroidered garments or have their faces respectfully painted as a calavera by local street artists in town plazas.',
      dos: [
        'Treat cemetery vigils (velaciones) with solemn reverence; face paint is festive, but quiet respect for grieving families is paramount.',
        'Support local artisans and indigenous weavers when buying embroidered blouses or rebozos.',
        'Smile and celebrate the joyful reunion of spirits; this is a celebration of life, not Halloween horror.'
      ],
      donts: [
        'Do not treat sacred ofrendas or gravesites as photo booth backdrops; ask permission before photographing family altars.',
        'Avoid dressing in generic spooky horror costumes (zombies, vampires, blood splatters), which contradicts the loving purpose of Día de los Muertos.'
      ]
    },
    modernAdaptations: 'Contemporary designers craft tailored linen blazers with subtle calavera satin linings, and laser-cut acrylic marigold crowns for comfortable multi-day street processions.'
  },
  'lunar-new-year-spring-festival': {
    holidayId: 'lunar-new-year-spring-festival',
    holidayName: 'Lunar New Year (Spring Festival)',
    country: 'China, East & SE Asia',
    overview: 'Lunar New Year attire centers entirely on auspicious symbolism, warmth, and fresh beginnings. Wearing brand-new red clothing wards off misfortune, scares away the mythical beast Nian, and invites wealth and vitality for the coming lunisolar cycle.',
    historicalContext: 'Evolving from ancient Han dynasty Hanfu robes with cross-collars through Qing dynasty Manchu silk cheongsams and Republic-era Tangzhuang jackets with traditional knot buttons.',
    auspiciousColors: [
      { name: 'China Red / Vermilion', hex: '#DE2910', meaning: 'Good fortune, happiness, passion, and warding off evil spirits.' },
      { name: 'Imperial Gold / Yellow', hex: '#FFDE00', meaning: 'Earth, imperial sovereignty, wealth, and supreme supreme harmony.' },
      { name: 'Jade Green', hex: '#00A86B', meaning: 'Purity, longevity, health, and virtuous character.' }
    ],
    garments: [
      {
        id: 'qipao-cheongsam',
        name: 'Silk Qipao / Cheongsam',
        nativeTerm: '旗袍 (Qípáo)',
        ensembleType: 'feminine',
        categoryLabel: 'Feminine Traditional',
        description: 'Form-fitting silk dress with a high mandarin collar, asymmetrical diagonal front closure fastened with handmade Pankou knot buttons, and side slits.',
        fabrics: ['Jacquard Silk Brocade', 'Velvet with Gold Foil', 'Satin'],
        colors: ['Auspicious Scarlet Red', 'Crimson & Gold Brocade'],
        culturalSignificance: 'Epitomizes traditional Chinese feminine poise, festive elegance, and maternal warmth during New Year family reunion banquets.',
        motifsOrPatterns: 'Blooming peonies (wealth), twin swimming carp (surplus), and phoenix soaring.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Traditional red silk Chinese Qipao with gold embroidery and mandarin collar',
        accentColor: '#DE2910'
      },
      {
        id: 'tangzhuang-jacket',
        name: 'Tangzhuang Festive Silk Jacket',
        nativeTerm: '唐装 (Tángzhuāng)',
        ensembleType: 'masculine',
        categoryLabel: 'Masculine Ensemble',
        description: 'Straight-cut silk jacket featuring a standing mandarin collar, front-opening frog button closures, and embroidered roundels of longevity.',
        fabrics: ['Damask Silk Brocade', 'Cotton Padding for Winter', 'Satin Jacquard'],
        colors: ['Imperial Red', 'Deep Burgundy', 'Navy with Gold Emblems'],
        culturalSignificance: 'The classic modern attire for patriarchs, sons, and leaders presenting New Year greetings (Bainian) and handing out red envelopes.',
        motifsOrPatterns: 'Circular "Lu" (Prosperity) and "Shou" (Longevity) seals, stylized cloud swirls.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Chinese Tangzhuang red silk jacket with traditional frog knot buttons',
        accentColor: '#FFDE00'
      },
      {
        id: 'hanfu-revival',
        name: 'Ming/Tang Dynasty Festive Hanfu',
        nativeTerm: '汉服 (Hànfú)',
        ensembleType: 'unisex',
        categoryLabel: 'Historical Imperial',
        description: 'Flowing multi-layered robes with crossed lapels (Jiaoling), wide sleeves, pleated horse-face skirt (Mamianqun), and a dragon/phoenix embroidered winter cloak.',
        fabrics: ['Brocade', 'Faux Fur Trim', 'Mulberry Crepe'],
        colors: ['Pomegranate Red', 'Snow White', 'Pine Green'],
        culturalSignificance: 'At the heart of the modern youth cultural renaissance; connects young celebrants with millennia of poetic classical heritage.',
        motifsOrPatterns: 'Weaving gold threads (Zhijin), mythical Qilin, and plum blossoms enduring winter frost.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Magnificent traditional Chinese Hanfu with gold horse-face skirt and winter cloak',
        accentColor: '#DE2910'
      },
      {
        id: 'lny-jade-adornments',
        name: 'Jade Pendants & Tiger-Head Shoes',
        nativeTerm: '玉佩 / 虎头鞋 (Yùpèi / Hǔtóuxié)',
        ensembleType: 'accessory',
        categoryLabel: 'Auspicious Adornment',
        description: 'Carved natural Burmese jadeite pendants worn on red braided cords, alongside traditional handmade embroidered tiger-head booties and hats for infants.',
        fabrics: ['Hetian Jade', 'Red Silk Cord', 'Embroidered Cotton'],
        colors: ['Translucent Jade Green', 'Vibrant Red'],
        culturalSignificance: 'Jade embodies moral virtue and wards off physical harm; tiger motifs protect infants from malevolent spirits.',
        motifsOrPatterns: 'Gourd (blessings), Ruyi scepter (as you wish), and tiger whiskers.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Carved auspicious jade pendant on red silk cord and traditional red accessories',
        accentColor: '#00A86B'
      }
    ],
    adornmentsAndJewelry: [
      'Pure 24k yellow gold dragon and phoenix bangles and pendants',
      'Solid carved natural jadeite bangles worn on the left wrist close to the heart',
      'Golden hairpins (Zan) with suspended pearl tassels that sway with motion',
      'Red string bracelets featuring the zodiac animal totem of the new year'
    ],
    visitorEtiquetteTips: {
      canVisitorsWear: 'Yes! Wearing red clothing or a Tangzhuang jacket will delight your hosts and show enthusiastic respect for the festive energy.',
      dos: [
        'Wear brand-new clothes on the first day of the New Year to signify a clean slate and fresh fortune.',
        'Incorporate red or bright jewel-toned items throughout your outfit.',
        'Keep red envelopes (Hongbao) in crisp new bills to gift to children or unmarried youngsters.'
      ],
      donts: [
        'Never wear all-white or all-black ensembles to New Year celebrations, as they are strict cultural funeral colors.',
        'Do not wash your clothes or cut your hair on New Year’s Day, as tradition holds it washes away good fortune.'
      ]
    },
    modernAdaptations: 'Modern "New Chinese Style" (Xin Zhongshi) blends minimalist oversized wool trench coats with mandarin frog closures, pairable with casual denim or tailored trousers.'
  },
  'oktoberfest': {
    holidayId: 'oktoberfest',
    holidayName: 'Oktoberfest',
    country: 'Germany (Bavaria)',
    overview: 'Oktoberfest attire is governed by authentic Bavarian Trachten heritage. The dress code is both a proud regional statement and a lively celebration of alpine folk craft, featuring the leather Lederhosen for men and the tailored Dirndl dress for women.',
    historicalContext: 'Derived from working-class alpine peasant garments in the 18th century, adopted by Bavarian royalty (King Ludwig II) in the 19th century as a symbol of regional unity and pride.',
    auspiciousColors: [
      { name: 'Alpine Forest Green (Loden)', hex: '#2D5A27', meaning: 'Bavarian pine forests, hunting heritage, and alpine nature.' },
      { name: 'Bavarian Sky Blue', hex: '#0066B2', meaning: 'The official heraldic state color of Bavaria (Wittelsbach dynasty).' },
      { name: 'Warm Edelweiss Cream', hex: '#FDFBF7', meaning: 'Purity of high alpine meadows and crisp clean mountain air.' },
      { name: 'Earthy Deer Brown', hex: '#5C4033', meaning: 'Tanned deer-skin leather, stability, and enduring rustic tradition.' }
    ],
    garments: [
      {
        id: 'dirndl-dress',
        name: 'Traditional Bavarian Dirndl',
        nativeTerm: 'Bayerisches Dirndl',
        ensembleType: 'feminine',
        categoryLabel: 'Feminine Traditional',
        description: 'A three-piece ensemble comprising a close-fitting bodice (Mieder), a high-waisted wide skirt (Rock) extending below the knee, a white ruffled blouse, and an apron (Schürze).',
        fabrics: ['Linen', 'Fine Cotton Jacquard', 'Silk Brocade'],
        colors: ['Forest Green', 'Bavarian Blue', 'Burgundy', 'Dusty Rose'],
        culturalSignificance: 'The placement of the apron bow is a historic social code: tied on the left indicates single/available; tied on the right indicates married/taken; tied in center means virgin; tied at back indicates widow or waitress.',
        motifsOrPatterns: 'Alpine flowers (Edelweiss, Enzian), acorns, and heart-shaped metal eyelets.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1570783307521-82559b56f709?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Authentic Bavarian Dirndl dress with embroidered apron and alpine motifs',
        accentColor: '#2D5A27'
      },
      {
        id: 'lederhosen',
        name: 'Short Leather Breeches & Suspenders',
        nativeTerm: 'Kurze Lederhose & Hosenträger',
        ensembleType: 'masculine',
        categoryLabel: 'Masculine Ensemble',
        description: 'Tough, supple shorts crafted from wild stag (Hirschleder) or goat leather, equipped with a drop-front flap (Hosenlatz), suspenders with an embroidered cross-brace (H-Träger), and a side knife pocket.',
        fabrics: ['Tanned Chamois / Deerskin', 'Horn Buttons', 'Embroidered Flax Thread'],
        colors: ['Aged Saddle Brown', 'Olive Taupe', 'Charcoal Anthracite'],
        culturalSignificance: 'Designed to last a lifetime and develop a natural patina (Speckig). It is a proud heirloom passed from father to son.',
        motifsOrPatterns: 'Hand-relief relief embroidery of stag horns, oak leaves, and alpine gentian flowers.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Traditional Bavarian Lederhosen deerskin leather shorts with suspenders',
        accentColor: '#5C4033'
      },
      {
        id: 'trachten-cardigan-janker',
        name: 'Trachten Janker & Walkjacke',
        nativeTerm: 'Trachtenjanker & Strickweste',
        ensembleType: 'unisex',
        categoryLabel: 'Alpine Outerwear',
        description: 'Straight-cut boiled wool (Loden) jacket with dark green stand-up collar, stag-horn buttons, and contrasting piping, or a knitted alpine wool cardigan.',
        fabrics: ['100% Boiled Virgin Sheep Wool', 'Stag Horn', 'Green Loden Cloth'],
        colors: ['Granite Grey', 'Alpine Green', 'Oatmeal Wool'],
        culturalSignificance: 'Essential protection against crisp Bavarian autumn breezes when transitioning between outdoor beer gardens and heated festival tents.',
        motifsOrPatterns: 'Cable-knit honeycomb ribs, horn buttons, and green felt collar trim.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Traditional boiled wool Bavarian Trachten Janker jacket with stag horn buttons',
        accentColor: '#0066B2'
      },
      {
        id: 'haferlschuhe-loferl',
        name: 'Haferlschuhe Shoes & Loferl Calf Warmers',
        nativeTerm: 'Haferlschuhe & Loferl',
        ensembleType: 'accessory',
        categoryLabel: 'Footwear & Accessories',
        description: 'Sturdy side-laced work shoes with raised heel and lugged rubber sole, paired with two-piece Loferl knitted calf warmers and ankle socks.',
        fabrics: ['Full-Grain Calf Leather', 'Ribbed Sheep Wool'],
        colors: ['Dark Brown', 'Forest Green and Cream Knit'],
        culturalSignificance: 'Engineered for alpine mountain walking and hours of standing on beer tent wooden benches singing folk anthems.',
        motifsOrPatterns: 'Brogued leather seams and two-tone knitted cables.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: 'Authentic Bavarian Haferlschuhe leather shoes with knitted loferl calf bands',
        accentColor: '#5C4033'
      }
    ],
    adornmentsAndJewelry: [
      'Gamsbart alpine hat adorned with a prized tuft of chamois mountain goat hair',
      'Silver Charivari chain hung with hunting amulets, old silver coins, and animal teeth',
      'Velvet choker necklace (Kropfband) with an edelweiss or cameo silver pendant',
      'Fresh floral hair wreaths or braided alpine crown updos (Gretchenzopf)'
    ],
    visitorEtiquetteTips: {
      canVisitorsWear: 'Visitors are enthusiastically welcomed to wear traditional Trachten! Locals genuinely appreciate the effort, provided it is high-quality traditional attire.',
      dos: [
        'Invest in or rent authentic quality garments rather than cheap shiny polyester fancy-dress costumes.',
        'Ensure the Dirndl skirt falls at least to the knees or mid-calf; mini-dirndls are considered tacky carnival costumes.',
        'Pay close attention to where you tie the apron bow to avoid sending unintentional marital signals!'
      ],
      donts: [
        'Never wear cheap plastic novelty hats with foam beer mugs; real Bavarians wear classic felt hats.',
        'Do not wear high heels on wet beer tent floors; opt for flat leather booties or traditional Haferlschuhe.'
      ]
    },
    modernAdaptations: 'Modern Munich fashion houses produce washable linen Dirndls in monochrome matte tones and contemporary slim-cut leather trousers suitable for urban evening wear.'
  }
};

/**
 * Generates or retrieves traditional attire intelligence for any holiday.
 */
export function getTraditionalAttireForHoliday(holiday: Holiday): TraditionalAttireData {
  if (holiday.traditionalAttire) {
    return holiday.traditionalAttire;
  }

  const lookupKey = holiday.id.toLowerCase();
  if (BASELINE_TRADITIONAL_ATTIRE[lookupKey]) {
    return BASELINE_TRADITIONAL_ATTIRE[lookupKey];
  }

  for (const [key, data] of Object.entries(BASELINE_TRADITIONAL_ATTIRE)) {
    if (lookupKey.includes(key) || key.includes(lookupKey)) {
      return data;
    }
  }

  // Dynamic cultural attire generation based on holiday attributes
  const cleanName = holiday.name.split('(')[0].trim();
  const country = holiday.country || 'Global Tradition';

  return {
    holidayId: holiday.id,
    holidayName: holiday.name,
    country: country,
    overview: `During ${cleanName}, traditional dress serves as a living expression of communal belonging, spiritual reverence, and ancestral memory. Celebrants wear celebratory attire tailored to the festive rites of ${country}.`,
    historicalContext: `The traditional attire for ${cleanName} reflects centuries of artisanal textile weaving, regional climate requirements, and ceremonial customs passed down through generations.`,
    auspiciousColors: [
      { name: 'Ceremonial Gold', hex: '#D4AF37', meaning: 'Celebration, radiance, dignity, and auspicious blessings.' },
      { name: 'Festive Crimson / Scarlet', hex: '#B91C1C', meaning: 'Vitality, communal warmth, protection, and joyous celebration.' },
      { name: 'Sacred White / Ivory', hex: '#F8FAFC', meaning: 'Purity, moral clarity, peace, and spiritual renewal.' },
      { name: 'Regal Indigo / Sapphire', hex: '#1E3A8A', meaning: 'Wisdom, heritage continuity, and nocturnal peace.' }
    ],
    garments: [
      {
        id: `${holiday.id}-formal-attire`,
        name: `Ceremonial Festive Ensemble of ${country}`,
        nativeTerm: 'Festive Traditional Dress',
        ensembleType: 'unisex',
        categoryLabel: 'Ceremonial Dress',
        description: `Handcrafted traditional garments featuring native embroidery, ceremonial draping, and authentic textiles customary for sacred gatherings of ${cleanName}.`,
        fabrics: ['Natural Woven Cotton', 'Handloom Silk', 'Linen Blend'],
        colors: ['Festive Crimson', 'Ivory', 'Ceremonial Gold'],
        culturalSignificance: `Worn during major communal gatherings and rites to signify honor, respect for elders, and alignment with seasonal milestones.`,
        motifsOrPatterns: 'Geometric heritage emblems, native botanical borders, and ancestral crests.',
        placeholderVisualUrl: holiday.bannerUrl || 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: `Traditional ceremonial festive attire worn during ${cleanName}`,
        accentColor: '#D4AF37'
      },
      {
        id: `${holiday.id}-adornment`,
        name: `Symbolic Heritage Accessories & Jewelry`,
        nativeTerm: 'Traditional Adornments',
        ensembleType: 'accessory',
        categoryLabel: 'Symbolic Accessories',
        description: `Handcrafted metals, talismanic beads, ceremonial sashes, and footwear worn to complete the festive appearance during ${cleanName}.`,
        fabrics: ['Hammered Brass / Silver', 'Polished Stone', 'Embroidered Leather'],
        colors: ['Gold', 'Silver', 'Earth Tones'],
        culturalSignificance: `Each accessory signifies protection, personal dignity, and reverence for family lineage.`,
        motifsOrPatterns: 'Interlocking spirals, floral talismans, and traditional knotwork.',
        placeholderVisualUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
        placeholderAltText: `Handcrafted heritage jewelry and accessories for ${cleanName}`,
        accentColor: '#B91C1C'
      }
    ],
    adornmentsAndJewelry: [
      'Heirloom metalwork or ceremonial pendants passed through generations',
      'Fresh floral hairpieces or decorative head coverings customary for temple/civic grounds',
      'Handcrafted leather or fabric footwear suited for outdoor processions and dancing'
    ],
    visitorEtiquetteTips: {
      canVisitorsWear: `Yes, respectful appreciation and wearing culturally appropriate festive attire is warmly welcomed by local communities during ${cleanName}.`,
      dos: [
        'Dress with modesty and dignity, especially when visiting sacred temples, churches, or family shrines.',
        'Choose uplifting, celebratory colors appropriate to the occasion.',
        'Ask hosts politely about the cultural names and significance of specific garments.'
      ],
      donts: [
        'Avoid turning sacred ceremonial attire into mock costumes or party caricatures.',
        'Refrain from wearing mourning shades (stark black or somber white depending on culture) to joyous feasts.'
      ]
    },
    modernAdaptations: `Contemporary designers combine heritage silhouettes with breathable sustainable fabrics, creating versatile fusion looks for modern global celebrants.`
  };
}
