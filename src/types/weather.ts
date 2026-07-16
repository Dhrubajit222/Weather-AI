export interface OpenWeatherCurrent {
  coord: { lon: number; lat: number }
  weather: { id: number; main: string; description: string; icon: string }[]
  main: {
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    temp_min: number
    temp_max: number
  }
  visibility: number
  wind: { speed: number; deg: number; gust?: number }
  clouds: { all: number }
  dt: number
  sys: { country: string; sunrise: number; sunset: number }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface OpenWeatherForecastItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: { id: number; main: string; description: string; icon: string }[]
  clouds: { all: number }
  wind: { speed: number; deg: number; gust?: number }
  visibility: number
  pop: number
  dt_txt: string
}

export interface OpenWeatherForecast {
  cod: string
  message: number
  cnt: number
  list: OpenWeatherForecastItem[]
  city: {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface AppWeatherData {
  city: string
  country: string
  temperature: number
  feelsLike: number
  tempMin: number
  tempMax: number
  condition: string
  description: string
  icon: string
  humidity: number
  windSpeed: number
  windDeg: number
  pressure: number
  visibility: number
  cloud: number
  sunrise: number
  sunset: number
  dt: number
  timezone: number
}

export interface AppHourlyForecast {
  time: string
  temperature: number
  icon: string
  condition: string
}

export interface AppDailyForecast {
  day: string
  date: string
  tempHigh: number
  tempLow: number
  icon: string
  condition: string
  chanceOfRain: number
}

export type Theme = 'dark' | 'light'
