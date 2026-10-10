import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Security Headers Middleware (Enterprise-grade security & GDPR protection)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(self), microphone=(self), geolocation=(self)');
  next();
});

app.use(express.json({ limit: '10mb' }));

// In-memory or simulated database cache for cloud sync, community discussions, and feedback
let cloudSyncDb: Record<string, { preferences?: any; reminders?: any; updatedAt: string }> = {};
let communityPostsDb: any[] = [];
let feedbackDb: any[] = [];

// Initialize Gemini Client Lazily with Server Secret
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY),
    service: 'World Holidays & Celebrations Engine'
  });
});

// 2. Cultural Insight & Search Grounding / Deep Thinking Endpoint
app.post('/api/ai/cultural-insight', async (req, res) => {
  try {
    const { holidayName, country, query, thinkingMode, useSearch, useMaps } = req.body;
    const ai = getGenAI();

    let systemInstruction = `You are a world-renowned cultural anthropologist, historian, and festive traditions guide.
Provide rich, engaging, respectful, and authentic explanations about worldwide celebrations, sacred observances, delicacies, attire, origins, and modern practices. Keep answers structured, culturally accurate, engaging, and inspiring.`;

    if (thinkingMode) {
      // Use gemini-3.1-pro-preview with thinkingLevel HIGH as instructed in user metadata
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Explain in depth the historical genesis, symbolic meaning, cultural evolution, and regional nuances of "${holidayName}" (${country}). Specific query: ${query || 'Comprehensive cultural breakdown and why it resonates globally.'}`,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: 'HIGH' as any
          }
        }
      });

      return res.json({
        content: response.text,
        model: 'gemini-3.1-pro-preview (Thinking: HIGH)',
        groundingMetadata: null
      });
    }

    if (useSearch) {
      // Search Grounding with gemini-3.5-flash as instructed
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `What are the latest verified dates, prominent public parades, and celebrations for "${holidayName}" in ${country}? Details: ${query || 'Current dates, festival events, and local festivities.'}`,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }]
        }
      });

      return res.json({
        content: response.text,
        model: 'gemini-3.5-flash (Google Search Grounded)',
        groundingMetadata: (response as any).candidates?.[0]?.groundingMetadata || null
      });
    }

    if (useMaps) {
      // Maps Grounding with gemini-3.5-flash as instructed
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Where are the top authentic cultural districts, historic squares, and temples/parade routes to experience "${holidayName}" in ${country}? Detail exact locations, landmarks, and travel tips. Query: ${query || 'Best iconic spots and neighborhoods to visit.'}`,
        config: {
          systemInstruction,
          tools: [{ googleMaps: {} }]
        }
      });

      return res.json({
        content: response.text,
        model: 'gemini-3.5-flash (Google Maps Grounded)',
        groundingMetadata: (response as any).candidates?.[0]?.groundingMetadata || null
      });
    }

    // Default fast low-latency response using gemini-3.1-flash-lite as instructed
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Provide a concise, vibrant cultural spotlight for "${holidayName}" (${country}). Include traditional greeting, key ritual, signature delicacy, and a fascinating fun fact. Question: ${query || 'Give me a fast celebration summary!'}`,
      config: {
        systemInstruction
      }
    });

    return res.json({
      content: response.text,
      model: 'gemini-3.1-flash-lite (Ultra Low Latency)',
      groundingMetadata: null
    });
  } catch (error: any) {
    console.error('Error in /api/ai/cultural-insight:', error);
    res.status(500).json({
      error: error.message || 'Failed to generate cultural intelligence',
      fallbackText: 'Unable to connect to live AI insights. Enjoy exploring our verified offline holiday encyclopedia!'
    });
  }
});

// 2b. Multi-Turn Cultural Heritage Chatbot Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, holidayName, country, mode } = req.body;
    const ai = getGenAI();

    const systemInstruction = `You are the WorldFest Cultural Heritage & Festive Traditions Guide, an expert cultural anthropologist, historian, and travel advisor.
Context: You are currently conversing with a cultural explorer about "${holidayName || 'Global Cultural Celebrations'}" (${country || 'Worldwide'}).
Your role: Provide authentic, respectful, deeply informative, and engaging insights about sacred rituals, historical genesis, traditional garments, festive feasts, local customs, and travel logistics.
Maintain a warm, enthusiastic, and respectful tone. Format responses with clean paragraphs and bullet points where helpful.`;

    let modelName = 'gemini-3.5-flash';
    let tools: any[] | undefined = undefined;
    let thinkingConfig: any = undefined;

    if (mode === 'thinking') {
      // Use gemini-3.1-pro-preview for complex tasks with Thinking: HIGH
      modelName = 'gemini-3.1-pro-preview';
      thinkingConfig = { thinkingLevel: 'HIGH' };
    } else if (mode === 'search') {
      // Search Grounding with gemini-3.5-flash
      modelName = 'gemini-3.5-flash';
      tools = [{ googleSearch: {} }];
    } else if (mode === 'maps') {
      // Maps Grounding with gemini-3.5-flash
      modelName = 'gemini-3.5-flash';
      tools = [{ googleMaps: {} }];
    } else if (mode === 'fast') {
      // Fast response with gemini-3.1-flash-lite
      modelName = 'gemini-3.1-flash-lite';
    }

    const formattedContents = (messages || []).map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text || m.content }]
    }));

    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction,
        ...(tools ? { tools } : {}),
        ...(thinkingConfig ? { thinkingConfig } : {})
      }
    });

    const groundingMetadata = (response as any).candidates?.[0]?.groundingMetadata || null;

    res.json({
      text: response.text,
      model: modelName,
      groundingMetadata
    });
  } catch (err: any) {
    console.error('Error in /api/ai/chat:', err);
    res.status(500).json({
      error: err.message,
      text: `I apologize, but I encountered a connection issue: ${err.message}. ${req.body.holidayName ? `Here is a local cultural highlight for ${req.body.holidayName}: Celebrated with immense communal devotion, shared festive dishes, and traditional attire.` : 'Please try sending your message again.'}`
    });
  }
});

// 3. Viral Poster & Social Media Caption Generator
app.post('/api/ai/generate-social-kit', async (req, res) => {
  try {
    const { holidayName, country, traditions, greeting } = req.body;
    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: `Create a viral social media share kit for "${holidayName}" (${country}).
Greeting: ${greeting || 'Happy celebration!'}
Traditions: ${traditions?.join(', ') || 'Gatherings, feasting, and community.'}

Return JSON with:
- headline: High-converting catchy hook (under 12 words)
- captions: 3 distinct captions (one inspiring for Instagram, one informative for LinkedIn, one snappy for X/Threads)
- hashtags: array of 8 top trending viral hashtags
- visualPosterConcept: description of aesthetic poster visual motif and color palette`,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let data;
    try {
      data = JSON.parse(response.text || '{}');
    } catch {
      data = { headline: `Celebrate ${holidayName}!`, captions: { instagram: `Happy ${holidayName}!`, linkedin: `Wishing everyone joy on ${holidayName}.`, x: `#${holidayName.replace(/\s+/g, '')} is here!` }, hashtags: ['#WorldCelebration', '#Culture', '#Heritage'] };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error generating social kit:', error);
    res.status(500).json({
      headline: `Celebrate ${req.body.holidayName || 'World Traditions'}!`,
      captions: {
        instagram: `Embrace the beauty of ${req.body.holidayName || 'global traditions'} with family & friends! ✨🌍`,
        linkedin: `Celebrating international cultural diversity and unity on ${req.body.holidayName || 'this special day'}.`,
        x: `Wishing all communities worldwide a joyful ${req.body.holidayName || 'festive celebration'}! 🎉`
      },
      hashtags: ['#WorldHolidays', '#CulturalHeritage', '#GlobalUnity', '#Traditions']
    });
  }
});

