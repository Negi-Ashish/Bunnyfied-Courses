import React, { useState } from "react";
import {
  Progress,
  Stack,
  ChakraProvider,
  extendTheme,
  Button,
} from "@chakra-ui/react";

const CustomProgressComponent = () => {
  const [progressValue, setProgressValue] = useState(0);

  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "orange.400", // replace with the desired background color
          margin: 10,
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
      <Stack spacing={5}>
        <h1>Standard:</h1>
        <Progress value={progressValue} />
        <h1>Stripe:</h1>
        <Progress hasStripe value={progressValue} />
        <h1>Sizes:</h1>
        <Progress colorScheme="green" size="sm" value={progressValue} />
        <Progress colorScheme="green" size="md" value={progressValue} />
        <Progress colorScheme="green" size="lg" value={progressValue} />
        <h1>Height:</h1>
        <Progress colorScheme="green" height="32px" value={progressValue} />
        <h1>Color:</h1>
        <Progress size="xs" colorScheme="pink" value={progressValue} />
        <h1>Indeterminate:</h1>
        <Progress size="xs" isIndeterminate />
        <Button onClick={handleProgressChange}>Change Progress Value:</Button>
      </Stack>
    </ChakraProvider>
  );
};

export default CustomProgressComponent;
