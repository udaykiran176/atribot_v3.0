import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LevelBadge } from '@/components/LevelBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LEVELS, LevelId, SAMPLE_COURSES, SAMPLE_LESSONS } from '@/lib/constants';
import { Play, Clock, BookOpen, CheckCircle, Circle, ArrowLeft, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CourseDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState<LevelId>('LEVEL_1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['1']);

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
  }, [navigate]);

  const course = SAMPLE_COURSES.find(c => c.slug === slug);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Course not found</h1>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const levelInfo = LEVELS[course.level];
  const userLevelInfo = LEVELS[userLevel];
  const isUnlocked = levelInfo.number <= userLevelInfo.number;
  const lessons = SAMPLE_LESSONS.filter(l => l.courseId === course.id);
  const progress = Math.round((completedLessons.length / lessons.length) * 100);

  const handleLogout = () => {
    localStorage.removeItem('atribot_user_level');
    localStorage.removeItem('atribot_is_authenticated');
    navigate('/');
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isAuthenticated onLogout={handleLogout} />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-4">Course Locked</h1>
              <p className="text-muted-foreground mb-6">
                This course requires Level {levelInfo.number} - {levelInfo.name}. 
                Upgrade your kit to unlock it!
              </p>
              <Button asChild>
                <Link to="/courses">Back to Courses</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Button variant="ghost" asChild>
              <Link to="/courses">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Course Header */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 mb-6 flex items-center justify-center">
                  <span className="text-8xl">{levelInfo.icon}</span>
                </div>

                <LevelBadge level={course.level} className="mb-4" />
                
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>
                
                <p className="text-muted-foreground text-lg mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Course Description */}
                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-4">What you'll learn</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>Understand the fundamentals of robotics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>Build hands-on projects with your kit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>Learn problem-solving skills through robotics</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <span>Complete fun challenges and projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Lessons */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-card border-border sticky top-24">
                  <CardContent className="p-6">
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Course Progress</span>
                        <span className="text-primary font-semibold">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <h3 className="font-display text-lg font-semibold mb-4">Lessons</h3>
                    
                    <div className="space-y-2">
                      {lessons.map((lesson, index) => {
                        const isCompleted = completedLessons.includes(lesson.id);
                        const isCurrent = index === completedLessons.length;
                        
                        return (
                          <Link
                            key={lesson.id}
                            to={`/courses/${slug}/lesson/${lesson.id}`}
                            className={cn(
                              'flex items-center gap-3 p-3 rounded-lg transition-colors',
                              isCurrent && 'bg-primary/10 border border-primary/30',
                              !isCurrent && 'hover:bg-muted'
                            )}
                          >
                            <div className={cn(
                              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                              isCompleted && 'bg-secondary text-secondary-foreground',
                              isCurrent && 'bg-primary text-primary-foreground',
                              !isCompleted && !isCurrent && 'bg-muted text-muted-foreground'
                            )}>
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={cn(
                                'font-medium text-sm truncate',
                                isCompleted && 'text-muted-foreground'
                              )}>
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                            </div>
                            {isCurrent && <Play className="w-4 h-4 text-primary" />}
                          </Link>
                        );
                      })}
                    </div>

                    <Button variant="hero" className="w-full mt-6" asChild>
                      <Link to={`/courses/${slug}/lesson/1`}>
                        <Play className="w-4 h-4" />
                        {completedLessons.length > 0 ? 'Continue Learning' : 'Start Course'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
