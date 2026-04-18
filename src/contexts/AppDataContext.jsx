import React, { createContext, useContext, useState, useEffect } from 'react'

const AppDataContext = createContext()

export function AppDataProvider({ children }) {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  // Initialize with some sample data to make the app functional
  useEffect(() => {
    // Initialize with sample orders if empty
    if (orders.length === 0) {
      setOrders([
        { id: 'ORD001', product: 'Organic Wheat', quantity: '500 kg', status: 'Delivered', date: '2024-04-15', buyer: 'Mumbai Fresh Market' },
        { id: 'ORD002', product: 'Basmati Rice', quantity: '300 kg', status: 'In Transit', date: '2024-04-16', buyer: 'Delhi Organic Store' },
        { id: 'ORD003', product: 'Fresh Tomatoes', quantity: '150 kg', status: 'Processing', date: '2024-04-17', buyer: 'Bangalore Food Co.' },
      ])
    }
  }, [])

  // Add new product
  const addProduct = (productData) => {
    const newProduct = {
      id: `PRD${Date.now()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      status: 'Available'
    }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  // Update product
  const updateProduct = (productId, updates) => {
    setProducts(prev => prev.map(product => 
      product.id === productId ? { ...product, ...updates } : product
    ))
  }

  // Delete product
  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId))
  }

  // Add new order
  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      ...orderData,
      createdAt: new Date().toISOString()
    }
    setOrders(prev => [...prev, newOrder])
    return newOrder
  }

  // Update order status
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ))
  }

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Calculate analytics
  const analytics = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'Available').length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length,
    completedOrders: orders.filter(o => o.status === 'Delivered').length,
    inTransitOrders: orders.filter(o => o.status === 'In Transit').length,
  }

  const value = {
    products,
    orders,
    theme,
    analytics,
    addProduct,
    updateProduct,
    deleteProduct,
    addOrder,
    updateOrderStatus,
    toggleTheme,
  }

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider')
  }
  return context
}
