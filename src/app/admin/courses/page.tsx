'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import { LEVELS, LevelId, SAMPLE_COURSES } from '@/lib/constants'
import { Plus, Search, Edit, Trash2, GripVertical } from 'lucide-react'
import { motion } from 'framer-motion'

interface Course {
  id: string
  title: string
  slug: string
  level: LevelId
  description: string
  thumbnail: string
  lessonsCount: number
  duration: string
  published: boolean
}

export default function Page() {
  const [courses, setCourses] = useState<Course[]>(SAMPLE_COURSES.map(c => ({ ...c, published: true })))
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState<string>('ALL')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formLevel, setFormLevel] = useState<LevelId>('LEVEL_1')

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = filterLevel === 'ALL' || course.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const resetForm = () => {
    setFormTitle('')
    setFormDescription('')
    setFormLevel('LEVEL_1')
    setEditingCourse(null)
  }

  const handleCreate = () => {
    if (!formTitle.trim()) {
      toast({ title: 'Error', description: 'Please enter a course title.' })
      return
    }
    const newCourse: Course = { id: Date.now().toString(), title: formTitle, slug: formTitle.toLowerCase().replace(/\s+/g, '-'), level: formLevel, description: formDescription, thumbnail: '/placeholder.svg', lessonsCount: 0, duration: '0 hours', published: false }
    setCourses([newCourse, ...courses])
    setIsCreateOpen(false)
    resetForm()
    toast({ title: 'Course Created! 🎉', description: `${formTitle} has been created.` })
  }

  const handleUpdate = () => {
    if (!editingCourse || !formTitle.trim()) return
    setCourses(courses.map(c => (c.id === editingCourse.id ? { ...c, title: formTitle, description: formDescription, level: formLevel } : c)))
    setEditingCourse(null)
    resetForm()
    toast({ title: 'Course Updated!', description: 'Changes have been saved.' })
  }

  const handleDelete = (id: string) => {
    setCourses(courses.filter(c => c.id !== id))
    toast({ title: 'Course Deleted', description: 'The course has been removed.' })
  }

  const togglePublish = (id: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, published: !c.published } : c)))
  }

  const openEdit = (course: Course) => {
    setFormTitle(course.title)
    setFormDescription(course.description)
    setFormLevel(course.level)
    setEditingCourse(course)
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-1 gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input placeholder="Search courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="All Levels" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Levels</SelectItem>
              {(Object.keys(LEVELS) as LevelId[]).map(level => (
                <SelectItem key={level} value={level}>{LEVELS[level].icon} Level {LEVELS[level].number}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={resetForm}><Plus className="w-4 h-4 mr-2" />New Course</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Create New Course</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2"><Label>Course Title</Label><Input placeholder="e.g., Introduction to Robotics" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} /></div>
              <div className="space-y-2"><Label>Description</Label><Textarea placeholder="Describe what students will learn..." value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} /></div>
              <div className="space-y-2">
                <Label>Kit Level</Label>
                <Select value={formLevel} onValueChange={(v) => setFormLevel(v as LevelId)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {(Object.keys(LEVELS) as LevelId[]).map(level => (
                      <SelectItem key={level} value={level}>{LEVELS[level].icon} Level {LEVELS[level].number} – {LEVELS[level].name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button variant="hero" className="w-full" onClick={handleCreate}>Create Course</Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex text-muted-foreground cursor-grab"><GripVertical className="w-5 h-5" /></div>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{LEVELS[course.level].icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold truncate">{course.title}</h3>
                      {!course.published && (<Badge variant="secondary">Draft</Badge>)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{course.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <Badge className={LEVELS[course.level].color}>Level {LEVELS[course.level].number}</Badge>
                      <span>{course.lessonsCount} lessons</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`publish-${course.id}`} className="text-sm text-muted-foreground">Published</Label>
                      <Switch id={`publish-${course.id}`} checked={course.published} onCheckedChange={() => togglePublish(course.id)} />
                    </div>
                    <Dialog open={editingCourse?.id === course.id} onOpenChange={(open) => !open && setEditingCourse(null)}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => openEdit(course)}><Edit className="w-4 h-4" /></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle className="font-display">Edit Course</DialogTitle></DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2"><Label>Course Title</Label><Input value={formTitle} onChange={(e) => setFormTitle(e.target.value)} /></div>
                          <div className="space-y-2"><Label>Description</Label><Textarea value={formDescription} onChange={(e) => setFormDescription(e.target.value)} rows={3} /></div>
                          <div className="space-y-2">
                            <Label>Kit Level</Label>
                            <Select value={formLevel} onValueChange={(v) => setFormLevel(v as LevelId)}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {(Object.keys(LEVELS) as LevelId[]).map(level => (
                                  <SelectItem key={level} value={level}>{LEVELS[level].icon} Level {LEVELS[level].number} – {LEVELS[level].name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button variant="hero" className="w-full" onClick={handleUpdate}>Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <h3 className="font-display text-lg font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">Create your first course to get started.</p>
        </div>
      )}
    </div>
  )
}
