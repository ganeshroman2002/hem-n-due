import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, MapPin, Clock, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { Navbar } from './Navbar';

interface ProductDetailsProps {
  product: Product;
  recommendations: Product[];
  activeCategory: 'women' | 'men';
  setActiveCategory: (cat: 'women' | 'men') => void;
  currentPage: 'home' | 'story' | 'catalog' | 'product';
  setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
  onProductSelect: (id: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  recommendations,
  activeCategory,
  setActiveCategory,
  currentPage,
  setCurrentPage,
  onProductSelect
}) => {
  return (
    <div className="bg-[#E6DED5] text-[#4A443F] min-h-screen font-serif selection:bg-[#4A443F]/10">
      {/* Navigation */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        textColor="text-[#4A443F]"
        glassToggle="bg-[#4A443F]/5 border-[#4A443F]/10"
        glassToggleActive="bg-[#4A443F] text-[#E6DED5]"
        glassToggleInactive="text-[#4A443F]/50"
      />

      {/* Hero Section */}
      <section className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] mb-4 block opacity-60">
              {product.collection} Collection — {product.gender}
            </span>
            <motion.h1
              className="text-[10vw] lg:text-[7vw] leading-[0.9] mb-8 tracking-tighter"
            >
              {product.name}
            </motion.h1>
            
            <div className="flex flex-col gap-6 mb-12">
              <p className="text-2xl font-light italic opacity-80">{product.price}</p>
              <p className="text-xs uppercase tracking-[0.3em] opacity-60 leading-relaxed max-w-sm">
                A masterpiece of olfactory art, crafted with 100% pure perfume oils for an enduring and intimate experience.
              </p>
            </div>

            <button className="bg-[#4A443F] text-[#E6DED5] px-12 py-5 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-colors w-fit">
              Acquire Scent
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#4A443F]/5 rounded-full blur-3xl -z-10 transform scale-150"></div>
            <div className="filter drop-shadow-[0_40px_60px_rgba(0,0,0,0.2)]">
              <img
                src={product.image}
                alt={product.name}
                className="h-[95vh] w-auto object-contain relative z-10"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Scent Profile Section */}
      <section className="bg-white/30 py-24 lg:py-32 border-y border-[#4A443F]/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">01 — Top Notes</span>
              <h3 className="text-3xl font-light italic">The Introduction</h3>
              <p className="text-sm leading-relaxed opacity-70 uppercase tracking-widest">{product.topNotes}</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">02 — Heart Notes</span>
              <h3 className="text-3xl font-light italic">The Character</h3>
              <p className="text-sm leading-relaxed opacity-70 uppercase tracking-widest">{product.middleNotes}</p>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">03 — Base Notes</span>
              <h3 className="text-3xl font-light italic">The Memory</h3>
              <p className="text-sm leading-relaxed opacity-70 uppercase tracking-widest">{product.baseNotes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Essence Section */}
      <section className="bg-[#D9D1C7] py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-light mb-4 italic">The Essence</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 max-w-xs">
              Visualizing the soul of the fragrance through pure craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 overflow-hidden">
              <img src={product.gallery[0] || product.image} className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105" alt="Detail 1" />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-8">
              <div className="overflow-hidden">
                <img src={product.gallery[1] || product.image} className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105" alt="Detail 2" />
              </div>
              <div className="bg-white/20 p-8 flex flex-col justify-center items-center text-center">
                <div className="w-12 h-12 rounded-full border border-[#4A443F]/20 flex items-center justify-center mb-4">
                  <span className="text-xl italic">S</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] italic">100% Pure Perfume Oil</p>
              </div>
            </div>
            <div className="lg:col-span-1 overflow-hidden">
              <img src={product.gallery[2] || product.image} className="w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-1000 hover:scale-105" alt="Detail 3" />
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-24 lg:py-32 border-t border-[#4A443F]/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl lg:text-5xl font-light italic">You May Also Like</h2>
            <button className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-[#4A443F] pb-1 hover:opacity-50 transition-opacity">
              Explore more scents
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {recommendations.slice(0, 3).map((item) => (
              <div key={item.id} className="flex flex-col group cursor-pointer" onClick={() => onProductSelect(item.id)}>
                <div className="aspect-[4/5] overflow-hidden mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-xs tracking-[0.3em] uppercase mb-2">{item.name}</h3>
                <p className="text-[10px] opacity-60 mb-6 line-clamp-1 italic">{item.topNotes.split(',')[0]}, {item.middleNotes.split(',')[0]}, {item.baseNotes.split(',')[0]}.</p>
                <button className="text-[9px] uppercase tracking-[0.3em] font-bold border-b border-[#4A443F] pb-1 w-fit">
                  Discover
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Icons */}
      <section className="py-16 border-t border-[#4A443F]/10 bg-[#E0D8CE]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#4A443F]/20 flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 opacity-70" />
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Clean Formulas</h4>
              <p className="text-[8px] uppercase tracking-wider opacity-60">Consciously crafted with quality ingredients.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#4A443F]/20 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 opacity-70" />
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Made in France</h4>
              <p className="text-[8px] uppercase tracking-wider opacity-60">Blended and bottled with timeless expertise.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#4A443F]/20 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 opacity-70" />
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Made to Last</h4>
              <p className="text-[8px] uppercase tracking-wider opacity-60">Scents that linger, memories that stay.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#4A443F]/20 flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4 opacity-70" />
            </div>
            <div>
              <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold mb-1">Complimentary Shipping</h4>
              <p className="text-[8px] uppercase tracking-wider opacity-60">Enjoy free shipping on all orders over $80.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#4A443F]/10 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[9px] uppercase tracking-[0.2em] opacity-60">
          © 2026 Hem n Deu
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-medium">
          <a href="#" className="hover:opacity-50">Privacy</a>
          <a href="#" className="hover:opacity-50">Terms</a>
          <a href="#" className="hover:opacity-50">FAQ</a>
        </div>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-medium">
          <a href="#" className="hover:opacity-50">Instagram</a>
          <a href="#" className="hover:opacity-50">Pinterest</a>
        </div>
      </footer>
    </div>
  );
};
