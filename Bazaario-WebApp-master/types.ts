
export type UserRole = 'customer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  sellerProfile?: SellerProfile;
}

export interface SellerProfile {
  shopName: string;
  ownerName: string;
  description: string;
  marketName: string; // e.g., Sarojini
  address: string; // Shop No, Lane
  city: string;
  gstin?: string; // Optional
  categories: string[];
  bannerImage: string;
  contactNumber: string;
}

export interface Market {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  marketId: string;
  ownerName: string;
  image: string;
  isLive: boolean; 
  rating: number;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string; // Added
  inStock: boolean;
  stockCount?: number; // Added
}

export interface CartItem extends Product {
  quantity: number;
}

export interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  storeName: string;
  items: InvoiceItem[];
  total: number;
  timestamp: Date;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
}
