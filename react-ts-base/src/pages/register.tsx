import React from "react";
import {Formik, Form } from "formik";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "react-bootstrap";
import { Wrapper } from "../components/wrapper";
//import { useRouter } from "next/dist/client/router";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
//    const router = useRouter();
    return (
    <Wrapper>      
        <Formik initialValues={{ username: "", password: "" }} onSubmit={ (values) => {console.log(values);} } >
            {({values, handleChange}) => (
                <Form>
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input 
                            value={values.username}
                            onChange={handleChange}
                            id="username" 
                            placeholder="username" 
                        />
                        {/*<FormErrorMessage>{form.errors.name}</FormErrorMessage>*/}
                    </FormControl>
                </Form>
            )}
        </Formik>
    </Wrapper>
    );
};

export default Register;