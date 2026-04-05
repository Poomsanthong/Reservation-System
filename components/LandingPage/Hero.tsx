"use client";
import React from "react";
import { motion } from "framer-motion";
import { NotificationCard } from "./NotificationCard";
import { LayoutDashboard, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
const Hero = () => {
  return (
    <>
      <section className="relative pt-32 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center ">
            {/* Left content     */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">
                    Complete Booking Solution
                  </span>
                </motion.div>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Seamless reservations
                  </span>
                  <span className="block mt-2">for your restaurant</span>
                </h1>

                <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                  Bookflow is a complete booking platform with a customer-facing
                  reservation page and powerful dashboard for restaurant owners
                  to manage bookings effortlessly.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => redirect("/login")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold shadow-lg shadow-purple-900/50 hover:shadow-purple-900/70 transition-shadow"
                >
                  Get Started
                </motion.button>
                <motion.button
                  onClick={() => redirect("/bookingPage/demo-restaurant")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-colors"
                >
                  View Demo
                </motion.button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-sm text-gray-400">
                    Reservations/month
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">2min</div>
                  <div className="text-sm text-gray-400">Setup time</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Booking Page Preview Picture */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative hidden lg:block  -top-30"
            >
              <div className="relative ">
                <img
                  src="/hero-preview.png"
                  alt="Booking Page Preview"
                  className="rounded-2xl shadow-lg shadow-black/30"
                />
                {/* Floating Notifications */}
                <NotificationCard
                  icon={CheckCircle2}
                  title="New reservation"
                  subtitle="Table 12 • 7:30 PM"
                  delay={0.8}
                  className="absolute -left-30 top-30"
                />

                <NotificationCard
                  icon={LayoutDashboard}
                  title="Dashboard updated"
                  subtitle="15 bookings today"
                  delay={1.2}
                  className="absolute -right-20 top-55 "
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
