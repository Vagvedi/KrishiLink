import React, { createContext, useContext, useState } from 'react'

const ProductContext = createContext()

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])

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

  const value = {
    products,
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductsCount,
    getActiveProductsCount,
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
