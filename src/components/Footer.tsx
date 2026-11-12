import React from 'react';
import { Coffee, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#100906] text-[#A8988B] border-t border-[#251811] text-xs pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#241710]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#"
              className="text-2xl font-display font-bold tracking-[0.2em] text-[#FDFBF7] hover:text-[#D4AF37] transition-colors block"
            >
              BREWORA
            </a>
            <p className="text-xs leading-relaxed max-w-sm text-[#8C7A6D]">
              The Art of Great Coffee. Handcrafted single-origin roasts, micro-batch espresso blends,
              and artisanal cold brew alchemy. Direct farm partnerships from soil to soul.
            </p>

            <div className="flex items-center gap-3 pt-2 text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#C68B59]" />
              <span className="text-[11px] text-[#A8988B]">
                100% Specialty Grade Arabica · Freshness Guaranteed
              </span>
            </div>
          </div>

          {/* Column 2: Coffee & Gear */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#FDFBF7] text-xs mb-4">
              Collection
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">
                  Nocturne Reserve Espresso
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">
                  Velvet Silk Latte Blend
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">
                  Crema Royale Cappuccino
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">
                  Aurora Nitro Cold Brew
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#D4AF37] transition-colors">
                  Solstice Geisha Single-Origin
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Roastery */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#FDFBF7] text-xs mb-4">
              The Roastery
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#story" className="hover:text-[#D4AF37] transition-colors">
                  Our Origin Story
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D4AF37] transition-colors">
                  Artisan Cafe Menu
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#D4AF37] transition-colors">
                  Direct Trade Standards
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#D4AF37] transition-colors">
                  Connoisseur Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                  Cupping Lab Tours
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Hours */}
          <div>
            <h4 className="font-semibold uppercase tracking-wider text-[#FDFBF7] text-xs mb-4">
              Roastery Concierge
            </h4>
            <p className="text-[#8C7A6D] mb-2 leading-relaxed">
              Mon–Sun: 7am – 11pm PKT
            </p>
            <p className="text-[#C68B59] font-medium mb-1">
              concierge@brewora.coffee
            </p>
            <p className="text-[#8C7A6D] mb-4">
              +92 (51) 843-2739
            </p>
            
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-[#786659] block mb-1">
                Accepted Demo Payments
              </span>
              <p className="text-[11px] text-[#A8988B]">
                Cash on Delivery · Card · Raast
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#786659]">
          <p>
            © {new Date().getFullYear()} BREWORA Coffee Roasters. All rights reserved. Built for discerning palates.
          </p>

          <div className="flex items-center gap-6">
            <a href="#story" className="hover:text-[#D4AF37] transition-colors">
              Ethical Sourcing Pledge
            </a>
            <span>·</span>
            <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
              Privacy & Quality Charter
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#C68B59] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
