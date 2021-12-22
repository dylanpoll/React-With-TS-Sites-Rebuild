import React from "react";
import {Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/wrapper";
import { InputField } from "../components/inputField";
import { useCreateProjectMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utilities/createUrqlClient";
import { Navigation } from "../components/navigation";

// eslint-disable-next-line no-empty-pattern
const Project = ({}) => {
const [, createProject] = useCreateProjectMutation();
    return (
      <>        
        <Navigation/>
        <Wrapper>     
          <Formik 
              initialValues={{ title: "", body: ""}} 
                  onSubmit={async ( values, {setErrors} ) => {
                      //console.log(values);
                      await createProject(values);
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
                  label="Body" 
                />
              </Box>
              <Button mt={2} type="submit" isLoading={isSubmitting} > Submit </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  </>
);
};

export default withUrqlClient(createUrqlClient)(Project);