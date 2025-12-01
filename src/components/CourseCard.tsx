"use client";
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LevelBadge } from './LevelBadge';
import { LEVELS, LevelId } from '@/lib/constants';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  level: LevelId;
  description: string;
  thumbnail: string;
  lessonsCount: number;
  duration: string;
  progress?: number;
}

export const CourseCard = ({
  id,
  title,
  slug,
  level,
  description,
  thumbnail,
  lessonsCount,
  duration,
  progress,
}: CourseCardProps) => {
  const levelInfo = LEVELS[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-card border-border card-hover h-full flex flex-col">
        <div className="relative aspect-video bg-muted overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-6xl">{levelInfo.icon}</span>
          </div>
          <div className="absolute top-3 left-3">
            <LevelBadge level={level} size="sm" showIcon={false} />
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <h3 className="font-display text-lg font-semibold line-clamp-2">{title}</h3>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lessonsCount} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          {progress !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary font-semibold">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button className="w-full" variant="outline" asChild>
            <Link href={`/courses/${slug}`}>
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
