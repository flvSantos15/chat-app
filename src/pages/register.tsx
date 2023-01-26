import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useState } from 'react'

import { Flex, Text } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'

import { MdAddPhotoAlternate } from 'react-icons/md'
import { createUserAuthetication } from '../services/firebase/auth'
// import { useAuth } from '../hooks/useAuth'

interface ICreateUserDocResponse {
  uid: string
  displayName: string
  email: string
}

export default function Register() {
  const router = useRouter()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRedirectToLogin = () => {
    router.push('/')
  }

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return
      }

      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setProfileImage(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    },
    []
  )

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      if (!email || !password || !displayName) {
        return
      }

      const response = await createUserAuthetication({
        email,
        password,
        displayName: displayName.toLowerCase(),
        file: profileImage as string
      })

      if (response.email) {
        router.push('/')
      }
    } catch (err) {
      // configurar o sentry aqui
      console.log(err, 'erro no handleSignUp no register')
    } finally {
      setDisplayName('')
      setEmail('')
      setPassword('')
      setProfileImage(null)
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register | Chat App</title>
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
          px={{ base: '20px', xl: '60px' }}
          borderRadius="10px"
          gap="10px"
          alignItems="center"
        >
          <Text color="#5d5b8d" fontWeight="bold" fontSize="24px">
            Chat App
          </Text>

          <Text color="#5d5b8d" fontWeight="bold" fontSize="12px">
            Register
          </Text>

          <Flex as="form" flexDir="column" gap="14px" onSubmit={handleSignUp}>
            <FormControl display="flex" flexDir="column" gap="15px">
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="display name"
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <FormControl display="flex" flexDir="column" gap="15px">
              <FormLabel
                htmlFor="file"
                display="flex"
                alignItems="center"
                gap="10px"
                color="#8da4f1"
                fontSize="12px"
                cursor="pointer"
              >
                <MdAddPhotoAlternate color="#8da4f1" size="2rem" />
                Add an avatar
              </FormLabel>
              <Input
                id="file"
                name="file"
                type="file"
                // onChange={(e) => setFile(e.target.files)}
                onChange={handleImageUpload}
                display="none"
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
              type="submit"
              colorScheme="none"
              bg="#7b96ec"
              color="#fff"
              p="10px"
              fontWeight="bold"
              cursor={isLoading ? 'not-allowed' : 'pointer'}
              border="none"
              w="100%"
              isLoading={isLoading}
              loadingText="Loading..."
              isDisabled={isLoading}
            >
              Sign Up
            </Button>
          </Flex>

          <Flex gap="5px" mt="10px" alignItems="center">
            <Text color="#5d5b8d" fontSize="12px">
              Do you have an account?
            </Text>
            <Button
              colorScheme="none"
              color="#5d5b8d"
              fontSize="12px"
              fontWeight="bold"
              w="2rem"
              h="1.5rem"
              onClick={handleRedirectToLogin}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
