import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { AppDataProvider, useAppData } from './contexts/AppDataContext'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { ProductProvider, useProductContext } from './contexts/ProductContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/AddProduct'
import Orders from './pages/Orders'
import Buyers from './pages/Buyers'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { clearProducts } = useProductContext()

  // Clear products when user logs out
  useEffect(() => {
    if (!user && !loading) {
      clearProducts()
    }
  }, [user, loading, clearProducts])

  if (loading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-product" 
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/buyers" 
          element={
            <ProtectedRoute>
              <Buyers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppDataProvider>
          <ProductProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </ProductProvider>
        </AppDataProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
