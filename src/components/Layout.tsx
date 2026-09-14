import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoImg from '@/assets/images/logo.jpg';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Spotlight, DustParticles } from './StudioEffects';
import '../studio.css';

// Scroll-reveal wrapper for sections using Framer Motion with ultra-relaxed luxury easing
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1], // silky, relaxed luxury deceleration curve
      }}
      className={cn("w-full will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

export default function Layout({
  children,
  currentPath = window.location.pathname,
}: {
  children: React.ReactNode;
  currentPath?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isCurrent = (href: string) => {
    const current = (currentPath || '').toLowerCase();
    if (href === '/index.html' || href === '/') {
      return current === '/' || current.endsWith('/index.html') || current === '';
    }
    const name = href.replace('.html', '').replace('/', '');
    return current.includes(name);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Spotlight />
      <DustParticles />
      {/* ── HEADER ── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled
            ? 'glass border-b border-border/30 shadow-[0_8px_32px_hsl(20_8%_0%/0.4)]'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-6 h-22 md:h-26 flex items-center justify-between">
          {/* Logo */}
          <a href="/index.html" className="flex items-center gap-4 group">
            <div className="relative">
              <img
                src={logoImg}
                alt="Glow & Glam Studio"
                className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-primary/60 group-hover:border-primary transition-all duration-300 shadow-[0_0_20px_hsl(28_55%_58%/0.35)] group-hover:scale-105"
              />
              <div className="absolute -inset-1.5 rounded-full border border-primary/25 pointer-events-none group-hover:border-primary/50 transition-colors" />
            </div>
            <div>
              <span className="font-display text-2xl md:text-3xl tracking-wide text-foreground font-light block leading-none">
                Glow & Glam
              </span>
              <span className="nav-label text-[10px] text-primary tracking-[0.25em] block mt-1">
                Luxury Studio — Chennai
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', href: '/index.html' },
              { label: 'About', href: '/about.html' },
              { label: 'Portfolio', href: '/portfolio.html' },
              { label: 'Packages', href: '/packages.html' },
              { label: 'Reviews', href: '/reviews.html' },
            ].map((link) => {
              const active = isCurrent(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-label link-underline transition-all duration-200",
                    active
                      ? "text-primary font-medium border-b border-primary/60 pb-0.5"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild size="lg" className="btn-lipstick px-6 py-5 text-sm">
              <a href="/book-now.html">Book Now</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={cn('block w-5 h-px bg-foreground transition-all', mobileOpen && 'rotate-45 translate-y-2')}></span>
            <span className={cn('block w-5 h-px bg-foreground transition-all', mobileOpen && 'opacity-0')}></span>
            <span className={cn('block w-5 h-px bg-foreground transition-all', mobileOpen && '-rotate-45 -translate-y-2')}></span>
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-border/30 px-6 py-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-3 duration-200">
            {[
              { label: 'Home', href: '/index.html' },
              { label: 'About', href: '/about.html' },
              { label: 'Portfolio', href: '/portfolio.html' },
              { label: 'Packages', href: '/packages.html' },
              { label: 'Reviews', href: '/reviews.html' },
              { label: 'Contact', href: '/contact.html' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "nav-label transition-colors text-sm",
                  isCurrent(link.href) ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
            <Button asChild size="sm" className="self-start mt-2" onClick={() => setMobileOpen(false)}>
              <a href="/book-now.html">Book Now</a>
            </Button>
          </div>
        )}
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative mt-6 md:mt-8 border-t border-border/30 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px]
                        bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-6 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 relative">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="Glow & Glam Studio" className="h-8 w-8 rounded-full object-cover border border-primary/30" />
              <span className="font-display text-base">Glow & Glam</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Futuristic beauty. Minimal luxury. Signature glow.
            </p>
          </div>
          {[
            {
              title: 'Explore', links: [
                { label: 'Packages', href: '/packages.html' },
                { label: 'Portfolio', href: '/portfolio.html' },
                { label: 'Reviews', href: '/reviews.html' },
              ]
            },
            {
              title: 'Connect', links: [
                { label: 'About', href: '/about.html' },
                { label: 'Reviews', href: '/reviews.html' },
                { label: 'Contact', href: '/contact.html' },
              ]
            },
            {
              title: 'Studio', links: [
                { label: 'New York City, NY', href: '#' },
                { label: 'hello@glowandglam.com', href: 'mailto:hello@glowandglam.com' },
                { label: '+1 555 123 4567', href: 'tel:+15551234567' },
              ]
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="nav-label text-foreground mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-xs text-muted-foreground hover:text-primary transition-colors link-underline">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-6 pb-8 flex items-center justify-between border-t border-border/20 pt-8">
          <p className="text-xs text-muted-foreground">© 2026 Glow & Glam Studio. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Crafted with precision.</p>
        </div>
      </footer>

      {/* ── WhatsApp Float ── */}
      <a
        href="https://wa.me/918838819820?text=Hi%20Glow%20%26%20Glam%20Studio!%20I'd%20like%20to%20inquire%20about%20a%20booking."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-13 h-13 w-12 h-12 bg-[#25D366] rounded-full
                   flex items-center justify-center z-50
                   shadow-[0_0_20px_hsl(142_71%_45%/0.4)]
                   hover:shadow-[0_0_35px_hsl(142_71%_45%/0.7)]
                   hover:scale-110 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.102.824z"/>
        </svg>
      </a>
    </div>
  );
}
