import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { waLink } from "@/lib/site";

export function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-transform hover:scale-105"
        style={{ backgroundColor: "#25D366" }}
      >
        <span className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ backgroundColor: "#25D366" }} />
        <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.29c-.27-.14-1.59-.79-1.84-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.07-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.84.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.59-.65 1.82-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.02 4C9.39 4 4 9.39 4 16.02c0 2.12.55 4.16 1.6 5.97L4 28l6.18-1.62c1.75.95 3.73 1.46 5.84 1.46h.01c6.63 0 12.02-5.39 12.02-12.02C28.05 9.4 22.65 4 16.02 4z"/>
        </svg>
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-card transition-all hover:bg-primary hover:text-primary-foreground ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}
