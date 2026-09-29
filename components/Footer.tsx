import React from "react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background text-foreground mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 pb-4">
          {/* brand */}

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 lg:h-24 lg:w-24 rounded bg-background flex items-center justify-center shrink-0 ">
                <img
                  src="/BookFlow_Logo.png"
                  alt="Bookflow Logo"
                  className="w-auto "
                />
              </div>
              <span className="text-foreground text-lg tracking-tight">
                BookFlow
              </span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-[220px] mb-2">
              Restaurant management that feels as good as your best service.
            </p>
          </div>
        </div>
        {/* links grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-1 sm:gap-x-16">
          <div className="flex flex-col gap-3 ">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground">
              Product
            </p>
            {["Features", "Pricing"].map((i) => (
              <a
                key={i}
                href={"/landingPage#" + i.toLowerCase()}
                className="text-xs text-muted-foreground hover:text-accent-foreground transition-colors"
              >
                {i}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[10px] uppercase tracking-[0.15em] text-foreground">
              Company
            </p>
            {["About", "Privacy", "Terms"].map((i) => (
              <a
                key={i}
                href="/landingPage"
                className="text-xs text-muted-foreground hover:text-[#f5f0e8] transition-colors"
              >
                {i}
              </a>
            ))}
          </div>
        </div>

        {/* bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-8 pt-6 border-t border-[2e2b25]">
          <p className="text-[#4a4740] text-xs">
            © {new Date().getFullYear()} BookFlow Inc. All rights reserved.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4">
            {[
              {
                label: "X / Twitter",
                href: "https://x.com",
                Icon: FaXTwitter,
              },
              {
                label: "Instagram",
                href: "https://instagram.com",
                Icon: FaInstagram,
              },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-[#4a4740] hover:text-[#d4821a] transition-colors"
              >
                <Icon className="w-4 h-4"></Icon>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
