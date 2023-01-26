import { useRouter } from 'next/router'

import { signOut } from 'firebase/auth'

import { auth } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'

import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu'
import { useBreakpointValue } from '@chakra-ui/media-query'

import { BiLogOut } from 'react-icons/bi'

export function Navbar() {
  const router = useRouter()
  const { currentUser } = useAuth()

  const handleSignOut = async () => {
    await signOut(auth)

    router.push('/')
  }

  const isMobileVersion = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
    xl: false
  })

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        bg="#2f2d52"
        h="50px"
        p={{ base: '10px', lg: '10px' }}
        color="#ddddf7"
        // display={{ base: 'none', lg: 'flex' }}
      >
        <Text fontWeight="bold">Chat App</Text>
        <Flex gap="10px" alignItems="center">
          <Avatar src={currentUser?.photoURL as string} size="sm" />
          <Text>{currentUser?.displayName}</Text>
          <Button
            colorScheme="none"
            bg="#5d5b8d"
            color="#ddddf7"
            fontSize="12px"
            h="2rem"
            _hover={{
              opacity: '0.7'
            }}
            // p={{ base: '2px' }}
            onClick={handleSignOut}
          >
            Logout
            {/* {isMobileVersion ? <BiLogOut size="1.5rem" /> : 'Logout'} */}
          </Button>
        </Flex>
      </Flex>
      {/* <Flex display={{ base: 'flex', lg: 'none' }} p="0.5rem">
        <Menu>
          <MenuButton as={Button} p="0" rounded="full" h="3rem" w="3rem">
            <Avatar src={currentUser?.photoURL as string} size="md" />
          </MenuButton>
          <MenuList px="0" minW="6rem">
            <MenuItem
              display="flex"
              justifyContent="center"
              px="0"
              onClick={handleSignOut}
            >
              logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex> */}
    </>
  )
}
