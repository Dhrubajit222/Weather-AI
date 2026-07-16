import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'weather_search_history'
const MAX_ITEMS = 8

const POPULAR_CITIES = ['London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Singapore', 'Sydney', 'Mumbai']

export function useSearchHistory() {
  const [recent, setRecent] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recent))
  }, [recent])

  const addSearch = useCallback((city: string) => {
    setRecent(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== city.toLowerCase())
      return [city, ...filtered].slice(0, MAX_ITEMS)
    })
  }, [])

  const clearHistory = useCallback(() => {
    setRecent([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const suggestions = useCallback((query: string) => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const fromRecent = recent.filter(r => r.toLowerCase().includes(q))
    const fromPopular = POPULAR_CITIES.filter(
      c => c.toLowerCase().includes(q) && !fromRecent.some(r => r.toLowerCase() === c.toLowerCase()),
    )
    return [...fromRecent, ...fromPopular].slice(0, 6)
  }, [recent])

  return { recent, addSearch, clearHistory, suggestions }
}
