import { useChat } from '../hooks/useChat'

import { Messages } from './Messages'
import { ChatInput } from './ChatInput'

import { Flex, Text } from '@chakra-ui/layout'
import { useBreakpointValue } from '@chakra-ui/media-query'

import { IoMdVideocam, IoIosMore } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'
import { HiUserAdd } from 'react-icons/hi'

export function Chat() {
  const { data, dispatch } = useChat()

  const isMobileVersion = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false
  })

  const handleDeleteCurrentChat = () => {
    dispatch({ type: '', payload: null })
  }

  return (
    <Flex flex={2} flexDir="column">
      <Flex
        w="100%"
        h="50px"
        bg="#5d5b8d"
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        color="lightgray"
      >
        <Flex gap="0.5rem" alignItems="center">
          {isMobileVersion && (
            <IoArrowBackOutline
              size="1.5rem"
              onClick={handleDeleteCurrentChat}
            />
          )}
          <Text fontSize="1.5rem">
            {data.user?.displayName !== 'null' && data.user?.displayName}
          </Text>
        </Flex>
        <Flex gap="10px" alignSelf="end">
          <IoMdVideocam size="2rem" />
          <HiUserAdd size="2rem" />
          <IoIosMore size="2rem" />
        </Flex>
      </Flex>
      <Messages />
      <ChatInput />
    </Flex>
  )
}
