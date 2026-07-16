export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@4x.png`
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return directions[Math.round(degrees / 45) % 8]
}

export function formatTime(ts: number, timezone: number): string {
  const date = new Date((ts + timezone) * 1000)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC',
  })
}

export function getBackgroundClass(condition: string | null): string {
  switch (condition) {
    case 'clear':
      return 'from-primary/20 via-accent/10 to-surface'
    case 'cloudy':
      return 'from-blue-900/30 via-slate-800/20 to-surface'
    case 'rain':
      return 'from-blue-800/30 via-indigo-900/20 to-surface'
    case 'thunderstorm':
      return 'from-purple-900/30 via-gray-900/20 to-surface'
    case 'snow':
      return 'from-blue-200/20 via-slate-100/10 to-surface'
    case 'mist':
      return 'from-gray-500/20 via-slate-600/10 to-surface'
    case 'night':
      return 'from-indigo-950/40 via-slate-900/20 to-surface'
    default:
      return 'from-primary/10 via-accent/5 to-surface'
  }
}
