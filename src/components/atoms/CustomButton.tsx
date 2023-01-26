import { ReactNode } from 'react'

import { Button } from '@chakra-ui/button'

interface CustomButtonProps {
  isLoading: boolean
  loadingText: string
  children: ReactNode
}

export function CustomButton({
  isLoading,
  loadingText,
  children
}: CustomButtonProps) {
  return (
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
      loadingText={loadingText}
      isDisabled={isLoading}
    >
      {children}
    </Button>
  )
}
