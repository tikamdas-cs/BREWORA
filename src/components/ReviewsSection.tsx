import React, { useState } from 'react';
import { REVIEWS } from '../data/reviews';
import { Review } from '../types';
import { Star, CheckCircle, MessageSquareQuote, Plus, Check } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newProduct, setNewProduct] = useState('Nocturne Reserve Espresso Blend');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment || !newTitle) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      role: 'Coffee Enthusiast',
      city: newCity || 'Pakistan',
      rating: newRating,
      date: 'Just now',
      title: newTitle,
      comment: newComment,
      favoriteProduct: newProduct,
    };

    setReviews([added, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewCity('');
      setNewTitle('');
      setNewComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-24 bg-[#18110C] text-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#2C1F17]">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
              Connoisseur Impressions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-2">
              Loved by Baristas & Coffee Drinkers
            </h2>
            <p className="text-sm text-[#A8988B] max-w-xl">
              Authentic feedback from daily brewers, certified Q-Graders, and espresso lovers across Pakistan and beyond.
            </p>
          </div>

          {/* Aggregate Rating Stat + Write Review Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center gap-3 bg-[#221610] px-4 py-2.5 rounded-xl border border-[#38261B]">
              <div className="text-2xl font-serif font-bold text-[#D4AF37] tabular-nums">
                4.9
              </div>
              <div>
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#A8988B]">From 380+ verified reviews</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Share Your Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-2xl bg-[#20150F] border border-[#332218] hover:border-[#D4AF37]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header with stars & verified badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? 'fill-[#D4AF37]' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-[11px] text-[#C68B59]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Coffee Drinker</span>
                  </div>
                </div>

                {/* Review Title */}
                <h3 className="text-base font-serif font-bold text-[#FDFBF7] mb-2 leading-snug">
                  "{rev.title}"
                </h3>

                {/* Review Body */}
                <p className="text-xs sm:text-sm text-[#B8A799] leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Product Strip */}
              <div className="pt-4 border-t border-[#2A1C14] flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#FDFBF7]">{rev.author}</p>
                  <p className="text-[11px] text-[#8C7A6D]">{rev.role} · {rev.city}</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-[#8C7A6D]">Favorite</p>
                  <p className="text-xs text-[#D4AF37] font-medium truncate max-w-[150px]">{rev.favoriteProduct}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-[#1C120C] border border-[#3A271B] rounded-2xl p-6 sm:p-8 text-[#FDFBF7] shadow-2xl">
            <h3 className="text-xl font-serif font-bold mb-1">Share Your BREWORA Experience</h3>
            <p className="text-xs text-[#A8988B] mb-5">
              Tell other coffee lovers about your brew ratio, tasting notes, and impressions.
            </p>

            {submitted ? (
              <div className="py-8 text-center text-emerald-400">
                <Check className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
                <p className="text-base font-semibold">Thank you for your review!</p>
                <p className="text-xs text-[#A8988B] mt-1">Your review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Daniyal Khan"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#251811] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      placeholder="e.g. Islamabad"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-[#251811] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                    Coffee Variety
                  </label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#251811] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Nocturne Reserve Espresso Blend">Nocturne Reserve Espresso Blend</option>
                    <option value="Velvet Silk Latte Roast">Velvet Silk Latte Roast</option>
                    <option value="Aurora Artisanal Nitro Cold Brew">Aurora Artisanal Nitro Cold Brew</option>
                    <option value="Crema Royale Cappuccino Roast">Crema Royale Cappuccino Roast</option>
                    <option value="Solstice Geisha Single-Origin">Solstice Geisha Single-Origin</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-[#D4AF37] hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star className={`w-5 h-5 ${star <= newRating ? 'fill-[#D4AF37]' : 'text-stone-700'}`} />
                      </button>
                    ))}
                    <span className="text-xs text-[#A8988B] ml-2">({newRating} out of 5 stars)</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                    Headline / Summary *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Exceptional crema and silky mouthfeel"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#251811] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#A8988B] block mb-1">
                    Review Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe the aroma, extraction time, brew equipment..."
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#251811] border border-[#3A271B] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-[#A8988B] hover:text-[#FDFBF7] hover:bg-[#251811]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Publish Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
