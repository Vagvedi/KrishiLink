import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

function SettingsModal({ isOpen, onClose }) {
  const { user, userRole, logout } = useAuth()
  const { t, language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    console.log('SettingsModal - Logout button clicked')
    try {
      const result = await logout()
      console.log('SettingsModal - Logout result:', result)
      if (result.success) {
        navigate('/')
        onClose()
      }
    } catch (error) {
      console.error('SettingsModal - Logout error:', error)
    }
  }

  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Settings
                </h3>
                
                {/* Profile Section */}
                <div className="mt-6 space-y-6">
                  <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Profile Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                          {getUserName(user?.email)?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{getUserName(user?.email)}</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{user?.email}</p>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{userRole || 'User'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Language Section */}
                  <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Language</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {language === 'en' ? 'English' : 'Hindi'}
                      </span>
                      <button
                        onClick={toggleLanguage}
                        className={`px-3 py-1 text-sm font-medium rounded-md ${
                          language === 'en' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-orange-600 text-white'
                        } hover:opacity-90 transition-opacity`}
                      >
                        {language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                      </button>
                    </div>
                  </div>

                  {/* Theme Section */}
                  <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Theme</h4>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      <button
                        onClick={() => {
                          console.log('SettingsModal - Theme toggle clicked')
                          toggleTheme()
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          theme === 'dark' ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Logout Section */}
                  <div className={`p-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                    <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Account</h4>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      {t('logout')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-700 px-4 py-3' : 'bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'}`}>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
