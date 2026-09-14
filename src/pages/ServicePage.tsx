import { GallerySection } from "@/components/GallerySection";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Layout";
import { BrushIcon, LipstickIcon } from "@/components/StudioEffects";

interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  category: string;
  whatsapp: string;
  faqs: { q: string; a: string }[];
}

export function ServicePage({ title, tagline, description, category, whatsapp, faqs }: ServicePageProps) {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="relative py-16 md:py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[500px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.1)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4 fade-in">
            <BrushIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary">Service</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light leading-none mb-4 fade-in">
            {title}
          </h1>
          <p className="font-display text-xl md:text-2xl text-primary/80 italic mb-6 fade-in">
            {tagline}
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8 fade-in font-light">
            {description}
          </p>
          <div className="flex flex-wrap gap-5 fade-in">
            <Button size="lg" className="btn-lipstick px-8 py-6 text-base" asChild>
              <a href="/book-now.html" className="flex items-center gap-2">
                <LipstickIcon className="w-5 h-5" />
                Book This Service
              </a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-6 text-base border-border/60 hover:border-primary/50" asChild>
              <a
                href={`https://wa.me/918838819820?text=${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Inquiry
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Reveal>
        <GallerySection category={category} title="Our Work" />
      </Reveal>

      {/* FAQs */}
      {faqs.length > 0 && (
        <Reveal>
          <section className="py-24 px-6">
            <div className="container mx-auto max-w-3xl">
              <div className="flex items-center gap-4 mb-12">
                <BrushIcon className="w-5 h-5 text-primary" />
                <span className="nav-label text-primary">FAQ</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-12">Common Questions</h2>
              <Accordion type="single" collapsible className="w-full space-y-0 divide-y divide-border/40">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-none py-2">
                    <AccordionTrigger className="font-sans text-left text-foreground hover:text-primary text-base md:text-lg py-5 font-normal">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6 font-light">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
