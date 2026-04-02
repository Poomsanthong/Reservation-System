import React from "react";
import NavBar from "@/components/LandingPage/NavBar";
export default async function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-full overflow-x-hidden ">
      <div className="container  max-w-7xl mx-auto overflow-auto  p-4   mt-8 mb-8">
        <NavBar />
        {children}
      </div>
    </div>
  );
}
