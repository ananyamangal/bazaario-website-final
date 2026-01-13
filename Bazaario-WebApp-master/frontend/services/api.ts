import { Market, Product, Store } from '../types';

// Enhanced Types for internal mock usage
export interface EnrichedStore extends Store {
  category: string;
  viewerCount: number;
  tags: string[];
  description?: string;
  location?: string;
}

// Mock Data
const MARKETS: Market[] = [
  {
    id: 'm1',
    name: 'Sarojini Nagar',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=1000&auto=format&fit=crop',
    description: 'The fashion capital of Delhi. Trendy clothes at unbeatable prices.'
  },
  {
    id: 'm2',
    name: 'Lajpat Nagar',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1000&auto=format&fit=crop',
    description: 'Ethnic wear, fabrics, and delicious street food.'
  },
  {
    id: 'm3',
    name: 'Colaba Causeway',
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1000&auto=format&fit=crop',
    description: 'Jewelry, antiques, books, and vintage finds.'
  },
  {
    id: 'm4',
    name: 'Johari Bazaar',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop',
    description: 'Famous for gold, silver, stone jewelry and traditional textiles.'
  }
];

const STORES: EnrichedStore[] = [
  {
    id: 's1',
    marketId: 'm1',
    name: 'Fashion Hub',
    ownerName: 'Rahul Kumar',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
    isLive: true,
    rating: 4.8,
    category: 'Western Wear',
    viewerCount: 142,
    tags: ['Trendy', 'Sale'],
    description: 'We specialize in export surplus western wear. Tops, dresses, and denim at wholesale prices.',
    location: 'Shop 42, Lane 3'
  },
  {
    id: 's2',
    marketId: 'm1',
    name: 'Denim World',
    ownerName: 'Amit Singh',
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=800&auto=format&fit=crop',
    isLive: true,
    rating: 4.5,
    category: 'Men\'s Fashion',
    viewerCount: 89,
    tags: ['Jeans', 'Jackets'],
    description: 'Premium denim for men. Rugged, stylish, and durable.',
    location: 'Shop 12, Main Road'
  },
  {
    id: 's3',
    marketId: 'm2',
    name: 'Ethnic Vibes',
    ownerName: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
    isLive: true,
    rating: 4.9,
    category: 'Ethnic Wear',
    viewerCount: 356,
    tags: ['Kurtas', 'Fabrics'],
    description: 'Hand-block printed fabrics and designer kurtas direct from manufacturers.',
    location: 'Stall 88, Central Market'
  },
  {
    id: 's4',
    marketId: 'm3',
    name: 'Antique Alley',
    ownerName: 'Cyrus Mistry',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop',
    isLive: false,
    rating: 4.7,
    category: 'Decor',
    viewerCount: 0,
    tags: ['Vintage', 'Rare'],
    description: 'Curated vintage collectibles and home decor items.',
    location: 'Causeway Lane 4'
  },
  {
    id: 's5',
    marketId: 'm4',
    name: 'Royal Gems',
    ownerName: 'Rajendra Prasad',
    image: 'https://images.unsplash.com/photo-1617038220319-88af15057bd5?q=80&w=800&auto=format&fit=crop',
    isLive: true,
    rating: 5.0,
    category: 'Jewelry',
    viewerCount: 204,
    tags: ['Silver', 'Gold'],
    description: 'Authentic Kundan and Polki jewelry. Certified gemstones.',
    location: 'Johari Main Gate'
  }
];

const PRODUCTS: Product[] = [
  { id: 'p1', storeId: 's1', name: 'Floral Summer Dress', price: 450, category: 'Clothing', inStock: true, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop' },
  { id: 'p2', storeId: 's1', name: 'Oversized T-Shirt', price: 300, category: 'Clothing', inStock: true, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=400&auto=format&fit=crop' },
  { id: 'p3', storeId: 's3', name: 'Embroidered Kurta', price: 1200, category: 'Ethnic', inStock: true, image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=400&auto=format&fit=crop' },
  { id: 'p4', storeId: 's3', name: 'Silk Scarf', price: 500, category: 'Accessories', inStock: true, image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa3e?q=80&w=400&auto=format&fit=crop' },
];

// API Methods
export const api = {
  getMarkets: async (): Promise<Market[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(MARKETS), 500));
  },
  getMarket: async (id: string): Promise<Market | undefined> => {
    return new Promise((resolve) => setTimeout(() => resolve(MARKETS.find(m => m.id === id)), 400));
  },
  getStores: async (marketId?: string): Promise<EnrichedStore[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (marketId) {
          resolve(STORES.filter(s => s.marketId === marketId));
        } else {
          resolve(STORES);
        }
      }, 500);
    });
  },
  getStore: async (id: string): Promise<EnrichedStore | undefined> => {
     return new Promise((resolve) => setTimeout(() => resolve(STORES.find(s => s.id === id)), 400));
  },
  getProducts: async (storeId?: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (storeId) {
          resolve(PRODUCTS.filter(p => p.storeId === storeId));
        } else {
          resolve(PRODUCTS);
        }
      }, 500);
    });
  },
  getVideoCallRoom: async (roomId: string): Promise<any> => {
    // Backend server URL - adjust if your server runs on a different port or domain
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001';
    try {
      const response = await fetch(`${backendUrl}/video-call/${roomId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Backend error (${response.status}): ${errorText || 'Failed to fetch video call room'}`);
      }
      const data = await response.json();
      if (!data || !data.url) {
        throw new Error('Invalid response from backend: missing room URL');
      }
      return data;
    } catch (error: any) {
      if (error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Make sure it is running on port 5001.');
      }
      throw error;
    }
  }
};