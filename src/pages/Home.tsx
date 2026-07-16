import Hero from '@/components/weather/Hero'
import WeatherCard from '@/components/weather/WeatherCard'
import ForecastCard from '@/components/weather/ForecastCard'
import HighlightCard from '@/components/weather/HighlightCard'
import { useWeather } from '@/hooks/useWeather'
import { useSearchHistory } from '@/hooks/useSearchHistory'

export default function Home() {
  const {
    weather,
    hourly,
    daily,
    conditionClass,
    isLoading,
    isGeoLoading,
    errors,
    searchByCity,
    searchByLocation,
  } = useWeather()

  const { recent, addSearch, clearHistory, suggestions } = useSearchHistory()

  const handleSearch = (city: string) => {
    addSearch(city)
    searchByCity(city)
  }

  return (
    <>
      <Hero
        weather={weather}
        conditionClass={conditionClass}
        errors={errors}
        isLoading={isLoading}
        isGeoLoading={isGeoLoading}
        onSearch={handleSearch}
        onLocate={searchByLocation}
        getSuggestions={suggestions}
        recentSearches={recent}
        onClearHistory={clearHistory}
      />
      {weather && (
        <>
          <WeatherCard weather={weather} isLoading={isLoading} />
          <ForecastCard hourly={hourly} daily={daily} isLoading={isLoading} cityName={weather.city} />
          <HighlightCard weather={weather} isLoading={isLoading} />
        </>
      )}
    </>
  )
}
