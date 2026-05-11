import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { products, Product } from '../data/products';

/* ─────────────────────────────────────────
   DATA — 4 Royal secondary products
───────────────────────────────────────── */
const SHOWCASE_IDS = ['cuban-cigar', 'swiss-oud', 'velvet-tobacco', 'silken-oud'];

const THEMES: Record<string, {
    bg: string;
    paper: string;
    ink: string;
    accent: string;
    accentDim: string;
    num: string;
    grain: string;
}> = {
    'cuban-cigar': {
        bg: '#0e0b08',
        paper: '#1a1208',
        ink: '#f0e6c8',
        accent: '#c8843a',
        accentDim: '#c8843a22',
        num: '#2a1e0e',
        grain: 'rgba(200,132,58,0.04)',
    },
    'swiss-oud': {
        bg: '#08080e',
        paper: '#10101a',
        ink: '#ddd8f0',
        accent: '#8b72cc',
        accentDim: '#8b72cc22',
        num: '#18162a',
        grain: 'rgba(139,114,204,0.04)',
    },
    'velvet-tobacco': {
        bg: '#0d080b',
        paper: '#1a0e12',
        ink: '#f0d8e4',
        accent: '#cc5580',
        accentDim: '#cc558022',
        num: '#2a1018',
        grain: 'rgba(204,85,128,0.04)',
    },
    'silken-oud': {
        bg: '#08100d',
        paper: '#0c1a14',
        ink: '#d8f0e4',
        accent: '#44b87a',
        accentDim: '#44b87a22',
        num: '#0e2a1c',
        grain: 'rgba(68,184,122,0.04)',
    },
};

/* ─────────────────────────────────────────
   INTERFACES
───────────────────────────────────────── */
interface RoyalShowcaseProps {
    setCurrentPage: (page: 'home' | 'story' | 'catalog' | 'product') => void;
    onProductSelect: (id: string) => void;
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export const RoyalShowcase: React.FC<RoyalShowcaseProps> = ({
    setCurrentPage, onProductSelect,
}) => {
    const showcaseProducts = SHOWCASE_IDS
        .map(id => products.find(p => p.id === id))
        .filter(Boolean) as Product[];

    const [activeIdx, setActiveIdx] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    /* Track which chapter is in view via intersection observer */
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        const idx = sectionRefs.current.indexOf(e.target as HTMLDivElement);
                        if (idx !== -1) setActiveIdx(idx);
                    }
                });
            },
            { threshold: 0.55 },
        );
        sectionRefs.current.forEach(r => r && obs.observe(r));
        return () => obs.disconnect();
    }, []);

    const scrollTo = (i: number) => {
        sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            ref={containerRef}
            className="no-scrollbar"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
                background: '#080808',
            }}
        >
            {/* ── Fixed side nav (desktop) ── */}
            <SideNav
                products={showcaseProducts}
                activeIdx={activeIdx}
                onDotClick={scrollTo}
            />

            {/* ── Chapters ── */}
            {showcaseProducts.map((product, index) => {
                const theme = THEMES[product.id];
                const flip = index % 2 === 1; // alternate image/text sides
                return (
                    <Chapter
                        key={product.id}
                        ref={el => { sectionRefs.current[index] = el; }}
                        product={product}
                        theme={theme}
                        index={index}
                        flip={flip}
                        onProductSelect={onProductSelect}
                    />
                );
            })}
        </div>
    );
};

/* ─────────────────────────────────────────
   SIDE NAV DOTS
───────────────────────────────────────── */
const SideNav: React.FC<{
    products: Product[];
    activeIdx: number;
    onDotClick: (i: number) => void;
}> = ({ products, activeIdx, onDotClick }) => (
    <div
        style={{
            position: 'fixed',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'center',
        }}
        className="hidden md:flex"
    >
        {products.map((p, i) => {
            const theme = THEMES[p.id];
            const isActive = i === activeIdx;
            return (
                <button
                    key={p.id}
                    onClick={() => onDotClick(i)}
                    title={p.name}
                    style={{
                        width: isActive ? '3px' : '3px',
                        height: isActive ? '28px' : '8px',
                        borderRadius: '2px',
                        background: isActive ? theme.accent : 'rgba(255,255,255,0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                    }}
                />
            );
        })}
    </div>
);

/* ─────────────────────────────────────────
   SCENT PYRAMID
───────────────────────────────────────── */
const ScentPyramid: React.FC<{ product: Product; theme: typeof THEMES[string] }> = ({ product, theme }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: '100%' }}>
        {[
            { tier: 'Top', notes: product.topNotes, width: '55%', opacity: 1 },
            { tier: 'Heart', notes: product.middleNotes, width: '75%', opacity: 0.8 },
            { tier: 'Base', notes: product.baseNotes, width: '100%', opacity: 0.6 },
        ].map(({ tier, notes, width, opacity }) => (
            <div key={tier} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                        fontWeight: 900,
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        color: theme.accent,
                        opacity: 0.7,
                        minWidth: '34px',
                    }}>{tier}</span>
                    <div style={{
                        height: '1px',
                        width: '100%',
                        background: `linear-gradient(to right, ${theme.accent}40, transparent)`,
                    }} />
                </div>
                <div style={{
                    width,
                    padding: '5px 10px',
                    background: `${theme.accent}12`,
                    border: `1px solid ${theme.accent}25`,
                    borderRadius: '4px',
                    marginBottom: '4px',
                }}>
                    <p style={{
                        fontSize: '8.5px',
                        fontFamily: 'sans-serif',
                        color: theme.ink,
                        opacity,
                        lineHeight: 1.5,
                        margin: 0,
                    }}>{notes}</p>
                </div>
            </div>
        ))}
    </div>
);

