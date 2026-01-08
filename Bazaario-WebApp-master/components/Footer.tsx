import React from 'react';
import { Instagram, Linkedin, Twitter, Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-slate-500 text-sm leading-relaxed">
              Bringing the charm of India's local markets to your screen. Shop live, bargain real-time, trust fully.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:text-pink-600 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="p-2 bg-white dark:bg-slate-900 rounded-full shadow-sm hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Bazaario Commerce Pvt Ltd.</p>
          <p className="flex items-center gap-1 mt-2 md:mt-0">Made with <Heart size={14} className="text-primary fill-current" /> in India</p>
        </div>
      </div>
    </footer>
  );
};