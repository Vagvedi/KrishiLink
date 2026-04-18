import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useAppData } from '../contexts/AppDataContext'
import { useTheme } from '../contexts/ThemeContext'
import { useProductContext } from '../contexts/ProductContext'
import LanguageToggle from '../components/LanguageToggle'
import SettingsModal from '../components/SettingsModal'

function Dashboard() {
  const { user, userRole, logout } = useAuth()
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { getProducts, getProductsCount, getActiveProductsCount } = useProductContext()
  const navigate = useNavigate()
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Get products from ProductContext
  const products = getProducts()
  console.log('Dashboard - Current products:', products)

  const handleLogout = async () => {
    console.log('Dashboard - Logout button clicked')
    try {
      const result = await logout()
      console.log('Dashboard - Logout result:', result)
      if (result.success) {
        navigate('/')
      }
    } catch (error) {
      console.error('Dashboard - Logout error:', error)
    }
  }

  const handleAddProduct = () => {
    navigate('/add-product')
  }

  const handleViewOrders = () => {
    navigate('/orders')
  }

  const handleFindBuyers = () => {
    navigate('/buyers')
  }

  // Extract user name from email
  const getUserName = (email) => {
    if (!email) return 'User'
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  }

  const stats = [
    { name: t('activeProducts'), value: getActiveProductsCount().toString(), change: '+' + getActiveProductsCount(), changeType: 'positive' },
    { name: 'Total Products', value: getProductsCount().toString(), change: '+' + getProductsCount(), changeType: 'positive' },
    { name: 'Revenue', value: 'Rs 0', change: '+0%', changeType: 'neutral' },
    { name: 'Orders', value: '0', change: '+0', changeType: 'neutral' },
  ]

  // Show recent products instead of orders
  const recentItems = products.slice(-4).reverse() // Show last 4 added products

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': 
      case t('delivered'): return 'bg-green-100 text-green-800'
      case 'In Transit': 
      case t('inTransit'): return 'bg-blue-100 text-blue-800'
      case 'Processing': 
      case t('processing'): return 'bg-yellow-100 text-yellow-800'
      case 'Pending': 
      case t('pending'): return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'Delivered': return t('delivered')
      case 'In Transit': return t('inTransit')
      case 'Processing': return t('processing')
      case 'Pending': return t('pending')
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{t('krishiLink')}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle />
              <button 
                onClick={() => setSettingsOpen(true)}
                className={`p-2 rounded-md ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} transition-colors`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{getUserName(user?.email)}</p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{userRole || 'User'}</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
                  {getUserName(user?.email)?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('welcomeBack')}, {getUserName(user?.email)}!</h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('hereIsWhatsHappening')}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 truncate">{stat.name}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`ml-4 flex-shrink-0 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Products */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow rounded-lg`}>
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Products</h3>
              <Link
                to="/add-product"
                className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors"
              >
                Add Product
              </Link>
            </div>
            
            {recentItems.length === 0 ? (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium">No products yet</h3>
                <p className="mt-1 text-sm">Get started by adding your first product.</p>
                <div className="mt-6">
                  <Link
                    to="/add-product"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add Product
                  </Link>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
                    {recentItems.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={handleAddProduct}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{t('addNewProduct')}</h3>
            <p className="mt-2 text-sm text-gray-500">{t('listYourFarmProducts')}</p>
          </button>

          <button
            onClick={handleViewOrders}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{t('viewOrders')}</h3>
            <p className="mt-2 text-sm text-gray-500">{t('manageAndTrackOrders')}</p>
          </button>

          <button
            onClick={handleFindBuyers}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{t('findBuyers')}</h3>
            <p className="mt-2 text-sm text-gray-500">{t('connectWithPotentialBuyers')}</p>
          </button>
        </div>
      </main>
      
      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default Dashboard
