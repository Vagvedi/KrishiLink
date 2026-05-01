import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Check for existing session on mount
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Fetch user role from users table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        setUserRole(userData?.role || null)
      }
      
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Fetch user role from users table
          const { data: userData } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single()
          
          setUserRole(userData?.role || null)
        } else {
          setUserRole(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signup = async (email, password, role) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      // Create user record in users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              role: role,
              created_at: new Date().toISOString()
            }
          ])

        if (insertError) throw insertError
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear auth state
      setUser(null)
      setUserRole(null)
      
      // Clear all localStorage data
      localStorage.removeItem('krishilink_products')
      localStorage.removeItem('language')
      localStorage.removeItem('theme')
      
      // Clear any other app-specific localStorage items
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('krishilink_') || key === 'language' || key === 'theme') {
          localStorage.removeItem(key)
        }
      })
      
      console.log('AuthContext - All data cleared during logout')
      
      return { success: true }
    } catch (error) {
      console.error('AuthContext - Logout error:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    userRole,
    loading,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
