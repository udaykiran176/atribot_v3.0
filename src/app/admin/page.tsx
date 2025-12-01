'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Key, BookOpen, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Page() {
  const stats = [
    { label: 'Total License Keys', value: '156', icon: Key, color: 'text-primary' },
    { label: 'Active Users', value: '89', icon: Users, color: 'text-secondary' },
    { label: 'Total Courses', value: '7', icon: BookOpen, color: 'text-atribot-yellow' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/license" className="h-20 flex items-center justify-center gap-2 rounded-md border hover:bg-muted">
              <Key className="w-6 h-6" />
              Generate License Keys
            </Link>
            <Link href="/admin/courses" className="h-20 flex items-center justify-center gap-2 rounded-md border hover:bg-muted">
              <BookOpen className="w-6 h-6" />
              Manage Courses
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-display">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[{ action: 'New key activated', detail: 'AB12-CD34-EF56-GH01 by user@example.com', time: '5 min ago' }, { action: 'License key generated', detail: '10 new Level 2 keys', time: '1 hour ago' }, { action: 'Course updated', detail: 'Introduction to Robotics', time: '2 hours ago' }].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
