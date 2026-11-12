import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  discountAmount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedPromo,
  discountAmount,
  onApplyPromo,
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 3500;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = freeShippingThreshold - subtotal;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim());
    if (res.success) {
      setPromoMessage({ type: 'success', text: res.message });
      setPromoInput('');
    } else {
      setPromoMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#18110C] border-l border-[#332218] text-[#FDFBF7] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#2C1F17] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-lg font-serif font-bold text-[#FDFBF7]">
                Your Roastery Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#2C1F17] text-[#C68B59] font-bold tabular-nums">
                {items.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#A8988B] hover:text-[#FDFBF7] hover:bg-[#251811] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="px-6 py-3.5 bg-[#20150F] border-b border-[#2C1F17] text-xs">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5 text-[#C68B59] font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>
                    {remainingForFree <= 0 ? (
                      <span className="text-emerald-400 font-semibold">Complimentary Delivery Unlocked!</span>
                    ) : (
                      <>
                        Add <span className="font-bold text-[#FDFBF7]">PKR {remainingForFree.toLocaleString()}</span> more for free express shipping
                      </>
                    )}
                  </span>
                </div>
                <span className="text-[11px] text-[#8C7A6D] tabular-nums">
                  {Math.round(progressToFreeShipping)}%
                </span>
              </div>
              <div className="w-full bg-[#2E1E15] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#C68B59] to-[#D4AF37] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-[#251811] border border-[#3A271B] flex items-center justify-center text-[#A8988B] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#FDFBF7] mb-1">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#A8988B] max-w-xs mb-6">
                  Discover our freshly roasted single-origins, rich espresso blends, and handcrafted cold brews.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedGrind}-${item.selectedSize}`}
                  className="p-4 rounded-xl bg-[#20150F] border border-[#302016] flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-[#17100B] shrink-0 border border-[#38261B]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-serif font-bold text-[#FDFBF7] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(index)}
                          className="text-[#8C7A6D] hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Grind & Size meta */}
                      <p className="text-[11px] text-[#A8988B] mt-0.5">
                        {item.selectedGrind} · {item.selectedSize}
                      </p>
                    </div>

                    {/* Stepper + Subtotal */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#2A1C14]">
                      <div className="flex items-center bg-[#17100B] border border-[#38261B] rounded-md">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[#E5DCD3] hover:text-[#D4AF37]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-7 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[#E5DCD3] hover:text-[#D4AF37]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#D4AF37] tabular-nums font-sans">
                        PKR {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {items.length > 0 && (
            <div className="p-6 bg-[#1F150F] border-t border-[#2C1F17] space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C7A6D]" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BREWORA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[#160E09] border border-[#38261B] text-[#FDFBF7] placeholder-[#8C7A6D] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-[#2D1E15] hover:bg-[#C68B59] hover:text-[#120B08] text-xs font-semibold uppercase tracking-wider text-[#E5DCD3] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoMessage && (
                  <p className={`text-[11px] ${promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
                {appliedPromo && !promoMessage && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Promo code <strong>{appliedPromo}</strong> applied</span>
                  </p>
                )}
              </form>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs pt-2 border-t border-[#2C1F17]">
                <div className="flex justify-between text-[#A8988B]">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-[#FDFBF7]">
                    PKR {subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">
                      - PKR {discountAmount.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#A8988B]">
                  <span>Shipping ({shippingFee === 0 ? 'Complimentary' : 'Standard Courier'})</span>
                  <span className="tabular-nums font-semibold text-[#FDFBF7]">
                    {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#FDFBF7] pt-2 border-t border-[#2C1F17]">
                  <span className="font-serif">Total</span>
                  <span className="text-[#D4AF37] tabular-nums font-sans">
                    PKR {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Proceed to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-[#8C7A6D] px-1">
                  <span>Demo store: No real charge</span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="hover:text-rose-400 transition-colors"
                  >
                    Clear Bag
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
