import { Holiday, SupportedLanguage } from '../types';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US/UK)', flag: '🌐', region: 'Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain & Latin America' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France & Francophonie' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文 (简体)', flag: '🇨🇳', region: 'China & Diaspora' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India & South Asia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇦🇪', region: 'Middle East & North Africa' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Germany, Austria, Switzerland' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Japan' }
];

export interface LocalizedHolidayPatch {
  name?: string;
  description?: string;
  traditions?: string[];
  greeting?: string;
  foodDelicacies?: string[];
  facts?: string[];
  tags?: string[];
}

export const HOLIDAY_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, LocalizedHolidayPatch>>> = {
  'diwali-festival-of-lights': {
    es: {
      name: 'Diwali (Festival de las Luces)',
      description: 'Diwali es el festival de las luces de cinco días celebrado por millones de hindúes, jainistas, sijs y budistas en todo el mundo. Simboliza la victoria espiritual de la luz sobre la oscuridad, el bien sobre el mal y el conocimiento sobre la ignorancia.',
      traditions: [
        'Encendido de lámparas de arcilla (diyas) y velas en balcones y entradas',
        'Arte elaborado en el suelo con polvos coloridos y pétalos (Rangoli)',
        'Fuegos artificiales ecológicos con las comunidades vecinales',
        'Intercambio de dulces artesanales (mithai) y obsequios con familiares'
      ],
      greeting: '¡Shubh Deepavali! (¡Feliz Diwali con luz y prosperidad!)',
      foodDelicacies: ['Kaju Katli', 'Gulab Jamun', 'Laddoo', 'Samosa festiva', 'Chakli crujiente'],
      facts: [
        'Coincide con la noche más oscura del mes lunisolar hindú de Kartika.',
        'Más de 1.200 millones de personas celebran Diwali anualmente en todo el mundo.'
      ],
      tags: ['Festival de las Luces', 'Asia del Sur', 'Patrimonio Espiritual', 'Victoria del Bien']
    },
    fr: {
      name: 'Diwali (Fête des Lumières)',
      description: 'Diwali est la fête des lumières de cinq jours célébrée par des millions d\'hindous, de jaïns, de sikhs et de bouddhistes à travers le monde. Elle symbolise la victoire spirituelle de la lumière sur les ténèbres et du bien sur le mal.',
      traditions: [
        'Illumination de rangées de lampes en terre cuite (diyas) et de bougies',
        'Fresques au sol en poudres colorées et pétales de fleurs (Rangoli)',
        'Partage de feux d\'artifice festifs en famille et entre voisins',
        'Échange de douceurs sucrées (mithai) et de cadeaux de prospérité'
      ],
      greeting: 'Joyeux Diwali ! (Shubh Deepavali !)',
      foodDelicacies: ['Kaju Katli', 'Gulab Jamun', 'Laddoo doré', 'Samosas parfumés'],
      facts: [
        'Diwali a lieu durant la nuit la plus sombre du mois luni-solaire de Kartika.',
        'Plus d\'un milliard d\'êtres humains célèbrent cette fête chaque année.'
      ],
      tags: ['Fête des Lumières', 'Asie du Sud', 'Victoire de la Lumière', 'Tradition Millénaire']
    },
    zh: {
      name: '排灯节 (光明节 / 屠妖节)',
      description: '排灯节是全球数亿印度教徒、耆那教徒、锡克教徒与部分佛教徒共同庆祝的为期五天的光明盛典。它象征着光明驱散黑暗、良善战胜邪恶、智慧战胜愚昧的精神胜利。',
      traditions: [
        '在门廊与庭院点亮数以万计的传统黏土油灯 (Diyas) 与蜡烛',
        '使用彩色矿物粉与鲜花花瓣精心铺设绚丽的地画 (Rangoli)',
        '与邻里亲友燃放环保节日烟花庆祝',
        '向长辈与挚友馈赠精致的传统印度甜点 (Mithai) 与黄金吉物'
      ],
      greeting: '排灯节快乐！(Shubh Deepavali ! 愿吉祥之光照亮前程)',
      foodDelicacies: ['腰果菱形糖 (Kaju Katli)', '玫瑰奶球 (Gulab Jamun)', '黄金拉杜球 (Laddoo)', '香脆咖喱角 (Samosa)'],
      facts: [
        '排灯节适逢印度阴阳历卡提卡月 (Kartika) 中最幽暗的新月之夜。',
        '全球每年有超过10亿人共同点亮光明，是人类历史上规模最宏大的节日之一。'
      ],
      tags: ['光明胜利', '南亚文化', '非遗民俗', '家庭团聚']
    },
    hi: {
      name: 'दीपावली (रोशनी का महापर्व)',
      description: 'दीपावली अंधकार पर प्रकाश, अज्ञान पर ज्ञान और बुराई पर अच्छाई की शाश्वत विजय का प्रतीक है। यह पांच दिवसीय महापर्व संपूर्ण भारत एवं विश्व भर के भारतीय समुदाय द्वारा असीम उल्लास के साथ मनाया जाता है।',
      traditions: [
        'घर-आंगन में मिट्टी के पवित्र दीपकों (दीयों) की कतारें प्रज्वलित करना',
        'रंगोली के सुंदर रंगों और ताजे पुष्पों से द्वार सजाना',
        'लक्ष्मी-गणेश जी का षोडशोपचार पूजन व सुख-समृद्धि की मंगलकामना',
        'पारस्परिक प्रेम के साथ काजू कतली, लड्डू और उपहारों का वितरण'
      ],
      greeting: 'शुभ दीपावली! आपके जीवन में सुख, शांति और समृद्धि का प्रकाश फैले।',
      foodDelicacies: ['काजू कतली', 'गुलाब जामुन', 'बेसन के लड्डू', 'मठरी व समोसा', 'चकली'],
      facts: [
        'कार्तिक मास की घनी अमावस्या की रात्रि में करोड़ों दीपकों की आभा अमावस्या को पूर्णिमा बना देती है।',
        'विश्व भर में एक अरब से अधिक लोग प्रतिवर्ष दीपावली का पावन उत्सव मनाते हैं।'
      ],
      tags: ['रोशनी का त्यौहार', 'सनातन परंपरा', 'लक्ष्मी पूजन', 'सद्भाव ও आनंद']
    },
    ar: {
      name: 'ديوالي (مهرجان الأضواء)',
      description: 'ديوالي هو مهرجان الأضواء الهندوسي العريق الممتد لخمسة أيام، يحتفل به الملايين حول العالم مجسداً انتصار النور على الظلمات والخير على الشر والحكمة على الجهل.',
      traditions: [
        'إشعال مصابيح الفخار التقليدية (الديا) والشموع على الشرفات',
        'رسم لوحات الرانغولي الفنية على الأرضيات بالبودرة الملونة والزهور',
        'إطلاق الألعاب النارية الاحتفالية وتبادل الهدايا والحلويات التراثية'
      ],
      greeting: 'ديوالي مبارك! (Shubh Deepavali)',
      foodDelicacies: ['كاجو كاتلي', 'غلاب جامون', 'حلويات اللادو'],
      facts: [
        'يتزامن ديوالي مع أظلم ليلة في التقويم القمري الهندي.',
        'يشارك فيه أكثر من مليار شخص سنوياً في شتى قارات العالم.'
      ]
    },
    de: {
      name: 'Diwali (Lichterfest)',
      description: 'Diwali ist das fünftägige Fest der Lichter, das von Millionen Menschen weltweit gefeiert wird. Es symbolisiert den spirituellen Sieg des Lichts über die Dunkelheit, des Guten über das Böse und des Wissens über die Unwissenheit.',
      traditions: [
        'Entzünden unzähliger traditioneller Tonlampen (Diyas) und Kerzen',
        'Kunstvolle bunte Bodenbilder aus Farbpulver und Blüten (Rangoli)',
        'Austausch von feinen Süßigkeiten (Mithai) und Segenswünschen in der Familie'
      ],
      greeting: 'Frohes Diwali! (Shubh Deepavali)',
      foodDelicacies: ['Kaju Katli', 'Gulab Jamun', 'Laddoo-Konfekt']
    },
    ja: {
      name: 'ディワリ (光の祭典)',
      description: 'ディワリは、世界中の何億人もの人々によって祝われる5日間の光の祭典です。闇に対する光の勝利、悪に対する善の勝利、無知に対する知識の勝利を象徴しています。',
      traditions: [
        '素焼きのランプ(ディーヤ)とキャンドルを街中に灯す',
        '色鮮やかな粉と花びらで描く吉祥の床絵(ランゴリ)',
        '伝統的なお菓子(ミタイ)を家族や友人と贈り合う'
      ],
      greeting: 'ハッピー・ディワリ！ (Shubh Deepavali)',
      foodDelicacies: ['カシューナッツのダイヤ菓子(カジュ・カトリ)', 'グラブ・ジャムン']
    }
  },

  'dia-de-los-muertos': {
    es: {
      name: 'Día de los Muertos',
      description: 'Una vibrante tradición mexicana declarada Patrimonio Cultural Inmaterial por la UNESCO, donde las familias dan la bienvenida con alegría y amor a las almas de sus seres queridos difuntos en una reunión llena de música, memorias y banquetes.',
      traditions: [
        'Construcción de ofrendas domésticas con fotografías, velas y flor de cempasúchil',
        'Maquillaje de catrinas y calaveras de azúcar coloridas',
        'Vigilias iluminadas y serenatas en los panteones comunitarios hasta el amanecer',
        'Escritura de calaveritas literarias satíricas y alegres'
      ],
      greeting: '¡Feliz Día de los Muertos! Que la memoria de nuestros seres amados viva por siempre.',
      foodDelicacies: ['Pan de Muerto azucarado', 'Calaveras de Azúcar', 'Mole Poblano', 'Atole de masa'],
      facts: [
        'Inscrito en la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO.',
        'El aroma de la flor de cempasúchil guía a los espíritus en su regreso a casa.'
      ]
    },
    fr: {
      name: 'Día de los Muertos (Fête des Morts)',
      description: 'Une somptueuse tradition mexicaine inscrite au patrimoine de l\'UNESCO où les familles accueillent joyeusement les âmes de leurs défunts pour des retrouvailles festives et chaleureuses, privilégiant le souvenir et l\'amour plutôt que le deuil.',
      traditions: [
        'Création d\'autels (ofrendas) ornés de soucis orangés (cempasúchil) et de bougies',
        'Maquillages inspirés de la célèbre Catrina et crânes en sucre',
        'Veillées festives avec musique mariachi dans les cimetières jusqu\'à l\'aube'
      ],
      greeting: 'Joyeux Jour des Morts ! (¡Feliz Día de los Muertos!)',
      foodDelicacies: ['Pain des Morts (Pan de Muerto)', 'Crânes en sucre', 'Mole Poblano épicé']
    },
    zh: {
      name: '亡灵节 (Día de los Muertos)',
      description: '墨西哥联合国教科文组织非物质文化遗产。在这个生机勃勃的节日中，人们通过搭建五彩祭坛、摆放万寿菊和亲人挚爱美食，欢欣热烈地迎接故去亲友的灵魂回归人间短暂团聚。',
      traditions: [
        '精心搭建层级家庭祭坛 (Ofrendas)，摆放亡者照片、蜡烛与万寿菊',
        '绘制华丽的卡特琳娜骷髅妆容并佩戴绚丽花冠',
        '彻夜在烛光摇曳的墓园中举行家庭野餐与墨西哥民谣音乐会',
        '吟诵讽刺风趣的亡灵小诗 (Calaveritas literarias)'
      ],
      greeting: '亡灵节安康！(记忆永恒，爱不消逝！)',
      foodDelicacies: ['亡灵面包 (Pan de Muerto)', '糖骷髅 (Calaveras de Azúcar)', '莫莱酱火鸡 (Mole Poblano)', '阿托莱玉米热饮 (Atole)'],
      facts: [
        '被联合国教科文组织正式列入人类非物质文化遗产代表作名录。',
        '金黄色的万寿菊 (Cempasúchil) 其芳香与亮丽色彩被视作指引亡魂归乡的明灯。'
      ]
    },
    hi: {
      name: 'दिया दे लॉस मुएर्तोस (मृतकों का पावन स्मृति पर्व)',
      description: 'मैक्सिको की यूनेस्को सांस्कृतिक धरोहर, जहां शोक के स्थान पर अपार स्नेह और उल्लास के साथ दिवंगत पूर्वजों की आत्माओं का स्वागत किया जाता है।',
      traditions: [
        'घरों में गेंदे के फूलों और मोमबत्तियों से पवित्र वेदियां (Ofrendas) बनाना',
        'कैटरीना खोपड़ी की सुंदर कलात्मक मुख-सज्जा करना',
        'कब्रिस्तानों में संगीत और पारंपरिक व्यंजनों के साथ जागरण'
      ],
      greeting: 'फेलिज दिया दे लॉस मुएर्तोस! पूर्वजों की स्मृतियां अमर रहें।',
      foodDelicacies: ['पान दे मुएर्तो (मीठी रोटी)', 'पारंपरिक मोले पोब्लानो']
    },
    ar: {
      name: 'يوم الموتى (المكسيك)',
      description: 'تقليد مكسيكي تراثي عالمي يحتفل بعودة أرواح الأحبة الراحلين في أجواء بهيجة من الموسيقى والزهور والأطعمة التقليدية تكريماً لذكراهم.',
      traditions: ['بناء المذابح المنزلية المزينة بزهور المخملية البرتقالية', 'تلوين الوجوه برسوم كاترين المبهجة'],
      greeting: '¡Feliz Día de los Muertos!'
    },
    de: {
      name: 'Tag der Toten (Día de los Muertos)',
      description: 'Eine lebensfrohe mexikanische Tradition (UNESCO-Weltkulturerbe), bei der die Seelen verstorbener Angehöriger mit Blumen, Musik und Festessen liebevoll willkommen geheißen werden.',
      traditions: ['Aufstellen bunter Hausaltäre (Ofrendas) mit Marigolds und Kerzen', 'Verkleidungen als La Catrina mit kunstvoller Schädelbemalung'],
      greeting: '¡Feliz Día de los Muertos!'
    },
    ja: {
      name: '死者の日 (メキシコ)',
      description: 'ユネスコ無形文化遺産。亡くなった家族や友人の魂を温かく迎え入れ、マリーゴールドの花と音楽、伝統料理で明るく祝うメキシコの伝統行事です。',
      traditions: ['祭壇(オフレンダ)にマリーゴールドの花と写真を飾る', 'カトリーナの美しい骸骨メイクでパレードに参加する'],
      greeting: 'フェリス・ディア・デ・ロス・ムエルトス！'
    }
  },

  'lunar-new-year-spring-festival': {
    es: {
      name: 'Año Nuevo Lunar (Festival de la Primavera)',
      description: 'La festividad tradicional más importante del calendario lunisolar celebrada por miles de millones en Asia Oriental y el mundo. Las familias se reúnen para banquetes, danzas del dragón y deseos de fortuna y salud.',
      traditions: [
        'Banquete de Nochevieja familiar con platos de longevidad y prosperidad',
        'Entrega de sobres rojos con dinero de la suerte (Hongbao / Lai See)',
        'Danzas del dragón y del león con tambores ceremoniales',
        'Colocación de coplas rojas (Chunlian) en puertas'
      ],
      greeting: '¡Gong Xi Fa Cai! / ¡Feliz Año Nuevo Lunar!',
      foodDelicacies: ['Jiaozi (Dumplings de la fortuna)', 'Nian Gao (Pastel de arroz)', 'Pescado entero al vapor', 'Rollitos de primavera']
    },
    fr: {
      name: 'Nouvel An Lunaire (Fête du Printemps)',
      description: 'La plus grande célébration traditionnelle marquant le renouveau du calendrier lunaire. Réunions familiales grandioses, danses du lion, enveloppes rouges et vœux de prospérité et de longévité.',
      traditions: [
        'Grand banquet de réveillon réunissant toutes les générations',
        'Distribution d\'enveloppes rouges porte-bonheur (Hongbao)',
        'Spectaculaires danses du dragon et pétards chassant les mauvais esprits'
      ],
      greeting: 'Gong Xi Fa Cai ! Excellente Année Lunaire !',
      foodDelicacies: ['Raviolis Jiaozi', 'Gâteau de riz gluant Nian Gao', 'Nouilles de longévité']
    },
    zh: {
      name: '农历新年 (新春佳节 / 春节)',
      description: '中华民族及东亚、东南亚地区最隆重、最具温情的传统佳节。千家万户跨越千山万水归家团圆，辞旧迎新，祈求五谷丰登、吉祥康泰。',
      traditions: [
        '除夕守岁除夕夜全家团聚享用热气腾腾的年夜饭',
        '长辈为晚辈派发压岁钱红包 (红封包)，寓意辟邪保平安',
        '锣鼓喧天舞龙舞狮，燃放迎春爆竹驱逐年兽',
        '户户精选大红春联、倒贴福字、悬挂金玉满堂红灯笼'
      ],
      greeting: '恭喜发财，万事如意！岁岁平安，新春大吉！',
      foodDelicacies: ['金元宝水饺 (Jiaozi)', '长寿面', '步步高升年糕 (Nian Gao)', '年年有余清蒸鲈鱼', '团圆汤圆'],
      facts: [
        '春运期间引发每年全球最大规模的人类周期性迁徙，客流数以十亿计。',
        '红色服饰与装饰寓意福星高照，并驱赶传说中的怪兽“年”。'
      ]
    },
    hi: {
      name: 'चंद्र नव वर्ष (चीनी वसंत महोत्सव)',
      description: 'पूर्वी एशिया का सबसे बड़ा पारंपरिक उत्सव। करोड़ों परिवार पुनर्मिलन रात्रिभोज, ड्रैगन नृत्य और सुख-समृद्धि की मंगलकामनाओं के साथ नव वर्ष का स्वागत करते हैं।',
      traditions: [
        'पारिवारिक पुनर्मिलन का भव्य रात्रिभोज',
        'बच्चों को सौभाग्य के लाल लिफाफे (Hongbao) देना',
        'पारंपरिक ड्रैगन और शेर नृत्य की प्रस्तुति'
      ],
      greeting: 'गोंग शी फा चाई! नया साल मुबारक!',
      foodDelicacies: ['पारंपरिक डंपलिंग्स', 'चावल का केक (Nian Gao)']
    },
    ar: {
      name: 'رأس السنة القمرية (عيد الربيع)',
      description: 'أكبر عيد تقليدي في شرق وجنوب شرق آسيا، يحتفل به بلم شمل العائلات وتناول وجبات البركة وتبادل المظاريف الحمراء المحملة بالأمنيات.',
      traditions: ['وليمة لم الشمل العائلية الكبرى', 'توزيع المظاريف الحمراء (Hongbao)', 'رقصات التنين والأسد الاحتفالية'],
      greeting: 'Gong Xi Fa Cai! عام قمري سعيد ومزدهر'
    },
    de: {
      name: 'Mondneujahr (Frühlingsfest)',
      description: 'Das bedeutendste traditionelle Fest Ostasiens. Familien kommen aus aller Welt zusammen für Festmahle, Drachentänze und Segenswünsche für Glück und Gesundheit.',
      traditions: ['Großes Neujahrs-Festmahl mit der Familie', 'Verteilung roter Glücksumschläge (Hongbao) an Kinder'],
      greeting: 'Gong Xi Fa Cai! Ein glückliches und wohlhabendes neues Jahr!'
    },
    ja: {
      name: '旧正月 (春節)',
      description: '東アジア全域で最も盛大に祝われる伝統的な新春の祝祭。家族全員が集まる大晦日の年越し料理、龍踊り、幸運を呼ぶ赤いお年玉袋で新年の福を迎えます。',
      traditions: ['大晦日の家族団欒のごちそう(年夜飯)', '赤いお年玉袋(紅包)の授与', '獅子舞や爆竹による厄除け'],
      greeting: '恭喜発財！(新年快楽！素晴らしい一年になりますように)'
    }
  },

  'eid-al-fitr': {
    es: {
      name: 'Eid al-Fitr (Fiesta de la Ruptura del Ayuno)',
      description: 'Una de las celebraciones islámicas más sagradas que marca el final del bendito mes de Ramadán. Un momento de gratitud espiritual, reconciliación comunitaria, caridad (Zakat al-Fitr) y festines familiares.',
      traditions: [
        'Oración comunitaria matutina del Eid (Salat al-Eid) al amanecer',
        'Donación obligatoria a los necesitados (Zakat al-Fitr) antes de la oración',
        'Visitas familiares luciendo vestimentas nuevas y fragancias tradicionales',
        'Obsequios de dinero y dulces para los niños (Eidiya)'
      ],
      greeting: '¡Eid Mubarak! Que la paz y las bendiciones llenen tu hogar.',
      foodDelicacies: ['Sheer Khurma', 'Ma\'amoul de dátiles', 'Biryani aromático', 'Baklava con pistachos']
    },
    fr: {
      name: 'Aïd al-Fitr (Fête de la Rupture du Jeûne)',
      description: 'Célébration majeure du calendrier islamique concluant le mois sacré du Ramadan. Période de piété, d\'aumône, de pardon et de rassemblements familiaux chaleureux autour de pâtisseries traditionnelles.',
      traditions: [
        'Prière solennelle de l\'Aïd en plein air ou à la mosquée à l\'aube',
        'Versement de l\'aumône de bienfaisance Zakat al-Fitr',
        'Partage de pâtisseries raffinées et cadeaux aux enfants (Eidi)'
      ],
      greeting: 'Aïd Moubarak ! (Aïdkoum Mabrouk !)',
      foodDelicacies: ['Cornes de gazelle', 'Maamoul aux dattes', 'Sheer Khurma', 'Baklawa dorée']
    },
    zh: {
      name: '开斋节 (肉孜节 / 尔德节)',
      description: '全球十数亿穆斯林信众庆祝的崇高节日，标志着斋月 (Ramadan) 的圆满礼成。这是一段充满感恩、慈善施舍、家庭团圆与宽恕友爱的温馨时光。',
      traditions: [
        '破晓时分沐浴更衣，前往清真寺或公共广场参加开斋节会礼 (Salat al-Eid)',
        '向贫困群体奉献天课善款 (Zakat al-Fitr)，确保人人共享节日喜悦',
        '晚辈向长辈请安，长辈向儿童赠送崭新纸币压岁钱或礼品 (Eidi)',
        '准备丰盛香醇的特色手抓饭与甜点招待四方宾客'
      ],
      greeting: '开斋节吉庆！(Eid Mubarak ! 愿平安与吉祥常伴您的家庭)',
      foodDelicacies: ['牛奶坚果甜面羹 (Sheer Khurma)', '椰枣酥饼 (Ma\'amoul)', '香料羊肉手抓饭 (Biryani)', '千层蜜酥 (Baklava)']
    },
    hi: {
      name: 'ईद-उल-फ़ित्र (मीठी ईद)',
      description: 'रमज़ान के पवित्र महीने के समापन पर मनाया जाने वाला सौहार्द और कृतज्ञता का पावन त्यौहार। नमाज़, दान (ज़कात) और शीर खुरमा के साथ खुशियां बांटी जाती हैं।',
      traditions: [
        'ईदगाह में सुबह की सामूहिक नमाज़ अदा करना',
        'ज़रूरतमंदों को फित्रा (दान) वितरित करना',
        'गले मिलकर ईद की मुबारकबाद देना और बच्चों को ईदी देना'
      ],
      greeting: 'ईद मुबारक! आप और आपके परिवार को शांति व खुशियां मिले।',
      foodDelicacies: ['शाही शीर खुरमा', 'लज़ीज़ बिरयानी', 'केसरिया सेवइयां']
    },
    ar: {
      name: 'عيد الفطر المبارك',
      description: 'الجائزة الإيمانية الكبرى وفرحة الصائمين بتمام شهر رمضان المبارك. موسم للتسامح، التكافل الاجتماعي، صلة الأرحام، وتقديم زكاة الفطر للفقراء.',
      traditions: [
        'أداء صلاة العيد في الساحات والمساجد الجامعة مع تكبيرات العيد العذبة',
        'إخراج زكاة الفطر قبل الصلاة لإغناء المساكين عن السؤال',
        'تبادل الزيارات العائلية وتوزيع العيديات والهدايا على الأطفال'
      ],
      greeting: 'عيدكم مبارك وكل عام وأنتم بألف خير وتقبل الله طاعاتكم.',
      foodDelicacies: ['معمول بالتمر والمكسرات', 'شير خورما الحليبي', 'كعك العيد المنقوش', 'البرياني']
    },
    de: {
      name: 'Eid al-Fitr (Zuckerfest)',
      description: 'Eines der heiligsten Feste des Islam zum Ende des Fastenmonats Ramadan. Ein Fest des Dankes, der Wohltätigkeit und des familiären Miteinanders.',
      traditions: ['Gemeinsames Festgebet am Morgen', 'Geben der Almosensteuer (Zakat al-Fitr)', 'Besuche bei Verwandten und Geschenke an Kinder'],
      greeting: 'Eid Mubarak! Gesegnetes Fest!'
    },
    ja: {
      name: 'イード・アル＝フィトル (断食明けの祝祭)',
      description: '聖なるラマダン月の終了を祝うイスラム圏最大の祭礼の一つ。感謝の祈り、慈善の施し、家族や友人との祝宴を通じて互いの絆を深めます。',
      traditions: ['早朝の特別な合同礼拝(サラート・アル＝イード)', '困窮者への慈善の施し(ザカート)', '子どもたちへのお年玉やお菓子の配布'],
      greeting: 'イード・ムバラク！(祝福された祭りを！)'
    }
  },

  'oktoberfest': {
    es: {
      name: 'Oktoberfest de Múnich',
      description: 'El festival folclórico y de la cerveza más emblemático del mundo, celebrado anualmente en Múnich, Baviera. Reúne música tradicional con instrumentos de viento, trajes bávaros y banquetes.',
      traditions: ['Apertura del primer barril con el grito tradicional "O\'zapft is!"', 'Uso de trajes típicos bávaros (Lederhosen y Dirndl)', 'Música de bandas de viento en las carpas históricas'],
      greeting: '¡Prost! (¡Salud y alegría bávara!)'
    },
    fr: {
      name: 'Oktoberfest de Munich',
      description: 'La plus grande fête populaire de la bière et de la culture bavaroise au monde. Chants traditionnels, costumes d\'époque, bretzels géants et convivialité légendaire.',
      traditions: ['Percement du premier fût au cri de "O\'zapft is!"', 'Défilés en costumes traditionnels Dirndl et Lederhosen'],
      greeting: 'Prost ! Santé et convivialité !'
    },
    zh: {
      name: '慕尼黑啤酒节 (十月节 / Oktoberfest)',
      description: '全球规模最大的德国巴伐利亚传统民俗盛会。每年秋季在慕尼黑特蕾西娅草坪举行，伴随铜管乐演奏、巴伐利亚传统服饰与大麦啤酒狂欢。',
      traditions: ['慕尼黑市长敲开首桶啤酒并高呼“开桶啦！” (O\'zapft is!)', '身着巴伐利亚传统皮裤 (Lederhosen) 与阿尔卑斯围裙长裙 (Dirndl)', '巨型啤酒帐篷内合唱民谣祝酒'],
      greeting: '干杯！(Prost ! 祝友谊与欢乐长存)'
    },
    hi: {
      name: 'म्यूनिख ओकट्रॉबरफेस्ट',
      description: 'विश्व का सबसे बड़ा लोक एवं बीयर महोत्सव, जो बवेरियन संस्कृति, पारंपरिक परिधानों और संगीत का अद्भुत संगम है।',
      greeting: 'प्रोस्ट! (Prost! स्वास्थ्य और मित्रता की शुभकामनाएं)'
    },
    ar: {
      name: 'مهرجان أوكتوبرفست ميونخ',
      description: 'أكبر مهرجان شعبي تراثي بافاري في العالم، يشتهر بالموسيقى الفلكلورية والملابس التقليدية.',
      greeting: 'Prost! نخب الصداقة والمرح'
    },
    de: {
      name: 'Münchner Oktoberfest (Die Wiesn)',
      description: 'Das größte Volksfest der Welt auf der Münchner Theresienwiese mit bayerischer Tradition, Blasmusik, Dirndl, Lederhosen und Festzelten.',
      traditions: ['Anstich des ersten Fasses durch den Münchner Oberbürgermeister mit dem Ruf "O\'zapft is!"', 'Trachtenumzug'],
      greeting: 'Ein Prosit der Gemütlichkeit! O\'zapft is!'
    },
    ja: {
      name: 'オクトーバーフェスト (ミュンヘン)',
      description: '世界最大のドイツ・バイエルン地方の民俗祭。ブラスバンドの陽気な演奏と伝統衣装、巨大なフェストツェルトで乾杯が繰り返されます。',
      greeting: 'プロースト！ (Prost! 乾杯！)'
    }
  },

  'rio-carnival': {
    es: {
      name: 'Carnaval de Río de Janeiro',
      description: 'La máxima explosión de samba, ritmo y color del planeta. Las mejores escuelas de samba desfilan en el Sambódromo Marquês de Sapucaí en una fiesta de creatividad y resistencia cultural.',
      traditions: ['Desfile monumental de carrozas y pasistas en el Sambódromo', 'Fiestas callejeras multitudinarias (Blocos de Rua)', 'Coronación del Rey Momo'],
      greeting: '¡Viva o Carnaval do Rio!'
    },
    fr: {
      name: 'Carnaval de Rio',
      description: 'Le spectacle festif le plus éblouissant de la Terre. Rythmes endiablés de samba, chars allégoriques géants et défilés au Sambodrome sous les vivats de milliers de spectateurs.',
      greeting: 'Viva o Carnaval !'
    },
    zh: {
      name: '里约热内卢狂欢节',
      description: '地球上最震撼人心的桑巴盛典与色彩狂欢。顶级桑巴舞学校在桑巴大道竞演，伴随数以百计的街头狂欢派对 (Blocos)，尽释拉美热情。',
      greeting: '狂欢节万岁！(Viva o Carnaval !)'
    },
    hi: {
      name: 'रियो कार्निवल (ब्राज़ील)',
      description: 'विश्व का सबसे प्रसिद्ध और रंगारंग कार्निवल, जिसमें साम्बा नृत्य, विशाल झांकियां और जीवंत संगीत की धूम होती है।',
      greeting: 'कार्निवल की शुभकामनाएं!'
    },
    ar: {
      name: 'كرنفال ريو دي جانيرو',
      description: 'أضخم احتفال للسامبا والرقص والألوان في العالم يجذب الملايين إلى شوارع البرازيل النابضة بالحياة.',
      greeting: 'Viva o Carnaval!'
    },
    de: {
      name: 'Karneval in Rio',
      description: 'Das größte und spektakulärste Karnevalsfest der Welt im Sambódromo von Rio de Janeiro mit mitreißenden Sambarhythmen und Prunkwagen.',
      greeting: 'Viva o Carnaval!'
    },
    ja: {
      name: 'リオのカーニバル (ブラジル)',
      description: '世界最大のサンバの祭典。サンボドロモでの壮大なフロートとサンバチームの圧巻のパレードが街中を熱狂に包み込みます。',
      greeting: 'ヴィヴァ・オ・カルナヴァル！'
    }
  },

  'songkran-water-festival': {
    es: {
      name: 'Festival del Agua Songkran (Año Nuevo Tailandés)',
      description: 'El tradicional Año Nuevo tailandés, famoso por su gigantesca batalla de agua que simboliza la purificación, el lavado de la mala suerte y el respeto a los mayores.',
      traditions: ['Limpieza ceremonial de imágenes de Buda con agua perfumada (Song Nam Phra)', 'Vertido de agua con respeto en las manos de los ancianos (Rod Nam Dum Hua)', 'Festiva batalla de agua callejera en todo el país'],
      greeting: '¡Sawasdee Pee Mai! (¡Feliz Año Nuevo Tailandés!)'
    },
    fr: {
      name: 'Festival de l\'Eau Songkran',
      description: 'Le Nouvel An traditionnel thaïlandais célébré par des aspersions d\'eau symbolisant la purification, le renouveau et la bénédiction pour l\'année à venir.',
      greeting: 'Sawasdee Pee Mai !'
    },
    zh: {
      name: '宋干泼水节 (泰国传统新年)',
      description: '泰国传统新年庆典，被列入联合国教科文组织非物质文化遗产。人们通过相互泼洒纯净之水，洗涤过去一年的晦气与烦扰，祈求新岁吉祥如意。',
      traditions: ['用芳香净水浴佛仪式 (Song Nam Phra)', '虔诚向长辈手心浇水求祈福寿 (Rod Nam Dum Hua)', '全城欢乐泼水洗尘狂欢'],
      greeting: '宋干节安康！(Sawasdee Pee Mai ! 愿清凉净水带来满满福运)'
    },
    hi: {
      name: 'सोंगक्रान जल महोत्सव (थाई नव वर्ष)',
      description: 'थाईलैंड का पारंपरिक नव वर्ष, जिसमें पवित्र जल छिड़ककर बुराइयों को धोने और सुख-समृद्धि की कामना की जाती है।',
      greeting: 'सवास्दी पी माई! (Sawasdee Pee Mai!)'
    },
    ar: {
      name: 'مهرجان سونغكران المائي',
      description: 'رأس السنة التايلاندية التقليدية، ويتميز برش المياه العطرة طلباً للتطهير والتجدد واستقبال العام بالبركة.',
      greeting: 'Sawasdee Pee Mai!'
    },
    de: {
      name: 'Songkran Wasserfest (Thailändisches Neujahr)',
      description: 'Das traditionelle thailändische Neujahrsfest, bei dem Wasser als Symbol der Reinigung und des Neuanfangs versprüht wird.',
      greeting: 'Sawasdee Pee Mai!'
    },
    ja: {
      name: 'ソンクラーン (タイ正月水掛け祭り)',
      description: 'タイの伝統的な新年行事(ユネスコ無形文化遺産)。水を掛け合って旧年の厄を洗い流し、清らかな心で新年を迎えます。',
      greeting: 'サワディー・ピー・マイ！ (タイの新年おめでとうございます)'
    }
  },

  'st-patricks-day': {
    es: {
      name: 'Día de San Patricio',
      description: 'El día nacional de Irlanda y una fiesta cultural global. Se celebra con vestimentas de color verde, desfiles multitudinarios, música celta tradicional y tréboles de la suerte.',
      greeting: '¡Lá Fhéile Pádraig sona duit! (¡Feliz Día de San Patricio!)'
    },
    fr: {
      name: 'Fête de la Saint-Patrick',
      description: 'La fête nationale irlandaise devenue planétaire. Vagues de vert, musiques celtiques enjouées, danses traditionnelles et défilés hauts en couleur.',
      greeting: 'Joyeuse Saint-Patrick ! (Lá Fhéile Pádraig sona duit !)'
    },
    zh: {
      name: '圣帕特里克节 (爱尔兰国庆日)',
      description: '爱尔兰守护圣人纪念日与举世闻名的绿色文化盛宴。人们身着翠绿服饰，佩戴三叶草徽章，举行盛大游行，畅饮爱尔兰健力士黑啤。',
      greeting: '圣帕特里克节快乐！(Lá Fhéile Pádraig sona duit !)'
    },
    hi: {
      name: 'सेंट पैट्रिक दिवस (आयरलैंड)',
      description: 'आयरलैंड का राष्ट्रीय पर्व, जिसे दुनिया भर में हरे रंग के परिधानों, सेल्टिक संगीत और परेड के साथ मनाया जाता है।',
      greeting: 'सेंट पैट्रिक डे की शुभकामनाएं!'
    },
    ar: {
      name: 'يوم القديس باتريك',
      description: 'اليوم الوطني لإيرلندا ومهرجان ثقافي عالمي يكتسي فيه العالم باللون الأخضر ونبات النفل المحظوظ.',
      greeting: 'Lá Fhéile Pádraig sona duit!'
    },
    de: {
      name: 'St. Patrick\'s Day',
      description: 'Der irische Nationalfeiertag wird weltweit mit grüner Kleidung, traditioneller Folkmusik und Paraden gefeiert.',
      greeting: 'Happy St. Patrick\'s Day!'
    },
    ja: {
      name: 'セント・パトリックス・デイ (アイルランド)',
      description: 'アイルランドのナショナルデー。緑色の服を身につけ、シャムロック(クローバー)を掲げて音楽とパレードで街中を染め上げます。',
      greeting: 'ハッピー・セント・パトリックス・デイ！'
    }
  },

  'mid-autumn-festival': {
    es: {
      name: 'Festival del Medio Otoño (Fiesta de la Luna)',
      description: 'Festividad tradicional oriental de reunión familiar bajo la luna llena de otoño. Se celebra compartiendo pasteles de luna decorados (moon cakes), encendiendo farolillos y agradeciendo la cosecha.',
      greeting: '¡Feliz Festival del Medio Otoño! Que la luna llena bendiga a tu familia.'
    },
    fr: {
      name: 'Fête de la Mi-Automne (Fête de la Lune)',
      description: 'Fête traditionnelle d\'Asie de l\'Est célébrant la pleine lune automnale, la réunion familiale et la dégustation de gâteaux de lune aux motifs poétiques.',
      greeting: 'Joyeuse Fête de la Lune !'
    },
    zh: {
      name: '中秋节 (月夕 / 团圆节)',
      description: '中华传统四大节日之一。时值三秋之半，皓月当空。普天下中华儿女祭月赏月、品尝团圆月饼，寄托对故乡与亲人的深切思念。',
      greeting: '但愿人长久，千里共婵娟！祝中秋阖家团圆美满！',
      foodDelicacies: ['广式蛋黄莲蓉月饼', '苏式鲜肉酥皮月饼', '桂花酒', '大闸蟹']
    },
    hi: {
      name: 'मध्य-शरद उत्सव (चंद्रमा पर्व)',
      description: 'शरद ऋतु की पूर्णिमा के अवसर पर मनाया जाने वाला पारिवारिक पुनर्मिलन और मूनकेक बांटने का पारंपरिक उत्सव।',
      greeting: 'मध्य-शरद महोत्सव की हार्दिक शुभकामनाएं!'
    },
    ar: {
      name: 'مهرجان منتصف الخريف',
      description: 'عيد تقليدي بشرق آسيا يحتفي بالبدر المكتمل ولم شمل العائلات وتناول كعك القمر الشهي.',
      greeting: 'عيد قمر سعيد ومبارك!'
    },
    de: {
      name: 'Mittherbstfest (Mondfest)',
      description: 'Traditionelles asiatisches Fest im Herbst zur Feier des Vollmonds mit kunstvollen Mondkuchen und bunten Laternen.',
      greeting: 'Frohes Mittherbstfest!'
    },
    ja: {
      name: '中秋の名月 (十五夜・月見祭り)',
      description: '秋の澄んだ空に浮かぶ満月を愛で、豊かな収穫に感謝しながら月見団子やすすきを供える風雅な伝統行事です。',
      greeting: '素晴らしいお月見を！(中秋の名月おめでとうございます)'
    }
  },

  'hanukkah-festival-of-lights': {
    es: {
      name: 'Janucá (Fiesta de las Luces)',
      description: 'La celebración judía de ocho noches que conmemora el milagro de la menorá en el Templo Sagrado. Se celebra encendiendo la januquiá, jugando con el dreidel y comiendo alimentos fritos como latkes y sufganiyot.',
      greeting: '¡Chag Urim Sameach! (¡Feliz Fiesta de las Luces!)'
    },
    fr: {
      name: 'Hanoucca (Fête des Lumières)',
      description: 'Fête juive de huit jours commémorant le miracle de la fiole d\'huile dans le Temple de Jérusalem. Allumage progressif de la ménorah et partage de beignets chauds.',
      greeting: 'Hanoucca Sameah !'
    },
    zh: {
      name: '哈努卡节 (犹太光明节)',
      description: '犹太民族为期八天的光明节，纪念古耶路撒冷圣殿红油灯八日不熄之奇迹。每晚依次点亮烛台灯支，品尝金黄马铃薯饼 (Latkes) 与果酱甜甜圈。',
      greeting: '光明节吉祥！(Chag Urim Sameach ! 愿圣烛之光驱散所有黑暗)'
    },
    hi: {
      name: 'हनुक्का (यहूदी प्रकाश पर्व)',
      description: 'आठ दिनों तक चलने वाला यहूदी रोशनी का त्यौहार, जो मंदिर में तेल के चमत्कार और धर्मनिष्ठा की विजय का प्रतीक है।',
      greeting: 'हनुक्का समीच! (Chag Urim Sameach!)'
    },
    ar: {
      name: 'عيد الحانوكا (الأنوار)',
      description: 'عيد يهودي يدوم ثمانية أيام لإحياء ذكرى معجزة قارورة الزيت في الهيكل بإشعال الشموع وتناول أطعمة الزيت.',
      greeting: 'Chag Urim Sameach!'
    },
    de: {
      name: 'Chanukka (Jüdisches Lichterfest)',
      description: 'Acht Tage währendes jüdisches Fest zum Gedenken an das biblische Ölwunder mit Entzünden des neunarmigen Leuchters.',
      greeting: 'Chag Chanukka Sameach!'
    },
    ja: {
      name: 'ハヌカー (光の祭り)',
      description: '神殿の燭台の奇跡を記念する8日間のユダヤ教の伝統祝祭。毎晩ハヌッキーヤーのろうそくを1本ずつ灯し、オイルで揚げたラトケスを食します。',
      greeting: 'ハヌカー・サメアハ！'
    }
  },

  'international-womens-day': {
    es: {
      name: 'Día Internacional de la Mujer',
      description: 'Día mundial de conmemoración oficial de las Naciones Unidas en honor a los logros sociales, económicos, culturales y políticos de las mujeres en todo el mundo.',
      greeting: '¡Feliz Día Internacional de la Mujer por la igualdad y el progreso!'
    },
    fr: {
      name: 'Journée Internationale des Droits des Femmes',
      description: 'Journée mondiale reconnue par l\'ONU célébrant les luttes, les réussites et l\'égalité de droits pour toutes les femmes du monde entier.',
      greeting: 'Excellente Journée Internationale des Femmes !'
    },
    zh: {
      name: '国际劳动妇女节 (三八妇女节)',
      description: '联合国官方确立的全球纪念日。致敬全球女性在经济、政治、文化与社会领域的卓越贡献，倡导平等、尊严与包容。',
      greeting: '三八国际妇女节快乐！致敬每一位了不起的女性！'
    },
    hi: {
      name: 'अंतर्राष्ट्रीय महिला दिवस',
      description: 'महिलाओं के सामाजिक, आर्थिक और सांस्कृतिक अधिकारों व उपलब्धियों को समर्पित वैश्विक दिवस।',
      greeting: 'अंतर्राष्ट्रीय महिला दिवस की हार्दिक शुभकामनाएं!'
    },
    ar: {
      name: 'اليوم الدولي للمرأة',
      description: 'يوم عالمي أقرته الأمم المتحدة تقديراً لإنجازات المرأة في كل المجالات ودعوة للمساواة والعدالة.',
      greeting: 'كل عام ونساء العالم في ريادة وسلام!'
    },
    de: {
      name: 'Internationaler Frauentag',
      description: 'Weltweiter Tag der Vereinten Nationen für Frauenrechte, Gleichberechtigung und Würdigung der Errungenschaften von Frauen.',
      greeting: 'Alles Gute zum Internationalen Frauentag!'
    },
    ja: {
      name: '国際女性デー (3月8日)',
      description: '国連が定めた国際デー。女性の社会的・政治的・文化的な功績を称え、ジェンダー平等とエンパワーメントを世界規模で推進します。',
      greeting: '国際女性デーおめでとうございます！'
    }
  },

  'world-environment-day': {
    es: {
      name: 'Día Mundial del Medio Ambiente',
      description: 'La mayor plataforma mundial de concienciación ambiental promovida por la ONU, movilizando a millones para proteger la biodiversidad y frenar el cambio climático.',
      greeting: '¡Cuidemos nuestra Tierra! Feliz Día Mundial del Medio Ambiente.'
    },
    fr: {
      name: 'Journée Mondiale de l\'Environnement',
      description: 'Le principal événement de sensibilisation écologique de l\'ONU mobilisant citoyens et gouvernements pour la protection de la planète Terre.',
      greeting: 'Bonne Journée Mondiale de l\'Environnement !'
    },
    zh: {
      name: '世界环境日 (联合国官方倡导)',
      description: '联合国环境规划署主导的全球最大环保行动日。呼吁人类爱护自然生灵、守护绿水青山、携手应对全球气候危机。',
      greeting: '世界环境日快乐！践行绿色低碳，守护唯一家园！'
    },
    hi: {
      name: 'विश्व पर्यावरण दिवस',
      description: 'पृथ्वी के पर्यावरण संरक्षण और जैव विविधता की रक्षा के लिए संयुक्त राष्ट्र द्वारा समर्पित सबसे बड़ा वैश्विक मंच।',
      greeting: 'विश्व पर्यावरण दिवस की शुभकामनाएं! प्रकृति की रक्षा करें।'
    },
    ar: {
      name: 'اليوم العالمي للبيئة',
      description: 'أكبر مبادرة بيئية تقودها الأمم المتحدة لدعم التنوع الحيوي ومكافحة التلوث وتغير المناخ.',
      greeting: 'فلنحافظ جميعاً على كوكبنا الأخضر!'
    },
    de: {
      name: 'Weltumwelttag',
      description: 'Der globale Aktionstag des UN-Umweltprogramms zur Bewusstseinsbildung für Naturschutz und Nachhaltigkeit.',
      greeting: 'Schützen wir unsere Erde! Schönen Weltumwelttag.'
    },
    ja: {
      name: '世界環境デー (国連環境計画)',
      description: '国連が定めた世界最大の環境啓発の日。地球環境保全、生物多様性の保護、持続可能な社会の実現に向けて世界中が行動します。',
      greeting: '世界環境デー！かけがえのない地球を未来につなごう。'
    }
  },

  'matariki-maori-new-year': {
    es: {
      name: 'Matariki (Año Nuevo Maorí de Nueva Zelanda)',
      description: 'El sagrado Año Nuevo indígena de Aotearoa (Nueva Zelanda), marcado por la reaparición del cúmulo de estrellas de las Pléyades. Época de recordar a los antepasados, celebrar el presente y planear el futuro.',
      greeting: 'Mānawatia a Matariki! (¡Feliz Año Nuevo Matariki!)'
    },
    zh: {
      name: '毛利新年 (Matariki / 昴宿星团节)',
      description: '新西兰原住民毛利人的传统岁首。当夜空中重新升起昴宿星团时，象征旧年终结新岁开启，人们祭奠先祖、分享丰收并互致祝福。',
      greeting: 'Mānawatia a Matariki ! (毛利新年吉庆！愿群星庇佑来年丰顺)'
    },
    hi: {
      name: 'मातारीकी (माओरी नव वर्ष - न्यूज़ीलैंड)',
      description: 'न्यूज़ीलैंड का पारंपरिक माओरी नव वर्ष, जो प्लीएड्स तारा समूह के आकाश में उदय होने पर मनाया जाता है।',
      greeting: 'मातारीकी की शुभकामनाएं!'
    },
    de: {
      name: 'Matariki (Māori Neujahr)',
      description: 'Das indigene Neujahrsfest in Neuseeland zum Aufgang des Sternhaufens der Plejaden.',
      greeting: 'Mānawatia a Matariki!'
    },
    ja: {
      name: 'マタリキ (マオリの新年)',
      description: 'ニュージーランドの先住民族マオリの伝統的な新年。プレアデス星団が冬の夜空に再び姿を現す時、祖先を偲び新年の豊穣を祈ります。',
      greeting: 'マナワティア・ア・マタリキ！'
    }
  },

  'juneteenth-freedom-day': {
    es: {
      name: 'Juneteenth (Día Nacional de la Independencia)',
      description: 'El día federal estadounidense que conmemora la emancipación final de los afroamericanos esclavizados en 1865 en Galveston, Texas. Celebrado con desfiles, lecturas y barbacoas.',
      greeting: '¡Feliz Juneteenth! Celebrando la libertad y la dignidad humana.'
    },
    fr: {
      name: 'Juneteenth (Jour de l\'Émancipation)',
      description: 'Fête fédérale américaine commémorant la proclamation de la libération des derniers esclaves à Galveston en 1865. Célébration de la liberté et de la résilience.',
      greeting: 'Joyeux Juneteenth !'
    },
    zh: {
      name: '六月节 (美国国家独立日 / 奴隶解放日)',
      description: '美国联邦法定假日，纪念1865年得克萨斯州加尔维斯顿获悉黑奴全员解放的历史时刻。全美举行游行、讲座和家庭盛宴，颂扬人权平等与自由。',
      greeting: '六月节快乐！(致敬自由、平等与尊严)'
    },
    hi: {
      name: 'जूनटीन्थ (मुक्ति दिवस)',
      description: 'अमेरिकी इतिहास में दासता के अंत और सभी मानवों की स्वतंत्रता और गरिमा का उत्सव।',
      greeting: 'जूनटीन्थ स्वतंत्रता दिवस की बधाई!'
    },
    ar: {
      name: 'جونتينث (يوم التحرر الوطني)',
      description: 'عيد فيدرالي أمريكي يخلد ذكرى إنهاء العبودية وتحرير المستعبدين عام 1865 احتفاءً بالحرية والكرامة الإنسانية.',
      greeting: 'Happy Juneteenth!'
    },
    de: {
      name: 'Juneteenth (Tag der Befreiung)',
      description: 'Gedenktag zur Abschaffung der Sklaverei in den USA mit Paraden, Musik und Picknicks im Zeichen der Freiheit.',
      greeting: 'Happy Juneteenth!'
    },
    ja: {
      name: 'ジューンティーンス (奴隷解放記念日)',
      description: '1865年にアメリカで奴隷解放が宣言された歴史を記念する連邦の祝日。自由と人権の平等を祝い、パレードやフェスティバルが開催されます。',
      greeting: 'ハッピー・ジューンティーンス！'
    }
  }
};

/**
 * Returns a cloned Holiday object with localized text for the target language.
 */
export function getLocalizedHoliday(holiday: Holiday, lang: SupportedLanguage): Holiday {
  if (lang === 'en' || !holiday) return holiday;

  const patch = HOLIDAY_TRANSLATIONS[holiday.id]?.[lang];
  if (!patch) return holiday;

  return {
    ...holiday,
    name: patch.name || holiday.name,
    description: patch.description || holiday.description,
    traditions: patch.traditions || holiday.traditions,
    greeting: patch.greeting || holiday.greeting,
    foodDelicacies: patch.foodDelicacies || holiday.foodDelicacies,
    facts: patch.facts || holiday.facts,
    tags: patch.tags || holiday.tags
  };
}

/**
 * Returns an array of localized holidays for the given language.
 */
export function getLocalizedHolidays(holidays: Holiday[], lang: SupportedLanguage): Holiday[] {
  if (lang === 'en') return holidays;
  return holidays.map(h => getLocalizedHoliday(h, lang));
}
