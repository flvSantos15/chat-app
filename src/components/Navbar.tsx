import { useRouter } from 'next/router'

import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'

import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'

export function Navbar() {
  const router = useRouter()

  const handleSignOut = () => {
    signOut(auth)

    router.push('/')
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="#2f2d52"
      h="50px"
      p="10px"
      color="#ddddf7"
    >
      <Text fontWeight="bold">Chat App</Text>
      <Flex gap="10px" alignItems="center">
        <Avatar size="sm" />
        <Text>John</Text>
        <Button
          colorScheme="none"
          bg="#5d5b8d"
          color="#ddddf7"
          fontSize="10px"
          h="2rem"
          _hover={{
            opacity: '0.7'
          }}
          onClick={handleSignOut}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}
