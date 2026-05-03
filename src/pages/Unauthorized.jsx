import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import Navbar from '../components/Navbar'

function Unauthorized() {
  const { user, userRole, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      window.location.href = '/'
    }
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24">
      {/* TopAppBar */}
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="text-center">
          {/* Unauthorized Icon */}
          <div className="w-24 h-24 bg-error-container rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-5xl text-error">lock</span>
          </div>
          
          {/* Error Message */}
          <h1 className="text-3xl font-black text-on-surface mb-4">Access Denied</h1>
          <p className="text-lg text-on-surface-variant mb-8">
            You don't have permission to access this page.
          </p>
          
          {/* User Info */}
          {user && (
            <div className="bg-surface-container rounded-xl p-6 mb-8 border border-outline-variant/30">
              <p className="text-sm text-on-surface-variant mb-2">Logged in as:</p>
              <p className="font-semibold text-on-surface">{user.email}</p>
              <p className="text-sm text-secondary capitalize">Role: {userRole || 'Unknown'}</p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGoBack}
              className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-medium hover:bg-secondary-container/80 transition-colors"
            >
              Go Back
            </button>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-medium hover:bg-primary/90 transition-colors text-center"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-error-container text-on-error-container rounded-xl font-medium hover:bg-error-container/80 transition-colors"
            >
              Logout
            </button>
          </div>
          
          {/* Help Text */}
          <div className="mt-12 text-sm text-on-surface-variant">
            <p>If you believe this is an error, please contact support.</p>
            <p className="mt-2">
              Different roles have different access levels:
            </p>
            <ul className="mt-2 space-y-1 text-left max-w-xs mx-auto">
              <li>• <strong>Farmers:</strong> Can add and manage products</li>
              <li>• <strong>Buyers:</strong> Can browse and purchase products</li>
              <li>• <strong>Admins:</strong> Can manage everything</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Unauthorized
