import logoFull from "@/assets/delife-logo-full.png";
import logoIcon from "@/assets/delife-logo-icon.png";

export const brand = {
  name: "DELIFE Interior Pvt Ltd",
  short: "DELIFE",
  tagline: "Crafting Elegant Spaces with Precision",
  primaryLine: "Interior Designing and Contracting",
  altPositioning:
    "Elegant Interior Designing, Fit-Out, 3D Planning and Contracting Solutions",
  logoFull,
  logoIcon,
};

export const contact = {
  email: "delifeinterior@gmail.com",
  phone: "+94 76 792 8085",
  phoneRaw: "+94767928085",
  whatsapp: "94767928085",
  secondary: "+94 76 965 2653",
  address: "Battaramulla, Western Province, Sri Lanka",
  facebook: "https://www.facebook.com/delifeltd",
  hours: "Mon – Sat · 9:00 AM – 6:00 PM",
};

export const waLink = (msg = "Hello DELIFE, I'd like to inquire about your services.") =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  { slug: "interior-designing", title: "Interior Designing", short: "Bespoke residential & commercial interiors.", description: "Tailored interior concepts that balance aesthetics, function and durability for residential, corporate and hospitality spaces.", icon: "Sofa" },
  { slug: "3d-design-visualization", title: "3D Design & Visualization", short: "Photoreal 3D concepts before we build.", description: "High-fidelity 3D walkthroughs and renders so you can experience the space before construction begins.", icon: "Box" },
  { slug: "house-planning", title: "House Planning", short: "Architectural plans that live well.", description: "Practical, modern house layouts engineered around your lifestyle, site and budget.", icon: "Home" },
  { slug: "concept-drawings", title: "Concept Drawings", short: "Detailed concept and working drawings.", description: "From mood boards to working drawings — every detail documented for flawless execution.", icon: "PencilRuler" },
  { slug: "boq-estimation", title: "BOQ & Estimation", short: "Transparent BOQs and estimates.", description: "Accurate Bills of Quantities and cost estimates so you know exactly where every rupee goes.", icon: "Calculator" },
  { slug: "fit-out-works", title: "Interior Fit-Out Works", short: "Full turnkey fit-out delivery.", description: "End-to-end fit-out: partitions, ceilings, joinery, flooring, MEP coordination and finishes.", icon: "Hammer" },
  { slug: "office-interiors", title: "Office Interior Solutions", short: "Workspaces that elevate teams.", description: "Modern office interiors designed for productivity, brand expression and wellbeing.", icon: "Building2" },
  { slug: "commercial-interiors", title: "Commercial Interior Projects", short: "Showrooms, banks, retail & more.", description: "Commercial interiors built to perform — brand-aligned, durable, and ready for high footfall.", icon: "Store" },
  { slug: "customized-furniture", title: "Customized Furniture", short: "Joinery & furniture, made to measure.", description: "In-house design and manufacture of bespoke furniture, cabinetry and joinery.", icon: "Armchair" },
  { slug: "renovation-contracting", title: "Renovation & Contracting", short: "Refresh, remodel, restore.", description: "Full renovation and contracting services delivered on time and to specification.", icon: "Wrench" },
  { slug: "ceiling-partition", title: "Ceiling & Partition Works", short: "Ceilings, partitions, acoustic systems.", description: "Gypsum, acoustic and decorative ceiling and partition systems by skilled craftsmen.", icon: "Layers" },
  { slug: "flooring-solutions", title: "Flooring Solutions", short: "Premium flooring for every space.", description: "Tiles, timber, vinyl, epoxy and luxury flooring supply and installation.", icon: "Grid3x3" },
  { slug: "retail-showroom", title: "Retail / Showroom Interiors", short: "Showrooms that convert.", description: "Retail and showroom interiors crafted to showcase product and drive customer experience.", icon: "ShoppingBag" },
  { slug: "hospitality-interiors", title: "Restaurant / Salon / Hospitality", short: "Hospitality interiors with atmosphere.", description: "Restaurants, salons, resorts and hospitality spaces designed for ambience and operations.", icon: "UtensilsCrossed" },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  location: string;
  short: string;
  description: string;
  servicesProvided: string[];
  status: "Completed" | "Ongoing";
  completion: string;
  client?: string;
  cover: string;
  gallery: string[];
};

const img = {
  cinema: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1600&q=80",
  cinemaB: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80",
  bank: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
  bankB: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1600&q=80",
  tea: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1600&q=80",
  cosmetics: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&w=1600&q=80",
  resort: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
  steel: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80",
  house: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  salon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
  office: "https://images.unsplash.com/photo-1604328471151-b52226907017?auto=format&fit=crop&w=1600&q=80",
  fitout: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  living: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80",
  bedroom: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
};

