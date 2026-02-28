"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cta-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "top 50%", scrub: 1 },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-brand-dark" />

      <div className="cta-content max-w-4xl mx-auto relative text-center">
        <motion.p
          className="text-brand-primary uppercase tracking-[0.3em] text-sm mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Let&apos;s Build Something Beautiful
        </motion.p>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
          Ready to Transform
          <br />
          <span className="text-brand-primary">Your Outdoor Space?</span>
        </h2>

        <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Get a free consultation and quote. We&apos;ll design the perfect deck for your home, lifestyle, and budget.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <motion.a
            href="tel:+27123456789"
            className="px-10 py-5 bg-brand-primary text-brand-dark font-bold uppercase tracking-wider text-sm rounded-lg hover:bg-brand-cream transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a Free Quote
          </motion.a>
          <motion.a
            href="mailto:hello@jamdecks.co.za"
            className="px-10 py-5 border-2 border-brand-primary/30 text-brand-primary font-bold uppercase tracking-wider text-sm rounded-lg hover:border-brand-primary hover:bg-brand-primary/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Email Us
          </motion.a>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl mb-2">📞</div>
            <p className="text-brand-muted text-sm uppercase tracking-wider mb-1">Phone</p>
            <p className="text-brand-cream font-medium">+27 12 345 6789</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📧</div>
            <p className="text-brand-muted text-sm uppercase tracking-wider mb-1">Email</p>
            <p className="text-brand-cream font-medium">hello@jamdecks.co.za</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📍</div>
            <p className="text-brand-muted text-sm uppercase tracking-wider mb-1">Location</p>
            <p className="text-brand-cream font-medium">Johannesburg, South Africa</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-24 pt-8 border-t border-white/5 text-center">
        <p className="text-brand-muted/50 text-sm">
          © 2026 Jam Decks. All rights reserved. Built with 🪵 and ❤️
        </p>
      </div>
    </section>
  );
}
