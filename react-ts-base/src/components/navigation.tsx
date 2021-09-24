import { Box, Flex, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import React from "react";
import { useRouter } from "next/router";

// eslint-disable-next-line no-empty-pattern
export const Navigation: React.FC<{}> = ({}) => {
    const router = useRouter();
    var body = null;
    const [{data, fetching}] = useMeQuery();    //fetching is a boolean value from URQL  https://formidable.com/open-source/urql/docs/api/urql/
    const [ { fetching: logoutFetching }, logout ] = useLogoutMutation(); // by defining fetching in this way we make it so it has a additional type def to avoid duplicate name conflicts
    //const [logout, { fetching: logoutFetching } ] = useLogoutMutation(); 
    // THIS POST IS SUPER HELPFUL https://github.com/FormidableLabs/urql/issues/559
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
                isLoading={logoutFetching}  // we equate fetching to the value not used for useMeQuery();
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