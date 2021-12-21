import { Box, Link, Button, ChakraProvider, AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import React from "react";
//import { useRouter } from "next/router";

// eslint-disable-next-line no-empty-pattern
export const Navigation = ({}) => {
    //const router = useRouter();
    var body = null;
    const [{data, fetching}] = useMeQuery();    //fetching is a boolean value from URQL  https://formidable.com/open-source/urql/docs/api/urql/
    const [ { fetching: logoutFetching }, logout ] = useLogoutMutation(); // by defining fetching in this way we make it so it has a additional type def to avoid duplicate name conflicts
    //const [logout, { fetching: logoutFetching } ] = useLogoutMutation(); 
    // THIS POST IS SUPER HELPFUL https://github.com/FormidableLabs/urql/issues/559

    //console.log('data ', data)

    if(fetching){ //still getting data so not decided if logged in or not

    } else if(!data?.me){ //no user data means not logged in so offer options
        body = (
        <>
            <Box p="1%" >
                <NextLink href="/">
                    <Link> Home </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/projects">
                    <Link> Projects </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/blog">
                    <Link> Blog </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/login">
                    <Link> Login </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/register">
                    <Link> Register </Link>
                </NextLink>
            </Box>
            
        </>
        );
    }else{  //as there is user data wont offer signin or registering
        body = (
            <>
            <Box p="1%" >
                <NextLink href="/">
                    <Link> Home </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/projects">
                    <Link> Projects </Link>
                </NextLink>
            </Box>

            <Box p="1%" >
                <NextLink href="/blog">
                    <Link> Blog </Link>
                </NextLink>
            </Box> 

            <Box p="1%" >
                <NextLink href="/createproject">
                    <Link> Post a new project </Link>
                </NextLink>   
            </Box>

            <Box p="1%" >
                <NextLink href="/createpost">
                    <Link> Post a new Blog </Link>
                </NextLink>   
            </Box>

            <Box p="1%" > 
              Hello {data.me.username}
            </Box>

            <Box p="1%" >
                <Button
                    onClick={ async () => { // I have gone with and without async, I see no change of the issue however there is a returned statement so I am leaving it async
                    await logout();   
                    }}
                    isLoading={logoutFetching}  // we equate fetching to the value not used for useMeQuery();
                    variant="link"
                >
                    logout
                </Button>
            </Box>
            
            </>
          );
    }
    return(
        <ChakraProvider>
            <AspectRatio flexGrow={10} ratio={1.85 / 1} maxH="50">
                <Box
                color="black"
                >
                {body}
                </Box>
            </AspectRatio>
        </ChakraProvider>
    )
}