'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { LevelCard } from '@/components/LevelCard'
import { LEVELS, LevelId } from '@/lib/constants'
import { Bot, Cpu, Lightbulb, Rocket, Users, Award, ArrowRight, Play, Sparkles, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  { icon: Bot, title: 'Hands-On Learning', description: 'Build real robots with our carefully designed STEM kits' },
  { icon: Cpu, title: 'Progressive Levels', description: '5 levels from beginner to advanced robotics' },
  { icon: Lightbulb, title: 'Video Lessons', description: 'Step-by-step video tutorials for each project' },
  { icon: Users, title: 'For Kids 6-16', description: 'Age-appropriate content that grows with your child' },
]

const stats = [
  { value: '10K+', label: 'Happy Students' },
  { value: '50+', label: 'Projects' },
  { value: '100+', label: 'Video Lessons' },
  { value: '5', label: 'Skill Levels' },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 robot-grid opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

        <div className="container mx-auto relative z-10 px-[12px]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="my-[10px]"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Robotics Education for Kids</span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Build the{' '}
                <span className="glow-text">Future</span>
                <br />
                with Robotics
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Empower your child with hands-on robotics education. From building simple bots to programming autonomous machines – one level at a time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link href="/kit_activation">
                    <Rocket className="w-5 h-5" />
                    Activate Your Kit
                  </Link>
                </Button>
                <Button variant="neon" size="xl" asChild>
                  <Link href="/store">
                    <ShoppingCart className="w-5 h-5" />
                    Buy the Kit
                  </Link>
                </Button>
                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-4xl md:text-5xl font-bold glow-text mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-primary">Atribot</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform combines physical STEM kits with digital courses for a complete learning experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              5 Levels of <span className="text-secondary">Discovery</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each kit unlocks a new level of robotics mastery. Start from basics and progress to building autonomous robots!
            </p>
          </motion.div>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {(Object.keys(LEVELS) as LevelId[]).map((levelId, index) => (
              <motion.div
                key={levelId}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <LevelCard level={levelId} isUnlocked={index < 2} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link href="/kit_activation">
                Get Your Kit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
              <Award className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Ready to Start Building?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Get your Atribot kit, scan the QR code, and begin your robotics adventure today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="xl" asChild>
                  <Link href="/kit_activation">
                    <Rocket className="w-5 h-5" />
                    Activate Kit Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
