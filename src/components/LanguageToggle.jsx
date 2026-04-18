import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium"
    >
      <span className={`transition-opacity duration-200 ${language === 'en' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
        {t('english')}
      </span>
      <span className="text-gray-400">/</span>
      <span className={`transition-opacity duration-200 ${language === 'hi' ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
        {t('hindi')}
      </span>
    </button>
  )
}

export default LanguageToggle