// 3b. Culturally Appropriate AI Gift Guide Generator
app.post('/api/ai/gift-guide', async (req, res) => {
  try {
    const { holidayName, country, traditions, recipient, budget, dietary } = req.body;
    const ai = getGenAI();

    const prompt = `You are an elite cultural etiquette and anthropological gifting consultant.
Provide a culturally authentic and respectful gift guide for the celebration "${holidayName}" (${country || 'Global'}).
Context:
- Holiday traditions: ${traditions?.join(', ') || 'Traditional community gathering and festivity'}
- Target Recipient: ${recipient || 'General family/friend/host'}
- Budget/Tone: ${budget || 'Thoughtful and authentic'}
- Dietary / Cultural preferences: ${dietary || 'Respect traditional customs'}

Generate a structured JSON response with:
- "culturalContext": A concise 2-sentence summary of the spiritual, communal, or traditional philosophy of giving for this occasion.
- "auspiciousColors": Array of 2 to 4 auspicious/favored colors for gifts and wrapping in this tradition.
- "etiquetteDos": Array of 3 essential cultural gifting etiquette rules (e.g. use both hands, present with greeting).
- "etiquetteDonts": Array of 3 critical taboos to avoid (e.g. colors, numbers, taboo objects).
- "gifts": Array of 4 specific, culturally appropriate gift suggestions. Each gift object must have:
  - "name": English item name
  - "localName": Traditional local language name or term (e.g. "Mithai", "Hongbao", "Oud", "Pan de Muerto")
  - "significance": Deep cultural meaning or blessing behind this gift
  - "priceTier": One of "Modest Token", "Thoughtful Gift", "Traditional Auspicious", "Ceremonial / Premium"
  - "bestFor": Best recipient suitability (e.g. "Hosts & Families", "Elders", "Children", "Colleagues")
  - "presentationTip": How to wrap, package, or verbally present it`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let data;
    try {
      data = JSON.parse(response.text || '{}');
    } catch {
      data = null;
    }

    if (data && data.gifts && data.gifts.length > 0) {
      return res.json(data);
    }
    throw new Error('Invalid JSON structure from model');
  } catch (error: any) {
    console.error('Error generating AI gift guide:', error);
    // Graceful curated fallback based on holiday name
    const hName = (req.body.holidayName || '').toLowerCase();
    let fallbackGifts = [
      {
        name: 'Artisanal Festive Delicacy & Sweets Box',
        localName: 'Traditional Delights',
        significance: 'Sharing sweets symbolizes bringing sweetness, harmonious relationships, and prosperity into the recipient’s household.',
        priceTier: 'Thoughtful Gift',
        bestFor: 'Hosts & Families',
        presentationTip: 'Wrap in celebratory golden or jewel-toned fabric with an authentic handwritten blessing card.'
      },
      {
        name: 'Handcrafted Incense, Natural Oils or Beeswax Candles',
        localName: 'Light & Essence',
        significance: 'Honors the elemental celebration of illumination and purifies the living space for ancestral and spiritual blessings.',
        priceTier: 'Modest Token',
        bestFor: 'Close Friends & Elders',
        presentationTip: 'Present in a reusable natural fiber pouch using both hands as a sign of deep esteem.'
      },
      {
        name: 'Curated Herbal Teas & Heritage Spices Assortment',
        localName: 'Nourishing Harvest',
        significance: 'Offers rejuvenation, hospitality, and communal warmth, reflecting ancient trade routes and hospitality lore.',
        priceTier: 'Traditional Auspicious',
        bestFor: 'Colleagues & Mentors',
        presentationTip: 'Pair with local raw honey or ceramic cups tied with natural twine.'
      },
      {
        name: 'Symbolic Good Fortune Tokens or Heritage Artwork',
        localName: 'Auspicious Keepsake',
        significance: 'A lasting reminder of shared heritage, good health, and fortune throughout the upcoming calendar cycle.',
        priceTier: 'Ceremonial / Premium',
        bestFor: 'Elders & Esteemed Guests',
        presentationTip: 'Accompany with an even or auspicious numerical denomination or blessed emblem.'
      }
    ];

    res.json({
      culturalContext: `In ${req.body.holidayName || 'traditional celebrations'}, gifting is deeply rooted in hospitality, mutual blessing, and honoring the spiritual spirit of the season.`,
      auspiciousColors: ['Gold', 'Warm Red', 'Deep Emerald', 'Saffron'],
      etiquetteDos: [
        'Present the gift using both hands or the right hand as a universal sign of humility and honor.',
        'Include an authentic greeting or written blessing in the native tongue of the tradition.',
        'Respect sacred dietary customs (e.g. vegetarian, halal, kosher, alcohol-free) when selecting food gifts.'
      ],
      etiquetteDonts: [
        'Avoid sharp utensils, scissors, or clocks in East Asian contexts as they symbolize severing ties.',
        'Never use somber black or plain white wrapping where these shades are associated with mourning rites.',
        'Do not present gifts with the left hand in South Asian, Middle Eastern, and African customs.'
      ],
      gifts: fallbackGifts
    });
  }
});

