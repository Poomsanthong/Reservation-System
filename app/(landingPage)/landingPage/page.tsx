import Features from "@/components/LandingPage/Features";
import Hero from "@/components/LandingPage/Hero";
import HowItWorks from "@/components/LandingPage/HowItWorks";
import UIShowcase from "@/components/LandingPage/UIShowcase";
import React from "react";

const page = () => {
  return (
    <div>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />

        <UIShowcase />
        {/*
        <TrustSection />
        <FinalCTA /> */}
      </div>
    </div>
  );
};

export default page;
