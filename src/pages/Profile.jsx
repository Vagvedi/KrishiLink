import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import SettingsModal from '../components/SettingsModal'

function Profile() {
  const { user, userRole, logout } = useAuth()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = React.useState(false)

  const handleLogout = async () => {
    try {
      console.log('Profile - Starting logout process')
      const result = await logout()
      console.log('Profile - Logout result:', result)
      
      if (result.success) {
        console.log('Profile - Logout successful, navigating to home')
        // Use window.location for more reliable navigation after logout
        window.location.href = '/'
      } else {
        console.error('Profile - Logout failed:', result.error)
      }
    } catch (error) {
      console.error('Profile - Logout error:', error)
      // Force navigation even if there's an error
      window.location.href = '/'
    }
  }

  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32 px-6 max-w-screen-xl mx-auto w-full">
        {/* Profile Header */}
        <section className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-primary text-on-primary flex items-center justify-center text-2xl font-bold">
              {getUserName(user?.email)?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-3xl font-black text-on-surface tracking-tight mb-1">
                {getUserName(user?.email)}
              </h1>
              <p className="text-on-surface-variant font-medium">{user?.email}</p>
              <p className="text-sm text-secondary capitalize">{userRole || 'User'}</p>
            </div>
          </div>
        </section>

        {/* Profile Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => setSettingsOpen(true)}
            className="w-full bg-surface-container p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">settings</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-surface">Settings</h3>
                <p className="text-sm text-on-surface-variant">Manage your account settings</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>

          <button className="w-full bg-surface-container p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">help</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-surface">Help & Support</h3>
                <p className="text-sm text-on-surface-variant">Get help with KrishiLink</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>

          <button className="w-full bg-surface-container p-6 rounded-xl flex items-center justify-between hover:bg-surface-container-high transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">info</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-surface">About</h3>
                <p className="text-sm text-on-surface-variant">Learn more about KrishiLink</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-error-container p-6 rounded-xl flex items-center justify-between hover:bg-error-container/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center text-on-error">
                <span className="material-symbols-outlined">logout</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-error-container">{t('logout')}</h3>
                <p className="text-sm text-on-error-container">Sign out of your account</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-error-container">chevron_right</span>
          </button>
        </div>
      </main>
      
      {/* BottomNavBar */}
      <BottomNav />
      
      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default Profile
