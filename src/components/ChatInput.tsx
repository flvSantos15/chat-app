import { useCallback, useState } from 'react'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import { v4 as uuid } from 'uuid'

import { db } from '../services/firebase'

import { useAuth } from '../hooks/useAuth'
import { useChat } from '../hooks/useChat'

import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Flex } from '@chakra-ui/layout'

import { MdAddPhotoAlternate, MdOutlineAttachFile } from 'react-icons/md'

export function ChatInput() {
  const { currentUser } = useAuth()
  const { data } = useChat()

  const [text, setText] = useState('')
  const [img, setImg] = useState('')

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      if (!event.target.files?.length) {
        return
      }

      const file = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setImg(fileReader.result as string)
      }
      fileReader.readAsDataURL(file)
    },
    []
  )

  const handleSend = async () => {
    if (img) {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now(),
          img
        })
      })
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, 'usersChats', String(currentUser?.uid)), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    })

    await updateDoc(doc(db, 'usersChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text
      },
      [data.chatId + '.date']: serverTimestamp()
    })

    setText('')
    setImg('')
  }

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
        value={text}
        onChange={(e) => setText(e.target.value)}
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
            <Input
              id="file"
              name="file"
              type="file"
              display="none"
              onChange={handleImageUpload}
            />
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
          onClick={handleSend}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  )
}
