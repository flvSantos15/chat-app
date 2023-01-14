import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react'

import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../services/firebase'
import { getUserData } from '../services/firebase/auth'

import { JonImg } from '../../JonImg'

interface AuthContextData {
  user: User
  currentUser: User
  userName: string
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [userName, setUserName] = useState('')

  const getUserAdditionalData = async () => {
    const userRes = await getUserData({ uid: user?.uid })

    if (userRes) {
      const { displayName, photoURL } = userRes

      let userAdditional = {
        ...user
      }

      userAdditional.displayName = displayName as string
      userAdditional.photoURL = photoURL as string

      setCurrentUser(userAdditional)
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user as User)
    })

    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    getUserAdditionalData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const contextValues = useMemo(
    () => ({
      user,
      currentUser,
      userName
    }),
    [user, currentUser, userName]
  )

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  )
}
