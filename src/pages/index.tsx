import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'

import { useAuth } from '../hooks/useAuth'

import { CustomButton } from '../components/atoms/CustomButton'
import { CustomInput } from '../components/atoms/CustomInput'

import { Flex, Text } from '@chakra-ui/layout'
import { FormControl } from '@chakra-ui/form-control'
import { Button } from '@chakra-ui/button'

export default function Login() {
  const router = useRouter()
  const { SignIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault()

    setIsSubmitting(true)

    try {
      await SignIn({
        email,
        password
      })
    } catch (err) {
      console.log(err, 'erro on handleSignIng')
    } finally {
      setEmail('')
      setPassword('')
      setIsSubmitting(false)
    }
  }

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
          px={{ base: '30px', xl: '60px' }}
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

          <Flex as="form" flexDir="column" gap="14px" onSubmit={handleSignIn}>
            <FormControl display="flex" flexDir="column" gap="15px">
              <CustomInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
            </FormControl>

            <FormControl display="flex" flexDir="column" gap="15px">
              <CustomInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </FormControl>

            <CustomButton isLoading={isSubmitting} loadingText="Submitting...">
              Sign In
            </CustomButton>
          </Flex>

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
