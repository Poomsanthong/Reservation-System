import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-gray-400flex flex-col">
      ={" "}
      <div className="container mx-auto flex flex-col items-center justify-center">
        {children}
      </div>
      ={" "}
    </div>
  );
};

export default layout;
