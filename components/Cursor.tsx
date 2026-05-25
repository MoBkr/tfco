"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    dot.style.opacity = ring.style.opacity = "1";

    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const track = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`;
      ring.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
      raf = requestAnimationFrame(loop);
    };

    const grow   = () => { ring.style.width = ring.style.height = "52px"; ring.style.borderColor = "rgba(0,212,255,0.6)"; ring.style.backgroundColor = "rgba(0,212,255,0.04)"; };
    const shrink = () => { ring.style.width = ring.style.height = "40px"; ring.style.borderColor = "rgba(0,212,255,0.38)"; ring.style.backgroundColor = ""; };

    const hits = document.querySelectorAll("a,button,[role=button],.card,.cs-card,.pricing-card,.btn-primary,.btn-ghost");
    hits.forEach(el => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });

    window.addEventListener("mousemove", track, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", track);
      cancelAnimationFrame(raf);
      hits.forEach(el => { el.removeEventListener("mouseenter", grow); el.removeEventListener("mouseleave", shrink); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", top:0, left:0, zIndex:99999, pointerEvents:"none",
        width:8, height:8, borderRadius:"50%", opacity:0,
        background:"#00D4FF",
        boxShadow:"0 0 10px rgba(0,212,255,1),0 0 24px rgba(0,212,255,0.5)",
        willChange:"transform",
      }} />
      <div ref={ringRef} style={{
        position:"fixed", top:0, left:0, zIndex:99998, pointerEvents:"none",
        width:40, height:40, borderRadius:"50%", opacity:0,
        border:"1px solid rgba(0,212,255,0.38)",
        transition:"width 0.22s ease,height 0.22s ease,border-color 0.22s ease,background-color 0.22s ease",
        willChange:"transform",
      }} />
    </>
  );
}
