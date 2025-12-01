"use client";
import Link from 'next/link';
import { Bot, Mail, Phone, MapPin } from 'lucide-react';
import atribotLogo from '@/assets/atribot-logo.png';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={atribotLogo} alt="Atribot" className="w-10 h-10" />
              <span className="font-display text-xl font-bold text-primary">Atribot</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Empowering kids to build the future through robotics and STEM education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/kit_activation" className="hover:text-primary transition-colors">Activate Kit</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Levels */}
          <div>
            <h4 className="font-display font-semibold mb-4">Kit Levels</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🤖 Level 1 – Starter Bot</li>
              <li>⚙️ Level 2 – Gear Builder</li>
              <li>🔍 Level 3 – Robot Explorer</li>
              <li>⚡ Level 4 – Circuit Master</li>
              <li>🏆 Level 5 – Atribot Pro</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                hello@atribot.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Bangalore, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Atribot. All rights reserved. Building future innovators 🚀</p>
        </div>
      </div>
    </footer>
  );
};
