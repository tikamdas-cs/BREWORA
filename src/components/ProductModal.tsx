import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Star, ShieldCheck, MapPin, Mountain, Flame, Check } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, grind: string, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedGrind, setSelectedGrind] = useState(product.grindOptions[0] || 'Whole Bean');
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0] || '250g Bag');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setSelectedGrind(product.grindOptions[0] || 'Whole Bean');
    setSelectedSize(product.sizeOptions[0] || '250g Bag');
    setQuantity(1);
    setAddedSuccess(false);
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedGrind, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#1C120C] border border-[#3A271B] rounded-2xl shadow-2xl text-[#FDFBF7] flex flex-col md:flex-row overflow-hidden">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#150E0A]/80 hover:bg-[#D4AF37] text-[#FDFBF7] hover:text-[#120B08] border border-[#443022] hover:border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual & Badges */}
        <div className="w-full md:w-1/2 relative bg-[#150E0A] flex items-center justify-center min-h-[300px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[460px] md:max-h-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C120C] via-transparent to-transparent md:hidden" />
          
          {product.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#120B08]/90 border border-[#3E291D] text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              {product.badge}
            </div>
          )}
        </div>

        {/* Right Column: Information & Controls */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Origin & Category */}
            <div className="flex items-center gap-2 text-xs text-[#A8988B] mb-2 uppercase tracking-widest">
              <span className="text-[#C68B59] font-medium">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.roastLevel}</span>
            </div>

            <h2 id="modal-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7] mb-2 leading-tight">
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 text-xs text-[#E5DCD3] mb-4">
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating) ? 'fill-[#D4AF37]' : 'text-stone-600'
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold tabular-nums text-sm">{product.rating}</span>
              <span className="text-[#8C7A6D]">({product.reviewCount} connoisseur reviews)</span>
            </div>

            {/* Price */}
            <div className="text-2xl font-bold text-[#D4AF37] tabular-nums font-sans mb-4">
              PKR {product.price.toLocaleString()}
            </div>

            {/* Full Description */}
            <p className="text-xs sm:text-sm text-[#C8BCB0] leading-relaxed mb-6">
              {product.fullDescription}
            </p>

            {/* Terroir & Specs */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#251811] border border-[#3A271B] mb-6 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C68B59] shrink-0" />
                <div>
                  <p className="text-[#8C7A6D] text-[10px] uppercase">Origin</p>
                  <p className="font-medium text-[#FDFBF7] truncate">{product.origin}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <p className="text-[#8C7A6D] text-[10px] uppercase">Elevation</p>
                  <p className="font-medium text-[#FDFBF7]">{product.altitude}</p>
                </div>
              </div>
            </div>

            {/* Tasting Notes */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A8988B] block mb-2">
                Tasting Notes Profile
              </label>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="text-xs text-[#E5DCD3] bg-[#2A1B13] px-3 py-1 rounded-md border border-[#402B1E]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Grind Option */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A8988B] block mb-2">
                Brew Method / Grind
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.grindOptions.map((grind) => {
                  const isSelected = selectedGrind === grind;
                  return (
                    <button
                      key={grind}
                      type="button"
                      onClick={() => setSelectedGrind(grind)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors border cursor-pointer ${
                        isSelected
                          ? 'bg-[#C68B59] border-[#C68B59] text-[#120B08] font-semibold'
                          : 'bg-[#251811] border-[#38261A] text-[#C8BCB0] hover:border-[#C68B59]/60'
                      }`}
                    >
                      {grind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Option */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#A8988B] block mb-2">
                Package Size
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizeOptions.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#120B08] font-bold'
                          : 'bg-[#251811] border-[#38261A] text-[#C8BCB0] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Stepper + Add To Cart Button */}
          <div className="pt-4 border-t border-[#332218] flex items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#251811] border border-[#3A271B] rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#E5DCD3] hover:text-[#D4AF37] rounded hover:bg-[#322117] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-9 text-center text-sm font-semibold tabular-nums text-[#FDFBF7]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#E5DCD3] hover:text-[#D4AF37] rounded hover:bg-[#322117] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAdd}
              disabled={addedSuccess}
              className={`flex-grow py-3 px-5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart · PKR {(product.price * quantity).toLocaleString()}
                  </span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
