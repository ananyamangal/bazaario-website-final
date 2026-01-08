import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Sun, Moon, LogOut, Video, Bell } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, user, cart, logout } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-200">
            <Logo />
          </Link>

          {/* Search Bar - Modern & Centered */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 rounded-full leading-5 bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 sm:text-sm transition-all duration-300 shadow-inner"
                placeholder="Search for 'Sarojini tops' or 'Jaipur jewelry'..."
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <button className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:block">
                  <Bell size={20} />
                </button>

                 {/* Video Link (For demo) */}
                <Link to="/video-call" className="p-2.5 rounded-full text-primary hover:bg-primary/10 transition-colors animate-pulse-slow" title="Start Video Call">
                  <Video size={20} />
                </Link>

                {/* Cart */}
                {user.role === 'customer' && (
                  <Link to="/checkout" className="relative p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-2">
                    <ShoppingBag size={20} />
                    {cart.length > 0 && (
                      <span className="absolute top-1 right-1 h-4 w-4 flex items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                )}

                {/* Profile Dropdown */}
                <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                    <Link to={user.role === 'seller' ? '/seller-dashboard' : '/dashboard'} className="flex items-center gap-2 group">
                        <img 
                          src={user.avatar} 
                          alt="Profile" 
                          className="h-9 w-9 rounded-full border-2 border-slate-100 dark:border-slate-700 group-hover:border-primary transition-colors" 
                        />
                        <span className="hidden sm:block text-sm font-semibold dark:text-white group-hover:text-primary transition-colors">{user.name}</span>
                    </Link>
                    <button onClick={() => { logout(); navigate('/'); }} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                        <LogOut size={18} />
                    </button>
                </div>
              </>
            ) : (
              <div className="flex gap-3 ml-2">
                <Link to="/auth" className="text-sm font-semibold px-5 py-2.5 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
                  Login
                </Link>
                <Link to="/auth" className="text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};