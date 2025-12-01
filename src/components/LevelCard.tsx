import { LEVELS, LevelId } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  level: LevelId;
  isUnlocked?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const LevelCard = ({ level, isUnlocked = false, isActive = false, onClick }: LevelCardProps) => {
  const levelInfo = LEVELS[level];

  return (
    <motion.div
      whileHover={isUnlocked ? { scale: 1.02 } : {}}
      whileTap={isUnlocked ? { scale: 0.98 } : {}}
    >
      <Card 
        className={cn(
          'relative overflow-hidden cursor-pointer transition-all duration-300',
          isUnlocked ? 'bg-card hover:border-primary/50' : 'bg-muted/50 opacity-60',
          isActive && 'border-2 border-primary glow-box'
        )}
        onClick={isUnlocked ? onClick : undefined}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl',
              isUnlocked ? levelInfo.color : 'bg-muted'
            )}>
              {levelInfo.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg">Level {levelInfo.number}</span>
                {!isUnlocked && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">🔒 Locked</span>
                )}
              </div>
              <h3 className="font-display text-xl font-semibold">{levelInfo.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{levelInfo.description}</p>
            </div>
          </div>

          {isUnlocked && (
            <div className="absolute top-4 right-4">
              <span className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-semibold">
                ✓ Unlocked
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
