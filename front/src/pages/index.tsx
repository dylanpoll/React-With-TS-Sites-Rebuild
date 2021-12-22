import {  Link as  Text, Flex, Box } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { Navigation } from '../components/navigation';
import { createUrqlClient } from '../utilities/createUrqlClient';

const Index = () => {
  return (
    <>
      <Navigation/>
      <Flex  
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Box
          w="70vw"
          pl="3%"
          pr="3%"
          pb="1%"
          pt='1%'
          bgColor="black"
          textColor="white"
        >
          <Text fontSize='5xl' fontWeight="extrabold" > 
            This is currently under construction.
          </Text>
          <Box pl="2%" >
            <Text>
              The Goal of this rebuild is to properly impliment a dynamicaly rendered website with while still utilizing SSR from Next.js. 
              My aim is to make this scale well as I have more projects that will work with much of the core built into this current configuration and I have been focused on security
              as much as possible. Currently I plan on improving the UI and color theme options after improving and adding in other core features in the backend.
              <br/><br/>
              this project is being completed with TypeScript and uses primarily the following technologies.
              <br/><br/>
              <Text fontWeight="bold">For the Frontend:</Text> React.js and Next.js, Chakra-UI, Next-URQL and URQL, Formik<br/>
              <Text fontWeight="bold"></Text>For the backend : GraphQL, MikroORM, NodeMailer, Argon2, Express, IORedis, Apollo Server Express, and Express Session<br/>
              <Text fontWeight="bold"></Text>The Databases used are : Postgres and Redis<br/>
              <br/>
              This about me is hard coded, however the blog and projects section dynamically call the content displayed from my database.
              <br/><br/>
            </Text>
          </Box>

          <Text fontSize='5xl' fontWeight="extrabold" > 
            About Me :
          </Text>
          <Box pl="2%" >
            <Text>
              My name is Dylan Poll, I am a software developer who is always looking to learn.
              Some of my current skills include :<br/>
              <br/>
              <Text fontWeight="bold">
                Windows and Linux Systems <br/>
                Board Work, Break Fix and general IT <br/>
                Embedded Systems and general IOT<br/>
                Cloud Networking<br/>
                Server Deployment<br/>
                Software development<br/>
                Full Stack work<br/>
                CAD model development<br/>
                Web Development<br/>
                C++ Programming Language <br/>
                C Programming Language <br/>
                C# Programming Language <br/>
                ava Programming Language   <br/>
                Js+Node Programming Language <br/>
                Python Programming Language   <br/>
                <br/>
              </Text>
            </Text>
          </Box>

          <Text fontSize='5xl' fontWeight="extrabold" > 
            Contact Me :
          </Text>
          <Box pl="2%" >
            <Text fontWeight="bold">
              E-Mail : DylanManPoll@gmail.com  <br/>
              GitHub : github.com/dylanpoll  <br/>
              LinkdIn : linkedin.com/in/dylanpoll <br/>
              Orlando Code Cave Discord Server : https://discord.gg/kRCTTRVt <br/>
              Discord ID : DevDylan#9707<br/>
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
export default withUrqlClient(createUrqlClient)(Index); // be default this is a standard urql without ssr on 