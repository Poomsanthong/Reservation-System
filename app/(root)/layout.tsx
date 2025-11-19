import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-gray-400">
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
