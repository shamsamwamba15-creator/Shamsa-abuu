import React from 'react';
import { Lock, Phone, Mail } from 'lucide-react';
import { EventDetails } from '../types/wedding';

interface FooterProps {
  eventDetails: EventDetails;
  onOpenAdmin: () => void;
  onOpenRsvp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ eventDetails, onOpenAdmin, onOpenRsvp }) => {
  return (
    <footer className="relative z-10 border-t border-[#d7c6a9] bg-[#f5efe3] pt-16 pb-12 px-4 text-[#1d2c20]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Monogram Crest */}
        <div className="w-14 h-14 rounded-full border border-[#d7c6a9] flex items-center justify-center bg-[#ffffff] mb-6 shadow-md">
          <span className="font-serif text-[#768e77] text-xl font-semibold tracking-widest">A&K</span>
        </div>

        {/* Sacred Arabic Du'a */}
        <div className="mb-4">
          <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#768e77] leading-relaxed">
            {eventDetails.duaText}
          </p>
          <p className="text-[#587059] text-xs max-w-lg mx-auto font-light mt-1 italic">
            “May Allah bless you both, shower His blessings upon you, and unite you in goodness.”
          </p>
        </div>

        {/* Couple Names */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#1d2c20] font-normal mb-2 mt-4">
          {eventDetails.coupleNames}
        </h3>
        <p className="text-[11px] uppercase tracking-widest text-[#768e77] mb-2 font-semibold">
          Nikah Celebration & Reception • Soft Sage & Champagne
        </p>

        <p className="text-[#587059] text-xs uppercase tracking-widest mb-6">
          11th December 2026 • 13:00 to 17:00 • Ubungo Plaza A, Dar es Salaam, Tanzania
        </p>

        {/* Contact info in footer */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#2e4031] mb-8 bg-[#ffffff] px-5 py-2.5 rounded-2xl border border-[#d7c6a9] shadow-sm">
          <span className="text-[#768e77] font-semibold">RSVP Contact:</span>
          <a href="tel:+255769285957" className="hover:text-[#768e77] transition flex items-center gap-1 font-medium">
            <Phone className="w-3.5 h-3.5 text-[#768e77]" />
            <span>+255 769285957</span>
          </a>
          <span className="text-[#bcc8bc]">•</span>
          <a href="mailto:shamsamwamba15@gmail.com" className="hover:text-[#768e77] transition flex items-center gap-1 font-medium">
            <Mail className="w-3.5 h-3.5 text-[#768e77]" />
            <span>shamsamwamba15@gmail.com</span>
          </a>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#587059] mb-10 font-medium">
          <a href="#hero" className="hover:text-[#768e77] transition">Home</a>
          <a href="#countdown" className="hover:text-[#768e77] transition">Countdown</a>
          <a href="#story" className="hover:text-[#768e77] transition">Our Story</a>
          <a href="#schedule" className="hover:text-[#768e77] transition">Itinerary</a>
          <a href="#gallery" className="hover:text-[#768e77] transition">Gallery</a>
          <a href="#registry" className="hover:text-[#768e77] transition">Sadaqah & Registry</a>
          <button
            type="button"
            onClick={onOpenRsvp}
            className="hover:text-[#768e77] transition cursor-pointer text-[#1d2c20] font-semibold"
          >
            Submit RSVP
          </button>
        </div>

        {/* Admin Portal & Copyright */}
        <div className="pt-6 border-t border-[#d7c6a9]/80 w-full flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#587059] gap-3">
          <p>© 2026 {eventDetails.coupleNames}. All blessings reserved.</p>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 hover:text-[#1d2c20] transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#768e77]" />
            <span>Admin Portal (Passcode: bloom2026)</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
