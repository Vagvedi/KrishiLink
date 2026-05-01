import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

function BottomNav() {
  const location = useLocation()
  const { t } = useLanguage()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-[#faf6f0] dark:bg-stone-900 flex justify-around items-center px-4 py-3 pb-safe-area shadow-[0_-4px_20px_rgba(46,50,48,0.08)] border-t border-[#4a7c59]/10 rounded-t-[24px]">
      {/* Home */}
      <Link 
        to="/dashboard"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/dashboard') 
            ? 'bg-[#4a7c59] text-white rounded-[16px]' 
            : 'text-[#4a7c59]/60 dark:text-stone-400 hover:bg-[#4a7c59]/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/dashboard') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          home
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('home')}</span>
      </Link>

      {/* Add Product */}
      <Link 
        to="/add-product"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/add-product') 
            ? 'bg-[#4a7c59] text-white rounded-[16px]' 
            : 'text-[#4a7c59]/60 dark:text-stone-400 hover:bg-[#4a7c59]/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/add-product') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          add_circle
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('addProduct')}</span>
      </Link>

      {/* Orders */}
      <Link 
        to="/orders"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/orders') 
            ? 'bg-[#4a7c59] text-white rounded-[16px]' 
            : 'text-[#4a7c59]/60 dark:text-stone-400 hover:bg-[#4a7c59]/10'
        }`}
      >
        <span className="material-symbols-outlined" style={isActive('/orders') ? { fontVariationSettings: "'FILL' 1" } : {}}>
          shopping_bag
        </span>
        <span className="font-['Nunito_Sans'] font-semibold text-xs mt-1">{t('viewOrders')}</span>
      </Link>

      {/* Profile */}
      <Link 
        to="/profile"
        className={`flex flex-col items-center justify-center px-4 py-2 transition-transform duration-150 active:scale-90 ${
          isActive('/profile') 
            ? 'bg-[#4a7c59] text-white rounded-[16px]' 
            : 'text-[#4a7c59]/60 dark:text-stone-400 hover:bg-[#4a7c59]/10'
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
