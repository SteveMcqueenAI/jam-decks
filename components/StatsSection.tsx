"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Decks Built", icon: "🏗️" },
  { value: 15, suffix: " Years", label: "Experience", icon: "⏰" },
  { value: 4.9, suffix: "★", label: "Average Rating", icon: "⭐" },
  { value: 100, suffix: "%", label: "Satisfaction", icon: "💯" },
];

const testimonials = [
  {
    name: "James P.",
    text: "Jam Decks transformed our garden into an outdoor paradise. The craftsmanship is unmatched.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    text: "Professional from start to finish. Our neighbours are all jealous of the new deck!",
    rating: 5,
  },
  {
    name: "Mark & Lisa",
    text: "Best investment we've made in our home. The composite deck still looks brand new after 3 years.",
    rating: 5,
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = Date.now();
    const isFloat = value % 1 !== 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(isFloat ? parseFloat((eased * value).toFixed(1)) : Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setInView(true),
      });

      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, x: i % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 60%",
              scrub: 1,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/[0.02] to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-black text-brand-primary mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-brand-muted uppercase tracking-wider text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <p className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-4">
            What People Say
          </p>
          <h2 className="text-4xl md:text-5xl font-black">
            Trusted by <span className="text-brand-primary">Hundreds</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-white/[0.03] border border-white/5 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-brand-primary mb-4">
                {"★".repeat(t.rating)}
              </div>
              <p className="text-brand-muted leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-bold text-brand-cream">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
