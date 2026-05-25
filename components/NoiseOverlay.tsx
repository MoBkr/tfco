"use client";
import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const img = ctx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    if (ref.current) ref.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }, []);
  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none" style={{
      zIndex: 9997,
      opacity: 0.028,
      backgroundSize: "256px 256px",
      backgroundRepeat: "repeat",
      mixBlendMode: "overlay",
    }} />
  );
}
