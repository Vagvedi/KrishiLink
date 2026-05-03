import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

function ProtectedRoute({ children, requiredRole, allowedRoles }) {
  const { user, loading, userRole, hasRole, hasAnyRole } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()

  // Show loading spinner while auth state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-on-surface-variant">{t('loading')}</p>
        </div>
      </div>
    )
  }

  // If not logged in, redirect to login with return URL
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // Check role-based access
  let hasAccess = false

  if (requiredRole) {
    // Single role required
    hasAccess = hasRole(requiredRole)
  } else if (allowedRoles && allowedRoles.length > 0) {
    // Multiple roles allowed
    hasAccess = hasAnyRole(allowedRoles)
  } else {
    // No role restrictions (just need to be logged in)
    hasAccess = true
  }

  // If user doesn't have required role, redirect to unauthorized page
  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />
  }

  // User is authenticated and has required role
  return children
}

export default ProtectedRoute
