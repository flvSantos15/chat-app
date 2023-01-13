import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'

import { MdAddPhotoAlternate, MdOutlineAttachFile } from 'react-icons/md'

export function ChatInput() {
  return (
    <Flex
      h="50px"
      bg="#fff"
      p="10px"
      alignItems="center"
      // justifyContent="space-between"
      gap="10px"
    >
      <Input
        type="text"
        placeholder="Type something..."
        _placeholder={{
          color: 'lightgray'
        }}
        // w="100%"
        border="none"
        outline="none"
        color="#2f2d52"
        fontSize="18px"
      />
      <Flex alignItems="center" gap="10px">
        <MdOutlineAttachFile size="1.5rem" cursor="pointer" color="#8da4f1" />
        <Flex>
          <FormControl h="28px" w="25px">
            <FormLabel htmlFor="file">
              <MdAddPhotoAlternate
                size="1.5rem"
                cursor="pointer"
                color="#8da4f1"
              />
            </FormLabel>
            <Input id="file" name="file" type="file" display="none" />
          </FormControl>
        </Flex>
        <Button
          colorScheme="none"
          // w="5rem"
          border="none"
          py="10px"
          px="15"
          color="#fff"
          bg="#8da4f1"
          _hover={{
            opacity: '0.7'
          }}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  )
}
