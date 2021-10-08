import {  Link as  Text,  Code,  Switch, Box, Flex, Button, Link} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Index = () => {
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
export default withUrqlClient(createUrqlClient)(Index); // be default this is a standard urql without ssr on 