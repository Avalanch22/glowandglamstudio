import { useState, useEffect, useRef } from 'react';
import showcaseData from '@/data/showcase.json';
import { BrushIcon } from './StudioEffects';
import { cn } from '@/lib/utils';

// Load gallery images eagerly via Vite
const imageModules = import.meta.glob<string>(
  '/src/assets/gallery/*/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
);

export interface FanCardItem {
  src: string;
  title?: string;
  subtitle?: string;
  tag?: string;
}

interface CardFanCarouselProps {
  category?: 'hero' | 'about' | string;
  title?: string;
  description?: string;
  className?: string;
}

export function CardFanCarousel({ category = 'hero', title, description, className }: CardFanCarouselProps) {
  // Helper to resolve image URL by filename
  const resolveImage = (filename: string) => {
    const found = Object.entries(imageModules).find(([path]) => path.includes(filename));
    return found ? found[1] : filename;
  };

  // Select items from showcase.json based on category
  const rawItems = category === 'about'
    ? showcaseData.aboutStudioMoments
    : showcaseData.homepageShowcase;

  const items: FanCardItem[] = rawItems.map((item) => ({
    src: resolveImage(item.image),
    title: item.title,
    subtitle: item.subtitle,
    tag: item.tag,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<FanCardItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = items.length;

  // Auto-cycle every 5.5s unless hovered
  useEffect(() => {
    if (isHovered || count <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, count]);

  // Close lightbox on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (count === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No showcase items found in showcase.json.</p>
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  return (
    <section className={cn("py-12 md:py-16 overflow-hidden relative select-none", className)}>
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="font-display text-4xl md:text-5xl font-light tracking-wide text-foreground mb-3">
                {title}
              </h2>
            )}
            {description && (
              <p className="font-sans text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* ── CARD FAN STAGE ── */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl mx-auto h-[440px] md:h-[490px] flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((item, idx) => {
            let diff = idx - activeIndex;
            if (diff > count / 2) diff -= count;
            if (diff < -count / 2) diff += count;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= 3;

            if (!isVisible) return null;

            const rotateZ = diff * (isHovered ? 12 : 7.5);
            const translateX = diff * (isHovered ? 125 : 85);
            const translateY = Math.abs(diff) * Math.abs(diff) * (isHovered ? 18 : 12);
            const scale = isCenter ? 1.06 : Math.max(0.8, 1 - Math.abs(diff) * 0.08);
            const zIndex = 30 - Math.abs(diff) * 5;
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - Math.abs(diff) * 0.25);

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isCenter) {
                    setSelectedImage(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                className={cn(
                  "absolute w-[260px] h-[350px] md:w-[300px] md:h-[410px] rounded-xl overflow-hidden fan-card-transition origin-bottom will-change-transform group shadow-2xl",
                  isCenter
                    ? "border-2 border-primary shadow-[0_20px_60px_hsl(28_55%_58%/0.25)] ring-4 ring-primary/10 cursor-pointer"
                    : "border border-border/50 hover:border-primary/50 cursor-pointer"
                )}
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
              >
                {/* Image */}
                <img
                  src={item.src}
                  alt={item.title || `Look ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10 pointer-events-none" />

                {/* Top Tag Badge */}
                {item.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="nav-label text-[10px] text-primary bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/40 tracking-widest">
                      {item.tag}
                    </span>
                  </div>
                )}

                {/* Top Right Zoom Icon for active center */}
                {isCenter && (
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-primary/40 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      <line x1="11" y1="8" x2="11" y2="14"/>
                      <line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                  </div>
                )}

                {/* Bottom Text Content */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 transform transition-transform duration-300">
                  <h3 className="font-display text-xl md:text-2xl text-foreground font-light mb-1 leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground/90 font-light line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  )}
                  {isCenter && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-[11px] nav-label text-primary">
                      <span>Tap to zoom photo</span>
                      <BrushIcon className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border/60 hover:border-primary bg-card/40 hover:bg-primary/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            aria-label="Previous card"
          >
            <BrushIcon className="w-3.5 h-3.5 -rotate-90" />
          </button>

          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === activeIndex
                    ? "w-7 bg-primary shadow-[0_0_8px_hsl(28_55%_58%/0.8)]"
                    : "w-2 bg-border/60 hover:bg-muted-foreground"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border/60 hover:border-primary bg-card/40 hover:bg-primary/20 backdrop-blur-md flex items-center justify-center text-foreground hover:text-primary transition-all duration-300 hover:scale-105"
            aria-label="Next card"
          >
            <BrushIcon className="w-3.5 h-3.5 rotate-90" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-primary bg-black/60 rounded-full p-2.5 border border-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.title || "Look"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-primary/20"
              onClick={(e) => e.stopPropagation()}
            />

            {selectedImage.title && (
              <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
                <span className="nav-label text-xs text-primary">{selectedImage.tag}</span>
                <h4 className="font-display text-2xl text-white font-light mt-1">{selectedImage.title}</h4>
                <p className="text-sm text-gray-300 font-light mt-1 max-w-md">{selectedImage.subtitle}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
