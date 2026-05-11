import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Menu, ArrowRight } from 'lucide-react';
import { products } from './data/products';
import { ProductDetails } from './components/ProductDetails';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { RoyalShowcase } from './components/Royalshowcase';

const perfumes = {

  women: {
    bgFrom: '#F9F8F6',
    bgTo: '#F9F8F6',
    textColor: 'text-[#1A1A1A]',
    subtextColor: 'text-gray-500',
    borderColor: 'border-[#1A1A1A]/20',
    title: 'Nuit d’Or',
    subtitle: 'Collection Privée',
    description: 'A sophisticated harmony of rare bergamot, velvet sandalwood, and midnight jasmine. Designed for the eternal dreamer.',
    buttonStyle: 'border-[#1A1A1A] text-[#1A1A1A]',
    glassToggle: 'bg-white/40 border-white/60',
    glassToggleActive: 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#1A1A1A]',
    glassToggleInactive: 'text-gray-500',
    circleDecor: 'border-[#1a1a1a]/10',
    detailsColor: 'text-gray-400',
    price: '$240.00',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1400',
    craftImage: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1200',
    collection: [
      { name: 'Rose Sauvage', notes: 'Wild Rose & Patchouli', price: '$210.00', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
      { name: 'Fleur d\'Ivoire', notes: 'White Lily & Vanilla', price: '$195.00', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
      { name: 'Ambre Soir', notes: 'Late Amber & Musk', price: '$260.00', img: 'https://images.unsplash.com/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&q=80&w=600' }
    ],
    recommendations: [
      { name: 'Sable d\'Or', description: 'Sun-warmed sand and salted vanilla.', price: '$180.00', img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800' },
      { name: 'Éclat de Lune', description: 'White tea and frozen mint.', price: '$150.00', img: 'https://images.unsplash.com/photo-1594824410537-88220f8fc955?auto=format&fit=crop&q=80&w=800' }
    ]
  },
  men: {
    bgFrom: '#1A1A1A',
    bgTo: '#1A1A1A',
    textColor: 'text-[#F9F8F6]',
    subtextColor: 'text-gray-400',
    borderColor: 'border-[#F9F8F6]/20',
    title: 'Bois Noir',
    subtitle: 'Édition Limitée',
    description: 'An audacious blend of smoky vetiver, crushed pepper, and dark amber. Crafted for the modern maverick.',
    buttonStyle: 'border-[#F9F8F6] text-[#F9F8F6]',
    glassToggle: 'bg-[#2A2A2A]/40 border-white/20',
    glassToggleActive: 'bg-[#333333] shadow-[0_4px_12px_rgba(0,0,0,0.5)] text-[#F9F8F6]',
    glassToggleInactive: 'text-gray-500',
    circleDecor: 'border-white/10',
    detailsColor: 'text-gray-500',
    price: '$280.00',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703bc48b2d?auto=format&fit=crop&q=80&w=1400',
    craftImage: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1200',
    collection: [
      { name: 'Oud Cendré', notes: 'Smoked Oud & Leather', price: '$310.00', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600' },
      { name: 'Citron d\'Acier', notes: 'Bergamot & Metallic Musk', price: '$225.00', img: 'https://images.unsplash.com/photo-1592914610354-fd354ea45e48?auto=format&fit=crop&q=80&w=600' },
      { name: 'Vertige', notes: 'Pine Needles & Cedar', price: '$245.00', img: 'https://images.unsplash.com/photo-1615486511484-92e1720d20d4?auto=format&fit=crop&q=80&w=600' }
    ],
    recommendations: [
      { name: 'Cuir Royal', description: 'Rich leather and aged oakwood.', price: '$210.00', img: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800' },
      { name: 'Océan Noir', description: 'Deep sea salt and black pepper.', price: '$190.00', img: 'https://images.unsplash.com/photo-1582211594533-228cfdb24d31?auto=format&fit=crop&q=80&w=800' }
    ]
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'women' | 'men'>('women');
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'catalog' | 'product'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const activeData = perfumes[activeCategory];
  const selectedProduct = selectedProductId ? products.find(p => p.id === selectedProductId) : null;

  const handleProductSelect = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div 
      className={`relative w-full flex flex-col font-serif transition-colors duration-1000 no-scrollbar ${activeData.textColor}`} 
      style={{ 
        background: `linear-gradient(135deg, ${activeData.bgFrom}, ${activeData.bgTo})`,
        height: currentPage === 'home' ? '100vh' : 'auto',
        overflowY: currentPage === 'home' ? 'auto' : 'visible',
        scrollSnapType: currentPage === 'home' ? 'y mandatory' : 'none'
      }}
    >
        {/* Global Navigation - Fixed at top */}
        <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar 
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              textColor={currentPage === 'home' ? 'text-white' : activeData.textColor}
              glassToggle={currentPage === 'home' ? 'bg-white/10 border-white/20' : activeData.glassToggle}
              glassToggleActive={currentPage === 'home' ? 'bg-white text-black' : activeData.glassToggleActive}
              glassToggleInactive={currentPage === 'home' ? 'text-white/60' : activeData.glassToggleInactive}
            />
          </div>
        </div>
      
      {/* ----------------- GLOBAL HEADER (Adapts Size) ----------------- */}
      {currentPage !== 'home' && currentPage !== 'product' && (
        <section className={`relative flex flex-col w-full overflow-hidden transition-all duration-1000 ${currentPage === 'home' ? 'min-h-screen' : 'min-h-[70vh]'}`}>
        {/* Background Overlay - Highly reduced opacity for editorial minimalism */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
          >
            <img 
              src={activeData.image} 
              alt="background blur" 
              className="w-full h-full object-cover blur-3xl" 
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Content Area for the Header Block */}
        <AnimatePresence mode="wait">
          {currentPage === 'story' ? (
            <motion.div 
              key="story-hero"
              className="flex-1 flex flex-col justify-center relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <main className="relative z-10 flex-1 flex flex-col justify-center items-center max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-24 text-center">
                 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                   <span className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-8 block ${activeData.detailsColor}`}>Heritage & Craft</span>
                   <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-12 tracking-tighter max-w-4xl mx-auto">
                     Pure.<br className="md:hidden"/> Intense.<br className="md:hidden"/> Unforgettable.
                   </h1>
                   <p className={`text-xl lg:text-2xl leading-relaxed max-w-2xl italic mx-auto ${activeData.subtextColor}`}>
                     At Hem n Deu, fragrance is expressed in its most authentic and powerful form. 
                   </p>
                 </motion.div>
              </main>
            </motion.div>
            ) : (
            <motion.div 
              key="catalog-hero"
              className="flex-1 flex flex-col justify-center relative w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <main className="relative z-10 flex-1 flex flex-col justify-end items-center max-w-[1440px] mx-auto w-full px-6 lg:px-12 pb-16 text-center">
                 <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                   <span className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-6 block ${activeData.detailsColor}`}>Boutique</span>
                   <h1 className="font-serif text-4xl md:text-6xl font-light leading-none tracking-tighter">
                     {currentPage === 'catalog' ? (activeCategory === 'women' ? 'Women\'s Collection' : 'Men\'s Collection') : selectedProduct?.name}
                   </h1>
                 </motion.div>
              </main>
            </motion.div>
            )
          }
        </AnimatePresence>
      </section>
      )}

      {/* ----------------- LANDING HERO (New Section) ----------------- */}
      {currentPage === 'home' && (
        <>
          <div style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <LandingHero 
              setCurrentPage={setCurrentPage} 
              onProductSelect={handleProductSelect}
            />
          </div>
          <div style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <RoyalShowcase 
              setCurrentPage={setCurrentPage}
              onProductSelect={handleProductSelect}
            />
          </div>
        </>
      )}


      {/* ----------------- SUB-PAGES BODY BLOCKS ----------------- */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex-col flex"
          >
            {/* L'ARTISANAT */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`w-full h-screen flex items-center justify-center border-t transition-colors duration-1000 ${activeData.borderColor}`}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                <div className="w-full lg:w-1/2">
                    <span className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-6 block ${activeData.detailsColor}`}>L’Artisanat</span>
                    <h2 className="font-serif text-5xl md:text-6xl font-light leading-tight mb-8">The Alchemy <br />of Scent.</h2>
                    <p className={`text-lg leading-relaxed max-w-md italic mb-12 ${activeData.subtextColor}`}>
                      Every bottle is a testament to centuries of Parisian perfumery. Hand-picked blossoms from Grasse are distilled at the break of dawn, ensuring the purest essence is captured before the sun kisses the petals.
                    </p>
                    <button onClick={() => setCurrentPage('story')} className={`font-sans flex items-center gap-4 text-[11px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity ${activeData.textColor}`}>
                      Discover Our Story
                      <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
                  <AnimatePresence mode="popLayout">
                      <motion.div 
                        key={activeData.craftImage}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 1.5 }}
                        className="relative aspect-[3/4] w-full max-w-[500px] ml-auto p-2 border border-current"
                        style={{ borderColor: 'inherit' }}
                      >
                        <img src={activeData.craftImage} alt="Craftsmanship" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]" />
                      </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.section>

            {/* LA COLLECTION */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`w-full h-screen flex flex-col justify-center max-w-[1440px] mx-auto px-6 lg:px-12 border-t transition-colors duration-1000 ${activeData.borderColor}`}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div>
                  <span className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-4 block ${activeData.detailsColor}`}>La Collection</span>
                  <h2 className="font-serif text-4xl md:text-5xl font-light">Curated Sillages</h2>
                </div>
                <button onClick={() => setCurrentPage('catalog')} className={`font-sans border-b pb-1 text-[11px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity ${activeData.buttonStyle}`}>
                  View All Series
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                <AnimatePresence mode="popLayout">
                  {activeData.collection.map((item, idx) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: idx * 0.2 }}
                      className="flex flex-col group cursor-pointer"
                    >
                      <div className={`w-full aspect-[4/5] overflow-hidden mb-6 bg-transparent border p-2 transition-colors duration-1000 ${activeData.circleDecor}`}>
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] grayscale group-hover:grayscale-0" />
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex flex-col gap-2">
                          <h3 className="font-serif text-2xl">{item.name}</h3>
                          <span className={`font-sans text-[10px] uppercase tracking-widest ${activeData.detailsColor}`}>{item.notes}</span>
                        </div>
                        <span className="font-sans text-sm tracking-widest shrink-0">{item.price}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* RECOMMENDATIONS */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`w-full h-screen flex flex-col justify-center max-w-[1440px] mx-auto px-6 lg:px-12 border-t transition-colors duration-1000 ${activeData.borderColor}`}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
              <div className="flex flex-col mb-16">
                <span className={`font-sans text-[10px] uppercase tracking-[0.4em] mb-4 block ${activeData.detailsColor}`}>Addictions</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light">You Might Also Like</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                <AnimatePresence mode="popLayout">
                  {activeData.recommendations.map((item, idx) => (
                    <motion.div 
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, delay: idx * 0.2 }}
                      className="flex flex-col lg:flex-row gap-8 group cursor-pointer border p-6 hover:-translate-y-1 transition-all duration-500"
                      style={{ borderColor: 'inherit' }}
                    >
                      <div className="w-full lg:w-48 aspect-[3/4] overflow-hidden shrink-0 bg-transparent border p-2 border-inherit">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] grayscale group-hover:grayscale-0" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                        <p className={`font-sans text-xs leading-relaxed mb-6 italic ${activeData.subtextColor}`}>{item.description}</p>
                        <div className="mt-auto flex flex-col items-start gap-4">
                          <span className="font-sans text-sm tracking-widest leading-none">{item.price}</span>
                          <button onClick={() => setCurrentPage('catalog')} className={`font-sans border-b pb-1 text-[9px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity bg-transparent ${activeData.buttonStyle}`}>
                            Discover
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          </motion.div>
        )}

        {currentPage === 'story' && (
          <motion.div
             key="story-body"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.5 }}
             className="w-full flex flex-col items-center"
          >
             {/* STORY CHUNK 1 */}
             <section className={`w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-32 border-t transition-colors duration-1000 ${activeData.borderColor}`}>
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start justify-center"
               >
                 <div className="w-full lg:w-5/12">
                   <img src={activeData.craftImage} alt="Craftsmanship" className="w-full h-auto aspect-[3/4] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-[2s]" />
                 </div>
                 <div className={`w-full lg:w-5/12 flex flex-col gap-8 text-base md:text-lg leading-relaxed font-sans text-justify ${activeData.subtextColor} lg:pt-24`}>
                    <p><span className="float-left text-7xl font-serif leading-none pr-4 pt-2">O</span>ur perfumes are crafted using 100% pure perfume oil, offering remarkable depth, richness, and long-lasting performance. Free from dilution, each creation is designed for those who appreciate true intensity—an immersive scent experience that unfolds gracefully on the skin over time.</p>
                    <p>Every Hem n Deu fragrance is meticulously composed using premium aromatic ingredients, carefully blended to achieve balance, harmony, and sophistication. As the scent develops, its layered notes reveal enhanced projection and enduring presence, remaining refined and elegant rather than overpowering.</p>
                 </div>
               </motion.div>
             </section>

             {/* STORY CHUNK 2 */}
             <section className={`w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-32 border-t transition-colors duration-1000 ${activeData.borderColor}`}>
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                 className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-start justify-center"
               >
                 <div className="w-full lg:w-5/12">
                   <img src="https://images.unsplash.com/photo-1608514115160-c3d528b18ec4?auto=format&fit=crop&q=80&w=1200" alt="Pure Scent" className="w-full h-auto aspect-[3/4] object-cover rounded-[1rem] lg:rounded-[2rem] border border-white/20 shadow-2xl p-[1px] bg-white/5 backdrop-blur-sm grayscale hover:grayscale-0 transition-all duration-[2s]" />
                 </div>
                 <div className={`w-full lg:w-5/12 flex flex-col gap-8 text-base md:text-lg leading-relaxed font-sans text-justify ${activeData.subtextColor} lg:pt-24`}>
                    <p>Our philosophy is grounded in authentic craftsmanship and purity. By working exclusively with 100% pure perfume oil, we preserve the true essence of each ingredient, allowing every note to express itself fully and naturally. This results in a smoother application, an intimate scent trail, and a fragrance that becomes uniquely personal to the wearer.</p>
                    <p>Attention to detail defines every aspect of our work. From formulation to presentation, each element reflects our commitment to quality, refinement, and thoughtful design. Every bottle embodies our promise of excellence, delivering a luxurious sensory journey with every drop.</p>
                    
                    <button onClick={() => setCurrentPage('catalog')} className={`mt-8 font-sans w-fit border-b pb-2 text-[11px] uppercase tracking-widest font-bold hover:opacity-50 transition-opacity flex items-center gap-4 bg-transparent ${activeData.buttonStyle}`}>
                      <ArrowRight className="w-4 h-4" />
                      View Collection
                    </button>
                 </div>
               </motion.div>
             </section>
          </motion.div>
        )}

        {/* CATALOG VIEW */}
        {currentPage === 'catalog' && (
          <motion.div
            key="catalog-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full py-24 lg:py-32 border-t transition-colors duration-1000 ${activeData.borderColor}`}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-16 flex justify-between items-end">
              <p className={`font-sans text-sm md:text-base max-w-xl italic ${activeData.subtextColor}`}>
                Explore our curated collection of pure perfume oils, categorized for {activeCategory === 'women' ? 'women' : 'men'}. From the deeply robust notes of the Royal Collection to the refined elegance of the Premium Collection.
              </p>
            </div>
            
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              <AnimatePresence>
                {products.filter(p => p.gender.toLowerCase() === activeCategory).map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
                    className="flex flex-col group cursor-pointer"
                    onClick={() => handleProductSelect(product.id)}
                  >
                    <div className={`w-full aspect-[4/5] mb-6 bg-transparent border p-1 transition-colors duration-1000 flex items-center justify-center ${activeData.circleDecor}`}>
                      <div className="filter drop-shadow-lg w-full h-full flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-full w-auto object-contain transform group-hover:scale-110 transition-transform duration-[2s] grayscale group-hover:grayscale-0" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-start h-full gap-2 border-b border-transparent group-hover:border-current transition-colors pb-4 flex-1" style={{ borderColor: 'inherit' }}>
                      <div className="flex flex-col gap-2">
                         <span className={`font-sans text-[9px] uppercase tracking-[0.2em] ${activeData.detailsColor}`}>{product.collection} Collection</span>
                         <h3 className="font-serif text-2xl group-hover:italic transition-all">{product.name}</h3>
                         <p className={`font-sans text-[10px] leading-relaxed line-clamp-2 mt-2 uppercase tracking-widest ${activeData.detailsColor}`}>{product.topNotes}</p>
                      </div>
                      <span className="font-sans text-sm tracking-widest mt-4">{product.price}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* INDIVIDUAL PRODUCT DETAIL VIEW */}
        {currentPage === 'product' && selectedProduct && (
          <ProductDetails 
            product={selectedProduct}
            recommendations={products.filter(p => p.id !== selectedProduct.id && p.gender === selectedProduct.gender)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onProductSelect={handleProductSelect}
          />
        )}
      </AnimatePresence>

      {/* ----------------- GLOBAL FOOTER ----------------- */}
      {currentPage !== 'product' && (
        <footer className={`w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 border-t font-sans flex flex-col md:flex-row justify-between items-center gap-8 z-10 relative transition-colors duration-1000 ${activeData.borderColor}`}>
         <div className="text-[10px] uppercase tracking-[0.3em] font-medium">Hem n Deu</div>
         <div className={`flex gap-8 text-[9px] uppercase tracking-widest ${activeData.detailsColor}`}>
            <span className="hover:text-current cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-current cursor-pointer transition-colors">Journal</span>
            <span className="hover:text-current cursor-pointer transition-colors">Contact</span>
         </div>
         <div className={`text-[9px] uppercase tracking-widest ${activeData.detailsColor}`}>
            &copy; 2026 Paris
         </div>
      </footer>
      )}
      
    </div>
  );
}
