import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloudSun, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/constants'
import ThemeToggle from '@/components/ui/ThemeToggle'
import type { Theme } from '@/types'

interface NavbarProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-2xl border-b border-glass-border" />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5 group" aria-label="Weather AI Home">
          <div className="relative">
            <div className="absolute inset-0 blur-lg bg-primary/30 rounded-full group-hover:bg-primary/50 transition-all" />
            <CloudSun className="relative h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            Weather <span className="text-gradient">AI</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-all duration-200 relative group focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded-sm"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full glass md:hidden focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="h-4 w-4 text-text-primary" /> : <Menu className="h-4 w-4 text-text-primary" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-b border-glass-border bg-surface/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  className="rounded-xl px-4 py-2.5 text-sm text-text-secondary hover:bg-glass-hover hover:text-text-primary transition-all focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
