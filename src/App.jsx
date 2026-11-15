import { HashRouter, Routes, Route, useLocation } from './lib/router'
import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { useLenis, getLenis } from './lib/useLenis'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Launch from './pages/Launch'
import Offer from './pages/Offer'
import Signup from './pages/Signup'
import Banners from './pages/Banners'
import { track } from './lib/track'

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    const lenis = getLenis()
    lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    track('page_view', { page: pathname })
  }, [pathname])
  return null
}

export default function App() {
  useLenis()
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <RouteEffects />
        <ScrollProgress />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Launch />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/waitlist" element={<Signup />} />
            <Route path="/banners" element={<Banners />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </MotionConfig>
  )
}
