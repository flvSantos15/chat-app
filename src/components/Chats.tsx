import { useEffect, useState } from 'react'

import { doc, DocumentData, onSnapshot } from 'firebase/firestore'

import { getChats } from '../services/firebase/auth'
import { db } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'

import { Avatar } from '@chakra-ui/avatar'
import { Flex, Text } from '@chakra-ui/layout'
import { useChat } from '../hooks/useChat'

interface UserInfoProps {
  displayName: string
  photoURL: string
  uid: string
}

export function Chats() {
  const { currentUser } = useAuth()
  const { dispatch } = useChat()

  const [chats, setChats] = useState<[string, any][]>()

  const handleGetChats = async () => {
    const docsRef = doc(db, 'usersChats', currentUser?.uid as string)

    await onSnapshot(docsRef, (doc) => {
      setChats(Object.entries(doc.data() as DocumentData))
    })
  }

  // this has to be done for select fn in search component
  const handleSelectUserChat = (user: UserInfoProps) => {
    dispatch({ type: 'CHANGE_USER', payload: user })
  }

  useEffect(() => {
    handleGetChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
  return (
    <Flex w="100%">
      {chats
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <Flex
            key={chat[0]}
            w="100%"
            alignItems="center"
            p="10px"
            gap="10px"
            color="#fff"
            cursor="pointer"
            _hover={{
              bg: '#2f2d52'
            }}
            onClick={() => {
              handleSelectUserChat(chat[1]?.userInfo)
            }}
          >
            <Avatar src={chat[1]?.userInfo?.photoURL} />
            <Flex flexDir="column">
              <Text fontSize="18px" fontWeight="500">
                {chat[1]?.userInfo?.displayName}
              </Text>
              <Text fontSize="14px" color="lightgray">
                {/* {chat[1]?.lastMessage} */}
                {chat[1]?.lastMessage.text}
              </Text>
            </Flex>
          </Flex>
        ))}
    </Flex>
  )
}
