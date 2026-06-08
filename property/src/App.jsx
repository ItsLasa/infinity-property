import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import FeaturedProperties from './components/FeaturedProperties'
import TrustSection from './components/TrustSection'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import LandsPage from './pages/LandsPage'
import HousesPage from './pages/HousesPage'
import ApartmentsPage from './pages/ApartmentsPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'
import PropertyDetailsPage from './pages/PropertyDetailsPage'

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProperties />
      <TrustSection />
      <Testimonials />
      <Footer />
    </>
  )
}

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.isAdmin) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-surface">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lands" element={<LandsPage />} />
            <Route path="/houses" element={<HousesPage />} />
            <Route path="/apartments" element={<ApartmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
