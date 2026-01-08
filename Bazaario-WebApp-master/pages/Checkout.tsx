import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, CreditCard, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, removeFromCart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState<'cart' | 'address' | 'success'>('cart');
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-100 dark:border-slate-800">
           <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle size={40} className="text-green-600" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Order Confirmed!</h2>
           <p className="text-slate-500 mb-8">Your order from Sarojini Nagar will arrive in 2 days.</p>
           <Link to="/dashboard" className="block w-full py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all">
             Back to Dashboard
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-4 mb-8">
           <Link to="/dashboard" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
             <ArrowLeft size={24} className="text-slate-700 dark:text-white" />
           </Link>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
             {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left Column */}
           <div className="lg:col-span-2 space-y-6">
              
              {step === 'cart' ? (
                cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4">
                       <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl" />
                       <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3>
                            <p className="text-sm text-slate-500">{item.category}</p>
                          </div>
                          <div className="flex justify-between items-end">
                             <div className="font-bold text-primary">₹ {item.price} x {item.quantity}</div>
                             <button onClick={() => removeFromCart(item.id)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                               <Trash2 size={18} />
                             </button>
                          </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-slate-500 text-lg">Your cart is empty.</p>
                    <Link to="/dashboard" className="text-primary font-semibold mt-4 inline-block">Start Shopping</Link>
                  </div>
                )
              ) : (
                // Address Form
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                    <MapPin size={20} className="text-primary" /> Delivery Address
                  </h3>
                  <form className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary dark:text-white" />
                    <input type="text" placeholder="Street Address" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary dark:text-white" />
                    <div className="grid grid-cols-2 gap-4">
                       <input type="text" placeholder="City" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary dark:text-white" />
                       <input type="text" placeholder="PIN Code" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary dark:text-white" />
                    </div>
                  </form>
                </div>
              )}
           </div>

           {/* Right Column - Summary */}
           <div className="lg:col-span-1">
             <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-24">
                <h3 className="font-bold text-xl mb-6 text-slate-900 dark:text-white">Order Summary</h3>
                <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-slate-500">
                     <span>Subtotal</span>
                     <span>₹ {cartTotal}</span>
                   </div>
                   <div className="flex justify-between text-slate-500">
                     <span>Delivery Fee</span>
                     <span>₹ 40</span>
                   </div>
                   <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
                   <div className="flex justify-between font-bold text-lg text-slate-900 dark:text-white">
                     <span>Total</span>
                     <span>₹ {cartTotal > 0 ? cartTotal + 40 : 0}</span>
                   </div>
                </div>
                
                {step === 'cart' ? (
                  <button 
                    onClick={() => setStep('address')}
                    disabled={cart.length === 0}
                    className="w-full py-3.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <button 
                    onClick={handlePayment}
                    className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 shadow-lg shadow-green-500/20 flex items-center justify-center gap-2 transition-all"
                  >
                    {loading ? 'Processing...' : <><CreditCard size={20} /> Pay Now</>}
                  </button>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;