import { Flex, Text } from '@chakra-ui/layout'

import { IoMdVideocam, IoIosMore } from 'react-icons/io'
import { HiUserAdd } from 'react-icons/hi'
import { Messages } from './Messages'
import { ChatInput } from './ChatInput'

export function Chat() {
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
        <Text>Jane</Text>
        <Flex gap="10px">
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
