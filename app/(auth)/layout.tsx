import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-gray-400 ">
      <div className="container mx-auto ">{children}</div>
    </div>
  );
}
