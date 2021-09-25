import { Box, Flex, Link, Button,  Text, chakra, useBreakpointValue  } from "@chakra-ui/react";
import Image from "next/image"; // evidently has issues with chackra https://github.com/chakra-ui/chakra-ui/discussions/2475 
import React from "react";
   
const ProductImage = chakra(Image, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
})//const greetme = "../../public/greetme.jpg";

// eslint-disable-next-line no-empty-pattern
export const Banner : React.FC<{}> = ({}) => {

    return(
        <Flex >
            <Box
            width="100%"
            bg="#e7ad00" 
            >
                <Box 
                ml="20%"
                >
                    <ProductImage
                        width="100%"
                        height="100%"
                        w="auto"
                        h="auto"
                        borderWidth={5}
                        borderStyle="solid"
                        src="/assets/greetme.jpg" 
                        alt="banner" 
                        className = "banner"
                    />
                </Box>
            </Box>
        </Flex>
    )
}

/*
       <Flex>
        <Box 
        //position="absolute"
        //pos="fixed" 
        zIndex={-2}
        w="100%" h="200px" 
        bgGradient="radial(gray.300, yellow.400, pink.200)"
        color='red' // applies to text
        //bg='tomato' // background 
        >
        <Text
            textShadow="10px 10px grey"
            m="6"  //margin
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
        > word </Text>
        </Box>


        <Box 
//          bgImage="url('/images/kyuubi.png')"
//          bgPosition="center"
//          bgRepeat="no-repeat"
//        boxSize="sm"
        border="1px" 
        borderColor="gray.200"
        w="100%" 
        h="200px" 
        bgGradient="linear(to-t, green.200, pink.500)" 
        >
        <Text
        textAlign={[ 'left', 'center' ]} // text-align `left` on all viewports and `center` from the first breakpoint and up || from : https://chakra-ui.com/docs/features/style-props
        fontSize="md"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        //fontSize="6xl"
        fontWeight="extrabold"
        > word and </Text>
        <Button borderTopRadius="md">Button 2</Button>
        </Box>
        <Button
            colorScheme="teal"
            _hover={{
                background: "white",
                color: "teal.500",
            }}
        >
        Hover me
        </Button>
        </Flex>
        <Flex>
            <img 
            src="assets/greetme.jpg" 
            alt="banner" 
            className = "banner"
            />
        </Flex>

*/