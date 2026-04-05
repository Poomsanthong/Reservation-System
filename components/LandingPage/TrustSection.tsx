"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Restaurant A", width: 120 },
  { name: "Restaurant B", width: 100 },
  { name: "Restaurant C", width: 140 },
  { name: "Restaurant D", width: 110 },
  { name: "Restaurant E", width: 90 },
];
const TrustSection = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-lg text-gray-400 mb-12">
            Built for modern restaurants
          </p>

          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center justify-center"
                style={{ width: logo.width }}
              >
                {/* Placeholder Logo */}
                <div className="w-full h-12 bg-gradient-to-r from-white/20 to-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-white/60">
                    {logo.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {[
            {
              quote:
                "Bookflow simplified our entire reservation process. The dashboard is intuitive and saves us hours every week.",
              author: "Michael Chen",
              role: "Owner, The Garden Bistro",
            },
            {
              quote:
                "Setup took 5 minutes. Our customers love the booking page. It's exactly what we needed.",
              author: "Sofia Rodriguez",
              role: "Manager, Coastal Kitchen",
            },
            {
              quote:
                "The owner dashboard gives us complete control. We can see everything at a glance and manage bookings effortlessly.",
              author: "James Morrison",
              role: "Director, Skyline Restaurant Group",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
