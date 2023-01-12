import { Flex } from '@chakra-ui/layout'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

export default function Home() {
  return (
    <Flex
      bg="#a7bcff"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      p="0.5rem"
    >
      <Flex overflow="hidden" borderRadius="10px" w="100%" h="100%">
        <Sidebar />
        <Chat />
      </Flex>
    </Flex>
  )
}
