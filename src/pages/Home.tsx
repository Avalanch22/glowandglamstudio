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
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center overflow-hidden px-6">
        {/* Grand Vanity mirror circle — encircling the entire hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] md:w-[1150px] md:h-[1150px] lg:w-[1320px] lg:h-[1320px] pointer-events-none">
          <VanityRing count={30} />
          {/* Soft key-light glow inside the grand mirror */}
          <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.16)_0%,hsl(38_40%_65%/0.06)_45%,transparent_70%)]" />
        </div>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8 fade-in relative z-10">
          <BrushIcon className="w-5 h-5 text-primary -rotate-45" />
          <span className="nav-label text-primary tracking-[0.2em] text-xs">Glow & Glam Studio — Chennai</span>
          <BrushIcon className="w-5 h-5 text-primary rotate-45" />
        </div>

        {/* Hero heading */}
        <h1 className="relative z-10 font-display font-light text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight fade-in max-w-5xl mb-8">
          The Art of a<br />
          <span className="text-shimmer italic">Quiet Glow.</span>
        </h1>

        <p className="relative z-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 fade-in leading-relaxed font-light">
          Futuristic precision meets timeless beauty. Bespoke makeup and styling for brides, 
          celebrations, and every moment meant to be unforgettable.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 fade-in">
          <Button size="lg" className="btn-lipstick text-base px-8 py-6" asChild>
            <a href="/book-now.html" className="flex items-center gap-2">
              <LipstickIcon className="w-5 h-5" />
              Reserve Your Date
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 border-border/60 hover:border-primary/60" asChild>
            <a href="/portfolio.html" className="flex items-center gap-2">
              <PaletteIcon className="w-5 h-5" />
              Explore Portfolio
            </a>
          </Button>
        </div>

        {/* Scroll indicator with brush */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 text-xs nav-label">
          <span>Explore</span>
          <BrushIcon className="w-4 h-4 text-primary animate-bounce" />
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="py-16 md:py-20 px-6 relative">
        <Reveal className="container mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <LipstickIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary">What We Do</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-10 max-w-lg">
            Specialties Crafted for<br/><span className="brush-reveal text-shimmer italic">Every Celebration.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="group powder-card bg-card/40 hover:bg-card/70 p-8 flex flex-col justify-between gap-8 border border-border/40 hover:border-primary/50 rounded-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <s.Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.tagline}</p>
                  <div className="flex items-center gap-2">
                    <BrushIcon className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 duration-300" />
                    <span className="nav-label text-primary text-xs">Explore</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── STUDIO INTRO PANEL ── */}
      <Reveal>
        <section className="py-12 md:py-16 px-6">
          <div className="container mx-auto">
            <div className="studio-panel rounded-lg p-8 md:p-16 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="nav-label text-primary mb-4 flex items-center gap-2">
                  <BrushIcon className="w-4 h-4" />
                  Our Craft
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-6">
                  Step into the <span className="text-shimmer italic">Studio.</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg font-light">
                  When you arrive, you enter a world of calm precision. Warmly lit. Fragranced with 
                  possibility. Every brush, every product, every technique — chosen intentionally 
                  to enhance what's already there, never to mask it.
                </p>
                <Button size="lg" className="btn-lipstick px-6 py-5 text-base" asChild>
                  <a href="/about.html" className="flex items-center gap-2">
                    <LipstickIcon className="w-5 h-5" />
                    About the Studio
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: '500+', label: 'Happy Brides', Icon: CurlerIcon },
                  { num: '8 Yrs', label: 'In the Industry', Icon: BrushIcon },
                  { num: '100%', label: 'Cruelty-Free', Icon: BlushIcon },
                  { num: '5★', label: 'Average Rating', Icon: PerfumeIcon },
                ].map((s) => (
                  <div key={s.label} className="border border-border/40 bg-background/30 p-6 rounded-md hover:border-primary/50 transition-colors">
                    <s.Icon className="w-6 h-6 text-primary mb-4" />
                    <p className="font-display text-3xl md:text-4xl text-shimmer mb-1">{s.num}</p>
                    <p className="nav-label text-muted-foreground text-xs">{s.label}</p>
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
      <section className="py-16 md:py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,hsl(28_55%_58%/0.1)_0%,transparent_70%)] pointer-events-none" />
        <Reveal className="relative container mx-auto">
          <BrushIcon className="w-8 h-8 text-primary mx-auto mb-4 -rotate-12" />
          <h2 className="font-display text-4xl md:text-6xl font-light mb-4">
            Your moment, <br/><span className="text-shimmer italic">flawlessly rendered.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed max-w-lg mx-auto font-light">
            Weekend slots fill weeks in advance. Reserve your bridal or celebration date today.
          </p>
          <Button size="lg" className="btn-lipstick text-base px-8 py-6" asChild>
            <a href="/book-now.html" className="flex items-center gap-2">
              <LipstickIcon className="w-5 h-5" />
              Book a Consultation
            </a>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
