import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Package, 
  Calendar as CalendarIcon, 
  MapPin, 
  Check, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ArrowRight, 
  Heart, 
  Tag, 
  ShoppingBag,
  Info,
  DollarSign,
  Gift,
  Share2
} from 'lucide-react';
import { Holiday, DecorRentalPackage } from '../types';
import confetti from 'canvas-confetti';

interface RentEventDecorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedHoliday?: Holiday | null;
  onOpenSharePoster?: (holiday: Holiday) => void;
}

export const DECOR_PACKAGES: DecorRentalPackage[] = [
  {
    id: 'decor-diwali-grand',
    holidayId: 'diwali',
    holidayName: 'Diwali (Festival of Lights)',
    title: 'Imperial Ayodhya Brass & Marigold Grand Gala Set',
    theme: 'Radiant Brass, Floral Rangoli & Festive Illumination',
    basePrice: 289,
    rating: 4.95,
    reviewsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      '12 Handcrafted Pure Brass Hanging Diyas & 24 Hand-cast Urli Floating Bowls',
      '80ft Freshly Scented Artificial Marigold & Jasmine Floral Garlands',
      'Laser-cut Precision Wooden Rangoli Stencil Templates + 6 Vibrant Color Pigment Jars',
      'Warm-White Cascading LED Star Curtain Backdrop (3m x 3m)',
      'Traditional Embroidered Velvet Low Majlis Table Runners & Gilded Pedestals'
    ],
    dimensionsAndSpecs: 'Suitable for 40-150 guests. Setup time approx 45 mins. Indoor/Covered Outdoor.',
    recommendedAudienceSize: '50-120 Guests',
    depositAmount: 100,
    isPopular: true
  },
  {
    id: 'decor-muertos-ofrenda',
    holidayId: 'dia_de_los_muertos',
    holidayName: 'Día de los Muertos',
    title: 'Oaxaca Heritage 3-Tier Ofrenda Altar & Archway Kit',
    theme: 'Artisanal Cempasúchil Marigolds & Hand-Cut Papel Picado',
    basePrice: 265,
    rating: 4.98,
    reviewsCount: 188,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      'Grand 3-Tier Wooden Collapsible Ofrenda Altar Structure with Black Velvet Drapery',
      'Full Cempasúchil Marigold Archway with Warm Golden Fairy Lighting',
      '50ft Authentic Hand-Cut Artisan Mexican Papel Picado (Tissue & Weatherproof Satin)',
      '6 Hand-painted Talavera Ceramic Calaveras (Sugar Skulls) & 12 Glass Candle Holders',
      'Rustic Clay Copal Burners (with Safe Electronic Incense Diffuser & Amber LED Glow)'
    ],
    dimensionsAndSpecs: 'Altar 2m (W) x 1.8m (H). Archway 2.4m height. Indoor and dry outdoor rated.',
    recommendedAudienceSize: '30-100 Guests',
    depositAmount: 100,
    isPopular: true
  },
  {
    id: 'decor-cny-imperial',
    holidayId: 'chinese_new_year',
    holidayName: 'Chinese New Year (Spring Festival)',
    title: 'Forbidden City Imperial Dragon & Silk Lantern Pavilion',
    theme: 'Auspicious Crimson, Gold Foil Calligraphy & Silk Lanterns',
    basePrice: 320,
    rating: 4.92,
    reviewsCount: 96,
    imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df301?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      '18 Handcrafted Palace Silk Lanterns with Gold Tassels (Red & Mandarin Gold)',
      '15ft Articulated Golden Silk Dragon Ceiling Installation with Micro-LED Rigging',
      'Set of 4 Hand-Calligraphed Chunlian Spring Couplet Velvet Banners & Fu Emblems',
      'Pair of 1.6m Potted Artificial Blooming Pink Cherry Blossom & Plum Trees',
      'Imperial Gold Ingot Bowls, Red Velvet Dining Linens & Porcelain Tea Centerpieces'
    ],
    dimensionsAndSpecs: 'Expands up to 250 sq meters. Ceiling suspension hooks included.',
    recommendedAudienceSize: '50-180 Guests',
    depositAmount: 120,
    isPopular: true
  },
  {
    id: 'decor-eid-majlis',
    holidayId: 'eid_al_fitr',
    holidayName: 'Eid al-Fitr & Ramadan',
    title: 'Arabian Nights Pierced Brass Majlis & Crescent Sky Set',
    theme: 'Moroccan Filigree, Jewel Velvet & Star-and-Crescent Lighting',
    basePrice: 295,
    rating: 4.94,
    reviewsCount: 114,
    imageUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      '8 Authentic Hand-Chiseled Moroccan Brass Lanterns with Shadow-Casting Patterns',
      'Giant 2.2m Illuminated Steel Crescent Moon & Star Floral Installation',
      '6 Luxurious Velvet & Brocade Floor Poufs / Majlis Seating Cushions',
      'Ornate Silver & Hammered Brass Tea Samovar Set with Crystal Mint Glasses',
      'Deep Indigo & Amber Voile Drapery Swags with Warm Firefly Lighting'
    ],
    dimensionsAndSpecs: 'Perfect for living room, courtyard, or banquet hall lounge. 45 min setup.',
    recommendedAudienceSize: '30-90 Guests',
    depositAmount: 100,
    isPopular: false
  },
  {
    id: 'decor-oktoberfest-bavarian',
    holidayId: 'oktoberfest',
    holidayName: 'Oktoberfest',
    title: 'Munich Bierzelt Authentic Beer Hall Bench & Festoon Rig',
    theme: 'Bavarian Rhombus Blue-and-White, Rustic Pine & Hop Garlands',
    basePrice: 340,
    rating: 4.89,
    reviewsCount: 82,
    imageUrl: 'https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      '2 Authentic 2.2m Solid Spruce German Brewery Benches & Table Sets (Foldable)',
      'Bavarian Diamond Check Heavy Cotton Table Runners & Rustic Wooden Pretzel Trees',
      '40ft Artificial Dried Hop Vine Garlands & Edelweiss Alpine Floral Bunches',
      'Heavy Heavy-duty Festoon Globe Lighting Cables with Warm Amber Bulbs (15m)',
      '12 Authentic Stoneware 1-Liter Beer Steins with Embossed Bavarian Crests'
    ],
    dimensionsAndSpecs: 'Solid European timber, weather resistant. Seats 16-20 adults comfortably.',
    recommendedAudienceSize: '25-80 Guests',
    depositAmount: 150,
    isPopular: false
  },
  {
    id: 'decor-midsummer-botanical',
    holidayId: 'midsummer',
    holidayName: 'Midsummer (Midsommar)',
    title: 'Nordic Wildflower Maypole & Sunlit Birchwood Canopy',
    theme: 'Wild Flora, Birchwood Arbors & Seven-Flower Solstice Ribbons',
    basePrice: 245,
    rating: 4.96,
    reviewsCount: 67,
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    itemsIncluded: [
      '2.5m Portable Interlocking Wooden Maypole with Flowing Pastel Ribbon Strands',
      'Scandinavian Birchwood Table Runners & Wildflower Meadow Floral Centers',
      'DIY Midsommarkrans (Flower Crown) Crafting Station Kit with 20 Wire Frames',
      'Rustic White Timber Lanterns with Flameless Windproof Flickering Pillars',
      'Linen Hemstitched Napery & Botanical Foliage Chandelier'
    ],
    dimensionsAndSpecs: 'Outdoor garden or bright airy hall. Setup time approx 30 mins.',
    recommendedAudienceSize: '20-60 Guests',
    depositAmount: 80,
    isPopular: false
  }
];

