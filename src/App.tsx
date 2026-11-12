import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, MenuItem, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCollection } from './components/ProductCollection';
import { ProductModal } from './components/ProductModal';
import { BrandStory } from './components/BrandStory';
import { CoffeeMenu } from './components/CoffeeMenu';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { Newsletter } from './components/Newsletter';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast, ToastMessage } from './components/Toast';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial pre-loaded item for an inviting first experience
    return [
      {
        product: PRODUCTS[0], // Nocturne Reserve Espresso
        quantity: 1,
        selectedGrind: 'Whole Bean',
        selectedSize: '250g Tin',
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>('BREWORA10');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate discounts
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo === 'BREWORA10' ? Math.round(subtotal * 0.1) : 0;

  // Add to Cart
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    grind?: string,
    size?: string
  ) => {
    const selectedGrind = grind || product.grindOptions[0] || 'Whole Bean';
    const selectedSize = size || product.sizeOptions[0] || '250g';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedGrind === selectedGrind &&
          i.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prevItems, { product, quantity, selectedGrind, selectedSize }];
      }
    });

    setToast({
      id: `toast-${Date.now()}`,
      title: 'Added to Roastery Bag',
      message: `${quantity}x ${product.name} (${selectedGrind})`,
      actionLabel: 'View Bag',
      onAction: () => setIsCartOpen(true),
    });
  };

  // Quick order a menu item
  const handleOrderDrink = (menuItem: MenuItem) => {
    // Convert menuItem into a pseudo product for cart
    const beverageProduct: Product = {
      id: `drink-${menuItem.id}`,
      name: `${menuItem.name} (Fresh Brew)`,
      category: 'Latte',
      price: menuItem.price,
      rating: 4.9,
      reviewCount: 34,
      shortDescription: menuItem.description,
      fullDescription: menuItem.description,
      roastLevel: 'Medium Roast',
      origin: 'Brew Bar Signature',
      notes: [menuItem.flavorProfile],
      altitude: 'Barista Prepared',
      image: '/src/assets/images/hero_luxury_coffee_1794476074361.jpg',
      inStock: true,
      grindOptions: ['Barista Prepared (Hot)', 'Over Clear Ice Sphere'],
      sizeOptions: ['Standard 8oz', 'Double 12oz'],
    };

    handleAddToCart(beverageProduct, 1, 'Barista Prepared (Hot)', 'Standard 8oz');
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQuantity };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleApplyPromo = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'BREWORA10') {
      setAppliedPromo('BREWORA10');
      return { success: true, message: '10% Fellowship discount applied to bag!' };
    }
    return { success: false, message: 'Invalid promo code. Try "BREWORA10" for 10% off.' };
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setCartItems([]);
    setToast({
      id: `order-${Date.now()}`,
      title: 'Demo Order Queued',
      message: `Order #${order.orderId} recorded successfully.`,
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#120B08] text-[#FDFBF7] font-sans antialiased selection:bg-[#D4AF37] selection:text-[#120B08]">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('collection')}
          onStoryClick={() => scrollToSection('story')}
        />

        {/* 2. Featured Coffee Products Collection */}
        <ProductCollection
          products={PRODUCTS}
          onAddToCart={(product) => handleAddToCart(product)}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 3. About BREWORA & Roasting Craft Story */}
        <BrandStory />

        {/* 4. Our Coffee Menu */}
        <CoffeeMenu
          onOrderDrink={handleOrderDrink}
        />

        {/* 5. Why Choose Us (4 Pillars) */}
        <WhyChooseUs />

        {/* 6. Customer Testimonials & Reviews */}
        <ReviewsSection />

        {/* 7. Newsletter Section */}
        <Newsletter
          onCopyPromo={(code) => handleApplyPromo(code)}
        />

        {/* 8. Contact Information & Flagships */}
        <ContactSection />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        onApplyPromo={handleApplyPromo}
      />

      {/* Demo Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={discountAmount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Toast Feedback */}
      <Toast
        toast={toast}
        onDismiss={() => setToast(null)}
      />
    </div>
  );
}
