
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Video, Plus, Package, DollarSign, Settings, TrendingUp, Edit2, Trash2, X, Image as ImageIcon, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

const SellerDashboard: React.FC = () => {
  const { user, sellerProducts, addProduct, updateProduct, deleteProduct } = useStore();
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(false);
  
  // Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add/Edit
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stockCount: 1,
    category: 'Apparel',
    description: '',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop'
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      price: 0,
      stockCount: 1,
      category: 'Apparel',
      description: '',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop'
    });
    setIsProductModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price) return;
    
    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct({
        name: productForm.name,
        price: Number(productForm.price),
        stockCount: Number(productForm.stockCount),
        category: productForm.category || 'Apparel',
        description: productForm.description,
        image: productForm.image || '',
        inStock: (productForm.stockCount || 0) > 0,
      });
    }
    setIsProductModalOpen(false);
  };

  // If new seller hasn't completed onboarding, prompt them (fallback safety)
  if (user?.role === 'seller' && !user.sellerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Setup Incomplete</h2>
          <p className="mb-4 text-slate-500">Please complete your shop profile to access the dashboard.</p>
          <button onClick={() => navigate('/seller-onboarding')} className="px-6 py-2 bg-primary text-white rounded-xl">Complete Setup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header with Go Live Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{user?.sellerProfile?.shopName || user?.name}</h1>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs">
                {user?.sellerProfile?.marketName || 'Local Market'}
              </span>
              •
              <span className="text-green-500">Verified Seller</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl pr-5 border border-slate-100 dark:border-slate-700">
               <button 
                 onClick={() => {
                   setIsLive(!isLive);
                   // When going live, navigate to video call with seller's store ID
                   if (!isLive) {
                     // Get store ID from seller's products, or use user ID as fallback
                     const storeId = sellerProducts.length > 0 && sellerProducts[0].storeId 
                       ? sellerProducts[0].storeId 
                       : user?.id || 'default';
                     navigate(`/video-call/${storeId}`);
                   }
                 }}
                 className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-md ${isLive ? 'bg-red-500 text-white shadow-red-500/30 animate-pulse' : 'bg-white dark:bg-slate-700 text-slate-400'}`}
               >
                 <Video size={24} />
               </button>
               <div className="flex flex-col">
                 <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Store Status</span>
                 <span className={`text-sm font-bold ${isLive ? 'text-red-500' : 'text-slate-500'}`}>
                   {isLive ? 'LIVE NOW' : 'OFFLINE'}
                 </span>
               </div>
             </div>
             <button 
               onClick={openAddModal}
               className="h-14 px-6 bg-primary text-white rounded-2xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 flex items-center gap-2 transition-transform transform hover:-translate-y-0.5"
             >
               <Plus size={20} /> Add Product
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl">
                   <Package size={28} />
                </div>
                <div>
                   <p className="text-slate-500 text-sm font-medium">Total Products</p>
                   <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{sellerProducts.length}</p>
                </div>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-2xl">
                   <DollarSign size={28} />
                </div>
                <div>
                   <p className="text-slate-500 text-sm font-medium">Revenue</p>
                   <p className="text-3xl font-extrabold text-slate-900 dark:text-white">₹ 8,400</p>
                </div>
             </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-2xl">
                   <Video size={28} />
                </div>
                <div>
                   <p className="text-slate-500 text-sm font-medium">Call Requests</p>
                   <p className="text-3xl font-extrabold text-slate-900 dark:text-white">5</p>
                </div>
             </div>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Inventory Management</h2>
            <button 
              onClick={() => navigate('/seller-profile')}
              className="text-slate-500 hover:text-primary p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-bold"
            >
              <Settings size={18} /> Edit Shop Profile
            </button>
          </div>
          <table className="w-full text-left">
             <thead className="bg-white dark:bg-slate-900 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
               <tr>
                 <th className="px-8 py-5">Product Name</th>
                 <th className="px-8 py-5">Category</th>
                 <th className="px-8 py-5">Price</th>
                 <th className="px-8 py-5">Stock</th>
                 <th className="px-8 py-5 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
               {sellerProducts.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="px-8 py-10 text-center text-slate-500">
                     No products added yet. Click "Add Product" to start.
                   </td>
                 </tr>
               ) : (
                 sellerProducts.map(p => (
                   <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                     <td className="px-8 py-5 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                       <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" alt={p.name} />
                       {p.name}
                     </td>
                     <td className="px-8 py-5 text-slate-600 dark:text-slate-400 text-sm">{p.category}</td>
                     <td className="px-8 py-5 text-slate-600 dark:text-slate-400 font-medium">₹ {p.price}</td>
                     <td className="px-8 py-5">
                       <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${(p.stockCount || 0) < 5 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                         <span className={`w-1.5 h-1.5 rounded-full ${(p.stockCount || 0) < 5 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                         {p.stockCount} Units
                       </span>
                     </td>
                     <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                           <button onClick={() => openEditModal(p)} className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                             <Edit2 size={16} />
                           </button>
                           <button onClick={() => deleteProduct(p.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                             <Trash2 size={16} />
                           </button>
                        </div>
                     </td>
                   </tr>
                 ))
               )}
             </tbody>
          </table>
        </div>

        {/* Add/Edit Product Modal */}
        {isProductModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                 <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                       {editingProduct ? <Edit2 size={20} className="text-primary"/> : <Plus size={20} className="text-primary"/>}
                       {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                       <X size={24} />
                    </button>
                 </div>
                 
                 <div className="p-8 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">Product Name</label>
                       <input 
                         type="text" 
                         value={productForm.name}
                         onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                         className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                         placeholder="e.g. Red Cotton Saree"
                       />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Price (₹)</label>
                          <input 
                            type="number" 
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-500 mb-1">Stock</label>
                          <input 
                            type="number" 
                            value={productForm.stockCount}
                            onChange={(e) => setProductForm({...productForm, stockCount: Number(e.target.value)})}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                          />
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">Category</label>
                       <select 
                          value={productForm.category}
                          onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                          className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white"
                       >
                          <option value="Apparel">Apparel</option>
                          <option value="Jewelry">Jewelry</option>
                          <option value="Footwear">Footwear</option>
                          <option value="Decor">Decor</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">Image URL (Mock)</label>
                       <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={productForm.image}
                            onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white text-xs"
                          />
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                             {productForm.image ? <img src={productForm.image} className="w-full h-full object-cover"/> : <ImageIcon size={20} className="text-slate-400"/>}
                          </div>
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-500 mb-1">Description</label>
                       <textarea 
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary dark:text-white h-24 resize-none"
                       ></textarea>
                    </div>
                 </div>

                 <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <button 
                       onClick={handleSaveProduct}
                       className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                    >
                       <Save size={20} /> {editingProduct ? 'Update Product' : 'Save Product'}
                    </button>
                 </div>
              </div>
           </div>
        )}

      </div>
    </div>
  );
};

export default SellerDashboard;
