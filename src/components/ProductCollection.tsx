import React, { useState, useMemo } from 'react';
import { CoffeeCategory, Product } from '../types';
import { ShoppingBag, Eye, Star, Search, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ProductCollectionProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number, grind?: string, size?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CoffeeCategory>('All Coffee');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: CoffeeCategory[] = [
    'All Coffee',
    'Espresso',
    'Latte',
    'Cappuccino',
    'Cold Coffee',
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'All Coffee' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.notes.some((n) => n.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collection" className="py-24 bg-[#17100B] text-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
            Handcrafted Reserve
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#FDFBF7] mb-4">
            Our Coffee Collection
          </h2>
          <p className="text-sm sm:text-base text-[#BFB0A3] leading-relaxed text-balance">
            Explore our curated roasts—from high-altitude single origins to velvety milk-pairing blends.
            Every batch is precision-roasted to unlock inherent terroir and sweetness.
          </p>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#2C1F17]">
          {/* Working Category Filters */}
          <div
            className="flex items-center gap-1.5 p-1 bg-[#20150F] rounded-xl border border-[#332218] overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label="Filter coffee by category"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-medium tracking-wide uppercase transition-all duration-200 rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C68B59] to-[#B2733E] text-[#120B08] font-semibold shadow-md'
                      : 'text-[#C5B7AA] hover:text-[#FDFBF7] hover:bg-[#2C1F17]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search and Sort Toolbar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7A6D]" />
              <input
                type="text"
                placeholder="Search notes, origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg bg-[#20150F] border border-[#332218] text-[#FDFBF7] placeholder-[#8C7A6D] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                aria-label="Search coffee collection"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A6D] hover:text-[#FDFBF7]"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <div className="relative w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-3.5 py-2 text-xs rounded-lg bg-[#20150F] border border-[#332218] text-[#E5DCD3] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
                aria-label="Sort coffee collection"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Counter & Metadata */}
        <div className="flex items-center justify-between text-xs text-[#9E8C7E] mb-6">
          <div className="flex items-center gap-2">
            <span>Showing <span className="font-semibold text-[#FDFBF7] tabular-nums">{filteredProducts.length}</span> coffees</span>
            {selectedCategory !== 'All Coffee' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#D4AF37]">{selectedCategory}</span>
              </>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#C68B59] hover:underline"
            >
              Reset search
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center rounded-2xl bg-[#1D140E] border border-[#2F1F17] p-8">
            <CoffeeCategoryIcon category={selectedCategory} />
            <h3 className="text-lg font-serif font-bold text-[#FDFBF7] mt-3 mb-1">
              No coffees found
            </h3>
            <p className="text-xs text-[#A8988B] max-w-md mx-auto mb-6">
              We couldn't find any coffee matching "{searchQuery}" in {selectedCategory}. Try resetting your search filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Coffee');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              View All Coffees
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              onQuickView={() => onQuickView(product)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onQuickView: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onQuickView }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-[#20150F] border border-[#332218] hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 overflow-hidden">
      
      {/* Product Image Slot with hover actions */}
      <div className="relative aspect-[4/3] w-full bg-[#1A100B] overflow-hidden">
        {/* Background Fallback Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#241710] to-[#140C08] flex items-center justify-center">
          <span className="text-[#3E291D] font-display text-4xl select-none">B</span>
        </div>

        <img
          src={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className={`relative z-10 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Badge (Clean and unboxed) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-[#150E0A]/90 backdrop-blur-sm border border-[#443022] text-[11px] font-semibold tracking-wider uppercase text-[#D4AF37]">
            {product.badge}
          </div>
        )}

        {/* Quick View Floating Button */}
        <button
          type="button"
          onClick={onQuickView}
          className="absolute bottom-3 right-3 z-20 p-2.5 rounded-full bg-[#150E0A]/90 hover:bg-[#D4AF37] text-[#FDFBF7] hover:text-[#120B08] border border-[#443022] hover:border-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 shadow-md focus:outline-none focus:opacity-100 cursor-pointer"
          title="Quick View Details"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Info Body */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Quiet Category & Origin Metadata (Zero-Pill) */}
          <div className="flex items-center gap-2 text-xs text-[#A69383] mb-2">
            <span className="uppercase tracking-widest text-[#C68B59] font-medium">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate max-w-[140px]">{product.origin}</span>
          </div>

          {/* Title */}
          <h3
            onClick={onQuickView}
            className="text-base sm:text-lg font-serif font-bold text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#B2A091] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>

          {/* Tasting Notes */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.notes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="text-[11px] text-[#D8CDC2] bg-[#291B13] px-2 py-0.5 rounded border border-[#3E291D]"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action Bottom Strip */}
        <div className="pt-4 border-t border-[#2F1F17] flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8A796C] block">Price</span>
            <span className="text-base font-bold text-[#FDFBF7] tabular-nums font-sans">
              PKR {product.price.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={onAddToCart}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#C68B59] hover:bg-[#D4AF37] text-[#120B08] text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer"
            aria-label={`Add ${product.name} to cart for PKR ${product.price}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};

const CoffeeCategoryIcon: React.FC<{ category: CoffeeCategory }> = ({ category }) => {
  return (
    <div className="w-12 h-12 rounded-full bg-[#2A1C14] border border-[#3E291D] mx-auto flex items-center justify-center text-[#C68B59]">
      <Sparkles className="w-6 h-6" />
    </div>
  );
};
