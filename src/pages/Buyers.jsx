import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import LanguageToggle from '../components/LanguageToggle'
import BuyerProfileModal from '../components/BuyerProfileModal'
import { demoBuyers } from '../data/dummyData'

function Buyers() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const [selectedBuyer, setSelectedBuyer] = useState(null)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)

  const handleGoBack = () => {
    navigate('/dashboard')
  }

  const handleViewProfile = (buyer) => {
    setSelectedBuyer(buyer)
    setProfileModalOpen(true)
  }

  const handleContact = (buyer) => {
    setSelectedBuyer(buyer)
    setContactModalOpen(true)
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className={`mr-4 p-2 rounded-md ${theme === 'dark' ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors`}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('findBuyers')}</h1>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Potential Buyers</h2>
          <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            Connect with verified buyers and distributors
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoBuyers.map((buyer) => (
            <div key={buyer.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow hover:shadow-md transition-shadow p-6`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{buyer.name}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{buyer.type}</p>
                </div>
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l2.8-2.034c.784-.57.784-1.81 0-2.381l-2.8-2.034a1 1 0 00-.364-1.118L9.049 2.927z" />
                  </svg>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{buyer.rating}</span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {buyer.location}
                </div>
                <div className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {buyer.orders} orders
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewProfile(buyer)}
                  className={`flex-1 px-3 py-2 border ${theme === 'dark' ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-md text-sm font-medium transition-colors`}
                >
                  View Profile
                </button>
                <button 
                  onClick={() => handleContact(buyer)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buyer Profile Modal */}
        <BuyerProfileModal 
          buyer={selectedBuyer} 
          isOpen={profileModalOpen} 
          onClose={() => setProfileModalOpen(false)} 
        />

        {/* Contact Modal */}
        {contactModalOpen && selectedBuyer && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" onClick={() => setContactModalOpen(false)}>
                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
              </div>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                  <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Contact {selectedBuyer.name}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <div className={`p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Phone</p>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>+91 98765 43210</p>
                    </div>
                    <div className={`p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Email</p>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedBuyer.name.toLowerCase().replace(/\s+/g, '')}@gmail.com</p>
                    </div>
                    <div className={`p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Business Hours</p>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-gray-700 px-4 py-3' : 'bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'}`}>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setContactModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Buyers
