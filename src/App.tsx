import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PremiumLoading from '@/components/ui/PremiumLoading'
import { useTheme } from '@/hooks/useTheme'

const Home = lazy(() => import('@/pages/Home'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme}>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main className="min-h-screen">
          <Suspense fallback={<PremiumLoading />}>
            <Home />
          </Suspense>
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  )
}
