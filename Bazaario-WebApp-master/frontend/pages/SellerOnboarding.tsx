
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SellerProfile } from '../types';
import { Store, MapPin, Tag, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const SellerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { updateSellerProfile } = useStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState<SellerProfile>({
    shopName: '',
    ownerName: '',
    description: '',
    marketName: 'Sarojini Nagar',
    address: '',
    city: 'New Delhi',
    categories: [],
    bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
    contactNumber: ''
  });

  const categoriesList = ['Apparel', 'Jewelry', 'Footwear', 'Decor', 'Electronics', 'Bags', 'Fabrics'];

  const handleChange = (field: keyof SellerProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (cat: string) => {
    setFormData(prev => {
      if (prev.categories.includes(cat)) {
        return { ...prev, categories: prev.categories.filter(c => c !== cat) };
      }
      return { ...prev, categories: [...prev.categories, cat] };
    });
  };

  const handleFinish = () => {
    updateSellerProfile(formData);
    navigate('/seller-dashboard');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-bold ${step >= 1 ? 'text-primary' : 'text-slate-300'}`}>Basic Info</span>
            <span className={`text-sm font-bold ${step >= 2 ? 'text-primary' : 'text-slate-300'}`}>Location</span>
            <span className={`text-sm font-bold ${step >= 3 ? 'text-primary' : 'text-slate-300'}`}>Categories</span>
          </div>
          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Store size={32} />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Tell us about your Shop</h2>
                 <p className="text-slate-500 mt-2">Create your digital storefront in seconds.</p>
              </div>
              
              <div className="space-y-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Shop Name</label>
                   <input 
                     type="text" 
                     value={formData.shopName}
                     onChange={(e) => handleChange('shopName', e.target.value)}
                     className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white"
                     placeholder="e.g. Ramesh Textiles"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Owner Name</label>
                   <input 
                     type="text" 
                     value={formData.ownerName}
                     onChange={(e) => handleChange('ownerName', e.target.value)}
                     className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white"
                     placeholder="Your Full Name"
                   />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Shop Description</label>
                   <textarea 
                     value={formData.description}
                     onChange={(e) => handleChange('description', e.target.value)}
                     className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white h-24 resize-none"
                     placeholder="What makes your shop special?"
                   />
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)} 
                disabled={!formData.shopName || !formData.ownerName}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <MapPin size={32} />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Where are you located?</h2>
                 <p className="text-slate-500 mt-2">Help customers find your physical store.</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Market</label>
                     <select 
                       value={formData.marketName}
                       onChange={(e) => handleChange('marketName', e.target.value)}
                       className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white"
                     >
                        <option value="Sarojini Nagar">Sarojini Nagar</option>
                        <option value="Lajpat Nagar">Lajpat Nagar</option>
                        <option value="Johari Bazaar">Johari Bazaar</option>
                        <option value="Colaba Causeway">Colaba Causeway</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">City</label>
                     <input 
                       type="text" 
                       value={formData.city}
                       onChange={(e) => handleChange('city', e.target.value)}
                       className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white"
                     />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Shop Number / Address</label>
                   <input 
                     type="text" 
                     value={formData.address}
                     onChange={(e) => handleChange('address', e.target.value)}
                     className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-transparent focus:ring-2 focus:ring-primary dark:text-white"
                     placeholder="e.g. Shop 42, Lane 3"
                   />
                </div>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setStep(1)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">Back</button>
                 <button 
                   onClick={() => setStep(3)} 
                   disabled={!formData.address}
                   className="flex-[2] py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                 >
                   Next Step <ArrowRight size={20} />
                 </button>
              </div>
            </div>
          )}

          {/* Step 3: Categories */}
          {step === 3 && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-8">
                 <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    <Tag size={32} />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white">What do you sell?</h2>
                 <p className="text-slate-500 mt-2">Select all categories that apply.</p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center mb-8">
                 {categoriesList.map(cat => (
                   <button
                     key={cat}
                     onClick={() => toggleCategory(cat)}
                     className={`px-6 py-3 rounded-full text-sm font-bold border transition-all ${
                       formData.categories.includes(cat)
                         ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                         : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-primary'
                     }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setStep(2)} className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">Back</button>
                 <button 
                   onClick={handleFinish} 
                   disabled={formData.categories.length === 0}
                   className="flex-[2] py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                 >
                   Launch Shop <Check size={20} />
                 </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;
