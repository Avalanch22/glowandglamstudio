import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Layout";
import { BrushIcon, PerfumeIcon } from "@/components/StudioEffects";
import {
  User,
  Phone,
  Calendar,
  CalendarDays,
  MapPin,
  Mail,
  Sparkles,
  Check,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ARTISTRY_SERVICES = [
  {
    id: "Signature Bridal Makeup",
    label: "Signature Bridal Makeup",
    price: "₹15,000",
    tag: "Most Popular",
    desc: "Cry-proof airbrush/HD base, bespoke eye artistry, luxury mink lashes, couture hair & designer saree drape.",
  },
  {
    id: "Bridal HD Makeup",
    label: "Bridal HD Makeup",
    price: "₹12,000",
    tag: "Classic Elegance",
    desc: "High-definition camera-ready bridal radiance with luxury mink lashes, timeless hair sculpting & precision draping.",
  },
  {
    id: "Reception / Evening Glam",
    label: "Reception / Evening Glam",
    price: "₹9,000",
    tag: "Evening Couture",
    desc: "Sculpted couture glam with luminous skin, statement eye design & glamorous evening red-carpet hair styling.",
  },
  {
    id: "Party Glam Makeup",
    label: "Party Glam Makeup",
    price: "₹5,000",
    tag: "Celebration",
    desc: "Fresh radiant glam for bridesmaids & family entourage with camera-friendly HD finish & soft styling.",
  },
  {
    id: "Bridal Trial Session",
    label: "Bridal Trial Session",
    price: "₹3,500",
    tag: "Studio Dry-Run",
    desc: "In-studio 1-on-1 personalized color consultation, skin prep analysis, dry-run look & drape trial.",
  },
  {
    id: "Hairstyling & Saree Draping",
    label: "Hairstyling & Saree Draping",
    price: "Bespoke",
    tag: "Artisanal Styling",
    desc: "Traditional South Indian braid styling, modern updos, luxury floral pinning & ironed pleat pinning.",
  },
];

// Helper to parse YYYY-MM-DD safely without timezone shifts
function parseYMD(str: string): Date | null {
  if (!str) return null;
  const parts = str.split("-");
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month, day);
}

function formatYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(ymdStr: string): string {
  const date = parseYMD(ymdStr);
  if (!date) return "";
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ── Luxury Theme Date Picker Component ──
interface ThemeDatePickerProps {
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

function ThemeDatePicker({ value, onChange, required }: ThemeDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseYMD(value) || new Date());
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // First day of month (0 = Sun, 1 = Mon...)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  // Can we navigate back? Prevent navigating to past months
  const canGoPrev = () => {
    const prevMonthFirst = new Date(currentYear, currentMonth - 1, 1);
    const thisMonthFirst = new Date(today.getFullYear(), today.getMonth(), 1);
    return prevMonthFirst >= thisMonthFirst;
  };

  const handlePrevMonth = () => {
    if (canGoPrev()) {
      setViewDate(new Date(currentYear, currentMonth - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    onChange(formatYMD(selected));
    setIsOpen(false);
  };

  const selectedDateObj = parseYMD(value);

  return (
    <div className="relative" ref={pickerRef}>
      {/* Hidden input to maintain native required form validation */}
      <input
        type="text"
        value={value}
        onChange={() => {}}
        required={required}
        tabIndex={-1}
        className="sr-only"
        aria-hidden="true"
      />

      {/* Luxury Styled Input Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-11 px-3.5 rounded-lg border bg-[#100D0B] text-foreground text-xs md:text-sm flex items-center justify-between transition-all outline-none text-left relative z-10",
          isOpen
            ? "border-primary ring-1 ring-primary/40 bg-[#16120F]"
            : "border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/40"
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          {value ? (
            <span className="text-foreground font-medium tracking-wide">
              {formatDateDisplay(value)}
            </span>
          ) : (
            <span className="text-muted-foreground/45 font-light">
              Select celebration date...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {value && (
            <span className="text-[10px] bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-medium hidden sm:inline-block">
              Confirmed
            </span>
          )}
          <CalendarDays className="w-3.5 h-3.5 text-primary/70" />
        </div>
      </button>

      {/* Smooth Ambient Dimmed Backdrop & Popover Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="calendar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Bespoke Themed Calendar Popover - 100% Solid Obsidian Surface, Zero Glare, High Contrast */}
            <motion.div
              key="calendar-popover"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-full mt-2 z-50 w-[310px] sm:w-[340px] rounded-2xl border-2 border-primary/50 bg-[#120F0D] p-4 shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black isolate"
            >
              {/* Calendar Header: Month + Year & Nav Arrows */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  disabled={!canGoPrev()}
                  aria-label="Previous Month"
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center border transition-all",
                    canGoPrev()
                      ? "border-white/15 text-primary bg-[#1C1612] hover:bg-[#281F19] hover:border-primary/60"
                      : "border-white/5 text-zinc-600 cursor-not-allowed bg-transparent"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <span className="font-display text-base text-white font-medium tracking-wide">
                    {monthNames[currentMonth]}
                  </span>
                  <span className="font-display text-base text-primary font-semibold ml-1.5">
                    {currentYear}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  aria-label="Next Month"
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/15 text-primary bg-[#1C1612] hover:bg-[#281F19] hover:border-primary/60 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Weekday Names Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((wd, i) => (
                  <span
                    key={wd}
                    className={cn(
                      "text-[10px] uppercase tracking-wider font-bold py-1",
                      i === 0 || i === 6 ? "text-primary" : "text-zinc-400"
                    )}
                  >
                    {wd}
                  </span>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Previous month blank/muted padding */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => {
                  const prevDayNum = daysInPrevMonth - firstDayOfMonth + 1 + i;
                  return (
                    <div
                      key={`prev-${i}`}
                      className="w-full aspect-square flex items-center justify-center text-[11px] text-zinc-600/40 select-none"
                    >
                      {prevDayNum}
                    </div>
                  );
                })}

                {/* Current month days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const cellDate = new Date(currentYear, currentMonth, day);
                  cellDate.setHours(0, 0, 0, 0);

                  const isPast = cellDate < today;
                  const isCellSelected =
                    selectedDateObj &&
                    selectedDateObj.getFullYear() === currentYear &&
                    selectedDateObj.getMonth() === currentMonth &&
                    selectedDateObj.getDate() === day;

                  const isCellToday = cellDate.getTime() === today.getTime();

                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      disabled={isPast}
                      onClick={() => handleSelectDay(day)}
                      className={cn(
                        "w-full aspect-square text-xs rounded-lg flex items-center justify-center transition-all relative font-medium",
                        isPast && "text-zinc-600/40 cursor-not-allowed",
                        !isPast && !isCellSelected && "text-zinc-100 hover:bg-primary/25 hover:text-white hover:border hover:border-primary/50",
                        isCellToday && !isCellSelected && "border border-primary/70 text-primary font-bold",
                        isCellSelected && "bg-primary text-primary-foreground font-bold shadow-md ring-1 ring-white/40"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Quick Select Presets Footer */}
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const oneMonth = new Date(today);
                      oneMonth.setMonth(oneMonth.getMonth() + 1);
                      onChange(formatYMD(oneMonth));
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-md bg-[#1C1612] border border-white/15 text-zinc-300 hover:text-white hover:border-primary/60 transition-colors font-medium"
                  >
                    +1 Month
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const threeMonths = new Date(today);
                      threeMonths.setMonth(threeMonths.getMonth() + 3);
                      onChange(formatYMD(threeMonths));
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 rounded-md bg-[#1C1612] border border-white/15 text-zinc-300 hover:text-white hover:border-primary/60 transition-colors font-medium"
                  >
                    +3 Months
                  </button>
                </div>

                {value && (
                  <button
                    type="button"
                    onClick={() => {
                      onChange("");
                      setIsOpen(false);
                    }}
                    className="text-zinc-400 hover:text-rose-400 transition-colors flex items-center gap-1 font-medium"
                  >
                    <X className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Luxury Themed Artistry Service Dropdown ──
interface ArtistryServiceDropdownProps {
  value: string;
  onChange: (serviceId: string) => void;
}

function ArtistryServiceDropdown({ value, onChange }: ArtistryServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const selectedService =
    ARTISTRY_SERVICES.find((s) => s.id === value) || ARTISTRY_SERVICES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-12 px-4 rounded-xl border bg-[#100D0B] text-foreground text-xs md:text-sm flex items-center justify-between transition-all outline-none text-left relative z-10",
          isOpen
            ? "border-primary ring-1 ring-primary/40 bg-[#16120F]"
            : "border-border/60 hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary/40"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="font-medium text-foreground truncate">
            {selectedService.label}
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/15 text-primary border border-primary/30 font-medium flex-shrink-0">
            {selectedService.price}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-primary transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Smooth Ambient Dimmed Backdrop & Dropdown Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="dropdown-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown Menu Options - 100% Solid Obsidian Surface, Zero Glare, High Contrast */}
            <motion.div
              key="dropdown-menu"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border-2 border-primary/50 bg-[#120F0D] shadow-[0_30px_70px_rgba(0,0,0,0.98),0_0_0_1px_rgba(255,255,255,0.08)] ring-1 ring-black overflow-hidden p-2 space-y-1.5 max-h-[340px] overflow-y-auto isolate"
            >
              {ARTISTRY_SERVICES.map((svc) => {
                const isSelected = svc.id === value;
                return (
                  <button
                    key={svc.id}
                    type="button"
                    onClick={() => {
                      onChange(svc.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full p-3 rounded-lg text-left transition-all duration-150 flex items-start justify-between gap-3 group border",
                      isSelected
                        ? "bg-[#261B13] border-primary/70 text-white shadow-sm"
                        : "bg-[#181310] border-white/5 hover:bg-[#221914] hover:border-primary/40 text-zinc-300 hover:text-white"
                    )}
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-xs font-semibold truncate", isSelected ? "text-primary" : "text-white group-hover:text-primary")}>
                          {svc.label}
                        </span>
                        <span className="nav-label text-[9px] uppercase tracking-wider text-primary bg-primary/15 border border-primary/30 px-2 py-0.5 rounded font-medium">
                          {svc.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-normal leading-relaxed line-clamp-2">
                        {svc.desc}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0 flex flex-col items-end justify-center pl-2">
                      <span className="text-xs text-primary font-bold tracking-wide bg-[#130F0C] px-2 py-0.5 rounded border border-primary/30">
                        {svc.price}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-primary flex items-center gap-1 mt-1 font-semibold">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BookNow() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Signature Bridal Makeup",
    date: "",
    guests: "Bride Only",
    location: "",
    notes: "",
  });
  const [redirecting, setRedirecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRedirecting(true);

    const formattedDateString = form.date
      ? `${formatDateDisplay(form.date)} (${form.date})`
      : "To be discussed";

    const text =
      `✨ *GLOW & GLAM STUDIO - BOOKING REQUEST* ✨\n\n` +
      `👤 *Client Name:* ${form.name}\n` +
      `📱 *WhatsApp / Phone:* +91 ${form.phone.replace(/^\+?91/, "").trim()}\n` +
      `✉️ *Email:* ${form.email || "Not provided"}\n` +
      `💄 *Requested Service:* ${form.service}\n` +
      `📅 *Event Date:* ${formattedDateString}\n` +
      `📍 *Location / Venue:* ${form.location || "Chennai"}\n` +
      `👥 *Bridal Party Size:* ${form.guests}\n` +
      `📝 *Notes & Vision:* ${form.notes || "None"}\n\n` +
      `_Sent directly via glowandglamstudio.in booking concierge_`;

    const waUrl = `https://wa.me/918838819820?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="pb-12">
      {/* Hero Header */}
      <section className="relative pt-12 md:pt-16 pb-8 md:pb-10 px-6 overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[500px]
                     bg-[radial-gradient(ellipse,hsl(28_55%_58%/0.12)_0%,transparent_70%)]
                     pointer-events-none"
        />
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4 fade-in">
            <BrushIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary text-xs uppercase tracking-[0.25em]">
              Atelier Appointment Concierge
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4 fade-in">
            Book a Session
          </h1>
          <p className="text-muted-foreground max-w-xl text-base md:text-lg leading-relaxed fade-in font-light">
            Reserve your celebration date with Chennai's premier couture beauty studio. Your details will be formatted directly into WhatsApp for immediate calendar confirmation.
          </p>
        </div>
      </section>

      {/* Form & Steps (Height-Aligned Grid) */}
      <section className="px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column (5 cols) - Fully height-aligned with right form */}
          <Reveal className="lg:col-span-5 h-full">
            <div className="flex flex-col justify-between h-full gap-5">
              {/* Panel 1: Reservation Journey (Stretches to maintain height alignment) */}
              <div className="powder-card rounded-2xl border border-border/50 bg-[#161310]/85 p-6 sm:p-8 md:p-9 shadow-lg flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-sm">
                        <PerfumeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl md:text-2xl font-light text-foreground">
                          Reservation Journey
                        </h2>
                        <p className="text-[11px] text-muted-foreground font-light">
                          What to expect once you submit
                        </p>
                      </div>
                    </div>
                    <span className="nav-label text-[10px] text-primary border border-primary/30 bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                      4 Steps
                    </span>
                  </div>

                  {/* Vertical Timeline with hairline connector */}
                  <div className="relative pl-2 space-y-6 md:space-y-7">
                    <div className="absolute left-[21px] top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent pointer-events-none" />

                    {[
                      {
                        step: "01",
                        title: "Submit Reservation Details",
                        desc: "Select your service tier, celebration date, and bridal party count using our concierge form.",
                      },
                      {
                        step: "02",
                        title: "WhatsApp Direct Chat",
                        desc: "Connect with our lead artist instantly to verify calendar availability and locked-in bespoke pricing.",
                      },
                      {
                        step: "03",
                        title: "Complimentary Look Trial",
                        desc: "Full dry-run session 4–6 weeks prior for color matching, jewelry placement & veil positioning.",
                      },
                      {
                        step: "04",
                        title: "Flawless On-Location Artistry",
                        desc: "Punctual arrival with sanitized luxury kit, Dior/MAC cosmetics, and high-end airbrush setup.",
                      },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4 items-start relative z-10">
                        <span className="w-7 h-7 rounded-full bg-[#1A1410] border border-primary/40 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_hsl(28_55%_58%/0.15)] ring-2 ring-[#161310]">
                          {s.step}
                        </span>
                        <div>
                          <p className="font-display text-sm md:text-base text-foreground font-light mb-0.5">
                            {s.title}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed font-light">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 pt-4 border-t border-border/30 text-xs text-primary/90 font-light flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>Dedicated concierge assistance from first inquiry to your wedding day</span>
                </div>
              </div>

              {/* Direct WhatsApp Hotline (Pinned to Bottom of Left Column) */}
              <div className="powder-card rounded-2xl border border-border/50 bg-[#161310]/95 p-5 md:p-6 shadow-lg flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="nav-label text-[10px] text-emerald-400 uppercase tracking-widest">
                      Concierge Online
                    </span>
                  </div>
                  <a
                    href="https://wa.me/918838819820?text=Hi%20Glow%20%26%20Glam!%20I'd%20like%20to%20inquire%20about%20a%20booking%20directly."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl md:text-2xl text-foreground hover:text-primary transition-colors flex items-center gap-1.5 tracking-tight"
                  >
                    +91 88388 19820 →
                  </a>
                  <p className="text-[11px] text-muted-foreground font-light mt-0.5">
                    Average reply time: under 15 minutes.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] flex-shrink-0 shadow-[0_0_15px_hsl(142_71%_45%/0.25)]">
                  <MessageCircle className="w-6 h-6" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Form Column (7 cols) - Luxury Redesigned Atelier Form */}
          <Reveal className="lg:col-span-7 h-full">
            <form
              className="powder-card rounded-2xl border-2 border-primary/40 bg-[#161310]/95 backdrop-blur-xl p-6 sm:p-8 md:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_hsl(28_55%_58%/0.12)] ring-1 ring-primary/25 space-y-5 h-full flex flex-col justify-between"
              onSubmit={handleSubmit}
            >
              {/* Form Header */}
              <div className="border-b border-border/30 pb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="nav-label text-[10px] text-primary tracking-[0.25em] uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    Atelier Booking · 2026 Calendar
                  </span>
                  <span className="text-[10px] text-primary/80 border border-primary/40 px-2.5 py-0.5 rounded-full bg-primary/10">
                    Instant WhatsApp Dispatch
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground">
                  Consultation & Date Reservation
                </h3>
                <p className="text-xs text-muted-foreground font-light mt-1">
                  Fill in your celebration specifications below. They will be formatted and pre-loaded into your WhatsApp chat with our lead artist.
                </p>
              </div>

              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3 h-3 text-primary" /> Full Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    required
                    className="w-full h-11 px-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-primary" /> WhatsApp Number *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-primary font-medium tracking-wide">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="88388 19820"
                      required
                      className="w-full h-11 pl-12 pr-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Event Date (Custom Theme DatePicker) & Venue Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-primary" /> Event Date *
                  </label>
                  <ThemeDatePicker
                    value={form.date}
                    onChange={(dateVal) => setForm({ ...form, date: dateVal })}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary" /> Event Venue / City *
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Chennai / Destination"
                    required
                    className="w-full h-11 px-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Artistry Service Dropdown */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-primary" /> Select Artistry Service *
                  </label>
                  <span className="text-[10px] text-primary/70 lowercase font-light">
                    click to select tier
                  </span>
                </div>
                <ArtistryServiceDropdown
                  value={form.service}
                  onChange={(serviceId) => setForm({ ...form, service: serviceId })}
                />
              </div>

              {/* Row 4: Bridal Party Size Chips */}
              <div className="space-y-1.5">
                <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3 h-3 text-primary" /> Bridal Party Count
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "Bride Only", label: "Bride Only" },
                    { id: "Bride + 2-3 Family Members", label: "Bride + 2–3" },
                    { id: "Bride + 4+ Entourage", label: "Party (4+)" },
                  ].map((g) => {
                    const isSelected = form.guests === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setForm({ ...form, guests: g.id })}
                        className={cn(
                          "h-11 px-2.5 sm:px-3 rounded-lg border text-xs transition-all duration-150 flex items-center justify-center text-center font-medium select-none tracking-wide",
                          isSelected
                            ? "bg-primary/20 border-primary text-primary font-semibold shadow-[0_0_10px_hsl(28_55%_58%/0.2)] ring-1 ring-primary/50"
                            : "bg-[#100D0B] border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-[#16120F]"
                        )}
                      >
                        <span className="truncate leading-none">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Notes & Look Preferences */}
              <div className="space-y-1.5">
                <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary" /> Vision & Outfit Notes (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Mention your wedding lehenga/saree colors, ritual timing, skin notes, or look references..."
                  rows={2}
                  className="w-full p-3 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all resize-none"
                />
              </div>

              {/* Action Button & Trust Guarantee */}
              <div className="space-y-2 pt-1">
                <Button
                  type="submit"
                  className="w-full h-12 py-3 rounded-xl font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-[0_4px_20px_hsl(28_55%_58%/0.3)] btn-lipstick"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Forward Details to WhatsApp Concierge →</span>
                </Button>
                <p className="text-[10px] text-center text-muted-foreground/75 font-light tracking-wide flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  Zero advance deposit to inquire · Direct response within 15 minutes
                </p>
              </div>

              {redirecting && (
                <div className="p-2.5 bg-primary/15 border border-primary/40 rounded-lg text-center text-xs text-primary animate-pulse">
                  Opening WhatsApp with your personalized reservation details...
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export function Contact() {
  const [cForm, setCForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `✨ *GLOW & GLAM STUDIO - GENERAL INQUIRY* ✨\n\n` +
      `👤 *Name:* ${cForm.name}\n` +
      `📱 *Phone:* +91 ${cForm.phone.replace(/^\+?91/, "").trim()}\n` +
      `✉️ *Email:* ${cForm.email || "Not provided"}\n` +
      `💬 *Message:* ${cForm.message}\n\n` +
      `_Sent via glowandglamstudio.in contact concierge_`;

    const waUrl = `https://wa.me/918838819820?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="pb-12">
      <section className="relative pt-12 md:pt-16 pb-8 md:pb-10 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[500px] h-[400px]
                     bg-[radial-gradient(ellipse,hsl(38_40%_65%/0.08)_0%,transparent_70%)]
                     pointer-events-none"
        />
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-4 fade-in">
            <BrushIcon className="w-5 h-5 text-primary" />
            <span className="nav-label text-primary text-xs uppercase tracking-[0.25em]">
              Get in Touch
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-light mb-4 fade-in">
            Contact Concierge
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed font-light">
            We are based in Chennai and available for luxury weddings and destination events across India. Connect with our concierge directly on WhatsApp.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Cards */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between gap-4">
            {[
              {
                title: "Studio Atelier Location",
                info: "Anna Nagar / Alwarpet, Chennai, Tamil Nadu\nAvailable for on-location & destination weddings across India.",
              },
              {
                title: "Direct WhatsApp Hotline",
                info: "+91 88388 19820\nImmediate response during studio hours (9:00 AM – 8:30 PM).",
              },
              {
                title: "Electronic Mail",
                info: "hello@glowandglamstudio.in\nFor press, agency, or editorial collaborations.",
              },
            ].map((c) => (
              <Reveal key={c.title} className="flex-1">
                <div className="p-6 powder-card rounded-2xl border border-border/50 bg-[#161310]/80 h-full flex flex-col justify-center">
                  <h3 className="font-display text-lg mb-2 text-primary font-light">
                    {c.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line font-light">
                    {c.info}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right Direct Message Form */}
          <Reveal className="lg:col-span-7 h-full">
            <form
              onSubmit={handleContactSubmit}
              className="powder-card rounded-2xl p-7 md:p-9 border-2 border-primary/40 bg-[#161310]/95 shadow-xl space-y-4 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-1">
                  Send Direct Inquiry
                </h3>
                <p className="text-xs text-muted-foreground font-light mb-4">
                  Messages are sent directly to our lead makeup artist's WhatsApp.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3 h-3 text-primary" /> Your Name *
                </label>
                <input
                  value={cForm.name}
                  onChange={(e) => setCForm({ ...cForm, name: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  required
                  className="w-full h-11 px-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-primary" /> Phone / WhatsApp *
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-xs text-primary font-medium tracking-wide">
                      +91
                    </span>
                    <input
                      value={cForm.phone}
                      onChange={(e) => setCForm({ ...cForm, phone: e.target.value })}
                      placeholder="88388 19820"
                      required
                      className="w-full h-11 pl-12 pr-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-primary" /> Email Address
                  </label>
                  <input
                    type="email"
                    value={cForm.email}
                    onChange={(e) => setCForm({ ...cForm, email: e.target.value })}
                    placeholder="you@example.com (optional)"
                    className="w-full h-11 px-3.5 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs md:text-sm placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="nav-label text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary" /> Your Message *
                </label>
                <textarea
                  value={cForm.message}
                  onChange={(e) => setCForm({ ...cForm, message: e.target.value })}
                  placeholder="Describe your event dates, celebration vision, questions, or package inquiries..."
                  required
                  rows={4}
                  className="w-full p-3 rounded-lg border border-border/60 bg-[#100D0B] text-foreground text-xs placeholder:text-muted-foreground/40 focus:border-primary focus:ring-1 focus:ring-primary/40 outline-none transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 py-3 rounded-xl font-medium text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_25px_hsl(28_55%_58%/0.3)] btn-lipstick"
                size="lg"
              >
                <MessageCircle className="w-4 h-4" />
                Send via WhatsApp to +91 88388 19820
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
