import {
  Spinner,
  ChakraProvider,
  VStack,
  Box,
  extendTheme,
} from "@chakra-ui/react";

const LoadingSpinner = () => {
  // This part is just for setting up the colour theme of background has nothing to do with the loader
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "blue.200", // replace with the desired background color
        },
      },
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <VStack>
        {/* Small Spinner code  */}
        <h1>
          Small spinner:{" "}
          <span>
            <Spinner size="xs" />
          </span>
        </h1>
        {/* Divider  */}
        <Box width="100%" height="1px" bg="orange" />
        {/*  Large Spinner code   */}
        <h1>
          Extra Large spinner:{" "}
          <span>
            <Spinner size="xl" />
          </span>
        </h1>
        {/* Divider  */}
        <Box width="100%" height="1px" bg="orange" />
        {/*  Color Spinner code   */}
        <h1>
          Color spinner:{" "}
          <span>
            <Spinner size="xl" color="red.500" />
          </span>
        </h1>
        {/* Divider  */}
        <Box width="100%" height="1px" bg="orange" />
        {/*  Color Spinner code   */}
        <h1>
          Empty area color spinner:{" "}
          <span>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </span>
        </h1>
      </VStack>
    </ChakraProvider>
  );
};

export default LoadingSpinner;
