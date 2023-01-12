import Head from 'next/head'
import { useRouter } from 'next/router'

import { Flex, Text } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

export default function Login() {
  const router = useRouter()

  const handleRedirectToRegister = () => {
    router.push('/register')
  }

  return (
    <>
      <Head>
        <title>Login | Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDir="column"
        bg="#a7bcff"
        h="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          flexDir="column"
          bg="#fff"
          py="20px"
          px="60px"
          borderRadius="10px"
          gap="10px"
          alignItems="center"
        >
          <Text color="#5d5b8d" fontWeight="bold" fontSize="24px">
            Chat App
          </Text>

          <Text color="#5d5b8d" fontWeight="bold" fontSize="12px">
            Login
          </Text>

          <FormControl display="flex" flexDir="column" gap="15px">
            <Input
              type="email"
              placeholder="email"
              p="15px"
              border="none"
              w="280px"
              borderBottom="1px solid #a7bcff"
              _placeholder={{
                color: 'rgba(175, 175, 175)'
              }}
            />
          </FormControl>

          <FormControl display="flex" flexDir="column" gap="15px">
            <Input
              type="password"
              placeholder="password"
              p="15px"
              border="none"
              w="280px"
              borderBottom="1px solid #a7bcff"
              _placeholder={{
                color: 'rgba(175, 175, 175)'
              }}
            />
          </FormControl>

          <Button
            colorScheme="none"
            bg="#7b96ec"
            color="#fff"
            p="10px"
            fontWeight="bold"
            cursor="pointer"
            border="none"
            w="100%"
          >
            Sign In
          </Button>

          <Flex mt="10px" gap="10px" alignItems="center">
            <Text color="#5d5b8d" fontSize="12px">
              Don&apos;t have an account yet?
            </Text>
            <Button
              colorScheme="none"
              color="#5d5b8d"
              fontSize="12px"
              fontWeight="bold"
              w="3rem"
              h="1.5rem"
              onClick={handleRedirectToRegister}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
