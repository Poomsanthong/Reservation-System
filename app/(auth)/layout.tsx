import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-full overflow-x-hidden ">
      <div className="container  max-w-7xl mx-auto overflow-auto rounded-lg p-4  bg-white mt-8 mb-8">
        {children}
      </div>
    </div>
  );
}