export const RentEventDecorModal: React.FC<RentEventDecorModalProps> = ({
  isOpen,
  onClose,
  selectedHoliday,
  onOpenSharePoster
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(() => {
    if (selectedHoliday) {
      const match = DECOR_PACKAGES.find(p => p.holidayId === selectedHoliday.id || selectedHoliday.name.toLowerCase().includes(p.holidayName.toLowerCase().split(' ')[0]));
      if (match) return match.id;
    }
    return DECOR_PACKAGES[0].id;
  });

  const [eventDate, setEventDate] = useState('2026-11-15');
  const [guestCount, setGuestCount] = useState(45);
  const [deliveryOption, setDeliveryOption] = useState<'delivery' | 'setup' | 'pickup'>('delivery');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');

  if (!isOpen) return null;

  const currentPkg = DECOR_PACKAGES.find(p => p.id === selectedPkgId) || DECOR_PACKAGES[0];

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'CULTURE20' || code === 'WORLD20' || code === 'AMBASSADOR') {
      setAppliedPromo(code);
      setDiscountPercent(20);
      confetti({ particleCount: 30, spread: 60 });
    } else if (code === 'FREE50' || code === 'REFERRAL50') {
      setAppliedPromo(code);
      setDiscountPercent(15);
      confetti({ particleCount: 25, spread: 50 });
    } else {
      alert('Invalid promo code. Use CULTURE20 or AMBASSADOR for 20% off your decor rental!');
    }
  };

  const deliveryFee = deliveryOption === 'pickup' ? 0 : deliveryOption === 'setup' ? 95 : 35;
  const basePrice = currentPkg.basePrice;
  const discountAmount = Math.round(basePrice * (discountPercent / 100));
  const subtotal = basePrice - discountAmount + deliveryFee;
  const total = subtotal + currentPkg.depositAmount;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert('Please enter your name and email to receive your decor rental reservation.');
      return;
    }
    const ref = `DEC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setBookingRef(ref);
    setBookingConfirmed(true);
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-stone-900 w-full max-w-4xl rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-stone-900 dark:text-white text-lg">
                  Rent Event Decor
                </h2>
                <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                  Global Celebrations Concierge
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Authentic cultural ceremonial decor packages delivered & styled for 100+ world holidays
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {bookingConfirmed ? (
            <div className="p-8 text-center space-y-5 max-w-lg mx-auto bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-700">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Reservation Reserved Successfully!
                </span>
                <h3 className="font-serif font-black text-2xl text-stone-900 dark:text-white mt-1">
                  {currentPkg.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-2">
                  Confirmation and packing dispatch details have been dispatched to <span className="font-semibold text-stone-900 dark:text-white">{email}</span>. Your security deposit of ${currentPkg.depositAmount} is 100% refundable upon post-event collection.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Event Date:</span>
                  <span className="font-semibold">{eventDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Guest Count:</span>
                  <span className="font-semibold">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Delivery Tier:</span>
                  <span className="font-semibold capitalize">{deliveryOption.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between border-t border-stone-100 dark:border-stone-800 pt-2 font-bold text-stone-900 dark:text-white">
                  <span>Total (Rental + Deposit):</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                onClick={() => setBookingConfirmed(false)}
                className="py-2.5 px-6 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition"
              >
                Browse More Cultural Decor Packages
              </button>
            </div>
          ) : (
            <>
              {/* Package Selector Cards */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Step 1: Select Authentic Cultural Package
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {DECOR_PACKAGES.length} Curated Festive Sets
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DECOR_PACKAGES.map(pkg => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPkgId(pkg.id)}
                      className={`text-left p-3 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                        selectedPkgId === pkg.id
                          ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/40 dark:bg-rose-950/30'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300'
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">
                          Popular
                        </span>
                      )}
                      <div>
                        <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-tight block">
                          {pkg.holidayName}
                        </span>
                        <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-white mt-0.5 line-clamp-1">
                          {pkg.title}
                        </h4>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900 dark:text-white">
                          ${pkg.basePrice} <span className="text-[10px] font-normal text-stone-500">/ weekend</span>
                        </span>
                        <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>{pkg.rating}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Package Details Showcase */}
              <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md">
                  <img
                    src={currentPkg.imageUrl}
                    alt={currentPkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 block">
                      {currentPkg.theme}
                    </span>
                    <span className="text-xs font-semibold">
                      {currentPkg.recommendedAudienceSize} · {currentPkg.dimensionsAndSpecs}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                      {currentPkg.holidayName}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-stone-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-stone-800 dark:text-stone-200">{currentPkg.rating}</span>
                      <span>({currentPkg.reviewsCount} verified event rentals)</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-black text-xl text-stone-900 dark:text-white">
                    {currentPkg.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    <span className="font-bold uppercase text-[10px] tracking-wider text-stone-400 block mb-1">
                      Included Ceremonial & Decorative Elements:
                    </span>
                    {currentPkg.itemsIncluded.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-4 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-indigo-500" />
                      Free Return Containers
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Damage Protection Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2: Event Details & Reservation Form */}
              <form onSubmit={handleConfirmReservation} className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                  Step 2: Customize Rental Dates & Delivery
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Celebration Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 font-mono outline-none focus:ring-1 focus:ring-rose-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Guest Count ({guestCount} guests)
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      step={5}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full mt-2 accent-rose-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Delivery & Setup Service
                    </label>
                    <select
                      value={deliveryOption}
                      onChange={(e) => setDeliveryOption(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none"
                    >
                      <option value="delivery">Curbside Direct Delivery (+$35)</option>
                      <option value="setup">White-Glove Styling & Setup Concierge (+$95)</option>
                      <option value="pickup">Self Warehouse Pick-Up (Free)</option>
                    </select>
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Lin"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      Email for Booking Confirmation
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. maya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                      City / Event Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. San Francisco, CA"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Promo Code & Referral Rewards Field */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex-1 flex items-center gap-2 w-full">
                    <Tag className="w-4 h-4 text-rose-500 shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. CULTURE20 for 20% off)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 uppercase outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="py-2 px-3 rounded-xl bg-stone-200 dark:bg-stone-700 text-xs font-semibold text-stone-800 dark:text-white shrink-0 hover:bg-stone-300 transition"
                    >
                      Apply Code
                    </button>
                  </div>

                  {appliedPromo && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {appliedPromo} ({discountPercent}% Discount Applied!)
                    </span>
                  )}
                </div>

                {/* Price Breakdown Summary & Reserve Button */}
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs space-y-1 w-full sm:w-auto">
                    <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
                      <span>Package Rental: <strong className="text-stone-900 dark:text-white">${basePrice}</strong></span>
                      {discountAmount > 0 && (
                        <span className="text-rose-600 font-semibold">Discount: -${discountAmount}</span>
                      )}
                      <span>Service: <strong className="text-stone-900 dark:text-white">${deliveryFee}</strong></span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Refundable Security Deposit: <span className="font-semibold text-stone-700 dark:text-stone-300">${currentPkg.depositAmount}</span> (automatically refunded upon pickup)
                    </div>
                    <div className="text-base font-serif font-black text-stone-900 dark:text-white">
                      Estimated Due Today: ${total}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-rose-500/20"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Reserve Event Decor Package</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
