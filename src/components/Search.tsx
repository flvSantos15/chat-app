import { useEffect, useState } from 'react'

import { getUser } from '../services/firebase/auth'

import { Input } from '@chakra-ui/input'
import { Flex, Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'

interface User {
  photoURL: string
  email: string
  displayName: string
}

export function Search() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<User | null>(null)

  const handleSearch = async () => {
    try {
      // const response = await getUser({ userName: userName.toLowerCase() })
      const response = await getUser({ userName })
      setUser(response as User)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (userName.length > 0) {
      handleSearch()
    } else {
      setUser(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName])

  return (
    <Flex flexDir="column" borderBottom="1px solid gray">
      <Flex p="10px">
        <Input
          bg="transparent"
          border="none"
          color="#fff"
          outline="none"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="find a user"
          _placeholder={{
            color: 'lightgray'
          }}
        />
      </Flex>
      {user && (
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
          <Avatar src={user?.photoURL} />
          <Flex>
            <Text>{user?.displayName}</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
