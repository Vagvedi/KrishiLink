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
  const { user, userRole, logout, isFarmer, isBuyer, isAdmin } = useAuth()
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

        {/* Bento Grid Main Actions - Role Specific */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {(isFarmer() || isAdmin()) && (
            <>
              {/* Sell Product Card - Farmer/Admin */}
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
              
              {/* Find Buyers Card - Farmer/Admin */}
              <button 
                onClick={handleFindBuyers}
                className="group relative overflow-hidden bg-secondary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-secondary/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-on-secondary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="bg-on-secondary/20 p-4 rounded-xl mb-4">
                  <span className="material-symbols-outlined text-on-secondary text-5xl">people</span>
                </div>
                <div>
                  <h2 className="text-on-secondary text-3xl font-black mb-1">{t('findBuyers')}</h2>
                  <p className="text-on-secondary/80 font-medium">{t('connectWithPotentialBuyers')}</p>
                </div>
              </button>
            </>
          )}
          
          {isBuyer() && (
            <>
              {/* Browse Products Card - Buyer */}
              <button 
                className="group relative overflow-hidden bg-primary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-primary/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="bg-on-primary/20 p-4 rounded-xl mb-4">
                  <span className="material-symbols-outlined text-on-primary text-5xl">shopping_basket</span>
                </div>
                <div>
                  <h2 className="text-on-primary text-3xl font-black mb-1">Browse Products</h2>
                  <p className="text-on-primary/80 font-medium">Find fresh farm products</p>
                </div>
              </button>
              
              {/* My Orders Card - Buyer */}
              <button 
                onClick={handleViewOrders}
                className="group relative overflow-hidden bg-tertiary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-tertiary/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="bg-on-tertiary/20 p-4 rounded-xl mb-4">
                  <span className="material-symbols-outlined text-on-tertiary text-5xl">receipt_long</span>
                </div>
                <div>
                  <h2 className="text-on-tertiary text-3xl font-black mb-1">{t('myOrders')}</h2>
                  <p className="text-on-tertiary/80 font-medium">{t('trackYourPurchases')}</p>
                </div>
              </button>
            </>
          )}
          
          {isAdmin() && (
            <>
              {/* Manage Users Card - Admin */}
              <button 
                className="group relative overflow-hidden bg-error p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-error/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-on-error/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="bg-on-error/20 p-4 rounded-xl mb-4">
                  <span className="material-symbols-outlined text-on-error text-5xl">admin_panel_settings</span>
                </div>
                <div>
                  <h2 className="text-on-error text-3xl font-black mb-1">Manage Users</h2>
                  <p className="text-on-error/80 font-medium">View and manage all users</p>
                </div>
              </button>
              
              {/* System Analytics Card - Admin */}
              <button 
                className="group relative overflow-hidden bg-tertiary p-8 rounded-xl flex flex-col items-start justify-between min-h-[220px] shadow-[0_4px_20px_rgba(46,50,48,0.06)] transition-all active:scale-95 text-left border border-tertiary/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-on-tertiary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="bg-on-tertiary/20 p-4 rounded-xl mb-4">
                  <span className="material-symbols-outlined text-on-tertiary text-5xl">analytics</span>
                </div>
                <div>
                  <h2 className="text-on-tertiary text-3xl font-black mb-1">Analytics</h2>
                  <p className="text-on-tertiary/80 font-medium">View system statistics</p>
                </div>
              </button>
            </>
          )}
          
          {/* Common Cards for All Roles */}
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
          
          {(isFarmer() || isAdmin()) && (
            /* My Products Card - Farmer/Admin */
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
          )}
        </div>

        {/* Secondary Info Section - Role Specific */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {(isFarmer() || isAdmin()) && (
            <>
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
                  <span className="material-symbols-outlined">inventory</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Active Products</h4>
                  <p className="text-xs text-on-surface-variant">{getActiveProductsCount()} • Listed</p>
                </div>
              </div>
            </>
          )}
          
          {isBuyer() && (
            <>
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined">shopping_bag</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Total Orders</h4>
                  <p className="text-xs text-on-surface-variant">8 • This month</p>
                </div>
              </div>
              
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Delivery Status</h4>
                  <p className="text-xs text-on-surface-variant">2 • In transit</p>
                </div>
              </div>
              
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed-variant">
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Saved Items</h4>
                  <p className="text-xs text-on-surface-variant">15 • Favorites</p>
                </div>
              </div>
            </>
          )}
          
          {isAdmin() && (
            <>
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container">
                  <span className="material-symbols-outlined">people</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Total Users</h4>
                  <p className="text-xs text-on-surface-variant">247 • Registered</p>
                </div>
              </div>
              
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-on-primary-fixed-variant">
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Total Orders</h4>
                  <p className="text-xs text-on-surface-variant">1,234 • All time</p>
                </div>
              </div>
              
              <div className="bg-surface-container border border-outline-variant/30 p-6 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-on-secondary-fixed-variant">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">System Health</h4>
                  <p className="text-xs text-on-surface-variant">98% • Optimal</p>
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* Recent Products/Activity - Role Specific */}
        {(isFarmer() || isAdmin()) && (
          <div className="mt-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface">Recent Products</h3>
              <Link
                to="/add-product"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all
              </Link>
            </div>
            
            {products && products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-outline-variant/30">
                  <thead className="bg-surface-container">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-surface-container-lowest divide-y divide-outline-variant/30">
                    {products.slice(0, 5).map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-on-surface">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{product.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{product.quantity} kg</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-container text-primary">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-outline">inventory_2</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">No products yet</h3>
                <p className="text-on-surface-variant font-body mb-6">Get started by adding your first product.</p>
                <button
                  onClick={handleAddProduct}
                  className="bg-primary text-on-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Add Product
                </button>
              </div>
            )}
          </div>
        )}

        {isBuyer() && (
          <div className="mt-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-on-surface">Recent Orders</h3>
              <Link
                to="/orders"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-on-surface">Fresh Vegetables</h4>
                    <p className="text-sm text-on-surface-variant">Order #12345 • Jan 15, 2024</p>
                  </div>
                  <span className="px-3 py-1 bg-tertiary-container text-tertiary text-xs font-semibold rounded-full">
                    Delivered
                  </span>
                </div>
              </div>
              <div className="bg-surface-container rounded-xl p-6 border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-on-surface">Organic Wheat</h4>
                    <p className="text-sm text-on-surface-variant">Order #12344 • Jan 14, 2024</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-container text-primary text-xs font-semibold rounded-full">
                    In Transit
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
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
