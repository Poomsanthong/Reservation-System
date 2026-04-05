"use client";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { redirect } from "next/navigation";
export default function NavBar() {
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
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold shadow-lg shadow-purple-900/30"
              >
                Get Started
              </motion.button>
              <button className="md:hidden p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
