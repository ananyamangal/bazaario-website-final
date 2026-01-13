
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SellerProfile } from '../types';
import { Save, ArrowLeft, Upload, Camera } from 'lucide-react';

const SellerProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateSellerProfile } = useStore();
  
  const [formData, setFormData] = useState<SellerProfile>({
    shopName: '',
    ownerName: '',
    description: '',
    marketName: '',
    address: '',
    city: '',
    categories: [],
    bannerImage: '',
    contactNumber: ''
  });

  useEffect(() => {
    if (user?.sellerProfile) {
      setFormData(user.sellerProfile);
    } else {
        // Fallback or redirect if no profile exists
        if(user?.role === 'seller') navigate('/seller-onboarding');
        else navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (field: keyof SellerProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categoriesList = ['Apparel', 'Jewelry', 'Footwear', 'Decor', 'Electronics', 'Bags', 'Fabrics'];

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      if (prev.categories.includes(cat)) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      }
      return { ...prev, categories: [...prev.categories, cat] };
    });
  };

  const handleSave = () => {
    updateSellerProfile(formData);
    navigate('/seller-dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark pb-20">
       <div className="max-w-4xl mx-auto px-4 py-8">
          
          <div className="flex items-center gap-4 mb-8">
             <button onClick={() => navigate('/seller-dashboard')} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
             </button>
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Shop Profile</h1>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             
             {/* Banner Image Edit */}
             <div className="relative h-48 bg-slate-100 dark:bg-slate-800 group">
                <img src={formData.bannerImage} className="w-full h-full object-cover" alt="Banner" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                   <div className="text-white flex flex-col items-center">
                      <Camera size={32} />
                      <span className="text-sm font-bold mt-2">Change Cover Photo</span>
                   </div>
                </div>
             </div>

             <div className="p-8 space-y-8">
                
                {/* Section 1: Basic Info */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Basic Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-slate-500 mb-1">Shop Name</label>
                         <input 
                           type="text" 
                           value={formData.shopName}
                           onChange={(e) => handleChange('shopName', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-500 mb-1">Owner Name</label>
                         <input 
                           type="text" 
                           value={formData.ownerName}
                           onChange={(e) => handleChange('ownerName', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-slate-500 mb-1">Description</label>
                         <textarea 
                           value={formData.description}
                           onChange={(e) => handleChange('description', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white h-24"
                         />
                      </div>
                   </div>
                </div>

                {/* Section 2: Location */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Location Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-sm font-medium text-slate-500 mb-1">Market</label>
                         <select 
                           value={formData.marketName}
                           onChange={(e) => handleChange('marketName', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         >
                            <option value="Sarojini Nagar">Sarojini Nagar</option>
                            <option value="Lajpat Nagar">Lajpat Nagar</option>
                            <option value="Johari Bazaar">Johari Bazaar</option>
                            <option value="Colaba Causeway">Colaba Causeway</option>
                         </select>
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-slate-500 mb-1">City</label>
                         <input 
                           type="text" 
                           value={formData.city}
                           onChange={(e) => handleChange('city', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         />
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-slate-500 mb-1">Address</label>
                         <input 
                           type="text" 
                           value={formData.address}
                           onChange={(e) => handleChange('address', e.target.value)}
                           className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         />
                      </div>
                   </div>
                </div>

                {/* Section 3: Categories */}
                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Categories</h3>
                   <div className="flex flex-wrap gap-2">
                     {categoriesList.map(cat => (
                       <button
                         key={cat}
                         onClick={() => toggleCategory(cat)}
                         className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                           formData.categories.includes(cat)
                             ? 'bg-primary text-white border-primary'
                             : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200'
                         }`}
                       >
                         {cat}
                       </button>
                     ))}
                   </div>
                </div>

                <div className="pt-6">
                   <button 
                     onClick={handleSave}
                     className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                   >
                     <Save size={20} /> Save Changes
                   </button>
                </div>

             </div>
          </div>
       </div>
    </div>
  );
};

export default SellerProfilePage;
