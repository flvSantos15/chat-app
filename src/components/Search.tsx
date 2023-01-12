import { Input } from '@chakra-ui/input'
import { Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'

export function Search() {
  return (
    <Flex flexDir="column" borderBottom="1px solid gray">
      <Flex p="10px">
        <Input
          bg="transparent"
          border="none"
          color="#fff"
          outline="none"
          placeholder="find a user"
          _placeholder={{
            color: 'lightgray'
          }}
        />
      </Flex>
      <Flex
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
        <Flex>
          <Text>Paul</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
