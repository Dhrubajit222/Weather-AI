import { motion } from 'framer-motion'
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Eye,
  Cloud,
  Compass,
} from 'lucide-react'
import type { AppWeatherData } from '@/types'
import { formatTemperature, getWindDirection } from '@/utils'

interface WeatherCardProps {
  weather: AppWeatherData | null
  isLoading: boolean
}

function SkeletonDetail() {
  return (
    <div className="glass rounded-2xl p-4 animate-pulse">
      <div className="mb-3 h-3 w-16 rounded-full bg-text-muted/20" />
      <div className="h-6 w-20 rounded-full bg-text-muted/20" />
    </div>
  )
}

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: string
  index: number
}

function DetailItem({ icon, label, value, index }: DetailItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass rounded-2xl p-4 card-hover glass-glow"
    >
      <div className="mb-3 flex items-center gap-2 text-text-muted">
        <span className="h-4 w-4">{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </motion.div>
  )
}

export default function WeatherCard({ weather, isLoading }: WeatherCardProps) {
  if (isLoading) {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-3 h-8 w-48 rounded-full bg-text-muted/20 animate-pulse" />
            <div className="mx-auto h-4 w-64 rounded-full bg-text-muted/10 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonDetail key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (!weather) return null

  const details: Omit<DetailItemProps, 'index'>[] = [
    { icon: <Thermometer className="text-primary" />, label: 'Feels Like', value: formatTemperature(weather.feelsLike) },
    { icon: <Droplets className="text-blue-400" />, label: 'Humidity', value: `${weather.humidity}%` },
    { icon: <Wind className="text-cyan-400" />, label: 'Wind Speed', value: `${weather.windSpeed} km/h` },
    { icon: <Compass className="text-emerald-400" />, label: 'Wind Dir', value: getWindDirection(weather.windDeg) },
    { icon: <Gauge className="text-amber-400" />, label: 'Pressure', value: `${weather.pressure} hPa` },
    { icon: <Eye className="text-violet-400" />, label: 'Visibility', value: `${weather.visibility} km` },
    { icon: <Cloud className="text-sky-400" />, label: 'Cloud Cover', value: `${weather.cloud}%` },

  ]

  return (
    <section className="relative py-20">
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
          <h2 className="text-2xl font-bold sm:text-3xl text-text-primary">Current Weather</h2>
          <p className="mt-2 text-sm text-text-muted">Detailed weather conditions for {weather.city}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {details.map((detail, i) => (
            <DetailItem key={detail.label} {...detail} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
