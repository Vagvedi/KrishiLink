import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useAuth } from '../contexts/AuthContext'

function BottomNav() {
  const location = useLocation()
  const { t } = useLanguage()
  const { isFarmer, isBuyer, isAdmin } = useAuth()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container flex justify-around items-center px-4 py-3 pb-safe-area shadow-[0_-4px_20px_rgba(46,50,48,0.08)] border-t border-outline-variant/30 rounded-t-[24px]">
      {/* Home */}
      <Link 
        to="/dashboard"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/dashboard') 
            ? 'bg-primary text-on-primary rounded-[16px]' 
            : 'text-on-surface-variant hover:bg-primary-container/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          home
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('home')}</span>
      </Link>

      {/* Role-specific middle button */}
      {(isFarmer() || isAdmin()) ? (
        /* Add Product - Farmer/Admin */
        <Link 
          to="/add-product"
          className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
            isActive('/add-product') 
              ? 'bg-primary text-on-primary rounded-[16px]' 
              : 'text-on-surface-variant hover:bg-primary-container/10'
          }`}
        >
          <span className="material-symbols-outlined" style={isActive('/add-product') ? { fontVariationSettings: "'FILL' 1" } : {}}>
            add_circle
          </span>
          <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('sellProduct')}</span>
        </Link>
      ) : (
        /* Browse Products - Buyer */
        <Link 
          to="/browse"
          className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
            isActive('/browse') 
              ? 'bg-primary text-on-primary rounded-[16px]' 
              : 'text-on-surface-variant hover:bg-primary-container/10'
          }`}
        >
          <span className="material-symbols-outlined" style={isActive('/browse') ? { fontVariationSettings: "'FILL' 1" } : {}}>
            shopping_basket
          </span>
          <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">Browse</span>
        </Link>
      )}

      {/* Orders */}
      <Link 
        to="/orders"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/orders') 
            ? 'bg-primary text-on-primary rounded-[16px]' 
            : 'text-on-surface-variant hover:bg-primary-container/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/orders') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          shopping_bag
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">
          {isBuyer() ? t('myOrders') : t('viewOrders')}
        </span>
      </Link>

      {/* Profile */}
      <Link 
        to="/profile"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/profile') 
            ? 'bg-primary text-on-primary rounded-[16px]' 
            : 'text-on-surface-variant hover:bg-primary-container/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/profile') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          person
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('profile')}</span>
      </Link>
    </nav>
  )
}

export default BottomNav
