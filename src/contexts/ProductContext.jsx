import React, { createContext, useContext, useState, useEffect } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem('krishilink_products')
      return savedProducts ? JSON.parse(savedProducts) : []
    } catch (error) {
      console.error('Error loading products from localStorage:', error)
      return []
    }
  })

  // Save products to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('krishilink_products', JSON.stringify(products))
    } catch (error) {
      console.error('Error saving products to localStorage:', error)
    }
  }, [products])

  // Add new product to global state
  const addProduct = (productData) => {
    console.log('Adding product to global state:', productData)
    
    const newProduct = {
      id: `PRD${Date.now()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      status: 'Available'
    }
    
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts, newProduct]
      console.log('Updated products array:', updatedProducts)
      return updatedProducts
    })
    
    return newProduct
  }

  // Get all products
  const getProducts = () => {
    console.log('Getting products from global state:', products)
    return products
  }

  // Get product by ID
  const getProduct = (id) => {
    return products.find(product => product.id === id)
  }

  // Update product
  const updateProduct = (id, updates) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    )
  }

  // Delete product
  const deleteProduct = (id) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== id)
    )
  }

  // Get products count
  const getProductsCount = () => {
    return products.length
  }

  // Get active products count
  const getActiveProductsCount = () => {
    return products.filter(product => product.status === 'Available').length
  }

  // Clear all products (for logout)
  const clearProducts = () => {
    setProducts([])
    localStorage.removeItem('krishilink_products')
    console.log('ProductContext - Products cleared')
  }

  const value = {
    products,
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsCount,
    getActiveProductsCount,
    clearProducts,
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProductContext() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}
