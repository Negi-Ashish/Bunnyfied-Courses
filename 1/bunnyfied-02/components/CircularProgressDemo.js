import { useState } from "react";
import {
  ChakraProvider,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  extendTheme,
  Button,
} from "@chakra-ui/react";

function CircularProgressDemo() {
  const [progressValue, setProgressValue] = useState(0);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "red.200", // replace with the desired background color
        },
      },
    },
  });

  const handleProgressChange = () => {
    const newValue = Math.floor(Math.random() * 101); // Generate a random value between 0 and 100
    setProgressValue(newValue);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex align="center" justify="center" h="100vh" flexDir="column">
        <CircularProgress value={progressValue} />
        <CircularProgress value={progressValue} size="120px" />
        <CircularProgress value={progressValue} size="100px" thickness="4px" />
        <CircularProgress
          value={progressValue}
          color="orange.400"
          thickness="12px"
        />
        <CircularProgress value={progressValue} color="green.400">
          <CircularProgressLabel>{progressValue}%</CircularProgressLabel>
        </CircularProgress>
        <CircularProgress isIndeterminate color="green.300" />
        <Button onClick={handleProgressChange}>Change Progress Value:</Button>
      </Flex>
    </ChakraProvider>
  );
}

export default CircularProgressDemo;
