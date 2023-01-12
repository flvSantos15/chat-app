import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'
import { theme } from '../styles/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
