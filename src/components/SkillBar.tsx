import { motion } from "motion/react";

interface SkillBarProps {
  key?: string | number;
  name: string;
  level: number; // 0 to 100
  color: string;
}

export const SkillBar = ({ name, level, color }: SkillBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs font-mono">
        <span className="text-gray-300">{name}</span>
        <span style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
};
