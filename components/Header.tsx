"use client"; // This file runs in the browser (not on the server)

import React, { useState } from "react";
import { CalendarClock, LayoutDashboard, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
function Header() {
  // State: activeView can only be "booking" or "admin"  in ("booking") is the initial value
  // setActiveView changes the value
  const router = useRouter();
  const [activeView, setActiveView] = useState<"booking" | "admin">("booking");
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu open/close

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 ">
      {/* navigation content goes here */}
      <nav className="border-b w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 px-2 sm:px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <CalendarClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Booking System</h1>
                <p className="hidden text-sm text-slate-500 sm:inline">
                  Manage your bookings efficiently
                </p>
              </div>
            </div>

            <div className="hidden sm:flex gap-2">
              <Button
                variant={activeView === "booking" ? "default" : "outline"}
                onClick={() => {
                  setActiveView("booking");
                  setMobileOpen(false);
                  router.push("/");
                }}
                className="gap-2"
              >
                <CalendarClock className="w-4 h-4" />
                Book Now
              </Button>
              <Button
                variant={activeView === "admin" ? "default" : "outline"}
                onClick={() => {
                  setActiveView("admin");
                  setMobileOpen(false);
                  router.push("/admin/login");
                }}
                className="gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Admin Dashboard
              </Button>
            </div>
            <Button
              variant="outline"
              className="sm:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {/* mobile menu panel */}
        {mobileOpen && (
          <div className="sm:hidden px-4 pb-4 flex flex-col gap-2">
            <Button
              variant={activeView === "booking" ? "default" : "outline"}
              onClick={() => {
                setActiveView("booking");
                router.push("/");
                setMobileOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <CalendarClock className="w-4 h-4" />
              Book Now
            </Button>
            <Button
              variant={activeView === "admin" ? "default" : "outline"}
              onClick={() => {
                setActiveView("admin");
                router.push("/admin");
                setMobileOpen(false);
              }}
              className="w-full justify-start gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Dashboard
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