export const projects: Project[] = [
  {
    slug: "scope-cinema-project",
    name: "Scope Cinema Project",
    category: "Commercial Projects",
    location: "Colombo, Sri Lanka",
    short: "Premium cinema lobby and concession interior fit-out.",
    description:
      "A full-scale cinema interior delivery featuring a sculptural circular ceiling feature, hanging crystal accents, vertical timber slats, dark marble columns and a luxurious concession experience designed to elevate the guest journey from arrival to seat.",
    servicesProvided: ["Interior Designing", "Fit-Out Works", "Ceiling & Partition", "Custom Joinery"],
    status: "Completed",
    completion: "2023",
    client: "Scope Cinemas",
    cover: img.cinema,
    gallery: [img.cinema, img.cinemaB, img.fitout, img.living],
  },
  {
    slug: "union-bank-project",
    name: "Union Bank Project",
    category: "Corporate Projects",
    location: "Colombo, Sri Lanka",
    short: "Branch interior fit-out with banking furniture and ATM lobby.",
    description:
      "Complete branch interior including banking hall, glass partitions, customer seating, staff workstations and an external ATM lobby — delivered to corporate brand standards.",
    servicesProvided: ["Office Interiors", "Fit-Out", "Joinery", "Flooring"],
    status: "Completed",
    completion: "2022",
    client: "Union Bank",
    cover: img.bank,
    gallery: [img.bank, img.bankB, img.office, img.fitout],
  },
  {
    slug: "udayakanda-tea-center",
    name: "Udayakanda Tea Center Interior",
    category: "Hospitality Projects",
    location: "Sri Lanka",
    short: "Warm, story-driven retail interior for a tea experience center.",
    description:
      "An immersive tea center interior celebrating Ceylon tea heritage with timber, brass accents and curated retail display systems.",
    servicesProvided: ["Interior Designing", "Retail Fit-Out", "Custom Furniture"],
    status: "Completed",
    completion: "2022",
    cover: img.tea,
    gallery: [img.tea, img.restaurant, img.fitout],
  },
  {
    slug: "sg-cosmetics-interior",
    name: "SG Cosmetics Interior Project",
    category: "Commercial Projects",
    location: "Sri Lanka",
    short: "Bright, modern cosmetics showroom interior.",
    description:
      "A polished retail interior with backlit display walls, mirrored finishes and luxury cosmetics-grade lighting designed for product showcase.",
    servicesProvided: ["Showroom Interior", "Lighting Design", "Custom Joinery"],
    status: "Completed",
    completion: "2021",
    client: "SG Cosmetics",
    cover: img.cosmetics,
    gallery: [img.cosmetics, img.bedroom, img.living],
  },
  {
    slug: "water-front-resort",
    name: "Water Front Resort Project",
    category: "Hospitality Projects",
    location: "Sri Lanka",
    short: "Resort interiors and construction support.",
    description:
      "Resort suites and public area interiors with integrated construction support, delivering a tranquil, premium waterfront experience.",
    servicesProvided: ["Interior Designing", "Construction", "Fit-Out"],
    status: "Completed",
    completion: "2021",
    cover: img.resort,
    gallery: [img.resort, img.bedroom, img.restaurant],
  },
  {
    slug: "steel-construction-boralesgamuwa",
    name: "Steel Construction Project",
    category: "Construction Projects",
    location: "Boralesgamuwa, Sri Lanka",
    short: "Heavy steel structure design and construction.",
    description:
      "Design, fabrication and erection of a large-span steel structure with professional safety and quality controls throughout the build.",
    servicesProvided: ["Steel Structure", "Construction", "Project Management"],
    status: "Completed",
    completion: "2020",
    cover: img.steel,
    gallery: [img.steel, img.fitout],
  },
  {
    slug: "modern-house-design",
    name: "Modern House Design Project",
    category: "Residential Projects",
    location: "Western Province, Sri Lanka",
    short: "Contemporary residence with elegant interiors.",
    description:
      "Full house design, 3D planning and interior execution for a contemporary family residence — open plan living, custom kitchen and serene bedrooms.",
    servicesProvided: ["House Planning", "3D Design", "Interior Fit-Out", "Custom Furniture"],
    status: "Completed",
    completion: "2024",
    cover: img.house,
    gallery: [img.house, img.living, img.bedroom, img.kitchen],
  },
  {
    slug: "restaurant-interior",
    name: "Restaurant Interior Project",
    category: "Hospitality Projects",
    location: "Colombo, Sri Lanka",
    short: "Atmospheric dining interior with custom joinery.",
    description: "A warm, atmospheric restaurant interior with custom banquettes, layered lighting and a feature bar back.",
    servicesProvided: ["Hospitality Interior", "Fit-Out", "Furniture"],
    status: "Completed",
    completion: "2023",
    cover: img.restaurant,
    gallery: [img.restaurant, img.fitout],
  },
  {
    slug: "salon-interior",
    name: "Salon Interior Project",
    category: "Commercial Projects",
    location: "Sri Lanka",
    short: "Refined salon interior with bespoke stations.",
    description: "A refined salon interior with custom stations, mirror walls and a calming material palette.",
    servicesProvided: ["Interior Designing", "Fit-Out", "Custom Furniture"],
    status: "Completed",
    completion: "2023",
    cover: img.salon,
    gallery: [img.salon, img.cosmetics],
  },
  {
    slug: "office-interior",
    name: "Office Interior Project",
    category: "Office Interiors",
    location: "Colombo, Sri Lanka",
    short: "Modern open-plan office with meeting suites.",
    description: "A modern open-plan office with meeting suites, breakout areas and brand-led graphics.",
    servicesProvided: ["Office Interiors", "Partitions", "Joinery", "Flooring"],
    status: "Ongoing",
    completion: "2025",
    cover: img.office,
    gallery: [img.office, img.fitout, img.bank],
  },
  {
    slug: "commercial-fit-out",
    name: "Commercial Fit-Out Project",
    category: "Fit-Out Projects",
    location: "Sri Lanka",
    short: "Turnkey commercial fit-out delivery.",
    description: "Turnkey commercial fit-out covering partitions, ceilings, MEP coordination, joinery and finishes.",
    servicesProvided: ["Fit-Out", "Ceiling & Partition", "Flooring", "Joinery"],
    status: "Ongoing",
    completion: "2025",
    cover: img.fitout,
    gallery: [img.fitout, img.office],
  },
];