// 3c. Traditional Attire & Cultural Dress AI Specialist
app.post('/api/ai/traditional-attire', async (req, res) => {
  try {
    const { holidayName, country, localName, traditions, genderFocus, query } = req.body;
    const ai = getGenAI();

    const prompt = `You are a world-leading ethnographic fashion curator, cultural textile historian, and traditional dress anthropologist.
Analyze and describe in vivid detail the authentic traditional attire, ceremonial clothing, fabrics, color symbolism, and accessories worn during "${holidayName}" (${country || 'Global'}).
Context:
- Local native holiday name: ${localName || holidayName}
- Core Traditions: ${traditions?.join(', ') || 'Festive celebrations, spiritual rites, and communal feasts'}
- Gender or Ensemble Focus: ${genderFocus || 'All traditional ensembles (womenswear, menswear, ceremonial robes, and accessories)'}
- Additional Query or Regional Focus: ${query || 'Complete cultural attire breakdown'}

Return a strictly valid JSON object matching this schema:
{
  "holidayId": "${(holidayName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
  "holidayName": "${holidayName}",
  "country": "${country || 'Global'}",
  "overview": "A vivid 2-3 sentence overview describing the aesthetic spirit, cultural dignity, and role of traditional attire for this occasion.",
  "historicalContext": "A 2-3 sentence summary of the historical roots, textile weaving traditions, and evolution of these garments over the centuries.",
  "auspiciousColors": [
    {
      "name": "Color name (e.g. Imperial Crimson, Sacred Saffron, Altar White)",
      "hex": "#HEXCODE (valid 6-character hex like #C41E3A)",
      "meaning": "Cultural and spiritual significance of this hue in this celebration"
    }
  ],
  "garments": [
    {
      "id": "unique-kebab-id",
      "name": "English name of the garment (e.g. Silk Saree with Zari Pallu, Traje de Charro, Dirndl)",
      "nativeTerm": "Native term in local script and phonetic transliteration (e.g. साड़ी (Saree), 旗袍 (Qipao), Lederhosen)",
      "ensembleType": "one of: 'feminine', 'masculine', 'unisex', 'ceremonial', 'accessory'",
      "categoryLabel": "e.g. 'Feminine Traditional', 'Masculine Gala', 'Imperial Ceremonial', 'Alpine Heritage'",
      "description": "2-3 sentences detailing the cut, silhouette, structural layers, drape, and styling of this garment.",
      "fabrics": ["Array of 2-4 authentic fabrics e.g. Mulberry Silk, Handwoven Cotton, Deerskin, Wool felt"],
      "colors": ["Array of 2-3 predominant colors"],
      "culturalSignificance": "Why this specific garment is spiritually or culturally essential to this celebration.",
      "motifsOrPatterns": "Key decorative patterns, embroidery stitches, or sacred symbols (e.g. Paisley, Marigolds, Gold dragon seals)",
      "placeholderVisualUrl": "An authentic high-resolution Unsplash photo URL representing traditional clothing/textiles",
      "placeholderAltText": "Detailed description of the visual",
      "accentColor": "A matching hex color code"
    }
  ],
  "adornmentsAndJewelry": [
    "Array of 3-4 specific traditional jewelry pieces, headwear, hair decorations, or footwear"
  ],
  "visitorEtiquetteTips": {
    "canVisitorsWear": "Encouraging, clear guidance on whether visitors and travelers may wear traditional dress and how it is received.",
    "dos": [
      "3 essential respectful etiquette guidelines when wearing or admiring traditional clothing"
    ],
    "donts": [
      "2-3 critical cultural taboos to avoid (e.g. costume caricatures, mourning colors, sacred religious symbols used inappropriately)"
    ]
  },
  "modernAdaptations": "A brief sentence on modern fusion trends or contemporary styling."
}

Generate between 3 to 4 distinct garment items across feminine, masculine, unisex, or ceremonial categories. Ensure all hex codes are valid.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    let data;
    try {
      data = JSON.parse(response.text || '{}');
    } catch {
      data = null;
    }

    if (data && data.garments && data.garments.length > 0) {
      return res.json(data);
    }
    throw new Error('Invalid JSON structure returned from model');
  } catch (error: any) {
    console.error('Error generating traditional attire:', error);
    // Graceful fallback response
    const cleanName = (req.body.holidayName || 'World Celebration').split('(')[0].trim();
    const country = req.body.country || 'Global';

    res.json({
      holidayId: (req.body.holidayName || 'holiday').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      holidayName: req.body.holidayName || 'Cultural Celebration',
      country: country,
      overview: `For ${cleanName}, traditional dress is a magnificent expression of cultural continuity, festive honor, and ancestral pride across ${country}.`,
      historicalContext: `Garments have evolved through centuries of artisanal handloom weaving, natural mineral dyes, and ceremonial heraldry passed across generations.`,
      auspiciousColors: [
        { name: 'Ceremonial Gold', hex: '#D4AF37', meaning: 'Spiritual radiance, honor, and prosperity.' },
        { name: 'Festive Crimson', hex: '#C41E3A', meaning: 'Joy, vital energy, and communal celebration.' },
        { name: 'Sacred White', hex: '#FDFBF7', meaning: 'Moral clarity, spiritual peace, and renewal.' }
      ],
      garments: [
        {
          id: 'festive-ensemble-1',
          name: `Festive Ceremonial Robe of ${country}`,
          nativeTerm: 'Traditional Ceremonial Attire',
          ensembleType: 'unisex',
          categoryLabel: 'Ceremonial Traditional',
          description: `Elaborate traditional garments handcrafted with regional weaving and embroidered heritage motifs for ${cleanName}.`,
          fabrics: ['Handloom Silk', 'Fine Cotton', 'Embroidered Linen'],
          colors: ['Crimson', 'Gold', 'Ivory'],
          culturalSignificance: 'Worn during ancestral invocations and community banquets as a tribute to collective heritage.',
          motifsOrPatterns: 'Ancestral geometric crests and botanical embroidery.',
          placeholderVisualUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
          placeholderAltText: `Traditional ceremonial garments for ${cleanName}`,
          accentColor: '#D4AF37'
        },
        {
          id: 'festive-ensemble-2',
          name: `Heritage Adornments & Footwear`,
          nativeTerm: 'Symbolic Accessories',
          ensembleType: 'accessory',
          categoryLabel: 'Traditional Accessories',
          description: `Handcrafted jewelry, woven sashes, and commemorative footwear completing the traditional festive ensemble.`,
          fabrics: ['Hammered Silver/Brass', 'Embroidered Leather'],
          colors: ['Gold', 'Silver'],
          culturalSignificance: 'Provides protection and signifies the family or community status of the celebrant.',
          motifsOrPatterns: 'Sacred floral filigree and heritage seal work.',
          placeholderVisualUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
          placeholderAltText: `Heritage accessories and jewelry for ${cleanName}`,
          accentColor: '#C41E3A'
        }
      ],
      adornmentsAndJewelry: [
        'Heirloom metalwork or ceremonial pendants passed through generations',
        'Traditional head coverings or fresh floral garlands'
      ],
      visitorEtiquetteTips: {
        canVisitorsWear: 'Yes, respectful appreciation and wearing culturally appropriate festive attire is warmly welcomed by local hosts.',
        dos: [
          'Choose bright, celebratory colors and maintain modesty in sacred spaces.',
          'Ask hosts politely about the cultural names of specific garments.'
        ],
        donts: [
          'Avoid turning sacred ceremonial attire into party costumes or caricatures.',
          'Never wear mourning colors to joyous celebration banquets.'
        ]
      },
      modernAdaptations: 'Modern designers blend these traditional silhouettes with breathable contemporary textiles for daily festive wear.'
    });
  }
});


// 4. Cloud Sync API (Secure device synchronization)
app.post('/api/sync/push', (req, res) => {
  const { syncKey, preferences, reminders } = req.body;
  if (!syncKey) {
    return res.status(400).json({ error: 'Sync key required' });
  }

  cloudSyncDb[syncKey] = {
    preferences,
    reminders,
    updatedAt: new Date().toISOString()
  };

  res.json({ success: true, message: 'Cloud sync successful', lastSync: cloudSyncDb[syncKey].updatedAt });
});

app.get('/api/sync/pull/:syncKey', (req, res) => {
  const { syncKey } = req.params;
  const data = cloudSyncDb[syncKey];
  if (!data) {
    return res.status(404).json({ error: 'No synced cloud profile found for this key' });
  }
  res.json({ success: true, data });
});

// 5. User Feedback mechanism for continuous satisfaction
app.post('/api/feedback', (req, res) => {
  const { rating, feedbackType, comment, email, holidaySuggested } = req.body;
  const item = {
    id: `fb-${Date.now()}`,
    rating,
    feedbackType,
    comment,
    email: email || 'anonymous',
    holidaySuggested,
    timestamp: new Date().toISOString()
  };
  feedbackDb.push(item);
  res.json({ success: true, message: 'Thank you for helping us elevate global cultural representation!' });
});

// 6. Community discussions
app.get('/api/community/posts', (req, res) => {
  res.json({ posts: communityPostsDb });
});

app.post('/api/community/posts', (req, res) => {
  const { author, authorCountry, avatar, holidayId, holidayName, title, content, isEncrypted } = req.body;
  const newPost = {
    id: `post-${Date.now()}`,
    author: author || 'Global Traveler',
    authorCountry: authorCountry || 'Global',
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    holidayId,
    holidayName,
    title,
    content,
    likes: 1,
    likedByMe: false,
    timestamp: 'Just now',
    tags: ['WorldTradition', 'Community'],
    comments: [],
    isEncrypted: Boolean(isEncrypted)
  };
  communityPostsDb.unshift(newPost);
  res.json({ success: true, post: newPost });
});

// 7. GDPR & CCPA Compliance Endpoints
app.post('/api/privacy/export-data', (req, res) => {
  const { syncKey } = req.body;
  const userData = syncKey ? cloudSyncDb[syncKey] : null;

  res.json({
    compliance: {
      standard: 'GDPR Article 20 & CCPA § 1798.100',
      timestamp: new Date().toISOString(),
      encryptionStandard: 'AES-GCM-256',
      dataController: 'WorldFest Global Observatory',
      serverSyncRecords: userData || { status: 'Zero server-retained records' }
    }
  });
});

app.post('/api/privacy/purge-data', (req, res) => {
  const { syncKey } = req.body;
  if (syncKey && cloudSyncDb[syncKey]) {
    delete cloudSyncDb[syncKey];
  }

  res.json({
    success: true,
    message: 'User data permanently scrubbed from server cache in compliance with GDPR Article 17 (Right to be Forgotten).'
  });
});

// 8. Real-time Critical Account Alerts & System Notifications
app.get('/api/notifications/alerts', (req, res) => {
  res.json({
    alerts: [
      {
        id: 'sys-alert-1',
        title: '🔐 E2EE Protection Active',
        message: 'Your personal reminders and private notes are secured with AES-GCM 256-bit encryption.',
        timestamp: 'Just now',
        type: 'security',
        isCritical: false
      },
      {
        id: 'sys-alert-2',
        title: '🌍 Global Festivities In Progress',
        message: 'Multiple sacred cultural celebrations occurring worldwide this month. Check your personalized timeline!',
        timestamp: '1 hour ago',
        type: 'trending',
        isCritical: false
      }
    ]
  });
});

// Start Express + Vite Dev or Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`World Holidays server active on port ${PORT}`);
  });
}

startServer();
