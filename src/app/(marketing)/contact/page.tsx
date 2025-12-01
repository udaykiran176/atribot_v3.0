"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <p className="text-center text-muted-foreground mb-8">
              We'd love to hear from you! Whether you have a question, feedback, or just want to say hi, feel free to reach out to us.
            </p>
            <div className="bg-card p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div>
                  <Label >Name</Label>
                  <Input id="name" name="name" placeholder="Your name" />
                </div>
                <div>
                  <Label >Email</Label>
                  <Input id="email" name="email" placeholder="Your email" />
                </div>
                <div>
                  <Label >Message</Label>
                  <textarea id="message" name="message" placeholder="Your message" rows={4} className="w-full p-2 border border-input rounded-md"></textarea>
                </div>
                <div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
