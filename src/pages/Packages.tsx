import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Layout";
import packagesData from "@/data/packages.json";
import {
  PerfumeIcon,
  MascaraIcon,
  BlushIcon,
  LipstickIcon,
  SpongeIcon,
  BrushIcon
} from "@/components/StudioEffects";
import { Check, X, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const packageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'bridal-makeover': PerfumeIcon,
  'reception-makeover': BlushIcon,
  'model-photoshoot': MascaraIcon,
  'haldi-mehendi': SpongeIcon,
  'evening-party': LipstickIcon,
  'hair-styling': BrushIcon,
};

export function Packages() {
  const { packages } = packagesData;
  const [activeFlyout, setActiveFlyout] = useState<string | null>(null);

  // Close flyout on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveFlyout(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);



  const renderCard = (
    pkg: typeof packages[0],
    isPopular: boolean,
    flyoutDirection: "left" | "right"
  ) => {
    const IconComponent = packageIcons[pkg.id] || BrushIcon;
    const isFlyoutOpen = activeFlyout === pkg.id;

    // Top 3 features visible on card face
    const visibleFeatures = pkg.features.slice(0, 3);
    const extraFeatures = pkg.features.slice(3);
    const hasMore = extraFeatures.length > 0;

    return (
      <div
        key={pkg.id}
        className={cn(
          "w-full relative transition-all duration-200",
          isFlyoutOpen ? "z-30" : "z-10"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "relative flex flex-col h-auto md:h-[555px] w-full rounded-xl transition-all duration-300 powder-card",
            "border p-5 md:p-7 select-none overflow-visible",
            isFlyoutOpen ? "!z-30" : "z-10",
            isPopular
              ? "bg-[#181410] border-2 border-primary/70 shadow-[0_0_28px_hsl(28_55%_58%/0.22)] ring-1 ring-primary/40 hover:border-primary"
              : "bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/50 shadow-lg"
          )}
        >
          {isPopular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest font-bold rounded-full shadow-[0_4px_14px_hsl(28_55%_58%/0.4)] border border-primary/20 whitespace-nowrap z-20">
              ★ Most Popular Choice
            </div>
          )}

          {/* ── SECTION 1: HEADER & TITLE (Fixed ~100px) ── */}
          <div className="h-[100px] flex items-center border-b border-border/25 pb-2 relative mt-2">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-full border flex items-center justify-center shadow-sm flex-shrink-0",
                  isPopular
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_hsl(28_55%_58%/0.4)]"
                    : "bg-primary/15 text-primary border-primary/30 shadow-[0_0_10px_hsl(28_55%_58%/0.2)]"
                )}
              >
                <IconComponent className="w-6 h-6" />
              </div>
              <h2
                className={cn(
                  "font-display text-2xl md:text-3xl font-light tracking-tight leading-tight line-clamp-2",
                  isPopular ? "text-primary" : "text-foreground"
                )}
                title={pkg.name}
              >
                {pkg.name}
              </h2>
            </div>
          </div>

          {/* ── SECTION 2: PRICING (Fixed ~90px) ── */}
          <div className="h-[90px] flex flex-col justify-center border-b border-border/25 py-2">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl md:text-4xl font-light text-primary tracking-tight">
                {pkg.price}
              </span>
              <span className="text-xs text-muted-foreground font-light">
                {pkg.note}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/75 font-light tracking-wide mt-1">
              Transparent pricing · Taxes & consultation included
            </p>
          </div>

          {/* ── SECTION 3: KEY INCLUSIONS & VIEW DETAILS BUTTON (Fixed ~235px desktop) ── */}
          <div className="flex-1 md:h-[235px] flex flex-col justify-between py-3">
            <div>
              <p className="nav-label text-[10px] text-muted-foreground tracking-wider uppercase mb-2.5">
                Key Inclusions:
              </p>
              <ul className="space-y-2">
                {visibleFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/90 font-light">
                    <span className="w-3.5 h-3.5 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 border border-primary/30">
                      <Check className="w-2 h-2" />
                    </span>
                    <span className="line-clamp-1 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {hasMore ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFlyout(isFlyoutOpen ? null : pkg.id);
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-md border text-xs flex items-center justify-between transition-all group/more",
                    isFlyoutOpen
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_hsl(28_55%_58%/0.4)]"
                      : "bg-primary/10 hover:bg-primary/20 text-primary hover:text-foreground border-primary/30 hover:border-primary/60"
                  )}
                >
                  <span className="font-medium flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                    +{extraFeatures.length} More Inclusions
                  </span>
                  <span className="underline text-[11px] whitespace-nowrap group-hover/more:translate-x-0.5 transition-transform">
                    {isFlyoutOpen ? "Close ✕" : "View Details →"}
                  </span>
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <div className="w-full text-center text-[11px] text-muted-foreground/60 py-2 border border-border/20 rounded-md bg-card/20 font-light">
                  Full coverage included
                </div>
              </div>
            )}
          </div>

          {/* ── SECTION 4: WHATSAPP ACTION BUTTON ── */}
          <div className="pt-3 border-t border-border/25 flex flex-col justify-center">
            <Button
              size="lg"
              className={cn(
                "w-full h-11 px-3 rounded-md font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md overflow-hidden",
                isPopular
                  ? "btn-lipstick"
                  : "bg-primary/15 hover:bg-primary/30 border border-primary/40 text-foreground hover:border-primary"
              )}
              asChild
            >
              <a
                href={`https://wa.me/918838819820?text=${encodeURIComponent(pkg.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap font-medium">Book on WhatsApp</span>
              </a>
            </Button>
          </div>

          {/* ── FLOATING WINDOW FOR REMAINING POINTS (NO BACKDROP, CARD STAYS 100% VISIBLE) ── */}
          {isFlyoutOpen && (
            <div
              className={cn(
                "absolute z-40 w-[320px] p-5 rounded-xl border-2 border-primary/80 bg-[#161310] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_hsl(28_55%_58%/0.25)]",
                "transition-all duration-200 animate-in fade-in zoom-in-95",
                "top-1/2 -translate-y-1/2",
                flyoutDirection === "left"
                  ? "right-[calc(100%+14px)]"
                  : "left-[calc(100%+14px)]",
                "max-sm:static max-sm:w-full max-sm:mt-3 max-sm:translate-y-0"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Desktop Arrow Indicator pointing to parent card */}
              <div
                className={cn(
                  "hidden sm:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#161310] border-t-2 border-l-2 border-primary/80",
                  flyoutDirection === "left"
                    ? "-right-2.5 rotate-[135deg]"
                    : "-left-2.5 -rotate-45"
                )}
              />

              {/* Floating Window Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border/40">
                <div>
                  <span className="nav-label text-[10px] text-primary tracking-widest uppercase">
                    {pkg.name}
                  </span>
                  <h4 className="font-display text-lg font-light text-foreground leading-tight">
                    Additional Inclusions
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveFlyout(null)}
                  className="w-7 h-7 rounded-full border border-border/60 hover:border-primary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors bg-card/60"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Remaining Points List */}
              <div className="py-3">
                <ul className="space-y-2.5">
                  {extraFeatures.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm rounded-md p-2 bg-primary/10 border border-primary/30 text-foreground font-normal"
                    >
                      <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span className="font-light leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-border/30 flex items-center justify-between text-[11px] text-muted-foreground/70">
                <span>+{extraFeatures.length} extra features included</span>
                <button
                  type="button"
                  onClick={() => setActiveFlyout(null)}
                  className="text-primary hover:underline font-medium"
                >
                  Done ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pb-0 relative" onClick={() => setActiveFlyout(null)}>
      <section className="relative pt-8 md:pt-16 pb-4 md:pb-6 px-4 md:px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[400px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.08)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-3 md:mb-4 fade-in">
            <BrushIcon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="nav-label text-primary text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.25em] uppercase">
              Transparent Pricing & Inclusions
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light mb-3 md:mb-4 fade-in">
            Packages
          </h1>
          <p className="text-muted-foreground mb-6 md:mb-10 max-w-2xl fade-in text-sm md:text-base lg:text-lg leading-relaxed font-light">
            Every package is bespoke and tailored to your celebration. Clear tiers with no hidden charges. Explore our signature bridal experience and curated looks below.
          </p>

          <Reveal>
            <div className="mt-8 md:mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
                {packages.map((pkg, idx) => (
                  <div key={pkg.id} className="w-full">
                    {renderCard(pkg, pkg.featured || false, (idx % 3 === 2) ? "left" : "right")}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
