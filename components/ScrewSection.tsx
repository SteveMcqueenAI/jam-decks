"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Screw({ index }: { index: number; total: number }) {
  const screwRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!screwRef.current) return;

    const ctx = gsap.context(() => {
      // Screw rotation + sinking
      gsap.fromTo(
        screwRef.current,
        { rotation: 0, y: -60, opacity: 0.3 },
        {
          rotation: 720,
          y: 0,
          opacity: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".screw-section",
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Shadow grows as screw sinks
      gsap.fromTo(
        screwRef.current!.querySelector(".screw-shadow"),
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 0.5,
          scrollTrigger: {
            trigger: ".screw-section",
            start: "top 60%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [index]);

  // Position screws in a grid pattern on the "deck boards"
  const col = index % 4;
  const row = Math.floor(index / 4);

  return (
    <div
      ref={screwRef}
      className="absolute"
      style={{
        left: `${15 + col * 22}%`,
        top: `${25 + row * 35}%`,
        transitionDelay: `${index * 0.08}s`,
      }}
    >
      {/* Shadow */}
      <div className="screw-shadow absolute -inset-2 rounded-full bg-black/30 blur-md" />

      {/* Screw head */}
      <div className="screw-head w-10 h-10 md:w-14 md:h-14 relative z-10 shadow-lg shadow-black/40">
        {/* Phillips head cross */}
      </div>
    </div>
  );
}

export default function ScrewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".screw-text",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".screw-section",
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".screw-counter",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: ".screw-section",
            start: "30% center",
            end: "50% center",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const screwCount = 8;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="screw-section relative min-h-screen py-32 overflow-hidden"
    >
      {/* Wood board background */}
      <div className="absolute inset-0">
        {/* Horizontal deck boards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 border-b border-brand-primary/10"
            style={{
              top: `${16 + i * 14}%`,
              height: "14%",
              background: `linear-gradient(90deg, 
                rgba(212,165,116,0.03) 0%, 
                rgba(212,165,116,0.06) 20%, 
                rgba(212,165,116,0.03) 40%, 
                rgba(212,165,116,0.07) 60%, 
                rgba(212,165,116,0.03) 80%, 
                rgba(212,165,116,0.05) 100%)`,
            }}
          />
        ))}
      </div>

      {/* Screws */}
      <div className="relative max-w-4xl mx-auto h-[60vh]">
        {Array.from({ length: screwCount }).map((_, i) => (
          <Screw key={i} index={i} total={screwCount} />
        ))}
      </div>

      {/* Text */}
      <div className="screw-text relative text-center px-6 mt-12">
        <h2 className="text-4xl md:text-6xl font-black mb-4">
          Precision Craftsmanship,
          <br />
          <span className="text-brand-primary">Every Single Screw</span>
        </h2>
        <p className="text-brand-muted text-lg md:text-xl max-w-xl mx-auto">
          Each deck is assembled with meticulous attention to detail — from the first board to the final screw.
        </p>
      </div>

      {/* Counter */}
      <div className="screw-counter text-center mt-12">
        <span className="text-5xl md:text-7xl font-black text-brand-primary">
          2,847
        </span>
        <p className="text-brand-muted mt-2 uppercase tracking-widest text-sm">
          Screws per Average Deck
        </p>
      </div>
    </section>
  );
}
