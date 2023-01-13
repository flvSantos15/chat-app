import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { auth } from '../services/firebase'

interface AuthContextData {
  user: User | null
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user)
      console.log(user)
    })

    return () => {
      unsub()
    }
  }, [])

  const contextValues = useMemo(
    () => ({
      user
    }),
    [user]
  )

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
