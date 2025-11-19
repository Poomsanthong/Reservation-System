import React from "react";

const Footer = () => {
  const year = new Date().getFullYear(); // current year
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6 md:flex-row md:justify-between">
        <div>
          <p className="text-lg font-semibold text-slate-800">Booking System</p>
          <p className="text-sm text-slate-500">
            Make and manage reservations easily.
          </p>
        </div>
        <nav className="flex gap-4 text-sm text-slate-600">
          <a href="#" className="hover:text-slate-900">
            Bookings
          </a>
          <a href="#" className="hover:text-slate-900">
            Admin
          </a>
          <a href="#" className="hover:text-slate-900">
            Contact
          </a>
        </nav>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-slate-500 flex items-center justify-between">
          <span>&copy; {year} Booking System</span>
          <span className="hidden sm:inline">All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
