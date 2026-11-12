import React from 'react';
import { Compass, Flame, Leaf, Shield } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-[#140D09] text-[#FDFBF7] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C68B59]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Image with frame */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1F140D] border border-[#3A271B] shadow-2xl">
              <img
                src="/src/assets/images/craft_roastery_process_1794476077101.jpg"
                alt="Master coffee roaster artisan monitoring freshly roasted single-origin beans in custom cooling tray"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140D09]/80 via-transparent to-transparent" />
            </div>

            {/* Overlaid craft plaque */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-[#21160F] border border-[#443022] p-5 rounded-xl shadow-xl max-w-xs">
              <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-1">
                Roastery Benchmark
              </div>
              <p className="text-sm font-serif font-bold text-[#FDFBF7]">
                Small 12kg Drum Roasts
              </p>
              <p className="text-xs text-[#A8988B] mt-1">
                Custom thermal profiles ensuring no scorched beans and pure cup clarity.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
              About BREWORA
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-6 leading-tight">
              Crafting Coffee as a Form of Pure Art.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#C8BCB0] leading-relaxed">
              <p>
                Founded out of a deep reverence for the coffee cherry, BREWORA was born to redefine how
                people experience coffee. We reject industrialized bulk roasting and stale supermarket beans.
                Instead, we treat each harvest as a seasonal vintage.
              </p>
              <p>
                Our green beans are sourced through direct partnerships with high-altitude farming families in
                Colombia, Ethiopia, Guatemala, and Panama. By eliminating middlemen, farmers receive up to
                300% above Fair Trade minimums—fueling regenerative agriculture and pristine bean quality.
              </p>
              <p>
                Back in our roastery, our master Q-Graders cup and test each batch repeatedly, fine-tuning convection
                air temperatures to coax out notes of roasted hazelnuts, jasmine flowers, and melted chocolate.
              </p>
            </div>

            {/* Signature Pill-Free Proof Items */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#2C1F16]">
              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] tabular-nums">
                  87+
                </p>
                <p className="text-xs uppercase tracking-wider text-[#A8988B] mt-1">
                  Average SCA Cup Score
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-[#C68B59] tabular-nums">
                  100%
                </p>
                <p className="text-xs uppercase tracking-wider text-[#A8988B] mt-1">
                  Direct Trade Traceability
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
