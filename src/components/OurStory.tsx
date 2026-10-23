import React from 'react';
import { Heart, MapPin } from 'lucide-react';
import { DEFAULT_STORY_MILESTONES } from '../services/storage';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-arabic text-3xl sm:text-4xl text-[#768e77] block mb-2">رحلتنا المباركة</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1d2c20] font-normal mb-3">
          Our Story of Destiny & Grace
        </h2>
        <div className="w-16 h-0.5 bg-[#d7c6a9] mx-auto mb-4" />
        <p className="text-[#587059] text-sm sm:text-base font-light">
          From family blessings in Upanga to serene evening walks along the Dar es Salaam coast, walking together toward completing half our deen.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="relative">
        {/* Central connecting line for desktop */}
        <div className="hidden md:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-[#d7c6a9] to-transparent" />

        <div className="space-y-12 md:space-y-20">
          {DEFAULT_STORY_MILESTONES.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={milestone.title}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image side */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative group max-w-md w-full overflow-hidden rounded-3xl border border-[#d7c6a9] shadow-lg bg-[#ffffff]">
                    <img
                      src={milestone.imageUrl}
                      alt={milestone.title}
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1d2c20]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 text-[#f5efe3]">
                        <MapPin className="w-3.5 h-3.5 text-[#d7c6a9]" />
                        {milestone.location}
                      </span>
                      <span className="font-serif font-bold text-[#f5efe3] text-base">{milestone.year}</span>
                    </div>
                  </div>
                </div>

                {/* Center marker on desktop */}
                <div className="hidden md:flex items-center justify-center relative z-20">
                  <div className="w-10 h-10 rounded-full border border-[#d7c6a9] bg-[#f5efe3] flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 text-[#768e77] fill-[#768e77]/20" />
                  </div>
                </div>

                {/* Content side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <div className={`max-w-md ${isEven ? 'md:ml-auto md:text-right' : 'md:mr-auto'}`}>
                    <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#768e77] block mb-1">
                      {milestone.year}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1d2c20] font-medium mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-[#4a5e4e] text-sm sm:text-base leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
