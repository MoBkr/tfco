"use client";
import { useEffect } from "react";

const SEL = ".cs-card, .pricing-card, .testimonial-card";

export default function CardSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const spots = new Map<Element, HTMLDivElement>();

    const init = () => {
      document.querySelectorAll(SEL).forEach(card => {
        if (spots.has(card)) return;
        const sp = document.createElement("div");
        sp.style.cssText =
          "position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 0.25s ease;";
        (card as HTMLElement).style.position = "relative";
        (card as HTMLElement).style.overflow = "hidden";
        card.insertBefore(sp, card.firstChild);
        spots.set(card, sp);
      });
    };
    init();

    let prev: Element | null = null;
    const onMove = (e: MouseEvent) => {
      const card = (e.target as Element).closest(SEL);
      if (card !== prev) {
        if (prev) { const s = spots.get(prev); if (s) s.style.opacity = "0"; }
        prev = card;
        if (card) init();
      }
      if (!card) return;
      const sp = spots.get(card);
      if (!sp) return;
      const r = card.getBoundingClientRect();
      sp.style.background = `radial-gradient(280px circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,212,255,0.09), transparent 60%)`;
      sp.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);
  return null;
}
