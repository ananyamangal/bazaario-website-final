
import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Store, ArrowRight, ShieldCheck, Zap, Globe, Mic, PhoneOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Landing: React.FC = () => {
  const { user } = useStore();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 overflow-hidden bg-white dark:bg-dark">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] opacity-60 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium text-slate-600 dark:text-slate-300 mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Personalized 1-on-1 Video Shopping
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]">
                  Shop Local Markets <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-pink-600 to-orange-500">Face to Face</span>
                </h1>
                
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                  Connect privately with authentic sellers from Sarojini, Lajpat, and Johari Bazaar. Inspect products in real-time, bargain directly, and shop securely.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to={user ? "/dashboard" : "/auth"} className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary-hover shadow-xl shadow-primary/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    Start Video Call <Video size={20} />
                  </Link>
                  <Link to="/auth" className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                    <Store size={20} /> Become a Seller
                  </Link>
                </div>
            </div>

            {/* Floating UI Mocks (1-on-1 Call Simulation) */}
            <div className="mt-20 relative mx-auto max-w-5xl animate-slide-up">
               <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 aspect-video ring-1 ring-black/5">
                  {/* Main Shopkeeper Video */}
                  <img src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-90" alt="Shopkeeper Video" />
                  
                  {/* Top Bar: Contact Info & Time */}
                  <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start bg-gradient-to-b from-black/70 to-transparent">
                      <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full border-2 border-white/20 overflow-hidden bg-white">
                              <img src="https://ui-avatars.com/api/?name=Ramesh+Textiles&background=0D8ABC&color=fff" alt="Seller" className="w-full h-full object-cover" />
                          </div>
                          <div>
                              <h3 className="text-white font-bold text-lg text-shadow drop-shadow-md">Ramesh Textiles</h3>
                              <div className="flex items-center gap-2 bg-black/30 px-2 py-0.5 rounded-lg w-fit backdrop-blur-sm">
                                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                  <span className="text-white/90 text-xs font-mono tracking-wider">05:42</span>
                              </div>
                          </div>
                      </div>
                      
                      {/* Self View (PiP) */}
                      <div className="w-24 h-36 md:w-32 md:h-48 bg-black rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl relative">
                          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="You" />
                          <div className="absolute bottom-1 right-1 bg-black/50 p-1 rounded-full">
                             <Mic size={12} className="text-white" />
                          </div>
                      </div>
                  </div>

                  {/* Seller Action: Product/Invoice Push */}
                  <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-white/95 dark:bg-slate-900/95 p-4 rounded-2xl shadow-xl backdrop-blur-md max-w-[220px] animate-slide-up border border-white/20" style={{ animationDelay: '1s' }}>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> Suggested Item
                      </p>
                      <div className="rounded-xl overflow-hidden mb-3 aspect-[4/5] relative group">
                          <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Kurta" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight mb-1">Cotton Kurta Set</h4>
                      <div className="flex justify-between items-center mt-2">
                          <span className="font-bold text-primary text-lg">₹ 1,200</span>
                          <button className="bg-primary text-white p-2 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all hover:scale-105">
                              <ArrowRight size={16} />
                          </button>
                      </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-6 bg-black/30 backdrop-blur-2xl px-8 py-4 rounded-full border border-white/10 shadow-2xl">
                       <div className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 cursor-pointer transition-all hover:scale-110 border border-white/5"><Mic size={24} /></div>
                       <div className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 cursor-pointer transition-all hover:scale-110 border border-white/5"><Video size={24} /></div>
                       <div className="p-4 bg-red-600 rounded-full text-white hover:bg-red-700 cursor-pointer shadow-lg shadow-red-600/40 transform hover:scale-110 transition-all border border-red-500"><PhoneOff size={28} /></div>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* Trust Badge Section */}
      <section className="py-10 border-y border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
         <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
             {['Secure Payments', 'Verified Sellers', 'Fast Delivery', 'Easy Returns'].map((text, i) => (
                <div key={i} className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-lg">
                   <ShieldCheck className="text-primary" /> {text}
                </div>
             ))}
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Authentic Shopping, Reimagined.</h2>
            <p className="mt-4 text-slate-500 text-lg">We've digitized the chaos and charm of Indian markets.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { icon: <Video className="text-white" size={24} />, color: 'bg-blue-500', title: "HD Video Calls", desc: "Inspect fabric quality, color, and stitching details via 1080p video before you pay." },
               { icon: <Zap className="text-white" size={24} />, color: 'bg-orange-500', title: "Real-time Bargaining", desc: "Negotiate with shopkeepers just like you're standing at their stall. Save big." },
               { icon: <Globe className="text-white" size={24} />, color: 'bg-green-500', title: "Pan-India Markets", desc: "Access Jaipur's jewelry or Mumbai's antiques without booking a flight." }
             ].map((item, i) => (
               <div key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                 <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-5 rounded-bl-full group-hover:scale-110 transition-transform`}></div>
                 <div className={`w-14 h-14 rounded-2xl ${item.color} shadow-lg shadow-${item.color.split('-')[1]}-500/30 flex items-center justify-center mb-6 transform group-hover:-rotate-6 transition-transform`}>
                   {item.icon}
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                 <p className="text-slate-500 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Markets (Bento Style) */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Iconic Markets</h2>
               <p className="mt-2 text-slate-500 text-lg">Shop from the most famous streets of India.</p>
             </div>
             <Link to="/dashboard" className="hidden md:flex text-primary font-bold items-center gap-2 hover:gap-3 transition-all px-4 py-2 rounded-full hover:bg-primary-light dark:hover:bg-slate-800">
               View All Markets <ArrowRight size={18} />
             </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
              <div className="col-span-1 md:col-span-2 row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Delhi" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <span className="bg-primary px-2 py-1 rounded text-xs font-bold uppercase mb-2 inline-block">Trending</span>
                    <h3 className="text-3xl font-bold">Delhi Markets</h3>
                    <p className="text-slate-200">Sarojini, Lajpat, Janpath</p>
                 </div>
              </div>
              <div className="col-span-1 md:col-span-2 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Jaipur" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold">Jaipur Bazaars</h3>
                    <p className="text-slate-200">Johari, Bapu Bazaar</p>
                 </div>
              </div>
              <div className="col-span-1 md:col-span-1 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Mumbai" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Mumbai</h3>
                 </div>
              </div>
              <div className="col-span-1 md:col-span-1 row-span-1 group relative rounded-3xl overflow-hidden cursor-pointer shadow-md">
                 <img src="https://images.unsplash.com/photo-1533929736472-594e69d348eb?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Kolkata" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                 <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">Kolkata</h3>
                 </div>
              </div>
           </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-20 bg-white dark:bg-dark">
         <div className="max-w-5xl mx-auto px-4">
            <div className="bg-primary rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/40">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl -ml-16 -mb-16"></div>
               
               <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to shop like a local?</h2>
               <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto relative z-10">Join 50,000+ shoppers who are discovering hidden gems from India's best markets.</p>
               <Link to="/auth" className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg relative z-10">
                 Download App / Sign Up
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Landing;
