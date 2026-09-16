import { ServicePage } from "./ServicePage";
import contentData from "@/data/content.json";
import { Reveal } from "@/components/Layout";
import {
  BrushIcon,
  PerfumeIcon,
  BlushIcon,
  LipstickIcon,
  SpongeIcon,
  CurlerIcon
} from "@/components/StudioEffects";

const { services } = contentData;

const getService = (id: string) => services.find(s => s.id === id)!;

const serviceIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'bridal-makeover': CurlerIcon,
  'reception-makeover': BlushIcon,
  'model-photoshoot': BrushIcon,
  'haldi-mehendi': SpongeIcon,
  'evening-party': LipstickIcon,
  'hair-styling': PerfumeIcon,
};

export function ServiceBridal() {
  const s = getService('bridal-makeover');
  return <ServicePage {...s} />;
}
export function ServiceReception() {
  const s = getService('reception-makeover');
  return <ServicePage {...s} />;
}
export function ServicePhotoshoot() {
  const s = getService('model-photoshoot');
  return <ServicePage {...s} />;
}
export function ServiceHaldi() {
  const s = getService('haldi-mehendi');
  return <ServicePage {...s} />;
}
export function ServiceParty() {
  const s = getService('evening-party');
  return <ServicePage {...s} />;
}
export function ServiceHairstyling() {
  const s = getService('hair-styling');
  return <ServicePage {...s} />;
}

export function ServicesHub() {
  return (
    <div className="pb-16">
      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[500px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.1)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto fade-in max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <BrushIcon className="w-4 h-4 text-primary" />
            <span className="nav-label text-primary text-xs tracking-[0.25em]">SERVICES</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-12">All Services</h1>
          <div className="divide-y divide-border/30 border-t border-b border-border/30">
            {services.map((s, i) => {
              const IconComp = serviceIcons[s.id] || BrushIcon;

              return (
                <Reveal key={s.id}>
                  <a
                    href={`/services/${s.id}.html`}
                    className="group flex items-center justify-between py-6 md:py-8 px-2 md:px-4 hover:bg-card/30 hover:pl-6 transition-all duration-300 rounded-sm"
                  >
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="nav-label text-muted-foreground/60 text-sm w-6 font-mono">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/60 group-hover:scale-105 transition-all duration-300 shadow-[0_0_10px_hsl(28_55%_58%/0.15)]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-light text-foreground group-hover:text-primary transition-colors">
                        {s.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8">
                      <span className="text-sm md:text-base text-muted-foreground/80 hidden sm:block italic font-light">
                        {s.tagline}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-primary/70 group-hover:text-primary group-hover:border-primary group-hover:bg-primary/10 transition-all">
                        <BrushIcon className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
