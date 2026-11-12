import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { X, CheckCircle, Package, Truck, CreditCard, Banknote, ShieldAlert, Coffee, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  onOrderSuccess: (orderDetails: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('Daniyal Ahmed');
  const [email, setEmail] = useState('daniyal.coffee@example.com');
  const [phone, setPhone] = useState('+92 300 1234567');
  const [address, setAddress] = useState('House 42, Street 14, Sector F-7/2');
  const [city, setCity] = useState('Islamabad');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'bank'>('cod');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 3500 ? 0 : shippingMethod === 'express' ? 350 : 200;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrder: OrderDetails = {
      orderId: `BREW-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      phone,
      address,
      city,
      paymentMethod:
        paymentMethod === 'cod'
          ? 'Cash on Delivery (Demo)'
          : paymentMethod === 'card'
          ? 'Card on File (Sandbox Demo)'
          : 'Direct Bank Transfer (Demo)',
      shippingMethod: shippingMethod === 'express' ? 'Express Roastery Courier' : 'Standard Delivery',
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: grandTotal,
      items: [...items],
      placedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder(generatedOrder);
      onOrderSuccess(generatedOrder);
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-dialog-title"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#18110C] border border-[#3A271B] rounded-2xl p-6 sm:p-8 text-[#FDFBF7] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2C1F17]">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              Demo Checkout
            </div>
            <h2 id="checkout-dialog-title" className="text-xl sm:text-2xl font-serif font-bold text-[#FDFBF7]">
              {confirmedOrder ? 'Roast Order Confirmed' : 'Complete Your Order'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#A8988B] hover:text-[#FDFBF7] hover:bg-[#251811] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3 rounded-lg bg-[#241710] border border-[#442D1F] flex items-center gap-3 text-xs text-[#E5DCD3] mb-6">
          <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            <strong>Demo Experience:</strong> No actual monetary transaction takes place. Feel free to complete the form to test our receipt generation flow.
          </span>
        </div>

        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Order #{confirmedOrder.orderId}
              </p>
              <h3 className="text-2xl font-serif font-bold text-[#FDFBF7] mt-1">
                Your Beans Are Queued for Roasting
              </h3>
              <p className="text-xs sm:text-sm text-[#A8988B] mt-2 max-w-md mx-auto">
                Thank you, {confirmedOrder.fullName}! A confirmation dispatch note has been sent to{' '}
                <span className="text-[#FDFBF7]">{confirmedOrder.email}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-xl bg-[#20150F] border border-[#332218] space-y-4 text-xs">
              <div className="flex justify-between border-b border-[#2C1F17] pb-3 text-[#A8988B]">
                <span>Date: {confirmedOrder.placedAt}</span>
                <span>Payment: {confirmedOrder.paymentMethod}</span>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-[#FDFBF7] uppercase tracking-wider text-[11px]">
                  Ordered Items
                </p>
                {confirmedOrder.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[#C8BCB0]">
                    <span>
                      {i.quantity}x {i.product.name} ({i.selectedGrind}, {i.selectedSize})
                    </span>
                    <span className="font-medium text-[#FDFBF7] tabular-nums">
                      PKR {(i.product.price * i.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#2C1F17] space-y-1.5 text-[#A8988B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">PKR {confirmedOrder.subtotal.toLocaleString()}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="tabular-nums">- PKR {confirmedOrder.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {confirmedOrder.shipping === 0 ? 'FREE' : `PKR ${confirmedOrder.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#FDFBF7] pt-2 border-t border-[#2C1F17]">
                  <span className="font-serif">Total Paid / Due on Delivery</span>
                  <span className="text-[#D4AF37] tabular-nums font-sans">
                    PKR {confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2C1F17] text-[#A8988B]">
                <p className="text-[10px] uppercase tracking-wider text-[#8C7A6D]">Delivery Destination</p>
                <p className="text-[#FDFBF7] font-medium">{confirmedOrder.address}, {confirmedOrder.city}</p>
                <p className="text-[11px] text-[#A8988B]">Recipient: {confirmedOrder.phone}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-xl bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Exploring Coffees
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Customer Details */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>1. Recipient & Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[#A8988B] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8988B] mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#A8988B] mb-1">Email Address (for roast notification) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[#A8988B] mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[#A8988B] mb-1">City *</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A8988B] mb-1">Postal Code</label>
                  <input
                    type="text"
                    defaultValue="44000"
                    className="w-full px-3 py-2 rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>2. Dispatch Speed</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express'
                      ? 'bg-[#291B12] border-[#C68B59]'
                      : 'bg-[#20150F] border-[#332218] text-[#A8988B]'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-[#FDFBF7]">Express Roastery Courier</p>
                    <p className="text-[11px] text-[#A8988B]">Next business day priority</p>
                  </div>
                  <span className="font-bold text-[#D4AF37]">
                    {subtotal >= 3500 ? 'FREE' : 'PKR 350'}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'standard'
                      ? 'bg-[#291B12] border-[#C68B59]'
                      : 'bg-[#20150F] border-[#332218] text-[#A8988B]'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-[#FDFBF7]">Standard Courier</p>
                    <p className="text-[11px] text-[#A8988B]">2–3 business days</p>
                  </div>
                  <span className="font-bold text-[#D4AF37]">
                    {subtotal >= 3500 ? 'FREE' : 'PKR 200'}
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>3. Payment Method (Demo)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'bg-[#291B12] border-[#C68B59] text-[#FDFBF7]'
                      : 'bg-[#20150F] border-[#332218] text-[#A8988B]'
                  }`}
                >
                  <Banknote className="w-4 h-4 mb-1 text-[#C68B59]" />
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-[10px] text-[#8C7A6D]">Pay when package arrives</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-[#291B12] border-[#C68B59] text-[#FDFBF7]'
                      : 'bg-[#20150F] border-[#332218] text-[#A8988B]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1 text-[#D4AF37]" />
                  <p className="font-semibold">Card (Demo)</p>
                  <p className="text-[10px] text-[#8C7A6D]">Visa / Mastercard test</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    paymentMethod === 'bank'
                      ? 'bg-[#291B12] border-[#C68B59] text-[#FDFBF7]'
                      : 'bg-[#20150F] border-[#332218] text-[#A8988B]'
                  }`}
                >
                  <Coffee className="w-4 h-4 mb-1 text-[#C68B59]" />
                  <p className="font-semibold">Bank Transfer</p>
                  <p className="text-[10px] text-[#8C7A6D]">Raast / IBAN demo</p>
                </button>
              </div>
            </div>

            {/* Total Strip & Place Order */}
            <div className="pt-4 border-t border-[#2C1F17] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#A8988B]">Total Amount in PKR</p>
                <p className="text-2xl font-serif font-bold text-[#D4AF37] tabular-nums font-sans">
                  PKR {grandTotal.toLocaleString()}
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#C68B59] to-[#B2733E] hover:from-[#D4AF37] hover:to-[#C68B59] text-[#120B08] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
              >
                {isSubmitting ? 'Confirming Demo Order...' : 'Place Demo Order'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