/* ─────────────────────────────────────────
   CHAPTER (full-screen scroll section)
───────────────────────────────────────── */
interface ChapterProps {
    product: Product;
    theme: typeof THEMES[string];
    index: number;
    flip: boolean;
    onProductSelect: (id: string) => void;
}

const Chapter = React.forwardRef<HTMLDivElement, ChapterProps>(
    ({ product, theme, index, flip, onProductSelect }, ref) => {
        const innerRef = useRef<HTMLDivElement>(null);
        const isInView = useInView(innerRef, { once: false, amount: 0.4 });

        // Stagger delays
        const d = (n: number) => ({ duration: 0.7, delay: n * 0.1, ease: [0.22, 1, 0.36, 1] as any });

        return (
            <div
                ref={ref}
                style={{
                    scrollSnapAlign: 'start',
                    width: '100%',
                    height: '100vh',
                    position: 'relative',
                    overflow: 'hidden',
                    background: theme.bg,
                }}
            >
                {/* Noise grain overlay */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px',
                    opacity: 0.6,
                    mixBlendMode: 'overlay',
                }} />

                {/* Ambient radial glow behind image */}
                <div style={{
                    position: 'absolute',
                    [flip ? 'left' : 'right']: '5%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '45vw',
                    height: '80vh',
                    borderRadius: '50%',
                    background: `radial-gradient(ellipse, ${theme.accent}18 0%, transparent 70%)`,
                    zIndex: 2,
                    pointerEvents: 'none',
                    filter: 'blur(40px)',
                }} />

                {/* Chapter number watermark */}
                <div style={{
                    position: 'absolute',
                    bottom: '-2vh',
                    left: flip ? 'auto' : '-1vw',
                    right: flip ? '-1vw' : 'auto',
                    zIndex: 2,
                    pointerEvents: 'none',
                    lineHeight: 1,
                    fontFamily: 'Georgia, serif',
                    fontWeight: 700,
                    fontSize: 'clamp(140px, 22vw, 320px)',
                    color: theme.num,
                    userSelect: 'none',
                    letterSpacing: '-0.06em',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* ── INNER — reference for inView ── */}
                <div
                    ref={innerRef}
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: flip ? 'row-reverse' : 'row',
                        alignItems: 'stretch',
                    }}
                    className="flex-col md:flex-row"
                >
                    {/* ── IMAGE HALF ── */}
                    <div style={{
                        flex: '0 0 48%',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                        className="hidden md:flex"
                    >
                        {/* Vertical rule line */}
                        <div style={{
                            position: 'absolute',
                            [flip ? 'left' : 'right']: 0,
                            top: '15%',
                            bottom: '15%',
                            width: '1px',
                            background: `linear-gradient(to bottom, transparent, ${theme.accent}40, transparent)`,
                        }} />

                        {/* Ground shadow */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '32px',
                            background: 'rgba(0,0,0,0.7)',
                            filter: 'blur(28px)',
                            borderRadius: '50%',
                        }} />

                        <motion.img
                            src={product.image}
                            alt={product.name}
                            initial={{ opacity: 0, y: 60, scale: 0.92 }}
                            animate={isInView
                                ? { opacity: 1, y: 0, scale: 1 }
                                : { opacity: 0, y: 60, scale: 0.92 }
                            }
                            transition={d(1)}
                            style={{
                                height: 'min(88vh, 780px)',
                                width: 'auto',
                                objectFit: 'contain',
                                objectPosition: 'bottom',
                                filter: `drop-shadow(0 32px 64px rgba(0,0,0,0.8))`,
                                position: 'relative',
                                zIndex: 5,
                            }}
                        />
                    </div>

                    {/* ── TEXT HALF ── */}
                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: 'clamp(80px, 8vh, 140px) clamp(28px, 4vw, 72px) clamp(40px, 5vh, 80px)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>

                        {/* ── Top meta row ── */}
                        <motion.div
                            initial={{ opacity: 0, x: flip ? -30 : 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: flip ? -30 : 30 }}
                            transition={d(0)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'clamp(16px, 2.5vh, 32px)' }}
                        >
                            {/* Accent line */}
                            <div style={{ width: '32px', height: '1px', background: theme.accent }} />
                            <span style={{
                                fontSize: '8px',
                                fontFamily: 'sans-serif',
                                fontWeight: 900,
                                letterSpacing: '0.3em',
                                textTransform: 'uppercase',
                                color: theme.accent,
                            }}>
                                Royal Collection
                            </span>
                            <span style={{
                                fontSize: '8px',
                                fontFamily: 'sans-serif',
                                fontWeight: 700,
                                letterSpacing: '0.2em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.25)',
                            }}>
                                {product.gender} · {product.price}
                            </span>
                        </motion.div>

                        {/* ── Product name — large editorial ── */}
                        <div style={{ marginBottom: 'clamp(20px, 3vh, 40px)', overflow: 'hidden' }}>
                            {product.name.split(' ').map((word, wi) => (
                                <motion.div
                                    key={wi}
                                    initial={{ opacity: 0, y: 80 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
                                    transition={{ ...d(wi + 1), duration: 0.8 }}
                                    style={{ overflow: 'hidden', lineHeight: 0.88 }}
                                >
                                    <span style={{
                                        display: 'block',
                                        fontFamily: 'Georgia, "Times New Roman", serif',
                                        fontWeight: 700,
                                        fontStyle: wi > 0 ? 'italic' : 'normal',
                                        fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
                                        color: wi === 0 ? theme.ink : theme.accent,
                                        letterSpacing: '-0.03em',
                                        lineHeight: 0.88,
                                        paddingBottom: '6px',
                                    }}>
                                        {word}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        {/* ── Divider ── */}
                        <motion.div
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={d(3)}
                            style={{
                                height: '1px',
                                background: `linear-gradient(to right, ${theme.accent}60, transparent)`,
                                marginBottom: 'clamp(16px, 2.5vh, 32px)',
                            }}
                        />

                        {/* ── Scent pyramid ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={d(4)}
                            style={{ marginBottom: 'clamp(20px, 3vh, 36px)' }}
                        >
                            <ScentPyramid product={product} theme={theme} />
                        </motion.div>

                        {/* ── Mobile image (shows only on mobile) ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={d(2)}
                            className="flex md:hidden"
                            style={{
                                justifyContent: 'center',
                                marginBottom: 'clamp(16px, 2.5vh, 28px)',
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    height: 'clamp(140px, 28vh, 220px)',
                                    width: 'auto',
                                    objectFit: 'contain',
                                    filter: `drop-shadow(0 16px 32px rgba(0,0,0,0.7))`,
                                }}
                            />
                        </motion.div>

                        {/* ── CTA row ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={d(5)}
                            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                        >
                            <button
                                onClick={() => onProductSelect(product.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px 24px',
                                    background: theme.accent,
                                    border: 'none',
                                    borderRadius: '2px',
                                    cursor: 'pointer',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                <span style={{
                                    fontSize: '9px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: 900,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: '#08080e',
                                }}>Explore</span>
                                <ArrowUpRight size={13} color="#08080e" />
                            </button>

                            {/* Price standalone */}
                            <div>
                                <p style={{
                                    fontSize: '7px',
                                    fontFamily: 'sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    color: 'rgba(255,255,255,0.25)',
                                    margin: '0 0 2px',
                                }}>Starting at</p>
                                <p style={{
                                    fontSize: 'clamp(14px, 1.6vw, 20px)',
                                    fontFamily: 'Georgia, serif',
                                    fontWeight: 700,
                                    color: theme.ink,
                                    margin: 0,
                                    letterSpacing: '-0.01em',
                                }}>{product.price}</p>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* ── Bottom chapter label ── */}
                <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    pointerEvents: 'none',
                }}>
                    <div style={{ width: '20px', height: '1px', background: `${theme.accent}60` }} />
                    <span style={{
                        fontSize: '7px',
                        fontFamily: 'sans-serif',
                        fontWeight: 900,
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: `${theme.accent}80`,
                    }}>
                        {String(index + 1).padStart(2, '0')} / 04
                    </span>
                    <div style={{ width: '20px', height: '1px', background: `${theme.accent}60` }} />
                </div>

            </div>
        );
    },
);

Chapter.displayName = 'Chapter';