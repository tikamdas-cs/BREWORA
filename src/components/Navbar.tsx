import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Our Story', href: '#story' },
    { label: 'Cafe Menu', href: '#menu' },
    { label: 'Why Brewora', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Visit Us', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#150E0A]/95 backdrop-blur-md border-b border-[#2C1F16] py-3 shadow-lg shadow-black/20'
            : 'bg-gradient-to-b from-[#120B08]/90 via-[#120B08]/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar 3-Zone Contract */}
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Single text element Brand Zone */}
            <a
              href="#"
              className="group flex items-center gap-2 text-xl sm:text-2xl font-display font-bold tracking-[0.2em] text-[#FDFBF7] hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0"
              aria-label="BREWORA Home"
            >
              <span>BREWORA</span>
              <span className="text-[#C68B59] text-sm font-sans font-light tracking-widest hidden sm:inline opacity-80">
                · CAFE & ROASTERY
              </span>
            </a>

            {/* Zone 2: 4-5 clean single-line text navigation links */}
            <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium tracking-wider uppercase text-[#E5DCD3]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#D4AF37] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 primary action: Cart button with live count */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenCart}
                className="relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#241811] hover:bg-[#322218] border border-[#443022] hover:border-[#D4AF37]/50 text-[#FDFBF7] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold tracking-wider uppercase font-sans">
                  Cart
                </span>
                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#C68B59] text-[#150E0A] text-xs font-bold tabular-nums">
                  {cartCount}
                </span>
              </button>

              {/* Mobile hamburger toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#E5DCD3] hover:text-[#D4AF37] hover:bg-[#241811] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#150E0A]/95 backdrop-blur-xl pt-24 px-6 pb-8 md:hidden flex flex-col justify-between border-b border-[#2C1F16] animate-in fade-in duration-200">
          <nav className="flex flex-col gap-5 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-lg font-serif tracking-wider text-[#FDFBF7] hover:text-[#D4AF37] border-b border-[#281B13] pb-3 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#C68B59]" />
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[#281B13]">
            <p className="text-xs text-[#A8988B] tracking-wider uppercase mb-3">
              Roastery Hours
            </p>
            <p className="text-sm text-[#FDFBF7] font-medium">
              Mon – Sun: 7:00 AM – 11:00 PM
            </p>
            <p className="text-xs text-[#C68B59] mt-1">
              Fresh Micro-Batches Roasted Daily
            </p>
          </div>
        </div>
      )}
    </>
  );
};
