import Features from "@/components/LandingPage/Features";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import UIShowcase from "@/components/LandingPage/UIShowcase";
import React from "react";
import TrustSection from "@/components/LandingPage/TrustSection";
import FinalCTA from "@/components/LandingPage/FinalCTA";
const page = () => {
  return (
    <div>
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />

        <UIShowcase />
        <TrustSection />

        <FinalCTA />
      </div>
    </div>
  );
};

export default page;
