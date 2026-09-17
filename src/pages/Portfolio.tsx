import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/Layout';
import {
  PaletteIcon,
  BrushIcon,
  LipstickIcon,
  BlushIcon,
  CurlerIcon,
  PerfumeIcon
} from '@/components/StudioEffects';
import { WebGLPortfolioCarousel } from '@/components/WebGLPortfolioCarousel';
import { Button } from '@/components/ui/button';

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

// Direct cover image imports for collection cards
import bridalCover from '@/assets/images/bridal/01-traditional-radiance.jpg';
import receptionCover from '@/assets/images/reception/01-evening-luminous.jpg';
import engagementCover from '@/assets/images/engagement/01-ethereal-rose.jpg';
import hairCover from '@/assets/images/hairstyling/01-sculpted-waves.jpg';
import partyCover from '@/assets/images/party/01-party-shimmer.jpg';
import featuredCover from '@/assets/images/portfolio-featured/01-signature-bride.jpg';

// Eagerly import all gallery images
const galleryModules = import.meta.glob<{ default: string }>(
  '/src/assets/images/*/*.{png,jpg,jpeg,webp}',
  { eager: true }
);

interface Collection {
  id: string;
  folder: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  cover: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'bridal-makeover',
    folder: 'bridal',
    title: 'Bridal Makeover',
    subtitle: 'Premium',
    tag: 'Starting ₹10,000',
    description: 'HD / Airbrush foundation, full contouring, luxury lashes, and complete styling for your big day.',
    cover: bridalCover,
    Icon: CurlerIcon,
  },
  {
    id: 'reception-makeover',
    folder: 'reception',
    title: 'Reception Makeover',
    subtitle: 'Evening',
    tag: 'Starting ₹8,000',
    description: 'HD makeup full look, eye-forward styling, and dramatic evening glamour.',
    cover: receptionCover,
    Icon: BlushIcon,
  },
  {
    id: 'model-photoshoot',
    folder: 'portfolio-featured',
    title: 'Model Photoshoot Makeover',
    subtitle: 'Editorial',
    tag: 'Starting ₹6,000',
    description: 'Camera-ready HD base, creative editorial styling, and multiple look transitions.',
    cover: featuredCover,
    Icon: SparkleIcon,
  },
  {
    id: 'haldi-mehendi',
    folder: 'engagement',
    title: 'Haldi & Mehendi Looks',
    subtitle: 'Event',
    tag: 'Starting ₹4,000',
    description: 'Dewy, sweat-proof base, soft contouring, and floral jewelry styling assistance.',
    cover: engagementCover,
    Icon: LipstickIcon,
  },
  {
    id: 'evening-party',
    folder: 'party',
    title: 'Evening Party Looks',
    subtitle: 'Glamour',
    tag: 'Starting ₹3,000',
    description: 'Flawless event base, contouring, basic hairstyling, and lash application.',
    cover: partyCover,
    Icon: PaletteIcon,
  },
  {
    id: 'hair-styling',
    folder: 'hairstyling',
    title: 'Hair Styling',
    subtitle: 'À la carte',
    tag: 'Starting ₹2,000',
    description: 'Expert updos or textured waves, hair extension setting, and saree draping.',
    cover: hairCover,
    Icon: PerfumeIcon,
  },
];

