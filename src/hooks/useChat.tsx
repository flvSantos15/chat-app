import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

export const useChat = () => {
  const context = useContext(ChatContext)

  return context
}
