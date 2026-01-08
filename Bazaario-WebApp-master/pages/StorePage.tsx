import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, EnrichedStore } from '../services/api';
import { ArrowLeft, Video, MessageCircle, Share2, MapPin, Star, Clock, Info, BookOpen } from 'lucide-react';
import { Product } from '../types';

const StorePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [store, setStore] = useState<EnrichedStore | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const [s, p] = await Promise.all([api.getStore(id), api.getProducts(id)]);
        setStore(s);
        setProducts(p);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!store) return <div className="p-8">Store not found</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-dark pb-24">
       {/* Hero Image */}
       <div className="relative h-64 md:h-80">
          <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* Top Nav */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10">
             <button onClick={() => navigate(-1)} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
               <ArrowLeft size={20} />
             </button>
             <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-colors">
               <Share2 size={20} />
             </button>
          </div>

          {/* Store Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
             <div className="flex justify-between items-end">
                <div>
                   <h1 className="text-3xl font-bold mb-1">{store.name}</h1>
                   <div className="flex items-center gap-2 text-sm opacity-90">
                      <MapPin size={14} /> {store.location || 'Main Lane'}, {store.category}
                   </div>
                </div>
                <div className="bg-white text-slate-900 px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-sm">
                   {store.rating} <Star size={12} fill="currentColor" className="text-yellow-500" />
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
          
          {/* Status & Owner */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                   <img src={`https://ui-avatars.com/api/?name=${store.ownerName}&background=random`} alt="Owner" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Shop Owner</p>
                   <p className="font-bold text-slate-900 dark:text-white">{store.ownerName}</p>
                </div>
             </div>
             {store.isLive ? (
                <div className="flex flex-col items-end">
                   <span className="flex items-center gap-1.5 text-red-600 font-bold text-sm animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-red-600"></span> Live Now
                   </span>
                   <span className="text-xs text-slate-500">Fast response</span>
                </div>
             ) : (
                <div className="text-right">
                   <span className="text-slate-500 text-sm font-medium">Currently Offline</span>
                   <p className="text-xs text-slate-400">Opens at 10 AM</p>
                </div>
             )}
          </div>

          {/* Description */}
          <div>
             <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Info size={18} className="text-primary" /> About Shop
             </h3>
             <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                {store.description || "Welcome to our shop! We provide the best quality products at affordable prices. Connect with us on video call to see our latest collection live."}
             </p>
          </div>

          {/* Catalog Preview */}
          <div>
             <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                   <BookOpen size={18} className="text-primary" /> Catalogues & Brochures
                </h3>
                <button className="text-primary text-sm font-bold">View All</button>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {products.map(product => (
                   <div key={product.id} className="bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                      <div className="aspect-square relative">
                         <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                      </div>
                      <div className="p-3">
                         <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.name}</p>
                         <p className="text-xs text-slate-500">₹ {product.price}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* Fixed Bottom Action Bar */}
       <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4 z-40 safe-pb">
          <div className="max-w-4xl mx-auto flex gap-4">
             <button className="flex-1 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <MessageCircle size={20} /> Chat
             </button>
             <button 
                onClick={() => navigate('/video-call')}
                disabled={!store.isLive}
                className={`flex-[2] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30 transition-all ${store.isLive ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'}`}
             >
                <Video size={20} /> {store.isLive ? 'Video Call Now' : 'Notify When Live'}
             </button>
          </div>
       </div>
    </div>
  );
};

export default StorePage;