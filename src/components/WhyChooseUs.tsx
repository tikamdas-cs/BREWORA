import React from 'react';
import { Flame, ShieldCheck, Truck, Sparkles, Scale, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Flame,
      title: 'Micro-Batch Roasting',
      description:
        'We never roast in industrial mass drums. Each 12kg micro-batch follows bespoke roasting curves calibrated to atmospheric humidity and bean density.',
      highlight: 'Precision Thermal Profiles'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Trade Ethics',
      description:
        'We purchase directly from estate growers in Latin America and East Africa, paying up to 3x Fair Trade minimums to foster sustainable living and agroforestry.',
      highlight: '100% Traceable Lots'
    },
    {
      icon: Truck,
      title: '48-Hour Freshness Lock',
      description:
        'Your beans are roasted immediately upon order confirmation and dispatched in degassing valve pouches, arriving at peak flavor extraction window.',
      highlight: 'Fresh From the Drum'
    },
    {
      icon: Scale,
      title: 'Certified Q-Grader Tested',
      description:
        'Every single harvest undergoes stringent blind cupping protocols. Only lots scoring 85+ on the SCA specialty scale make it into a BREWORA bag.',
      highlight: 'Specialty Grade Only'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#140D09] text-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
            The BREWORA Standard
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-4">
            Why Discerning Coffee Lovers Choose Us
          </h2>
          <p className="text-sm sm:text-base text-[#BFB0A3] leading-relaxed text-balance">
            We hold every harvest to an uncompromising standard of purity, ethical responsibility, and flavor nuance.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-2xl bg-[#1C120C] border border-[#302016] hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#281A12] border border-[#3D291E] flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#C68B59] group-hover:text-[#120B08] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#C68B59] block mb-2">
                    {pillar.highlight}
                  </span>

                  <h3 className="text-lg font-serif font-bold text-[#FDFBF7] mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#A8988B] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#291B13] flex items-center justify-between text-xs text-[#8C7A6D]">
                  <span>Pillar {idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-[#C68B59]/40" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
