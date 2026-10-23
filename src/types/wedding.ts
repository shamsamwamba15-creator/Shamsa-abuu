export interface GuestRsvp {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: 'accepted' | 'declined' | 'pending';
  plusOne: boolean;
  plusOneName?: string;
  mealChoice: 'lamb_biryani' | 'swahili_pilau' | 'grilled_fish' | 'vegetarian' | 'kids';
  dietaryRestrictions?: string;
  songRequest?: string;
  message?: string;
  submittedAt: string;
  tableNumber?: number;
}

export interface EventDetails {
  coupleNames: string;
  partnerOne: string;
  partnerTwo: string;
  eventSubtitle: string;
  weddingDate: string; // ISO string e.g. "2026-12-11T13:00:00"
  timeRange: string; // "13:00 to 17:00"
  tagline: string;
  bismillahText: string;
  duaText: string;
  rsvpPhone: string;
  rsvpEmail: string;
  ceremonyVenue: {
    name: string;
    address: string;
    time: string;
    notes: string;
  };
  receptionVenue: {
    name: string;
    address: string;
    time: string;
    notes: string;
  };
  dressCode: string;
  adminPin: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  iconName: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'engagement' | 'moments' | 'venues' | 'guests';
  url: string;
  caption: string;
  author?: string;
  likes: number;
  uploadedAt: string;
  featured?: boolean;
}

export interface RegistryItem {
  id: string;
  title: string;
  category: 'honeymoon' | 'home' | 'experience' | 'charity';
  description: string;
  imageUrl: string;
  targetAmount: number;
  currentAmount: number;
  externalLink?: string;
  storeName?: string;
  featured?: boolean;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
}
