import {  Link as  Text,  Code,  useColorMode, Switch, Box, Flex} from '@chakra-ui/react';
import { Banner } from '../components/banner';
import { DarkModeSwitch } from '../components/darkModeSwitch';
import { Navigation } from '../components/navigation';

const Index = () => (
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
      <Text>
          Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
          <Code>typescript</Code>.
      </Text>
    <DarkModeSwitch />
    </Box>
    </Flex>
  </div>
)
export default Index