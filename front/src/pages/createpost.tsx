import React from "react";
import {Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useCreatePostMutation} from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utilities/createUrqlClient";
import { Navigation } from "../components/navigation";
import { Banner } from "../components/banner";

// eslint-disable-next-line no-empty-pattern
const Post = ({}) => {
const [, createPost] = useCreatePostMutation();
    return (
      <>
        <Navigation/>
        <Banner />      
        <Wrapper> 
            <Formik 
                initialValues={{ title: "", body: ""}} 
                    onSubmit={async ( values, {setErrors} ) => {
                        //console.log(values);
                        await createPost(values);
                }} 
            >
              {({ isSubmitting }) => (
              <Form>
                <InputField
                  name="title"
                  placeholder="Title"
                  label="Title"
                />
                <Box mt={2}>
                  <InputField 
                  name="body" 
                  placeholder="Body" 
                  label="Body" />
                </Box>
                <Button mt={2} type="submit" isLoading={isSubmitting} > Submit </Button>
              </Form>
            )}
          </Formik>
        </Wrapper>
      </>
);
};

export default withUrqlClient(createUrqlClient)(Post);