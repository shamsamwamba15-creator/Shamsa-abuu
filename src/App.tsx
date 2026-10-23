import React, { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { HeroCountdown } from './components/HeroCountdown';
import { OurStory } from './components/OurStory';
import { ScheduleSection } from './components/ScheduleSection';
import { GallerySection } from './components/GallerySection';
import { RegistrySection } from './components/RegistrySection';
import { RsvpSection } from './components/RsvpSection';
import { MusicPlayerDock } from './components/MusicPlayerDock';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { WeddingStorage, DEFAULT_EVENT_DETAILS } from './services/storage';
import { EventDetails } from './types/wedding';

export default function App() {
  const [eventDetails, setEventDetails] = useState<EventDetails>(DEFAULT_EVENT_DETAILS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    // Load event details from storage
    const details = WeddingStorage.getEventDetails();
    setEventDetails(details);

    const handleUpdate = (e: CustomEvent<EventDetails>) => {
      if (e.detail) {
        setEventDetails(e.detail);
      } else {
        setEventDetails(WeddingStorage.getEventDetails());
      }
    };

    window.addEventListener('wedding_event_details_updated' as any, handleUpdate);
    window.addEventListener('wedding_all_reset', () => {
      setEventDetails(WeddingStorage.getEventDetails());
    });

    return () => {
      window.removeEventListener('wedding_event_details_updated' as any, handleUpdate);
    };
  }, []);

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#f8f7f5] overflow-x-hidden">
      {/* 1. Interactive Three.js 3D Background */}
      <ThreeBackground />

      {/* 2. Top Navigation Bar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRsvp={scrollToRsvp}
        coupleNames={eventDetails.coupleNames}
      />

      {/* 3. Main Sections */}
      <main className="relative z-10">
        {/* Hero & Countdown */}
        <HeroCountdown eventDetails={eventDetails} onOpenRsvp={scrollToRsvp} />

        {/* Our Love Story & Milestones */}
        <OurStory />

        {/* Schedule & Venues */}
        <ScheduleSection eventDetails={eventDetails} />

        {/* Categorized Photo Gallery with Lightbox & Upload */}
        <GallerySection />

        {/* Custom Registry & Wishing Well */}
        <RegistrySection />

        {/* Guest RSVP Tracking */}
        <RsvpSection onSuccess={() => {}} />
      </main>

      {/* 4. Docked Music Player */}
      <MusicPlayerDock />

      {/* 5. Footer */}
      <Footer
        eventDetails={eventDetails}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRsvp={scrollToRsvp}
      />

      {/* 6. Secure Admin Portal Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onEventDetailsChange={(updated) => setEventDetails(updated)}
      />
    </div>
  );
}
