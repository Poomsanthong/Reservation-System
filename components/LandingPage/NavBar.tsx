"use client";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu open/close

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/BookFlow_Logo.png"
                alt="BookFlow Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">Bookflow</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-white transition-colors"
              >
                How it works
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => redirect("/login")}
                className="hidden sm:block text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <motion.button
                onClick={() => redirect("/signup")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className=" hidden px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold shadow-lg shadow-purple-900/30"
              >
                Get Started
              </motion.button>
              {/* Mobile Menu Button */}
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
              {/* Mobile Navigation */}
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="sm:hidden px-4 pb-4 flex flex-col gap-2 absolute top-full left-0 right-0 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-b-2xl mt-2"
                >
                  <div className="flex flex-col gap-4">
                    <a
                      href="#features"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Features
                    </a>
                    <a
                      href="#how-it-works"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      How it works
                    </a>
                    <a
                      href="#pricing"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      Pricing
                    </a>
                    <a
                      href="#about"
                      className="text-gray-300 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      About
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
