import { Link } from "@tanstack/react-router";
import { Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { brand, contact, services, waLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-[color:var(--section)]">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={brand.logoFull} alt={brand.name} className="h-24 w-auto object-contain" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {brand.name} delivers elegant interior designing, fit-out, 3D planning and contracting solutions across Sri Lanka.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card hover:opacity-95"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {[
                ["/about-us", "About Us"],
                ["/services", "Services"],
                ["/projects", "Projects"],
                ["/gallery", "Gallery"],
                ["/company-profile", "Company Profile"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Services</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {services.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to="/services" className="hover:text-primary">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" />{contact.address}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><a href={`tel:${contact.phoneRaw}`} className="hover:text-primary">{contact.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><a href={`mailto:${contact.email}`} className="hover:text-primary">{contact.email}</a></li>
              <li className="flex items-center gap-2"><Facebook className="h-4 w-4 text-primary" /><a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook Page</a></li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>{contact.hours}</span>
            <Link to="/admin-login" className="font-medium text-muted-foreground hover:text-primary">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
