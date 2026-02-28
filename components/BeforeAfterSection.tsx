"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  useEffect(() => {
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ba-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: 1 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="ba-title text-center mb-16">
          <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4">
            The Transformation
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            Before & <span className="text-brand-primary">After</span>
          </h2>
        </div>

        {/* Slider */}
        <motion.div
          ref={containerRef}
          className="before-after-container relative rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[16/9]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onMouseDown={() => { isDragging.current = true; }}
          onTouchStart={() => { isDragging.current = true; }}
        >
          {/* After (full) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80)",
            }}
          />

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80)",
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              filter: "saturate(0.3) brightness(0.6)",
            }}
          />

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-brand-primary z-20"
            style={{ left: `${sliderPos}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-xl shadow-brand-primary/30">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-brand-dark"
              >
                <path d="M8 5l-5 7 5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5l5 7-5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs uppercase tracking-wider text-brand-muted z-10">
            Before
          </div>
          <div className="absolute top-4 right-4 bg-brand-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs uppercase tracking-wider text-brand-dark font-bold z-10">
            After
          </div>
        </motion.div>

        <p className="text-center text-brand-muted mt-6 text-sm">
          ← Drag to compare →
        </p>
      </div>
    </section>
  );
}
