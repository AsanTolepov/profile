import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface LinkCardProps {
  key?: string | number;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  href: string;
  color: "blue" | "purple" | "green" | "telegram" | "instagram" | "youtube" | "facebook";
}

export const LinkCard = ({ icon: Icon, title, subtitle, href, color }: LinkCardProps) => {
  const colorClasses = {
    blue: "hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] border-neon-blue/20 text-neon-blue bg-neon-blue/5",
    purple: "hover:shadow-[0_0_20px_rgba(188,19,254,0.3)] border-neon-purple/20 text-neon-purple bg-neon-purple/5",
    green: "hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] border-neon-green/20 text-neon-green bg-neon-green/5",
    telegram: "hover:shadow-[0_0_20px_rgba(0,136,204,0.3)] border-[#0088cc]/20 text-[#0088cc] bg-[#0088cc]/10",
    instagram: "hover:shadow-[0_0_20px_rgba(228,64,95,0.3)] border-[#e4405f]/20 text-[#e4405f] bg-[#e4405f]/10",
    youtube: "hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] border-red-600/20 text-red-600 bg-red-600/10",
    facebook: "hover:shadow-[0_0_20px_rgba(24,119,242,0.3)] border-[#1877f2]/20 text-[#1877f2] bg-[#1877f2]/10",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`glass glass-hover w-full p-4 rounded-2xl flex items-center gap-4 group relative overflow-hidden ${colorClasses[color]}`}
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-current`} />

      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-current transition-colors duration-300">
        <Icon size={24} />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-white group-hover:text-current transition-colors duration-300">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-400 font-mono">
            {subtitle}
          </p>
        )}
      </div>

      <motion.div
        initial={{ x: -10, opacity: 0 }}
        whileHover={{ x: 0, opacity: 1 }}
        className="text-current"
      >
        <Icon size={16} />
      </motion.div>
    </motion.a>
  );
};
