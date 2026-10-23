import React, { useState, useEffect } from 'react';
import { Heart, Lock, Menu, X, Volume2, Music } from 'lucide-react';
import { weddingAudio } from '../services/audioPlayer';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenRsvp: () => void;
  coupleNames: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenRsvp, coupleNames }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioState, setAudioState] = useState(weddingAudio.getState());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = weddingAudio.subscribe((state) => {
      setAudioState(weddingAudio.getState());
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { label: 'Countdown', href: '#countdown' },
    { label: 'Our Story', href: '#story' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Galleries', href: '#gallery' },
    { label: 'Sadaqah & Registry', href: '#registry' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbf8f2]/90 backdrop-blur-md border-b border-[#d7c6a9]/60 py-3 shadow-md shadow-[#768e77]/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Crest / Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full border border-[#d7c6a9] flex items-center justify-center bg-[#f5efe3] group-hover:border-[#768e77] transition shadow-sm">
            <span className="font-serif text-[#768e77] text-sm font-semibold tracking-wider">A&K</span>
          </div>
          <div>
            <span className="font-serif text-lg tracking-wide text-[#1d2c20] group-hover:text-[#768e77] transition hidden sm:inline-block font-medium">
              {coupleNames || 'Aysha & Kalimah'}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#768e77] block -mt-1 hidden sm:block font-medium">
              Nikah Celebration
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-widest uppercase text-[#2e4031] hover:text-[#768e77] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#768e77] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Music Quick Toggle */}
          <button
            type="button"
            onClick={() => weddingAudio.togglePlay()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f4efe3] hover:bg-[#e5ece5] border border-[#d7c6a9] text-[#1d2c20] text-xs transition cursor-pointer shadow-sm"
            title={audioState.isPlaying ? 'Pause background melody' : 'Play peaceful Nikah melody'}
          >
            {audioState.isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#768e77] animate-pulse" />
                <span className="hidden lg:inline text-[11px] text-[#587059] font-medium">Melody Playing</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-[#768e77]" />
                <span className="hidden lg:inline text-[11px] text-[#587059]">Play Melody</span>
              </>
            )}
          </button>

          {/* Direct RSVP Button */}
          <button
            type="button"
            onClick={onOpenRsvp}
            className="bg-[#768e77] hover:bg-[#587059] text-white font-medium text-xs sm:text-sm px-4 py-1.5 sm:py-2 rounded-full hover:shadow-[0_4px_14px_rgba(118,142,119,0.35)] transition cursor-pointer flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-[#d7c6a9] text-[#d7c6a9]" />
            <span>RSVP</span>
          </button>

          {/* Admin Dashboard Entry */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="p-1.5 sm:p-2 rounded-full border border-[#d7c6a9] bg-[#f5efe3] hover:bg-[#e5ece5] text-[#587059] hover:text-[#1d2c20] transition cursor-pointer shadow-sm"
            title="Admin Dashboard (Manage Guests, Event Details, CSV Export)"
          >
            <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#1d2c20] hover:text-[#768e77]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbf8f2] border-b border-[#d7c6a9] px-6 py-5 mt-2 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-serif text-[#1d2c20] hover:text-[#768e77] py-1 border-b border-[#e5ece5]"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRsvp();
              }}
              className="flex-1 bg-[#768e77] text-white font-medium py-2.5 rounded-lg text-center"
            >
              Submit RSVP
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-3 border border-[#d7c6a9] rounded-lg text-[#587059] flex items-center justify-center gap-1.5 bg-[#f5efe3]"
            >
              <Lock className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
