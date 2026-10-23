import { EventDetails, GalleryPhoto, GuestRsvp, RegistryItem, ScheduleEvent, StoryMilestone } from '../types/wedding';

const STORAGE_KEYS = {
  EVENT_DETAILS: 'aysha_kalimah_event_details_v3',
  GUESTS: 'aysha_kalimah_guests_v3',
  GALLERY: 'aysha_kalimah_gallery_v3',
  REGISTRY: 'aysha_kalimah_registry_v3',
  MUSIC_MUTED: 'aysha_kalimah_music_muted',
};

export const DEFAULT_EVENT_DETAILS: EventDetails = {
  coupleNames: 'Aysha & Kalimah',
  partnerOne: 'Aysha',
  partnerTwo: 'Kalimah',
  eventSubtitle: 'Nikah Celebration & Reception',
  weddingDate: '2026-12-11T13:00:00',
  timeRange: '13:00 to 17:00 (1:00 PM – 5:00 PM)',
  bismillahText: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  duaText: 'بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ',
  tagline: '“And among His signs is that He created for you mates from among yourselves that you may dwell in tranquility with them; and He has put love and mercy between your hearts.” (Surah Ar-Rum 30:21)',
  rsvpPhone: '+255 769285957',
  rsvpEmail: 'shamsamwamba15@gmail.com',
  ceremonyVenue: {
    name: 'Ubungo Plaza, Hall A',
    address: 'Morogoro Road, Ubungo, Dar es Salaam, Tanzania',
    time: '13:00 to 14:15',
    notes: 'Arrival commences at 13:00. Secured private parking available within Ubungo Plaza basement & exterior courtyard.',
  },
  receptionVenue: {
    name: 'The Emerald Banquet Hall, Ubungo Plaza A',
    address: 'Morogoro Road, Ubungo, Dar es Salaam, Tanzania',
    time: '14:15 to 17:00',
    notes: 'Directly adjoining Hall A. Sumptuous Halal banquet, Arabic coffee, and family celebrations.',
  },
  dressCode: 'Elegant Modest & Traditional Celebration (Sage Green, Emerald, Gold & Ivory tones. Kanzu, Abaya, Boubou or Modest Formal)',
  adminPin: 'bloom2026',
};

export const DEFAULT_SCHEDULE: ScheduleEvent[] = [
  {
    id: 'sch-1',
    time: '13:00 - 13:30',
    title: 'GUEST ARRIVAL & WELCOME',
    location: 'Ubungo Plaza Hall A',
    description: 'Welcome hospitality with spiced Swahili tea, Arabic kahwa, and medjool dates.',
    iconName: 'GlassWater',
  },
  {
    id: 'sch-2',
    time: '13:30 - 14:15',
    title: 'NIKAH SOLEMNIZATION',
    location: 'Ubungo Plaza Hall A',
    description: 'Quran recitation, Khutbah al-Nikah, and solemn exchange of vows and rings.',
    iconName: 'Heart',
  },
  {
    id: 'sch-3',
    time: '14:15 - 14:45',
    title: 'FAMILY BLESSINGS & PHOTOS',
    location: 'Ubungo Plaza Courtyard',
    description: 'Du’a prayers, golden hour family portraiture, and joyous greetings.',
    iconName: 'Camera',
  },
  {
    id: 'sch-4',
    time: '14:45 - 16:00',
    title: 'ROYAL WEDDING FEAST',
    location: 'Emerald Banquet Hall',
    description: 'Dar es Salaam spiced lamb biryani, aromatic chicken pilau, and sweet delicacies.',
    iconName: 'Utensils',
  },
  {
    id: 'sch-5',
    time: '16:00 - 16:30',
    title: 'TRADITIONAL NASHEED & JOY',
    location: 'Emerald Banquet Hall',
    description: 'Uplifting celebratory nasheeds, joyful poetry, and heartfelt family congratulations.',
    iconName: 'Music',
  },
  {
    id: 'sch-6',
    time: '16:30 - 16:45',
    title: 'CAKE CUTTING & DU’A',
    location: 'Emerald Banquet Hall',
    description: 'Ceremonial cutting of the honey & pistachio wedding cake with closing du’a.',
    iconName: 'Cake',
  },
  {
    id: 'sch-7',
    time: '16:45 - 17:00',
    title: 'GRAND FAREWELL',
    location: 'Grand Entrance Courtyard',
    description: 'Sweet gift favors, farewell prayers, and grand send-off for the newlyweds.',
    iconName: 'Car',
  },
];