// Rich editorial titles and descriptions keyed by filename
const PHOTO_METADATA: Record<string, { title: string; desc: string }> = {
  // Bridal
  '01-traditional-radiance.jpg': {
    title: 'Royal Temple Muhurtham',
    desc: 'Luminous HD airbrush base with traditional temple gold jewellery harmony.'
  },
  '02-hd-airbrush-bride.jpg': {
    title: 'Featherlight HD Airbrush',
    desc: 'Weightless micro-fine coverage designed for high-resolution morning ceremony photography.'
  },
  '03-bridal-portrait.jpg': {
    title: 'Luminous Classic Bride',
    desc: 'Warm terracotta undertones, sculpted eyes, and timeless understated grace.'
  },
  '04-royal-jewels-glam.jpg': {
    title: 'Heirloom Antique Jewel Glam',
    desc: 'Deep jewel-toned richness paired with seamless golden highlighter placement.'
  },

  // Reception
  '01-evening-luminous.jpg': {
    title: 'Golden Hour Reception Glow',
    desc: 'Smokey eye architecture paired with velvet matte nude lips and high-beam highlight.'
  },
  '02-bold-reception.jpg': {
    title: 'Midnight Gala Couture',
    desc: 'Sculpted cheekbone architecture and sharp feline wing definition for reception evenings.'
  },
  '03-dramatic-contour.jpg': {
    title: 'High-Beam Strobe Glamour',
    desc: 'Engineered specifically for strobe and evening ballroom reception lighting.'
  },
  '04-night-glamour.jpg': {
    title: 'Champagne Shimmer Radiance',
    desc: 'Luminous dewy collarbones, glowing eyes, and velvety soft lips.'
  },

  // Engagement
  '01-ethereal-rose.jpg': {
    title: 'Blushing Rose Ethereal Glow',
    desc: 'Romantic rose petal blush and micro-fine shimmer for intimate exchange of vows.'
  },
  '02-romantic-dew.jpg': {
    title: 'Daylight Glass Skin',
    desc: 'Natural sunlight perfection with dewy balmy highlights and petal lips.'
  },
  '03-subtle-glow.jpg': {
    title: 'Pastel Ceremony Glow',
    desc: 'Understated pastel elegance curated for daytime intimate vow exchanges.'
  },
  '04-timeless-elegance.jpg': {
    title: 'Silk Organza Harmony',
    desc: 'Warm champagne glow coordinated with pastel silk organza celebration attire.'
  },

  // Hairstyling
  '01-sculpted-waves.jpg': {
    title: 'Hollywood Textured Waves',
    desc: 'Hollywood textured hair waves structured to hold movement without rigidity.'
  },
  '02-styling-detail.jpg': {
    title: 'Intricate Braid Architecture',
    desc: 'Modernized South Indian braid with micro-braids and pearl detailing.'
  },
  '03-floral-braid.jpg': {
    title: 'Traditional Jasmine Crown',
    desc: 'Fresh fragrant malli poo garland integration with contemporary structural flow.'
  },
  '04-modern-updo.jpg': {
    title: 'Textured Low Chignon',
    desc: 'Relaxed French-inspired low bridal bun with face-framing tendrils.'
  },

  // Party
  '01-party-shimmer.jpg': {
    title: 'Sangeet Celebration Sparkle',
    desc: 'Sweat-proof, dance-floor-ready glitter pigments and long-wear radiance.'
  },
  '02-vibrant-glam.jpg': {
    title: 'Cocktail Velvet Radiance',
    desc: 'Bold lips with minimalist glowing base for high-energy cocktail nights.'
  },
  '03-blush-radiance.jpg': {
    title: 'Sun-Kissed Golden Hour',
    desc: 'Warm peachy monochrome glow across eyes, cheeks, and lips.'
  },
  '04-celebration-look.jpg': {
    title: 'Contemporary Festive Glow',
    desc: 'Vibrant, sweat-proof celebration makeup that stays radiant until sunrise.'
  },

  // Featured
  '01-signature-bride.jpg': {
    title: 'Signature Royal Bridal',
    desc: 'Luminous HD airbrush base with traditional temple gold jewellery harmony.'
  },
  '02-reception-glam.jpg': {
    title: 'Golden Hour Reception',
    desc: 'Smokey eye architecture paired with velvet matte nude lips and high-beam highlight.'
  },
  '03-editorial-dewy.jpg': {
    title: 'Minimalist Glass Skin',
    desc: 'Ultra-dewy transfer-resistant finish designed for natural daylight clarity.'
  },
  '04-bold-couture.jpg': {
    title: 'Couture Midnight Glam',
    desc: 'Bold feline eye wings with metallic bronze pigments for evening galas.'
  },
  '05-festive-party.jpg': {
    title: 'Sangeet Celebration',
    desc: 'Vibrant celebration makeup that stays radiant throughout high energy dancing.'
  },
  '06-romantic-look.jpg': {
    title: 'Romantic Ring Ceremony',
    desc: 'Soft rose petal blush and micro-fine shimmer for intimate exchange of vows.'
  },
  '07-sculpted-waves.jpg': {
    title: 'Sculptural Mermaid Waves',
    desc: 'Hollywood textured hair waves structured to hold movement without rigidity.'
  },
  '08-golden-glow.jpg': {
    title: 'Terracotta Sunset Glow',
    desc: 'Warm bronze tones capturing the golden hour glow of South Indian brides.'
  },
};

