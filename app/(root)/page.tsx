"use client";
import { Sparkles } from "lucide-react";

// This file runs in the browser (not on the server)

const Home = () => {
  return (
    <div className="min-h-screen  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h2 className="text-slate-900 mb-2">Reserve Your Table</h2>
        <p className="text-slate-600">
          Experience seamless booking with our intuitive system.{" "}
        </p>
      </div>
    </div>
  );
};
export default Home;
