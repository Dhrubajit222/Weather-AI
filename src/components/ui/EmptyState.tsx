import { motion } from 'framer-motion'
import { CloudSun, Search, MapPin, Sparkles } from 'lucide-react'

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full" />
          <CloudSun className="relative h-24 w-24 text-primary" />
        </div>
      </motion.div>

      <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-text-secondary">
        <Sparkles className="h-3.5 w-3.5 text-primary" />
        <span>Real-time weather powered by OpenWeather</span>
      </div>

      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-text-primary">
        Weather <span className="text-gradient">AI</span>
      </h1>

      <p className="mb-8 max-w-md text-base text-text-secondary leading-relaxed">
        Search for any city worldwide or use your current location to get accurate weather data.
      </p>

      <div className="flex flex-col items-center gap-3 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <span>Type a city name and press Enter</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-accent" />
          <span>Click the target icon for your location</span>
        </div>
      </div>
    </motion.div>
  )
}
