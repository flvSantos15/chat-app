import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react'
import { useRouter } from 'next/router'

import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUserData } from '../services/firebase/auth'

interface SignInRequest {
  email: string
  password: string
}
interface AuthContextData {
  user: User | null
  currentUser: User | null
  SignIn: (value: SignInRequest) => void
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const SignIn = async ({ email, password }: SignInRequest) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)

      setUser(user)

      if (user) {
        router.push('/home')
      }
    } catch (err) {
      return err
    }
  }

  const getUserAdditionalData = async () => {
    const userRes = await getUserData({ uid: user?.uid as string })

    if (userRes) {
      const { displayName, photoURL } = userRes

      let userAdditional = {
        ...user
      }

      userAdditional.displayName = displayName as string
      userAdditional.photoURL = photoURL as string

      setCurrentUser(userAdditional as User)
    }
  }

  useEffect(() => {
    getUserAdditionalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (router.pathname === '/home' && !user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        SignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
