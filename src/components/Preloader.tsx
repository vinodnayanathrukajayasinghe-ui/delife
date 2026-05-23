import { useEffect, useState } from "react";
import { brand } from "@/lib/site";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800);
    const t2 = setTimeout(() => setVisible(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="relative h-32 w-32">
        {/* SVG circle that draws in */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke="var(--royal)"
            strokeWidth="1.2"
            strokeDasharray="289"
            strokeDashoffset="289"
            style={{ animation: "draw-stroke 1.4s ease-out forwards" }}
          />
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="0.6"
            strokeDasharray="264"
            strokeDashoffset="264"
            style={{ animation: "draw-stroke 1.6s 0.2s ease-out forwards" }}
          />
        </svg>
        <img
          src={brand.logoIcon}
          alt={`${brand.short} mark`}
          className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-contain"
          style={{ animation: "fade-up 0.9s 0.9s ease-out both" }}
        />
      </div>
      <div
        className="mt-6 text-xs tracking-[0.4em] text-muted-foreground"
        style={{ animation: "fade-up 0.8s 1.1s ease-out both" }}
      >
        CRAFTING ELEGANT SPACES
      </div>
      <div className="mt-3 h-px w-40 overflow-hidden rounded-full bg-border">
        <div
          className="h-full w-1/3 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
