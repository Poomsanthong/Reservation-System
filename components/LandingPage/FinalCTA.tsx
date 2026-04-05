"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Mega Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-indigo-600/30 rounded-[3rem] blur-3xl" />

          {/* CTA Card */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-[3rem] p-16 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
              >
                <LayoutDashboard className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">
                  Complete booking solution
                </span>
              </motion.div>

              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Start managing reservations{" "}
                <span className="block mt-2 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  like a pro
                </span>
              </h2>

              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join thousands of restaurants using Bookflow to streamline their
                operations and delight their customers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-semibold shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70 transition-shadow flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
