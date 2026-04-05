"use client";
import { motion } from "framer-motion";
import { UserPlus, Calendar, CheckCircle } from "lucide-react";
const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Customer visits your page",
    description:
      "Share your unique Bookflow link. Customers access your branded booking page instantly.",
  },
  {
    icon: Calendar,
    number: "02",
    title: "Selects date & time",
    description:
      "Shows real-time availability based on your restaurant capacity and existing reservations.",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Booking confirmed",
    description:
      "Instant confirmation sent to customer. Reservation appears in your dashboard immediately.",
  },
];
const HowItWorks = () => {
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">How it works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to effortless restaurant bookings
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-px">
            <div className="relative h-full max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/30 to-transparent" />
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative text-center group">
                {/* Number Badge */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50" />
                  <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full h-full flex items-center justify-center border border-purple-500/30">
                    <span className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="inline-flex p-4 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl mb-6">
                  <step.icon className="w-8 h-8 text-purple-300" />
                </div>

                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
