import { Avatar } from '@chakra-ui/avatar'
import { Flex, Text } from '@chakra-ui/layout'

export function Chats() {
  return (
    <Flex w="100%">
      <Flex
        w="100%"
        alignItems="center"
        p="10px"
        gap="10px"
        color="#fff"
        cursor="pointer"
        _hover={{
          bg: '#2f2d52'
        }}
      >
        <Avatar />
        <Flex flexDir="column">
          <Text fontSize="18px" fontWeight="500">
            Garric
          </Text>
          <Text fontSize="14px" color="lightgray">
            Hello
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
