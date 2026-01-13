
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Logo } from '../components/Logo';
import { Phone, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

const Auth: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'seller'>('customer');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(role);
      // Redirect Logic: Sellers go to onboarding first to fill details
      if (role === 'seller') {
        navigate('/seller-onboarding');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex">
      {/* Left: Form Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10 bg-white dark:bg-slate-900">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Logo className="mb-8" />
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {step === 'phone' ? 'Welcome back' : 'Verify Identity'}
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              {step === 'phone' 
                ? 'Please enter your details to access your account.' 
                : `We've sent a 4-digit code to +91 ${phoneNumber}`
              }
            </p>
          </div>

          <div className="mt-8">
             {step === 'phone' && (
                <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8">
                  <button
                    onClick={() => setRole('customer')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      role === 'customer' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Shopper
                  </button>
                  <button
                    onClick={() => setRole('seller')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      role === 'seller' 
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10' 
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Seller
                  </button>
                </div>
              )}

            {step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mobile Number
                  </label>
                  <div className="mt-2 relative rounded-xl shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none border-r border-slate-200 dark:border-slate-700 pr-3">
                      <span className="text-slate-500 sm:text-sm font-medium">IN +91</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="block w-full pl-24 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white transition-all font-medium"
                      placeholder="98765 43210"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length < 10}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
                </button>
              </form>
            ) : (
               <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="flex gap-4 justify-between">
                   {[1, 2, 3, 4].map((idx) => (
                     <input
                       key={idx}
                       type="text"
                       maxLength={1}
                       autoFocus={idx === 1}
                       className="w-16 h-16 text-center text-3xl font-bold border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-2xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all caret-primary"
                     />
                   ))}
                 </div>
                 
                 <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : 'Verify Code'}
                </button>
                
                <p className="text-center">
                  <button type="button" onClick={() => setStep('phone')} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    Wrong number? <span className="text-primary font-semibold">Change</span>
                  </button>
                </p>
               </form>
            )}

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-slate-900 text-slate-500">Secure & Trusted</span>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4 grayscale opacity-50">
                 {/* Trusted Logos Placeholder */}
                 <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                 <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                 <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image Section (Hidden on Mobile) */}
      <div className="hidden lg:block relative w-0 flex-1 overflow-hidden bg-slate-900">
         <img 
           className="absolute inset-0 h-full w-full object-cover opacity-60" 
           src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=2000&auto=format&fit=crop" 
           alt="Market" 
         />
         <div className="absolute inset-0 bg-gradient-to-l from-slate-900 via-slate-900/40 to-transparent"></div>
         <div className="absolute bottom-0 left-0 p-20 text-white z-10 max-w-2xl">
            <h2 className="text-5xl font-extrabold mb-6 leading-tight">Experience the noise,<br/>color, and joy.</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <CheckCircle2 className="text-primary h-6 w-6" />
                 <span className="text-lg font-medium text-slate-200">Live Video Shopping</span>
              </div>
              <div className="flex items-center gap-3">
                 <CheckCircle2 className="text-primary h-6 w-6" />
                 <span className="text-lg font-medium text-slate-200">Real-time Bargaining</span>
              </div>
              <div className="flex items-center gap-3">
                 <CheckCircle2 className="text-primary h-6 w-6" />
                 <span className="text-lg font-medium text-slate-200">Authentic Local Sellers</span>
              </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Auth;
