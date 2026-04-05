"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Calendar, BarChart3 } from "lucide-react";

const UIShowcase = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Powerful dashboard for owners
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Manage every aspect of your restaurant bookings from one beautiful
            interface
          </p>
        </motion.div>

        {/* Main Dashboard Picture Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <img
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            className="w-full h-auto rounded-2xl border border-white/10"
          />
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl inline-flex mb-6">
                <Calendar className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Calendar View</h3>
              <p className="text-gray-400">
                Visual calendar with drag-and-drop booking management
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl inline-flex mb-6">
                <BarChart3 className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400">
                Track trends, peak hours, and customer insights
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <div className="p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl inline-flex mb-6">
                <LayoutDashboard className="w-8 h-8 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Table Management</h3>
              <p className="text-gray-400">
                Organize floor plan and optimize seating arrangements
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UIShowcase;
