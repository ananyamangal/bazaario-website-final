import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, EnrichedStore } from '../services/api';
import { Market } from '../types';
import { ArrowLeft, Search, Filter, Star, Video, Zap } from 'lucide-react';

const MarketPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [market, setMarket] = useState<Market | undefined>(undefined);
  const [stores, setStores] = useState<EnrichedStore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [m, s] = await Promise.all([api.getMarket(id), api.getStores(id)]);
        setMarket(m);
        setStores(s);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-50 dark:bg-dark flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!market) return <div className="p-8">Market not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-700 dark:text-white" />
          </button>
          <div className="flex-1">
             <h1 className="text-xl font-bold text-slate-900 dark:text-white">{market.name}</h1>
             <p className="text-xs text-slate-500">{stores.length} Shops Available</p>
          </div>
          <button className="p-2 text-slate-500 hover:text-primary"><Search size={20} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Ad Sense Banner Area */}
        <div className="mb-8 w-full h-32 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-orange-200 dark:border-slate-700 flex items-center justify-center relative overflow-hidden">
           <div className="absolute top-2 right-2 bg-black/10 px-1.5 rounded text-[10px] uppercase font-bold text-slate-500">Ad</div>
           <div className="text-center">
             <h3 className="text-orange-600 dark:text-orange-400 font-bold text-lg">⚡ Flash Deal of the Hour</h3>
             <p className="text-slate-600 dark:text-slate-400 text-sm">Get 20% off on all jewelry shops in {market.name}</p>
           </div>
        </div>

        <div className="flex justify-between items-center mb-6">
           <h2 className="font-bold text-lg text-slate-900 dark:text-white">Available Shops</h2>
           <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
             <Filter size={14} /> Filter
           </button>
        </div>

        {/* Shops List */}
        <div className="space-y-4">
           {stores.map(store => (
             <div 
               key={store.id} 
               onClick={() => navigate(`/store/${store.id}`)}
               className="bg-white dark:bg-slate-900 rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-100 dark:border-slate-800"
             >
                {/* Store Image */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
                   <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
                   {store.isLive && (
                     <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                        <Video size={10} /> LIVE
                     </div>
                   )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-center">
                   <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{store.name}</h3>
                      <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded text-xs font-bold">
                         {store.rating} <Star size={10} fill="currentColor" />
                      </div>
                   </div>
                   <p className="text-sm text-slate-500 mb-1">{store.category} • {store.location || 'Main Market'}</p>
                   
                   <div className="flex flex-wrap gap-2 mt-2">
                      {store.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPage;