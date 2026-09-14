import { CardFanCarousel } from "@/components/CardFanCarousel";
import { Reveal } from "@/components/Layout";
import { BrushIcon, PerfumeIcon } from "@/components/StudioEffects";

export function About() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.1)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4 fade-in">
            <BrushIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary">Our Story</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-tight mb-0 fade-in">
            Beauty as<br /><span className="text-metallic italic">Architecture.</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="space-y-6">
              <p className="text-xl text-foreground/90 leading-relaxed font-light">
                At Glow & Glam Studio, we don't think of makeup as decoration—we think of it 
                as precision craftsmanship. Every brush stroke is intentional. Every contour, architectural.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-light">
                Our "Quiet Glow" philosophy is built on restraint. We use less to achieve more — 
                a luminous, skin-first approach that looks breathtaking in daylight and unforgettable on camera.
              </p>
              <div className="h-px bg-border/40 my-8" />
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="font-display text-5xl text-primary font-light">500+</p>
                  <p className="nav-label text-muted-foreground mt-2 text-xs">Happy Brides</p>
                </div>
                <div>
                  <p className="font-display text-5xl text-primary font-light">8</p>
                  <p className="nav-label text-muted-foreground mt-2 text-xs">Years of Excellence</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="aspect-[4/3] md:aspect-[3/4] bg-muted/20 rounded-lg border border-border/40 studio-panel
                            flex items-end p-10 overflow-hidden relative">
              <div className="absolute top-6 right-6">
                <PerfumeIcon className="w-8 h-8 text-primary/30" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(28_55%_58%/0.1)_0%,transparent_60%)]" />
              <div className="relative z-10">
                <p className="font-display text-3xl italic text-foreground/90 mb-3 font-light">
                  "Minimalism IS the luxury signal."
                </p>
                <p className="nav-label text-primary text-xs tracking-widest">— Studio Philosophy</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STUDIO MOMENTS (CARD FAN CAROUSEL) ── */}
      <Reveal>
        <CardFanCarousel
          category="about"
          title="Studio Moments"
          description="Behind the artistry — bespoke pigments, precision brushes, and in-studio craftsmanship."
        />
      </Reveal>
    </div>
  );
}
