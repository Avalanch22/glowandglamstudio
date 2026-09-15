import { Button } from "@/components/ui/button";
import { CardFanCarousel } from "@/components/CardFanCarousel";
import { Reveal } from "@/components/Layout";
import {
  VanityRing,
  BrushIcon,
  LipstickIcon,
  PaletteIcon,
  PerfumeIcon,
  BlushIcon,
  CurlerIcon
} from "@/components/StudioEffects";

import galleryCover from '@/assets/gallery/hero/01-bridal-radiance.jpg';
import packagesCover from '@/assets/gallery/hero/02-evening-glam.jpg';
import aboutCover from '@/assets/gallery/about/02-studio-glow.jpg';
import bookCover from '@/assets/gallery/hero/03-dewy-perfection.jpg';

const NAV_CARDS = [
  {
    id: 'gallery',
    title: 'Gallery',
    subtitle: 'Curated Portfolios',
    description: 'Explore 6 bespoke collections from sacred temple bridal to high-fashion reception & editorial glamour.',
    badge: '6 Collections • 28 Looks',
    href: '/portfolio.html',
    image: galleryCover,
    action: 'Explore Gallery',
    Icon: PaletteIcon,
  },
  {
    id: 'packages',
    title: 'Packages',
    subtitle: 'Transparent Pricing',
    description: 'Bespoke bridal, reception, and party packages tailored with HD airbrushing, draping, and styling.',
    badge: 'Starting ₹18,000',
    href: '/packages.html',
    image: packagesCover,
    action: 'View Packages',
    Icon: BlushIcon,
  },
  {
    id: 'about',
    title: 'About Studio',
    subtitle: 'Artistry & Craft',
    description: 'Over 8 years mastering the "Quiet Glow". An intentional, serene sanctuary for brides in Chennai.',
    badge: '500+ Brides • 8+ Yrs',
    href: '/about.html',
    image: aboutCover,
    action: 'Our Philosophy',
    Icon: BrushIcon,
  },
  {
    id: 'book-now',
    title: 'Book Now',
    subtitle: 'Reserve Your Date',
    description: 'Direct date availability check, personal consultation, and customized bridal scheduling.',
    badge: 'Weekend Slots Limited',
    href: '/book-now.html',
    image: bookCover,
    action: 'Reserve Now',
    Icon: LipstickIcon,
  },
];

