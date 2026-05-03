import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const { isFarmer, isBuyer, isAdmin, user } = useAuth()
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

  // Add new product to global state (Farmers and Admins only)
  const addProduct = (productData) => {
    // Role validation: Only farmers and admins can add products
    if (!isFarmer() && !isAdmin()) {
      throw new Error('Access denied: Only farmers and admins can add products')
    }

    console.log('Adding product to global state:', productData)
    
    const newProduct = {
      id: `PRD${Date.now()}`,
      ...productData,
      sellerId: user?.id || 'unknown',
      sellerEmail: user?.email || 'unknown',
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

  // Update product (Farmers and Admins only)
  const updateProduct = (id, updates) => {
    // Role validation: Only farmers and admins can update products
    if (!isFarmer() && !isAdmin()) {
      throw new Error('Access denied: Only farmers and admins can update products')
    }

    // Additional validation: Farmers can only update their own products
    const product = products.find(p => p.id === id)
    if (isFarmer() && product?.sellerId !== user?.id) {
      throw new Error('Access denied: You can only update your own products')
    }

    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product
      )
    )
  }

  // Delete product (Farmers and Admins only)
  const deleteProduct = (id) => {
    // Role validation: Only farmers and admins can delete products
    if (!isFarmer() && !isAdmin()) {
      throw new Error('Access denied: Only farmers and admins can delete products')
    }

    // Additional validation: Farmers can only delete their own products
    const product = products.find(p => p.id === id)
    if (isFarmer() && product?.sellerId !== user?.id) {
      throw new Error('Access denied: You can only delete your own products')
    }

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

  // Helper functions for role-based access
  const getMyProducts = () => {
    if (!user) return []
    return products.filter(product => product.sellerId === user.id)
  }

  const canEditProduct = (productId) => {
    if (isAdmin()) return true
    if (!isFarmer()) return false
    
    const product = products.find(p => p.id === productId)
    return product?.sellerId === user?.id
  }

  const canDeleteProduct = (productId) => {
    return canEditProduct(productId) // Same logic as edit
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
    getMyProducts,
    canEditProduct,
    canDeleteProduct,
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
