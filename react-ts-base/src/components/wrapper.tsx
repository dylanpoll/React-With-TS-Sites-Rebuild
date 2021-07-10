import { Box } from "@chakra-ui/core";
import { Children } from "react";

interface wrapperProps {}

export const Wrapper: React.FC<wrapperProps> = ({ children }) => {
    return <Box>{Children}</Box>;
}; 