import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { api } from '../services/api';
import { Market } from '../types';
import { MapPin, Search, Tag, ShoppingBag, ArrowRight } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  const { user } = useStore();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'customer') {
      navigate('/auth');
      return;
    }

    const fetchData = async () => {
      const m = await api.getMarkets();
      setMarkets(m);
      setLoading(false);
    };
    fetchData();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-dark">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Locating markets nearby...</p>
      </div>
    );
  }

  const categories = [
    { name: 'Clothes', icon: '👕' },
    { name: 'Home Decor', icon: '🛋️' },
    { name: 'Accessories', icon: '👜' },
    { name: 'Jewelry', icon: '💎' },
    { name: 'Footwear', icon: '👟' },
    { name: 'Electronics', icon: '🔌' },
  ];

  const visualCategories = [
    { name: 'Fashion & Apparel', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop', count: '120+ Stores' },
    { name: 'Jewelry & Gems', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', count: '85+ Stores' },
    { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=800&auto=format&fit=crop', count: '60+ Stores' },
    { name: 'Footwear', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop', count: '40+ Stores' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Explore Markets</h1>
           <p className="text-slate-500 mt-2">Select a market to video call shops directly.</p>
        </div>

        {/* Categories (Pills) */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          {categories.map((cat) => (
            <button key={cat.name} className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 transition-all whitespace-nowrap">
              <span className="text-xl">{cat.icon}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Markets Grid (Blinkit Style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {markets.map((market) => (
            <div 
              key={market.id} 
              onClick={() => navigate(`/market/${market.id}`)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 transform hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={market.image} 
                  alt={market.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-bold text-lg leading-tight">{market.name}</h3>
                  <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                    <MapPin size={12} /> {market.location}
                  </div>
                </div>
              </div>
              <div className="p-4">
                 <p className="text-xs text-slate-500 line-clamp-2 mb-3">{market.description}</p>
                 <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded w-fit">
                    <Tag size={12} /> Live Deals Available
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* NEW Explore by Category Section */}
        <div className="mt-16">
           <div className="flex justify-between items-end mb-6">
             <div>
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shop by Category</h2>
               <p className="text-slate-500 mt-1">Curated collections from across all markets</p>
             </div>
             <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">View All <ArrowRight size={16}/></button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {visualCategories.map((cat, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden aspect-[3/4] group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                   <div className="absolute bottom-0 left-0 w-full p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg leading-tight mb-1">{cat.name}</h3>
                      <p className="text-xs text-slate-300 font-medium">{cat.count}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Promo Banner / Ad Sense Area */}
        <div className="mt-12 rounded-3xl overflow-hidden relative h-48 md:h-64 shadow-lg group cursor-pointer">
           <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Sale" />
           <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center p-8 md:p-12">
              <div className="text-white max-w-lg">
                 <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">Limited Time</span>
                 <h2 className="text-3xl md:text-4xl font-extrabold mb-4">The Big Local Sale is Live!</h2>
                 <p className="mb-6 opacity-90">Get up to 60% off on winter wear from Sarojini Nagar.</p>
                 <button className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                   Shop Now <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDashboard;