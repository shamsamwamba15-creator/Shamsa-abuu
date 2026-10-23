import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Heart, Download, Sparkles, Phone, Mail } from 'lucide-react';
import { EventDetails } from '../types/wedding';

interface HeroCountdownProps {
  eventDetails: EventDetails;
  onOpenRsvp: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ eventDetails, onOpenRsvp }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(eventDetails.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [eventDetails.weddingDate]);

  const formattedDate = 'Friday, 11th December 2026';

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${eventDetails.coupleNames} - Nikah Celebration`);
    const details = encodeURIComponent(
      `Celebrating the sacred Nikah of ${eventDetails.coupleNames}.\nTime: 13:00 to 17:00 (1:00 PM – 5:00 PM)\nVenue: ${eventDetails.ceremonyVenue.name}, ${eventDetails.ceremonyVenue.address}\nRSVP: ${eventDetails.rsvpPhone} | ${eventDetails.rsvpEmail}`
    );
    const location = encodeURIComponent(`${eventDetails.ceremonyVenue.name}, ${eventDetails.ceremonyVenue.address}`);

    const startDate = new Date('2026-12-11T13:00:00+03:00');
    const endDate = new Date('2026-12-11T17:00:00+03:00');

    const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const dates = `${fmt(startDate)}/${fmt(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  const downloadIcsFile = () => {
    const startDate = new Date('2026-12-11T13:00:00+03:00');
    const endDate = new Date('2026-12-11T17:00:00+03:00');
    const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aysha & Kalimah Nikah//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@nikah.ayshakalimah.tz`,
      `DTSTAMP:${fmt(new Date())}`,
      `DTSTART:${fmt(startDate)}`,
      `DTEND:${fmt(endDate)}`,
      `SUMMARY:Nikah Celebration: ${eventDetails.coupleNames}`,
      `DESCRIPTION:Join us for the blessed Nikah ceremony and reception of Aysha and Kalimah at Ubungo Plaza A, Dar es Salaam. RSVP to +255 769285957 / shamsamwamba15@gmail.com.`,
      `LOCATION:${eventDetails.ceremonyVenue.name}\\, ${eventDetails.ceremonyVenue.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nikah_Aysha_and_Kalimah_Dec2026.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowCalendarMenu(false);
  };

  return (
    <section id="hero" className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Sacred Bismillah Calligraphy in Soft Champagne */}
        <div className="mb-4">
          <p className="font-arabic text-3xl sm:text-4xl md:text-5xl text-[#768e77] tracking-wider leading-relaxed">
            {eventDetails.bismillahText}
          </p>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#587059] font-medium block mt-1">
            In the Name of Allah, the Most Gracious, the Most Merciful
          </span>
        </div>

        {/* Soft Sage & Champagne Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#bcc8bc] bg-[#f0f4f0]/90 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a976]" />
          <span className="font-serif italic text-sm text-[#587059] tracking-wide">
            The Sacred Nikah Celebration • Soft. Elegant. Timeless.
          </span>
        </div>

        {/* Couple Names Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-[#1d2c20] mb-3 leading-[1.06]">
          <span className="block">{eventDetails.partnerOne}</span>
          <span className="font-script text-4xl sm:text-6xl text-[#c5a976] -my-2 block">&</span>
          <span className="block">{eventDetails.partnerTwo}</span>
        </h1>

        {/* Quranic Tagline */}
        <p className="text-[#4a5e4e] font-sans text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-light mb-8 italic leading-relaxed px-2">
          {eventDetails.tagline}
        </p>

        {/* Date, Time & Location Badges in Soft Ivory and Champagne */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-[#1d2c20] mb-10">
          <div className="flex items-center gap-2 bg-[#ffffff]/90 border border-[#d7c6a9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
            <Calendar className="w-4 h-4 text-[#768e77]" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 bg-[#ffffff]/90 border border-[#d7c6a9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
            <Clock className="w-4 h-4 text-[#768e77]" />
            <span className="font-medium">13:00 to 17:00 EAT</span>
          </div>
          <div className="flex items-center gap-2 bg-[#ffffff]/90 border border-[#d7c6a9] px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">
            <MapPin className="w-4 h-4 text-[#768e77]" />
            <span className="font-medium">Ubungo Plaza A, Dar es Salaam</span>
          </div>
        </div>

        {/* Personalized Countdown Timer Container in Soft Ivory & Champagne */}
        <div id="countdown" className="w-full max-w-2xl bg-[#ffffff]/95 border border-[#d7c6a9] rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl mb-8 relative overflow-hidden">
          {/* Champagne gold top line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#c5a976] to-transparent" />

          <div className="flex items-center justify-center gap-2 mb-4 text-[#768e77]">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold">
              {timeLeft.isPast ? 'The Celebration Has Begun' : 'Countdown to the Sacred Nikah'}
            </span>
          </div>

          {timeLeft.isPast ? (
            <div className="py-6">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1d2c20] mb-2">Alhamdulillah, Today Is The Day!</h3>
              <p className="text-[#587059] text-sm">We warmly welcome our beloved family and friends to Ubungo Plaza Hall A.</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 my-2">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-[#f8faf8] border border-[#bcc8bc] rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#768e77] transition shadow-sm"
                >
                  <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-[#1d2c20] tracking-tight group-hover:text-[#768e77] transition">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#587059] mt-1 font-medium">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-6 border-t border-[#f0f4f0] mt-6">
            <button
              type="button"
              onClick={onOpenRsvp}
              className="bg-[#768e77] hover:bg-[#587059] text-white font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex items-center gap-2 text-sm"
            >
              <Heart className="w-4 h-4 fill-[#d7c6a9] text-[#d7c6a9]" />
              <span>RSVP For the Nikah</span>
            </button>

            {/* Add to Calendar button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                className="bg-[#f5efe3] hover:bg-[#e5ece5] border border-[#d7c6a9] text-[#1d2c20] font-medium px-5 py-2.5 rounded-full transition cursor-pointer flex items-center gap-2 text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#768e77]" />
                <span>Save to Calendar</span>
              </button>

              {showCalendarMenu && (
                <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-60 bg-[#ffffff] border border-[#d7c6a9] rounded-2xl shadow-xl p-2 z-30 animate-in fade-in slide-in-from-bottom-2 text-left">
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalendarMenu(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs text-[#1d2c20] hover:bg-[#f5efe3] rounded-xl transition"
                  >
                    <span>Google Calendar</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a976]" />
                  </a>
                  <button
                    type="button"
                    onClick={downloadIcsFile}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-[#1d2c20] hover:bg-[#f5efe3] rounded-xl transition cursor-pointer text-left"
                  >
                    <span>Apple / Outlook (.ics)</span>
                    <Download className="w-3.5 h-3.5 text-[#768e77]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RSVP Contact Details Direct Highlight */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#2e4031] bg-[#ffffff]/90 border border-[#d7c6a9] rounded-2xl px-5 py-2.5 backdrop-blur-sm max-w-xl shadow-sm">
          <span className="font-semibold text-[#768e77] uppercase tracking-wider text-[11px]">RSVP Enquiries:</span>
          <a
            href={`tel:${eventDetails.rsvpPhone}`}
            className="flex items-center gap-1.5 hover:text-[#768e77] transition font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-[#768e77]" />
            <span>{eventDetails.rsvpPhone}</span>
          </a>
          <span className="text-[#bcc8bc]">•</span>
          <a
            href={`mailto:${eventDetails.rsvpEmail}`}
            className="flex items-center gap-1.5 hover:text-[#768e77] transition font-medium"
          >
            <Mail className="w-3.5 h-3.5 text-[#768e77]" />
            <span>{eventDetails.rsvpEmail}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
