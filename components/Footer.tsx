import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <img
            src="/BookFlow_Logo.png"
            alt="Bookflow Logo"
            className="h-12 md:h-35 w-auto"
          />
        </div>

        {/* Product */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary-800 mb-3">Product</p>
          <div className="flex flex-col gap-3 text-sm text-primary-600">
            <a href="/landingPage#features" className="hover:text-primary-900">
              Features
            </a>
            <a
              href="/landingPage#how-it-works"
              className="hover:text-primary-900"
            >
              How It Works
            </a>
            <a
              href="/landingPage#documentation"
              className="hover:text-primary-900"
            >
              Documentation
            </a>
          </div>
        </div>

        {/* Company */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary-800 mb-3">Company</p>
          <div className="flex flex-col gap-3 text-sm text-primary-600">
            <a href="#" className="hover:text-primary-900">
              Support
            </a>
            <a href="#" className="hover:text-primary-900">
              Contact
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-primary-800 mb-3">Legal</p>
          <div className="flex flex-col gap-3 text-sm text-primary-600">
            <a href="#" className="hover:text-primary-900">
              Privacy
            </a>
            <a href="#" className="hover:text-primary-900">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-primary-500 flex flex-col items-center text-center gap-2 sm:flex-row sm:justify-between sm:text-left">
          <span>&copy; {year} Bookflow. All rights reserved.</span>
          <span className="opacity-80">Built for modern restaurants </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
