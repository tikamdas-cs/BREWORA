# BREWORA – The Art of Great Coffee

**BREWORA** is a premium, artisanal coffee brand e-commerce frontend web platform built for specialty coffee lovers, baristas, and discerning palates. Inspired by prestigious international third-wave coffee houses and luxury roasters, BREWORA combines warm, rich espresso aesthetics with high-performance interactive e-commerce capabilities.

---

## 1. Project Overview & Description

BREWORA presents a sophisticated digital storefront that celebrates the journey of coffee from high-altitude volcanic estates to the precision-extracted cup. The visual identity is anchored by a curated luxury palette: dark espresso browns (`#120B08`, `#17100B`), warm paper cream (`#FDFBF7`, `#E5DCD3`), caramel tones (`#C68B59`), and subtle champagne gold (`#D4AF37`).

Every element is crafted to showcase the craftsmanship of micro-batch roasting, single-origin terroir, and cafe rituals.

---

## 2. Intended Audience & Primary User Tasks

### Intended Audience
- **Specialty Coffee Connoisseurs**: Looking for detailed altitude, roast profiles, terroir tasting notes, and grind customization.
- **Home Baristas**: Dialing in espresso, pour-overs, and cold drips who require fresh roasts dispatched within 48 hours.
- **Cafe Visitors & Roastery Guests**: Exploring the cafe drink menu, booking cupping lab sessions, or locating flagship sanctuaries.

### Primary User Tasks
1. **Discover & Filter Specialty Coffees**: Filter by roast categories (`All Coffee`, `Espresso`, `Latte`, `Cappuccino`, `Cold Coffee`), search by tasting notes or origin, and sort by price/rating.
2. **Inspect Roast Terroir via Quick View**: Examine cupping score, elevation, origin map, roast meter, and select bespoke grind sizes and packaging quantities.
3. **Manage Roastery Cart**: Add coffees, adjust quantities with real-time subtotal and total calculations, track progress towards complimentary courier shipping, and redeem promotional codes.
4. **Experience Demo Checkout**: Input Pakistani delivery addresses (Islamabad, Lahore, Karachi, etc.), select courier dispatch speed, choose demo payment modes (Cash on Delivery, Raast, Card Sandbox), and generate an instant order confirmation invoice.
5. **Explore Cafe Menu & Roastery Story**: View signature cafe brews with PKR pricing, learn about our direct-trade ethics, read verified connoisseur testimonials, and submit new reviews.

---

## 3. Main Features

- **Storefront Hero Experience**:
  - Immersive headline: *"Every Cup Tells a Story."*
  - High-resolution hero background with contrast scrim ensuring WCAG AA compliant readability.
  - Quick proof strip: Top 1% Arabica lots, roasted within 48h, 100% direct farm sourcing.
  - Direct navigation triggers for *Explore Coffee* and *Our Story*.

- **Product Catalog with Working Category Filters**:
  - 8 distinct fictional coffee varieties covering all required categories:
    - *Nocturne Reserve Espresso Blend* (Dark Roast, Colombian & Ethiopian blend)
    - *Velvet Silk Latte Roast* (Medium Roast, sweet honey & Madagascar vanilla)
    - *Aurora Artisanal Nitro Cold Brew* (20-hour steep, amber bottle)
    - *Crema Royale Cappuccino Roast* (Medium-Dark Italian profile)
    - *Solstice Geisha Single-Origin* (Panama Boquete 2,200m micro-lot)
    - *Caramel Macchiato Reserve* (Bourbon roast with macadamia notes)
    - *Venetian Gold Dark Cappuccino* (Sumatra Mandheling & Cerrado)
    - *Glacier Cascara & Cold Drip* (Zero-waste coffee cherry infusion)
  - Real-time search by notes and origin.
  - Sorting by Featured, Price (Low to High), Price (High to Low), and Rating.
  - Prices clearly displayed in PKR (e.g. `PKR 1,850`).

- **Interactive Quick View & Customization (PDP Modal)**:
  - Accessible modal dialog with keyboard navigation (`Escape` to close).
  - Grind selectors: Whole Bean, Espresso Fine, Pour-Over Medium, French Press, etc.
  - Packaging size selectors: 250g Tin, 500g Bag, 1kg Roaster Bag.
  - Interactive quantity stepper and live price computation.

- **Functional Shopping Bag & Slide-Over Drawer**:
  - Live cart item counter badge in the fixed navigation bar.
  - Add, increment, decrement, and remove items with persistent subtotal calculations.
  - **Free Shipping Progress Bar**: Dynamically calculates remaining amount needed to reach complimentary express shipping (threshold: PKR 3,500).
  - **Coupon / Promo Code Engine**: Working validation for code `BREWORA10` granting an instant 10% discount on order subtotal.
  - Clear bag option and empty state illustration.

