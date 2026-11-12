import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Wholesale & Cafe Supply');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#18110C] text-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
            Flagship Roastery & Cafe
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-4">
            Visit Our Brew Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-[#BFB0A3] leading-relaxed text-balance">
            Immerse yourself in the aromas of micro-batch roasting, enjoy a bespoke V60 pour-over,
            or speak with our master baristas about your home brewing setup.
          </p>
        </div>

        {/* 2-Column Split: Roastery Info + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          
          {/* Left Column: Locations & Contact Details */}
          <div className="space-y-6">
            
            {/* Roastery Flagship 1 */}
            <div className="p-6 rounded-2xl bg-[#20150F] border border-[#332218] hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                <MapPin className="w-4 h-4 text-[#C68B59]" />
                <span>Flagship Roastery & Cupping Lab</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#FDFBF7] mb-1">
                BREWORA Capital Reserve
              </h3>
              <p className="text-xs text-[#B8A799] mb-4">
                Plot 18, Street 4, Sector F-7 Markaz, Islamabad, Pakistan
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-[#2C1F16] text-[#A8988B]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>Mon – Sun: 7:00 AM – 11:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>+92 (51) 843-2739</span>
                </div>
              </div>
            </div>

            {/* Roastery Flagship 2 */}
            <div className="p-6 rounded-2xl bg-[#20150F] border border-[#332218] hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2">
                <MapPin className="w-4 h-4 text-[#C68B59]" />
                <span>Slow Bar & Espresso Lounge</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[#FDFBF7] mb-1">
                BREWORA Gulberg Atelier
              </h3>
              <p className="text-xs text-[#B8A799] mb-4">
                92-B2, M.M. Alam Road, Gulberg III, Lahore, Pakistan
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-[#2C1F16] text-[#A8988B]">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>Mon – Sun: 8:00 AM – Midnight</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C68B59]" />
                  <span>+92 (42) 357-1928</span>
                </div>
              </div>
            </div>

            {/* Direct Inquiries & Corporate Supply */}
            <div className="p-6 rounded-2xl bg-[#1D140E] border border-[#2F1F17] flex items-center justify-between text-xs">
              <div>
                <p className="text-sm font-serif font-bold text-[#FDFBF7]">Wholesale & Cafe Inquiries</p>
                <p className="text-[#A8988B] mt-0.5">Supply your cafe or office with our reserve roasts</p>
              </div>
              <a
                href="mailto:concierge@brewora.coffee"
                className="px-3.5 py-2 rounded-lg bg-[#2B1B13] hover:bg-[#C68B59] hover:text-[#120B08] text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Us</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Contact / Roastery Tour Form */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#20150F] border border-[#332218]">
            <h3 className="text-xl font-serif font-bold text-[#FDFBF7] mb-1">
              Send an Inquiry or Reserve a Tasting
            </h3>
            <p className="text-xs text-[#A8988B] mb-6">
              Have questions about grind selection, corporate beans, or booking a private cupping flight?
            </p>

            {submitted ? (
              <div className="py-12 text-center text-emerald-400">
                <Check className="w-12 h-12 mx-auto mb-3 text-emerald-400" />
                <h4 className="text-lg font-serif font-bold text-[#FDFBF7]">Message Received</h4>
                <p className="text-xs text-[#A8988B] mt-1 max-w-xs mx-auto">
                  Our head roaster concierge will respond to your inquiry within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#A8988B] uppercase tracking-wider text-[11px] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Khan"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#18100B] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[#A8988B] uppercase tracking-wider text-[11px] block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#18100B] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#A8988B] uppercase tracking-wider text-[11px] block mb-1">
                    Subject / Interest
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#18100B] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Home Brewing Advice">Home Brewing Advice & Grind Recommendation</option>
                    <option value="Wholesale & Cafe Supply">Wholesale & Cafe Supply</option>
                    <option value="Private Cupping & Tasting Session">Private Cupping & Tasting Session</option>
                    <option value="Corporate Coffee Gifting">Corporate Coffee Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#A8988B] uppercase tracking-wider text-[11px] block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-3 py-2.5 rounded-lg bg-[#18100B] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
