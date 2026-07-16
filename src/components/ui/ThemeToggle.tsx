import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import type { Theme } from '@/types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative flex h-9 w-9 items-center justify-center rounded-full glass hover:scale-110 transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4 text-yellow-400" />
        ) : (
          <Moon className="h-4 w-4 text-text-secondary" />
        )}
      </motion.div>
    </button>
  )
}
