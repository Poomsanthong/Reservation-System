import React from "react";
import NavBar from "@/components/LandingPage/NavBar";
export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-full overflow-x-hidden ">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>
      <div className="container  max-w-7xl mx-auto  p-4   mt-8 mb-8">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
