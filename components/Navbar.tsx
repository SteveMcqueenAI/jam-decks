"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = ["About", "Materials", "Gallery", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-dark/90 backdrop-blur-md border-b border-brand-primary/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-wider text-brand-primary">
          JAM<span className="text-white">DECKS</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors duration-300"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 bg-brand-primary text-brand-dark text-sm font-semibold uppercase tracking-wider rounded hover:bg-brand-cream transition-colors"
          >
            Get Quote
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 w-8"
        >
          <motion.span
            className="block h-0.5 bg-brand-primary rounded"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 bg-brand-primary rounded"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 bg-brand-primary rounded"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark/95 backdrop-blur-lg border-t border-brand-primary/10"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg uppercase tracking-widest text-brand-muted hover:text-brand-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-6 py-3 bg-brand-primary text-brand-dark text-center font-semibold uppercase tracking-wider rounded"
              >
                Get Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
