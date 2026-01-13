
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, CartItem, Product, Invoice, InvoiceItem, SellerProfile } from '../types';

interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  user: User | null;
  login: (role: 'customer' | 'seller') => void;
  logout: () => void;
  
  // Seller Profile Logic
  updateSellerProfile: (profile: SellerProfile) => void;
  
  // Product Management (Seller)
  sellerProducts: Product[];
  addProduct: (product: Omit<Product, 'id' | 'storeId'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart Logic
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Live Invoice Logic (Video Call)
  currentInvoice: Invoice | null;
  sendInvoice: (items: InvoiceItem[], storeName: string) => void;
  acceptInvoice: () => void;
  clearInvoice: () => void;
}

const StoreContext = createContext<AppState | undefined>(undefined);

// Initial Mock Products for Seller
const INITIAL_SELLER_PRODUCTS: Product[] = [
  { id: '1', storeId: 'u1', name: 'Cotton Shirt', price: 400, stockCount: 20, inStock: true, category: 'Apparel', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop', description: 'Pure cotton summer shirt.' },
  { id: '2', storeId: 'u1', name: 'Denim Jeans', price: 800, stockCount: 15, inStock: true, category: 'Apparel', image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=400&auto=format&fit=crop', description: 'Rugged blue denim.' },
  { id: '3', storeId: 'u1', name: 'Silk Saree', price: 2500, stockCount: 5, inStock: true, category: 'Ethnic', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop', description: 'Banarasi silk saree.' },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  
  // Seller State
  const [sellerProducts, setSellerProducts] = useState<Product[]>(INITIAL_SELLER_PRODUCTS);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const login = (role: 'customer' | 'seller') => {
    const mockUser: User = {
      id: 'u1',
      name: role === 'customer' ? 'Aditi Verma' : 'Ramesh Textiles',
      email: 'test@bazaario.in',
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${role === 'customer' ? 'Aditi' : 'Ramesh'}&background=F18288&color=fff`,
      // If seller, we provide a default mock profile for now, or null to trigger onboarding
      sellerProfile: role === 'seller' ? undefined : undefined 
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    setCurrentInvoice(null);
  };

  // Seller Methods
  const updateSellerProfile = (profile: SellerProfile) => {
    if (user) {
      setUser({ ...user, sellerProfile: profile, name: profile.shopName });
    }
  };

  const addProduct = (product: Omit<Product, 'id' | 'storeId'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      storeId: user?.id || 'guest',
    };
    setSellerProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setSellerProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setSellerProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart Methods
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Invoice Methods
  const sendInvoice = (items: InvoiceItem[], storeName: string) => {
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const newInvoice: Invoice = {
      id: Math.random().toString(36).substr(2, 9),
      storeName,
      items,
      total,
      timestamp: new Date()
    };
    setCurrentInvoice(newInvoice);
  };

  const acceptInvoice = () => {
    if (!currentInvoice) return;
    const newCartItems: CartItem[] = currentInvoice.items.map((item, index) => ({
      id: `inv-${currentInvoice.id}-${index}`,
      storeId: 'current-store',
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=200&auto=format&fit=crop',
      category: 'Live Purchase',
      inStock: true
    }));
    setCart(prev => [...prev, ...newCartItems]);
    setCurrentInvoice(null);
  };

  const clearInvoice = () => setCurrentInvoice(null);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{ 
      theme, toggleTheme, 
      user, login, logout, 
      updateSellerProfile, sellerProducts, addProduct, updateProduct, deleteProduct,
      cart, addToCart, removeFromCart, clearCart, cartTotal,
      currentInvoice, sendInvoice, acceptInvoice, clearInvoice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