export function Portfolio() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('bridal-makeover');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const activeCollection = useMemo(() => {
    return COLLECTIONS.find((c) => c.id === selectedCollectionId) || COLLECTIONS[0];
  }, [selectedCollectionId]);

  // Load photos belonging to the selected collection folder
  const currentPhotos = useMemo(() => {
    const folder = activeCollection.folder;
    return Object.entries(galleryModules)
      .filter(([path]) => path.includes(`/images/${folder}/`))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([path, mod]) => {
        const filename = path.split('/').pop() || '';
        const meta = PHOTO_METADATA[filename] || {
          title: filename.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
          desc: 'Signature bespoke artistry by Glow & Glam Studio.',
        };
        return {
          src: mod.default,
          path,
          filename,
          title: meta.title,
          desc: meta.desc,
          collection: activeCollection.title,
        };
      });
  }, [activeCollection]);

  // Handle keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % currentPhotos.length : null));
      } else if (e.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev - 1 + currentPhotos.length) % currentPhotos.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, currentPhotos.length]);

  return (
    <div className="pb-24 pt-4">
      {/* ── HEADER CONTAINER ── */}
      <section className="relative py-8 md:py-12 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.12)_0%,transparent_70%)] pointer-events-none" />

        {/* CONTAINER MX-AUTO RELATIVE (as specified) */}
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-border/30">
            <div>
              <div className="flex items-center gap-2 mb-2 fade-in">
                <PaletteIcon className="w-4 h-4 text-primary" />
                <span className="nav-label text-primary text-[10px] md:text-xs uppercase tracking-widest">
                  Curated Studio Archive
                </span>
                <BrushIcon className="w-4 h-4 text-primary/60" />
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light tracking-tight fade-in">
                The <span className="text-shimmer italic">Gallery.</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl font-light mt-3 leading-relaxed">
                Click any collection below to inspect high-resolution photographs of our real bridal transformations,
                editorial projects, and celebration looks.
              </p>
            </div>
          </div>

          {/* ── CINEMATIC 3D CAROUSEL ── */}
          <Reveal>
            <div className="mb-14">
              <div className="text-center mb-6">
                <span className="nav-label text-primary text-xs uppercase tracking-widest">WebGL Viewport</span>
                <h3 className="font-display text-2xl md:text-3xl font-light mt-1">Interactive Cinematic Carousel</h3>
              </div>
              <WebGLPortfolioCarousel />
            </div>
          </Reveal>

          {/* ── COLLECTION CARDS (21st.dev / v0 Luxury Style) ── */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h2 className="text-xs md:text-sm font-semibold tracking-wider uppercase text-foreground">
                  Select a Collection
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-light">
                {COLLECTIONS.length} Collections Available
              </span>
            </div>

            {/* 6 Collection Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4">
              {COLLECTIONS.map((col) => {
                const isSelected = selectedCollectionId === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollectionId(col.id)}
                    className={`group relative text-left rounded-xl overflow-hidden p-3.5 md:p-4 flex flex-col justify-between min-h-[170px] md:min-h-[210px] transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/40 bg-card/90 shadow-[0_0_28px_hsl(28_55%_58%/0.35)] -translate-y-1'
                        : 'border-border/50 bg-card/40 hover:bg-card/70 hover:border-primary/50 hover:-translate-y-0.5'
                    }`}
                  >
                    {/* Background Image with blur and darkening */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <img
                        src={col.cover}
                        alt={col.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                          isSelected ? 'scale-110 brightness-[0.55]' : 'brightness-[0.45] group-hover:scale-105 group-hover:brightness-[0.6]'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent" />
                    </div>

                    {/* Card Top: Tag + Icon */}
                    <div className="relative z-10 flex items-start justify-between w-full">
                      <span
                        className={`text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wider uppercase backdrop-blur-sm border ${
                          isSelected
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background/80 text-primary border-primary/30'
                        }`}
                      >
                        {col.tag}
                      </span>
                      <col.Icon
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isSelected ? 'text-primary scale-110' : 'text-muted-foreground group-hover:text-primary'
                        }`}
                      />
                    </div>

                    {/* Card Bottom: Titles */}
                    <div className="relative z-10 mt-auto pt-4">
                      <span className="text-[9px] md:text-[10px] text-primary tracking-widest uppercase block mb-0.5">
                        {col.subtitle}
                      </span>
                      <h3
                        className={`font-display text-sm md:text-base leading-tight font-normal transition-colors ${
                          isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}
                      >
                        {col.title}
                      </h3>
                      {isSelected && (
                        <span className="text-[9px] text-primary/80 font-medium block mt-1">
                          Viewing photos ↓
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── ACTIVE COLLECTION PHOTOS GALLERY ── */}
            <section className="relative">
              {/* Collection Banner Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-4 rounded-xl bg-card/50 border border-border/40 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Collection: {activeCollection.title}
                    </span>
                    <span className="text-xs text-muted-foreground">• {currentPhotos.length} Photographs</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 font-light">
                    {activeCollection.description}
                  </p>
                </div>
                <Button size="sm" className="btn-lipstick self-start sm:self-auto text-xs px-4" asChild>
                  <a href={`/book-now?look=${encodeURIComponent(activeCollection.title)}`}>Book This Collection</a>
                </Button>
              </div>

              {/* Photos Grid (v0 / 21st.dev Masonry style) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCollectionId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
                >
                  {currentPhotos.map((photo, idx) => (
                    <motion.div
                      key={photo.path}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => setActivePhotoIndex(idx)}
                      className="group relative rounded-xl overflow-hidden bg-card/40 border border-border/40 hover:border-primary/70 transition-all duration-500 hover:shadow-[0_12px_36px_hsl(28_55%_58%/0.2)] cursor-pointer flex flex-col"
                    >
                      {/* Photo Image with 4:5 Aspect Ratio */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
                        <img
                          src={photo.src}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                        />
                        {/* Shimmer gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

                        {/* Top-Right Expand Button Badge */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-md">
                          <span className="text-sm font-semibold">⤢</span>
                        </div>
                      </div>

                      {/* Photo Caption Container */}
                      <div className="p-4 flex flex-col justify-between flex-1 bg-card/60 backdrop-blur-sm border-t border-border/30">
                        <div>
                          <span className="text-[10px] text-primary uppercase tracking-widest font-medium block mb-1">
                            {photo.collection}
                          </span>
                          <h4 className="font-display text-base font-normal text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                            {photo.title}
                          </h4>
                          <p className="text-xs text-muted-foreground font-light leading-relaxed line-clamp-2">
                            {photo.desc}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-border/20 flex items-center justify-between text-xs text-primary/90 font-medium">
                          <span className="text-[11px] group-hover:translate-x-0.5 transition-transform duration-300">
                            Enlarge Photo →
                          </span>
                          <span className="text-[10px] text-muted-foreground font-light">HD Airbrush</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </section>
        </div>
      </section>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
        {activePhotoIndex !== null && currentPhotos[activePhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[92vh] bg-card/90 border border-primary/40 rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
            >
              {/* Image Preview Side */}
              <div className="relative flex-1 bg-black/80 flex items-center justify-center min-h-[300px] md:min-h-[560px] overflow-hidden">
                <img
                  src={currentPhotos[activePhotoIndex].src}
                  alt={currentPhotos[activePhotoIndex].title}
                  className="max-h-[50vh] md:max-h-[85vh] w-auto max-w-full object-contain mx-auto"
                />

                {/* Lightbox Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + currentPhotos.length) % currentPhotos.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-primary text-foreground hover:text-primary-foreground border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg text-lg"
                  aria-label="Previous photo"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePhotoIndex((activePhotoIndex + 1) % currentPhotos.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 hover:bg-primary text-foreground hover:text-primary-foreground border border-white/20 flex items-center justify-center transition-all duration-200 shadow-lg text-lg"
                  aria-label="Next photo"
                >
                  ›
                </button>
              </div>

              {/* Sidebar Info */}
              <div className="w-full md:w-80 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/40 bg-card">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-primary px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30">
                      {currentPhotos[activePhotoIndex].collection}
                    </span>
                    <button
                      onClick={() => setActivePhotoIndex(null)}
                      className="w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-sm font-bold"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-light text-foreground mb-3 leading-tight">
                    {currentPhotos[activePhotoIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed mb-6">
                    {currentPhotos[activePhotoIndex].desc}
                  </p>

                  <div className="space-y-2 py-4 border-y border-border/30 text-xs">
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Index:</span>
                      <span className="text-foreground font-medium">
                        {activePhotoIndex + 1} of {currentPhotos.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Artistry:</span>
                      <span className="text-foreground font-medium">HD Airbrush & Styling</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground font-light">
                      <span>Studio:</span>
                      <span className="text-foreground font-medium">Chennai Flagship</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <Button asChild size="lg" className="btn-lipstick w-full text-xs py-5">
                    <a
                      href={`/book-now?look=${encodeURIComponent(
                        currentPhotos[activePhotoIndex].collection
                      )}`}
                    >
                      Book This Collection
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-border/60 hover:border-primary/50"
                    onClick={() => setActivePhotoIndex(null)}
                  >
                    Back to Gallery
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

