import { motion } from 'framer-motion'
import { CloudSun } from 'lucide-react'

export default function PremiumLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface">
      <motion.div
        animate={{
          y: [0, -12, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full" />
        <CloudSun className="relative h-20 w-20 text-primary" />
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg font-semibold text-text-primary"
        >
          Weather <span className="text-gradient">AI</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          className="text-sm text-text-muted"
        >
          Loading your weather data...
        </motion.div>
      </div>

      <div className="mt-4 flex gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            className="h-2 w-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  )
}
