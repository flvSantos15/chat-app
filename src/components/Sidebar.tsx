import { Chats } from './Chats'
import { Navbar } from './Navbar'
import { Search } from './Search'

import { Flex } from '@chakra-ui/layout'

export function Sidebar() {
  return (
    <Flex flex={1} bg="#3e3c61" flexDir="column">
      <Navbar />
      <Search />
      <Chats />
    </Flex>
  )
}
