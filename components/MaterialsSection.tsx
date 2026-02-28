"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    name: "Composite",
    description: "Low maintenance, weather-resistant. The modern choice for lasting beauty.",
    durability: 95,
    price: "$$",
    color: "from-amber-900/40 to-stone-900/60",
    image: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600&q=80",
  },
  {
    name: "Balau Hardwood",
    description: "Exotic African hardwood with incredible natural grain and durability.",
    durability: 98,
    price: "$$$",
    color: "from-orange-900/40 to-stone-900/60",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
  {
    name: "Treated Pine",
    description: "Classic and affordable. Pressure-treated for long outdoor life.",
    durability: 75,
    price: "$",
    color: "from-green-900/30 to-stone-900/60",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
  },
  {
    name: "Bamboo",
    description: "Sustainable and eco-friendly. Harder than most hardwoods.",
    durability: 88,
    price: "$$",
    color: "from-lime-900/30 to-stone-900/60",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
];

function MaterialCard({ material, index }: { material: typeof materials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      className="material-card relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Image */}
      <div className="relative h-64 md:h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${material.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${material.color}`} />

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-sm px-3 py-1 rounded-full text-brand-primary text-sm font-bold">
          {material.price}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/5">
        <h3 className="text-2xl font-bold mb-2">{material.name}</h3>
        <p className="text-brand-muted text-sm mb-4">{material.description}</p>

        {/* Durability bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-brand-muted">Durability</span>
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-brand-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${material.durability}%` }}
              transition={{ delay: 0.5 + index * 0.15, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>
          <span className="text-sm font-bold text-brand-primary">{material.durability}%</span>
        </div>
      </div>

      {/* Shine effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${50 + tilt.x * 3}% ${50 - tilt.y * 3}%, rgba(212,165,116,0.08), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

export default function MaterialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".materials-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="materials" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="materials-title text-center mb-16">
          <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4">
            Built With the Best
          </p>
          <h2 className="text-4xl md:text-6xl font-black">
            Premium <span className="text-brand-primary">Materials</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {materials.map((mat, i) => (
            <MaterialCard key={mat.name} material={mat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