- **Demo Checkout Flow**:
  - Demo checkout dialog with recipient details, city selector (Karachi, Lahore, Islamabad, Rawalpindi, Peshawar, Faisalabad, Multan, Quetta, Sialkot), courier speeds, and demo payment selection (Cash on Delivery, Sandbox Card, Bank Transfer).
  - Instant order receipt generation with unique tracking ID (e.g. `BREW-849201`), timestamp, itemized breakdown, and delivery schedule.

- **Our Coffee Menu**:
  - Elegant cafe beverage menu featuring espresso bar staples, artisan lattes, pour overs, and cold crafts.
  - Includes flavor profiles, extraction notes, and direct "Order" button that loads drinks into the cart.

- **Brand Story & Why Choose Us**:
  - Highlights micro-batch thermal profiling, 100% traceable direct trade, 48-hour freshness dispatch, and SCA 85+ score standards.

- **Interactive Customer Reviews**:
  - Verified reviews from coffee professionals and enthusiasts with star ratings and favorite brew tags.
  - "Share Your Review" modal allowing users to write and immediately publish new reviews.

- **Newsletter & Perks**:
  - "Join the Connoisseur's Club" form with instant 10% coupon code copy action.

- **Flagship Cafe & Contact Section**:
  - Detailed address, contact numbers, and operating hours for Islamabad Capital Reserve and Lahore Gulberg Atelier.
  - Interactive contact and cupping lab reservation form.

---

## 4. Technologies Used

- **Framework**: React 19 (Functional components, Hooks: `useState`, `useEffect`, `useMemo`).
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`) with custom typography and CSS variable tokens.
- **Typography**: Google Fonts (`Playfair Display`, `Cinzel`, `Plus Jakarta Sans`).
- **Icons**: Lucide React (`lucide-react`).
- **Build Tool**: Vite 8 with TypeScript (`tsx`, `esbuild`).

---

## 5. AI Tools Used

- **Google AI Studio Agent**: Used for initial project scaffolding, state orchestration, layout engineering, and responsive optimization.
- **Gemini Image Generation (`generate_image`)**: Generated ultra-realistic, custom domain photography adhering to the luxury coffee brand theme:
  - `hero_luxury_coffee`: Cinematic espresso pour with golden crema on dark walnut table.
  - `product_signature_espresso`: Matte black BREWORA embossed bean packaging with roasted beans.
  - `product_velvet_latte`: Handcrafted latte art in ceramic cup with roasted beans.
  - `product_nitro_cold_brew`: Amber glass nitro cold brew bottle with crystal tumbler.
  - `craft_roastery_process`: Artisan roaster inspecting freshly roasted batch in cooling tray.

---

## 6. What Was Tested and Changed

1. **Top Bar Contract Adherence**:
   - Tested navigation bar to ensure it strictly implements the 3-zone contract: Brand wordmark on Zone 1, 5 single-line clean text links on Zone 2, and 1 primary Cart CTA with live counter on Zone 3.
   - Added mobile responsive slide-out drawer navigation for viewports under 768px.
2. **Category Filter Functionality**:
   - Verified that clicking `All Coffee`, `Espresso`, `Latte`, `Cappuccino`, and `Cold Coffee` properly filters the catalog without page refresh.
   - Tested empty search states and verified "Reset Search" restores full view.
3. **Cart Calculation Rigor**:
   - Verified arithmetic: multiplying unit price by quantity across multiple items with different grinds.
   - Verified promo code logic: `BREWORA10` applies a 10% reduction and re-calculates the grand total accurately.
   - Verified courier fee logic: automatically applies complimentary delivery when order exceeds PKR 3,500.
4. **Demo Checkout Lifecycle**:
   - Confirmed form validation, demo notice disclosure, smooth transition to confirmed order receipt state, and resetting the cart upon successful demo order placement.
5. **Accessibility & Anti-Slop Audit**:
   - Replaced pill capsules with clean unboxed typographic metadata.
   - Ensured all image tags include `alt` attributes and `referrerPolicy="no-referrer"`.
   - Verified all buttons and links have visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#D4AF37]`).
   - Verified all text meets WCAG AA contrast standards over dark espresso backgrounds.

---

## 7. Image and Asset Credits

All images used within the application were custom-synthesized using Google's generative visual imaging pipeline specifically for the fictional brand **BREWORA**:
- **Hero Banner**: High-resolution artisanal espresso extraction in matte black cup with golden crema on walnut table (`hero_luxury_coffee`).
- **Product Packaging**: BREWORA dark roast bean bag with gold typography and whole beans on slate (`product_signature_espresso`).
- **Latte Visual**: Cafe latte with rosetta microfoam in ceramic cup (`product_velvet_latte`).
- **Cold Brew Visual**: Nitro cold brew amber bottle with iced crystal glass (`product_nitro_cold_brew`).
- **Craft Roastery**: Artisan coffee roaster with vintage brass and matte black roasting cooling tray (`craft_roastery_process`).
- **Icons**: [Lucide Icons](https://lucide.dev) (Open Source, ISC License).
- **Typography**: [Google Fonts](https://fonts.google.com) (Open Font License): Playfair Display, Cinzel, Plus Jakarta Sans.
