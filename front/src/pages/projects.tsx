import {  Link as  Text, Box, Flex} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';
import { useProjectsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Projects = () => {
  const [{data}] = useProjectsQuery();
  return (
    <>
    <Navigation/>
    <Banner/>
    <Flex  
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        w="70vw"
      >
      {!data ? (
        <div> Loading..... </div>
      ) : data.projects.map( (post) =>
          <div key={post.id}>
            <br/>
            <Box
              w="100%" 
              bg="black" 
            >  
              <Box
                pl="5%" //padding left
                pr="5%"  //padding right
                textAlign="left"
              >         
                <Text
                  color="white"
                  fontSize="2em"
                  fontWeight="extrabold"
                >
                  {post.title}
                </Text>
              </Box>
              <Box
                pl="8%"
                pr="8%"
              >
                <Text
                color="white"
                > 
                  <br/> {post.body}
                </Text>
              </Box>
            </Box>
            {/*<Button onClick={//</div>liveEdit(post)}>  EDIT </Button>*/}
      </div>
      )}  
    </Box>
    <DarkModeSwitch />
    </Flex>
  </>
  )
}
export default withUrqlClient(createUrqlClient)(Projects); // be default this is a standard urql without ssr on 