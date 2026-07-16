import { memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, MapPinOff, WifiOff, KeyRound, Ban } from 'lucide-react'
import type { WeatherError } from '@/hooks/useWeather'

const errorIcons: Record<string, React.ReactNode> = {
  not_found: <MapPinOff className="h-4 w-4" />,
  network: <WifiOff className="h-4 w-4" />,
  location_denied: <MapPinOff className="h-4 w-4" />,
  api_limit: <Ban className="h-4 w-4" />,
  api_key: <KeyRound className="h-4 w-4" />,
  unknown: <AlertCircle className="h-4 w-4" />,
}

const errorStyles: Record<string, string> = {
  not_found: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
  network: 'bg-red-500/10 border-red-500/20 text-red-400',
  location_denied: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  api_limit: 'bg-red-500/10 border-red-500/20 text-red-400',
  api_key: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  unknown: 'bg-red-500/10 border-red-500/20 text-red-400',
}

interface ErrorMessagesProps {
  errors: WeatherError[]
}

const ErrorMessages = memo(function ErrorMessages({ errors }: ErrorMessagesProps) {
  if (!errors.length) return null

  return (
    <div className="mx-auto max-w-lg space-y-2 px-4 mt-4" role="alert" aria-live="polite">
      <AnimatePresence>
        {errors.map((err, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm backdrop-blur-sm ${errorStyles[err.type] || errorStyles.unknown}`}
          >
            <span className="shrink-0">{errorIcons[err.type] || errorIcons.unknown}</span>
            <span>{err.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
})

export default ErrorMessages
