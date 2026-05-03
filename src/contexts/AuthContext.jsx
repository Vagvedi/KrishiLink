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
      try {
        console.log('🔍 AuthContext: Getting session...')
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth timeout')), 5000)
        )
        
        const { data: { session } } = await Promise.race([
          supabase.auth.getSession(),
          timeoutPromise
        ])

        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()

            setUserRole(profile?.role || null)
          } catch (profileError) {
            console.error('Profile fetch error:', profileError)
            setUserRole(null)
          }
        }
      } catch (err) {
        console.error('Auth error:', err)
        setUser(null)
        setUserRole(null)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single()

            setUserRole(profile?.role || null)
          } catch (profileError) {
            console.error('Profile fetch error in auth change:', profileError)
            setUserRole(null)
          }
        } else {
          setUserRole(null)
        }

        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 🔥 FIXED SIGNUP
  const signup = async (email, password, role, name) => {
    try {
      console.log('🔐 AuthContext: Starting signup for email:', email)
      
      // Step 1: create auth user with timeout
      const signupPromise = supabase.auth.signUp({
        email,
        password,
      })
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Signup timeout')), 10000)
      )
      
      const { data, error } = await Promise.race([signupPromise, timeoutPromise])

      if (error) {
        console.error('❌ AuthContext: Supabase signup error:', error)
        throw error
      }

      console.log('✅ AuthContext: Supabase signup successful')

      // Step 2: use user data directly from signup response
      if (!data.user) {
        throw new Error("User data not available after signup")
      }

      console.log('📝 AuthContext: Inserting profile for user:', data.user.id)

      // Step 3: insert profile using user from signup response
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name: name,
            role: role,
          },
        ])

      if (insertError) {
        console.error('❌ AuthContext: Profile insert error:', insertError)
        throw insertError
      }

      console.log('✅ AuthContext: Profile inserted successfully')
      return { success: true }
    } catch (error) {
      console.error("❌ AuthContext: Signup error:", error)
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

      let role = null

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        role = profile?.role || null
        setUserRole(role)
      }

      return { success: true, role }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setUserRole(null)
  }

  const value = {
    user,
    userRole,
    loading,
    signup,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}