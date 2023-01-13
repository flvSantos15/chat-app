import { Flex } from '@chakra-ui/layout'
import { Message } from './Message'

export function Messages() {
  return (
    <Flex
      bg="#ddddf7"
      p="10px"
      flexDir="column"
      style={{
        height: 'calc(100% - 100px)'
      }}
      overflowY="scroll"
    >
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </Flex>
  )
}