export const DEFAULT_GUESTS: GuestRsvp[] = [
  {
    id: 'guest-1',
    fullName: 'Shamsa Mwamba',
    email: 'shamsamwamba15@gmail.com',
    phone: '+255 769285957',
    status: 'accepted',
    plusOne: true,
    plusOneName: 'Juma Mwamba',
    mealChoice: 'lamb_biryani',
    dietaryRestrictions: 'Halal',
    songRequest: 'Maher Zain - For the Rest of My Life (Nasheed Instrumental)',
    message: 'Mabrouk Aysha and Kalimah! May Allah SWT grant your marriage abundant barakah, boundless joy, and endless love.',
    submittedAt: '2026-10-10T14:22:00',
    tableNumber: 1,
  },
  {
    id: 'guest-2',
    fullName: 'Fatima Al-Harthy',
    email: 'fatima.harthy@example.com',
    phone: '+255 712 345 678',
    status: 'accepted',
    plusOne: true,
    plusOneName: 'Tariq Al-Harthy',
    mealChoice: 'swahili_pilau',
    dietaryRestrictions: 'Halal',
    songRequest: 'Sami Yusuf - Nasimi (Acoustic Oud)',
    message: 'SubhanAllah! Beautiful couple. May Allah bless your home with peace and rahmah.',
    submittedAt: '2026-10-12T09:15:00',
    tableNumber: 1,
  },
  {
    id: 'guest-3',
    fullName: 'Rashid Bakari',
    email: 'rashid.bakari@example.com',
    phone: '+255 784 112 233',
    status: 'accepted',
    plusOne: false,
    mealChoice: 'grilled_fish',
    dietaryRestrictions: 'Gluten conscious',
    songRequest: 'Barakallah Lakuma - Soft Harp',
    message: 'So honored to witness your sacred Nikah at Ubungo Plaza. Looking forward to celebrating with the family!',
    submittedAt: '2026-10-15T18:40:00',
    tableNumber: 2,
  },
  {
    id: 'guest-4',
    fullName: 'Zainab & Omar Khamis',
    email: 'zainab.k@example.com',
    phone: '+255 754 998 877',
    status: 'accepted',
    plusOne: true,
    plusOneName: 'Omar Khamis',
    mealChoice: 'lamb_biryani',
    dietaryRestrictions: 'None',
    message: 'Alf Mabrouk! We will travel from Arusha to be right there with you both.',
    submittedAt: '2026-10-18T16:50:00',
    tableNumber: 2,
  },
  {
    id: 'guest-5',
    fullName: 'Dr. Amina Said',
    email: 'amina.said@example.com',
    phone: '+255 762 554 433',
    status: 'pending',
    plusOne: false,
    mealChoice: 'vegetarian',
    submittedAt: '2026-10-01T10:00:00',
  },
];

export const DEFAULT_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Sunset over Dar es Salaam Bay',
    category: 'engagement',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    caption: 'Walking together along the shores of Masaki, Dar es Salaam.',
    author: 'Kalimah & Aysha',
    likes: 58,
    uploadedAt: '2026-09-01',
    featured: true,
  },
  {
    id: 'photo-2',
    title: 'Emerald & Gold Arabesque Styling',
    category: 'venues',
    url: 'https://images.unsplash.com/photo-1519225438848-181585800ec4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Soft sage silks, olive garlands, and antique brass lanterns prepared for Ubungo Plaza Hall A.',
    author: 'Event Stylist',
    likes: 47,
    uploadedAt: '2026-09-05',
    featured: true,
  },
  {
    id: 'photo-3',
    title: 'Intricate Bridal Henna (Mehendi)',
    category: 'moments',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    caption: 'Delicate floral and geometric henna patterns adorned with cloves and rosewater.',
    author: 'Henna Artist',
    likes: 64,
    uploadedAt: '2026-09-12',
    featured: true,
  },
  {
    id: 'photo-4',
    title: 'The Sacred Exchange of Rings',
    category: 'engagement',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1200&q=80',
    caption: 'Gold bands inlaid with natural emerald, representing eternal growth and harmony.',
    author: 'Jeweler Archive',
    likes: 52,
    uploadedAt: '2026-09-18',
  },
  {
    id: 'photo-5',
    title: 'Oyster Bay Villa Gardens',
    category: 'moments',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    caption: 'Carved Arabesque wooden doors and blooming bougainvillea in Masaki, Dar es Salaam.',
    author: 'Aysha',
    likes: 39,
    uploadedAt: '2026-09-20',
  },
  {
    id: 'photo-6',
    title: 'Aromatic Spices & Spiced Tea',
    category: 'venues',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Tanzanian cinnamon, cardamom pods, and saffron ready for our cherished guests.',
    author: 'Catering Team',
    likes: 33,
    uploadedAt: '2026-10-02',
  },
];

