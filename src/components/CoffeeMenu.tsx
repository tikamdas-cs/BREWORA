import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';
import { Coffee, Flame, Droplet, Sparkles, Plus } from 'lucide-react';

interface CoffeeMenuProps {
  onOrderDrink: (item: MenuItem) => void;
}

export const CoffeeMenu: React.FC<CoffeeMenuProps> = ({ onOrderDrink }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Espresso Bar', 'Artisan Lattes', 'Slow Bar & Pour Over', 'Cold Crafts'];

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#18110C] text-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
            Handcrafted In-House
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-4">
            Our Coffee Menu
          </h2>
          <p className="text-sm sm:text-base text-[#BFB0A3] leading-relaxed text-balance">
            Every beverage served at our brew bars is prepared to exact temperature and extraction
            ratios by certified baristas using filtered volcanic mineral water.
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                activeCategory === cat
                  ? 'bg-[#C68B59] border-[#C68B59] text-[#120B08]'
                  : 'bg-[#221610] border-[#38261B] text-[#C8BCB0] hover:text-[#FDFBF7] hover:border-[#C68B59]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#20150F] border border-[#332218] hover:border-[#D4AF37]/40 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-serif font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-base font-bold text-[#D4AF37] tabular-nums font-sans shrink-0">
                    PKR {item.price.toLocaleString()}
                  </span>
                </div>

                {/* Subcategory & Strength */}
                <div className="flex items-center gap-2 text-xs text-[#A8988B] mb-3">
                  <span className="uppercase text-[#C68B59] tracking-wider text-[11px] font-medium">
                    {item.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[11px]">{item.strength} Intensity</span>
                </div>

                <p className="text-xs sm:text-sm text-[#B8A799] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Flavor Profile & Order Trigger */}
              <div className="pt-3 border-t border-[#2C1F16] flex items-center justify-between gap-3 text-xs">
                <span className="text-[11px] text-[#A69383] italic truncate">
                  {item.flavorProfile}
                </span>

                <button
                  type="button"
                  onClick={() => onOrderDrink(item)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2B1C13] hover:bg-[#C68B59] text-[#E5DCD3] hover:text-[#120B08] font-medium text-xs tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                  title="Order for cafe pickup or quick brew"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Barista Customization Note */}
        <div className="mt-14 max-w-2xl mx-auto text-center p-4 rounded-xl bg-[#21160F]/60 border border-[#3A271B] text-xs text-[#A8988B]">
          <p>
            <span className="text-[#D4AF37] font-semibold">Dietary & Preferences:</span> Oat, Almond, and Coconut milk available at no extra charge. Decaf Swiss-Water process available on all espresso orders.
          </p>
        </div>

      </div>
    </section>
  );
};
