"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Globe, Bell, Smartphone } from "lucide-react";
const features = [
  {
    icon: Globe,
    title: "Beautiful Booking Page",
    description:
      "Elegant, responsive reservation page that matches your brand. Customers can easily book tables from any device.",
  },
  {
    icon: LayoutDashboard,
    title: "Owner Dashboard",
    description:
      "Comprehensive dashboard view to manage all bookings, view analytics, and control restaurant availability in real-time.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Optimized",
    description:
      "Seamless booking experience on any device with a responsive and fast mobile-first interface.",
  },
  {
    icon: Bell,
    title: "Instant Notifications",
    description:
      "Real-time alerts for new reservations, cancellations, and customer updates. Never miss a booking again.",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything you need to manage reservations
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for modern restaurants that value efficiency and customer
            experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              {/* Card Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 rounded-3xl transition-all duration-500 blur-xl" />

              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/5 group-hover:border-white/10 rounded-3xl p-8 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
