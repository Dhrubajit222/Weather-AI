import { motion } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import SearchBar from '@/components/ui/SearchBar'
import ErrorMessages from '@/components/ui/ErrorMessages'
import EmptyState from '@/components/ui/EmptyState'
import WeatherBackground from '@/components/weather/WeatherBackground'
import type { AppWeatherData } from '@/types'
import type { WeatherError } from '@/hooks/useWeather'
import { formatTemperature, getWeatherIconUrl, getBackgroundClass } from '@/utils'

interface HeroProps {
  weather: AppWeatherData | null
  conditionClass: string | null
  errors: WeatherError[]
  isLoading: boolean
  isGeoLoading: boolean
  onSearch: (query: string) => void
  onLocate: () => void
  getSuggestions?: (query: string) => string[]
  recentSearches?: string[]
  onClearHistory?: () => void
}

function FloatingOrb({ className, delay = 0, size = 'h-32 w-32' }: { className: string; delay?: number; size?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full ${size} ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.06, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero({
  weather,
  conditionClass,
  errors,
  isLoading,
  isGeoLoading,
  onSearch,
  onLocate,
  getSuggestions,
  recentSearches,
  onClearHistory,
}: HeroProps) {
  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b transition-all duration-700 ${getBackgroundClass(conditionClass)}`}
    >
      <WeatherBackground condition={conditionClass} />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/15 blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary-light/5 blur-[120px]" />
        <FloatingOrb className="top-[20%] left-[20%] bg-primary/10" delay={0} size="h-40 w-40" />
        <FloatingOrb className="top-1/3 right-1/4 bg-accent/10" delay={1.5} size="h-28 w-28" />
        <FloatingOrb className="bottom-1/4 left-1/3 bg-accent-pink/10" delay={3} size="h-24 w-24" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <SearchBar
            onSearch={onSearch}
            onLocate={onLocate}
            isLocating={isGeoLoading}
            getSuggestions={getSuggestions}
            recentSearches={recentSearches}
            onClearHistory={onClearHistory}
          />
        </motion.div>

        <ErrorMessages errors={errors} />

        {!weather && !isLoading && (
          <EmptyState />
        )}

        {isLoading && !weather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm text-text-muted mt-8"
          >
            Loading weather data...
          </motion.div>
        )}

        {weather && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-text-secondary">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>Real-time weather powered by OpenWeather</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-8"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto mb-6 relative"
              >
                <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full" />
                <img
                  src={getWeatherIconUrl(weather.icon)}
                  alt={weather.description}
                  className="relative h-32 w-32 sm:h-36 sm:w-36 drop-shadow-2xl"
                />
              </motion.div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-text-primary">
                {weather.city}
                <span className="block mt-1 text-xl sm:text-2xl text-text-secondary font-normal">
                  {weather.country}
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <div className="text-8xl font-light tracking-tighter text-text-primary sm:text-9xl">
                {formatTemperature(weather.temperature)}
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-lg text-text-secondary">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{weather.city}, {weather.country}</span>
              </div>
              <p className="mt-1 text-base capitalize text-text-muted">{weather.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-6 text-sm text-text-muted"
            >
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                H: {formatTemperature(weather.tempMax)}
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-accent-pink shadow-lg shadow-accent-pink/50" />
                L: {formatTemperature(weather.tempMin)}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
