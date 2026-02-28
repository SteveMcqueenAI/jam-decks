"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrewSection from "@/components/ScrewSection";
import MaterialsSection from "@/components/MaterialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import StatsSection from "@/components/StatsSection";
import GallerySection from "@/components/GallerySection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen">
      <SmoothScroll />
      <Navbar />
      <HeroSection />
      <ScrewSection />
      <MaterialsSection />
      <BeforeAfterSection />
      <StatsSection />
      <GallerySection />
      <CTASection />
    </main>
  );
}
