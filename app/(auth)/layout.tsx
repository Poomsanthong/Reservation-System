import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full max-w-full overflow-x-hidden text-[foreground] p-4 sm:p-8 lg:p-12">
      {" "}
      {/* Left side */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0  p-12 border-r border-[#2e2b25]">
        <div>
          <div className="flex items-center gap-2 mb-16">
            <div className="w-16 h-16 rounded">
              <img src="/BookFlow_favicon.svg" alt="BookFlow Logo" />
            </div>

            <span className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-lg tracking-tight">
              BookFlow
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.1] text-[#f5f0e8] mb-6">
            Your restaurant,
            <br />
            <em className="text-[#d4821a]">managed</em>
            <br />
            beautifully.
          </h1>

          <p className="text-[#8b8070] text-sm leading-relaxed max-w-[280px]">
            Set up your dashboard in minutes. Handle reservations, menus, staff,
            and analytics from one place.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { label: "Reservations", val: "1,284" },
            { label: "Avg. cover tonight", val: "42" },
            { label: "Menu items", val: "96" },
          ].map(({ label, val }) => (
            <div
              key={label}
              className="flex items-center justify-between border-t border-[#2e2b25] pt-4"
            >
              <span className="text-[#8b8070] text-xs uppercase tracking-widest">
                {label}
              </span>

              <span className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-xl">
                {val}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1 min-w-0 overflow-y-auto flex items-start justify-center py-8 px-4 sm:py-12 sm:px-6">
        {" "}
        <div className="w-full max-w-[560px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded bg-[#d4821a] flex items-center justify-center">
              <img src="/BookFlow_favicon.svg" alt="BookFlow Logo" />
            </div>
            <span className="font-[family-name:var(--font-display)] text-[#f5f0e8] text-lg tracking-tight">
              BookFlow
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
