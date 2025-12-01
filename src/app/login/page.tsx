'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/hooks/use-toast'
import { Mail, Lock, User, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import atribotLogo from '@/assets/atribot-logo.png'

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const hasKit = localStorage.getItem('atribot_user_level')
    if (hasKit) {
      localStorage.setItem('atribot_is_authenticated', 'true')
      toast({ title: 'Welcome back! 👋', description: 'You have been logged in successfully.' })
      router.push('/dashboard')
    } else {
      toast({ title: 'No kit activated', description: 'Please activate your kit first.' })
      router.push('/kit_activation')
    }
    setIsLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast({ title: 'Account created! 🎉', description: 'Now activate your kit to start learning.' })
    router.push('/kit_activation')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <img src={(typeof atribotLogo === 'string' ? atribotLogo : (atribotLogo as any).src)} alt="Atribot" className="w-16 h-16 mx-auto mb-4" />
              <h1 className="font-display text-3xl font-bold mb-2">Welcome to Atribot</h1>
              <p className="text-muted-foreground">Sign in to continue your robotics journey</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-border">
                <Tabs defaultValue="login">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                  </CardHeader>
                  <CardContent>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input id="login-email" type="email" placeholder="your@email.com" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input id="login-password" type="password" placeholder="••••••••" className="pl-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                          </div>
                        </div>
                        <Button variant="hero" className="w-full" disabled={isLoading}>
                          {isLoading ? (<Loader2 className="w-5 h-5 animate-spin" />) : ('Sign In')}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="signup">
                      <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-name">Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input id="signup-name" type="text" placeholder="Your name" className="pl-10" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input id="signup-email" type="email" placeholder="your@email.com" className="pl-10" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input id="signup-password" type="password" placeholder="••••••••" className="pl-10" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                          </div>
                        </div>
                        <Button variant="hero" className="w-full" disabled={isLoading}>
                          {isLoading ? (<Loader2 className="w-5 h-5 animate-spin" />) : ('Create Account')}
                        </Button>
                      </form>
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center text-sm text-muted-foreground mt-6">
              Don't have a kit?{' '}
              <Link href="/kit_activation" className="text-primary hover:underline">Learn more</Link>
            </motion.p>
          </div>
        </div>
      </main>
    </div>
  )
}
