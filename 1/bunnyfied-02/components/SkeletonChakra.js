import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Box,
  Stack,
  Button,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { useState } from "react";

const SkeletonChakra = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "blue.400", // replace with the desired background color
          margin: 10,
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Skeleton height="20px" isLoaded={isLoaded}>
        Most Basic Skeleton
      </Skeleton>

      <Skeleton mt={10} isLoaded={isLoaded}>
        <div>contents wrapped</div>
        <div>won't be visible</div>
        <div>until isLoaded = false</div>
      </Skeleton>

      <Box padding="6" boxShadow="lg" bg="white" mt={10}>
        <SkeletonCircle isLoaded={isLoaded} size="10">
          Img
        </SkeletonCircle>
        <SkeletonText
          isLoaded={isLoaded}
          mt="4"
          noOfLines={4}
          spacing="4"
          skeletonHeight="2"
        >
          Some Text
        </SkeletonText>
      </Box>

      <Box textAlign="center" padding="6" boxShadow="lg" bg="lightblue" mt={10}>
        <Skeleton isLoaded={isLoaded}>
          <span>No Colour</span>
        </Skeleton>

        <Skeleton
          isLoaded={isLoaded}
          startColor="pink.500"
          endColor="orange.500"
          bg="orange.500"
          height="20px"
          mt={5}
        >
          <span>Coloured Skeleton</span>
        </Skeleton>
      </Box>

      <Stack padding={4} spacing={1}>
        <Skeleton height="40px" bg="orange.500" isLoaded={isLoaded}>
          <Box>Will Load Instantly</Box>
        </Skeleton>

        <Skeleton
          height="40px"
          isLoaded={isLoaded}
          bg="blue.100"
          fadeDuration={2.5}
        >
          <Box>Will Load after 2.5 sec</Box>
        </Skeleton>

        <Skeleton
          height="40px"
          isLoaded={isLoaded}
          fadeDuration={5}
          bg="green.700"
          color="white"
        >
          <Box>Will Load after 5 sec</Box>
        </Skeleton>

        <Box textAlign="center" mt={10}>
          <Button onClick={() => setIsLoaded((v) => !v)}>!isLoaded</Button>
        </Box>
      </Stack>
    </ChakraProvider>
  );
};

export default SkeletonChakra;
