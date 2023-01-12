import { Flex } from '@chakra-ui/layout'
import { Navbar } from './Navbar'
import { Search } from './Search'

export function Sidebar() {
  return (
    <Flex flex={1} bg="#3e3c61" flexDir="column">
      <Navbar />
      <Search />
    </Flex>
  )
}
