import { Reveal } from "@/components/Layout";
import { BrushIcon, PaletteIcon } from "@/components/StudioEffects";
import { WebGLPortfolioCarousel } from "@/components/WebGLPortfolioCarousel";

export function Portfolio() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[500px]
                        bg-[radial-gradient(ellipse,hsl(38_40%_65%/0.08)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4 fade-in">
            <PaletteIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary">Selected Work</span>
            <BrushIcon className="w-4 h-4 text-primary/60" />
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4 fade-in">
            Portfolio
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed fade-in font-light">
            An interactive cinematic gallery exploring our signature "Quiet Glow" aesthetics.
          </p>
        </div>
      </section>

      {/* Cinematic WebGL Slider */}
      <Reveal>
        <WebGLPortfolioCarousel />
      </Reveal>
    </div>
  );
}
