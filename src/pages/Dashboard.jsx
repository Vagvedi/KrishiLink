import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { useAppData } from '../contexts/AppDataContext'
import { useTheme } from '../contexts/ThemeContext'
import { useProductContext } from '../contexts/ProductContext'
import LanguageToggle from '../components/LanguageToggle'
import SettingsModal from '../components/SettingsModal'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

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
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      {/* TopAppBar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow pt-24 pb-32 px-6 max-w-screen-xl mx-auto w-full">
        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">
            {t('welcome')}, {getUserName(user?.email)} 👋
          </h1>
          <p className="text-on-surface-variant font-medium">{t('whatWouldYouLike')}</p>
        </section>

        {/* Bento Grid Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Sell Product Card */}
          <button 
            onClick={handleAddProduct}
            className="group relative overflow-hidden bg-primary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-primary/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="bg-on-primary/20 p-4 rounded-xl mb-4">
              <span className="material-symbols-outlined text-on-primary text-5xl">add_business</span>
            </div>
            <div>
              <h2 className="text-on-primary text-3xl font-black mb-1">{t('sellProduct')}</h2>
              <p className="text-on-primary/80 font-medium">{t('listYourHarvest')}</p>
            </div>
          </button>
          
          {/* View Orders Card */}
          <button 
            onClick={handleViewOrders}
            className="group relative overflow-hidden bg-tertiary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-tertiary/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="bg-on-tertiary/20 p-4 rounded-xl mb-4">
              <span className="material-symbols-outlined text-on-tertiary text-5xl">receipt_long</span>
            </div>
            <div>
              <h2 className="text-on-tertiary text-3xl font-black mb-1">{t('viewOrders')}</h2>
              <p className="text-on-tertiary/80 font-medium">{t('manageRequests')}</p>
            </div>
          </button>
          
          {/* Check Prices Card */}
          <button 
            className="group relative overflow-hidden bg-primary-container p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-primary-container/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-on-primary-container/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="bg-on-primary-container/20 p-4 rounded-xl mb-4">
              <span className="material-symbols-outlined text-on-primary-container text-5xl">trending_up</span>
            </div>
            <div>
              <h2 className="text-on-primary-container text-3xl font-black mb-1">{t('checkPrices')}</h2>
              <p className="text-on-primary-container/80 font-medium">{t('dailyMarketRates')}</p>
            </div>
          </button>
          
          {/* My Products Card */}
          <button 
            className="group relative overflow-hidden bg-on-primary-fixed-variant p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-on-primary-fixed-variant/20"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
            <div className="bg-white/20 p-4 rounded-xl mb-4">
              <span className="material-symbols-outlined text-white text-5xl">inventory_2</span>
            </div>
            <div>
              <h2 className="text-white text-3xl font-black mb-1">{t('myProducts')}</h2>
              <p className="text-white/80 font-medium">{t('manageInventory')}</p>
            </div>
          </button>
        </div>

        {/* Secondary Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined">weather_mix</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">{t('weatherToday')}</h4>
              <p className="text-xs text-on-surface-variant">{t('sunnyGoodHarvest')}</p>
            </div>
          </div>
          
          <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed-variant">
              <span className="material-symbols-outlined">savings</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">{t('totalEarnings')}</h4>
              <p className="text-xs text-on-surface-variant">₹12,450 • {t('thisMonth')}</p>
            </div>
          </div>
          
          <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed-variant">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div>
              <h4 className="font-bold text-sm">{t('newAlerts')}</h4>
              <p className="text-xs text-on-surface-variant">{t('itemsNeedAttention')}</p>
            </div>
          </div>
        </div>
        
        {/* Recent Products */}
        <div className="mt-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Recent Products</h3>
            <Link
              to="/add-product"
              className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors"
            >
              {t('addProduct')}
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
                  {t('addProduct')}
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
      </main>
      
      {/* BottomNavBar */}
      <BottomNav />
      
      {/* Settings Modal */}
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      
      {/* Contextual FAB */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-tertiary-container text-on-tertiary-container rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
      </button>
    </div>
  )
}

export default Dashboard
