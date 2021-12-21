import {  Link as  Text, Flex, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Index = () => {
  return (
    <>
      <Navigation/>
      <Banner />

      <Flex  
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        ml="10vw"
      >
        <Box
        
        >
          <Text>
            TODO : About me 
          </Text>
        </Box>
        <DarkModeSwitch />
      </Flex>
      
    </>
  )
}
export default withUrqlClient(createUrqlClient)(Index); // be default this is a standard urql without ssr on 