import { LEVELS, LevelId } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LevelBadgeProps {
  level: LevelId;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const LevelBadge = ({ level, size = 'md', showIcon = true, className }: LevelBadgeProps) => {
  const levelInfo = LEVELS[level];
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'level-badge font-display',
        levelInfo.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <span>{levelInfo.icon}</span>}
      <span>Level {levelInfo.number} – {levelInfo.name}</span>
    </motion.div>
  );
};