export function Home() {
  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="relative min-h-[75svh] md:min-h-[85svh] flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-6 pt-2 pb-12">
        {/* Grand Vanity mirror circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[850px] md:h-[850px] lg:w-[1150px] lg:h-[1150px] pointer-events-none">
          <VanityRing count={28} />
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.14)_0%,hsl(38_40%_65%/0.05)_45%,transparent_70%)]" />
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 fade-in relative z-10">
          <BrushIcon className="w-4 h-4 md:w-5 md:h-5 text-primary -rotate-45" />
          <span className="nav-label text-primary tracking-[0.2em] md:tracking-[0.25em] text-[10px] md:text-xs uppercase">
            Signature Bridal & Editorial Artistry
          </span>
          <BrushIcon className="w-4 h-4 md:w-5 md:h-5 text-primary rotate-45" />
        </div>

        {/* Hero heading */}
        <h1 className="relative z-10 font-display font-light text-[2.6rem] sm:text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight fade-in max-w-5xl mb-5 md:mb-7">
          The Art of a<br />
          <span className="text-shimmer italic">Quiet Glow.</span>
        </h1>

        <p className="relative z-10 text-sm md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-6 md:mb-10 fade-in leading-relaxed font-light">
          Futuristic precision meets timeless grace. Bespoke makeup, hair architecture, and couture styling 
          for brides who prefer subtle luxury over heavy masking.
        </p>
      </section>

      {/* ── 4 NAVIGATION CARDS (GALLERY, PACKAGES, ABOUT, BOOK NOW) ── */}
      <section className="py-8 md:py-16 px-4 md:px-6 relative z-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <LipstickIcon className="w-4 h-4 text-primary" />
                <span className="nav-label text-primary text-[10px] md:text-xs">Explore the Studio</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light">
                Discover <span className="text-shimmer italic">Glow & Glam.</span>
              </h2>
            </div>
            <p className="text-muted-foreground text-xs md:text-sm max-w-md font-light">
              Select an experience below to browse our photo galleries, transparent service packages, studio philosophy, or secure your date.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {NAV_CARDS.map((card) => (
              <a
                key={card.id}
                href={card.href}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 md:p-7 min-h-[360px] md:min-h-[420px] transition-all duration-500 hover:border-primary/70 hover:shadow-[0_12px_40px_hsl(28_55%_58%/0.25)] hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Background Image with elegant zoom & overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.82]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20 group-hover:via-background/50 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(28_55%_58%/0.2)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Top Badge & Icon */}
                <div className="relative z-10 flex items-start justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium bg-background/70 backdrop-blur-md border border-primary/40 text-primary shadow-sm">
                    {card.badge}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary group-hover:border-primary/60 group-hover:scale-110 transition-all duration-300">
                    <card.Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 pt-12">
                  <span className="nav-label text-[10px] text-primary tracking-widest uppercase block mb-1">
                    {card.subtitle}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-foreground group-hover:text-primary transition-colors duration-300 mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-light mb-5 line-clamp-3">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-2 pt-3 border-t border-border/30 text-primary font-medium text-xs tracking-wider uppercase">
                    <span>{card.action}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO INTRO PANEL ── */}
      <Reveal>
        <section className="py-8 md:py-16 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="studio-panel rounded-lg p-6 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <p className="nav-label text-primary mb-3 md:mb-4 flex items-center gap-2">
                  <BrushIcon className="w-4 h-4" />
                  Our Craft
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-4 md:mb-6">
                  Step into the <span className="text-shimmer italic">Studio.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 md:mb-8 text-base md:text-lg font-light">
                  When you arrive, you enter a world of calm precision. Warmly lit. Fragranced with 
                  possibility. Every brush, every product, every technique — chosen intentionally 
                  to enhance what's already there, never to mask it.
                </p>
                <Button size="lg" className="btn-lipstick px-5 md:px-6 py-4 md:py-5 text-sm md:text-base w-full sm:w-auto" asChild>
                  <a href="/about.html" className="flex items-center justify-center sm:justify-start gap-2">
                    <LipstickIcon className="w-4 h-4 md:w-5 md:h-5" />
                    About the Studio
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { num: '500+', label: 'Happy Brides', Icon: CurlerIcon },
                  { num: '8 Yrs', label: 'In the Industry', Icon: BrushIcon },
                  { num: '100%', label: 'Cruelty-Free', Icon: BlushIcon },
                  { num: '5★', label: 'Average Rating', Icon: PerfumeIcon },
                ].map((s) => (
                  <div key={s.label} className="border border-border/40 bg-background/30 p-4 md:p-6 rounded-md hover:border-primary/50 transition-colors">
                    <s.Icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-2 md:mb-4" />
                    <p className="font-display text-2xl md:text-3xl lg:text-4xl text-shimmer mb-0.5 md:mb-1">{s.num}</p>
                    <p className="nav-label text-muted-foreground text-[9px] md:text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── SELECTED WORK (CARD FAN CAROUSEL) ── */}
      <Reveal>
        <CardFanCarousel
          category="hero"
          title="Selected Work"
          description="Glide through our signature transformations — each look sculpted with restraint and quiet radiance."
        />
      </Reveal>

      {/* ── CTA ── */}
      <section className="py-12 md:py-20 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,hsl(28_55%_58%/0.1)_0%,transparent_70%)] pointer-events-none" />
        <Reveal className="relative container mx-auto">
          <BrushIcon className="w-7 h-7 md:w-8 md:h-8 text-primary mx-auto mb-3 md:mb-4 -rotate-12" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-6xl font-light mb-3 md:mb-4">
            Your moment, <br/><span className="text-shimmer italic">flawlessly rendered.</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-6 md:mb-8 leading-relaxed max-w-xs sm:max-w-sm md:max-w-lg mx-auto font-light">
            Weekend slots fill weeks in advance. Reserve your bridal or celebration date today.
          </p>
          <Button size="lg" className="btn-lipstick text-sm md:text-base px-6 md:px-8 py-5 md:py-6 w-full max-w-xs sm:w-auto" asChild>
            <a href="/book-now.html" className="flex items-center justify-center gap-2">
              <LipstickIcon className="w-4 h-4 md:w-5 md:h-5" />
              Book a Consultation
            </a>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
