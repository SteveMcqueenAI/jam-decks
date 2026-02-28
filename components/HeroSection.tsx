"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background
      gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text fades up then out
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Fade overlay on scroll out
      gsap.to(overlayRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating particles
      gsap.utils.toArray<HTMLElement>(".particle").forEach((p, i) => {
        gsap.to(p, {
          y: -200 - Math.random() * 300,
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          delay: i * 0.5,
          ease: "power1.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[120vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark" />
      <div ref={overlayRef} className="absolute inset-0 bg-brand-dark opacity-0" />

      {/* Sawdust particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 rounded-full bg-brand-primary/40"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${60 + Math.random() * 30}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          className="text-brand-primary uppercase tracking-[0.3em] text-sm md:text-base mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Premium Outdoor Living
        </motion.p>

        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <span className="text-brand-primary">JAM</span> DECKS
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-brand-muted font-light max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          Built to Last. Designed to Impress.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-brand-primary text-brand-dark font-bold uppercase tracking-wider text-sm rounded hover:bg-brand-cream transition-all duration-300 hover:scale-105"
          >
            Get a Free Quote
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-brand-primary/30 text-brand-primary font-medium uppercase tracking-wider text-sm rounded hover:border-brand-primary hover:bg-brand-primary/10 transition-all duration-300"
          >
            Explore Our Work
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-brand-primary/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-brand-primary/60 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
