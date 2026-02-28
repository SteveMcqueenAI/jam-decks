"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800&q=80", alt: "Wooden deck outdoor", tall: true },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", alt: "Modern house with deck", tall: false },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", alt: "Luxury outdoor living", tall: false },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", alt: "Modern architecture", tall: true },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", alt: "House with pool", tall: false },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", alt: "Outdoor space", tall: false },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-title",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: 1 },
        }
      );

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            scrollTrigger: { trigger: item, start: "top 90%", end: "top 70%", scrub: 1 },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="gallery-title text-center mb-16">
          <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4">Our Work</p>
          <h2 className="text-4xl md:text-6xl font-black">
            Project <span className="text-brand-primary">Gallery</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="gallery-item break-inside-avoid rounded-xl overflow-hidden cursor-pointer relative group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover ${img.tall ? "h-80 md:h-96" : "h-56 md:h-64"} group-hover:scale-105 transition-transform duration-700`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/40 transition-colors duration-500 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm uppercase tracking-widest">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-brand-dark/95 flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={images[lightbox].src.replace("w=800", "w=1600")}
              alt={images[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
