You are building the website for GLOW & GLAM STUDIO, a professional makeup and
hairstyling studio based in [CITY_AREA]. This is a static site, hosted on
GitHub Pages, workspace = this repo (XaviourZone/glowandglamstudio).

BUSINESS GOAL
The single most important metric is BOOKINGS. Every page exists to move a
visitor toward tapping "Book Now" or the WhatsApp button. This is not a
portfolio-for-portfolio's-sake site — it's a conversion-focused site that
happens to look beautiful. Copy should be confident, sensory, and benefit-led
(how the client will look/feel), never generic ("we offer quality services").
Build light urgency where honest (seasonal/wedding-date booking windows,
limited weekend slots) — never fake scarcity or fake countdowns.

DESIGN DIRECTION — theme name: "Quiet Glow"
An editorial-beauty-magazine take on minimalism: warm, spacious, confident,
restrained. NOT a typical "glam" site — no glitter, no purple/pink gradients,
no heavy drop shadows, no stock icon soup. Minimalism IS the luxury signal.

Palette (use as CSS custom properties):
  --canvas:   #FAF6F0   (warm ivory background)
  --ink:      #24201C   (espresso charcoal text)
  --accent:   #B5714A   (warm terracotta — CTAs, links, active states)
  --accent-soft: #D8B98C (champagne gold — hairline rules, small accents)
  --surface:  #F3EAE1   (blush sand — alternating section backgrounds)
  WhatsApp green is used ONLY on the WhatsApp icon itself, nowhere else.

Typography:
  Display/headings: "Fraunces" (Google Fonts, variable, use italic axis for
  emphasis words) — large, confident, generous line-height.
  Body/UI: "Inter" — clean, small-caps-free, comfortable reading size (17-18px
  base).
  Nav/eyebrow labels: Inter, uppercase, small, letter-spacing 0.15em.

Signature motifs (what makes this "unique," not generic-minimalist):
  - A single soft, blurred radial glow (accent color at ~10% opacity) placed
    behind hero headlines and major CTA sections — a literal nod to "Glow."
  - Thin 1px hairline dividers instead of boxed cards or shadows.
  - No rounded "app-style" cards; layouts are asymmetric/editorial, not
    everything centered in equal-width boxes.
  - Underline-draws-in-on-hover for text links; buttons are pill or
    thin-bordered-rectangle that fills solid on hover.
  - A very subtle grain/texture overlay (low-opacity) for warmth, not flat
    digital flatness.
  - Generous whitespace: 96–140px vertical section padding on desktop,
    56–72px on mobile.

TECH STACK
  Plain, dependency-light static site: semantic HTML5, one shared CSS file
  using custom properties, minimal vanilla JS (no framework needed — this is
  a marketing site, not an app). Fonts via Google Fonts CDN. No backend.
  Mobile-first, responsive, accessible (semantic tags, alt text, visible
  focus states, AA contrast).

SITE MAP
  / (Home)
  /about.html
  /services/index.html (hub)
    /services/bridal-makeup.html
    /services/reception-makeup.html
    /services/party-makeup.html
    /services/engagement-makeup.html
    /services/hairstyling.html
  /portfolio.html
  /packages.html
  /reviews.html
  /book-now.html
  /contact.html
  Shared: sticky header nav with "Services" as hover/tap dropdown to the 5
  sub-pages; "BOOK NOW" styled as a distinct filled pill button in the nav,
  visually separate from the plain text links. A floating WhatsApp button
  (bottom-right, every page) that links to:
  https://wa.me/[WHATSAPP_NUMBER]?text=<url-encoded prefilled message>

ASSETS
  We don't have final photography yet. Build every image slot as a tasteful
  CSS placeholder (soft gradient in --surface/--accent-soft tones, centered
  small caption like "bridal-01.jpg · 1200×1500") at the CORRECT final aspect
  ratio, not a random stock photo. Generate an ASSET_CHECKLIST.md listing
  every expected filename, folder path, and dimensions so real photos can be
  dropped straight in later with zero code changes. Keep total page weight
  light — this matters more once real photos land, so build the img tags with
  loading="lazy", explicit width/height, and note where WebP + srcset should
  go.
