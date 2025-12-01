import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LevelBadge } from '@/components/LevelBadge';
import { CourseCard } from '@/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LEVELS, LevelId, SAMPLE_COURSES } from '@/lib/constants';
import { Bot, BookOpen, Trophy, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import atribotLogo from '@/assets/atribot-logo.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState<LevelId>('LEVEL_1');
  const [userName] = useState('Explorer');

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

  const levelInfo = LEVELS[userLevel];
  const userCourses = SAMPLE_COURSES.filter(
    course => LEVELS[course.level].number <= levelInfo.number
  );

  const stats = [
    { icon: BookOpen, label: 'Courses Available', value: userCourses.length },
    { icon: Trophy, label: 'Completed', value: 2 },
    { icon: Clock, label: 'Hours Learned', value: '4.5' },
  ];

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
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-card border-4 border-primary/30 flex items-center justify-center">
                      <img src={atribotLogo} alt="Avatar" className="w-16 h-16" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                      {levelInfo.number}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-sm text-primary font-medium">Welcome back!</span>
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                      Hello, {userName}! 👋
                    </h1>
                    <LevelBadge level={userLevel} size="md" />
                    <p className="text-muted-foreground text-sm mt-2">
                      {levelInfo.description}
                    </p>
                  </div>

                  {/* Continue Learning */}
                  <div className="hidden md:block">
                    <Button variant="hero" size="lg" asChild>
                      <Link to="/courses">
                        Continue Learning
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Level {levelInfo.number} Progress</span>
                      <span className="text-primary font-semibold">35%</span>
                    </div>
                    <Progress value={35} className="h-3" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Complete more lessons to advance to the next level!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continue Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Your Courses</h2>
              <Button variant="ghost" asChild>
                <Link to="/courses">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCourses.slice(0, 3).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <CourseCard
                    {...course}
                    progress={index === 0 ? 65 : index === 1 ? 30 : 0}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
