import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-gray-400 flex flex-col">
      {" "}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center">
        {" "}
        {children}
      </div>{" "}
    </div>
  );
};

export default layout;
