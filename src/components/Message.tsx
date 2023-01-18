import { useEffect, useRef, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { useChat } from '../hooks/useChat'

import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Flex, Text } from '@chakra-ui/layout'

type Message = {
  id: string
  text: string
  senderId: string
  date: string
  img: string
}

interface MessageProps {
  message: Message
}

export function Message({ message }: MessageProps) {
  const { currentUser } = useAuth()
  const { data } = useChat()

  const [isOwner, setIsOwner] = useState(false)

  // const flexRef = useRef(null)

  useEffect(() => {
    if (currentUser?.uid === message.senderId) {
      setIsOwner(true)
    }
  }, [currentUser, message])

  // useEffect(() => {
  //   // ref.current?.scrollIntoView({ behavior: 'smooth' })

  // }, [message])

  return (
    <Flex
      // ref={flexRef}
      gap="20px"
      // alignItems="center"
      alignItems="flex-start"
      mb="20px"
      flexDir={isOwner ? 'row-reverse' : 'row'}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        color="gray.400"
        fontWeight="300"
        // gap="10px"
      >
        <Image
          src={
            isOwner
              ? (currentUser?.photoURL as string)
              : (data?.user?.photoURL as string)
          }
          alt=""
          rounded="full"
          w="50px"
          h="50px"
          objectFit="cover"
        />
        <Text>just now</Text>
      </Flex>
      <Flex
        w="100%"
        alignItems={isOwner ? 'end' : 'start'}
        flexDir="column"
        maxW="80%"
        gap="10px"
      >
        {message.text && (
          <Text
            bg={isOwner ? '#8da4f1' : '#fff'}
            color={isOwner ? '#fff' : 'blackAlpha.600'}
            py="10px"
            px="20px"
            w="100%"
            maxW="max-content"
            borderRadius={isOwner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}
          >
            {message.text}
          </Text>
        )}
        {message.img && (
          // <Image src={message.img} width={400} height={200} alt="" />
          <Image src={message.img} width="400px" height="200px" alt="" />
        )}
      </Flex>
    </Flex>
  )
}
