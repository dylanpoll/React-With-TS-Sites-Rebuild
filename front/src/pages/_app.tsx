import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
export default MyApp

/*import { Provider, createClient } from 'urql'
import { GRAPHQL_URL } from '../constants'

const client = createClient({ 
  url: GRAPHQL_URL, 
  fetchOptions: {
    credentials: "include",
  }
})// in the event you have a cors error reported, 

//    <Provider value={client}>
//    </Provider>

*/