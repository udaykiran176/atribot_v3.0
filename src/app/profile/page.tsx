'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LevelBadge } from '@/components/LevelBadge'
import { LevelCard } from '@/components/LevelCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { LEVELS, LevelId } from '@/lib/constants'
import { User, Mail, Trophy, BookOpen, Clock, Award, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import atribotLogo from '@/assets/atribot-logo.png'

export default function Page() {
  const router = useRouter()
  const [userLevel, setUserLevel] = useState<LevelId>('LEVEL_1')
  const [userName, setUserName] = useState('Explorer')
  const [userEmail, setUserEmail] = useState('explorer@atribot.in')

  useEffect(() => {
    const storedLevel = localStorage.getItem('atribot_user_level') as LevelId
    const isAuth = localStorage.getItem('atribot_is_authenticated')
    if (!isAuth) {
      router.push('/kit_activation')
      return
    }
    if (storedLevel && LEVELS[storedLevel]) {
      setUserLevel(storedLevel)
    }
  }, [router])

  const levelInfo = LEVELS[userLevel]
  const achievements = [
    { icon: '🚀', title: 'First Steps', description: 'Completed your first lesson' },
    { icon: '🤖', title: 'Robot Builder', description: 'Built your first robot' },
    { icon: '⭐', title: 'Quick Learner', description: 'Completed 5 lessons in one day' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('atribot_user_level')
    localStorage.removeItem('atribot_is_authenticated')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 mb-8">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-card border-4 border-primary/30 flex items-center justify-center">
                        <img src={(typeof atribotLogo === 'string' ? atribotLogo : (atribotLogo as any).src)} alt="Avatar" className="w-20 h-20" />
                      </div>
                      <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="font-display text-3xl font-bold mb-2">{userName}</h1>
                      <p className="text-muted-foreground mb-3">{userEmail}</p>
                      <LevelBadge level={userLevel} size="lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-card border-border h-full">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2"><Trophy className="w-5 h-5 text-primary" />Your Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-primary" /><span>Courses Completed</span></div>
                      <span className="font-bold text-xl">2</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-primary" /><span>Hours Learned</span></div>
                      <span className="font-bold text-xl">4.5</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3"><Award className="w-5 h-5 text-primary" /><span>Achievements</span></div>
                      <span className="font-bold text-xl">3</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Progress to Next Level</span><span className="text-primary font-semibold">65%</span></div>
                      <Progress value={65} className="h-3" />
                      <p className="text-xs text-muted-foreground mt-2">Complete 2 more courses to unlock Level {levelInfo.number + 1}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-card border-border h-full">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2"><Award className="w-5 h-5 text-secondary" />Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.map((achievement) => (
                      <div key={achievement.title} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                        <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-2xl">{achievement.icon}</div>
                        <div>
                          <p className="font-semibold">{achievement.title}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-6">
              <h2 className="font-display text-xl font-bold mb-4">Your Level</h2>
              <LevelCard level={userLevel} isUnlocked isActive />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><Settings className="w-5 h-5" />Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                  </div>
                  <Button variant="default">Save Changes</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
