import {  Link as  Text, Box, Flex} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';
import { useProjectsQuery } from '../generated/graphql';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Projects = () => {
  const [{data}] = useProjectsQuery();
  return (
    <>
      <Navigation/>
      <Flex  
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box
          bgColor="grey"
          w="80vw"
          h="100%"
          pl="5%"
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
                        fontSize="1.5em"
                        fontWeight="extrabold"
                      >
                        {post.title}  
                      </Text>
                      <Text> 
                        <br/>Posted On : {post.createdAt}
                      </Text>
                    </Box>
                    <Box
                      pl="8%"
                      pr="8%"
                      pb="3%"
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
        </Box>
      </Flex>
  </>
  )
}
export default withUrqlClient(createUrqlClient)(Projects); // be default this is a standard urql without ssr on 