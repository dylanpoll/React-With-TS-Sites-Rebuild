import { Box, Flex, Link, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
// eslint-disable-next-line no-empty-pattern
export const Navigation: React.FC<{}> = ({}) => {
    const [{fetching: logoutFetching}, logout ] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery();
    var body = null;

    if(fetching){
    //still getting data so not decided
    } else if(!data?.me){
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
        <>
        Hello {data.me.username}.  
        <Button onClick={() => {
            logout();
        }}
        //isLoading={logoutFetching}
        //variant="link" 
        > Logout? </Button>
        </>);
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