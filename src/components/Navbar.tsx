import React from 'react';
import { motion } from 'motion/react';
import { Menu, Search, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  activeCategory: 'women' | 'men';
  setActiveCategory: (cat: 'women' | 'men') => void;
  currentPage: 'home' | 'story' | 'catalog' | 'product';
  setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
  textColor?: string;
  glassToggle?: string;
  glassToggleActive?: string;
  glassToggleInactive?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  setActiveCategory,
  currentPage,
  setCurrentPage,
  textColor = 'text-current',
  glassToggle = 'bg-white/40 border-white/60',
  glassToggleActive = 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#1A1A1A]',
  glassToggleInactive = 'text-gray-500'
}) => {
  return (
    <nav className={`relative z-20 flex items-center justify-between px-6 lg:px-12 py-8 max-w-[1440px] mx-auto w-full ${textColor}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="font-sans text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block hover:opacity-50 transition-opacity cursor-pointer"
        >
          Hem n Deu
        </button>
        <Menu className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity sm:hidden" />
      </div>

      {/* The Toggle - Editorial Glass */}
      <div className={`flex items-center backdrop-blur-xl border rounded-full p-1 transition-colors duration-1000 ${glassToggle}`}>
        <button
          onClick={() => setActiveCategory('women')}
          className={`relative px-6 py-2 rounded-full font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors duration-500 ${
            activeCategory === 'women' ? glassToggleActive : `cursor-pointer ${glassToggleInactive}`
          }`}
        >
          {activeCategory === 'women' && (
            <motion.div
              layoutId="pill"
              className={`absolute inset-0 rounded-full ${glassToggleActive}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">Women</span>
        </button>
        
        <button
          onClick={() => setActiveCategory('men')}
          className={`relative px-6 py-2 rounded-full font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors duration-500 ${
            activeCategory === 'men' ? glassToggleActive : `cursor-pointer ${glassToggleInactive}`
          }`}
        >
          {activeCategory === 'men' && (
            <motion.div
              layoutId="pill"
              className={`absolute inset-0 rounded-full ${glassToggleActive}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">Men</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={`font-sans text-[10px] uppercase tracking-[0.2em] hidden sm:block hover:opacity-50 transition-opacity cursor-pointer flex gap-1 ${currentPage === 'home' ? '' : 'opacity-40'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('catalog')} 
          className={`font-sans text-[10px] uppercase tracking-[0.2em] hidden sm:block hover:opacity-50 transition-opacity cursor-pointer flex gap-1 ${(currentPage === 'catalog' || currentPage === 'product') ? '' : 'opacity-40'}`}
        >
          Collection
        </button>
        <button 
          onClick={() => setCurrentPage('story')} 
          className={`font-sans text-[10px] uppercase tracking-[0.2em] hidden sm:block hover:opacity-50 transition-opacity cursor-pointer flex gap-1 ${currentPage === 'story' ? '' : 'opacity-40'}`}
        >
          Our <span className="italic normal-case tracking-normal">Story</span>
        </button>
        <Search className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity sm:hidden" />
        <ShoppingBag className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
      </div>
    </nav>
  );
};
