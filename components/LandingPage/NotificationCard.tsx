import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface NotificationCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  delay?: number;
  className?: string;
}

export function NotificationCard({
  icon: Icon,
  title,
  subtitle,
  delay = 0,
  className = "",
}: NotificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl">
          <Icon className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <div className="font-semibold text-sm">{title}</div>
          <div className="text-xs text-gray-400 mt-0.5">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}
