import { useState, useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/services/weather'

export type WeatherErrorType = 'not_found' | 'network' | 'location_denied' | 'api_limit' | 'api_key' | 'unknown'

export interface WeatherError {
  type: WeatherErrorType
  message: string
}

export function useWeather() {
  const [searchQuery, setSearchQuery] = useState('')
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState<string | null>(null)

  const queryFn = useCallback(async () => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    if (!apiKey || apiKey === 'your_api_key_here') {
      throw new Error('API_KEY_NOT_CONFIGURED')
    }
    if (searchQuery.startsWith('geo:')) {
      const [, coords] = searchQuery.split(':')
      const [lat, lon] = coords.split(',').map(Number)
      return fetchWeatherByCoords(lat, lon)
    }
    return fetchWeatherByCity(searchQuery)
  }, [searchQuery])

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['weather', searchQuery],
    queryFn,
    enabled: !!searchQuery,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  const searchByCity = useCallback((city: string) => {
    setGeoError(null)
    setSearchQuery(city.trim())
  }, [])

  const searchByLocation = useCallback(() => {
    setGeoError(null)
    setGeoLoading(true)

    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.')
      setGeoLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchQuery(`geo:${position.coords.latitude},${position.coords.longitude}`)
        setGeoLoading(false)
      },
      (err) => {
        setGeoLoading(false)
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError('Location access denied. Please enable it in your browser settings.')
            break
          case err.POSITION_UNAVAILABLE:
            setGeoError('Location unavailable. Try again later.')
            break
          case err.TIMEOUT:
            setGeoError('Location request timed out.')
            break
          default:
            setGeoError('An unknown error occurred.')
        }
      },
      { enableHighAccuracy: false, timeout: 10000 },
    )
  }, [])

  const errors = useMemo<WeatherError[]>(() => {
    const result: WeatherError[] = []
    if (geoError) {
      result.push({ type: 'location_denied', message: geoError })
    }
    if (error) {
      const err = error as { response?: { status?: number }; message?: string }
      if (err.message === 'API_KEY_NOT_CONFIGURED') {
        result.push({ type: 'api_key', message: 'OpenWeather API key is not configured. Add your key to .env file.' })
      } else if (err.response?.status === 401) {
        result.push({ type: 'api_key', message: 'Invalid API key. Check your OpenWeather API key in the .env file.' })
      } else if (err.response?.status === 404) {
        result.push({ type: 'not_found', message: `City "${searchQuery}" not found.` })
      } else if (err.response?.status === 429) {
        result.push({ type: 'api_limit', message: 'API limit exceeded. Try again later.' })
      } else if (err.message === 'Network Error') {
        result.push({ type: 'network', message: 'Network error. Check your internet connection.' })
      } else {
        result.push({ type: 'unknown', message: 'Something went wrong. Please try again.' })
      }
    }
    return result
  }, [geoError, error, searchQuery])

  return {
    weather: data?.current ?? null,
    hourly: data?.hourly ?? [],
    daily: data?.daily ?? [],
    conditionClass: data?.conditionClass ?? null,
    isLoading,
    isGeoLoading: geoLoading,
    errors,
    searchByCity,
    searchByLocation,
    refetch,
  }
}
