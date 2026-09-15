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
  SpongeIcon,
  CurlerIcon
} from "@/components/StudioEffects";

const SERVICES = [
  { title: 'Bridal', tagline: 'Your most sacred glow.', href: '/services/bridal-makeup.html', Icon: CurlerIcon },
  { title: 'Reception', tagline: 'Bold luminous evening.', href: '/services/reception-makeup.html', Icon: BlushIcon },
  { title: 'Engagement', tagline: 'Ethereal & romantic.', href: '/services/engagement-makeup.html', Icon: SpongeIcon },
  { title: 'Party', tagline: 'Standout at any event.', href: '/services/party-makeup.html', Icon: LipstickIcon },
  { title: 'Hairstyling', tagline: 'Architecture that flows.', href: '/services/hairstyling.html', Icon: PerfumeIcon },
];

export function Home() {
  return (
    <div className="relative">
      {/* ── HERO ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-6">
        {/* Grand Vanity mirror circle — encircling the entire hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[600px] sm:h-[600px] md:w-[850px] md:h-[850px] lg:w-[1150px] lg:h-[1150px] xl:w-[1320px] xl:h-[1320px] pointer-events-none">
          <VanityRing count={30} />
          {/* Soft key-light glow inside the grand mirror */}
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.16)_0%,hsl(38_40%_65%/0.06)_45%,transparent_70%)]" />
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-2 md:gap-3 mb-5 md:mb-8 fade-in relative z-10">
          <BrushIcon className="w-4 h-4 md:w-5 md:h-5 text-primary -rotate-45" />
          <span className="nav-label text-primary tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-xs">Glow & Glam Studio — Chennai</span>
          <BrushIcon className="w-4 h-4 md:w-5 md:h-5 text-primary rotate-45" />
        </div>

        {/* Hero heading */}
        <h1 className="relative z-10 font-display font-light text-[2.6rem] sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight fade-in max-w-5xl mb-5 md:mb-8">
          The Art of a<br />
          <span className="text-shimmer italic">Quiet Glow.</span>
        </h1>

        <p className="relative z-10 text-sm md:text-lg lg:text-xl text-muted-foreground max-w-xs sm:max-w-md md:max-w-2xl mx-auto mb-8 md:mb-12 fade-in leading-relaxed font-light">
          Futuristic precision meets timeless beauty. Bespoke makeup and styling for brides, 
          celebrations, and every moment meant to be unforgettable.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 md:gap-5 fade-in w-full max-w-xs sm:max-w-none sm:w-auto">
          <Button size="lg" className="btn-lipstick text-sm md:text-base px-6 md:px-8 py-5 md:py-6 w-full sm:w-auto" asChild>
            <a href="/book-now.html" className="flex items-center justify-center gap-2">
              <LipstickIcon className="w-4 h-4 md:w-5 md:h-5" />
              Reserve Your Date
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 border-border/60 hover:border-primary/60 w-full sm:w-auto" asChild>
            <a href="/portfolio.html" className="flex items-center justify-center gap-2">
              <PaletteIcon className="w-4 h-4 md:w-5 md:h-5" />
              Explore Portfolio
            </a>
          </Button>
        </div>

        {/* Scroll indicator with brush */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 text-xs nav-label">
          <span>Explore</span>
          <BrushIcon className="w-4 h-4 text-primary animate-bounce" />
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-12 md:py-20 px-4 md:px-6 relative">
        <Reveal className="container mx-auto">
          <div className="flex items-center gap-3 md:gap-4 mb-3">
            <LipstickIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="nav-label text-primary text-[10px] md:text-[0.785rem]">What We Do</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-6xl font-light mb-6 md:mb-10 max-w-lg">
            Specialties Crafted for<br/><span className="brush-reveal text-shimmer italic">Every Celebration.</span>
          </h2>

          {/* Mobile: vertical stack; Desktop: 5-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group powder-card bg-card/40 hover:bg-card/70 p-6 md:p-8 flex flex-col justify-between gap-6 md:gap-8 border border-border/40 hover:border-primary/50 rounded-md transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <s.Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-light mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 md:mb-6">{s.tagline}</p>
                  <div className="flex items-center gap-2">
                    <BrushIcon className="w-3 h-3 md:w-4 md:h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300" />
                    <span className="nav-label text-primary text-[10px] md:text-xs">Explore</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
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
