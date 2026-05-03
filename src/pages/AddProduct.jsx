import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useProductContext } from '../contexts/ProductContext'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

function AddProduct() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const { addProduct } = useProductContext()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Grains',
    price: '',
    quantity: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (loading) return
    
    // Basic validation
    if (!formData.name.trim() || !formData.price.trim() || !formData.quantity.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const newProduct = addProduct(formData)
      setSuccess('Product added successfully!')
      
      // Reset form
      setFormData({
        name: '',
        category: 'Grains',
        price: '',
        quantity: '',
        description: ''
      })
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (error) {
      setError('Failed to add product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-surface min-h-screen pb-24">
      {/* TopAppBar */}
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-lg">1</div>
            <span className="text-xs font-bold text-primary font-label">{t('productInfo')}</span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-bold text-lg">2</div>
            <span className="text-xs font-semibold text-outline font-label">{t('pricing')}</span>
          </div>
          <div className="flex-1 h-[2px] bg-surface-container-highest mx-4"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest text-outline flex items-center justify-center font-bold text-lg">3</div>
            <span className="text-xs font-semibold text-outline font-label">{t('location')}</span>
          </div>
        </div>

        {/* Wizard Content */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_4px_20px_rgba(46,50,48,0.06)] border border-outline-variant/30">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-on-surface mb-2">{t('whatAreYouSelling')}</h2>
            <p className="text-secondary font-body">{t('shareDetails')}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Area */}
            <div className="group relative">
              <label className="block text-sm font-bold text-primary mb-3 font-label px-1">{t('productPhoto')}</label>
              <div className="w-full aspect-video rounded-xl bg-surface-container border-2 border-dashed border-primary-container flex flex-col items-center justify-center cursor-pointer hover:bg-primary-container/10 transition-all duration-300 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col items-center text-primary">
                  <span className="material-symbols-outlined text-6xl mb-3">camera</span>
                  <span className="font-bold text-lg">{t('uploadPhoto')}</span>
                  <span className="text-sm opacity-70">{t('jpgPngUpTo10MB')}</span>
                </div>
                {/* Voice Input Overlay */}
                <button type="button" className="absolute top-4 right-4 bg-tertiary-container text-on-tertiary-container w-12 h-12 rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
                  <span className="material-symbols-outlined">mic</span>
                </button>
              </div>
            </div>

            {/* Product Name */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-primary font-label px-1">{t('productName')}</label>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-primary mr-3">label</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-semibold placeholder:text-outline/50"
                    placeholder={t('egSharbatiWheat')}
                    required
                  />
                </div>
                <button type="button" className="bg-tertiary-container text-on-tertiary-container w-14 h-14 rounded-full flex items-center justify-center shadow-md active:scale-90 transition-transform flex-shrink-0">
                  <span className="material-symbols-outlined text-2xl">mic</span>
                </button>
              </div>
            </div>

            {/* Crop Type Dropdown */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-primary font-label px-1">{t('cropType')}</label>
              <div className="relative">
                <div className="flex items-center w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-primary mr-3">psychiatry</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-semibold appearance-none"
                    required
                  >
                    <option value="">{t('selectCropType')}</option>
                    <option value="Grains">🌾 {t('grains')}</option>
                    <option value="Vegetables">🍅 {t('vegetables')}</option>
                    <option value="Fruits">🍎 Fruits</option>
                    <option value="Dairy">🥛 Dairy</option>
                  </select>
                  <span className="material-symbols-outlined text-outline pointer-events-none">expand_more</span>
                  <button type="button" className="ml-4 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-xl">mic</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Price and Quantity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-primary font-label px-1">{t('price')}</label>
                <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-primary mr-3">currency_rupee</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-semibold placeholder:text-outline/50"
                    placeholder="50"
                    required
                  />
                  <span className="text-sm text-outline">/kg</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-primary font-label px-1">{t('quantity')}</label>
                <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                  <span className="material-symbols-outlined text-primary mr-3">inventory</span>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-semibold placeholder:text-outline/50"
                    placeholder="500"
                    required
                  />
                  <span className="text-sm text-outline">kg</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-primary font-label px-1">{t('description')}</label>
              <div className="flex items-start bg-surface-container-low border border-outline-variant rounded-lg px-4 py-4 focus-within:ring-2 focus-within:ring-primary transition-all">
                <span className="material-symbols-outlined text-primary mr-3 mt-1">description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-semibold placeholder:text-outline/50 resize-none"
                  placeholder="Describe your product quality, origin, and other details..."
                />
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-error-container border border-error rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-error">error</span>
                  <p className="text-on-error-container">{error}</p>
                </div>
              </div>
            )}
            
            {success && (
              <div className="bg-primary-container border border-primary rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <p className="text-on-primary-container">{success}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleGoBack}
                className="flex-1 py-5 px-6 rounded-xl border-2 border-primary text-primary font-black text-lg tracking-wide hover:bg-primary/5 transition-colors active:scale-95"
              >
                {t('back')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-5 px-6 rounded-xl bg-primary text-on-primary font-black text-lg tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-on-primary"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    {t('nextStep')}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Help Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary-container rounded-xl p-6 flex items-start gap-4 border border-outline-variant/20">
            <div className="w-12 h-12 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
            </div>
            <div>
              <h4 className="font-bold text-on-secondary-container mb-1">{t('sellingTip')}</h4>
              <p className="text-sm text-secondary font-body">{t('goodPhotosHelp')}</p>
            </div>
          </div>
          <div className="bg-tertiary-container/30 rounded-xl p-6 flex items-start gap-4 border border-outline-variant/20">
            <div className="w-12 h-12 rounded-lg bg-white/50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-on-tertiary-container mb-1">{t('needHelp')}</h4>
              <p className="text-sm text-on-tertiary-container font-body">{t('tapMicIcon')}</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* BottomNavBar */}
      <BottomNav />
    </div>
  )
}

export default AddProduct
