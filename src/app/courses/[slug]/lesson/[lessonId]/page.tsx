'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SAMPLE_COURSES, SAMPLE_LESSONS } from '@/lib/constants'
import { ArrowLeft, ArrowRight, CheckCircle, BookOpen, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'

export default function Page() {
  const params = useParams<{ slug: string; lessonId: string }>()
  const slug = params?.slug
  const lessonId = params?.lessonId
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const isAuth = localStorage.getItem('atribot_is_authenticated')
    if (!isAuth) {
      router.push('/kit_activation')
    }
  }, [router])

  const course = SAMPLE_COURSES.find(c => c.slug === slug)
  const lessons = SAMPLE_LESSONS.filter(l => l.courseId === course?.id)
  const lesson = lessons.find(l => l.id === lessonId)
  const currentIndex = lessons.findIndex(l => l.id === lessonId)
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Lesson not found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleComplete = () => {
    setIsCompleted(true)
    toast({
      title: 'Lesson Completed! 🎉',
      description: nextLesson ? 'Great job! Move on to the next lesson.' : 'Congratulations! You completed all lessons in this course!',
    })
  }

  const handleLogout = () => {
    localStorage.removeItem('atribot_user_level')
    localStorage.removeItem('atribot_is_authenticated')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between py-4 border-b border-border mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/courses/${slug}`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {course.title}
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">Lesson {currentIndex + 1} of {lessons.length}</span>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="aspect-video bg-muted rounded-2xl overflow-hidden mb-8">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Video player placeholder</p>
                  <p className="text-sm text-muted-foreground mt-2">In production, this would embed the lesson video</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-muted-foreground">Duration: {lesson.duration}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-card border-border mb-8">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Instructions</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground mb-4">{lesson.content}</p>
                    <p className="text-muted-foreground mb-4">Follow along with the video above to complete this lesson. Make sure you have all the parts from your Atribot kit ready before you begin!</p>
                    <h3 className="font-display text-lg font-semibold mb-3">What you'll need:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                      <li>Your Atribot kit components</li>
                      <li>A clear workspace</li>
                      <li>About {lesson.duration} of uninterrupted time</li>
                    </ul>
                    <h3 className="font-display text-lg font-semibold mb-3">Steps:</h3>
                    <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                      <li>Watch the entire video first before starting</li>
                      <li>Gather all required components</li>
                      <li>Follow along step by step with the video</li>
                      <li>Test your build when complete</li>
                      <li>Mark the lesson as complete!</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border mb-8">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Resources</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Assembly Diagram (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Parts List (PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {!isCompleted ? (
                <Button variant="hero" size="lg" className="w-full" onClick={handleComplete}>
                  <CheckCircle className="w-5 h-5" />
                  Mark as Completed
                </Button>
              ) : (
                <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 flex items-center gap-3 mb-6">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                  <span className="font-semibold text-secondary">Lesson Completed!</span>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {prevLesson ? (
                  <Button variant="outline" asChild>
                    <Link href={`/courses/${slug}/lesson/${prevLesson.id}`}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Link>
                  </Button>
                ) : (
                  <div />
                )}
                {nextLesson ? (
                  <Button variant="default" asChild>
                    <Link href={`/courses/${slug}/lesson/${nextLesson.id}`}>
                      Next Lesson
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="hero" asChild>
                    <Link href={`/courses/${slug}`}>
                      Finish Course
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
