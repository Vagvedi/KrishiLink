import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const { user, userRole, logout, isFarmer, isBuyer, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      window.location.href = '/'
    }
  }

  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  return (
    <header className="bg-surface-container border-b border-outline-variant/30 shadow-[0_4px_20px_rgba(46,50,48,0.06)] fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-screen-xl mx-auto">
        <Link to="/dashboard" className="text-2xl font-black text-primary tracking-tight font-['Literata']">
          KrishiLink
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Role-based Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {(isFarmer() || isAdmin()) && (
              <Link 
                to="/add-product"
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors font-['Nunito_Sans']"
              >
                {t('sellProduct')}
              </Link>
            )}
            
            {(isFarmer() || isAdmin()) && (
              <Link 
                to="/buyers"
                className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors font-['Nunito_Sans']"
              >
                {t('findBuyers')}
              </Link>
            )}
            
            <Link 
              to="/orders"
              className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors font-['Nunito_Sans']"
            >
              {isBuyer() ? t('myOrders') : t('viewOrders')}
            </Link>
            
            {isAdmin() && (
              <Link 
                to="/admin"
                className="text-sm font-medium text-error hover:text-error/80 transition-colors font-['Nunito_Sans']"
              >
                Admin
              </Link>
            )}
          </nav>
          
          {/* User Menu */}
          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-on-surface font-['Nunito_Sans']">
                  {getUserName(user.email)}
                </p>
                <p className="text-xs text-on-surface-variant capitalize font-['Nunito_Sans']">
                  {userRole}
                </p>
              </div>
              
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-on-primary font-bold font-['Nunito_Sans']">
                {getUserName(user.email).charAt(0)}
              </div>
              
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-surface-container-high transition-colors"
                title="Logout"
              >
                <span className="material-symbols-outlined text-on-surface-variant">logout</span>
              </button>
            </div>
          )}
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant bg-surface hover:bg-primary-container/10 transition-colors active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined text-primary">translate</span>
            <span className="text-sm font-semibold text-on-surface-variant font-['Nunito_Sans']">
              {language === 'en' ? 'EN/हि' : 'हि/EN'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
