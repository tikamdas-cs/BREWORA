export type CoffeeCategory = 'All Coffee' | 'Espresso' | 'Latte' | 'Cappuccino' | 'Cold Coffee';

export interface Product {
  id: string;
  name: string;
  category: 'Espresso' | 'Latte' | 'Cappuccino' | 'Cold Coffee';
  price: number; // in PKR
  rating: number;
  reviewCount: number;
  shortDescription: string;
  fullDescription: string;
  roastLevel: 'Light Roast' | 'Medium Roast' | 'Medium-Dark Roast' | 'Dark Roast';
  origin: string;
  notes: string[];
  altitude: string;
  image: string;
  inStock: boolean;
  grindOptions: string[];
  sizeOptions: string[];
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedGrind: string;
  selectedSize: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  favoriteProduct: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Espresso Bar' | 'Artisan Lattes' | 'Slow Bar & Pour Over' | 'Cold Crafts';
  description: string;
  price: number; // in PKR
  flavorProfile: string;
  strength: 'Mild' | 'Balanced' | 'Intense';
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  items: CartItem[];
  placedAt: string;
}
