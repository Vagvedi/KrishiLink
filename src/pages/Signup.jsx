import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageToggle from '../components/LanguageToggle'

function Signup() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'farmer'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0)
  
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Prevent multiple submissions
    if (loading) {
      return
    }
    
    // Add cooldown mechanism (prevent submissions within 2 seconds)
    const currentTime = Date.now()
    const timeSinceLastSubmission = currentTime - lastSubmissionTime
    if (timeSinceLastSubmission < 2000) {
      setError('Please wait a moment before trying again.')
      return
    }
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess('')
    setLastSubmissionTime(currentTime)

    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDoNotMatch'))
      setLoading(false)
      return
    }

    try {
      const result = await signup(formData.email, formData.password, formData.userType)
      
      if (result.success) {
        setSuccess(t('accountCreatedSuccess'))
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        // Handle rate limit errors specifically
        const errorMessage = result.error.toLowerCase()
        if (errorMessage.includes('rate limit') || 
            errorMessage.includes('too many requests') || 
            errorMessage.includes('too many attempts') ||
            errorMessage.includes('429')) {
          setError('Too many attempts. Please wait a minute and try again.')
        } else if (errorMessage.includes('already registered') || 
                   errorMessage.includes('already exists') ||
                   errorMessage.includes('user already registered')) {
          setError('This email is already registered. Please try logging in instead.')
        } else if (errorMessage.includes('weak password') || 
                   errorMessage.includes('password should be')) {
          setError('Password is too weak. Please choose a stronger password.')
        } else if (errorMessage.includes('invalid email') || 
                   errorMessage.includes('email format')) {
          setError('Please enter a valid email address.')
        } else {
          // Show the original error for other cases
          setError(result.error)
        }
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
      <LanguageToggle />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('joinKrishiLink')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('createAccountToStart')}
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
              {error.includes('already registered') && (
                <p className="mt-2 text-xs text-red-600">
                  <Link to="/" className="underline hover:text-red-800">
                    Click here to login
                  </Link>
                </p>
              )}
              {error.includes('Too many attempts') && (
                <p className="mt-2 text-xs text-red-600">
                  If you already have an account,{' '}
                  <Link to="/" className="underline hover:text-red-800">
                    try logging in instead
                  </Link>
                </p>
              )}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {t('fullName')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors"
                placeholder={t('enterYourFullName')}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('emailAddress')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors"
                placeholder={t('enterYourEmail')}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                {t('iAmA')}
              </label>
              <select
                id="userType"
                name="userType"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="farmer">{t('farmer')}</option>
                <option value="buyer">{t('buyer')}</option>
                <option value="distributor">{t('distributor')}</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('createPassword')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors"
                placeholder={t('createPassword')}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {t('confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-colors"
                placeholder={t('confirmPassword')}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                {t('agreeToTerms')}{' '}
                <a href="#" className="text-green-600 hover:text-green-500 transition-colors">
                  {t('termsAndConditions')}
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t('creatingAccount')}
                  </div>
                ) : (
                  t('createAccount')
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                {t('alreadyHaveAccount')}{' '}
                <Link
                  to="/"
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  {t('signIn')}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
