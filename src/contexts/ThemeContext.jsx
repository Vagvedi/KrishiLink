import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Load theme from localStorage on initial render
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  // Apply theme to document.documentElement and localStorage
  useEffect(() => {
    console.log('ThemeContext - Applying theme:', theme)
    
    // Apply theme class to document.documentElement
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save theme to localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  // Toggle theme function
  const toggleTheme = () => {
    console.log('ThemeContext - Toggling theme from', theme, 'to', theme === 'light' ? 'dark' : 'light')
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  // Set specific theme function
  const setThemeMode = (newTheme) => {
    console.log('ThemeContext - Setting theme to:', newTheme)
    setTheme(newTheme)
  }

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
