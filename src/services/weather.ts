import axios from 'axios'
import type {
  OpenWeatherCurrent,
  OpenWeatherForecast,
  OpenWeatherForecastItem,
  AppWeatherData,
  AppHourlyForecast,
  AppDailyForecast,
} from '@/types/weather'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
  },
})

function getConditionClass(main: string, icon: string): string {
  if (icon.endsWith('n')) return 'night'
  switch (main.toLowerCase()) {
    case 'clear': return 'clear'
    case 'clouds': return 'cloudy'
    case 'rain':
    case 'drizzle': return 'rain'
    case 'thunderstorm': return 'thunderstorm'
    case 'snow': return 'snow'
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog': return 'mist'
    default: return 'cloudy'
  }
}

function parseCurrentWeather(data: OpenWeatherCurrent): AppWeatherData {
  const w = data.weather[0]
  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    tempMin: Math.round(data.main.temp_min),
    tempMax: Math.round(data.main.temp_max),
    condition: getConditionClass(w.main, w.icon),
    description: w.description,
    icon: w.icon,
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // m/s to km/h
    windDeg: data.wind.deg,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // m to km
    cloud: data.clouds.all,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    dt: data.dt,
    timezone: data.timezone,
  }
}

function parseHourlyForecast(list: OpenWeatherForecastItem[], timezone: number): AppHourlyForecast[] {
  return list.slice(0, 12).map(item => {
    const w = item.weather[0]
    const date = new Date((item.dt + timezone) * 1000)
    return {
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
        timeZone: 'UTC',
      }),
      temperature: Math.round(item.main.temp),
      icon: w.icon,
      condition: w.main,
    }
  })
}

function parseDailyForecast(list: OpenWeatherForecastItem[]): AppDailyForecast[] {
  const dailyMap = new Map<string, OpenWeatherForecastItem[]>()
  for (const item of list) {
    const date = item.dt_txt.split(' ')[0]
    if (!dailyMap.has(date)) {
      dailyMap.set(date, [])
    }
    dailyMap.get(date)!.push(item)
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const result: AppDailyForecast[] = []

  for (const [dateStr, items] of dailyMap) {
    if (result.length >= 7) break
    const date = new Date(dateStr + 'T12:00:00')
    const dayName = days[date.getDay()]
    const temps = items.map(i => i.main.temp)
    const pops = items.map(i => i.pop)
    const middayItem = items.find(i => i.dt_txt.includes('12:00')) || items[Math.floor(items.length / 2)]
    const w = middayItem.weather[0]

    result.push({
      day: dayName,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tempHigh: Math.round(Math.max(...temps)),
      tempLow: Math.round(Math.min(...temps)),
      icon: w.icon,
      condition: w.main,
      chanceOfRain: pops.length ? Math.min(100, Math.round(Math.max(...pops) * 100)) : 0,
    })
  }

  return result
}

export async function fetchWeatherByCity(city: string) {
  const [currentRes, forecastRes] = await Promise.all([
    client.get<OpenWeatherCurrent>('/weather', { params: { q: city } }),
    client.get<OpenWeatherForecast>('/forecast', { params: { q: city } }),
  ])
  return {
    current: parseCurrentWeather(currentRes.data),
    hourly: parseHourlyForecast(forecastRes.data.list, forecastRes.data.city.timezone),
    daily: parseDailyForecast(forecastRes.data.list),
    conditionClass: getConditionClass(
      currentRes.data.weather[0].main,
      currentRes.data.weather[0].icon,
    ),
  }
}

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const [currentRes, forecastRes] = await Promise.all([
    client.get<OpenWeatherCurrent>('/weather', { params: { lat, lon } }),
    client.get<OpenWeatherForecast>('/forecast', { params: { lat, lon } }),
  ])
  return {
    current: parseCurrentWeather(currentRes.data),
    hourly: parseHourlyForecast(forecastRes.data.list, forecastRes.data.city.timezone),
    daily: parseDailyForecast(forecastRes.data.list),
    conditionClass: getConditionClass(
      currentRes.data.weather[0].main,
      currentRes.data.weather[0].icon,
    ),
  }
}
