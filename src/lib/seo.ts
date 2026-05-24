import { brand, contact, services } from "@/lib/site";

export const SITE_URL = "http://www.delifeinterior.com";

export const defaultMetaTitle =
  "DELIFE Interior Designing and Contracting | Interior Design & Contracting Sri Lanka";

export const defaultMetaDescription =
  "DELIFE Interior Designing and Contracting provides professional interior designing, 3D planning, fit-out, renovation and contracting solutions for residential, commercial and corporate projects in Sri Lanka.";

export const primaryKeywords = [
  "DELIFE Interior Designing and Contracting",
  "DELIFE Interior Designing and Contracting Sri Lanka",
  "DELIFE Interior Designing",
  "DELIFE Interior Contracting",
  "DELIFE Interior Design Sri Lanka",
  "DELIFE Interior Contractor Sri Lanka",
  "Interior Designing Sri Lanka",
  "Interior Contracting Sri Lanka",
  "Interior Designer Battaramulla",
  "Interior Design Company Sri Lanka",
  "Interior Fit-Out Sri Lanka",
  "Office Interior Design Sri Lanka",
  "Commercial Interior Design Sri Lanka",
  "House Interior Design Sri Lanka",
  "3D Interior Design Sri Lanka",
  "House Planning Sri Lanka",
  "BOQ Estimation Sri Lanka",
  "Renovation Contractors Sri Lanka",
  "Ceiling and Partition Works Sri Lanka",
  "Custom Furniture Sri Lanka",
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageTitle(title: string) {
  return `${title} | ${brand.name}`;
}

export function seoMeta({
  title = defaultMetaTitle,
  description = defaultMetaDescription,
  canonical = "/",
  image,
  keywords = primaryKeywords,
  type = "website",
}: {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  keywords?: string[];
  type?: string;
}) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords.join(", ") },
      { property: "og:site_name", content: brand.name },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: absoluteUrl(canonical) },
      ...(image ? [{ property: "og:image", content: absoluteUrl(image) }, { name: "twitter:image", content: absoluteUrl(image) }] : []),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absoluteUrl(canonical) }],
  };
}

export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    alternateName: brand.short,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    email: contact.email,
    telephone: contact.phoneRaw,
    sameAs: [contact.facebook],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    name: brand.name,
    alternateName: brand.short,
    description: defaultMetaDescription,
    image: absoluteUrl("/favicon.png"),
    url: SITE_URL,
    telephone: contact.phoneRaw,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Battaramulla",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    areaServed: "Sri Lanka",
    priceRange: "$$",
    sameAs: [contact.facebook],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    alternateName: brand.short,
    url: SITE_URL,
    publisher: organizationSchema(),
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Interior Designing and Contracting Services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: organizationSchema(),
        areaServed: "Sri Lanka",
        serviceType: service.title,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
