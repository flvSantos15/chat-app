import { useState, useEffect } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'

import { db } from '../services/firebase'

import { useChat } from '../hooks/useChat'

import { Message } from './Message'

import { Flex } from '@chakra-ui/layout'

interface MessageProps {
  id: string
  text: string
  senderId: string
  date: string
  img: string
}

export function Messages() {
  const { data } = useChat()

  const [messages, setMessages] = useState<MessageProps[]>([])

  const handleGetMessages = async () => {
    const docsRef = doc(db, 'chats', String(data.chatId))

    await onSnapshot(docsRef, (doc) => {
      if (doc.exists()) {
        setMessages(doc.data()?.messages)
      }
    })
  }

  useEffect(() => {
    handleGetMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Flex
      bg="#ddddf7"
      p="10px"
      flexDir="column"
      style={{
        height: 'calc(100% - 100px)'
      }}
      overflowY="auto"
    >
      {messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Flex>
  )
}
