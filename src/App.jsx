// App is the root component. It sets up routing (which page to show for each URL)
// and wraps everything in the ModalProvider so any component can open the enquiry form.
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ModalProvider } from './context/ModalContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import EnquiryModal from './components/EnquiryModal'
import HomePage from './pages/HomePage'
import HowItWorksPage from './pages/HowItWorksPage'
import AboutPage from './pages/AboutPage'
import FAQPage from './pages/FAQPage'
import LearnPage from './pages/LearnPage'
import ArticlePage from './pages/ArticlePage'
import PrivacyPage from './pages/PrivacyPage'
import PricingPage from './pages/PricingPage'
import TermsPage from './pages/TermsPage'
import ComplaintsPage from './pages/ComplaintsPage'

// Scrolls the window to the top whenever the route (page URL) changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:slug" element={<ArticlePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/complaints" element={<ComplaintsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>
        <Footer />
        <EnquiryModal />
      </ModalProvider>
    </BrowserRouter>
  )
}
