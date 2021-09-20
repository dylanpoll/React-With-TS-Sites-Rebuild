import React from "react";
import {Formik, Form } from "formik";
import { Input, FormControl, FormLabel, Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
//import { useMutation } from "urql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utilities/errormap";
import { useRouter } from "next/router"

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
      return (
        <Wrapper>      
            <Formik 
                initialValues={{ username: "", password: "" }} 
                    onSubmit={ async ( values, { setErrors } ) => {
                        const response = await login({ options: values });
                        if (response.data?.login.errors){ //if there are errors, no argument present makes this a true false for if the data is present or null
                            setErrors(toErrorMap(response.data.login.errors));
                        } else if (response.data?.login.user){ // if user data present is true
                          console.log(response.data?.login.user); //prints the user data in console 
                          router.push("/");  //this send the user back to the home page.
                        }
                }} 
            >
            {({ isSubmitting }) => (
              <Form>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
              />
            {/*  
            <Box mt={2}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
            */}
              <Box mt={2}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button mt={2} type="submit" isLoading={isSubmitting} > Login </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
  );
};

export default Login;
/*
import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Link, Flex } from "@chakra-ui/core";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useLoginMutation, 
    //MeQuery, MeDocument 
    } from "../generated/graphql";
import { toErrorMap } from "../utilities/errormap";
import { useRouter } from "next/router";
//import { withUrqlClient } from "next-urql";
//import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
//import { withApollo } from "../utils/withApollo";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }} //no text in the fields by default
        onSubmit={ 
          async (values, { setErrors }) => {
            const response = await login({ options : values,
                update: (cache, { data }) => {
                    cache.writeQuery<MeQuery>({
                      query: MeDocument,
                      data: {
                          __typename: "Query",
                          me: data?.login.user,
                      },
                    });
                cache.evict({ fieldName: "posts:{}" });
                },
            });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              // worked
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">forgot password?</Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
*/