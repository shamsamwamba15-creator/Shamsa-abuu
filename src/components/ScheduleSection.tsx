import React from 'react';
import { EventDetails } from '../types/wedding';
import { MapPin, Clock, Info, ExternalLink, Calendar } from 'lucide-react';

interface ScheduleSectionProps {
  eventDetails: EventDetails;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ eventDetails }) => {
  return (
    <section id="schedule" className="py-24 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="font-arabic text-3xl sm:text-4xl text-[#768e77] block mb-2">برنامج حفل النkاح</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1d2c20] font-normal mb-3">
          The Wedding Itinerary
        </h2>
        <div className="w-16 h-0.5 bg-[#d7c6a9] mx-auto mb-4" />
        <p className="text-[#587059] text-sm sm:text-base font-light">
          An orderly progression of sacred moments, communal celebration, and warm fellowship at Ubungo Plaza A, Dar es Salaam.
        </p>
      </div>

      {/* Stationery Wedding Card Container - Replicating Reference Design */}
      <div className="max-w-2xl mx-auto bg-[#faf6ee] rounded-3xl border border-[#dcd2be] shadow-[0_25px_60px_-15px_rgba(50,45,35,0.08)] p-6 sm:p-12 md:p-16 relative overflow-hidden">
        {/* Subtle linen paper watermark texture border */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-[#ece3d3] pointer-events-none" />

        {/* 1. Header: Names in Calligraphic Script */}
        <div className="text-center mb-10 sm:mb-12 relative z-10">
          <h3
            className="text-4xl sm:text-6xl text-[#1d2c20] font-normal tracking-wide mb-1"
            style={{ fontFamily: "'Alex Brush', cursive" }}
          >
            Aysha + Kalimah
          </h3>

          {/* Decorative Calligraphic Swirl Flourish Loops */}
          <div className="flex justify-center -mt-1 mb-3">
            <svg
              viewBox="0 0 320 60"
              className="w-56 sm:w-72 h-10 sm:h-12 text-[#1d2c20]/75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Left loop */}
              <path d="M 60 25 C 20 15, 10 35, 40 45 C 75 55, 110 20, 155 35" />
              {/* Right loop */}
              <path d="M 165 35 C 210 20, 245 55, 280 45 C 310 35, 300 15, 260 25" />
              {/* Center connecting flourish loop */}
              <path d="M 125 35 C 145 52, 175 52, 195 35 C 180 20, 140 20, 125 35 Z" />
            </svg>
          </div>

          {/* Date & Location Subtitle */}
          <p className="text-[11px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#1d2c20] font-semibold">
            DECEMBER 11TH, 2026 | UBUNGO PLAZA A, DAR ES SALAAM
          </p>
        </div>

        {/* 2. Vertical Timeline Container with Central Line and Alternating Events */}
        <div className="relative z-10 py-4">
          {/* Central Vertical Spine Line */}
          <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[1.5px] bg-[#1d2c20]" />

          <div className="space-y-12 sm:space-y-16">
            {/* ITEM 1: LEFT - GUEST ARRIVAL & WELCOME */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pr-2">
                {/* Clinking Glasses Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left Glass */}
                  <path d="M 24 16 L 31 32 C 32 35 28 39 25 39 L 20 39 C 17 39 13 35 14 32 L 21 16 Z" />
                  <path d="M 22.5 39 L 22.5 50" />
                  <path d="M 16 50 L 29 50" />
                  {/* Right Glass clinking */}
                  <path d="M 40 16 L 33 32 C 32 35 36 39 39 39 L 44 39 C 47 39 51 35 50 32 L 43 16 Z" />
                  <path d="M 41.5 39 L 41.5 50" />
                  <path d="M 35 50 L 48 50" />
                  {/* Sparkling bubbles */}
                  <circle cx="32" cy="14" r="1.5" fill="currentColor" />
                  <circle cx="28" cy="8" r="1" fill="currentColor" />
                  <circle cx="36" cy="9" r="1.2" fill="currentColor" />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  13:00 - 13:30
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  GUEST ARRIVAL
                </div>
              </div>

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Empty Spacer */}
              <div className="w-[44%]" />
            </div>

            {/* ITEM 2: RIGHT - CEREMONY & NIKAH */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Empty Spacer */}
              <div className="w-[44%]" />

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pl-2">
                {/* Interlocking Rings with Diamond Sparkle Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left Ring */}
                  <circle cx="25" cy="38" r="12" />
                  {/* Right Ring */}
                  <circle cx="39" cy="38" r="12" />
                  {/* Diamond Solitaire on Left Ring */}
                  <polygon points="25,18 20,24 30,24" />
                  {/* Sparkle rays */}
                  <line x1="25" y1="13" x2="25" y2="10" />
                  <line x1="20" y1="15" x2="17" y2="12" />
                  <line x1="30" y1="15" x2="33" y2="12" />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  13:30 - 14:15
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  NIKAH CEREMONY
                </div>
              </div>
            </div>

            {/* ITEM 3: LEFT - FAMILY & SUNSET PHOTOS */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pr-2">
                {/* Camera with Heart in Lens Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Camera body */}
                  <rect x="10" y="20" width="44" height="32" rx="5" />
                  {/* Top viewfinder bump */}
                  <path d="M 23 20 L 26 14 L 38 14 L 41 20 Z" />
                  {/* Shutter dot */}
                  <circle cx="47" cy="25" r="1.5" fill="currentColor" />
                  {/* Lens outer circle */}
                  <circle cx="32" cy="36" r="11" />
                  {/* Heart in center of lens */}
                  <path
                    d="M 32 39 C 30 36 27 34 27 32 C 27 30 29 29 30.5 30 C 31.5 30.7 32 31.5 32 31.5 C 32 31.5 32.5 30.7 33.5 30 C 35 29 37 30 37 32 C 37 34 34 36 32 39 Z"
                    fill="currentColor"
                  />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  14:15 - 14:45
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  FAMILY PHOTOS
                </div>
              </div>

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Empty Spacer */}
              <div className="w-[44%]" />
            </div>

            {/* ITEM 4: RIGHT - DINNER & FEAST */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Empty Spacer */}
              <div className="w-[44%]" />

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pl-2">
                {/* Plate with Folded Napkin Ring Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Outer Plate with beveled rim */}
                  <circle cx="32" cy="32" r="18" />
                  <circle cx="32" cy="32" r="14" strokeDasharray="2 2" />
                  {/* Vertical Folded Napkin */}
                  <path d="M 29 18 C 31 16 33 16 35 18 L 36 46 L 28 46 Z" />
                  {/* Napkin Ring */}
                  <rect x="27" y="30" width="10" height="4" rx="2" fill="currentColor" />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  14:45 - 16:00
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  ROYAL FEAST
                </div>
              </div>
            </div>

            {/* ITEM 5: LEFT - TRADITIONAL NASHEED & JOY */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pr-2">
                {/* Music Notes Line-art Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Musical note 1 */}
                  <ellipse cx="23" cy="45" rx="5" ry="3.5" transform="rotate(-20 23 45)" fill="currentColor" />
                  <path d="M 27 43 L 27 22" />
                  {/* Musical note 2 */}
                  <ellipse cx="43" cy="39" rx="5" ry="3.5" transform="rotate(-20 43 39)" fill="currentColor" />
                  <path d="M 47 37 L 47 16" />
                  {/* Connecting beam */}
                  <path d="M 27 22 L 47 16" strokeWidth="2.5" />
                  {/* Floating smaller notes/sparkles */}
                  <path d="M 16 26 L 16 20 C 16 18 19 18 20 20" />
                  <circle cx="14" cy="26" r="2" fill="currentColor" />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  16:00 - 16:30
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  NASHEED & JOY
                </div>
              </div>

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Empty Spacer */}
              <div className="w-[44%]" />
            </div>

            {/* ITEM 6: RIGHT - CAKE CUTTING */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Empty Spacer */}
              <div className="w-[44%]" />

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pl-2">
                {/* Tiered Wedding Cake with pearls & topper Icon */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Base plate */}
                  <line x1="12" y1="52" x2="52" y2="52" />
                  {/* Bottom Tier */}
                  <rect x="16" y="38" width="32" height="14" rx="2" />
                  {/* Bottom Tier pearl trim */}
                  <line x1="16" y1="50" x2="48" y2="50" strokeDasharray="3 3" />
                  {/* Top Tier */}
                  <rect x="22" y="24" width="20" height="14" rx="2" />
                  {/* Top Tier pearl trim */}
                  <line x1="22" y1="36" x2="42" y2="36" strokeDasharray="3 3" />
                  {/* Cake Topper (Two hearts/figures) */}
                  <circle cx="29" cy="18" r="2" fill="currentColor" />
                  <circle cx="35" cy="18" r="2" fill="currentColor" />
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  16:30 - 16:45
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  CAKE CUTTING
                </div>
              </div>
            </div>

            {/* ITEM 7: LEFT - GRAND EXIT */}
            <div className="relative flex items-center justify-between">
              {/* Left Side Content */}
              <div className="w-[44%] text-center flex flex-col items-center pr-2">
                {/* Vintage Getaway Car Icon with "JUST MARRIED" plate */}
                <svg
                  viewBox="0 0 64 64"
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#1d2c20] mb-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Car roof & body rear view */}
                  <path d="M 22 24 C 23 16 41 16 42 24 L 48 34 C 52 35 52 42 50 48 L 14 48 C 12 42 12 35 16 34 Z" />
                  {/* Rear window */}
                  <path d="M 24 24 C 25 20 39 20 40 24 L 43 32 L 21 32 Z" />
                  {/* Wheels */}
                  <rect x="12" y="44" width="5" height="10" rx="2" />
                  <rect x="47" y="44" width="5" height="10" rx="2" />
                  {/* Tail lights */}
                  <ellipse cx="18" cy="40" rx="2" ry="1.5" fill="currentColor" />
                  <ellipse cx="46" cy="40" rx="2" ry="1.5" fill="currentColor" />
                  {/* Hanging "JUST MARRIED" plate */}
                  <rect x="24" y="40" width="16" height="8" rx="1" fill="#faf6ee" />
                  <text
                    x="32"
                    y="45.5"
                    fontSize="3.2"
                    textAnchor="middle"
                    fill="currentColor"
                    stroke="none"
                    fontWeight="bold"
                    letterSpacing="0.2"
                  >
                    JUST MARRIED
                  </text>
                </svg>
                <div className="font-sans font-bold text-xs sm:text-sm text-[#1d2c20] tracking-wider uppercase mb-0.5">
                  16:45 - 17:00
                </div>
                <div className="text-[11px] sm:text-xs text-[#1d2c20] uppercase tracking-wider font-medium">
                  GRAND EXIT
                </div>
              </div>

              {/* Central Node Dot */}
              <div className="w-3.5 h-3.5 bg-[#1d2c20] rounded-full absolute left-1/2 -translate-x-1/2 shadow-sm ring-4 ring-[#faf6ee]" />

              {/* Right Side Empty Spacer */}
              <div className="w-[44%]" />
            </div>
          </div>
        </div>

        {/* Footer Note within Stationery Card */}
        <div className="mt-12 pt-6 border-t border-[#dcd2be]/70 text-center text-xs text-[#1d2c20]/75 tracking-wider font-light">
          Kindly arrive promptly at 13:00 to share in the opening du’a and welcome coffee.
        </div>
      </div>

      {/* Practical Venue Guide Cards (Hall A & Banquet Hall at Ubungo Plaza) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Ceremony Venue */}
        <div className="bg-[#ffffff]/90 border border-[#d7c6a9] hover:border-[#768e77] rounded-3xl p-6 sm:p-7 backdrop-blur-md transition shadow-md">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#768e77] block mb-1">
            Solemnization
          </span>
          <h3 className="font-serif text-2xl text-[#1d2c20] font-medium mb-3">
            {eventDetails.ceremonyVenue.name}
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-[#344837] mb-4">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#768e77] shrink-0" />
              <span>{eventDetails.ceremonyVenue.time}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#768e77] shrink-0 mt-0.5" />
              <span>{eventDetails.ceremonyVenue.address}</span>
            </p>
          </div>
          <div className="pt-3 border-t border-[#f0f4f0] text-xs text-[#587059] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#c5a976]" />
              {eventDetails.ceremonyVenue.notes}
            </span>
            <a
              href="https://maps.google.com/?q=Ubungo+Plaza+Dar+es+Salaam+Tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#768e77] hover:text-[#1d2c20] transition inline-flex items-center gap-1 font-medium underline underline-offset-4 shrink-0 ml-2"
            >
              <span>Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Reception Venue */}
        <div className="bg-[#ffffff]/90 border border-[#d7c6a9] hover:border-[#768e77] rounded-3xl p-6 sm:p-7 backdrop-blur-md transition shadow-md">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#768e77] block mb-1">
            Reception & Feast
          </span>
          <h3 className="font-serif text-2xl text-[#1d2c20] font-medium mb-3">
            {eventDetails.receptionVenue.name}
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-[#344837] mb-4">
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#768e77] shrink-0" />
              <span>{eventDetails.receptionVenue.time}</span>
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#768e77] shrink-0 mt-0.5" />
              <span>{eventDetails.receptionVenue.address}</span>
            </p>
          </div>
          <div className="pt-3 border-t border-[#f0f4f0] text-xs text-[#587059] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#c5a976]" />
              {eventDetails.receptionVenue.notes}
            </span>
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Aysha+%26+Kalimah+Nikah+Celebration&dates=20261211T100000Z/20261211T140000Z&details=Blessed+Nikah+Celebration+of+Aysha+and+Kalimah+at+Ubungo+Plaza+A,+Dar+es+Salaam,+Tanzania.&location=Ubungo+Plaza+A,+Dar+es+Salaam,+Tanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#768e77] hover:text-[#1d2c20] transition inline-flex items-center gap-1 font-medium underline underline-offset-4 shrink-0 ml-2"
            >
              <span>Add to Cal</span>
              <Calendar className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
