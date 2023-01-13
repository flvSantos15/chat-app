import { Avatar } from '@chakra-ui/avatar'
import { Flex, Text } from '@chakra-ui/layout'
import Image from 'next/image'

export function Message() {
  const owner = true as boolean
  return (
    <Flex
      gap="20px"
      // alignItems="center"
      alignItems="flex-start"
      mb="20px"
      flexDir={owner ? 'row-reverse' : 'row'}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        color="gray.400"
        fontWeight="300"
        // gap="10px"
      >
        <Avatar />
        <Text>just now</Text>
      </Flex>
      <Flex
        w="100%"
        alignItems={owner ? 'end' : 'center'}
        flexDir="column"
        maxW="80%"
        gap="10px"
      >
        <Text
          bg={owner ? '#8da4f1' : '#fff'}
          color={owner ? '#fff' : 'blackAlpha.600'}
          py="10px"
          px="20px"
          w="100%"
          maxW="max-content"
          borderRadius={owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'}
        >
          hello
        </Text>
        <Image
          src="data:image/jpeg;base64,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"
          width={400}
          height={200}
          alt=""
        />
      </Flex>
    </Flex>
  )
}