export const DEFAULT_REGISTRY: RegistryItem[] = [
  {
    id: 'reg-1',
    title: 'Sadaqah Jariyah: Community Clean Water Well',
    category: 'charity',
    description: 'In honor of our marriage, help us build a solar-powered water well for rural villages in coastal Tanzania.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f8?auto=format&fit=crop&w=800&q=80',
    targetAmount: 2500,
    currentAmount: 1950,
    storeName: 'Islamic Relief Tanzania',
    featured: true,
  },
  {
    id: 'reg-2',
    title: 'Dar es Salaam Coastal Retreat & Spa Sanctuary',
    category: 'honeymoon',
    description: 'A tranquil oceanfront stay along the serene coastline of Dar es Salaam and relaxing spa experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    targetAmount: 1800,
    currentAmount: 1350,
    featured: true,
  },
  {
    id: 'reg-3',
    title: 'Handcrafted Tanzanian Teak & Brass Dallah Set',
    category: 'home',
    description: 'Traditional carved coffee dallah, brass incense burner (Mabkhara), and handmade ceramic finjan cups.',
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    targetAmount: 450,
    currentAmount: 450,
    storeName: 'Dar Artisan Collective',
  },
  {
    id: 'reg-4',
    title: 'Serengeti Safari & Stargazing Experience',
    category: 'experience',
    description: 'A weekend journey through Tanzania’s breathtaking wildlife plains and endless skies.',
    imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    targetAmount: 1200,
    currentAmount: 850,
  },
  {
    id: 'reg-5',
    title: 'Orphan Education & Nourishment Fund',
    category: 'charity',
    description: 'Educational books, uniforms, and nutritious meals for youth in Dar es Salaam.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    targetAmount: 1500,
    currentAmount: 1100,
  },
  {
    id: 'reg-6',
    title: 'Pure Linen Dining & Arabesque Table Runner',
    category: 'home',
    description: 'Forest green organic linens with subtle gold thread embroidery for family gatherings.',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?auto=format&fit=crop&w=800&q=80',
    targetAmount: 380,
    currentAmount: 260,
  },
];

