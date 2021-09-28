import {  Link as  Text,  Code,  Switch, Box, Flex} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';
import { usePostsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utilities/createUrqlClient';



const Projects = () => {
  const [{data}] = usePostsQuery();

  return (
  <div>
    <Navigation/>
    <Banner />
    <Flex  
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      ml="10vw"
    >
    <Box>
      {!data ? (
        <div> Loading..... </div>
      ) : data.posts.map( (p) =>
          <div key={p.id}>
            <br/>
            <Box
            bg="grey"
            >
            <Text
            m="6"  //margin
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
        >
            {p.title}
            </Text>
            <Text>
            <br/> 
            {p.body}
            </Text>
            </Box>
          </div>)}  {/* this states if != no data present returns a div printing out "loading..." -> : breaks statement into 2 argument outcome, -> print and map data  */}
      </Box>
      <Text>
        <br/>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
      </Text>
    <DarkModeSwitch />
    </Flex>
  </div>
  )
}
export default withUrqlClient(createUrqlClient)(Projects); // be default this is a standard urql without ssr on 