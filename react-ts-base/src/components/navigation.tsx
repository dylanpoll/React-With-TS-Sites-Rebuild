import { Box, Flex, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavigationProps{}
// eslint-disable-next-line no-empty-pattern
export const Navigation: React.FC<NavigationProps> = ({}) => {

    //*********** the next two lines are the issue. if I use the uncommented one, no errors but cache doesn't properly update
                    // if I use the commented out one, I get a error but other than logout, sign in and register properly update catche onSubmit
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    //const [logout, { fetching: logoutFetching } ] = useLogoutMutation(); /* THIS PROMPTS ON FETCHING -> Property 'fetching' does not exist on type '(variables?: Exact<{ [key: string]: never; }> | undefined, context?: Partial<OperationContext> | undefined) => Promise<OperationResult<LogoutMutation, Exact<...>>>'.ts(2339) */
    // at the bottom of the post I pasted where fetching comes from.

    const [{data, fetching}] = useMeQuery();    //fetching is a boolean value
    var body = null;

    if(fetching){
    //still getting data so not decided if logged in or not
    } else if(!data?.me){ //no user data means not logged in so offer options
        body = (
            <>
            <NextLink href="/login">
                <Link> Login </Link>
            </NextLink>
            <NextLink href="/register">
                <Link> Register </Link>
            </NextLink>
            </>
        );
    }else{  //as there is user data wont offer signin or registering
        body = (
            <Flex align="center">
              <Box> Hello {data.me.username} </Box>
              <Button
                onClick={ async () => { // I have gone with and without async, I see no change of the issue however there is a returned statement so I am leaving it async
                  await logout();   
                }}
                fetching={logoutFetching}
                variant="link"
              >
                logout
              </Button>
            </Flex>
          );
    }
    return(
        <Flex 
        p={4} 
        alignItems="flex-start" 
        justifyContent="space-around"
        >
        <Box>
        {body}
        </Box>
        </Flex>
    )
}