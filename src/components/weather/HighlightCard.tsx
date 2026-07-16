import { motion } from 'framer-motion'
import { Sunrise, Sunset, Wind, Droplets, Gauge, Eye } from 'lucide-react'
import type { AppWeatherData } from '@/types'
import { getWindDirection, formatTime } from '@/utils'

interface HighlightCardProps {
  weather: AppWeatherData | null
  isLoading: boolean
}

interface HighlightItemProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  index: number
}

function SkeletonHighlight() {
  return (
    <div className="glass rounded-2xl p-6 animate-pulse">
      <div className="mb-4 h-3 w-20 rounded-full bg-text-muted/20" />
      <div className="mb-1 h-7 w-24 rounded-full bg-text-muted/20" />
      <div className="h-3 w-16 rounded-full bg-text-muted/10" />
    </div>
  )
}

function HighlightItem({ icon, label, value, sub, index }: HighlightItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass rounded-2xl p-6 card-hover glass-glow"
    >
      <div className="mb-4 flex items-center gap-2 text-text-muted">
        <span className="h-5 w-5">{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-text-primary">{value}</p>
      {sub && <p className="mt-1 text-xs text-text-muted">{sub}</p>}
    </motion.div>
  )
}

export default function HighlightCard({ weather, isLoading }: HighlightCardProps) {
  if (isLoading) {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-3 h-8 w-48 rounded-full bg-text-muted/20 animate-pulse" />
            <div className="mx-auto h-4 w-64 rounded-full bg-text-muted/10 animate-pulse" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonHighlight key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!weather) return null

  const sunriseTime = formatTime(weather.sunrise, weather.timezone)
  const sunsetTime = formatTime(weather.sunset, weather.timezone)

  const items: Omit<HighlightItemProps, 'index'>[] = [
    { icon: <Sunrise className="text-orange-400" />, label: 'Sunrise', value: sunriseTime, sub: 'Good morning!' },
    { icon: <Sunset className="text-pink-400" />, label: 'Sunset', value: sunsetTime, sub: 'Enjoy the evening' },
    { icon: <Wind className="text-cyan-400" />, label: 'Wind', value: `${weather.windSpeed} km/h`, sub: `Direction: ${getWindDirection(weather.windDeg)}` },
    { icon: <Droplets className="text-blue-400" />, label: 'Humidity', value: `${weather.humidity}%`, sub: weather.humidity > 70 ? 'High humidity' : weather.humidity < 30 ? 'Low humidity' : 'Comfortable' },
    { icon: <Gauge className="text-amber-400" />, label: 'Pressure', value: `${weather.pressure} hPa`, sub: weather.pressure > 1020 ? 'High pressure' : weather.pressure < 1010 ? 'Low pressure' : 'Normal' },
    { icon: <Eye className="text-violet-400" />, label: 'Visibility', value: `${weather.visibility} km`, sub: weather.visibility > 10 ? 'Excellent view' : weather.visibility > 5 ? 'Good view' : 'Limited view' },
  ]

  return (
    <section id="highlights" className="relative py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/3 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold sm:text-3xl text-text-primary">Weather Highlights</h2>
          <p className="mt-2 text-sm text-text-muted">Today's weather at a glance</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <HighlightItem key={item.label} {...item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
