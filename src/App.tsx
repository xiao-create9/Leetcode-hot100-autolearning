import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useDarkMode } from '@/utils/useDarkMode'
import Navbar from '@/components/Navbar'
import HomePage from '@/pages/HomePage'
import PracticePage from '@/pages/PracticePage'
import ProblemDetailPage from '@/pages/ProblemDetailPage'
import ProblemListPage from '@/pages/ProblemListPage'
import RecordsPage from '@/pages/RecordsPage'
import SettingsPage from '@/pages/SettingsPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="animate-fade-in">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default function App() {
  useDarkMode()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background dark:bg-background text-text-primary dark:text-gray-100 pb-16 sm:pb-0 transition-colors">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
