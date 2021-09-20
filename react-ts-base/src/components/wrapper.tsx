import { Box } from "@chakra-ui/react";

interface wrapperProps {}

export const Wrapper: React.FC<wrapperProps> = ({ children }) => { // this is a wrapper that we use for the page content in general, if you have issues with this make sure children is lowercase as capitilized is a special react object
    return <Box mt= {8} mx="auto" maxW="800px" w="100%" >{ children }</Box>; 
}; 