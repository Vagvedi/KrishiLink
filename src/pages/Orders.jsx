import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useProductContext } from '../contexts/ProductContext'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

function Orders() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { getProducts } = useProductContext()
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  // Get products to derive basic orders
  const products = getProducts()
  console.log('Orders page - Current products:', products)

  // For now, show empty state since we don't have real orders yet
  const hasOrders = false

  // Mock order data for demonstration
  const mockOrders = [
    {
      id: 'ORD001',
      buyerName: 'Rajesh Kumar',
      product: 'Organic Wheat',
      date: '2024-01-15',
      amount: '₹5,000',
      status: 'completed',
      contact: '+91 98765 43210'
    },
    {
      id: 'ORD002',
      buyerName: 'Priya Sharma',
      product: 'Fresh Tomatoes',
      date: '2024-01-14',
      amount: '₹2,500',
      status: 'completed',
      contact: '+91 87654 32109'
    }
  ]

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24">
      {/* TopAppBar */}
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-black text-on-surface tracking-tight mb-2">{t('viewOrders')}</h1>
          <p className="text-on-surface-variant font-medium">{t('manageAndTrackOrders')}</p>
        </section>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-primary-container rounded-xl p-6 border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined">shopping_bag</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-sm text-primary/80 font-medium">Total Orders</p>
              </div>
            </div>
          </div>
          
          <div className="bg-tertiary-container rounded-xl p-6 border border-tertiary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center text-on-tertiary">
                <span className="material-symbols-outlined">pending</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-tertiary">3</p>
                <p className="text-sm text-tertiary/80 font-medium">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary-container rounded-xl p-6 border border-secondary/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">9</p>
                <p className="text-sm text-secondary/80 font-medium">Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-on-surface mb-2">{t('recentSales')}</h2>
            <p className="text-on-surface-variant font-body">{t('manageTrades')}</p>
          </div>

          {hasOrders ? (
            <div className="space-y-4">
              {/* Orders would be mapped here */}
            </div>
          ) : (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="bg-surface-container rounded-xl p-6 border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-on-surface">{order.buyerName}</h3>
                        <span className="px-3 py-1 bg-primary-container text-primary text-xs font-semibold rounded-full">
                          {order.status === 'completed' ? t('completed') : order.status}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-1">{t('productSold')}: {order.product}</p>
                      <p className="text-sm text-on-surface-variant">{t('dateAmount')}: {order.date} • {order.amount}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">call</span>
                        {t('callBuyer')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State (if no orders) */}
          {mockOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-outline">shopping_bag</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">No orders yet</h3>
              <p className="text-on-surface-variant font-body mb-6">When you start selling, your orders will appear here</p>
              <button 
                onClick={handleGoBack}
                className="bg-primary text-on-primary px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                {t('sellProduct')}
              </button>
            </div>
          )}
        </section>

        {/* Help Section */}
        <div className="mt-8 bg-tertiary-container/30 rounded-xl p-6 border border-outline-variant/20">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-on-tertiary-container mb-1">Need help with orders?</h4>
              <p className="text-sm text-on-tertiary-container font-body">
                Contact our support team if you have any questions about your orders or need assistance with buyers.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* BottomNavBar */}
      <BottomNav />
    </div>
  )
}

export default Orders
