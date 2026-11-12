import React from 'react';
import { ArrowDown, Sparkles, Award, Coffee, Clock } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStoryClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#120B08] text-[#FDFBF7] pt-20">
      {/* Background Hero Image with measured luxury contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_coffee_1794476074361.jpg"
          alt="Artisanal freshly brewed espresso with rich golden crema on a warm dark walnut table"
          className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.08] scale-105 transform animate-fade-in"
          referrerPolicy="no-referrer"
        />
        {/* Gradients to guarantee 4.5:1 text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120B08] via-[#120B08]/60 to-[#120B08]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#120B08]/40 to-[#120B08]/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Quiet Kicker */}
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
          <span>Artisanal Specialty Coffee</span>
          <span aria-hidden="true">·</span>
          <span>Single-Origin Reserve</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-[#FDFBF7] leading-[1.12] mb-6 max-w-4xl text-balance">
          Every Cup Tells a Story.
        </h1>

        {/* Brand Description */}
        <p className="text-base sm:text-lg md:text-xl text-[#E2D5C8] font-normal max-w-2xl leading-relaxed mb-10 text-balance">
          Sourced from volcanic soils at over 1,800 meters and hand-roasted in micro-batches.
          We obsess over every origin, roast curve, and extraction to bring you an extraordinary coffee ritual.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08] font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-black/40 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
          >
            Explore Coffee
          </button>
          
          <button
            type="button"
            onClick={onStoryClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1F150F]/80 hover:bg-[#2C1F16] border border-[#523B2B] hover:border-[#D4AF37]/60 text-[#FDFBF7] font-semibold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
          >
            Our Story
          </button>
        </div>

        {/* Clean 3-Pillar Proof Strip */}
        <div className="w-full max-w-3xl pt-8 border-t border-[#38261B]/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#251912] border border-[#3E2B1F] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A59283] font-medium">Standard</p>
              <p className="text-sm font-semibold text-[#FDFBF7]">Top 1% Arabica Lots</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#251912] border border-[#3E2B1F] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#C68B59]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A59283] font-medium">Freshness</p>
              <p className="text-sm font-semibold text-[#FDFBF7]">Roasted Within 48 Hours</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#251912] border border-[#3E2B1F] flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A59283] font-medium">Ethical</p>
              <p className="text-sm font-semibold text-[#FDFBF7]">Direct Farm Sourcing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
        <span className="text-[10px] tracking-widest uppercase text-[#A59283]">Scroll</span>
        <ArrowDown className="w-3.5 h-3.5 text-[#C68B59] animate-bounce" />
      </div>
    </section>
  );
};
