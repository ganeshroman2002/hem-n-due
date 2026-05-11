import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { products, Product } from '../data/products';

const featuredProductIds = ['gardenia-glamour', 'rose-noir-oud', 'crown-oud', 'royal-noir'];

const GRADIENTS = [
  'radial-gradient(ellipse at 60% 40%, #8B0000 0%, #3D0000 60%, #1a0000 100%)',
  'radial-gradient(ellipse at 60% 40%, #1a3a3a 0%, #0d2020 60%, #000000 100%)',
  'radial-gradient(ellipse at 60% 40%, #2d3d1a 0%, #1a2a0d 60%, #0a1200 100%)',
  'radial-gradient(ellipse at 60% 40%, #1e1a4a 0%, #100d2e 60%, #040214 100%)',
];
const ACCENTS = ['#cc2200', '#00aa88', '#88aa00', '#5544cc'];

interface LandingHeroProps {
  setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
  onProductSelect: (id: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ setCurrentPage, onProductSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredProducts = products.filter(p => featuredProductIds.includes(p.id));

  return (
    <>
      {/* MOBILE */}
      <section className="md:hidden relative w-full h-screen overflow-hidden bg-black">
        <MobileHero
          products={featuredProducts}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setCurrentPage={setCurrentPage}
          onProductSelect={onProductSelect}
        />
      </section>

      {/* TABLET + DESKTOP accordion */}
      <section className="hidden md:flex relative w-full h-screen overflow-hidden bg-black">
        {featuredProducts.map((product, index) => (
          <HeroPanel
            key={product.id}
            product={product}
            isExpanded={activeIndex === index}
            onHover={() => setActiveIndex(index)}
            index={index}
            setCurrentPage={setCurrentPage}
            onProductSelect={onProductSelect}
          />
        ))}
      </section>
    </>
  );
};

/* ─────────────────────────────────────────
   MOBILE HERO — with swipe support
───────────────────────────────────────── */
interface MobileHeroProps {
  products: Product[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
  onProductSelect: (id: string) => void;
}

const MobileHero: React.FC<MobileHeroProps> = ({
  products, activeIndex, setActiveIndex, setCurrentPage, onProductSelect,
}) => {
  const product = products[activeIndex];

  // ── Swipe gesture tracking ──
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 48; // minimum px horizontal delta to register a swipe

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only fire if horizontal motion clearly dominates vertical (no accidental scroll triggers)
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0 && activeIndex < products.length - 1) setActiveIndex(activeIndex + 1); // left → next
    if (dx > 0 && activeIndex > 0) setActiveIndex(activeIndex - 1);                   // right → prev
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col"
        style={{ background: GRADIENTS[activeIndex] }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE */}
        <div className="flex-1 flex items-end justify-center relative min-h-0 px-4 z-10">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-8 rounded-full"
            style={{ background: 'rgba(0,0,0,0.5)', filter: 'blur(24px)' }}
          />
          <img
            src={product.image}
            alt={product.name}
            className="w-auto object-contain object-bottom relative"
            style={{
              maxHeight: '50vh',
              filter: 'drop-shadow(0 16px 32px rgba(0,0,0,0.6))',
              zIndex: 11,
            }}
          />
        </div>

        {/* BOTTOM INFO */}
        <div className="shrink-0 px-5 pb-5 pt-2 relative z-20">

          {/* Collection + gender + price badges */}
          <div className="flex gap-2 mb-1.5 items-center">
            <span
              className="font-black uppercase tracking-widest font-sans rounded-full px-2 py-0.5"
              style={{
                fontSize: '7px',
                color: ACCENTS[activeIndex],
                background: ACCENTS[activeIndex] + '22',
                border: `1px solid ${ACCENTS[activeIndex]}44`,
              }}
            >
              {product.collection}
            </span>
            <span
              className="text-white/45 font-bold uppercase tracking-widest font-sans"
              style={{ fontSize: '7px' }}
            >
              {product.gender}
            </span>
            <span
              className="text-white/45 font-bold uppercase tracking-widest font-sans"
              style={{ fontSize: '7px' }}
            >
              {product.price}
            </span>
          </div>

