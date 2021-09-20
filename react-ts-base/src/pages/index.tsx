import {  Link as  Text,  Code,  useColorMode, Switch, Box, Flex} from '@chakra-ui/react';
import { Navigation } from '../components/navigation';

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
}

const Index = () => (
  <div>
    <Navigation/>
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