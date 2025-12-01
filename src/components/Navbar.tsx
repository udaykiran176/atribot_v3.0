"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bot, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import atribotLogo from '@/assets/atribot-logo.png';
interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}
export const Navbar = ({
  isAuthenticated = false,
  onLogout
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = isAuthenticated ? [{
    href: '/dashboard',
    label: 'Dashboard'
  }, {
    href: '/courses',
    label: 'Courses'
  }, {
    href: '/profile',
    label: 'Profile'
  }] : [{
    href: '/',
    label: 'Home'
  },
  {href : '/store', label: 'Store'},
   {
    href: '/kit_activation',
    label: 'Activate Kit'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src={(typeof atribotLogo === 'string' ? atribotLogo : (atribotLogo as any).src)} alt="Atribot" className="w-10 h-10" />
            <span className="font-display text-xl font-bold text-primary">Atribot </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary' : 'text-muted-foreground'}`}>
                {link.label}
              </Link>)}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile">
                    <User className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </> : <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="hero" asChild>
                  <Link href="/kit_activation">Activate Kit</Link>
                </Button>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-card border-b border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map(link => <Link key={link.href} href={link.href} className="text-foreground hover:text-primary py-2" onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>)}
              {!isAuthenticated && <Button variant="hero" className="w-full" asChild>
                  <Link href="/kit_activation">Activate Kit</Link>
                </Button>}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};