export const DEFAULT_STORY_MILESTONES: StoryMilestone[] = [
  {
    year: '2022',
    title: 'Destined Encounter in Dar es Salaam',
    description: 'Introduced by mutual family elders during a warm community gathering in Upanga, united by shared values and mutual respect.',
    location: 'Dar es Salaam, Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2024',
    title: 'Oyster Bay Shores & Deepening Bonds',
    description: 'Walking beneath the swaying coastal palms of Masaki and watching the ocean dhows across the Dar es Salaam horizon.',
    location: 'Oyster Bay, Dar es Salaam',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2025',
    title: 'The Khitbah & Family Blessing',
    description: 'With the joy and prayers of both families, hands were formally joined in Khitbah and hearts committed towards marriage.',
    location: 'Dar es Salaam, Tanzania',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
  },
  {
    year: '2026',
    title: 'The Sacred Nikah Celebration',
    description: 'On Friday, 11th December 2026 at Ubungo Plaza A, completing half of our deen surrounded by the love of our community.',
    location: 'Ubungo Plaza A, Dar es Salaam',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
];

// Helper functions for reading & writing to storage
export const WeddingStorage = {
  getEventDetails(): EventDetails {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENT_DETAILS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.EVENT_DETAILS, JSON.stringify(DEFAULT_EVENT_DETAILS));
        return DEFAULT_EVENT_DETAILS;
      }
      return { ...DEFAULT_EVENT_DETAILS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_EVENT_DETAILS;
    }
  },

  saveEventDetails(details: EventDetails): void {
    localStorage.setItem(STORAGE_KEYS.EVENT_DETAILS, JSON.stringify(details));
    window.dispatchEvent(new CustomEvent('wedding_event_details_updated', { detail: details }));
  },

  getGuests(): GuestRsvp[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GUESTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(DEFAULT_GUESTS));
        return DEFAULT_GUESTS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_GUESTS;
    }
  },

  saveGuests(guests: GuestRsvp[]): void {
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(guests));
    window.dispatchEvent(new CustomEvent('wedding_guests_updated', { detail: guests }));
  },

  addOrUpdateGuest(rsvp: Omit<GuestRsvp, 'id' | 'submittedAt'> & { id?: string }): GuestRsvp {
    const guests = this.getGuests();
    const existingIndex = rsvp.id ? guests.findIndex((g) => g.id === rsvp.id) : guests.findIndex((g) => g.email.toLowerCase() === rsvp.email.toLowerCase());

    const now = new Date().toISOString();
    let savedGuest: GuestRsvp;

    if (existingIndex >= 0) {
      savedGuest = {
        ...guests[existingIndex],
        ...rsvp,
        submittedAt: now,
      };
      guests[existingIndex] = savedGuest;
    } else {
      savedGuest = {
        id: 'guest-' + Date.now(),
        ...rsvp,
        submittedAt: now,
      };
      guests.unshift(savedGuest);
    }

    this.saveGuests(guests);
    return savedGuest;
  },

  deleteGuest(id: string): void {
    const guests = this.getGuests().filter((g) => g.id !== id);
    this.saveGuests(guests);
  },

  getGallery(): GalleryPhoto[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_PHOTOS));
        return DEFAULT_PHOTOS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PHOTOS;
    }
  },

  saveGallery(photos: GalleryPhoto[]): void {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(photos));
    window.dispatchEvent(new CustomEvent('wedding_gallery_updated', { detail: photos }));
  },

  addPhoto(photo: Omit<GalleryPhoto, 'id' | 'uploadedAt' | 'likes'>): GalleryPhoto {
    const photos = this.getGallery();
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: 'photo-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
      likes: 0,
    };
    photos.unshift(newPhoto);
    this.saveGallery(photos);
    return newPhoto;
  },

  likePhoto(id: string): void {
    const photos = this.getGallery();
    const p = photos.find((item) => item.id === id);
    if (p) {
      p.likes = (p.likes || 0) + 1;
      this.saveGallery(photos);
    }
  },

  deletePhoto(id: string): void {
    const photos = this.getGallery().filter((p) => p.id !== id);
    this.saveGallery(photos);
  },

  getRegistry(): RegistryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRY);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.REGISTRY, JSON.stringify(DEFAULT_REGISTRY));
        return DEFAULT_REGISTRY;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_REGISTRY;
    }
  },

  saveRegistry(items: RegistryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.REGISTRY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('wedding_registry_updated', { detail: items }));
  },

  contributeToRegistry(id: string, amount: number): RegistryItem | null {
    const items = this.getRegistry();
    const item = items.find((i) => i.id === id);
    if (!item) return null;
    item.currentAmount = Math.min(item.targetAmount, item.currentAmount + amount);
    this.saveRegistry(items);
    return item;
  },

  resetAllData(): void {
    localStorage.setItem(STORAGE_KEYS.EVENT_DETAILS, JSON.stringify(DEFAULT_EVENT_DETAILS));
    localStorage.setItem(STORAGE_KEYS.GUESTS, JSON.stringify(DEFAULT_GUESTS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(DEFAULT_PHOTOS));
    localStorage.setItem(STORAGE_KEYS.REGISTRY, JSON.stringify(DEFAULT_REGISTRY));
    window.dispatchEvent(new CustomEvent('wedding_all_reset'));
  },

  exportGuestsCsv(): string {
    const guests = this.getGuests();
    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'Status',
      'Plus One',
      'Plus One Name',
      'Meal Choice',
      'Dietary Restrictions',
      'Song / Nasheed Request',
      'Blessing Message',
      'Table',
      'Submitted At',
    ];

    const rows = guests.map((g) => [
      `"${g.id}"`,
      `"${g.fullName.replace(/"/g, '""')}"`,
      `"${g.email.replace(/"/g, '""')}"`,
      `"${(g.phone || '').replace(/"/g, '""')}"`,
      `"${g.status}"`,
      `"${g.plusOne ? 'Yes' : 'No'}"`,
      `"${(g.plusOneName || '').replace(/"/g, '""')}"`,
      `"${g.mealChoice}"`,
      `"${(g.dietaryRestrictions || '').replace(/"/g, '""')}"`,
      `"${(g.songRequest || '').replace(/"/g, '""')}"`,
      `"${(g.message || '').replace(/"/g, '""')}"`,
      `"${g.tableNumber || '-'}"`,
      `"${g.submittedAt}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
