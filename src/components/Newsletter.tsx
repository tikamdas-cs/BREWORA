import React, { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react';

interface NewsletterProps {
  onCopyPromo?: (code: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onCopyPromo }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('BREWORA10');
    setCopied(true);
    if (onCopyPromo) onCopyPromo('BREWORA10');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#140D09] text-[#FDFBF7] relative border-t border-[#251811]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="w-12 h-12 rounded-full bg-[#241710] border border-[#3E291D] mx-auto flex items-center justify-center text-[#D4AF37] mb-5">
          <Mail className="w-5 h-5" />
        </div>

        <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-2">
          The Connoisseur Circle
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-3">
          Join the BREWORA Fellowship
        </h2>

        <p className="text-xs sm:text-sm text-[#A8988B] max-w-lg mx-auto mb-8 leading-relaxed">
          Subscribe to receive early access to rare micro-lots, seasonal single-origin releases,
          and unlock <span className="text-[#D4AF37] font-semibold">10% off</span> your first roastery order.
        </p>

        {isSubscribed ? (
          <div className="p-6 rounded-2xl bg-[#1E140E] border border-[#38261B] max-w-md mx-auto text-center animate-in fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <Check className="w-5 h-5" />
            </div>
            <p className="text-sm font-serif font-bold text-[#FDFBF7]">
              Welcome to the Fellowship!
            </p>
            <p className="text-xs text-[#A8988B] mt-1 mb-4">
              Here is your exclusive welcome coupon for 10% off:
            </p>

            <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-[#140D09] border border-[#3A271B]">
              <span className="font-mono text-sm tracking-widest text-[#D4AF37] font-bold">
                BREWORA10
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-3 py-1 rounded bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#20150F] border border-[#332218] text-[#FDFBF7] placeholder-[#8C7A6D] text-xs focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08] text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>Join</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#786659] mt-4">
          No spam. Only roasted aromatics, origin stories, and private drops. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
};
