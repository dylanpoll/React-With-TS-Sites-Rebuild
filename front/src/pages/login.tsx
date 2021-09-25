import React from "react";
import {Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
//import { useMutation } from "urql";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utilities/errormap";
import { useRouter } from "next/router"
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utilities/createUrqlClient";

// eslint-disable-next-line no-empty-pattern
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
                          //console.log(response.data?.login.user); //prints the user data in console 
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

export default withUrqlClient(createUrqlClient)(Login);