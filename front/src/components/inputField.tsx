import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {  FormControl, FormLabel, Input,  FormErrorMessage } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {   // this is a type of prop decleration used to state these will be html input field props
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label,  textarea,  size: _,  ...props }) => {
  var InputOrTextarea = Input;
  if (textarea) {  //textarea is true meaning there is data being submitted.
    //zInputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>  {/* error is empty because it is a boolean due to !! being appended. */}
      <FormLabel htmlFor={field.name}>{label}</FormLabel> {/* htmlFor means the on page field value that is equivelant to name */}
            {/* as we are using field.name we are able to easily pull prop field data to use this line and the next as modular as possible */}  
      <InputOrTextarea {...field} {...props} id={field.name} /> {/* (three dots in JavaScript) is called the Spread Syntax or Spread Operator. This allows an iterable such as an array expression or string to be expanded or an object expression to be expanded wherever placed. This is not specific to React. It is a JavaScript operator. */}
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}   
    </FormControl>
  );
};