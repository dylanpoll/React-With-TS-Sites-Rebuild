import {  Link as  Text,   Box, Flex
  //, Button, Code,  Switch, Link
    } from '@chakra-ui/react';
//import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
//import { InputField } from '../components/inputField';
import { Navigation } from '../components/navigation';
import { usePostsQuery 
  //, useUpdatePostMutation 
        } from '../generated/graphql';
import { createUrqlClient } from '../utilities/createUrqlClient';


const Blog = () => {
  const [{data}] = usePostsQuery();
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
        ) : data.posts.map( (post) =>
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
                    <br/> 
                    {post.body}
                  </Text>
                </Box>
              
              </Box>
              {/*<Button onClick={//</div>liveEdit(post)}>  EDIT </Button>*/}
        </div>
        )}  {/* this states if != no data present returns a div printing out "loading..." -> : breaks statement into 2 argument outcome, -> print and map data  */}
        
        </Box>

      <DarkModeSwitch />
      </Flex>
    </>
  )
}
export default withUrqlClient(createUrqlClient)(Blog); // be default this is a standard urql without ssr on 



/*
//copy before editing 

const Blog = () => {
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
      ) : data.posts.map( (post) =>
          <div key={post.id}>
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
            {post.title}
            </Text>
            <Text>
            <br/> 
            {post.body}
            </Text>
            </Box>
            <Button onClick={//</div>liveEdit(post)}>  EDIT </Button>
              </div>
              )}  
              </Box>
            <DarkModeSwitch />
            </Flex>
          </div>
          )
        }
        export default withUrqlClient(createUrqlClient)(Blog); // be default this is a standard urql without ssr on 
        



// I am going to work on all of this further later and commenting out what does not currently work...

const liveEdit = (selectedPost: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, updatePost] = useUpdatePostMutation();
  <Formik 
  initialValues={{ id: selectedPost.id, title: selectedPost.title, body: selectedPost.body}} 
      onSubmit={async ( values, {setErrors} ) => {
          //console.log(values);
          await updatePost();
  }} 
>
{({ isSubmitting }) => (
<Form>
<InputField
  name="title"
  placeholder={selectedPost.title}
  label="Title"
/>
<Box mt={2}>
  <InputField 
  name="body" 
  placeholder={selectedPost.body}
  label="Body" />
</Box>
<Button mt={2} type="submit" isLoading={isSubmitting} > Submit Update </Button>
</Form>
)}
</Formik>
}
*/