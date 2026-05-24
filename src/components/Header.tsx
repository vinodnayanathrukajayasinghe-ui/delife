import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { brand, contact, waLink } from "@/lib/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/company-profile", label: "Company Profile" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden border-b border-border/60 bg-secondary/60 text-xs text-muted-foreground md:block">
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <a href={`tel:${contact.phoneRaw}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Phone className="h-3.5 w-3.5" /> {contact.phone}
            </a>
            <span>{contact.address}</span>
          </div>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Inquiry
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full border-b transition-all ${
          scrolled
            ? "border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
            : "border-transparent bg-background"
        }`}
      >
        <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-6 py-2">
          <Link to="/" className="flex items-center gap-3" aria-label={brand.name}>
            <img src={brand.logoFull} alt={`${brand.name} logo`} className="h-16 w-auto object-contain md:h-14" />
            <span className="sr-only">{brand.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {n.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition hover:opacity-95"
            >
              Free Consultation
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="container-px mx-auto flex max-w-7xl flex-col py-2">
              {nav.map((n) => {
                const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`rounded-md px-3 py-3 text-sm font-medium ${
                      active ? "bg-secondary text-primary" : "text-foreground/85"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                WhatsApp Inquiry
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
