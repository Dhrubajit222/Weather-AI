import { motion } from 'framer-motion'
import { formatTemperature, getWeatherIconUrl } from '@/utils'
import type { AppHourlyForecast, AppDailyForecast } from '@/types'

interface ForecastCardProps {
  hourly: AppHourlyForecast[]
  daily: AppDailyForecast[]
  isLoading: boolean
  cityName?: string
}

function HourlySection({ data }: { data: AppHourlyForecast[] }) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {data.map((hour, i) => (
        <motion.div
          key={`${hour.time}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          whileHover={{ y: -6, scale: 1.04 }}
          className="flex min-w-[95px] flex-col items-center gap-2 rounded-2xl glass p-4 card-hover glass-glow cursor-pointer"
        >
          <span className="text-xs font-medium text-text-muted">{hour.time}</span>
          <img src={getWeatherIconUrl(hour.icon)} alt={hour.condition} className="h-9 w-9" />
          <span className="text-sm font-semibold text-text-primary">{formatTemperature(hour.temperature)}</span>
        </motion.div>
      ))}
    </div>
  )
}

function DailySection({ data }: { data: AppDailyForecast[] }) {
  return (
    <div className="flex flex-col gap-2">
      {data.map((day, i) => (
        <motion.div
          key={day.day + day.date}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          whileHover={{ scale: 1.01, x: 4 }}
          className="glass flex items-center justify-between rounded-2xl px-5 py-3.5 card-hover cursor-pointer"
        >
          <div className="flex w-20 items-center gap-3">
            <img src={getWeatherIconUrl(day.icon)} alt={day.condition} className="h-9 w-9" />
            <span className="text-sm font-medium text-text-primary">{day.day}</span>
          </div>

          <div className="hidden text-xs text-text-muted sm:block">{day.date}</div>

          <div className="flex w-24 items-center gap-2 text-sm">
            <span className="font-semibold text-text-primary">{formatTemperature(day.tempHigh)}</span>
            <span className="text-text-muted/50">/</span>
            <span className="text-text-muted">{formatTemperature(day.tempLow)}</span>
          </div>

          <div className="flex w-16 items-center gap-1.5 text-xs">
            <div className="flex h-1.5 w-1.5 items-center justify-center">
              <div className={`h-full w-full rounded-full ${day.chanceOfRain > 60 ? 'bg-primary' : day.chanceOfRain > 30 ? 'bg-primary/60' : 'bg-text-muted/30'}`} />
            </div>
            <span className="text-text-muted">{day.chanceOfRain}%</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function SkeletonHourly() {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex min-w-[95px] flex-col items-center gap-2 rounded-2xl glass p-4 animate-pulse">
          <div className="h-3 w-12 rounded-full bg-text-muted/20" />
          <div className="h-9 w-9 rounded-full bg-text-muted/20" />
          <div className="h-4 w-14 rounded-full bg-text-muted/20" />
        </div>
      ))}
    </div>
  )
}

function SkeletonDaily() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="glass flex items-center justify-between rounded-2xl px-5 py-3.5 animate-pulse">
          <div className="flex w-20 items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-text-muted/20" />
            <div className="h-4 w-10 rounded-full bg-text-muted/20" />
          </div>
          <div className="h-4 w-16 rounded-full bg-text-muted/20" />
          <div className="h-4 w-20 rounded-full bg-text-muted/20" />
          <div className="h-4 w-12 rounded-full bg-text-muted/20" />
        </div>
      ))}
    </div>
  )
}

export default function ForecastCard({ hourly, daily, isLoading, cityName }: ForecastCardProps) {
  return (
    <section id="forecast" className="relative py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 h-80 w-80 rounded-full bg-accent/5 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-bold sm:text-3xl text-text-primary">Hourly Forecast</h2>
          <p className="mt-2 text-sm text-text-muted">
            {cityName ? `Weather forecast for ${cityName}` : 'Weather forecast for the next 12 hours'}
          </p>
        </motion.div>

        <div className="mb-16">
          {isLoading ? <SkeletonHourly /> : <HourlySection data={hourly} />}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold sm:text-3xl text-text-primary">5-Day Forecast</h2>
          <p className="mt-2 text-sm text-text-muted">5-day weather outlook</p>
        </motion.div>

        {isLoading ? <SkeletonDaily /> : <DailySection data={daily} />}
      </div>
    </section>
  )
}
