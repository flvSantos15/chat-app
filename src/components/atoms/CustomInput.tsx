import React from 'react'

import { Input, InputProps } from '@chakra-ui/input'

interface CustomInputProps extends InputProps {}

export function CustomInput({ ...rest }: CustomInputProps) {
  return (
    <Input
      p="15px"
      border="none"
      w="280px"
      borderBottom="1px solid #a7bcff"
      _placeholder={{
        color: 'rgba(175, 175, 175)'
      }}
      {...rest}
    />
  )
}
