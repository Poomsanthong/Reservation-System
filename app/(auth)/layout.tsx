import React from "react";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-full max-w-full overflow-x-hidden ">
        <div className="container     mx-auto overflow-auto  ">{children}</div>
      </div>
    </div>
  );
}
