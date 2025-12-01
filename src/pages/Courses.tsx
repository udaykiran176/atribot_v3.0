import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CourseCard } from '@/components/CourseCard';
import { LevelBadge } from '@/components/LevelBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LEVELS, LevelId, SAMPLE_COURSES } from '@/lib/constants';
import { Search, Filter, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Courses = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userLevel, setUserLevel] = useState<LevelId>('LEVEL_1');
  const [selectedLevel, setSelectedLevel] = useState<LevelId | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedLevel = localStorage.getItem('atribot_user_level') as LevelId;
    const isAuth = localStorage.getItem('atribot_is_authenticated');
    
    if (!isAuth) {
      navigate('/kit_activation');
      return;
    }
    
    if (storedLevel && LEVELS[storedLevel]) {
      setUserLevel(storedLevel);
    }

    // Check for level filter from URL
    const levelParam = searchParams.get('level') as LevelId;
    if (levelParam && LEVELS[levelParam]) {
      setSelectedLevel(levelParam);
    }
  }, [navigate, searchParams]);

  const levelInfo = LEVELS[userLevel];
  
  // Filter courses based on user's unlocked level
  const unlockedCourses = SAMPLE_COURSES.filter(
    course => LEVELS[course.level].number <= levelInfo.number
  );

  // Apply additional filters
  const filteredCourses = unlockedCourses.filter(course => {
    const matchesLevel = selectedLevel === 'ALL' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleLogout = () => {
    localStorage.removeItem('atribot_user_level');
    localStorage.removeItem('atribot_is_authenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Your Courses
            </h1>
            <p className="text-muted-foreground">
              Courses unlocked with your <span className="text-primary">{levelInfo.name}</span> kit
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Level Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLevel === 'ALL' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel('ALL')}
              >
                All Levels
              </Button>
              {(Object.keys(LEVELS) as LevelId[]).map((levelId) => {
                const level = LEVELS[levelId];
                const isUnlocked = level.number <= levelInfo.number;
                
                return (
                  <Button
                    key={levelId}
                    variant={selectedLevel === levelId ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(levelId)}
                    disabled={!isUnlocked}
                    className={cn(!isUnlocked && 'opacity-50')}
                  >
                    {level.icon} Level {level.number}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <CourseCard
                    {...course}
                    progress={index < 2 ? Math.floor(Math.random() * 70) + 10 : 0}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Bot className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </motion.div>
          )}

          {/* Locked Courses Hint */}
          {levelInfo.number < 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                <span>🔒</span>
                <span>
                  Unlock more courses by upgrading to{' '}
                  <span className="text-primary">Level {levelInfo.number + 1}</span>
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
