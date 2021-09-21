import React from "react";
import {Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utilities/errormap";
import { useRouter } from "next/router"
interface registerProps {}

// eslint-disable-next-line no-empty-pattern
const Register: React.FC<registerProps> = ({}) => {
const router = useRouter();
const [, register] = useRegisterMutation();

    return (
    <Wrapper>      
        <Formik 
            initialValues={{ username: "", password: "" }} 
                onSubmit={async ( values, {setErrors} ) => {
                    console.log(values);
                    const response = await register(values);
                    if (response.data?.register.errors){ //if there are errors, no argument present makes this a true false for if the data is present or null
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user){ // if user data present is true
                        router.push("/")  //this send the user back to the home page.
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
          
          <Button mt={2} type="submit" isLoading={isSubmitting} > Register </Button>
        </Form>
      )}
    </Formik>
  </Wrapper>
);
};

export default Register;
