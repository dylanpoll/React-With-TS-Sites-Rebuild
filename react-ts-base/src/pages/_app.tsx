import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider options={{ useSystemColorMode: true, }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp


/*
CURRENT TIME STAMP: 2:21:46


about chakra-ui 
  kind of like bootstrap, its just a starter pack for react with a few good components that make front end a bit
faster to deploy.

Notes :
--React 
for any TS files that have react code we label them .tsx 

--nextJS
IN NEXTJS all file names within the pages folder will be a route we can use.

--formik


===========
------original file below

import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
*/