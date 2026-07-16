import { useState, useRef, useEffect, memo, type FormEvent } from 'react'
import { Search, MapPin, Crosshair, Clock, Trash2, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function highlightMatch(text: string, query: string): React.ReactNode {
  const q = query.toLowerCase()
  const idx = text.toLowerCase().indexOf(q)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-text-primary font-medium">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

interface SearchBarProps {
  onSearch: (query: string) => void
  onLocate: () => void
  isLocating?: boolean
  getSuggestions?: (query: string) => string[]
  recentSearches?: string[]
  onClearHistory?: () => void
}

const SearchBar = memo(function SearchBarInner({
  onSearch,
  onLocate,
  isLocating,
  getSuggestions,
  recentSearches = [],
  onClearHistory,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const selectCity = (city: string) => {
    setQuery(city)
    onSearch(city)
    setIsFocused(false)
  }

  const computedSuggestions = getSuggestions ? getSuggestions(query) : []
  const showRecent = isFocused && !query.trim() && recentSearches.length > 0
  const showSuggestions = isFocused && query.trim() && computedSuggestions.length > 0
  const showDropdown = showRecent || showSuggestions

  return (
    <div ref={ref} className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 0 2px rgba(59, 130, 246, 0.3), 0 8px 40px rgba(59, 130, 246, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
          className="relative flex items-center glass rounded-2xl overflow-hidden transition-all duration-300"
        >
          <div className="pl-4">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search city..."
            aria-label="Search city"
            className="flex-1 bg-transparent px-3 py-3.5 text-sm text-text-primary placeholder-text-muted outline-none"
          />
          <AnimatePresence>
            {query.trim() ? (
              <motion.button
                key="search"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="submit"
                className="mr-1.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                key="locate"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={onLocate}
                disabled={isLocating}
                className="mr-1.5 flex h-9 w-9 items-center justify-center rounded-xl glass hover:bg-glass-hover transition-colors text-text-secondary focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label="Use my location"
              >
                <Crosshair className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 glass rounded-2xl overflow-hidden shadow-2xl"
          >
            {showRecent && (
              <div>
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-glass-border">
                  <span className="text-xs font-medium text-text-muted flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    Recent
                  </span>
                  {onClearHistory && (
                    <button
                      onClick={onClearHistory}
                      className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear
                    </button>
                  )}
                </div>
                {recentSearches.map(city => (
                  <button
                    key={city}
                    onClick={() => selectCity(city)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-glass-hover transition-colors text-left"
                  >
                    <Clock className="h-3.5 w-3.5 text-text-muted" />
                    {city}
                  </button>
                ))}
              </div>
            )}

            {showSuggestions && (
              <div>
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-glass-border">
                  <TrendingUp className="h-3 w-3 text-text-muted" />
                  <span className="text-xs font-medium text-text-muted">Suggestions</span>
                </div>
                {computedSuggestions.map(city => (
                  <button
                    key={city}
                    onClick={() => selectCity(city)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-glass-hover transition-colors text-left"
                  >
                    <Search className="h-3.5 w-3.5 text-text-muted" />
                    <span>
                      {highlightMatch(city, query)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

export default SearchBar
