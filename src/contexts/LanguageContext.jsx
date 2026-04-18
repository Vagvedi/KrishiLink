import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation } from '../utils/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to English
    const savedLanguage = localStorage.getItem('language')
    return savedLanguage || 'en'
  })

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key) => {
    return getTranslation(language, key)
  }

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem('language', language)
  }, [language])

  const value = {
    language,
    toggleLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
