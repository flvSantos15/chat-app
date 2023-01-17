import { User } from 'firebase/auth'
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useReducer,
  Dispatch
} from 'react'

import { useAuth } from '../hooks/useAuth'

type CustomUserProps = Pick<User, 'displayName' | 'email' | 'photoURL' | 'uid'>

interface ChatState {
  chatId: string
  user: CustomUserProps
}

interface ChatContextData {
  data: ChatState
  dispatch: Dispatch<any>
}

interface ChatProviderProps {
  children: ReactNode
}

export const ChatContext = createContext({} as ChatContextData)

export function ChatProvider({ children }: ChatProviderProps) {
  const { currentUser } = useAuth()

  const INITIAL_STATE: ChatState = {
    chatId: 'null',
    user: {
      displayName: 'null',
      email: 'null',
      photoURL: 'null',
      uid: 'null'
    }
  }

  const chatReducer = (state: ChatState, action: any) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            String(currentUser?.uid) > action.payload?.uid
              ? currentUser?.uid + action.payload?.uid
              : action.payload?.uid + currentUser?.uid
        }

      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider
      value={{
        data: state,
        dispatch
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
