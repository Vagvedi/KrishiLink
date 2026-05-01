import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()

  return (
    <header className="bg-[#faf6f0] dark:bg-stone-900 border-b border-[#4a7c59]/10 dark:border-white/5 shadow-[0_4px_20px_rgba(46,50,48,0.06)] fixed top-0 w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-screen-xl mx-auto">
        <div className="text-2xl font-black text-[#4a7c59] dark:text-emerald-500 tracking-tight font-['Literata']">
          KrishiLink
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant bg-surface hover:bg-[#4a7c59]/5 transition-colors active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined text-[#4a7c59]">translate</span>
            <span className="text-sm font-semibold text-on-surface-variant font-['Nunito_Sans']">
              {language === 'en' ? 'English/हिंदी' : 'हिंदी/English'}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
