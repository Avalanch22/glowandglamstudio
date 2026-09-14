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
  'signature-bridal': PerfumeIcon,
  'bridal-hd': MascaraIcon,
  'reception-engagement': BlushIcon,
  'party-glam': LipstickIcon,
  'bridal-trial': SpongeIcon,
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

  // Section 1: Most Popular (Signature Bridal, 2 cards width) + Regular sized card on its right (Bridal HD, 1 card width)
  const popularPkg = packages.find((p) => p.featured) || packages[0];
  const cardOnRight = packages.find((p) => p.id === 'bridal-hd') || packages[1];

  // Section 2: The 3 remaining cards (Reception/Engagement, Party Glam, Bridal Trial - each 1 card width)
  const remainingPackages = packages.filter(
    (p) => p.id !== popularPkg.id && p.id !== cardOnRight.id
  );

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
            "relative flex flex-col h-[555px] w-full rounded-xl transition-all duration-300 powder-card",
            "border p-6 md:p-7 select-none overflow-visible",
            isFlyoutOpen ? "!z-30" : "z-10",
            isPopular
              ? "bg-[#181410] border-2 border-primary/70 shadow-[0_0_28px_hsl(28_55%_58%/0.22)] ring-1 ring-primary/40 hover:border-primary"
              : "bg-card/50 hover:bg-card/80 border-border/50 hover:border-primary/50 shadow-lg"
          )}
        >
          {/* ── SECTION 1: HEADER & TITLE (Fixed ~120px) ── */}
          <div className="h-[120px] flex flex-col justify-between border-b border-border/25 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border flex items-center justify-center shadow-sm flex-shrink-0",
                    isPopular
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_hsl(28_55%_58%/0.4)]"
                      : "bg-primary/15 text-primary border-primary/30 shadow-[0_0_10px_hsl(28_55%_58%/0.2)]"
                  )}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <span className="nav-label text-[10px] uppercase tracking-[0.2em] text-primary block leading-none">
                    {pkg.tier} Tier
                  </span>
                </div>
              </div>

              {isPopular && (
                <span className="nav-label text-[10px] font-medium text-primary border border-primary/70 px-3 py-1 rounded-full bg-primary/20 shadow-[0_0_10px_hsl(28_55%_58%/0.3)] whitespace-nowrap">
                  ★ Most Popular
                </span>
              )}
            </div>

            <div className="h-[62px] flex items-center">
              <h2
                className={cn(
                  "font-display text-2xl font-light tracking-tight leading-tight line-clamp-2",
                  isPopular ? "text-primary text-2xl md:text-3xl" : "text-foreground"
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

          {/* ── SECTION 3: KEY INCLUSIONS & VIEW DETAILS BUTTON (Fixed ~235px) ── */}
          <div className="h-[235px] flex flex-col justify-between py-3">
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
      <section className="relative pt-12 md:pt-16 pb-4 md:pb-6 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.08)_0%,transparent_70%)]
                        pointer-events-none" />
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-3 mb-4 fade-in">
            <BrushIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary text-xs tracking-[0.25em] uppercase">
              Transparent Pricing & Inclusions
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4 fade-in">
            Packages
          </h1>
          <p className="text-muted-foreground mb-10 max-w-2xl fade-in text-base md:text-lg leading-relaxed font-light">
            Every package is bespoke and tailored to your celebration. Clear tiers with no hidden charges. Explore our signature bridal experience and curated looks below.
          </p>

          <Reveal>
            <div className="space-y-8 md:space-y-10">
              {/* ── SECTION 1: TOP TIER (Most Popular Card = 2 Cards Combined Width + 1 Card on Right) ── */}
              <div>
                <div className="flex items-center gap-3 mb-6 max-w-6xl mx-auto">
                  <span className="nav-label text-[11px] uppercase tracking-[0.25em] text-primary font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Signature Bridal Collections
                  </span>
                  <div className="h-px bg-gradient-to-r from-primary/40 to-transparent flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
                  {/* Left: Most Popular Card (Signature Bridal) - 2 cards combined width! */}
                  <div
                    className="md:col-span-2 w-full relative transition-all duration-200 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="relative flex flex-col md:flex-row h-auto md:h-[555px] w-full rounded-xl transition-all duration-300 powder-card border-2 border-primary/70 bg-[#181410] shadow-[0_0_28px_hsl(28_55%_58%/0.22)] ring-1 ring-primary/40 hover:border-primary p-6 md:p-7 select-none gap-6 md:gap-7 justify-between overflow-hidden">
                      {/* Left Side: Header, Title, Most Popular Cylinder, Pricing, Description, WhatsApp CTA */}
                      <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                        <div>
                          {/* Tier & Icon */}
                          <div className="flex items-center gap-2.5 mb-2.5">
                            <div className="w-10 h-10 rounded-full border border-primary bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_12px_hsl(28_55%_58%/0.4)] flex-shrink-0">
                              <PerfumeIcon className="w-5 h-5" />
                            </div>
                            <span className="nav-label text-[10px] uppercase tracking-[0.2em] text-primary block leading-none">
                              {popularPkg.tier} Tier · Flagship
                            </span>
                          </div>

                          {/* Card Name */}
                          <h2 className="font-display text-3xl md:text-4xl font-light text-primary tracking-tight leading-tight">
                            {popularPkg.name}
                          </h2>

                          {/* Most Popular Cylinder moved directly below the card name */}
                          <div className="mt-2 mb-2.5">
                            <span className="inline-flex items-center nav-label text-[10px] font-medium text-primary border border-primary/70 px-3 py-0.5 rounded-full bg-primary/20 shadow-[0_0_10px_hsl(28_55%_58%/0.3)] whitespace-nowrap">
                              ★ Most Popular Choice
                            </span>
                          </div>

                          {/* Pricing */}
                          <div className="flex items-baseline gap-2.5 mb-1">
                            <span className="font-display text-3xl md:text-4xl font-light text-foreground tracking-tight">
                              {popularPkg.price}
                            </span>
                            <span className="text-xs text-muted-foreground font-light">
                              {popularPkg.note} · All Inclusive
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground/75 font-light tracking-wide mb-2.5">
                            Transparent pricing · Taxes & consultation included
                          </p>

                          {/* Shortened concise description */}
                          <p className="text-muted-foreground text-xs leading-relaxed font-light line-clamp-2">
                            Couture HD airbrush bridal makeup for a luminous, transfer-proof radiance engineered to last all day and night.
                          </p>
                        </div>

                        {/* Shortened button */}
                        <div className="pt-2.5 border-t border-border/25">
                          <Button
                            size="lg"
                            className="w-full h-11 px-4 rounded-md font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md overflow-hidden btn-lipstick"
                            asChild
                          >
                            <a
                              href={`https://wa.me/918838819820?text=${encodeURIComponent(popularPkg.whatsapp)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center gap-1.5"
                            >
                              <MessageCircle className="w-4 h-4 flex-shrink-0" />
                              <span className="whitespace-nowrap font-medium">Book on WhatsApp</span>
                            </a>
                          </Button>
                        </div>
                      </div>

                      {/* Right Side: Complete Features Checklist Panel (Cleanly contained) */}
                      <div className="w-full md:w-[270px] lg:w-[290px] bg-background/50 border border-primary/30 rounded-xl p-4 md:p-5 shadow-inner flex flex-col justify-between flex-shrink-0 overflow-hidden">
                        <div>
                          <p className="nav-label text-[11px] text-primary tracking-wider uppercase mb-2.5 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                            Complete Inclusions ({popularPkg.features.length}):
                          </p>
                          <ul className="space-y-2">
                            {popularPkg.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-xs text-foreground/90 font-light">
                                <span className="w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                  <Check className="w-2.5 h-2.5" />
                                </span>
                                <span className="leading-snug">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-3 pt-2.5 border-t border-border/30 text-[10px] text-primary/80 font-light flex items-center gap-1.5">
                          <span>✓ Complimentary trial consultation</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Regular sized card on its right (Bridal HD) - 1 card width! */}
                  <div className="md:col-span-1 w-full">
                    {renderCard(cardOnRight, false, "left")}
                  </div>
                </div>
              </div>

              {/* ── SECTION 2: THE 3 REMAINING REGULAR SIZED CARDS ── */}
              <div>
                <div className="flex items-center gap-3 mb-6 max-w-6xl mx-auto">
                  <span className="nav-label text-[11px] uppercase tracking-[0.25em] text-primary font-medium flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Occasion & Trial Services
                  </span>
                  <div className="h-px bg-gradient-to-r from-primary/40 to-transparent flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
                  {/* Card 1: Reception / Engagement (flyout to the right) */}
                  <div className="md:col-span-1 w-full">
                    {renderCard(remainingPackages[0], false, "right")}
                  </div>

                  {/* Card 2: Party Glam (flyout to the right) */}
                  <div className="md:col-span-1 w-full">
                    {renderCard(remainingPackages[1], false, "right")}
                  </div>

                  {/* Card 3: Bridal Trial (flyout to the left) */}
                  <div className="md:col-span-1 w-full">
                    {renderCard(remainingPackages[2], false, "left")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