          {/* Product name */}
          <h1
            className="text-white font-light tracking-tighter uppercase font-sans leading-[0.9] mb-2"
            style={{ fontSize: 'clamp(1.8rem, 7vw, 2.8rem)' }}
          >
            {product.name.split(' ')[0]}
            <br />
            <span className="opacity-65">{product.name.split(' ').slice(1).join(' ')}</span>
          </h1>

          {/* Top / Mid / Base notes */}
          <div className="flex flex-col gap-0.5 mb-3">
            {[
              { label: 'Top', value: product.topNotes },
              { label: 'Mid', value: product.middleNotes },
              { label: 'Base', value: product.baseNotes },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-2 items-baseline">
                <span
                  className="text-white/30 font-black uppercase tracking-widest shrink-0 font-sans"
                  style={{ fontSize: '7px', minWidth: '26px' }}
                >
                  {label}
                </span>
                <span
                  className="text-white/55 font-sans leading-tight"
                  style={{
                    fontSize: '8px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical' as const,
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Dot indicators + Discover CTA */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 items-center">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    width: i === activeIndex ? 18 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === activeIndex ? ACCENTS[activeIndex] : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <div
              onClick={() => onProductSelect(product.id)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <span className="text-white/60 text-[9px] uppercase tracking-widest font-bold font-sans">Discover</span>
              <div
                className="w-8 h-8 rounded-full border flex items-center justify-center group-hover:bg-white transition-all duration-300"
                style={{ borderColor: ACCENTS[activeIndex] + '80' }}
              >
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────
   DESKTOP ACCORDION PANEL
───────────────────────────────────────── */
interface HeroPanelProps {
  product: Product;
  isExpanded: boolean;
  onHover: () => void;
  index: number;
  setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
  onProductSelect: (id: string) => void;
}

const HeroPanel: React.FC<HeroPanelProps> = ({
  product, isExpanded, onHover, index, setCurrentPage, onProductSelect,
}) => (
  <motion.div
    onMouseEnter={onHover}
    onClick={onHover}
    animate={{ width: isExpanded ? '58%' : '14%' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="relative h-full overflow-hidden border-r border-white/10 cursor-pointer shrink-0"
    style={{ background: GRADIENTS[index % GRADIENTS.length] }}
  >
    {/* ── LAYER 0: Spotlight overlay — decorative, pointer-events none ── */}
    <motion.div
      animate={{ opacity: isExpanded ? 0.3 : 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at 55% 45%, rgba(255,255,255,0.08) 0%, transparent 65%)',
        zIndex: 1,
      }}
    />

    {/* ── LAYER 1: Dim veil when collapsed ── */}
    <motion.div
      animate={{ opacity: isExpanded ? 0 : 0.45 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 bg-black pointer-events-none"
      style={{ zIndex: 2 }}
    />

    {/* ── LAYER 2: Product image — always rendered, never re-mounts, no jump ── */}
    <div
      className="absolute inset-0 flex items-end justify-center pointer-events-none"
      style={{ zIndex: 3 }}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3/5 rounded-full"
        style={{
          height: '24px',
          bottom: isExpanded ? '0px' : '4px',
          background: 'rgba(0,0,0,0.55)',
          filter: 'blur(20px)',
          transition: 'all 0.65s cubic-bezier(0.22,1,0.36,1)',
        }}
      />
      <img
        src={product.image}
        alt={product.name}
        className="w-auto object-contain object-bottom relative"
        style={{
          height: isExpanded ? 'min(92vh, 860px)' : 'min(60vh, 420px)',
          maxWidth: isExpanded ? '100%' : '90%',
          filter: `drop-shadow(0 24px 48px rgba(0,0,0,0.65)) ${isExpanded ? 'saturate(1)' : 'saturate(0.5) brightness(0.75)'}`,
          transition: 'height 0.65s cubic-bezier(0.22,1,0.36,1), max-width 0.65s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease',
          transformOrigin: 'bottom center',
        }}
      />
    </div>

    {/* ── LAYER 3: COLLAPSED UI — vertical name + pulse dot ── */}
    <AnimatePresence>
      {!isExpanded && (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="absolute inset-0 flex flex-col items-center justify-between py-5"
          style={{ zIndex: 10, pointerEvents: 'none' }}
        >
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-px h-6" style={{ background: ACCENTS[index % ACCENTS.length] }} />
            <p
              className="text-white/70 text-[8px] uppercase tracking-[0.5em] font-black font-sans"
              style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
            >
              {product.name}
            </p>
          </div>
          <div className="flex-1" />
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ background: ACCENTS[index % ACCENTS.length] }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* ── LAYER 4: EXPANDED UI — full nav + content columns ── */}
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          key="expanded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, delay: 0.14 }}
          className="absolute inset-0 h-full flex flex-col overflow-hidden"
          style={{
            padding: 'clamp(14px, 2vh, 48px) clamp(16px, 2.5vw, 48px)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >

          {/* MAIN CONTENT GRID */}
          <div className="flex-1 min-h-0 grid grid-cols-12 gap-x-2">

            {/* ── LEFT column ── */}
            <div
              className="col-span-4 flex flex-col justify-between min-h-0 overflow-hidden"
              style={{
                paddingBottom: 'clamp(4px, 1vh, 16px)',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 15,
              }}
            >
              {/* Top: collection badge + name + price */}
              <div className="shrink-0">
                {/* Badges row */}
                <div className="flex items-center gap-1.5 flex-wrap" style={{ marginBottom: 'clamp(4px, 0.5vh, 8px)' }}>
                  <div
                    className="rounded-full font-black uppercase tracking-widest font-sans"
                    style={{
                      fontSize: 'clamp(5px, 0.52vw, 7px)',
                      padding: 'clamp(2px, 0.3vh, 4px) clamp(6px, 0.7vw, 10px)',
                      color: ACCENTS[index % ACCENTS.length],
                      background: ACCENTS[index % ACCENTS.length] + '28',
                      border: `1px solid ${ACCENTS[index % ACCENTS.length]}50`,
                    }}
                  >
                    {product.collection} Collection
                  </div>
                  <div
                    className="rounded-full text-white/50 font-black uppercase tracking-widest font-sans border border-white/15"
                    style={{
                      fontSize: 'clamp(5px, 0.52vw, 7px)',
                      padding: 'clamp(2px, 0.3vh, 4px) clamp(6px, 0.7vw, 10px)',
                    }}
                  >
                    {product.gender}
                  </div>
                </div>

                {/* Name */}
                <h2
                  className="text-white font-light leading-[0.9] font-sans tracking-tighter"
                  style={{ fontSize: 'clamp(1rem, 2.4vw, 3rem)' }}
                >
                  {product.name.split(' ')[0]}
                  <br />
                  <span className="opacity-60">{product.name.split(' ').slice(1).join(' ')}</span>
                </h2>

                {/* Price */}
                <p
                  className="text-white/35 font-black tracking-widest font-sans uppercase"
                  style={{ fontSize: 'clamp(7px, 0.72vw, 10px)', marginTop: 'clamp(3px, 0.4vh, 6px)' }}
                >
                  {product.price}
                </p>
              </div>

              {/* Bottom: three notes cards */}
              <div className="flex flex-col shrink-0" style={{ gap: 'clamp(3px, 0.5vh, 7px)' }}>
                {[
                  { label: 'Top Notes', value: product.topNotes },
                  { label: 'Middle Notes', value: product.middleNotes },
                  { label: 'Base Notes', value: product.baseNotes },
                ].map(({ label, value }, i) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 overflow-hidden"
                    style={{
                      background: i === 0
                        ? 'rgba(255,255,255,0.88)'
                        : i === 1
                          ? 'rgba(255,255,255,0.09)'
                          : 'rgba(0,0,0,0.38)',
                      backdropFilter: 'blur(10px)',
                      padding: 'clamp(5px, 0.8vh, 11px) clamp(7px, 0.9vw, 13px)',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
                    }}
                  >
                    <p
                      className="font-black uppercase tracking-widest leading-none"
                      style={{
                        fontSize: 'clamp(5px, 0.48vw, 7px)',
                        color: i === 0 ? 'rgba(0,0,0,0.32)' : 'rgba(255,255,255,0.30)',
                        marginBottom: 'clamp(2px, 0.25vh, 3px)',
                      }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-semibold leading-snug"
                      style={{
                        fontSize: 'clamp(5.5px, 0.6vw, 8.5px)',
                        color: i === 0 ? 'rgba(0,0,0,0.82)' : 'rgba(255,255,255,0.72)',
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CENTER column — transparent; image (z-index 3) shows through ── */}
            <div className="col-span-4" />

            {/* ── RIGHT column ── */}
            <div
              className="col-span-4 flex flex-col justify-between items-end text-right min-h-0 overflow-hidden"
              style={{
                paddingBottom: 'clamp(4px, 1vh, 16px)',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 15,
              }}
            >
              {/* Product name (large, right-aligned) */}
              <motion.h1
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="text-white font-light tracking-tighter uppercase font-sans leading-[0.9] shrink-0"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 5rem)' }}
              >
                {product.name.split(' ')[0]}
                <br />
                <span className="opacity-70">{product.name.split(' ').slice(1).join(' ')}</span>
              </motion.h1>

              {/* Top notes label + CTA arrow */}
              <div className="flex flex-col items-end shrink-0" style={{ gap: 'clamp(6px, 1vh, 12px)' }}>
                <div className="text-right" style={{ maxWidth: '26ch' }}>
                  <p
                    className="text-white/30 font-black uppercase tracking-widest font-sans"
                    style={{ fontSize: 'clamp(5px, 0.48vw, 7px)', marginBottom: '3px' }}
                  >
                    Top Notes
                  </p>
                  <p
                    className="text-white/60 font-sans uppercase tracking-wider leading-snug"
                    style={{ fontSize: 'clamp(6px, 0.62vw, 9px)' }}
                  >
                    {product.topNotes}
                  </p>
                </div>
                <div
                  onClick={() => onProductSelect(product.id)}
                  className="rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300 cursor-pointer group/btn shrink-0"
                  style={{ width: 'clamp(32px, 4vh, 44px)', height: 'clamp(32px, 4vh, 44px)' }}
                >
                  <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover/btn:text-black transition-colors duration-300" />
                </div>
              </div>

              {/* Pills: collection + gender + price, then accent dot + middle notes */}
              <div className="flex flex-col items-end shrink-0" style={{ gap: 'clamp(4px, 0.8vh, 10px)' }}>
                <div className="flex gap-1.5 flex-wrap justify-end">
                  {[product.collection, product.gender, product.price].map(label => (
                    <div
                      key={label}
                      className="bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white font-bold tracking-widest uppercase hover:bg-white/20 transition-colors duration-200 cursor-default"
                      style={{
                        fontSize: 'clamp(6px, 0.65vw, 9px)',
                        padding: 'clamp(3px, 0.5vh, 6px) clamp(8px, 1vw, 16px)',
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: 'clamp(26px, 3.2vh, 36px)',
                      height: 'clamp(26px, 3.2vh, 36px)',
                      background: ACCENTS[index % ACCENTS.length],
                      boxShadow: `0 0 14px 3px ${ACCENTS[index % ACCENTS.length]}55`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rotate-45" />
                  </div>
                  <div
                    className="bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white font-bold tracking-widest uppercase"
                    style={{
                      fontSize: 'clamp(6px, 0.65vw, 9px)',
                      padding: 'clamp(3px, 0.5vh, 6px) clamp(10px, 1.5vw, 28px)',
                      maxWidth: '18ch',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={product.middleNotes}
                  >
                    {product.middleNotes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);