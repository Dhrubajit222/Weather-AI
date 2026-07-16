import { memo, useMemo } from 'react'

interface WeatherBackgroundProps {
  condition: string | null
}

function RainDrops() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="rain-drop"
          style={{
            left: `${Math.random() * 100}%`,
            height: `${10 + Math.random() * 20}px`,
            animationDuration: `${0.6 + Math.random() * 0.6}s`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

function SnowFlakes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="snow-flake"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            animationDuration: `${4 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  )
}

function Stars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="sun-ray"
            style={{
              height: `${60 + Math.random() * 80}px`,
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: 'bottom center',
              animation: `pulse-glow ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.1 + Math.random() * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function DriftingClouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="floating-cloud"
          style={{
            top: `${15 + i * 20}%`,
            width: `${120 + Math.random() * 160}px`,
            height: `${40 + Math.random() * 30}px`,
            borderRadius: '50%',
            background: 'rgba(148, 163, 184, 0.3)',
            filter: 'blur(8px)',
            animationDuration: `${25 + i * 10}s`,
            animationDelay: `-${i * 8}s`,
          }}
        />
      ))}
    </div>
  )
}

const WeatherBackground = memo(function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const particles = useMemo(() => {
    switch (condition) {
      case 'rain':
      case 'thunderstorm':
        return <RainDrops />
      case 'snow':
        return <SnowFlakes />
      case 'night':
        return <Stars />
      case 'clear':
        return <SunRays />
      case 'cloudy':
      case 'mist':
        return <DriftingClouds />
      default:
        return null
    }
  }, [condition])

  return <>{particles}</>
})

export default WeatherBackground