export const projectCategories = [
  "All",
  "Residential Projects",
  "Commercial Projects",
  "Corporate Projects",
  "Hospitality Projects",
  "Office Interiors",
  "Construction Projects",
  "3D Design Projects",
  "Fit-Out Projects",
];

export const galleryCategories = [
  "All",
  "Interiors",
  "Construction",
  "Office",
  "Residential",
  "Commercial",
  "3D Designs",
  "Furniture",
  "Renovations",
];

export const galleryItems = [
  { src: img.living, alt: "Modern living room interior", cat: "Interiors" },
  { src: img.bedroom, alt: "Elegant bedroom interior", cat: "Residential" },
  { src: img.kitchen, alt: "Bespoke kitchen interior", cat: "Furniture" },
  { src: img.office, alt: "Modern office interior", cat: "Office" },
  { src: img.bank, alt: "Bank branch interior", cat: "Commercial" },
  { src: img.cinema, alt: "Cinema lobby interior", cat: "Commercial" },
  { src: img.restaurant, alt: "Restaurant interior", cat: "Interiors" },
  { src: img.cosmetics, alt: "Cosmetics showroom", cat: "Commercial" },
  { src: img.house, alt: "Modern residence exterior", cat: "Residential" },
  { src: img.steel, alt: "Steel construction site", cat: "Construction" },
  { src: img.resort, alt: "Resort interior", cat: "Interiors" },
  { src: img.fitout, alt: "Commercial fit-out", cat: "Renovations" },
  { src: img.salon, alt: "Salon interior", cat: "Commercial" },
  { src: img.tea, alt: "Tea center interior", cat: "Interiors" },
  { src: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=80", alt: "3D interior visualization", cat: "3D Designs" },
  { src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80", alt: "3D render living room", cat: "3D Designs" },
];

export const whyChooseUs = [
  { title: "Creative Design Approach", desc: "Distinctive concepts tailored to your brand, lifestyle and site." },
  { title: "Reliable Project Execution", desc: "Disciplined site management with experienced, in-house teams." },
  { title: "Quality Finishing", desc: "Meticulous detailing and premium materials in every handover." },
  { title: "Professional Planning", desc: "Clear drawings, accurate BOQs and transparent scheduling." },
  { title: "On-Time Delivery", desc: "Milestone-driven delivery you can plan your business around." },
  { title: "Full-Spectrum Expertise", desc: "Residential, commercial, corporate & hospitality experience." },
];

export const processSteps = [
  { n: "01", title: "Consultation", desc: "Understand brief, site, lifestyle and budget." },
  { n: "02", title: "Planning", desc: "Space planning, layouts and material direction." },
  { n: "03", title: "3D Concept", desc: "Photoreal 3D so you experience it before we build." },
  { n: "04", title: "Estimation", desc: "Transparent BOQ and detailed costing." },
  { n: "05", title: "Execution", desc: "Skilled site delivery with quality control." },
  { n: "06", title: "Handover", desc: "Snag-free, on-time handover and aftercare." },
];

export const testimonials = [
  { name: "Director, Retail Chain", quote: "DELIFE delivered our showroom on time and on budget, with finishes that genuinely elevate our brand." },
  { name: "Homeowner, Colombo", quote: "From 3D concept to handover, the DELIFE team made the entire process effortless and elegant." },
  { name: "Operations Head, Hospitality Group", quote: "Quality workmanship, professional planning and a team that takes ownership. Highly recommended." },
];
